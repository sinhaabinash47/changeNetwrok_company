import React from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "../components/Register";
import { Login } from "../components/Login";
import { Home } from "../components/Home";
import { Leaderboard } from "../components/Leaderboard";


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
};
