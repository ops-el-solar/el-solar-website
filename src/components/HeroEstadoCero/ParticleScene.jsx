import { useRef, useEffect } from 'react';
import { useParticleSystem } from './useParticleSystem';
import styles from './HeroEstadoCero.module.css';

export default function ParticleScene({ sliderValue, pausedRef }) {
  const canvasRef = useRef(null);
  const { uniformsRef } = useParticleSystem(canvasRef, pausedRef);

  // Sync slider → uSlider uniform
  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.uSlider.value = sliderValue / 100;
    }
  }, [sliderValue, uniformsRef]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}