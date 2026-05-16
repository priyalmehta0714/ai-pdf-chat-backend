import { Request, Response } from "express";

import { searchSimilarChunks } from "../services/search.service";
import { generateAnswer } from "../services/chat.service";

export const askQuestion = async (
  req: Request,
  res: Response
) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const similarChunks =
      await searchSimilarChunks(question);

    const context = similarChunks
      .map((chunk) => chunk.content)
      .join("\n");

    const answer = await generateAnswer(
      context,
      question
    );

    return res.status(200).json({
      question,
      answer,
      matchedChunks: similarChunks,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error generating answer",
    });
  }
};