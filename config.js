import "dotenv/config";

export const config = {
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://cbarrios_db_user:59k84TAT9pgBfbuk@cbcluster.eods84z.mongodb.net/?retryWrites=true&w=majority",
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "canvas-api-v2",
  API_KEY: process.env.API_KEY || "2879",
  ALLOW_ORIGINS: process.env.ALLOW_ORIGINS || "http://localhost:5173",
  PIN: process.env.PIN || "1234567",
};
