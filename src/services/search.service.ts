import similarity from "compute-cosine-similarity";

import { prisma } from "../config/prisma";
import { generateEmbedding } from "./embedding.service";

export const searchSimilarChunks = async (
  question: string
) => {
  const questionEmbedding = await generateEmbedding(question);

  const chunks = await prisma.documentChunk.findMany();

  const scoredChunks = chunks.map((chunk) => ({
    content: chunk.content,

    score: similarity(
      questionEmbedding,
      chunk.embedding
    ),
  }));

  scoredChunks.sort((a, b) => {
    return (b.score || 0) - (a.score || 0);
  });

  return scoredChunks.slice(0, 3);
};