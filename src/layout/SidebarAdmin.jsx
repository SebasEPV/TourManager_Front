import { TramFront, LayoutGrid, ClipboardCheck, Calendar, LogOut, TreePalm } from 'lucide-react';

export default function SidebarAdmin({ setTitle }) {
    return (
        <div className=" h-screen bg-[#45553D] text-white flex flex-col p-4">
            {/* Logo Section */}
            <div className="h-20 flex items-center justify-center bg-gray-800 rounded-lg mb-4">
                <span className="text-lg font-bold">LOGO</span>
            </div>

            {/* Navigation Options */}
            <nav className="flex flex-col space-y-4">
                <a href="/dashboard" className="flex  gap-3 px-4 py-2 rounded-lg bg-[#45553D] hover:bg-[#6e8661] transition" onClick={() => setTitle("Inicio")}>  <LayoutGrid /> Inicio </a>
                <a href="/tours/manage" className="flex  gap-3 px-4 py-2 rounded-lg bg-[#45553D] hover:bg-[#6e8661] transition" onClick={() => setTitle("Tours")}><TramFront />  Tours</a>
                <a href="/reservations/manage" className="flex  gap-3 px-4 py-2 rounded-lg bg-[#45553D] hover:bg-[#6e8661] transition" onClick={() => setTitle("Reservas")}><ClipboardCheck /> Reservas</a>
            </nav>

            <div className="p-6 mt-auto">
                <buttonm
                    className="flex items-center justify-end gap-4 px-4 py-3 w-full rounded-xl
                        transition-all duration-300
                        hover:bg-[#D9D9D9]/20
                        active:transform active:scale-95"
                >
                    <LogOut className="w-6 h-6" />
                    <span className="font-medium text-lg">Cerrar Sesión</span>
                </buttonm>
            </div>
        </div> 
    );
}
