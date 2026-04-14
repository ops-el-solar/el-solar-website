import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroEstadoCero.module.css';
import AIPanel from './AIPanel';
import VerticalSlider from './VerticalSlider';

const ParticleScene = lazy(() => import('./ParticleScene'));

const DEMO_TEXT =
  'Tengo muchas ideas de marketing para el negocio y mi equipo está saturado, no sabemos por dónde empezar...';
const TYPEWRITER_MS = 40;

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

export default function HeroEstadoCero() {
  const [sliderValue, setSliderValue] = useState(0);
  const [webglSupported] = useState(() => hasWebGL());
  const [threeVisible, setThreeVisible] = useState(false);

  const heroRef = useRef(null);
  const pausedRef = useRef(false);
  const aiPanelRef = useRef(null);
  const autoMorphRef = useRef(null);
  const demoInterruptedRef = useRef(false);
  const demoRunningRef = useRef(false);

  // IntersectionObserver: pause RAF when hero off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { pausedRef.current = !entry.isIntersecting; },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Show canvas after 200ms (avoids flash)
  useEffect(() => {
    const t = setTimeout(() => setThreeVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Auto-morph animation loop
  function startAutoMorph(targetValue) {
    if (autoMorphRef.current) cancelAnimationFrame(autoMorphRef.current);

    function step() {
      setSliderValue((prev) => {
        if (prev >= targetValue) {
          autoMorphRef.current = null;
          return targetValue;
        }
        autoMorphRef.current = requestAnimationFrame(step);
        return Math.min(prev + 0.6, targetValue);
      });
    }
    autoMorphRef.current = requestAnimationFrame(step);
  }

  function resetMorph() {
    if (autoMorphRef.current) cancelAnimationFrame(autoMorphRef.current);
    setSliderValue(0);
  }

  function handleMorphStart(target) {
    if (target === 0) resetMorph();
    else startAutoMorph(target);
  }

  function handleInterrupt() {
    demoInterruptedRef.current = true;
  }

  // Demo sequence — starts 3s after mount
  useEffect(() => {
    const demoDelay = setTimeout(async () => {
      if (demoInterruptedRef.current) return;
      demoRunningRef.current = true;

      // Typewriter
      for (let i = 0; i <= DEMO_TEXT.length; i++) {
        if (demoInterruptedRef.current) {
          aiPanelRef.current?.typeDemo('');
          demoRunningRef.current = false;
          return;
        }
        aiPanelRef.current?.typeDemo(DEMO_TEXT.slice(0, i));
        await new Promise((r) => setTimeout(r, TYPEWRITER_MS));
      }

      // Auto-click 600ms after typing finishes
      await new Promise((r) => setTimeout(r, 600));
      if (demoInterruptedRef.current) {
        demoRunningRef.current = false;
        return;
      }

      await aiPanelRef.current?.triggerSubmit();

      // 5s after demo result: clean input + invite user
      setTimeout(() => {
        if (demoInterruptedRef.current) return;
        aiPanelRef.current?.clearInput();
        demoRunningRef.current = false;
      }, 5000);
    }, 3000);

    return () => clearTimeout(demoDelay);
  }, []);

  // Scroll CTA to AI panel
  function scrollToPanel() {
    const panel = heroRef.current?.querySelector('[data-ai-panel]');
    panel?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Background */}
      {!threeVisible || !webglSupported ? (
        <div className={styles.fallback} />
      ) : (
        <Suspense fallback={<div className={styles.fallback} />}>
          <ParticleScene sliderValue={sliderValue} pausedRef={pausedRef} />
        </Suspense>
      )}

      <div className={styles.grid} />

      {/* Slider (desktop only via CSS) */}
      <VerticalSlider
        value={sliderValue}
        onChange={(v) => {
          demoInterruptedRef.current = true;
          if (autoMorphRef.current) cancelAnimationFrame(autoMorphRef.current);
          setSliderValue(v);
        }}
      />

      {/* Copy */}
      <div className={styles.copy}>
        <p className={styles.eyebrow}>
          Brindamos orden y acción para el bienestar y crecimiento de tu negocio.
        </p>
        <h1 className={styles.h1}>
          Deja de solucionar problemas.{' '}
          <strong>Empieza a tomar decisiones para tu crecimiento.</strong>
        </h1>
        <p className={styles.subtitle}>
          Diseñamos sistemas que convierten ruido operativo en decisiones claras.
        </p>
        <div className={styles.ctaWrapper}>
          <button className={styles.ctaButton} onClick={scrollToPanel}>
            Tu Diagnóstico Inteligente — Fase 1 Gratis
          </button>
          <span className={styles.ctaStatus}>
            <span className={styles.ctaStatusDot} />
            Proceso de selección activo
          </span>
        </div>
      </div>

      {/* AI Panel */}
      <div data-ai-panel>
        <AIPanel
          ref={aiPanelRef}
          onMorphStart={handleMorphStart}
          onInterrupt={handleInterrupt}
        />
      </div>

      {/* Footer labels */}
      <div className={styles.footerLabels}>
        <span>Ruido Operativo</span>
        <span>Estado Cero</span>
      </div>
    </section>
  );
}