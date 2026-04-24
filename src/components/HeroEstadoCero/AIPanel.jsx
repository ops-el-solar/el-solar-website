import { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import styles from './HeroEstadoCero.module.css';

const GREETING = '¿En qué tipo de negocio trabajás y cuál es el mayor obstáculo que tenés para conseguir clientes nuevos?';

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

function formatBotMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

const AIPanel = forwardRef(function AIPanel({ onMorphStart, onInterrupt }, ref) {
  const inputRef = useRef(null);
  const chatRef = useRef(null);
  const [messages, setMessages] = useState([{ role: 'assistant', content: GREETING }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversationId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useImperativeHandle(ref, () => ({
    typeDemo(text) {
      if (inputRef.current) inputRef.current.value = text;
    },
    clearInput() {
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.placeholder = 'Escribí acá... (Enter para enviar)';
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
    if (!text || loading) return;

    onInterrupt?.();
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    inputRef.current.value = '';
    setLoading(true);
    setError('');
    onMorphStart?.(0);

    try {
      const { result: raw } = await fetchWithRetry(text, conversationId);
      setMessages(prev => [...prev, { role: 'assistant', content: raw }]);
      onMorphStart?.(100);
    } catch (err) {
      setError('⚠️ Servicio no disponible. Si persiste: info@elsolaragencia.co');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
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

      <div ref={chatRef} className={styles.chatHistory}>
        {messages.map((msg, i) =>
          msg.role === 'assistant' ? (
            <div
              key={i}
              className={styles.chatBubbleBot}
              dangerouslySetInnerHTML={{ __html: formatBotMessage(msg.content) }}
            />
          ) : (
            <div key={i} className={styles.chatBubbleUser}>
              {msg.content}
            </div>
          )
        )}
        {loading && (
          <div className={styles.chatBubbleBot}>
            <div className={styles.aiLoading} aria-label="Procesando...">
              <div className={styles.aiLoadingDot} />
              <div className={styles.aiLoadingDot} />
              <div className={styles.aiLoadingDot} />
            </div>
          </div>
        )}
      </div>

      <div className={styles.inputRow}>
        <textarea
          ref={inputRef}
          className={styles.aiInput}
          placeholder="Escribí acá... (Enter para enviar)"
          rows={2}
          onFocus={handleInputInteraction}
          onInput={handleInputInteraction}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          className={styles.sendButton}
          onClick={handleSubmit}
          disabled={loading}
          aria-label="Enviar"
        >
          ↑
        </button>
      </div>

      {error && <p className={styles.aiError}>{error}</p>}
    </div>
  );
});

export default AIPanel;
