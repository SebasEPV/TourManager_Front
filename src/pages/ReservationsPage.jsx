import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Users, DollarSign, Trash2, FileClock } from "lucide-react";

const tours = [
    {
        id: 1,
        name: "Isla Mujeres",
        image: "/CruceroIslaMujeres.png",
        description: "Disfruta de un día increíble en Isla Mujeres.",
        price: 1500
    },
    {
        id: 2,
        name: "Cozumel",
        image: "/CruceroCozumel.png",
        description: "Explora los arrecifes de Cozumel y su vida marina.",
        price: 2350
    },
    {
        id: 3,
        name: "Holbox",
        image: "/CruceroHolbox.png",
        description: "Relájate en la paradisíaca isla de Holbox.",
        price: 1800
    },
    {
        id: 4,
        name: "Bacalar",
        image: "/CruceroBacalar.png",
        description: "Descubre las playas y la vida nocturna de Bacalar.",
        price: 2000
    },
    {
        id: 5,
        name: "Playa del Carmen",
        image: "/CruceroPlayaDelCarmen.png",
        description: "Vive la experiencia de Playa del Carmen y sus cenotes.",
        price: 2200
    },
    {
        id: 6,
        name: "Tulum",
        image: "/CruceroTulum.png",
        description: "Explora las ruinas mayas y las playas de Tulum.",
        price: 1900
    }
];

export default function ReservationPage() {
    const navigate = useNavigate();

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex">
            {/* Contenedor principal */}
            <div className="flex-1">
                <h2 className="text-2xl font-bold flex items-center mb-4">
                    <FileClock size={24} className="mr-2" /> Reservas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tours.map((tour) => (
                        <div key={tour.id} className="bg-teal-700 text-white p-6 rounded-xl shadow-md w-full">
                            <img
                                src={tour.image}
                                alt={tour.name}
                                className="rounded-lg w-full h-52 object-cover"
                            />
                            <h3 className="text-2xl font-semibold mt-3">{tour.name}</h3>
                            <p className="text-sm mt-2">{tour.description}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-lg font-semibold">Total: ${tour.price}</span>
                                <button className="bg-red-500 px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700">
                                    <Trash2 size={16} /> Eliminar
                                </button>
                            </div>
                            {/* Botón para navegar a /voucher */}
                            <button
                                onClick={() => navigate(`/voucher`)}
                                className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-800"
                            >
                                Ver Voucher
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-6">
                    <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-800">
                        Ver más tours
                    </button>
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-800">
                        Eliminar todo
                    </button>
                </div>
            </div>

            {/* Barra lateral de Itinerario (Sticky) */}
            <div className="w-1/4 bg-gray-300 p-4 rounded-lg ml-6 sticky top-4 max-h-screen overflow-auto">
                <h3 className="text-lg font-semibold">Itinerario</h3>
                {tours.map((tour) => (
                    <div key={tour.id} className="bg-white p-3 rounded-lg shadow-md mt-2">
                        <p className="text-gray-700 flex items-center gap-2">
                            <Calendar size={16} /> 15/03/25 <Clock size={16} /> 08:00
                            <Users size={16} /> 7 <DollarSign size={16} /> {tour.price}
                        </p>
                        <p className="text-gray-900 font-semibold">{tour.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
