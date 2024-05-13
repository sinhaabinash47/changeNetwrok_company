import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "../components/Register";
import { Login } from "../components/Login";
import { Home } from "../components/Home";
import { getCookie } from "../utils/cookies";

export const AppRoutes = () => {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const isAuthentict = getCookie("abinashtoken");
    if(isAuthentict) {
      setToken(isAuthentict);
      setUser(true);
    }else{
      setToken(null);
      setUser(false);
    }
  }, []);

  console.log(user);

  return (
    <>
      {user ? (
        <Routes>
          <Route path="/" element={<Home token={token}/>} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="*" element={<Login setUser={setUser} />} />
        </Routes>
      )}
    </>
  );
};
