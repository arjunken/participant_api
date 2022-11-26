import express from "express";
import participants from "./routes/participants.js";
import home from "./routes/home.js";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Database Connection
// .connect("mongodb://localhost/participants")
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@experiments.d1gjsmt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB Connected.."))
  .catch((err) => console.log(err));

//Routes
app.use("/", home);
app.use("/participants", participants);

//Start express server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));

//Export the express API for Vercel's Serverless function
export default app;
