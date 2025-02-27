import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Importar useSearchParams
import { BusFront, Filter } from "lucide-react";
import { getTours } from "../services/tourService";
import { getTourTypes } from "../services/tourTypesService";
import TourCard2 from "../components/tourCard2";

export default function TourPage() {
  const [tours, setTours] = useState([]);
  const [tourTypes, setTourTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [searchParams] = useSearchParams(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTours = await getTours();
        const fetchedTourTypes = await getTourTypes();
  
        if (fetchedTours) {
          setTours(fetchedTours);
        } else {
          setError("No se pudieron cargar los tours.");
        }
        if (fetchedTourTypes) {
          setTourTypes(fetchedTourTypes);
        }
      } catch (err) {
        setError("Error al cargar los tours.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [searchParams]); // <- Escuchar cambios en searchParams
  

const selectedTourType = searchParams.get("type") ? parseInt(searchParams.get("type"), 10) : null;

const filteredTours = tours.filter((tour) => {
  const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesType = selectedTourType ? tour.tour_type_id === selectedTourType : true;
  return matchesSearch && matchesType;
});


  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-7xl flex flex-col my-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <BusFront size={24} className="mr-2" /> Tours Disponibles
          </h2>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Buscar tours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <select
                value={selectedTourType}
                onChange={(e) => {
                  window.location.href = `/tours?type=${e.target.value}`; // Redireccionar con el filtro
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Filtrar por tipo</option>
                {tourTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto scrollbar-hide flex-grow p-2">
          <TourCard2 tours={filteredTours} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
