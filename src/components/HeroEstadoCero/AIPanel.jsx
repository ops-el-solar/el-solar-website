import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import styles from './HeroEstadoCero.module.css';

async function fetchWithRetry(text, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch('/.netlify/functions/claridad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data.result;
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await new Promise((r) => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }
}

function formatResult(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

const AIPanel = forwardRef(function AIPanel({ onMorphStart, onInterrupt }, ref) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useImperativeHandle(ref, () => ({
    typeDemo(text) {
      if (inputRef.current) inputRef.current.value = text;
    },
    clearInput() {
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.placeholder = 'Escribe tu propio caos aquí...';
        inputRef.current.classList.add(styles.inputHighlight);
        setTimeout(() => inputRef.current?.classList.remove(styles.inputHighlight), 2000);
      }
    },
    async triggerSubmit() {
      await handleSubmit();
    },
    getInputValue() {
      return inputRef.current?.value ?? '';
    },
  }));

  async function handleSubmit() {
    const text = inputRef.current?.value?.trim();
    if (!text) return;

    onInterrupt?.();
    setLoading(true);
    setResult('');
    setError('');
    onMorphStart?.(0); // reset to chaos first

    try {
      const raw = await fetchWithRetry(text);
      setResult(formatResult(raw));
      onMorphStart?.(100); // animate to Estado Cero
    } catch {
      setError('Servicio temporalmente no disponible.');
    } finally {
      setLoading(false);
    }
  }

  function handleInputInteraction() {
    onInterrupt?.();
  }

  return (
    <div className={styles.aiPanel}>
      <h2 className={styles.aiPanelTitle}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12c-2.4 0-4.6-1-6.3-2.7S12 5.4 12 3c0 2.4-1 4.6-2.7 6.3S5.4 12 3 12c2.4 0 4.6 1 6.3 2.7S12 18.6 12 21c0-2.4 1-4.6 2.7-6.3S18.6 12 21 12z"/>
        </svg>
        Asistente de Claridad
      </h2>

      <p className={styles.aiPanelSub}>
        Describe una situación caótica de tu negocio. La IA la estructurará al primer nivel de orden.
      </p>

      <textarea
        ref={inputRef}
        className={styles.aiInput}
        placeholder="Ej. Tengo muchas ideas de marketing para el negocio y mi equipo está saturado, no sabemos por dónde empezar..."
        rows={4}
        onFocus={handleInputInteraction}
        onInput={handleInputInteraction}
        disabled={loading}
      />

      <button
        className={styles.aiButton}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Analizando el caos...' : 'Transformar a Claridad'}
      </button>

      {result && (
        <div
          className={styles.aiResult}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      )}

      {error && (
        <p className={styles.aiError}>{error}</p>
      )}
    </div>
  );
});

export default AIPanel;