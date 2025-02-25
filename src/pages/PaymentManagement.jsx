"use client";
import { useState, useEffect } from "react";
import {
  CreditCard,
  Check,
  X,
  Calendar,
  Users,
} from "lucide-react";
import {
  getReservations,
  markReservationPaid,
  cancelReservation,
} from "./../services/reservationService";

export default function PaymentManagement() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const data = await getReservations();
    if (data) setReservations(data);
  };

  const handlePayment = async (id) => {
    setLoading(true);
    try {
      await markReservationPaid(id);
      await fetchReservations();
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm("¿Está seguro que desea cancelar esta reservación?")) {
      setLoading(true);
      try {
        await cancelReservation(id);
        await fetchReservations();
      } catch (error) {
        console.error("Error canceling reservation:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 1:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
            <Calendar className="w-4 h-4" />
            Reservado
          </span>
        );
      case 2:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700">
            <Check className="w-4 h-4" />
            Pagado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-700">
            <X className="w-4 h-4" />
            Cancelado
          </span>
        );
    }
  };

  const filteredReservations = reservations.filter(
    (reservation) => reservation.id.toString().includes(searchId)
  );

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg flex-1">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <CreditCard className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Gestión de Pagos
          </h2>
          <div className="ml-165">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Buscar por ID"
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="px-6 py-4 bg-gray-50 text-gray-600 font-medium text-sm text-center">
                ID
              </th>
              <th className="px-6 py-4 bg-gray-50 text-gray-600 font-medium text-sm text-center">
                Cliente
              </th>
              <th className="px-6 py-4 bg-gray-50 text-gray-600 font-medium text-sm text-center">
                Fecha
              </th>
              <th className="px-6 py-4 bg-gray-50 text-gray-600 font-medium text-sm text-center">
                Personas
              </th>
              <th className="px-6 py-4 bg-gray-50 text-gray-600 font-medium text-sm text-center">
                Total
              </th>
              <th className="px-6 py-4 bg-gray-50 text-gray-600 font-medium text-sm text-center">
                Estado
              </th>
              <th className="px-6 py-4 bg-gray-50 text-gray-600 font-medium text-sm text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredReservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900 w-auto">
                  #{reservation.id}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-gray-900">
                      {reservation.user.name} {reservation.user.last_name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {reservation.user.email}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(reservation.date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm bg-gray-100 text-gray-700">
                    <Users className="w-4 h-4" />
                    {reservation.num_of_people}
                    {reservation.num_of_kids > 0 && (
                      <span className="text-gray-500">
                        ({reservation.num_of_kids} niños)
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-gray-900 font-medium">
                  ${Number.parseFloat(reservation.total_price).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  {getStatusBadge(reservation.status)}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-2 justify-center">
                    {reservation.status !== 0 && reservation.status !== 2 && (
                      <>
                        <button
                          onClick={() => handleCancel(reservation.id)}
                          disabled={loading}
                          className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handlePayment(reservation.id)}
                          disabled={loading}
                          className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}