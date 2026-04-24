import { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import styles from './HeroEstadoCero.module.css';

async function fetchWithRetry(text, conversationId, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch('/.netlify/functions/claridad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, conversationId }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return { result: data.result, conversationId: data.conversationId || conversationId };
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
  const resultRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [conversationId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollTop = 0;
    }
  }, [result]);

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
    setError('');
    onMorphStart?.(0); // reset to chaos first

    try {
      const { result: raw } = await fetchWithRetry(text, conversationId);
      setResult(formatResult(raw));
      inputRef.current.value = '';
      onMorphStart?.(100); // animate to Estado Cero
    } catch (err) {
      setError('⚠️ Servicio no disponible. Si persiste, contacta a: info@elsolaragencia.co');
      console.error('API Error:', err);
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

      {loading && (
        <div className={styles.aiLoading} aria-label="Procesando...">
          <div className={styles.aiLoadingDot} />
          <div className={styles.aiLoadingDot} />
          <div className={styles.aiLoadingDot} />
        </div>
      )}

      {result && (
        <div
          ref={resultRef}
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