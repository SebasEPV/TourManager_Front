"use client"

import { TreePalmIcon as PalmTree } from "lucide-react"
import { useState, useEffect } from "react"
import { getReservations } from "../services/reservationService"

export default function ReservationManagement() {
  const [reservations, setReservations] = useState([])
  const [filteredReservations, setFilteredReservations] = useState([])
  const [selectedTour, setSelectedTour] = useState("")
  const [selectedClient, setSelectedClient] = useState("")
  const [searchId, setSearchId] = useState("")  

  const [tours, setTours] = useState([])
  const [clients, setClients] = useState([])

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations()
      setReservations(data)
      setFilteredReservations(data) 

      const toursList = [...new Set(data.map(reservation => reservation.tour.name))]  
      const clientsList = [
        ...new Set(data.map(reservation => `${reservation.user.name} ${reservation.user.last_name}`))
      ] 

      setTours(toursList)
      setClients(clientsList)
    }
    fetchReservations()
  }, [])

  useEffect(() => {
    setFilteredReservations(
      reservations.filter((reservation) => {
        const matchesTour = selectedTour ? reservation.tour.name === selectedTour : true
        const matchesClient = selectedClient ? `${reservation.user.name} ${reservation.user.last_name}` === selectedClient : true
        const matchesId = searchId ? reservation.id.toString().includes(searchId) : true  // Filtrar por ID

        return matchesTour && matchesClient && matchesId
      })
    )
  }, [selectedTour, selectedClient, searchId, reservations])

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-[#CD9B4A]/10 p-3 rounded-lg">
            <PalmTree className="w-6 h-6 text-[#CD9B4A]" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Reservaciones</h2>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Buscar por ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="px-4 py-2 border rounded-lg text-gray-700"
          />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-5 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Seleccionar Tour/Actividad:</label>
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 w-full"
            value={selectedTour}
            onChange={(e) => setSelectedTour(e.target.value)}
          >
            <option value="">Todos los Tours</option>
            {tours.map((tour, index) => (
              <option key={index} value={tour}>
                {tour}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Seleccionar Cliente:</label>
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 w-full"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option value="">Todos los Clientes</option>
            {clients.map((client, index) => (
              <option key={index} value={client}>
                {client}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="px-6 py-4 bg-[#CD9B4A]/10 text-[#CD9B4A] font-medium">ID</th>
              <th className="px-6 py-4 bg-[#CD9B4A]/10 text-[#CD9B4A] font-medium">Nombre cliente</th>
              <th className="px-6 py-4 bg-[#CD9B4A]/10 text-[#CD9B4A] font-medium">Tour/Actividad</th>
              <th className="px-6 py-4 bg-[#CD9B4A]/10 text-[#CD9B4A] font-medium">Fecha</th>
              <th className="px-6 py-4 bg-[#CD9B4A]/10 text-[#CD9B4A] font-medium">Cantidad</th>
              <th className="px-6 py-4 bg-[#CD9B4A]/10 text-[#CD9B4A] font-medium">Pago</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{reservation.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {reservation.user.name} {reservation.user.last_name}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{reservation.tour.name}</td>
                <td className="px-6 py-4 text-gray-600">{new Date(reservation.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-gray-100 text-gray-700">
                    {reservation.num_of_people}
                    <span className="text-gray-500">Personas</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      reservation.status === 1
                        ? "bg-emerald-500 text-white"
                        : reservation.status === 2
                        ? "bg-blue-500 text-white"
                        : reservation.status === 0
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {reservation.status === 1
                      ? "Reservado"
                      : reservation.status === 2
                      ? "Pagado"
                      : reservation.status === 0
                      ? "Cancelado"
                      : "Estado desconocido"}
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
