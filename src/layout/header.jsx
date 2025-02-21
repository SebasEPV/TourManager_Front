import { FaThLarge, FaSubway, FaClipboardList, FaSignInAlt, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const checkAuthentication = async () => {
    const sessionData = await getSessionData();
    if (sessionData) {
      setIsAuthenticated(true);
      setUserId(sessionData.user.id);
    } else {
      setIsAuthenticated(false);
      setUserId(null);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <header className="bg-teal-700 text-white py-3 px-8 flex items-center justify-between shadow-lg border-b border-teal-600 w-full">
      {/* Logo */}
      <div className="bg-white px-3 py-1 rounded-md shadow font-bold text-black text-lg">Kankun</div>

      <nav className="flex justify-around flex-1 px-4 text-lg font-medium gap-10">
        <Link to="/" className="flex flex-col items-center gap-1 group transition-transform duration-200 hover:scale-110">
          <FaThLarge size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Inicio</span>
        </Link>
        <Link to="/tours" className="flex flex-col items-center gap-1 group transition-transform duration-200 hover:scale-110">
          <FaSubway size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Tours</span>
        </Link>
        <Link to={userId ? `/reservations/${userId}` : "/login"} className="flex flex-col items-center gap-1 group transition-transform duration-200 hover:scale-110">
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
          <div className="relative">

            <div className="flex items-center gap-2 group">
              <FaUserCircle size={30} className="text-yellow-300" />
              <span className="text-sm font-semibold group-hover:text-yellow-300 transition-colors duration-300">Fernando May</span>
            </div>
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg">
              <Link to="/logout" className="block px-4 py-2 text-sm hover:bg-teal-700 hover:text-white">
                <FaSignOutAlt size={18} className="inline mr-2" /> Cerrar sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
