import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import TourCard from "../components/TourCard";
import TourExplorer from "../components/TourExplorer";
import { getMostReservedTours } from "../services/reservationService";

export default function Home() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getMostReservedTours();
        if (data && data.most_reserved_tours) {
          setTours(data.most_reserved_tours);
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

  return (
    <>
      <Hero />
      <section className="py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">Tours Más Reservados</h2>
      <TourCard tours={tours} loading={loading} error={error} />
      </section>
      <TourExplorer />
    </>
  );
}