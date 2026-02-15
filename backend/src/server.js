import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateRoute from "./routes/generate.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/generate", generateRoute);

app.listen(process.env.PORT, () => {
  console.log(`Push2Prod running on port ${process.env.PORT}`);
});
