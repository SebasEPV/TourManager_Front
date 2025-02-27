import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileClock } from "lucide-react";
import ReservationCard from "../components/ReservationCard";
import { getReservations } from "../services/reservationService";

export default function ReservationPage() {
  const { id } = useParams();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("User ID from URL:", id);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        if (data) {
          const userReservations = data.filter(
            (reservation) => reservation.user_id === parseInt(id)
          );
          console.log(userReservations)
          setReservations(userReservations);
        } else {
          setError("No se pudieron cargar las reservaciones.");
        }
      } catch (err) {
        setError("Error al cargar las reservaciones.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [id]);

  const filteredReservations = reservations.filter((reservation) =>
    reservation.tour.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-7xl flex flex-col my-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <FileClock size={24} className="mr-2" /> Reservas
          </h2>

          <input
            type="text"
            placeholder="Buscar reservas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto scrollbar-hide flex-grow p-2">
          <ReservationCard
            reservations={filteredReservations}
            loading={loading}
            error={error}
            setReservations={setReservations}
          />
        </div>
      </div>
    </div>
  );
}