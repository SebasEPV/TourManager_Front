import { TreePalmIcon as PalmTree } from "lucide-react";

export default function ReservationManagement() {
  const reservations = [
    {
      id: 1,
      clientName: "Jesús Martínez",
      date: "14/02/2025",
      quantity: "6 Personas",
      payment: "Aprobado",
      status: "Confirmado",
    },
    {
      id: 2,
      clientName: "Kristal Palma",
      date: "18/03/2025",
      quantity: "2 personas",
      payment: "Procesando",
      status: "Pendiente",
    },
    {
      id: 3,
      clientName: "Melchor Ojeda",
      date: "18/03/2025",
      quantity: "2 personas",
      payment: "Rechazado",
      status: "Cancelado",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmado":
      case "Aprobado":
        return "bg-green-700 text-white";
      case "Pendiente":
        return "bg-yellow-200 text-yellow-800";
      case "Procesando":
        return "bg-gray-500 text-white";
      case "Rechazado":
      case "Cancelado":
        return "bg-red-800 text-white";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <PalmTree className="w-8 h-8" />
        <h2 className="text-2xl font-bold">NOMBRE DEL TOUR</h2>
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
                  {reservation.clientName}
                </td>
                <td className="px-4 py-3 bg-[#F5DEB3]">{reservation.date}</td>
                <td className="px-4 py-3 bg-[#F5DEB3]">
                  {reservation.quantity}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      reservation.payment
                    )}`}
                  >
                    {reservation.payment}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      reservation.status
                    )}`}
                  >
                    {reservation.status}
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
