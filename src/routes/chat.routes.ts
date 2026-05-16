import express from "express";

import { askQuestion } from "../controllers/chat.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: AI chat APIs
 */

/**
 * @swagger
 * /api/chat/ask:
 *   post:
 *     summary: Ask questions from uploaded PDF
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 example: What is the subject of the PDF?
 *     responses:
 *       200:
 *         description: AI-generated answer
 */

router.post("/ask", askQuestion);

export default router;