import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";

const MODEL_NAME = "models/text-bison-001";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(process.env.PALM_API_KEY || ""),
});

export async function generateAnswer(question: string, files: string[] = []): Promise<string> {
  try {
    let prompt = "You are MSBI.AI, a specialized AI assistant for biological and bioinformatics research. Provide detailed, academic-style answers with references where possible.\n\n";
    prompt += `Question: ${question}\n\n`;

    if (files.length > 0) {
      prompt += "Context from uploaded files:\n" + files.join("\n\n") + "\n\n";
    }

    const result = await client.generateText({
      model: MODEL_NAME,
      prompt: {
        text: prompt,
      },
    });

    const generatedText = result[0]?.candidates?.[0]?.output;
    
    if (!generatedText) {
      throw new Error("No response generated");
    }

    return generatedText;
  } catch (error) {
    console.error("PaLM API error:", error);
    throw new Error("Failed to generate answer");
  }
}
