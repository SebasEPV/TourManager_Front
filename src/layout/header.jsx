import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaSubway,
  FaClipboardList,
  FaSignInAlt,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";
import Cookies from "js-cookie";
import { sign_out } from "./../services/UserService";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
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
    <header className="bg-teal-700 text-white py-3 px-6 flex items-center justify-between shadow-lg border-b border-teal-600 w-full sticky top-0 z-50">
      {/* Logo y nombre */}
      <div className="flex items-center gap-3">
        <div
          className="rounded-md"
          style={{
            backgroundImage: "url('/LogoKANKUN.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "3rem",
            height: "3rem",
          }}
        ></div>
        <p className="text-lg font-bold">KANKUN</p>
      </div>

      {/* Navegación */}
      <nav className="flex items-center gap-10 text-lg font-medium">
        <Link to="/" className="flex items-center gap-2 group transition-transform duration-200 hover:scale-110">
          <FaThLarge size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Inicio</span>
        </Link>
        <Link to="/tours" className="flex items-center gap-2 group transition-transform duration-200 hover:scale-110">
          <FaSubway size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Tours</span>
        </Link>
        <Link to="/reservations" className="flex items-center gap-2 group transition-transform duration-200 hover:scale-110">
          <FaClipboardList size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Reservas</span>
        </Link>
      </nav>

      {/* Búsqueda */}
      <div className="relative hidden md:flex items-center bg-white rounded-full shadow-md px-4 py-2 w-80 max-w-lg">
        <input
          type="text"
          placeholder="Buscar tours..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="outline-none bg-transparent text-gray-700 w-full"
        />
        <FaSearch className="text-teal-700 cursor-pointer" />
      </div>

      {/* Búsqueda en móvil */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsSearchVisible(!isSearchVisible)}
      >
        <FaSearch />
      </button>

      {isSearchVisible && (
        <div className="absolute top-16 left-0 w-full bg-white p-3 shadow-md flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none bg-transparent text-gray-700 w-full px-2"
          />
          <FaSearch className="text-teal-700 cursor-pointer" />
        </div>
      )}

      {/* Usuario */}
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
