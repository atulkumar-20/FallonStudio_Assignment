import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { feedbackRoutes } from "./routes/feedback.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Development
  "https://feedback-collectorrr.netlify.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(
          new Error(
            "The CORS policy for this site does not allow access from the specified Origin."
          ),
          false
        );
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"],
    exposedHeaders: ["Content-Length", "X-Confirm-Delete"],
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/feedback", feedbackRoutes);

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
