import { OpenAI } from "openai";
import fs from 'fs';
import path from 'path';

// Helper para lectura manual de variables si no estǭn en process.env (Next.js Edge Runtime sometimes)
function getManualEnvKeys() {
  const keys = {
    logs: [] as string[],
    deepseek: process.env.DEEPSEEK_API_KEY || null,
    openrouter: process.env.OPENROUTER_API_KEY || null,
  };

  if (keys.deepseek) return keys;

  const pathsToCheck = ['.env.local', '.env.local.txt'];
  for (const fileName of pathsToCheck) {
    const envPath = path.resolve(process.cwd(), fileName);
    keys.logs.push(`Checking ${envPath}...`);
    if (fs.existsSync(envPath)) {
      keys.logs.push(`Found ${fileName}!`);
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
        if (key.trim() === 'DEEPSEEK_API_KEY') keys.deepseek = value;
        if (key.trim() === 'OPENROUTER_API_KEY') keys.openrouter = value;
      }
    }
  }
  return keys;
}

// Implementacin simple de retry
async function fetchWithRetry(fn: () => Promise<any>, retries = 2) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      if (i === retries - 1) throw err;
      if (err.status === 429) { // Rate limit
        await new Promise(r => setTimeout(r, 2000 * (i + 1)));
        continue;
      }
      throw err;
    }
  }
}

export async function POST(req: Request) {
  try {
    const { logs, deepseek: dsKey, openrouter: orKey } = getManualEnvKeys();

    console.log("=== DISC ANALYZE DEBUG ===");
    console.log("DeepSeek Key Loaded:", !!dsKey);
    console.log("OpenRouter Key Loaded:", !!orKey);
    console.log("=======================================");

    if (!dsKey) {
      return Response.json({ 
        error: "No se encontró DEEPSEEK_API_KEY. Asegúrate de tener un archivo .env.local o .env.local.txt en la raíz con el formato DEEPSEEK_API_KEY=sk-...",
        details: logs
      }, { status: 500 });
    }

    const openaiDeepSeek = new OpenAI({
      apiKey: dsKey,
      baseURL: "https://api.deepseek.com/v1",
    });

    const { D, I, S, C } = await req.json();

    const prompt = `
Eres un psicólogo organizacional experto en DISC. 
Con base en los siguientes valores: D=${D}, I=${I}, S=${S}, C=${C}, 
genera un análisis profesional en español de entre 300 y 400 palabras. 
Debes detallar el perfil dominante, sus fortalezas clave, áreas de mejora y recomendaciones de roles laborales ideales.
No uses markdown, responde solo con el texto plano del análisis.
`;

    try {
      // 1. Intento principal con DeepSeek
      const completion = await fetchWithRetry(() => 
        openaiDeepSeek.chat.completions.create({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: "Eres un analista experto en recursos humanos y psicometría DISC." },
            { role: "user", content: prompt }
          ],
          temperature: 0.7
        })
      );

      const text = completion.choices[0].message.content || "";
      return Response.json({ success: true, analysis: text.trim() });

    } catch (error: any) {
      // 2. Manejo específico del error 402 Insufficient Balance
      if (error.status === 402) {
        console.error("[DeepSeek 402 Error]: Saldo insuficiente en la cuenta DeepSeek.");
        
        // 3. Fallback a OpenRouter si existe una llave de respaldo
        if (orKey) {
          console.log("[Fallback Info]: Iniciando intento de rescate con OpenRouter usando el modelo gratuito...");
          try {
            const openaiOpenRouter = new OpenAI({
              apiKey: orKey,
              baseURL: "https://openrouter.ai/v1",
              defaultHeaders: {
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Hackes Jobs",
              },
            });
            const fallbackCompletion = await openaiOpenRouter.chat.completions.create({
              model: "google/gemini-2.0-flash-lite-preview-02-05", 
              messages: [
                { role: "system", content: "Eres un analista experto en recursos humanos y psicometría DISC." },
                { role: "user", content: prompt }
              ],
              temperature: 0.7
            });
            const fallbackText = fallbackCompletion.choices[0].message.content || "";
            return Response.json({ success: true, analysis: fallbackText.trim(), fallback_used: true });
          } catch (fallbackError: any) {
            console.error("[Fallback Error]: OpenRouter también falló.", fallbackError?.message);
            // Si el fallback falla, seguimos lanzando el 402 original para avisar del saldo
          }
        }

        // Si no hay llave de OpenRouter o falló, devolvemos el error amigable de saldo
        return Response.json({ 
          error: "La clave de DeepSeek no tiene saldo suficiente. Por favor, recarga crédito en https://platform.deepseek.com/billing o usa una nueva clave con saldo.",
          status: 402 
        }, { status: 402 });
      }

      // Si es otro tipo de error de DeepSeek (ej. 401, 500)
      console.error("[DeepSeek Critical Error]:", error?.message || error);
      return Response.json({ 
        error: "Fallo en el servicio de análisis de IA de DeepSeek." 
      }, { status: error?.status || 500 });
    }

  } catch (criticalError: any) {
    console.error("[Endpoint Critical Error]:", criticalError?.message);
    return Response.json({ error: "Fallo fatal en el servidor." }, { status: 500 });
  }
}

// Endpoint de diagnóstico
export async function GET(req: Request) {
  const { logs, deepseek, openrouter } = getManualEnvKeys();
  
  return Response.json({
    status: 'ok',
    isNextJsEnvLoaded: !!process.env.DEEPSEEK_API_KEY,
    isDeepSeekKeyLoaded: !!deepseek,
    isOpenRouterKeyLoaded: !!openrouter,
    logs: logs
  });
}
