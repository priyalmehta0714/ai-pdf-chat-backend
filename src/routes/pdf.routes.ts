import express from "express";
import { upload } from "../config/multer";
import { uploadPdf } from "../controllers/pdf.controller";

const router = express.Router();

router.post("/upload", upload.single("pdf"), uploadPdf);

export default router;