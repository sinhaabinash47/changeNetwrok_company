import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import "../styles/Quiz.css";
import { Leaderboard } from "./Leaderboard";

export const Quiz = ({ selectedOptions, token, questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSubmit, setShowSubmit] = useState(false);
  const [score, setScore] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [percentageScore, setPercentageScore] = useState(null);

  const handleAnswerSubmit = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption,
    });
    // const currentQuestion = questions[currentIndex];
    // const isCorrect = currentQuestion.answer === selectedOption;
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSubmit(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowSubmit(false);
    }
  };

  const handleSubmitAnswers = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/submitanswers",
        {
          userId: token,
          answers: Object.values(answers),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setScore(response.data.score);
      setPercentageScore(response.data.percentageScore);
      setCorrectAnswers(response.data.correctAnswers);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <div className="container">
      <div className="p-3">
        {questions.map((question, index) => (
          <div key={index}>
            <FormControl component="fieldset">
              <FormLabel component="legend">{question.question}</FormLabel>
              <RadioGroup
                aria-label={question.question}
                name={`question-${index}`}
                value={answers[`question-${index}`] || ""}
                onChange={(e) =>
                  handleAnswerSubmit(`question-${index}`, e.target.value)
                }
              >
                {question.options.map((option, optionIndex) => (
                  <FormControlLabel
                    key={optionIndex}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        ))}
        <div style={{ textAlign: "right" }}>
          <Button
            type="button"
            className="me-2"
            variant="contained"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={
              currentIndex < questions.length - 1
                ? handleNext
                : handleSubmitAnswers
            }
            variant="contained"
          >
            {currentIndex < questions && questions.length - 1
              ? "Next"
              : "Submit"}
          </Button>
        </div>
      </div>
      <Leaderboard score={score} percentageScore={percentageScore}/>
    </div>
  );
};

export default Quiz;
