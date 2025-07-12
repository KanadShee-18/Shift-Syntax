import express from "express";
const router = express.Router();
import { generateChat } from "../controllers/chat.controller.js";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";

router.post("/query", generateChat);

export default router;
