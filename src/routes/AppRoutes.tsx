import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Auth from "../pages/Auth/Auth";
import SplashScreen from "../components/SplashScreen/SplashScreen";
import UserProfile from "../pages/UserProfile/UserProfile";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ForgotPasswordCode from "../pages/ForgotPasswordCode/ForgotPasswordCode";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import Dashboard from "../pages/Dashboard/Dashboard";
import Reserve from "../pages/Reserve/Reserve";
import MainLayout from "../layout/MainLayout";

const AppRoutes: React.FC = () => {
  const token = localStorage.getItem("accessToken");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route
          path="/auth"
          element={token ? <Navigate to="/dashboard" /> : <Auth />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>
          <Route
            path="/home"
            element={
              <PrivateRoutes>
                <HomePage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            }
          >
            <Route path="user-profile" element={<UserProfile />} />
          </Route>
          <Route
            path="/reserve"
            element={
              <PrivateRoutes>
                <Reserve />
              </PrivateRoutes>
            }
          />
        </Route>

        {/* <Route path="/reserve" element={<Reserve />} />
        <Route path="/user-profile" element={<UserProfile />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/receive-code" element={<ForgotPasswordCode />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
