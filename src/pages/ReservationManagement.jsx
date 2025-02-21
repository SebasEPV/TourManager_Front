"use client"

import { TreePalmIcon as PalmTree } from "lucide-react"
import { useState, useEffect } from "react"

const API_BASE_URL = "http://localhost:3000/reservations"

// Función para obtener las reservaciones
const getReservations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`)
    if (!response.ok) throw new Error("Error al obtener las reservaciones")
    return await response.json()
  } catch (error) {
    console.error(error)
    return []
  }
}

export default function ReservationManagement() {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations()
      setReservations(data)
    }
    fetchReservations()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "bg-emerald-500 text-white"
      case 2:
        return "bg-blue-500 text-white"
      case 0:
        return "bg-red-500 text-white"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Reservado"
      case 2:
        return "Pagado"
      case 0:
        return "Cancelado"
      default:
        return "Estado desconocido"
    }
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-[#CD9B4A]/10 p-3 rounded-lg">
          <PalmTree className="w-6 h-6 text-[#CD9B4A]" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Reservaciones</h2>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="px-6 py-4 bg-[#CD9B4A]/10 text-[#CD9B4A] font-medium">Nombre cliente</th>
              <th className="px-6 py-4 bg-[#CD9B4A]/10 text-[#CD9B4A] font-medium">Fecha</th>
              <th className="px-6 py-4 bg-[#CD9B4A]/10 text-[#CD9B4A] font-medium">Cantidad</th>
              <th className="px-6 py-4 bg-[#CD9B4A]/10 text-[#CD9B4A] font-medium">Pago</th>
              <th className="px-6 py-4 bg-[#CD9B4A]/10 text-[#CD9B4A] font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {reservation.user.name} {reservation.user.last_name}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{new Date(reservation.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-gray-100 text-gray-700">
                    {reservation.num_of_people}
                    <span className="text-gray-500">Personas</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      reservation.status,
                    )}`}
                  >
                    {getStatusText(reservation.status)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      reservation.status,
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
  )
}

