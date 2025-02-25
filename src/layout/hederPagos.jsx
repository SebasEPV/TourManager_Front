import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { sign_out } from "../services/UserService"; 

const HederPagos = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [userData, setUserData] = useState({ name: "", role: "" });
  const location = useLocation();

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
          setUserData({
            name: sessionData.user.name || "Desconocido",
            role: getRoleName(sessionData.user.role) || "No definido",
          });
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error en la API:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleName = (roleNumber) => {
    switch (roleNumber) {
      case 1:
        return "Cliente";
      case 2:
        return "Administrador";
      case 3:
        return "Operador";
      default:
        return "No definido";
    }
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/tours/manage":
        return "Administrador de Tours/Actividades";
      case "/reservations/manage":
        return "Reservas";
      default:
        return "Gestión de pagos";
    }
  };

  return (
    <header className="w-full h-16 bg-gradient-to-r from-[#4C2816] to-[#7C5E41] text-white flex items-center px-6 justify-between shadow-md">
      <h1 className="text-xl font-bold">{getPageTitle()}</h1>
      <div className="flex items-center gap-4">
        {isLoading ? (
          <div>Cargando...</div>
        ) : !isAuthenticated ? (
          <div className="text-red-500">No autenticado</div>
        ) : (
          <>
            <div className="text-right">
              <div className="font-medium">{userData.name}</div>
              <div className="text-sm text-white/70">{userData.role}</div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default HederPagos;
