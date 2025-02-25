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
import { getSessionData } from "./services/UserService";
import { useNavigate } from "react-router-dom";

const getUserRole = async () => {
  const sessionData = await getSessionData();
  console.log("Session Data:", sessionData);
  return sessionData?.user?.role ?? null;
};

const isAuthenticated = async () => {
  const sessionData = await getSessionData();
  console.log("Authenticated:", sessionData?.user !== undefined);
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
      setIsAuth(auth);
      setUserRole(role);
    };
    checkAuthentication();
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    console.log("Not authenticated! Redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  if (role && userRole != role) {
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

  return children;
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
              <ProtectedRoute element={<Voucher />} role="1" />
            </>
          }
        />
        <Route
          path="/tour/:id"
          element={
            <>
              <Header />
              <ProtectedRoute element={<TourDetails />} role="1" />
            </>
          }
        />
        <Route
          path="/reservations/:id"
          element={
            <>
              <Header />
              <ProtectedRoute element={<ReservationPage />} role="1" />
            </>
          }
        />
          <Route
            path="/tours"
            element={
              <>
                <Header />
                <ProtectedRoute element={<TourPage />} role="1" />
              </>
            }
          />

        {/* ADMIN ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <LayoutPayment>
                  <Dashboard />
                </LayoutPayment>
              }
              role="2"
            />
          }
        />
        <Route
          path="/tours/manage"
          element={
            <ProtectedRoute
              element={
                <LayoutPayment>
                  <TourManagement />
                </LayoutPayment>
              }
              role="2"
            />
          }
        />
        <Route
          path="/reservations/manage"
          element={
            <ProtectedRoute
              element={
                <LayoutPayment>
                  <ReservationManagement />
                </LayoutPayment>
              }
              role="2"
            />
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
