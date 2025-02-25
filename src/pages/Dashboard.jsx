import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import SidebarDashboard from "../layout/sidebarDashboard";

const data = [
  { name: "Jan", ingresos: 112 },
  { name: "Feb", ingresos: 200 },
  { name: "Mar", ingresos: 250 },
  { name: "Apr", ingresos: 280 },
  { name: "May", ingresos: 310 },
  { name: "Jun", ingresos: 315 },
  { name: "Jul", ingresos: 330 },
  { name: "Aug", ingresos: 350 },
  { name: "Sep", ingresos: 380 },
  { name: "Oct", ingresos: 420 },
  { name: "Nov", ingresos: 442 },
  { name: "Dec", ingresos: 467 }
];

const pieData = [
  { name: "Confirmados", value: 400, color: "#4A7C59" },
  { name: "Pagado", value: 200, color: "#F4E04D" },
  { name: "Cancelados", value: 100, color: "#A44200" },
];

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <div className="w-64 bg-white shadow-md">
      <SidebarDashboard/>
    </div>
  
    <div className="flex-1 p-6 bg-gray-200 min-h-screen">
      <div className="grid grid-cols-2 gap-6">
        {/* Tours más reservados */}
        <div className="bg-[#8BA97B] p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Tours Más reservados</h2>
          <div className="space-y-2">
            {["#1", "#2", "#3", "#4"].map((rank) => (
              <div key={rank} className="flex justify-between items-center bg-white p-2 rounded-md shadow">
                <span className="bg-gray-100 px-2 py-1 rounded">{rank}</span>
                <span>Tour Isla Mujeres</span>
                <span className="bg-[#F2D190] px-2 py-1 rounded">Cantidad total de reservas</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Historial de ingresos */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Historial de ingresos</h2>
          <BarChart width={400} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ingresos" fill="#4A7C59" />
          </BarChart>
        </div>
      </div>
  
      {/* Tasa de reservas por mes */}
      <div className="mt-6 bg-[#8BA97B] p-4 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4">Tasa de reservas por mes</h2>
        <div className="flex items-center">
          <PieChart width={250} height={250}>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80}>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
          <div className="ml-4 text-sm">
            <div className="flex items-center"><span className="w-4 h-4 bg-green-600 inline-block mr-2"></span>Confirmados</div>
            <div className="flex items-center"><span className="w-4 h-4 bg-yellow-400 inline-block mr-2"></span>Pagado</div>
            <div className="flex items-center"><span className="w-4 h-4 bg-red-600 inline-block mr-2"></span>Cancelados</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  


  );
};

export default Dashboard;