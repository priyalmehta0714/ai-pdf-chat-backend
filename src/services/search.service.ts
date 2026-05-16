import similarity from "compute-cosine-similarity";

import { prisma } from "../config/prisma";
import { generateEmbedding } from "./embedding.service";

interface ScoredChunk {
  content: string;
  score: number;
}

export const searchSimilarChunks = async (
  question: string
): Promise<ScoredChunk[]> => {
  const questionEmbedding = await generateEmbedding(question);

  const chunks = await prisma.documentChunk.findMany();

  const scoredChunks: ScoredChunk[] = chunks.map(
    (chunk: {
      content: string;
      embedding: number[];
    }) => ({
      content: chunk.content,

      score:
        similarity(
          questionEmbedding,
          chunk.embedding
        ) || 0,
    })
  );

  scoredChunks.sort(
    (a: ScoredChunk, b: ScoredChunk) =>
      b.score - a.score
  );

  return scoredChunks.slice(0, 3);
};