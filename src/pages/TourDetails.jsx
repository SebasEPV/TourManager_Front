import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaClock, FaUsers } from "react-icons/fa";
import { getTourById } from "./../services/tourService.js";
import { useNavigate } from "react-router-dom";

const TourDetails = () => {
  const { id } = useParams(); // Obtén el ID del tour de la URL
  const [tour, setTour] = useState(null); // Estado para almacenar los datos del tour
  const [activeTab, setActiveTab] = useState("description");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [normalTickets, setNormalTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);

  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  // Cargar los detalles del tour desde el backend
  useEffect(() => {
    const fetchTour = async () => {
      const fetchedTour = await getTourById(id);
      if (fetchedTour) {
        setTour(fetchedTour);
        setSelectedDate(fetchedTour.itinerary.date);
        setSelectedTime(fetchedTour.itinerary.time);
        setNormalTickets(fetchedTour.itinerary.normalTickets);
        setChildTickets(fetchedTour.itinerary.childTickets);
      }
    };

    fetchTour();
  }, [id]);

  if (!tour) {
    return <div>Cargando...</div>;
  }

  return (
    <section className="relative">
      <div className="fixed top-0 left-0 w-full h-[500px] z-0 p-5 pt-25 bg-white">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(/${tour.img_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
          }}
        ></div>
      </div>

      <div className="relative z-10 mt-[400px] bg-white rounded-t-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-3xl font-bold">{tour.title}</h2>
          <p className="text-gray-600 text-lg font-semibold">
            ${tour.price} por persona
          </p>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
              <FaClock className="mr-2" /> {tour.duration} horas
            </span>
            <span className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
              <FaUsers className="mr-2" /> Cupo Max. {tour.max_capacity}
            </span>
          </div>

          <div className="flex mt-4 border-b">
            {[
              { key: "description", label: "Descripción" },
              { key: "includes", label: "¿Qué incluye?" },
              { key: "itinerary", label: "Itinerario" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-lg font-semibold border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-teal-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {activeTab === "description" && <p>{tour.description}</p>}
            {activeTab === "includes" && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Actividades:</h3>
                <ul className="list-disc pl-5">
                  {tour.activities.map((activity) => (
                    <li key={activity.id}>{activity.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "itinerary" && (
              <>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-gray-700">
                      Fecha de salida
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Hora de salida
                    </label>
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Boletos Normales
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={normalTickets}
                      onChange={(e) => setNormalTickets(e.target.value)}
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Boletos Niños</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={childTickets}
                      onChange={(e) => setChildTickets(e.target.value)}
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate("/reservations", {
                      state: {
                        selectedDate,
                        selectedTime,
                        normalTickets,
                        childTickets,
                      },
                    })
                  }
                  className="mt-6 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition w-full"
                >
                  Reservar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourDetails;
