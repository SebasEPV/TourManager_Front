import { useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import ModalVerDetalles from "./ModalVerDetalles";
import ModalEditarTour from "./ModalEditarTour";
import ModalEditarActividad from "./ModalEditarActividad"; 

const Tabla = ({ datos, titulo, eliminarElemento, esActividad }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);  
    const [datoSeleccionado, setDatoSeleccionado] = useState(null);

    const abrirModal = (item) => {
        setDatoSeleccionado(item);
        setModalOpen(true);
    };

    const abrirModalEditar = (item) => {
        setDatoSeleccionado(item); 
        setModalEditOpen(true);    
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md mt-6 w-full border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">{titulo}</h2>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full">
                    <thead>
                        <tr className="text-left bg-gray-50 text-gray-600 text-sm font-medium">
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">{titulo}</th>
                            <th className="px-6 py-4 text-center">Precio</th>
                            <th className="px-6 py-4 text-center">Cupo Máximo</th>
                            <th className="px-6 py-4 text-center">Duración</th>
                            <th className="px-6 py-4 text-center">Detalles</th>
                            <th className="px-6 py-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {datos.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900 font-medium">{item.id}</td>
                                <td className="px-6 py-4 text-gray-700">{item.name}</td>
                                <td className="px-6 py-4 text-center text-gray-700">${item.price}</td>
                                <td className="px-6 py-4 text-center text-gray-700">{item.max_capacity}</td>
                                <td className="px-6 py-4 text-center text-gray-700">{item.duration} hr</td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        className="text-gray-500 hover:text-gray-700 transition"
                                        onClick={() => abrirModal(item)}
                                    >
                                        <Eye size={20} />
                                    </button>
                                </td>
                                <td className="px-6 py-4 flex justify-center gap-3">
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
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalVerDetalles isOpen={modalOpen} onClose={() => setModalOpen(false)} datos={datoSeleccionado} />
            {esActividad ? (
                <ModalEditarActividad
                    isOpen={modalEditOpen}
                    onClose={() => setModalEditOpen(false)}
                    datos={datoSeleccionado}
                />
            ) : (
                <ModalEditarTour
                    isOpen={modalEditOpen}
                    onClose={() => setModalEditOpen(false)}
                    datos={datoSeleccionado}
                />
            )}
        </div>
    );
};

export default Tabla;
