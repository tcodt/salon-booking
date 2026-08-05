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
import NotFound from "../pages/NotFound/NotFound";
import OfflinePage from "../pages/OfflinePage/OfflinePage";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import ViewAppointment from "../pages/ViewAppointment/ViewAppointment";
import ManageServices from "../pages/ManageServices/ManageServices";
import UpdateAppointment from "../pages/UpdateAppointment/UpdateAppointment";
import WorkingTime from "../pages/WorkingTime/WorkingTime";
import AddWorkingTime from "../pages/AddWorkingTime/AddWorkingTime";
import Sliders from "../pages/Sliders/Sliders";
import UpdateWorkingTime from "../pages/UpdateWorkingTime/UpdateWorkingTime";
import Packages from "../pages/Packages/Packages";
import PackagesInfo from "../pages/PackagesInfo/PackagesInfo";
import Logout from "../pages/Logout/Logout";
import AclManager from "../components/AclManager/AclManager";
import { useAuth } from "../context/AuthContext";
import Wallet from "../pages/Wallet/Wallet";
import AvailableTimes from "../pages/AvailableTimes/AvailableTimes";
import UserProfileDetail from "../pages/UserProfileDetail/UserProfileDetail";
import UpdateSlots from "../pages/UpdateSlots/UpdateSlots";
import Users from "../pages/Users/Users";
import { UserTypeProvider } from "../context/UserTypeContext";
import RoleAuthentication from "../pages/RoleAuthentication/RoleAuthentication";
import CreateBusiness from "../pages/CreateBusiness/CreateBusiness";
import RandomCodeInput from "../pages/RandomCodeInput/RandomCodeInput";
import UserFlow from "../layout/UserFlow";
import WaitingRoom from "../pages/WaitingRoom/WaitingRoom";
import { BusinessStatusGuard } from "../components/BusinessStatusGuard/BusinessStatusGuard";

// Wrapper component for offline detection
const NetworkStatusWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useNetworkStatus(); // Applies offline redirect
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <UserTypeProvider>
        <Routes>
          {/* Public routes (no guard needed) */}
          <Route path="/" element={<SplashScreen />} />
          <Route
            path="/auth"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Auth />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/receive-code" element={<ForgotPasswordCode />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/acl" element={<AclManager />} />
          <Route path="/offline" element={<OfflinePage />} />

          {/* Role Authentication Flow (no business check needed) */}
          <Route element={<UserFlow />}>
            <Route
              path="/role-authentication"
              element={<RoleAuthentication />}
            />
            <Route path="/create-business" element={<CreateBusiness />} />
            <Route path="/random-code-input" element={<RandomCodeInput />} />
          </Route>

          {/* Waiting Room - accessible without MainLayout */}
          <Route
            path="/waiting-room"
            element={
              <PrivateRoutes>
                <NetworkStatusWrapper>
                  <BusinessStatusGuard>
                    <WaitingRoom />
                  </BusinessStatusGuard>
                </NetworkStatusWrapper>
              </PrivateRoutes>
            }
          />

          {/* Authenticated routes with MainLayout and Business Guard */}
          <Route
            element={
              <PrivateRoutes>
                <BusinessStatusGuard>
                  <NetworkStatusWrapper>
                    <MainLayout />
                  </NetworkStatusWrapper>
                </BusinessStatusGuard>
              </PrivateRoutes>
            }
          >
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route
              path="/user-profile-detail/:id"
              element={<UserProfileDetail />}
            />
            <Route path="/appointments-list" element={<AppointmentsList />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/manage-employees"
              element={
                <PrivateRoutes>
                  <ManageEmployees />
                </PrivateRoutes>
              }
            />
            <Route path="/manage-services" element={<ManageServices />} />
            <Route path="/view-appointment/:id" element={<ViewAppointment />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/available-times" element={<AvailableTimes />} />
            <Route
              path="/update-appointment/:id"
              element={<UpdateAppointment />}
            />
            <Route path="/update-slots/:id" element={<UpdateSlots />} />
            <Route path="/working-time" element={<WorkingTime />} />
            <Route path="/add-working-time" element={<AddWorkingTime />} />
            <Route path="/sliders" element={<Sliders />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/update-working-time/:id"
              element={<UpdateWorkingTime />}
            />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<PackagesInfo />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

          {/* Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserTypeProvider>
    </Router>
  );
};

export default AppRoutes;
