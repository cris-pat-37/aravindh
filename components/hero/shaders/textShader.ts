export const textVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vNormal = normalMatrix * normal;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;

    vec3 pos = position;
    
    float wave = sin(uTime * 2.0 + position.x * 0.5 + position.y * 0.3) * 0.02 * (1.0 - uProgress);
    pos.z += wave;
    
    vec3 mouseOffset = vec3(uMouse.x * 0.1, uMouse.y * 0.1, 0.0);
    pos += mouseOffset * (1.0 - uProgress) * 0.5;

    vec4 mvPosition = viewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const textFragmentShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uGlowColor;

  #define PI 3.14159265359

  float fresnel(vec3 viewDir, vec3 normal, float power) {
    return pow(1.0 - max(dot(viewDir, normal), 0.0), power);
  }

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float f = fresnel(viewDir, normalize(vNormal), 3.0);
    
    float gradient = vUv.y;
    vec3 color = mix(uColorA, uColorB, gradient);
    
    float scanline = sin(vWorldPosition.y * 50.0 + uTime * 5.0) * 0.02;
    color += scanline;
    
    float edgeGlow = smoothstep(0.7, 1.0, f);
    color += uGlowColor * edgeGlow * 0.5;
    
    float pulse = 1.0 + sin(uTime * 1.2) * 0.03;
    color *= pulse;
    
    float alpha = 0.9 + f * 0.1;
    
    gl_FragColor = vec4(color, alpha);
  }
`;