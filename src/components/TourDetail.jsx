// Componente TourDetail actualizado con enlaces "Conocer más"
import React from "react";
import { Link } from "react-router-dom";

const TourDetail = () => {
  const tours = [
    {
      title: "Isla Mujeres",
      description: "Explora las aguas cristalinas y disfruta de la naturaleza.",
      price: "$100.00",
      image: "/IslaMujeres.jpeg",
    },
    {
      title: "Tulum",
      description: "Descubre las ruinas mayas y playas paradisíacas.",
      price: "$120.00",
      image: "/Tulum.jpg",
    },
    {
      title: "Cozumel",
      description: "Disfruta de la mejor experiencia de snorkel y buceo.",
      price: "$90.00",
      image: "/Cozumel.webp",
    },
  ];

  return (
    <section className="py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">Tours Más Reservados</h2>
      <div className="flex flex-col md:flex-row justify-center gap-6 px-4">
        {tours.map((tour, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-1/3">
            <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{tour.title}</h3>
              <p className="text-gray-600 text-sm my-2">{tour.description}</p>
              <p className="text-lg font-bold text-green-600">{tour.price}</p>
              <Link to={`/tour/${index}`} target="_blank" className="block mt-3 bg-teal-500 text-white py-2 rounded-md hover:bg-teal-400 transition">
                Conocer más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourDetail;
