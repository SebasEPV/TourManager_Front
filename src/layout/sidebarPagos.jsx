import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { sign_out } from "../services/UserService";

export default function SidebarPagos({ setTitle }) {
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
    <div className="h-screen bg-[#4C2816] text-white flex flex-col p-4">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-4">
        <img
          src="/Logo.png"
          className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto max-w-full object-contain"
        />
      </div>

      <nav className="flex flex-col space-y-4">
        <a
          href="../pages/PaymentManagement.jsx"
          className="flex gap-3 px-4 py-3 rounded-lg bg-[#B3916F] hover:bg-[#6a5b3f] transition"
          onClick={() => setTitle("Pagos")}
        >
          <LayoutGrid /> Pagos
        </a>
      </nav>

      <div className="p-6 mt-auto">
        <button
          className="flex items-center justify-end gap-4 px-4 py-3 w-full rounded-xl
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
