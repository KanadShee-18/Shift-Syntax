import express from "express";
const router = express.Router();
import {
  getUser,
  loginUser,
  logout,
  registerUser,
} from "../controllers/user.controller.js";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";

router.post("/sign-up", registerUser);
router.post("/sign-in", loginUser);
router.post("/get-user", isUserAuthenticated, getUser);
router.post("/logout", isUserAuthenticated, logout);

export default router;
