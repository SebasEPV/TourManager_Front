import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GiAncientRuins, GiUndergroundCave, GiPalmTree , GiSnorkel } from "react-icons/gi";
import { TbScubaDiving, TbParachute } from "react-icons/tb"; 
import { FaUtensils } from "react-icons/fa";
import { PiBeachBallFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { getTourTypes } from "../services/tourTypesService"; 

const TourCategories = () => {
  const [tourTypes, setTourTypes] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();   

  const getIcon = (logoName) => {
    switch (logoName) {
      case "GiPalmTree":
        return <GiPalmTree size={30} />;
      case "GiAncientRuins":
        return <GiAncientRuins size={30} />;
      case "GiUndergroundCave":
        return <GiUndergroundCave size={30} />;
      case "GiSnorkel":
        return <GiSnorkel size={30} />;
      case "TbScubaDiving":
        return <TbScubaDiving size={30} />;
      case "TbParachute":
        return <TbParachute size={30} />;
      case "FaUtensils":
        return <FaUtensils size={30} />;
      default:
        return <PiBeachBallFill size={30} />;
    }
  };

  useEffect(() => {
    const fetchTourTypes = async () => {
      try {
        const data = await getTourTypes();
        if (data) {
          setTourTypes(data);
        } else {
          setError("No se pudieron cargar los tipos de tour."); 
        }
      } catch (err) {
        setError("Error al cargar los tipos de tour.");
      } finally {
        setLoading(false);
      }
    };

    fetchTourTypes();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/tours?type=${categoryId}`);
  };

  if (loading) {
    return <p className="text-center text-white">Cargando tipos de tour...</p>;
  }

  if (error) {
    return <p className="text-center text-white">{error}</p>;
  }

  return (
    <section className="py-8 bg-teal-900 text-white text-center">
      <h2 className="text-2xl font-bold mb-6">Explora tipos de tours</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {tourTypes.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center justify-center bg-teal-700 rounded-lg shadow-lg hover:bg-teal-600 transition w-24 h-24 cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            {getIcon(category.logo)}
            <span className="mt-2 text-center text-sm font-semibold">{category.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const SearchSection = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearchClick = () => {
    if (search.trim()) {
      navigate(`/tours?search=${search}`);
    }
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-yellow-500 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
          onClick={handleSearchClick}
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
