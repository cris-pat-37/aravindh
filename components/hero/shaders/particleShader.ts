export const particleVertexShader = /* glsl */ `
  attribute float scale;
  attribute vec3 customColor;
  attribute float phase;
  attribute float speed;
  attribute vec3 noiseOffset;

  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;
  uniform vec3 uCameraPosition;

  varying vec3 vColor;
  varying float vScale;
  varying float vOpacity;

  #define PI 3.14159265359

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  vec3 rotateY(vec3 v, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return vec3(v.x * c + v.z * s, v.y, -v.x * s + v.z * c);
  }

  vec3 rotateX(vec3 v, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return vec3(v.x, v.y * c - v.z * s, v.y * s + v.z * c);
  }

  void main() {
    vColor = customColor;
    vScale = scale;

    vec3 pos = position;

    float time = uTime * speed + phase;
    
    float n = fbm(pos.xz * 0.3 + noiseOffset.xy + time * 0.1);
    pos.y += n * 2.5;
    pos.x += fbm(pos.yz * 0.2 + noiseOffset.yz + time * 0.08) * 1.5;
    pos.z += fbm(pos.xy * 0.2 + noiseOffset.xz + time * 0.07) * 1.5;

    pos = rotateY(pos, uTime * 0.02 + phase * 0.5);
    pos = rotateX(pos, uTime * 0.01 + phase * 0.3);

    vec3 toMouse = vec3(uMouse.x * 15.0, uMouse.y * 10.0, 0.0) - pos;
    float distToMouse = length(toMouse);
    float mouseForce = uMouseInfluence * (1.0 - smoothstep(0.0, 20.0, distToMouse));
    pos += normalize(toMouse) * mouseForce * scale * 3.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float dist = length(mvPosition.xyz);

    float sizeAttenuation = 300.0 / (dist + 1.0);
    float pulse = 1.0 + sin(time * 2.0 + phase * 10.0) * 0.15;
    vScale = scale * sizeAttenuation * pulse * (0.5 + 0.5 * uProgress);

    float opacityBase = 0.4 + scale * 0.6;
    float depthFade = smoothstep(10.0, 50.0, dist);
    vOpacity = opacityBase * (1.0 - depthFade) * (0.3 + 0.7 * uProgress);

    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = vScale * (1.0 / -mvPosition.z) * 100.0;
  }
`;

export const particleFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vScale;
  varying float vOpacity;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    float alpha = smoothstep(0.5, 0.0, dist);
    alpha *= 1.0 - smoothstep(0.45, 0.5, dist);
    
    vec3 color = vColor;
    float rim = smoothstep(0.3, 0.45, dist);
    color += vec3(0.2, 0.5, 1.0) * rim * 0.5;

    gl_FragColor = vec4(color, alpha * vOpacity);
    
    if (gl_FragColor.a < 0.01) discard;
  }
`;