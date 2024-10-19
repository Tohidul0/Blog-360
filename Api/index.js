import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
const PORT = process.env.PORT || 3000;

// var cors = require("cors");

// mongodb connect----------------------------
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((error) => {
    console.log(error);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// User API-----------------------------------------------
app.use("/api/user", userRouter);

// signUp ApI---------------------------------------
app.use("/api", authRouter);

// post Api---------------------------------
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.use(express.static(path.join(__dirname, "/Client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Client", "dist", "index.html"));
});
// error hendleing----------------------------------------
app.use((err, req, res, next) => {
  const statusCode = req.statusCode || 500;
  const maessage = err.message || "internal server error";
  res.status(statusCode).json({
    success: "false",
    statusCode,
    maessage,
  });
});
