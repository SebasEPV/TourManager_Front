import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Header from "./layout/header";
import Login from "./pages/login";
import Register from "./pages/register";
import PaymentManagement from "./pages/PaymentManagement";
import TourManagement from "./pages/TourManagement";
import TourDetail from "./components/TourDetail";
import ReservationManagement from "./pages/ReservationManagement";
import ReservationPage from "./pages/ReservationsPage";
import TourPage from "./pages/TourPage";
import Voucher from "./pages/Voucher";
import Dashboard from "./pages/Dashboard";
import MFAPage from "./pages/MFAPage";

// Simulación de autenticación (puedes cambiarlo por un estado global o API)
const isAuthenticated = () => localStorage.getItem("token") !== null;
const getUserRole = () => localStorage.getItem("role"); // "admin", "client", "operator"

// Componente para proteger rutas
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mfa" element={<MFAPage />} />

        {/* CLIENT ROUTES */}
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/tours" element={<TourPage />} />
        <Route path="/tour/:id" element={<TourDetail />} />
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

      //   {/* CLIENT ROUTES  */}
      //   <Route path="/voucher" element={<ProtectedRoute element={<Voucher />} role="client" />} />
      //   <Route path="/tours" element={<ProtectedRoute element={<TourPage />} role="client" />} />
      //   <Route path="/tour/:id" element={<ProtectedRoute element={<TourDetail />} role="client" />} />
      //   <Route path="/reservations" element={<ProtectedRoute element={<ReservationPage />} role="client" />} />

      //   {/* ADMIN ROUTES */}
      //   <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} role="admin" />} />
      //   <Route path="/tours/manage" element={<ProtectedRoute element={<TourManagement />} role="admin" />} />
      //   <Route path="/reservations/manage" element={<ProtectedRoute element={<ReservationManagement />} role="admin" />} />

      //   {/* OPERATOR ROUTES */}
      //   <Route path="/payments/manage" element={<ProtectedRoute element={<PaymentManagement />} role="operator" />} />

      //   {/* REDIRECT UNKNOWN ROUTES */}
      //   <Route path="*" element={<Navigate to="/" />} />
      // </Routes>