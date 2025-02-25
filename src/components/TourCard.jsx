import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMostReservedTours } from "./../services/reservationService";

const TourCard = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      const data = await getMostReservedTours();
      if (data && data.most_reserved_tours) {
        setTours(data.most_reserved_tours);
      } else {
        setError("No se pudieron cargar los tours.");
      }
      setLoading(false);
    };
    fetchTours();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Cargando tours...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">Tours Más Reservados</h2>
      <div className="flex flex-col md:flex-row justify-center gap-6 px-4">
        {tours.map((tour) => (
          <div key={tour.tour_id} className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-1/3">
            <img src={tour.img_path} alt={tour.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold line-clamp-2">{tour.name}</h3> {/* Restricción de líneas */}
              <p className="text-gray-600 text-sm my-2">{tour.description}</p>
              <p className="text-lg font-bold text-green-600">${tour.price}.00</p>
              <Link to={`/tour/${tour.tour_id}`} className="block mt-3 bg-teal-500 text-white py-2 rounded-md hover:bg-teal-400 transition">
                Conocer más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourCard;
