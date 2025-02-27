import { useState, useEffect } from "react";
import { BusFront } from "lucide-react";
import { FaClock, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000/tours";

const apiRequest = async (endpoint, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    return await response.json();
  } catch (error) {
    console.error("Error en la API:", error);
    return null;
  }
};

export const getTours = () => apiRequest("/");

export default function TourPage() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      const data = await getTours();
      if (data) {
        setTours(data);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-5xl h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold flex items-center">
            <BusFront size={24} className="mr-2" /> Tours Disponibles
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6 overflow-y-auto scrollbar-hide flex-grow p-2">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl shadow-lg p-3 w-72 h-[400px] flex flex-col justify-between"
            >
              <img
                src={tour.img_path}
                alt={tour.name}
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold text-center mt-2">
                {tour.name}
              </h3>

              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
                  <FaClock className="mr-2" /> {tour.duration} hr
                </span>
                <span className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
                  <FaUsers className="mr-2" /> Cupo Max. {tour.max_capacity}
                </span>
              </div>

              <button
                className="bg-gray-700 text-white w-full py-3 mt-3 rounded-lg hover:bg-gray-900"
                onClick={() => navigate(`/tour/${tour.id}`)}
              >
                Conoce más
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
