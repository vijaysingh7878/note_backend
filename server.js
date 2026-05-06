import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./router/userRoute.js";
import noteRouter from "./router/noteRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*", 
  }),
); 


app.use(express.json());


app.use("/api/user",userRouter);
app.use("/api/note",noteRouter);
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
