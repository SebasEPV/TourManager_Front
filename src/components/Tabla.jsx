import { useState } from "react";
import { Eye, Pencil, Trash, Bus, Search, X } from "lucide-react"; 
import { FaHiking } from "react-icons/fa";
import ModalVerDetalles from "./ModalVerDetalles";
import ModalEditarTour from "./ModalEditarTour";
import ModalEditarActividad from "./ModalEditarActividad";

const Tabla = ({ datos, titulo, eliminarElemento, esActividad }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [datoSeleccionado, setDatoSeleccionado] = useState(null);
    
    const [paginaActual, setPaginaActual] = useState(1);
    const [busqueda, setBusqueda] = useState("");

    const itemsPorPagina = 10;

    const datosFiltrados = datos.filter((item) =>
        item.name.toLowerCase().includes(busqueda.toLowerCase()) || 
        item.id.toString().includes(busqueda)
    );

    const totalPaginas = Math.ceil(datosFiltrados.length / itemsPorPagina);

    const inicio = (paginaActual - 1) * itemsPorPagina;
    const datosPaginados = datosFiltrados.slice(inicio, inicio + itemsPorPagina);

    const abrirModal = (item) => {
        setDatoSeleccionado(item);
        setModalOpen(true);
    };

    const abrirModalEditar = (item) => {
        setDatoSeleccionado(item);
        setModalEditOpen(true);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                    <div className="bg-[#CD9B4A]/10 p-3 rounded-lg">
                        {esActividad ? (
                            <FaHiking className="w-6 h-6 text-[#CD9B4A]" />
                        ) : (
                            <Bus className="w-6 h-6 text-[#CD9B4A]" />
                        )}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{titulo}</h2>
                </div>
                
                <div className="flex items-center">
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Buscar por nombre o ID..."
                            value={busqueda}
                            onChange={(e) => {
                                setBusqueda(e.target.value);
                                setPaginaActual(1);
                            }}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    {busqueda && (
                        <button
                            className="ml-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                            onClick={() => {
                                setBusqueda("");
                                setPaginaActual(1);
                            }}
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#CD9B4A]/10 text-[#CD9B4A] text-sm font-semibold">
                            <th className="px-6 py-3 text-left w-1/12">ID</th>
                            <th className="px-6 py-3 text-left w-3/12">{titulo}</th>
                            <th className="px-6 py-3 text-center w-2/12">Precio</th>
                            <th className="px-6 py-3 text-center w-2/12">Cupo Máximo</th>
                            <th className="px-6 py-3 text-center w-2/12">Duración</th>
                            <th className="px-6 py-3 text-center w-1/12">Detalles</th>
                            <th className="px-6 py-3 text-center w-1/12">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white text-gray-900">
                        {datosPaginados.length > 0 ? (
                            datosPaginados.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3">{item.id}</td>
                                    <td className="px-6 py-3">{item.name}</td>
                                    <td className="px-6 py-3 text-center">${item.price}</td>
                                    <td className="px-6 py-3 text-center">{item.max_capacity}</td>
                                    <td className="px-6 py-3 text-center">{item.duration} hr</td>
                                    <td className="px-6 py-3 text-center">
                                        <button
                                            className="text-gray-500 hover:text-gray-700 transition"
                                            onClick={() => abrirModal(item)}
                                        >
                                            <Eye size={20} />
                                        </button>
                                    </td>
                                    <td className="px-6 py-3 flex justify-center gap-3">
                                        <button
                                            onClick={() => abrirModalEditar(item)}
                                            className="text-blue-500 hover:text-blue-700 transition"
                                        >
                                            <Pencil size={20} />
                                        </button>
                                        <button
                                            onClick={() => eliminarElemento(item.id)}
                                            className="text-red-500 hover:text-red-700 transition"
                                        >
                                            <Trash size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                    No se encontraron resultados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPaginas > 1 && (
                <div className="flex justify-between items-center mt-4">
                    <button
                        className={`px-4 py-2 rounded-lg text-white ${
                            paginaActual === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#CD9B4A] hover:bg-[#B0833E]"
                        }`}
                        onClick={() => setPaginaActual(paginaActual - 1)}
                        disabled={paginaActual === 1}
                    >
                        Anterior
                    </button>
                    <span className="text-gray-700">
                        Página {paginaActual} de {totalPaginas}
                    </span>
                    <button
                        className={`px-4 py-2 rounded-lg text-white ${
                            paginaActual === totalPaginas ? "bg-gray-400 cursor-not-allowed" : "bg-[#CD9B4A] hover:bg-[#B0833E]"
                        }`}
                        onClick={() => setPaginaActual(paginaActual + 1)}
                        disabled={paginaActual === totalPaginas}
                    >
                        Siguiente
                    </button>
                </div>
            )}

            <ModalVerDetalles isOpen={modalOpen} onClose={() => setModalOpen(false)} datos={datoSeleccionado} />
            {esActividad ? (
                <ModalEditarActividad isOpen={modalEditOpen} onClose={() => setModalEditOpen(false)} datos={datoSeleccionado} />
            ) : (
                <ModalEditarTour isOpen={modalEditOpen} onClose={() => setModalEditOpen(false)} datos={datoSeleccionado} />
            )}
        </div>
    );
};

export default Tabla;