import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import Header from "./layout/header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PaymentManagement from "./pages/PaymentManagement";
import TourManagement from "./pages/TourManagement";
import ReservationManagement from "./pages/ReservationManagement";
import ReservationPage from "./pages/ReservationsPage";
import TourPage from "./pages/TourPage";
import Voucher from "./pages/Voucher";
import Dashboard from "./pages/Dashboard";
import MFAPage from "./pages/MFAPage";
import TourDetails from "./pages/TourDetails";
import RegisterMFA from "./pages/RegisterMFA";
import LayoutPayment from "./layout/LayoutPayment";
import LayoutAdmin from "./layout/LayoutAdmin";
import { getSessionData } from "./services/UserService";
import { useNavigate } from "react-router-dom";

const getUserRole = async () => {
  const sessionData = await getSessionData();
  return sessionData?.user?.role ?? null;
};

const isAuthenticated = async () => {
  const sessionData = await getSessionData();
  return sessionData?.user !== undefined;
};

const ProtectedRoute = ({ children, role }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      const role = await getUserRole();
      console.log("Authentication status:", auth);
      console.log("User role:", role);
      setIsAuth(auth);
      setUserRole(role);
    };

    if (isAuth === null) {
      checkAuthentication();
    }
  }, [isAuth]); 

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    console.log("Not authenticated! Redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    console.log(
      `User role is ${userRole}. Expected role: ${role}. Redirecting...`
    );
    switch (userRole) {
      case 1:
        navigate("/", { replace: true });
        break;
      case 2:
        navigate("/dashboard", { replace: true });
        break;
      case 3:
        navigate("/payments/manage", { replace: true });
        break;
      default:
        navigate("/", { replace: true });
    }
    return null; 
  }

  console.log("Role matches, rendering children");
  return <>{children}</>; 
};

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header />
              <Register />
            </>
          }
        />
        <Route
          path="/register-mfa"
          element={
            <>
              <Header />
              <RegisterMFA />
            </>
          }
        />
        <Route
          path="/mfa"
          element={
            <>
              <Header />
              <MFAPage />
            </>
          }
        />

        {/* CLIENT ROUTES */}
        <Route
          path="/voucher"
          element={
            <>
              <Header />
              <ProtectedRoute element={<Voucher />} role={1} />
            </>
          }
        />
        <Route
          path="/tour/:id"
          element={
            <>
              <Header />
              <ProtectedRoute element={<TourDetails />} role={1} />
            </>
          }
        />
        <Route
          path="/reservations/:id"
          element={
            <>
              <Header />
              <ProtectedRoute element={<ReservationPage />} role={1} />
            </>
          }
        />
        <Route
          path="/tours"
          element={
            <>
              <Header />
              <ProtectedRoute element={<TourPage />} role={1} />
            </>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role={2}>
              <LayoutAdmin>
                <Dashboard />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />
                <Route
          path="/tours/manage"
          element={
            <ProtectedRoute role={2}>
              <LayoutAdmin>
                <TourManagement />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />
                <Route
          path="/reservations/manage"
          element={
            <ProtectedRoute role={2}>
              <LayoutAdmin>
                <ReservationManagement />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />

        {/* OPERATOR ROUTES */}
        <Route
          path="/payments/manage"
          element={
            <ProtectedRoute role={3}>
              <LayoutPayment>
                <PaymentManagement />
              </LayoutPayment>
            </ProtectedRoute>
          }
        />

        {/* REDIRECT UNKNOWN ROUTES */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
