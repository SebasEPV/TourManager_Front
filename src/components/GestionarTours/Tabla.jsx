import { useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import ModalVerDetalles from "./ModalVerDetalles";

const Tabla = ({ datos, titulo, eliminarElemento }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [datoSeleccionado, setDatoSeleccionado] = useState(null);

    const abrirModal = (item) => {
        setDatoSeleccionado(item);
        setModalOpen(true);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-6 w-full">
            <table className="w-full border-separate border-spacing-2 text-left table-fixed">
                <thead>
                    <tr className="bg-[#C49A5A] text-white rounded-lg">
                        <th className="p-3 text-center w-[10%] rounded-tl-lg">ID</th>
                        <th className="p-3 text-left w-[30%]">{titulo}</th>
                        <th className="p-3 text-center w-[15%]">Precio</th>
                        <th className="p-3 text-center w-[15%]">Cupo Máximo</th>
                        <th className="p-3 text-center w-[15%]">Duración</th>
                        <th className="p-3 text-center w-[7%]">Detalles</th>
                        <th className="p-3 text-center w-[10%] rounded-tr-lg">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((item, index) => (
                        <tr key={index} className="bg-[#F2D190] rounded-lg shadow-md">
                            <td className="p-3 text-center font-semibold bg-[#C49A5A] text-white rounded-lg h-12">
                                {item.id}
                            </td>
                            <td className="p-3 text-left font-medium h-12">{item.nombre}</td>
                            <td className="p-3 text-center h-12">{item.precio}</td>
                            <td className="p-3 text-center h-12">{item.cupo}</td>
                            <td className="p-3 text-center h-12">{item.duracion}</td>
                            <td className="p-3 text-center h-12">
                                <button
                                    className="text-[#C49A5A] hover:text-[#B0804A]"
                                    onClick={() => abrirModal(item)}
                                >
                                    <Eye size={20} />
                                </button>
                            </td>
                            <td className="p-3 flex justify-center gap-2 h-12">
                                <button className="text-[#609EA2] hover:text-[#4D7F85] transition">
                                    <Pencil size={20} />
                                </button>
                                <button
                                    onClick={() => eliminarElemento(item.id)}
                                    className="text-[#FF4B4B] hover:text-[#D93B3B] transition"
                                >
                                    <Trash size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ModalVerDetalles isOpen={modalOpen} onClose={() => setModalOpen(false)} datos={datoSeleccionado} />
        </div>
    );
};

export default Tabla;
