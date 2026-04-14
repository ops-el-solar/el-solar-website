import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';

function getParticleCount() {
  const w = window.innerWidth;
  if (w > 1024) return 8000;
  if (w > 768) return 5000;
  return 3000;
}

export function useParticleSystem(canvasRef, pausedRef) {
  const uniformsRef = useRef(null);
  const morphSystemRef = useRef(null);
  const rendererRef = useRef(null);
  const frameIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let destroyed = false;

    async function setup() {
      try {
        if (destroyed) return;

        // Wait until canvas has real dimensions — timeout after 3s to avoid infinite loop
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('[Hero3D] Canvas never got dimensions after 3s'));
          }, 3000);
          function check() {
            if (canvas.clientWidth > 0 && canvas.clientHeight > 0) {
              clearTimeout(timeout);
              return resolve();
            }
            requestAnimationFrame(check);
          }
          check();
        });
        if (destroyed) return;

        const PARTICLE_COUNT = getParticleCount();
        const RADIUS = 10;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 25;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current = renderer;

        // Geometry
        const geometry = new THREE.BufferGeometry();
        const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
        const targetPositions = new Float32Array(PARTICLE_COUNT * 3);
        const originalColors = new Float32Array(PARTICLE_COUNT * 3);
        const targetColors = new Float32Array(PARTICLE_COUNT * 3);

        // State A: chaos — desaturated blue-grey tones
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          originalPositions[i * 3]     = (Math.random() - 0.5) * RADIUS * 3;
          originalPositions[i * 3 + 1] = (Math.random() - 0.5) * RADIUS * 3;
          originalPositions[i * 3 + 2] = (Math.random() - 0.5) * RADIUS * 3;

          const hue = Math.random();
          if (hue < 0.33) {
            // #5a7a9a
            originalColors[i * 3] = 0.353; originalColors[i * 3 + 1] = 0.478; originalColors[i * 3 + 2] = 0.604;
          } else if (hue < 0.66) {
            // #8a9aaa
            originalColors[i * 3] = 0.541; originalColors[i * 3 + 1] = 0.604; originalColors[i * 3 + 2] = 0.667;
          } else {
            // #3a5a7a
            originalColors[i * 3] = 0.227; originalColors[i * 3 + 1] = 0.353; originalColors[i * 3 + 2] = 0.478;
          }
        }

        // State B: Estado Cero — icosahedron surface, #14273E → #d4a853
        const sphereGeom = new THREE.IcosahedronGeometry(RADIUS, 8);
        const spherePositions = sphereGeom.attributes.position.array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const sIndex = i % (spherePositions.length / 3);
          targetPositions[i * 3]     = spherePositions[sIndex * 3];
          targetPositions[i * 3 + 1] = spherePositions[sIndex * 3 + 1];
          targetPositions[i * 3 + 2] = spherePositions[sIndex * 3 + 2];

          if (i < PARTICLE_COUNT * 0.7) {
            // #14273E brand blue
            targetColors[i * 3] = 0.078; targetColors[i * 3 + 1] = 0.153; targetColors[i * 3 + 2] = 0.243;
          } else {
            // #d4a853 gold
            targetColors[i * 3] = 0.831; targetColors[i * 3 + 1] = 0.659; targetColors[i * 3 + 2] = 0.325;
          }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * 3), 3));
        geometry.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));
        geometry.setAttribute('targetPosition', new THREE.BufferAttribute(targetPositions, 3));
        geometry.setAttribute('originalColor', new THREE.BufferAttribute(originalColors, 3));
        geometry.setAttribute('targetColor', new THREE.BufferAttribute(targetColors, 3));

        const uniforms = {
          uSlider: { value: 0 },
          uTime: { value: 0 },
        };
        uniformsRef.current = uniforms;

        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader,
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false,
        });

        const morphSystem = new THREE.Points(geometry, material);
        morphSystemRef.current = morphSystem;
        scene.add(morphSystem);

        // Resize handler
        function onResize() {
          const w = canvas.clientWidth;
          const h = canvas.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
        }
        window.addEventListener('resize', onResize);

        // Animation loop
        function animate() {
          frameIdRef.current = requestAnimationFrame(animate);
          if (pausedRef.current) return;
          uniforms.uTime.value += 1 / 60;
          morphSystem.rotation.y += 0.0005;
          renderer.render(scene, camera);
        }
        animate();

        return () => {
          window.removeEventListener('resize', onResize);
        };
      } catch (err) {
        console.error('[Hero3D] setup failed:', err);
      }
    }

    let cleanup;
    setup().then((fn) => { cleanup = fn; }).catch((err) => {
      console.error('[Hero3D] unhandled:', err);
    });

    return () => {
      destroyed = true;
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
      if (cleanup) cleanup();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { uniformsRef, morphSystemRef };
}
