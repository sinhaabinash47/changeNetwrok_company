import questions from "../utils/questions.json";
import userSchema from "../models/userModel.js";
import { verifyToken } from "../utils/token.js";

export const getRandomQuestionsByTopic = (topics, count) => {
  const filteredQuestions = questions.filter((question) => {
    return topics.some(
      (topic) => question.topic.toLowerCase() === topic.toLowerCase()
    );
  });
  const getFiltrQusiton = filteredQuestions.map(question =>{
    return {
      question: question.question,
      options: question.options,
      topic: question.topic,
    }
  })
  const shuffledQuestions = getFiltrQusiton.sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, count);
};



export const submitAnswers = async (req, res) => {
  try {
    const { answers } = req.body;
    const tokenParts = req.headers.authorization.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res
        .status(401)
        .json({ error: "Invalid authorization header format", status: 401 });
    }

    const token = tokenParts[1];
    const { userId } = verifyToken(token);
    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found", status: 404 });
    }
    const filteredQuestions = questions.filter((question) =>
      user.topics.includes(question.topic.toLowerCase())
    );

    let score = 0;
    const correctAnswers = [];

    filteredQuestions.forEach((question, index) => {
      const userAnswer = answers[index];

      const isCorrect =
        userAnswer.trim().toLowerCase() ===
        question.answer.trim().toLowerCase();

      if (isCorrect) {
        score = score + 1;
      }
      correctAnswers.push({
        correctAnswer: question.answer,
        question: question.question,
        userAnswer,
      });
    });
    console.log(score);
    const percentageScore = (score / filteredQuestions.length) * 100;
    res.status(200).json({ score, percentageScore, correctAnswers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit answers.", status: 500 });
  }
};
