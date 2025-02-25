import { TramFront, LayoutGrid, ClipboardCheck, Calendar, LogOut, TreePalm } from 'lucide-react';

export default function sidebarPagos({ setTitle }) {
    return (
        <div className=" h-screen bg-[#4C2816] text-white flex flex-col p-4">
            {/* Logo Section */}
            <div className="h-20 flex items-center justify-center bg-gray-800 rounded-lg mb-4">
                <span className="text-lg font-bold">LOGO</span>
            </div>

            {/* Navigation Options */}
            <nav className="flex flex-col space-y-4" >
                <a href="../pages/PaymentManagement.jsx" className="flex  gap-3 px-4 py-3 rounded-lg bg-[#B3916F] hover:bg-[#6a5b3f] transition" onClick={() => setTitle("Pagos")}>  <LayoutGrid /> Pagos </a>
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
