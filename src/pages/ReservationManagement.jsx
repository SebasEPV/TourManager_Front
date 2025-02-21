import { TreePalmIcon as PalmTree } from "lucide-react";
import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:3000/reservations";

// Función para obtener las reservaciones
const getReservations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error("Error al obtener las reservaciones");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function ReservationManagement() {
  const [reservations, setReservations] = useState([]);

  // Obtener las reservaciones cuando el componente se monte
  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations();
      setReservations(data);
    };
    fetchReservations();
  }, []);

  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case 1: // Confirmado
        return "bg-green-700 text-white";
      case 2: // Pagado
        return "bg-blue-500 text-white";
      case 0: // Cancelado
        return "bg-red-800 text-white";
      default:
        return "bg-gray-100";
    }
  };

  // Función para obtener el texto del estado
  const getStatusText = (status) => {
    switch (status) {
      case 1: // Reservado
        return "Reservado";
      case 2: // Pagado
        return "Pagado";
      case 0: // Cancelado
        return "Cancelado";
      default:
        return "Estado desconocido";
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <PalmTree className="w-8 h-8" />
        <h2 className="text-2xl font-bold">Reservaciones</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2 bg-[#CD9B4A] text-white rounded-tl-lg">
                Nombre cliente
              </th>
              <th className="px-4 py-2 bg-[#CD9B4A] text-white">Fecha</th>
              <th className="px-4 py-2 bg-[#CD9B4A] text-white">Cantidad</th>
              <th className="px-4 py-2 bg-[#CD9B4A] text-white">Pago</th>
              <th className="px-4 py-2 bg-[#CD9B4A] text-white rounded-tr-lg">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="border-b">
                <td className="px-4 py-3 bg-[#F5DEB3]">
                  {reservation.user.name} {reservation.user.last_name} 
                </td>
                <td className="px-4 py-3 bg-[#F5DEB3]">
                  {new Date(reservation.date).toLocaleDateString()} {/* Convertir fecha */}
                </td>
                <td className="px-4 py-3 bg-[#F5DEB3]">
                  {reservation.num_of_people} Personas
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      reservation.status
                    )}`}
                  >
                    {getStatusText(reservation.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      reservation.status
                    )}`}
                  >
                    {getStatusText(reservation.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
