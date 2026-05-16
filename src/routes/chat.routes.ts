import express from "express";

import { askQuestion } from "../controllers/chat.controller";

const router = express.Router();

router.post("/ask", askQuestion);

export default router;