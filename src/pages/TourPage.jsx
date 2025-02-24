import { Search, ShoppingCart, Filter, BusFront } from "lucide-react";

export default function TourPage() {
    const tours = [
        { id: 1, image: "./CruceroIslaMujeres.png", title: "Isla Mujeres" },
        { id: 2, image: "./CruceroTulum.png", title: "Tulum" },
        { id: 3, image: "./CruceroCozumel.png", title: "Cozumel" },
        { id: 4, image: "./CruceroHolbox.png", title: "Holbox" },
        { id: 5, image: "./CruceroBacalar.png", title: "Bacalar" },
        { id: 6, image: "./CruceroPlayaDelCarmen.png", title: "Playa del Carmen" },
    ];

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            {/* Contenedor principal */}
            <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-5xl h-[80vh] flex flex-col">
                {/* Encabezado */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                        <BusFront size={24} className="mr-2" /> Tours Disponibles
                    </h2>
                    <div className="flex items-center gap-3">
                        {/* Buscador */}
                        <div className="relative">
                            <Search className="absolute left-2 top-2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="pl-8 pr-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        {/* Filtro */}
                        <Filter className="cursor-pointer" size={24} />
                        {/* Carrito */}
                        <ShoppingCart className="cursor-pointer" size={24} />
                    </div>
                </div>

                {/* Contenedor de tarjetas con desplazamiento vertical */}
                <div className="grid grid-cols-3 gap-6 overflow-y-auto scrollbar-hide flex-grow p-2">
                    {tours.map((tour) => (
                        <div key={tour.id} className="bg-white rounded-2xl shadow-lg p-3 w-72">
                            <img
                                src={tour.image}
                                alt={tour.title}
                                className="rounded-lg w-full h-48 object-cover"
                            />
                            <h3 className="text-xl font-semibold text-center mt-2">
                                {tour.title}
                            </h3>
                            <button className="bg-gray-700 text-white w-full py-3 mt-3 rounded-lg hover:bg-gray-900">
                                Conoce más
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
