import express from "express";
import { createUsers, loginUser } from "../controllers/userRegister.js";
import { userValidation } from "../middleware/validation.js";
import { getSelectedTopics } from "../controllers/userSelectedTopics.js";
import { getRandomQuestionsByTopic, submitAnswers } from "../controllers/quiz.js";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/register", userValidation, createUsers);
router.post("/login", loginUser);
router.post("/topics", getSelectedTopics);
router.get("/questions/:topics", async (req, res) => {
  try {
    const { topics } = req.params;
    const topicList = topics
      .split(",")
      .map((topic) => topic.trim().toLowerCase());
    const count = req.query.count || 10;
    const questions = getRandomQuestionsByTopic(topicList, count);
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Failed to fetch questions.", status: 500 });
  }
});
router.post("/submitanswers", submitAnswers);

export default router;
