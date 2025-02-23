import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaThLarge, FaSubway, FaClipboardList, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { sign_out } from "./../services/UserService";

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState(""); // 👈 Guarda el nombre del usuario
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthentication();
    }, [Cookies.get("auth_token")]); // 👈 Verifica la autenticación cada vez que cambie el token

    // ✅ Verifica si el usuario está autenticado
    const checkAuthentication = async () => {
        try {
            const authToken = Cookies.get("auth_token");
            console.log("Auth Token:", authToken); // 👀 Debugging

            if (!authToken) {
                setIsAuthenticated(false);
                return;
            }

            const response = await fetch("http://localhost:3000/session_data", {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const sessionData = await response.json();
            console.log("Datos de sesión:", sessionData); // 👀 Debugging

            if (sessionData?.user) {
                setIsAuthenticated(true);
                setUserName(sessionData.user.name); // 👈 Guarda el nombre del usuario
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

    // ✅ Cierra la sesión y elimina el token
    const handleSignOut = async () => {
        await sign_out();
        Cookies.remove("auth_token");
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <header className="bg-teal-700 text-white py-3 px-8 flex items-center justify-between shadow-lg border-b border-teal-600 w-full">
            {/* ✅ Logo */}
            <div className="bg-white px-3 py-1 rounded-md shadow font-bold text-black text-lg">
                Kankun
            </div>

            {/* ✅ Navegación */}
            <nav className="flex justify-around flex-1 px-4 text-lg font-medium gap-10">
                {[
                    { to: "/", label: "Inicio", icon: FaThLarge },
                    { to: "/tours", label: "Tours", icon: FaSubway },
                    { to: "/reservations", label: "Reservas", icon: FaClipboardList },
                ].map(({ to, label, icon: Icon }) => (
                    <Link key={to} to={to} className="flex flex-col items-center gap-1 group transition-transform duration-200 hover:scale-110">
                        <Icon size={24} className="group-hover:text-yellow-400 transition-colors duration-300" />
                        <span className="group-hover:text-yellow-300 transition-colors duration-300">{label}</span>
                    </Link>
                ))}
            </nav>

            {/* ✅ Autenticación: Iniciar o Cerrar Sesión */}
            <div className="flex items-center gap-4">
                {isLoading ? null : isAuthenticated ? (
                    <div className="flex items-center gap-3">
                        <span className="font-medium">👤 {userName}</span> {/* 👈 Muestra el nombre del usuario */}
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 text-lg px-3 py-1 rounded-md transition hover:bg-white hover:text-teal-700"
                        >
                            <FaSignOutAlt size={22} /> Cerrar sesión
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="flex items-center gap-2 text-lg px-3 py-1 rounded-md transition hover:bg-white hover:text-teal-700">
                        <FaSignInAlt size={22} /> Iniciar sesión
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
