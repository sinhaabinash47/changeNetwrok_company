import React, { useState } from "react";
import { Button, Card, CardContent, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const apiUrl = "process.env.REACT_APP_API_URL_DEVELOPMENT";
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = (type) => {
    if (type === "password") {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    } else if (type === "confirmPassword") {
      setShowConfirmPassword(
        (prevShowConfrimPassword) => !prevShowConfrimPassword
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //   const response = await axios.post(`${apiUrl}/register`, formData);
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData
      );
      toast.success("Registration successful...!", { autoClose: 1000 });
    //   setTimeout(() => {
        navigate("/");
    //   }, 1000);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage, { autoClose: 1000 });
      } else {
        toast.error("Network error. Please try again later.", {
          autoClose: 1000,
        });
      }
      console.error("Error registering:", error);
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
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputname" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email address"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control text-black"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <IconButton
                  className="password-toggle-icon"
                  onClick={() => handleTogglePasswordVisibility("password")}
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">
                Confirm Password
              </label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control text-black"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <IconButton
                  className="password-toggle-icon"
                  onClick={() =>
                    handleTogglePasswordVisibility("confirmPassword")
                  }
                  aria-label="toggle password visibility"
                >
                  {showConfirmPassword ? (
                    <RemoveRedEyeIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <Button type="submit" variant="contained" className="w-100">
              Register
            </Button>
            <div className="sign-up mt-4">
              <span className="me-2">Already have an account?</span>{" "}
              <Link to="/">Login</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
