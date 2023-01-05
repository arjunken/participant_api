import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "Welcome to Participants API! Visit RapidAPI to use the API endpoints",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error!");
  }
});

export default router;
