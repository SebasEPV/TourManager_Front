import React from "react";
import { Link } from "react-router-dom";

const TourCard = ({ tours, loading, error }) => {
  if (loading)
    return <p className="text-center text-gray-600">Cargando tours...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center gap-6 px-4">
        {tours.map((tour) => {
          return (
            <div
              key={tour.id} 
              className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-1/3 flex flex-col"
            >
              <img
                src={`/${tour.img_path}`}
                alt={tour.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold line-clamp-2">
                  {tour.name}
                </h3>
                <p className="text-gray-600 text-sm my-2 line-clamp-3">
                  {tour.description}
                </p>
                <p className="text-lg font-bold text-green-600 mt-auto">
                  ${tour.price}.00
                </p>
                <Link
                  to={`/tour/${tour.id}`}
                  className="block mt-3 bg-teal-500 text-white py-2 rounded-md hover:bg-teal-400 transition"
                >
                  Conocer más
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};


export default TourCard;