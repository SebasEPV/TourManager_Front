import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaThLarge, FaSubway, FaClipboardList, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { sign_out } from "./../services/UserService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
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
          setUserName(sessionData.user.name + " " + sessionData.user.last_name);
          setUserId(sessionData.user.id);
        } else {
          setIsAuthenticated(false);
          setUserName(null); 
        }
      } else {
        setIsAuthenticated(false);
        setUserName(null); 
      }
    } catch (error) {
      console.error("Error en la API:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    sign_out();
    Cookies.remove("auth_token");
    setIsAuthenticated(false);
    navigate("/"); 
  };

  const handleSearchClick = () => {
    if (search.trim()) {
      navigate(`/tours?search=${search}`);
    }
  };

  return (
    <header className="bg-teal-700 text-white py-3 px-8 flex items-center justify-between shadow-lg border-b border-teal-600 w-full sticky top-0 z-50">
      <div
        className="px-3 py-1 rounded-md font-bold text-white text-lg"
        style={{
          backgroundImage: "url('/LogoKANKUN.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "4rem",
          height: "4rem",
          display: "flex",        
          alignItems: "center",   
          justifyContent: "center"
        }}
      >
        <p className="flex pl-36">KANKUN</p>
      </div>

      <nav className="flex justify-around flex-1 px-4 text-lg font-medium gap-5 ml-10">
        <Link to="/" className="flex flex-col items-center gap-1 group transition-transform duration-200 hover:scale-110">
          <FaThLarge size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Inicio</span>
        </Link>
        <Link to="/tours" className="flex flex-col items-center gap-1 group transition-transform duration-200 hover:scale-110">
          <FaSubway size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Tours</span>
        </Link>
        <Link to={`/reservations/${userId}`} className="flex flex-col items-center gap-1 group transition-transform duration-200 hover:scale-110">
        <FaClipboardList size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Reservas</span>
        </Link>
      </nav>

      <div className="flex items-center gap-2 ml-4 relative">
        <input
          type="text"
          placeholder="Buscar tours"
          className="px-4 py-2 rounded-[30px] text-black bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faSearch}
          size="lg"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-700"
          onClick={handleSearchClick}
        />
      </div>

      <div className="flex items-center gap-4 ml-5">
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
              <FontAwesomeIcon icon={faUserCircle} size="lg" /> {userName}
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
