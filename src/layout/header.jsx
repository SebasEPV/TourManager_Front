import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaThLarge, FaSubway, FaClipboardList, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { sign_out } from "./../services/UserService";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  // Función para verificar si el usuario está autenticado
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
    } finally {
      setIsLoading(false); // Set loading to false after the check is complete
    }
  };

  // Función para cerrar sesión
  const handleSignOut = () => {
    sign_out();
    Cookies.remove("auth_token");
    setIsAuthenticated(false);
    navigate("/"); // Redirigir a la página de inicio
  };
  
  return (
    <header className="bg-teal-700 text-white py-3 px-8 flex items-center justify-between shadow-lg border-b border-teal-600 w-full">
      {/* Logo */}
      <img src="/Logo.jpg" alt="Kankun Logo" className="h-12 w-auto rounded-md shadow" />

      <nav className="flex justify-around flex-1 px-4 text-lg font-medium gap-10">
        <Link to="/" className="flex flex-col items-center gap-1 group transition-transform duration-200 hover:scale-110">
          <FaThLarge size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Inicio</span>
        </Link>
        <Link to="/tours" className="flex flex-col items-center gap-1 group transition-transform duration-200 hover:scale-110">
          <FaSubway size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Tours</span>
        </Link>
        <Link to="/reservations" className="flex flex-col items-center gap-1 group transition-transform duration-200 hover:scale-110">
          <FaClipboardList size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Reservas</span>
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <Link to="/login" className="flex items-center gap-2 text-lg px-3 py-1 rounded-md transition hover:bg-white hover:text-teal-700">
            <FaSignInAlt size={22} /> Iniciar sesión
          </Link>
        ) : (
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-lg px-3 py-1 rounded-md transition hover:bg-white hover:text-teal-700"
          >
            <FaSignOutAlt size={22} /> Cerrar sesión
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;