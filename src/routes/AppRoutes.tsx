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
import AppointmentsList from "../pages/AppointmentsList/AppointmentsList";
import Settings from "../pages/Settings/Settings";
import ManageEmployees from "../pages/ManageEmployees/ManageEmployees";
import AddEmployee from "../pages/AddEmployee/AddEmployee";
import NotFound from "../pages/NotFound/NotFound"; // Import the NotFound page

const AppRoutes: React.FC = () => {
  const token = localStorage.getItem("accessToken");

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route
          path="/auth"
          element={token ? <Navigate to="/dashboard" /> : <Auth />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/receive-code" element={<ForgotPasswordCode />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Authenticated routes with MainLayout */}
        <Route
          element={
            <PrivateRoutes>
              <MainLayout />
            </PrivateRoutes>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reserve" element={<Reserve />} />

          {/* Shared authenticated routes */}
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/appointments-list" element={<AppointmentsList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/manage-employees" element={<ManageEmployees />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        </Route>

        {/* Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
