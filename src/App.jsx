import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
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

const isAuthenticated = () => localStorage.getItem("token") !== null;
const getUserRole = () => localStorage.getItem("role");

const ProtectedRoute = ({ element, role }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (role && getUserRole() !== role) {
    return <Navigate to="/" replace />;
  }

  return element;
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* PUBLIC ROUTES */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mfa" element={<MFAPage />} />
        <Route path="/tours" element={<TourPage />} />

        {/* CLIENT ROUTES */}
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/reservations" element={<ReservationPage />} />

        {/* ADMIN ROUTES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tours/manage" element={<TourManagement />} />
        <Route path="/reservations/manage" element={<ReservationManagement />} />

        {/* OPERATOR ROUTES */}
        <Route path="/payments/manage" element={<PaymentManagement />} />

        {/* REDIRECT UNKNOWN ROUTES */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

  // <Routes>
  //   {/* PUBLIC ROUTES */}
  //   <Route path="/" element={<Home />} />
  //   <Route path="/login" element={<Login />} />
  //   <Route path="/register" element={<Register />} />
  //   <Route path="/mfa" element={<MFAPage />} />
  //   <Route path="/tours" element={<TourPage />} />

  //   {/* CLIENT ROUTES  */}
  //   <Route path="/voucher" element={<ProtectedRoute element={<Voucher />} role="1" />} />
  //   <Route path="/tour/:id" element={<ProtectedRoute element={<TourDetail />} role="1" />} />
  //   <Route path="/reservations" element={<ProtectedRoute element={<ReservationPage />} role="1" />} />

  //   {/* ADMIN ROUTES */}
  //   <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} role="2" />} />
  //   <Route path="/tours/manage" element={<ProtectedRoute element={<TourManagement />} role="2" />} />
  //   <Route path="/reservations/manage" element={<ProtectedRoute element={<ReservationManagement />} role="2" />} />

  //   {/* OPERATOR ROUTES */}
  //   <Route path="/payments/manage" element={<ProtectedRoute element={<PaymentManagement />} role="3" />} />

  //   {/* REDIRECT UNKNOWN ROUTES */}
  //   <Route path="*" element={<Navigate to="/" />} />
  // </Routes>