import cors from "cors";
import express from "express";
import { config } from "../../config";

const app = express();
const allowedOrigins = config.ALLOW_ORIGINS.split(",");
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin || "")) {
        return callback(null, true);
      }
      console.error(`Origen no permitido por CORS: ${origin}`);
      return callback(new Error("No permitido por CORS"));
    },
  }),
);
app.use(express.json());
app.get("", (req, res) => {
  res.send("Server is running!");
});

export { app };
