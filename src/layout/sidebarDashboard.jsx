import { TramFront, LayoutGrid, ClipboardCheck, Calendar, LogOut, TreePalm } from 'lucide-react';

export default function SidebarDashboard({ setTitle }) {
    return (
        <div className="h-screen bg-[#45553D] text-white flex flex-col p-4">
            {/* Logo Section */}
            <div className="flex items-center justify-center mb-4">
                <img src="/Logo.png"
                    className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto max-w-full object-contain"
                />

            </div>

            {/* Navigation Options */}
            <nav className="flex flex-col space-y-4">
                <a href="/dashboard" className="flex gap-3 px-4 py-2 rounded-lg bg-[#45553D] hover:bg-[#6e8661] transition" onClick={() => setTitle("Inicio")}>
                    <LayoutGrid /> Inicio
                </a>
                <a href="/tours/manage" className="flex gap-3 px-4 py-2 rounded-lg bg-[#45553D] hover:bg-[#6e8661] transition" onClick={() => setTitle("Tours")}>
                    <TramFront /> Tours
                </a>
                <a href="/reservations/manage" className="flex gap-3 px-4 py-2 rounded-lg bg-[#45553D] hover:bg-[#6e8661] transition" onClick={() => setTitle("Reservas")}>
                    <ClipboardCheck /> Reservas
                </a>
            </nav>

            <div className="p-6 mt-auto">
                <button
                    className="transition-all duration-300 hover:bg-[#D9D9D9]/20 active:transform active:scale-95"
                >
                    <LogOut className="w-6 h-6" />
                    <span className="font-medium text-lg">Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
}
