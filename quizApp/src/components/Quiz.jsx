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
import { Leaderboard } from "./Leaderboard";
import { getCookie } from "../utils/cookies";

export const Quiz = ({ questions }) => {
  const [answers, setAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const token = getCookie("abinashtoken");

  const toggleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const handleAnswerSubmit = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption,
    });
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
      updateLeaderboard(
        response.data.score,
        response.data.percentageScore,
        response.data.wrongAnswer
      );
      const filterCorrectAnswer = response?.data?.correctAnswers?.map(
        (item) => item.correctAnswer
      );
      setCorrectAnswers(filterCorrectAnswer);
      toggleRefresh();
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };
  // leaderboard
  const updateLeaderboard = async (score, percentageScore, wrongAnswer) => {
    try {
      const getUserData = getCookie("userDetails");
      const parseUserData = JSON.parse(getUserData);
      const payload = {
        name: parseUserData.name,
        email: parseUserData.email,
        correctAnswer: score,
        wrongAnswer: wrongAnswer,
        average: percentageScore,
      };
      const response = await axios.post(
        "http://localhost:3000/api/users/leaderboard",
        payload
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (submitted) {
    return (
      <div className="container">
        <h2>Thank you for submitting!</h2>
        <Leaderboard refresh={refresh} toggleRefresh={toggleRefresh} />
      </div>
    );
  }

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
                    className={`${
                      correctAnswers?.includes(option) ? "text-success" : ""
                    }`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        ))}
        <div style={{ textAlign: "right" }}>
          <Button
            type="button"
            onClick={handleSubmitAnswers}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>
      <Leaderboard refresh={refresh} toggleRefresh={toggleRefresh} />
    </div>
  );
};

export default Quiz;
