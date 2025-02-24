import { useState } from "react";
import { Plus, Bus } from "lucide-react";
import Tabla from "../components/GestionarTours/Tabla";
import ModalCrearTour from "../components/GestionarTours/ModalCrearTour";
import ModalCrearActividad from "../components/GestionarTours/ModalCrearActividad";
import HeaderAdmin from "../layout/HeaderAdmin";
import SidebarAdmin from "../layout/SidebarAdmin";

const TourManagement = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalTourOpen, setModalTourOpen] = useState(false);
    const [modalActividadOpen, setModalActividadOpen] = useState(false);
    const [tours, setTours] = useState([
        { id: "0001", nombre: "Experiencia Isla Mujeres", precio: "$10,000", cupo: "6 Personas", duracion: "3 días" },
        { id: "0002", nombre: "Tour Cancún", precio: "$10,000", cupo: "6 Personas", duracion: "3 días" },
        { id: "0003", nombre: "Chichenitza", precio: "$10,000", cupo: "6 Personas", duracion: "3 días" },
    ]);

    const [actividades, setActividades] = useState([
        { id: "0001", nombre: "Buceo", precio: "$10,000", cupo: "6 Personas", duracion: "3 días" },
    ]);

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Bus className="w-6 h-6 text-gray-700" /> Gestionar Tours
                </h2>

                <div className="relative">
                    <button
                        className="bg-[#6C8361] hover:bg-[#5C7150] text-white p-3 rounded-full shadow-md transition-all"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <Plus size={24} />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-gray-200 rounded-lg shadow-lg p-2 flex flex-col gap-2">
                            <button onClick={() => { setModalTourOpen(true); setMenuOpen(false); }} className="bg-[#6C8361] text-white py-2 px-4 rounded-lg hover:bg-[#5C7150] transition">
                                Crear Tour
                            </button>
                            <button onClick={() => { setModalActividadOpen(true); setMenuOpen(false); }} className="bg-[#6C8361] text-white py-2 px-4 rounded-lg hover:bg-[#5C7150] transition">
                                Crear Actividad
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full space-y-6">
                <Tabla datos={tours} titulo="Nombre de los Tours" eliminarElemento={(id) => setTours(tours.filter(tour => tour.id !== id))} />
                <Tabla datos={actividades} titulo="Nombre de las Actividades" eliminarElemento={(id) => setActividades(actividades.filter(act => act.id !== id))} />
            </div>

            {modalTourOpen && <ModalCrearTour onClose={() => setModalTourOpen(false)} />}
            {modalActividadOpen && <ModalCrearActividad onClose={() => setModalActividadOpen(false)} />}
        </div>
    );
};

export default TourManagement;
