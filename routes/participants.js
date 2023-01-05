import express from "express";
import Participant from "../models/participant.js";
import Joi from "joi";
import auth from "../middleware/auth.js";

// import fetch from "node-fetch";

const router = express.Router();

//GET REQUESTS

router.get("/", auth, async (req, res) => {
  // Data from Json server
  // const response = await fetch("http://localhost:3000/participants");
  // const data = await response.json();
  // res.send(JSON.stringify(data));
  //Data from MongoDB
  //Query participants
  const result = await Participant.find();
  res.send(result);
});

//POST REQUESTS

const inputSchema = Joi.object({
  name: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  age: Joi.number().min(1).required(),
  phone: Joi.number().min(1).required(),
});

router.post("/", auth, async (req, res) => {
  const validationRes = inputSchema.validate(req.body);

  if (validationRes.error) {
    res.status(400).send({ status: "Invalid Inputs! Try again." });
    return;
  }

  const participant = new Participant({
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
  });

  //Save new participant
  participant
    .save()
    .then(() => {
      res.status(200).send({ status: "A new participant has been added!" });
    })
    .catch((err) => {
      res.status(400).send({ status: err.message });
    });
});

//PUT REQUESTS

router.put("/:id", auth, async (req, res) => {
  const data = {
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
  };
  const validationRes = inputSchema.validate(data);

  if (validationRes.error) {
    res.status(400).send({ status: "Invalid Inputs! Try again." });
    return;
  }

  const result = await Participant.updateOne(
    { _id: req.params.id },
    {
      $set: data,
    }
  );

  //Return message
  if (result) {
    res.status(200).send({ status: "Participant's data has been updated!" });
  } else {
    res.status(400).send({ status: "Could not update the participant" });
  }
});

//DELETE REQUESTS

router.delete("/:id", auth, async (req, res) => {
  const result = await Participant.deleteOne({ _id: req.params.id });

  //Return message
  if (result) {
    res.status(200).send({ status: "Selected Participant has been deleted!" });
  } else {
    res.status(400).send({ status: "Could not delete the participant" });
  }
});

export default router;
