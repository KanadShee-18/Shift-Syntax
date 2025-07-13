import express from "express";
import cors from "cors";
import { dbConnect } from "./config/database.js";
import authRouter from "../src/routes/user.route.js";
import chatRouter from "../src/routes/chat.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());

dbConnect();

const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://shift-syntax.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "CORS policy does not allow access from this origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization,Accept",
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use("/api/v1/user", authRouter);
app.use("/api/v1/chat", chatRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Serer is healthy!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ...`);
});
