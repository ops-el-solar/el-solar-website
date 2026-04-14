import type { Handler, HandlerEvent } from "@netlify/functions";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const SYSTEM_PROMPT =
  "Eres un estratega ejecutivo de El Solar, una agencia data driven con sistemas de IA. " +
  "El usuario te compartirá un pensamiento o situación caótica de su negocio. " +
  "Tu misión NO es darle la solución completa ('Estado Cero'), sino llevarlo a un punto de 'Semi-Orden'. " +
  "Devuelve EXACTAMENTE 2 viñetas concisas con primeros pasos para empezar a desenredar el problema, " +
  "y termina con: 'Este es el primer nivel de claridad. Para estructurar tu Estado Cero, " +
  "agenda tu diagnóstico inteligente.' " +
  "No des saludos ni texto extra. Usa viñetas con •. Tono profesional en español. Máximo 80 palabras.";

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

  let text: string;
  try {
    const body = JSON.parse(event.body || "{}");
    text = body.text?.trim();
    if (!text) throw new Error("missing text");
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "El campo 'text' es requerido" }),
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Servicio temporalmente no disponible" }),
    };
  }

  try {
    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text }] }],
        generationConfig: { maxOutputTokens: 256, temperature: 0.7 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!result) throw new Error("Empty response from Gemini");

    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({ result }),
    };
  } catch (err) {
    console.error("Gemini error:", err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Servicio temporalmente no disponible" }),
    };
  }
};