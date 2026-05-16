import express from "express";
import { upload } from "../config/multer";
import { uploadPdf } from "../controllers/pdf.controller";

const router = express.Router();

/**
 * @swagger
 * /api/pdf/upload:
 *   post:
 *     summary: Upload PDF and generate embeddings
 *     tags:
 *       - PDF
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: PDF processed successfully
 */

router.post("/upload", upload.single("pdf"), uploadPdf);

export default router;