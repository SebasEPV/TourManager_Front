import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaSubway,
  FaClipboardList,
  FaSignInAlt,
  FaUserCircle,
} from "react-icons/fa";
import Cookies from "js-cookie";
import { sign_out } from "./../services/UserService";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, [Cookies.get("auth_token")]);

  const checkAuthentication = async () => {
    try {
      const authToken = Cookies.get("auth_token");
      if (authToken) {
        const response = await fetch("http://localhost:3000/session_data", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const sessionData = await response.json();
        if (sessionData.user) {
          setIsAuthenticated(true);
          setUserName(sessionData.user.name);
          setUser(sessionData.user); 
        } else {
          setIsAuthenticated(false);
          setUser(null); 
        }
      } else {
        setIsAuthenticated(false);
        setUser(null); 
      }
    } catch (error) {
      console.error("Error en la API:", error);
      setIsAuthenticated(false);
      setUser(null); 
    }
  };

  const handleSignOut = () => {
    sign_out();
    Cookies.remove("auth_token");
    setIsAuthenticated(false);
    setUser(null); // Reset user object
    navigate("/");
  };

  return (
    <header className="bg-teal-700 text-white py-3 px-8 flex items-center justify-between shadow-lg border-b border-teal-600 w-full sticky top-0 z-50">
      <div
        className="px-3 py-1 rounded-md font-bold text-white text-lg mr-33"
        style={{
          backgroundImage: "url('/LogoKANKUN.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "4rem",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p className="flex pl-36">KANKUN</p>
      </div>

      <nav className="flex flex-1 justify-center items-center text-lg font-medium gap-16">
        <Link
          to="/"
          className="flex gap-1 group transition-transform duration-200 hover:scale-110 mx-15"
        >
          <FaThLarge
            size={24}
            className="group-hover:text-yellow-400 transition-colors duration-300"
          />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">
            Inicio
          </span>
        </Link>
        <Link
          to="/tours"
          className="flex items-center gap-1 group transition-transform duration-200 hover:scale-110 mx-15"
        >
          <FaSubway
            size={24}
            className="group-hover:text-yellow-400 transition-colors duration-300"
          />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">
            Tours
          </span>
        </Link>
        {/* Conditional Link for Reservations */}
        {user && user.id ? (
          <Link
            to={`/reservations/${user.id}`}
            className="flex items-center gap-1 group transition-transform duration-200 hover:scale-110 mx-15"
          >
            <FaClipboardList
              size={24}
              className="group-hover:text-yellow-400 transition-colors duration-300"
            />
            <span className="group-hover:text-yellow-300 transition-colors duration-300">
              Reservas
            </span>
          </Link>
        ) : (
          <div className="flex items-center gap-1 mx-15 opacity-50 cursor-not-allowed">
            <FaClipboardList size={24} />
            <span>Reservas</span>
          </div>
        )}
      </nav>

      <div className="relative">
        {!isAuthenticated ? (
          <Link
            to="/login"
            className="flex items-center gap-2 text-lg px-3 py-1 rounded-md transition hover:bg-white hover:text-teal-700"
          >
            <FaSignInAlt size={22} /> Iniciar sesión
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-lg px-3 py-1 rounded-md transition hover:bg-white hover:text-teal-700"
            >
              <FaUserCircle size={24} /> {userName}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-teal-700 rounded-md shadow-lg py-2 z-50">
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;