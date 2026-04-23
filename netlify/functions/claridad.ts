import type { Handler, HandlerEvent } from "@netlify/functions";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const SYSTEM_PROMPT = `Eres un estratega ejecutivo de El Solar, una agencia que diseña sistemas de crecimiento data-driven con IA.

SOBRE EL SOLAR:
- Ayudamos a fundadores y CEOs (26-42 años) con empresas operativas ($3M-8M COP/mes presupuesto)
- Especialidad: Sistema Inteligente de Ventas B2B, Estrategia Creativa (ecommerce), Growth OS con IA
- Filosofía: "Ordenar primero. Ejecutar después." → Diagnóstico → Arquitectura → Ejecución Progresiva
- Casos reales: Teravnt pasó de $1.5K a $20K/mes en 3 meses. Sweepeake automotriz → Problema NO era presupuesto, era el CANAL.

TU MISIÓN EN ESTA CONVERSACIÓN:
1. El usuario describe un problema/caos de su negocio (marketing, ventas, operaciones, datos)
2. TÚ identifica la raíz (NO la solución completa)
3. Das 2-3 primeros pasos PRÁCTICOS para empezar a traer orden
4. Evalúa si hay intent de conversión:
   - Si pregunta "¿Cómo podemos mejorar?" → Guía al diagnóstico gratuito
   - Si dice "Esto es exactamente mi problema" → Diagnóstico + sesión
   - Si es exploratorio → Mantén conversación, da valor primero

EJEMPLOS DE BUENA RESPUESTA:

Usuario: "Invertimos $2M/mes en Meta Ads pero no vemos ROI claro. Tenemos 5 canales diferentes y nadie sabe cuál funciona"
Tu respuesta:
• **Paso 1 — Medir primero:** Crea un dashboard simple que consolide: qué canal genera clientes reales vs visitas falsas. Ignorá la vanidad (clics, impresiones).
• **Paso 2 — Identifica el culpable:** En 80% de casos, la pauta está bien pero el embudo post-clic está roto (landing, conversión). Revisa tasa de conversión por canal.
→ Este es el primer nivel de claridad. Si necesitas estructurar tu diagnóstico completo (con IA), podemos agendar una sesión.

TONO: Profesional, directo, sin fluff. Habla como mentor que ha visto estos problemas 100 veces.
IDIOMA: Español (Colombia)
MÁXIMO: 120 palabras. Usa viñetas con •. Evita saludos extra.

CUÁNDO LLEVAR AL LEAD MAGNET (diagnóstico gratuito):
✓ Usuario tiene problema claro + presupuesto + autoridad para decidir
✓ Después de dar valor en 1-2 respuestas
✓ CTA natural: "Para estructurar tu [problema específico], te ofrecemos un diagnóstico gratuito"
✗ NO lo hagas si es primer mensaje exploratorio
✗ NO hagas pitch agresivo — primero agrega valor`;


const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// In-memory rate limiter: ip -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

// Chat history storage (in-memory, resets on deployment)
const chatSessions = new Map<string, Array<{ role: string; content: string }>>();

async function callChatGPT(
  messages: Array<{ role: string; content: string }>,
  conversationId: string
): Promise<string> {
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) throw new Error("Missing OPENAI_API_KEY");

  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 256,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ChatGPT error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

async function fallbackToGemini(text: string): Promise<string> {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) throw new Error("Missing GEMINI_API_KEY (fallback)");

  const response = await fetch(`${GEMINI_URL}?key=${geminiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: "user", parts: [{ text }] }],
      generationConfig: { maxOutputTokens: 256, temperature: 0.7 },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini fallback error: ${response.status}`);
  }

  const data = await response.json();
  const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!result) throw new Error("Empty response from Gemini");

  return result;
}

export const handler: Handler = async (event: HandlerEvent) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Método no permitido" }),
    };
  }

  // Rate limiting
  const ip =
    event.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    event.headers["client-ip"] ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return {
      statusCode: 429,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Demasiadas solicitudes. Intenta en un momento." }),
    };
  }

  let text: string, conversationId: string;
  try {
    const body = JSON.parse(event.body || "{}");
    text = body.text?.trim();
    conversationId = body.conversationId || ip; // Use IP as fallback conversation ID
    if (!text) throw new Error("missing text");
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "El campo 'text' es requerido" }),
    };
  }

  try {
    // Get or initialize conversation history
    let messages = chatSessions.get(conversationId) || [];

    // Add user message to history
    messages.push({ role: "user", content: text });

    // Keep conversation history to last 10 messages to avoid token overflow
    if (messages.length > 10) {
      messages = messages.slice(-10);
    }

    let result: string;
    try {
      // Try ChatGPT first
      result = await callChatGPT(messages, conversationId);
      console.log("✅ ChatGPT success");
    } catch (chatGptErr) {
      console.error("❌ ChatGPT failed, trying Gemini fallback:", chatGptErr);
      // Fallback to Gemini if ChatGPT fails
      result = await fallbackToGemini(text);
      console.log("✅ Gemini fallback success");
    }

    // Add assistant response to history
    messages.push({ role: "assistant", content: result });

    // Save conversation history
    chatSessions.set(conversationId, messages);

    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({ result, conversationId }),
    };
  } catch (err) {
    console.error("❌ Fatal error:", err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: "Servicio temporalmente no disponible. Por favor intenta en unos momentos.",
      }),
    };
  }
};