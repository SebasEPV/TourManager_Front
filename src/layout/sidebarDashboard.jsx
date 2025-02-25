import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, LogOut, TramFront, ClipboardCheck } from "lucide-react";
import Cookies from "js-cookie";
import { sign_out } from "../services/UserService";

export default function SidebarDashboard({ setTitle }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const authToken = Cookies.get("auth_token");
      if (authToken) {
        const response = await fetch("http://localhost:3000/session_data", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const sessionData = await response.json();
        if (sessionData && sessionData.user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error en la API:", error);
      setIsAuthenticated(false);
    }
  };

  const handleSignOut = () => {
    sign_out();
    Cookies.remove("auth_token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="h-screen bg-[#45553D] text-white flex flex-col p-4">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-4">
        <img
          src="/Logo.png"
          className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto max-w-full object-contain"
        />
      </div>

      {/* Navigation Options */}
      <nav className="flex flex-col space-y-4">
        <a
          href="/dashboard"
          className="flex gap-3 px-4 py-2 rounded-lg bg-[#45553D] hover:bg-[#6e8661] transition"
          onClick={() => setTitle("Inicio")}
        >
          <LayoutGrid /> Inicio
        </a>
        <a
          href="/tours/manage"
          className="flex gap-3 px-4 py-2 rounded-lg bg-[#45553D] hover:bg-[#6e8661] transition"
          onClick={() => setTitle("Tours")}
        >
          <TramFront /> Tours
        </a>
        <a
          href="/reservations/manage"
          className="flex gap-3 px-4 py-2 rounded-lg bg-[#45553D] hover:bg-[#6e8661] transition"
          onClick={() => setTitle("Reservas")}
        >
          <ClipboardCheck /> Reservas
        </a>
      </nav>

      {/* Sign Out Button */}
      <div className="p-6 mt-auto">
        <button
          className="flex items-center gap-4 px-4 py-3 w-full rounded-xl
                               transition-all duration-300
                               hover:bg-[#D9D9D9]/20
                               active:transform active:scale-95"
          onClick={handleSignOut}
        >
          <LogOut className="w-6 h-6" />
          <span className="font-medium text-lg">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}
