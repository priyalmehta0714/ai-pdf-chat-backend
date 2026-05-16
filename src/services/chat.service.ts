import { openai } from "../config/openai";

export const generateAnswer = async (
  context: string,
  question: string
) => {
  const response =
    await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content:
            "Answer the user's question only from provided context.",
        },

        {
          role: "user",
          content: `
Context:
${context}

Question:
${question}
`,
        },
      ],
    });

  return response.choices[0].message.content;
};