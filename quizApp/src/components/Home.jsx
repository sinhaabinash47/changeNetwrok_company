import React, { useState, useEffect } from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Select from "react-dropdown-select";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Quiz } from "./Quiz";
import { deleteCookie, getCookie } from "../utils/cookies";

export const Home = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const token = getCookie("abinashtoken");

  const options = [
    { value: "Python", name: "python" },
    { value: "JavaScript", name: "javascript" },
    { value: "Redux", name: "redux" },
    { value: "Angular", name: "angular" },
  ];

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/topics",
        { topics: selectedOptions.map((option) => option.name) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedOptions([]);
      toast.success("Add successful...!", { autoClose: 1000 });
      setTimeout(() => {
        fetchQuestions();
      }, 1500);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        toast.error(errorMessage, { autoClose: 1000 });
      } else {
        toast.error("Network error. Please try again later.", {
          autoClose: 1000,
        });
      }
      console.error("Error logging in:", error.response.data.error);
    }
  };
  const selectedTopicNames = selectedOptions
    .map((option) => option.name)
    .join(",");

  const fetchQuestions = async () => {
    if (selectedOptions.length > 0) {
      try {
        const url = `http://localhost:3000/api/users/questions/${selectedTopicNames}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    }
  };

  const logout = () => {
    deleteCookie("abinashtoken");
    deleteCookie("userDetails");
    window.location.reload();
  };

  return (
    <div>
      <ToastContainer />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Change Networks
          </Typography>
          <div
            onClick={() => logout()}
            className="text-white"
            style={{ cursor: "pointer" }}
          >
            Logout
          </div>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <div className="col-md-10" style={{ backgroundColor: "#bdb1b1" }}>
          <div className="d-flex justify-content-between p-3">
            <Select
              name="select"
              options={options}
              labelField="value"
              valueField="name"
              multi
              create
              style={{ width: "500px" }}
              onChange={(value) => setSelectedOptions(value)}
            ></Select>
            <Button onClick={handleSubmit} variant="contained" color="warning">
              Submit
            </Button>
          </div>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <div
          className="col-md-10"
          style={{ backgroundColor: "rgb(247 247 247)" }}
        >
          <Quiz
            selectedOptions={selectedOptions}
            questions={questions}
          />
        </div>
      </Box>
    </div>
  );
};
