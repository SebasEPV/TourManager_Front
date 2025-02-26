import { useState, useEffect } from "react";
import { Plus } from "lucide-react"; // Eliminado Bus
import Tabla from "../components/Tabla";
import ModalCrearTour from "../components/ModalCrearTour";
import ModalCrearActividad from "../components/ModalCrearActividad";
import { getTours, createTour, deleteTour } from "./../services/tourService";
import { getActivities, createActivity, deleteActivity } from "./../services/activityService"; 

const TourManagement = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalTourOpen, setModalTourOpen] = useState(false);
    const [modalActividadOpen, setModalActividadOpen] = useState(false);
    const [tours, setTours] = useState([]);
    const [actividades, setActividades] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTours = await getTours();
            const fetchedActivities = await getActivities();
            setTours(fetchedTours || []);
            setActividades(fetchedActivities || []);
        };

        fetchData();
    }, []);

    const eliminarTour = async (id) => {
        const response = await deleteTour(id);
        if (response) {
            setTours(tours.filter((tour) => tour.id !== id));
        }
    };

    const eliminarActividad = async (id) => {
        const response = await deleteActivity(id);
        if (response) {
            setActividades(actividades.filter((activity) => activity.id !== id));
        }
    };

    const handleCreateTour = () => {
        setModalTourOpen(true);
        setMenuOpen(false);
    };

    const handleCreateActivity = () => {
        setModalActividadOpen(true);
        setMenuOpen(false);
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg relative mt-16 max-h-screen overflow-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Gestionar Tours</h2> {/* Eliminado el ícono */}

                <div className="relative">
                    <button
                        className="bg-[#6C8361] hover:bg-[#5C7150] text-white p-3 rounded-full shadow-md transition-all"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <Plus size={24} />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-gray-200 rounded-lg shadow-lg p-2 flex flex-col gap-2">
                            <button 
                                onClick={handleCreateTour} 
                                className="bg-[#6C8361] text-white py-2 px-4 rounded-lg hover:bg-[#5C7150] transition">
                                Crear Tour
                            </button>
                            <button 
                                onClick={handleCreateActivity} 
                                className="bg-[#6C8361] text-white py-2 px-4 rounded-lg hover:bg-[#5C7150] transition">
                                Crear Actividad
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full space-y-6">
                <Tabla 
                    datos={tours} 
                    titulo="Nombre de los Tours" 
                    eliminarElemento={eliminarTour} 
                />
                <Tabla 
                    datos={actividades} 
                    titulo="Nombre de las Actividades" 
                    eliminarElemento={eliminarActividad} 
                />
            </div>

            {modalTourOpen && <ModalCrearTour onClose={() => setModalTourOpen(false)} />}
            {modalActividadOpen && <ModalCrearActividad onClose={() => setModalActividadOpen(false)} />}
        </div>
    );
};

export default TourManagement;
