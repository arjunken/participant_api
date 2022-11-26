import mongoose from "mongoose";
import { ObjectID } from "bson";

const participantSchema = new mongoose.Schema({
  id: ObjectID,
  name: String,
  age: Number,
  phone: String,
  date: { type: Date, default: Date.now },
});

//Create a Model
const Participant = mongoose.model("Participant", participantSchema);
// const participant = new Participant({
//   name: "David",
//   age: 62,
//   phone: 45655753,
// });

export default Participant;
