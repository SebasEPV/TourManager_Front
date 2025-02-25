import React, { useEffect, useState } from "react";
import {
  getMostReservedTours,
  getMonthlyIncome,
  getCancelationPercentage,
  getPendingPaidPercentage,
  getPaidPercentage,
  getReservations,
} from "./../services/reservationService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  Legend as PieLegend,
} from "recharts";

const Dashboard = () => {
  const [mostReservedTours, setMostReservedTours] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [reservationStatuses, setReservationStatuses] = useState({
    paid_percentage: 0,
    cancelation_percentage: 0,
    pending_paid_percentage: 0,
  });
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchMostReservedTours = async () => {
      const data = await getMostReservedTours();
      if (data) {
        setMostReservedTours(data.most_reserved_tours);
      }
    };

    const fetchMonthlyIncome = async () => {
      const data = await getMonthlyIncome();
      if (data) {
        const formattedData = Object.keys(data.monthly_income).map((key) => ({
          name: key,
          ingresos: data.monthly_income[key],
        }));
        setMonthlyIncome(formattedData);
      }
    };

    const fetchReservationStatuses = async () => {
      const cancelationData = await getCancelationPercentage();
      const pendingPaidData = await getPendingPaidPercentage();
      const paidData = await getPaidPercentage();
      const reservationsData = await getReservations();

      if (cancelationData && pendingPaidData && paidData) {
        setReservationStatuses({
          cancelation_percentage: cancelationData.cancelation_percentage,
          pending_paid_percentage: pendingPaidData.pending_paid_percentage,
          paid_percentage: paidData.paid_percentage,
        });
        setReservations(reservationsData); // Store reservations data
      }
    };

    fetchMostReservedTours();
    fetchMonthlyIncome();
    fetchReservationStatuses();
  }, []);

  const pieData = [
    { name: "Pagadas", value: reservationStatuses.paid_percentage },
    { name: "Canceladas", value: reservationStatuses.cancelation_percentage },
    {
      name: "Pendientes por pagar",
      value: reservationStatuses.pending_paid_percentage,
    },
  ];

  const COLORS = ["#4A7C59", "#FF6347", "#FFD700"];

  return (
    <div className="flex flex-1">
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#8BA97B] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold mb-4 text-white">
              Tours Más Reservados
            </h2>
            <div className="space-y-3">
              {mostReservedTours.length > 0 ? (
                mostReservedTours.map((tour, index) => (
                  <div
                    key={tour.tour_id}
                    className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">{`#${
                        index + 1
                      }`}</span>
                      <span className="text-gray-700 font-medium">
                        {tour.name}
                      </span>
                    </div>

                    <div className="text-center">
                      <span className="bg-[#F2D190] px-3 py-1 rounded-full text-sm font-medium">
                        {`Reservas: ${tour.count}`}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="bg-[#F2D190] px-3 py-1 rounded-full text-sm font-medium">
                        {`Ingresos: $${tour.count * tour.price}`}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Cargando...</p>
              )}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Historial de Ingresos
            </h2>
            <BarChart width={400} height={250} data={monthlyIncome}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Bar dataKey="ingresos" fill="#4A7C59" radius={[4, 4, 0, 0]} />
            </BarChart>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Porcentaje de Reservas
          </h2>
          <div className="flex justify-center">
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <PieTooltip
                contentStyle={{
                  backgroundColor: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </div>

          <div className="flex justify-center mt-4">
            {pieData.map((entry, index) => {
              const totalReservations = reservations.length;
              const reservationsCount = Math.round(
                (totalReservations * entry.value) / 100
              );
              return (
                <div key={index} className="flex items-center mr-4">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span className="ml-2 text-gray-800 font-medium">
                    {`${entry.name}: ${entry.value}%`}
                  </span>
                  <span className="ml-2 text-gray-800 font-medium">
                    {`Cantidad: ${reservationsCount}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
