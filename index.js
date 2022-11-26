import express from "express";
import participants from "./routes/participants.js";
import home from "./routes/home.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Database Connection
mongoose
  .connect("mongodb://localhost/participants")
  .then(() => console.log("DB Connected.."))
  .catch((err) => console.log(err));

//Routes
app.use("/", home);
app.use("/participants", participants);

//Start express server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
