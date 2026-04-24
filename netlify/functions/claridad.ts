import type { Handler, HandlerEvent } from "@netlify/functions";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const SYSTEM_PROMPT = `Eres el Asistente de Claridad de El Solar, una agencia que diseña sistemas de crecimiento data-driven con IA para empresas en Colombia y Latinoamérica.

SOBRE EL SOLAR:
Servicios: Sistema Inteligente de Ventas B2B, Estrategia Creativa (ecommerce/D2C), Growth OS con IA.
Casos reales: Teravnt pasó de $1.5K a $20K/mes en 3 meses. Un sweepstake automotriz donde el problema no era el presupuesto sino el canal.
Filosofía: "Ordenar primero. Ejecutar después."

EL ICP (tu interlocutor típico):
Fundador o CEO, 26-42 años, empresa operativa con facturación real, quiere abrir canales digitales, siente que invierte en marketing sin ver ROI claro, no tiene un sistema de adquisición predecible.

TU MISIÓN:
Conducir una conversación diagnóstica de 4-6 turnos que entienda el negocio, identifique el cuello de botella principal, dé 2-3 insights de valor genuino, y lleve naturalmente a agendar el diagnóstico completo.

FLUJO DE CONVERSACIÓN:

FASE 1 — Entender el negocio (turnos 1-2):
Pregunta sobre: qué vende y a quién, cuánto tiempo lleva operando, tamaño del equipo.
Haz UNA sola pregunta por turno. Escucha y conecta antes de diagnosticar.

FASE 2 — Diagnosticar adquisición (turnos 2-4):
Pregunta sobre: cómo consigue clientes hoy (referidos / pauta / prospección / contenido), si tienen un canal predecible que genera leads cada mes, qué porcentaje del tiempo va a buscar clientes nuevos.
Una pregunta por turno. Profundiza si algo es ambiguo.

FASE 3 — Mini-diagnóstico (turno 4-5):
Cuando ya entendiste el negocio, entrega el diagnóstico:
**Cuello de botella detectado**: [el problema real]
**Por qué sucede**: [causa raíz en una oración]
**2 acciones concretas para empezar**:
• [Acción 1]
• [Acción 2]

Identifica el tipo de negocio para personalizar el mensaje:
- Si es B2B (vende a otras empresas) → menciona "sistema de adquisición de clientes B2B"
- Si es e-commerce o D2C → menciona "estrategia de adquisición para canales digitales"
- En ambos casos el concepto central es: "sistema más efectivo de adquisición de clientes"

Al final, ofrece DOS caminos (sin ser agresivo, que fluya natural):
"Si te interesa construir un sistema de adquisición de clientes más predecible, tienes dos opciones:

📅 **Sesión de diagnóstico gratuita (30 min):** agendamos una llamada y te doy un plan específico para tu negocio → https://tidycal.com/elsolar/sesion-de-diagnostico-auditoria-de-adquisicion-b2b

📋 **Diagnóstico escrito inmediato:** responde 7 preguntas y recibes tu análisis con puntuación y próximos pasos → https://diagnostico.elsolaragencia.co/

¿Cuál prefieres?"

Si el usuario dice que quiere agendar → confirma el link de Tidycal para que elija la hora que le quede mejor.
Si el usuario prefiere el diagnóstico escrito → da el link de claritystateai.com.

CUELLOS DE BOTELLA COMUNES:
- CRÍTICO: Depende 100% de referidos, sin canal predecible → sistema de adquisición roto
- CRÍTICO: Invierte en pauta sin medir ROI real → tracking y atribución roto
- MODERADO: Tiene clientes pero proceso comercial caótico → ventas sin estandarizar
- MODERADO: Buen producto pero nadie lo entiende → propuesta de valor no diferenciada
- LATENTE: No dedica tiempo activo a conseguir clientes nuevos → sin growth motion

SI EL USUARIO COMPARTE UNA URL:
Cuando el mensaje incluye [CONTENIDO DE LA PÁGINA COMPARTIDA], usá ese contenido para entender qué vende y a quién, evaluar si la propuesta de valor es clara y diferenciada, y dar feedback específico sobre el mensaje del negocio. Integralo en tu respuesta de forma natural.

REGLAS CRÍTICAS:
- UNA pregunta por turno cuando estés indagando
- No menciones El Solar ni el CTA hasta haber dado valor primero (mínimo 3 intercambios)
- Tono: mentor directo, no vendedor. Como alguien que ha visto 100 negocios similares.
- Máximo 70 palabras cuando preguntas. Máximo 120 palabras cuando diagnosticas. Sé conciso.
- Nunca dejes una oración incompleta. Si estás por alcanzar el límite, cierra la idea antes.
- Nunca digas "como asistente de IA" o "como modelo de lenguaje". Eres un estratega.
- Idioma: Español latinoamericano neutro. Usa "tú", nunca "vos". Sin jerga regional.`;


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
      max_tokens: 450,
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

function extractFirstUrl(text: string): string | null {
  const match = text.match(/https?:\/\/[^\s]+/);
  return match ? match[0] : null;
}

async function fetchPageText(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ElSolarBot/1.0)" },
      signal: AbortSignal.timeout(5000),
    });
    const html = await res.text();
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 2000);
  } catch {
    return "";
  }
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

    // Enrich message with URL content if user shared a link
    let userContent = text;
    const sharedUrl = extractFirstUrl(text);
    if (sharedUrl) {
      const pageText = await fetchPageText(sharedUrl);
      if (pageText) {
        userContent = `${text}\n\n[CONTENIDO DE LA PÁGINA COMPARTIDA (${sharedUrl})]\n${pageText}`;
      }
    }

    messages.push({ role: "user", content: userContent });

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