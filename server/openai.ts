import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateAnswer(question: string, files: string[] = []): Promise<string> {
  try {
    let systemPrompt = "You are MSBI.AI, a specialized AI assistant for biological and bioinformatics research. Provide detailed, academic-style answers with references where possible.";
    
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: question }
    ];

    if (files.length > 0) {
      messages.push({
        role: "user",
        content: "Context from uploaded files:\n" + files.join("\n\n")
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0].message.content || "No answer generated";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate answer");
  }
}
