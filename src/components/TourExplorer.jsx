import React from "react";
import { motion } from "framer-motion";
import { FaUmbrellaBeach, FaHiking, FaTheaterMasks, FaMountain, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const TourCategories = () => {
  const navigate = useNavigate(); // Inicializa el hook de navegación
  const categories = [
    { label: "Playero", icon: <FaUmbrellaBeach size={30} /> },
    { label: "Aventurero", icon: <FaHiking size={30} /> },
    { label: "Cultural", icon: <FaTheaterMasks size={30} /> },
    { label: "Montañoso", icon: <FaMountain size={30} /> },
    { label: "Explorar más", icon: <FaGlobe size={30} /> },
  ];

  // Función para redirigir al login
  const handleRedirectToLogin = () => {
    navigate("/login"); // Redirige a la página de login
  };

  return (
    <section className="py-8 bg-teal-900 text-white text-center">
      <h2 className="text-2xl font-bold mb-6">Explora tipos de tours</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center p-4 bg-teal-700 rounded-lg shadow-lg hover:bg-teal-600 transition"
            onClick={handleRedirectToLogin} // Agrega el evento de clic
          >
            {category.icon}
            <span className="mt-2 text-sm font-semibold">{category.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const SearchSection = () => {
  const navigate = useNavigate(); // Inicializa el hook de navegación

  // Función para redirigir al login
  const handleRedirectToLogin = () => {
    navigate("/login"); // Redirige a la página de login
  };

  return (
    <section className="py-10 bg-teal-800 text-white text-center">
      <h2 className="text-2xl font-bold">Descubre tu próximo viaje</h2>
      <p className="mt-2">Reserva tours y observa las actividades que ofrecen</p>
      <div className="mt-6 flex justify-center gap-4">
        <input
          type="text"
          placeholder="Búsqueda de tours"
          className="px-4 py-2 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          className="bg-yellow-500 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
          onClick={handleRedirectToLogin} // Agrega el evento de clic
        >
          Buscar
        </button>
      </div>
    </section>
  );
};

const TourExplorer = () => {
  return (
    <div className="w-full">
      <TourCategories />
      <SearchSection />
    </div>
  );
};

export default TourExplorer;
