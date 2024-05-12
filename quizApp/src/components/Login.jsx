import React, { useState } from "react";
import { Card, CardContent, FormControl } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/cookies";

export const Login = ({setUser}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );
      toast.success("Login successful...!", { autoClose: 1000 });
      setCookie("abinashtoken", response.data.token, 1);
      setTimeout(() => {
        navigate("/home", { state: { userId: response.data.token } });
      }, 2000);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        const errorMessage = error.response.data.error || error.response.data.message;
        toast.error(errorMessage, { autoClose: 1000 });
      } else {
        toast.error("Network error. Please try again later.", {
          autoClose: 1000,
        });
      }
      console.error("Error logging in:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ToastContainer />
      <Card className="col-md-3 bg-warning">
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <div className="sign-up mt-4">
              <span className="me-2">Don't have an account?</span>{" "}
              <Link to="/register">Register</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
