import React from "react";
import { Link } from "react-router-dom";

const TourCard2 = ({ tours, loading, error }) => {
  if (loading)
    return <p className="text-center text-gray-600">Cargando tours...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      {tours.map((tour) => {
        return (
          <div
            key={tour.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-[400px] w-full" // Fixed height and width
          >
            <img
              src={`/${tour.img_path}`}
              alt={tour.name}
              className="w-full h-[160px] object-cover"
            />

            <div className="p-4 flex flex-col flex-grow justify-between">
              <div className="text-center">
                <h3 className="text-xl font-semibold line-clamp-2">
                  {tour.name}
                </h3>
                <p className="text-gray-600 text-sm my-2 line-clamp-4 overflow-y-auto">
                  {tour.description}
                </p>
              </div>

              <div className="text-center">
                <p className="text-lg font-bold text-green-600">
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
          </div>
        );
      })}
    </>
  );
};

export default TourCard2;