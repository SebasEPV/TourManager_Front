import { Calendar, Clock, Users, DollarSign, Trash2, FileClock } from "lucide-react";

/// PLACEHOLDER DEL BACK ///
const tours = [
    {
        id: 1,
        name: "Isla Mujeres",
        image: "/CruceroIslaMujeres.png",
        description: "Disfruta de un día increíble en Isla Mujeres, un destino paradisíaco conocido por sus aguas cristalinas, playas de arena blanca y ambiente relajado. Puedes recorrer sus principales atracciones, como la Playa Norte, el Parque Natural Garrafón, y conocer su vibrante vida marina.",
        price: 1500,
        date: "15/03/25",
        time: "08:00",
        people: 7
    },
    {
        id: 2,
        name: "Cozumel",
        image: "/CruceroCozumel.png",
        description: "Explora los arrecifes de Cozumel y su vida marina en una experiencia única. La isla es famosa por su impresionante biodiversidad submarina, ideal para practicar snorkel y buceo. Además, podrás disfrutar de sus tranquilos rincones, playas de aguas turquesas y su cultura local.",
        price: 2350,
        date: "10/03/25",
        time: "09:30",
        people: 5
    },
    {
        id: 3,
        name: "Holbox",
        image: "/CruceroHolbox.png",
        description: "Relájate en la paradisíaca isla de Holbox, un refugio natural donde la tranquilidad es la protagonista. Disfruta de sus playas vírgenes, donde puedes observar flamencos y tiburones ballena, y pasea por sus coloridas calles sin carreteras ni prisas. Un lugar perfecto para desconectar.",
        price: 1800,
        date: "12/03/25",
        time: "07:45",
        people: 6
    },
    {
        id: 4,
        name: "Bacalar",
        image: "/CruceroBacalar.png",
        description: "Descubre las playas y la vida nocturna de Bacalar, conocida por su famosa Laguna de los Siete Colores. Explora la historia de su fortaleza, disfruta de un paseo en bote por la laguna y relájate en sus aguas cristalinas. Bacalar también ofrece una vibrante vida nocturna y una excelente gastronomía local.",
        price: 2000,
        date: "18/03/25",
        time: "10:15",
        people: 8
    },
    {
        id: 5,
        name: "Playa del Carmen",
        image: "/CruceroPlayaDelCarmen.png",
        description: "Vive la experiencia de Playa del Carmen, una de las ciudades más populares de la Riviera Maya. Disfruta de sus cenotes naturales, sus paradisíacas playas y el animado ambiente de la Quinta Avenida. Además, puedes explorar los parques ecológicos y disfrutar de la gastronomía local.",
        price: 2200,
        date: "20/03/25",
        time: "11:00",
        people: 4
    },
    {
        id: 6,
        name: "Tulum",
        image: "/CruceroTulum.png",
        description: "Explora las ruinas mayas y las playas de Tulum, un destino que combina historia, cultura y naturaleza. Disfruta de la belleza de sus ruinas arqueológicas frente al mar, visita sus paradisíacas playas y descubre su oferta de restaurantes, boutiques y bares en un ambiente bohemio y relajado.",
        price: 1900,
        date: "22/03/25",
        time: "08:30",
        people: 7
    }
];

export default function TourManagement() {
    return (
        <div className="p-6 min-h-screen flex">
            {/* Contenedor principal */}
            <div className="flex-1">
                <h2 className="text-2xl font-bold flex items-center mb-4">
                    <FileClock size={24} className="mr-2" /> Reservas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tours.map((tour) => (
                        <div
                            key={tour.id}
                            className="bg-[#446166] text-white p-4 rounded-xl shadow-md w-full flex flex-col"
                        >
                            <div className="relative">
                                <img
                                    src={tour.image}
                                    alt={tour.name}
                                    className="rounded-lg w-10/11 h-60 object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-[#20555A] p-2 rounded-lg text-sm flex flex-col gap-1">
                                    <span className="flex items-center gap-1">
                                        <Clock size={16} /> {tour.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={16} /> {tour.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users size={16} /> {tour.people}
                                    </span>
                                    <span className="px-2 py-1 bg-teal-600 rounded-md text-xs">Recibo</span>
                                </div>

                            </div>
                            <h3 className="text-xl font-semibold mt-3">{tour.name}</h3>
                            <div className="mt-4 flex justify-between items-end">
                                <p className="text-sm max-w-[73%] text-justify">{tour.description}</p>
                                <div className="flex flex-col items-end">
                                    <span className="text-lg font-semibold">Total: ${tour.price}</span>
                                    <button className="bg-[#56828A] px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700 mt-2">
                                        <Trash2 size={16} /> Eliminar
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-6">
                    <button className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-900">
                        Ver más tours
                    </button>
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-800">
                        Eliminar todo
                    </button>
                </div>
            </div>

            {/* Barra lateral de Itinerario */}
            <div className="w-1/4 bg-gray-200 p-4 rounded-lg ml-6 sticky top-4 max-h-screen overflow-auto">
                <h3 className="text-lg font-semibold">Itinerario</h3>
                {tours.map((tour) => (
                    <div key={tour.id} className="mb-3">
                        <p className="text-gray-700 flex items-center gap-2">
                            <Calendar size={18} className="text-[#007870]" /> {tour.date}
                        </p>
                        <div className="bg-white p-3 rounded-lg shadow-md mt-1">
                            <div className="flex justify-between">
                                <p className="text-gray-700 flex items-center gap-2">
                                    <Clock size={18} className="text-[#007870]" /> {tour.time}
                                </p>
                                <p className="text-gray-700 flex items-center gap-2">
                                    <Users size={18} className="text-[#007870]" /> {tour.people}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-gray-900 font-semibold text-lg">{tour.name}</p>
                                <p className="text-gray-700 flex items-center gap-2">
                                    <DollarSign size={18} className="text-[#007870]" /> {tour.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}