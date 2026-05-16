import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pdfRoutes from "./routes/pdf.routes";
import chatRoutes from "./routes/chat.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("AI PDF Chat Backend Running");
});

app.use("/api/pdf", pdfRoutes);

app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});