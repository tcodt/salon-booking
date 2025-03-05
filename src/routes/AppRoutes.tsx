import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Auth from "../pages/Auth/Auth";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <HomePage />
            </PrivateRoutes>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
