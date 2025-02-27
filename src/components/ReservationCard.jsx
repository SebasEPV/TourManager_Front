import React, { useState } from "react";
import { Trash2, FileText } from "lucide-react";
import VoucherModal from "./VoucherModal";
import { cancelReservation } from "./../services/reservationService";

const ReservationCard = ({ reservations, loading, error, setReservations }) => { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleOpenModal = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  const handleCancelReservation = async (id) => {
    try {
      const canceledReservation = await cancelReservation(id);
      if (canceledReservation) {
        setReservations((prevReservations) => 
          prevReservations.filter((reservation) => reservation.id !== id)
        );
        alert("Reserva cancelada exitosamente.");
      } else {
        alert("Error al cancelar la reserva.");
      }
    } catch (error) {
      console.error("Error cancelando la reserva:", error);
      alert("Hubo un error al cancelar la reserva.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Cargando reservas...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      {reservations.map((reservation) => (
        <div
          key={reservation.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-[450px] w-full"
        >
          <img
            src={`/${reservation.tour.img_path}`}
            alt={reservation.tour.name}
            className="w-full h-48 object-cover"
          />

          <div className="p-4 flex flex-col flex-grow justify-between">
            <div className="text-center">
              <h3 className="text-xl font-semibold line-clamp-2">
                {reservation.tour.name}
              </h3>
              <p className="text-gray-600 text-sm my-2 line-clamp-4 overflow-y-auto">
                {reservation.tour.description}
              </p>
              <p className="text-lg font-bold text-green-600">
                ${reservation.total_price}.00
              </p>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => handleOpenModal(reservation)}
                className="flex-1 bg-teal-500 text-white py-2 rounded-md hover:bg-teal-400 transition flex items-center justify-center gap-2"
              >
                <FileText size={16} /> Ver Voucher
              </button>
              <button
                onClick={() => handleCancelReservation(reservation.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-400 transition flex items-center justify-center gap-2"
              >
                <Trash2 size={16} /> Cancelar
              </button>
            </div>
          </div>
        </div>
      ))}

      {isModalOpen && selectedReservation && (
        <VoucherModal onClose={handleCloseModal} data={selectedReservation} />
      )}
    </>
  );
};

export default ReservationCard;
