export const geometryVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  varying float vElevation;

  uniform float uTime;
  uniform float uMorph;

  #define PI 3.14159265359

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for(int i=0; i<4; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vUv = uv;
    vNormal = normalMatrix * normal;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;

    float n = fbm(position * 0.5 + uTime * 0.1);
    float morph = sin(uTime * 0.5 + position.y * 2.0) * 0.15 * uMorph;
    float elevation = n * 0.3 + morph;
    vElevation = elevation;

    vec3 newPos = position + normal * elevation;
    vec4 mvPosition = viewMatrix * vec4(newPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const geometryFragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  varying float vElevation;

  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uOpacity;
  uniform float uWireframe;

  #define PI 3.14159265359

  float fresnel(vec3 viewDir, vec3 normal, float power) {
    return pow(1.0 - max(dot(viewDir, normal), 0.0), power);
  }

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float f = fresnel(viewDir, normalize(vNormal), 2.5);
    
    float height = (vWorldPosition.y + 5.0) / 10.0;
    vec3 baseColor = mix(uColorA, uColorB, height);
    baseColor = mix(baseColor, uColorC, vElevation * 2.0 + 0.5);
    
    float wire = step(0.5, fract(vUv.x * 20.0)) * step(0.5, fract(vUv.y * 20.0));
    wire += step(0.5, fract(vUv.x * 20.0 + vUv.y * 20.0));
    
    vec3 color = baseColor;
    color += vec3(0.2, 0.6, 1.0) * f * 0.8;
    color += vec3(1.0, 0.4, 0.2) * wire * uWireframe * 0.5;
    
    float pulse = 1.0 + sin(uTime * 1.5 + vWorldPosition.x * 0.5) * 0.05;
    color *= pulse;
    
    float alpha = uOpacity * (0.5 + 0.5 * f);
    
    gl_FragColor = vec4(color, alpha);
    
    if (gl_FragColor.a < 0.02) discard;
  }
`;