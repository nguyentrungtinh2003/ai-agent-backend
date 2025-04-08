import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.config";
import authRoutes from "./routes/auth.routes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("api/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
