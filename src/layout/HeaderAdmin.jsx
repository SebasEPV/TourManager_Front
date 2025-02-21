import { ChevronDown } from "lucide-react"
import { useLocation } from "react-router-dom"


export default function HeaderAdmin({ setTitle }) {

    const location = useLocation()

    const getPageTitle = () => {
        switch (location.pathname) {
            case "/dashboard":
                return "Dashboard"
            case "/tours/manage":
                return "Administrador de Tours/Actividades"
            case "/reservations/manage":
                return "Reservas"
            default:
                return "Sistema de Tours"
        }
    }

    
    return (
        <header className="w-full h-16 bg-gradient-to-r from-[#45553D] to-[#5F8D48] text-white flex items-center px-6 justify-between shadow-md">
            <h1 className="text-xl font-bold">{getPageTitle()}</h1>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <div className="font-medium">Kevin Velázquez</div>
                    <div className="text-sm text-white/70">Usuario</div>
                </div>

                <button className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <img src="/placeholder.svg" alt="Avatar" className="w-8 h-8 rounded-full" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-white/70" />
                </button>
            </div>


        </header>
    );
}