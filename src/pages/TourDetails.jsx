import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaClock, FaUsers } from "react-icons/fa";

const toursData = [
  {
    id: "isla-mujeres",
    title: "Isla Mujeres",
    price: "$350.00",
    image: "/IslaMujeres.jpeg",
    description: "Explora las aguas cristalinas y disfruta de la naturaleza.",
    includes: [
      "Transporte ida y vuelta",
      "Equipo de snorkel",
      "Comida y bebidas",
      "Guía turístico"
    ],
    itinerary: {
      date: "11-12-2025",
      time: "08:00",
      normalTickets: 5,
      childTickets: 5
    }
  },
  {
    id: "tulum",
    title: "Tulum",
    price: "$300.00",
    image: "/Tulum.jpg",
    description: "Visita las ruinas mayas y relájate en las playas de Tulum.",
    includes: [
      "Entrada a la zona arqueológica",
      "Guía certificado",
      "Tiempo libre en la playa",
      "Comida típica"
    ],
    itinerary: {
      date: "12-12-2025",
      time: "07:30",
      normalTickets: 3,
      childTickets: 2
    }
  }
];

const TourDetails = () => {
  const { id } = useParams();
  const tour = toursData.find((tour) => tour.id === id) || toursData[0];
  const [activeTab, setActiveTab] = useState("description");
  const [selectedDate, setSelectedDate] = useState(tour.itinerary.date);
  const [selectedTime, setSelectedTime] = useState(tour.itinerary.time);
  const [normalTickets, setNormalTickets] = useState(tour.itinerary.normalTickets);
  const [childTickets, setChildTickets] = useState(tour.itinerary.childTickets);

  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="max-w-4xl mx-auto py-10 px-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={tour.image} alt={tour.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold">{tour.title}</h2>
          <p className="text-gray-600 text-lg font-semibold">{tour.price} por persona</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
              <FaClock className="mr-2" /> Duración
            </span>
            <span className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
              <FaUsers className="mr-2" /> Cupo Max. 10
            </span>
          </div>

          {/* Pestañas de navegación */}
          <div className="flex mt-4 border-b">
            {[
              { key: "description", label: "Descripción" },
              { key: "includes", label: "¿Qué incluye?" },
              { key: "itinerary", label: "Itinerario" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-lg font-semibold border-b-2 transition-colors ${
                  activeTab === tab.key ? "border-teal-500 text-teal-600" : "border-transparent text-gray-500 hover:text-teal-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenido dinámico */}
          <div className="mt-4">
            {activeTab === "description" && <p>{tour.description}</p>}
            {activeTab === "includes" && (
              <ul className="list-disc pl-5">
                {tour.includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
            {activeTab === "itinerary" && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-700">Fecha de salida</label>
                  <input type="date" min={today} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-700">Hora de salida</label>
                  <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-700">Boletos Normales</label>
                  <input type="number" min="1" max="10" value={normalTickets} onChange={(e) => setNormalTickets(e.target.value)} className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-700">Boletos Niños</label>
                  <input type="number" min="0" max="10" value={childTickets} onChange={(e) => setChildTickets(e.target.value)} className="w-full border px-3 py-2 rounded-md" />
                </div>
              </div>
            )}
          </div>
          <button className="mt-6 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition w-full">
            Reservar
          </button>
        </div>
      </div>
    </section>
  );
};

export default TourDetails;
