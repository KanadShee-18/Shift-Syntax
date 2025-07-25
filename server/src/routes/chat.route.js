import express from "express";
const router = express.Router();
import { convertCode } from "../controllers/chat.controller.js";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";

router.post("/query", convertCode);

export default router;
