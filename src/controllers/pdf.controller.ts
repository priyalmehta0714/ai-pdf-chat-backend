import { Request, Response } from "express";

import { extractPdfText } from "../services/pdf.service";
import { generateEmbedding } from "../services/embedding.service";

import { chunkText } from "../utils/chunkText";
import { prisma } from "../config/prisma";

export const uploadPdf = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No PDF uploaded",
      });
    }

    const extractedText = await extractPdfText(req.file.path);

    const chunks = chunkText(extractedText);

    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk);

      await prisma.documentChunk.create({
        data: {
          content: chunk,
          embedding,
        },
      });
    }

    return res.status(200).json({
      message: "PDF processed and stored successfully",
      totalChunks: chunks.length,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error processing PDF",
    });
  }
};