import { MapPin, Phone, Mail } from "lucide-react";

export default function VoucherModal({ onClose, data }) {
  return (
    <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 mb-12 md:p-8 rounded-lg shadow-xl w-full max-w-2xl relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
        >
          Cerrar
        </button>

        <div className="flex justify-between items-center border-b pb-4">
          <div
            className="w-32 h-32 flex items-center justify-center rounded-lg"
            style={{
              backgroundImage: "url('/LogoKANKUN.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#007870]">{data.tour.name}</h2>
            <div className="flex items-center justify-center gap-4 text-gray-500 text-sm mt-2">
              <p className="flex items-center gap-1">
                <MapPin size={14} className="text-white fill-[#007870]" />{" "}
                Dirección
              </p>
              <p className="flex items-center gap-1">
                <Phone size={14} className="text-white fill-[#007870]" /> 111-222-3333
              </p>
              <p className="flex items-center gap-1">
                <Mail size={14} className="text-white fill-[#007870]" /> contacto@kankun.com
              </p>
            </div>
          </div>
          <div className="text-right text-xl font-semibold text-white">
            Recibo
          </div>
        </div>

        <div className="flex justify-between items-start mt-4 border-b pb-2">
          <div>
            <h3 className="text-[#007870] font-semibold">Reservado por</h3>
            <p className="text-sm text-gray-700 pl-4">{data.user.name + " " + data.user.last_name}</p>
            <p className="text-sm text-gray-700 pl-4">{data.user.email}</p>
          </div>
          <div className="text-right text-xl text-[#007870] font-bold">
            Voucher
          </div>
        </div>

        <div className="flex justify-between items-start mt-4 border-b pb-2">
          <div>
            <h3 className="text-[#007870] font-semibold">Detalles de la reserva</h3>
            <p className="text-sm text-gray-700 pl-4">
              Fecha de la reserva:{data.date}
              <span className="font-medium">{data.startDate}</span>
            </p>
            <p className="text-sm text-gray-700 pl-4">
              Hora de la reserva:{data.date}
              <span className="font-medium">{data.endDate}</span>
            </p>
            <p className="text-sm text-gray-700 pl-4">
              Cantidad de personas: {data.num_of_people + data.num_of_kids}
            </p>
            <p className="text-sm text-gray-700 pl-4">
              Número de asignación: {data.id}
            </p>
          </div>
          <div className="text-right flex flex-col h-full justify-end">
            <p className="text-sm text-gray-700 font-semibold">
              Recibo #{data.id} <span className="font-normal">{data.receiptNumber}</span>
            </p>
            <p className="text-sm text-gray-700 font-semibold mt-auto">
              Fecha del recibo <span className="font-normal">{data.receiptDate}</span>
            </p>
          </div>
        </div>

        {/* Detalles de los pagos */}
        <div className="mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b bg-[#007870] text-white">
                <th className="py-2 text-left pl-2">Cantidad</th>
                <th className="py-2 text-left">Descripción</th>
                <th className="py-2 text-left">Precio por Persona</th>
                <th className="py-2 text-left pr-2">Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pl-2">1</td>
                <td className="py-2">{data.tour.name}</td>
                <td className="py-2">${data.total_price / data.num_of_people}.00</td>
                <td className="py-2 pr-2">{data.total_price}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <p className="text-lg font-semibold flex justify-between text-gray-800">
            <span>Total:</span> <span>${data.total_price / data.num_of_people}.00</span>
          </p>
        </div>
      </div>
    </div>
  );
}
