import { generateGeminiResponse } from "../../services/llm.service";

export async function runLlmJob(input: { prompt: string }) {
  const output = await generateGeminiResponse({
    prompt: input.prompt,
  });

  return {
    output,
  };
}
