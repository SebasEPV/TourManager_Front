// Componente Header actualizado con enlaces funcionales
import { FaThLarge, FaSubway, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-teal-700 text-white py-3 px-8 flex items-center justify-between shadow-lg border-b border-teal-600 w-full">
      {/* Logo */}
      <div className="bg-white px-3 py-1 rounded-md shadow font-bold text-black text-lg">Kankun</div>

      {/* Navigation with Dynamic Hover Effects */}
      <nav className="flex justify-around flex-1 px-4 text-lg font-medium gap-10">
        <Link to="/" className="flex flex-col items-center gap-1 group transition-transform duration-200 hover:scale-110">
          <FaThLarge size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Inicio</span>
        </Link>
        <Link to="/tours" target="_blank" className="flex flex-col items-center gap-1 group transition-transform duration-200 hover:scale-110">
          <FaSubway size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Tours</span>
        </Link>
        <Link to="/reservas" target="_blank" className="flex flex-col items-center gap-1 group transition-transform duration-200 hover:scale-110">
          <FaClipboardList size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="group-hover:text-yellow-300 transition-colors duration-300">Reservas</span>
        </Link>
      </nav>

      {/* User Section with Smooth Hover Effects */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-lg px-3 py-1 rounded-md transition hover:bg-red-500 hover:text-white">
          <FaSignOutAlt size={22} /> Cerrar Sesión
        </button>
        <div className="flex items-center gap-2 group">
          <span className="text-sm font-semibold group-hover:text-yellow-300 transition-colors duration-300">Fernando May</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
