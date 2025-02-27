import { useState, useEffect } from "react";
import { BusFront } from "lucide-react";
import { getTours } from "../services/tourService";
import TourCard2 from "../components/tourCard2";

export default function TourPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours();
        if (data) {
          setTours(data);
        } else {
          setError("No se pudieron cargar los tours.");
        }
      } catch (err) {
        setError("Error al cargar los tours.");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const filteredTours = tours.filter((tour) =>
    tour.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-7xl flex flex-col my-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <BusFront size={24} className="mr-2" /> Tours Disponibles
          </h2>

          <input
            type="text"
            placeholder="Buscar tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto scrollbar-hide flex-grow p-2">
          <TourCard2 tours={filteredTours} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}