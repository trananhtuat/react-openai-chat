import express from "express";
import { tokenAuth } from "../middlewares/token.middleware.js";
import { chatCompletion } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", tokenAuth, chatCompletion);

export default router;