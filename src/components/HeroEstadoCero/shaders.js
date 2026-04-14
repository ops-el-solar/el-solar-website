export const vertexShader = /* glsl */ `
  uniform float uSlider;
  uniform float uTime;
  attribute vec3 originalPosition;
  attribute vec3 targetPosition;
  attribute vec3 originalColor;
  attribute vec3 targetColor;
  varying vec3 vColor;
  varying float vAlpha;

  vec3 noise(vec3 p) {
    p = floor(p * 10.0 + uTime * 0.1);
    return sin(p * 0.1) * 0.5 + 0.5;
  }

  void main() {
    vec3 disturbedChaos = originalPosition + noise(originalPosition * 0.5) * 1.5 * (1.0 - uSlider);
    vec3 finalPosition = mix(disturbedChaos, targetPosition, uSlider);

    vColor = mix(originalColor, targetColor, uSlider);
    vAlpha = mix(0.7, 1.0, uSlider);

    vec4 mvPosition = modelViewMatrix * vec4(finalPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = mix(2.5, 3.5, uSlider) * (15.0 / -mvPosition.z);
  }
`;

export const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    gl_FragColor = vec4(vColor, vAlpha * (1.0 - dist * 2.0));
  }
`;