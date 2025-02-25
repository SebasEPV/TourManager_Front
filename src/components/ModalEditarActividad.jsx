import { useState, useEffect } from "react";
import { X } from "lucide-react";

const ModalEditarActividad = ({ isOpen, onClose, datos }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (datos) {
            setFormData({ ...datos });  
        }
    }, [datos]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos editados:", formData); 
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center p-4">
            <div className="bg-[#E3E3E3] p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>

                <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Editar Actividad</h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Tour Name */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361]"
                        />
                    </div>

                    {/* Tour Price */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">Precio:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price || ""}
                            onChange={handleChange}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361]"
                        />
                    </div>

                    {/* Maximum Capacity */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">Cupo Máximo:</label>
                        <input
                            type="number"
                            name="max_capacity"
                            value={formData.max_capacity || ""}
                            onChange={handleChange}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361]"
                        />
                    </div>

                    {/* Tour Duration */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">Duración (hrs):</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration || ""}
                            onChange={handleChange}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361]"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">Descripción:</label>
                        <textarea
                            name="description"
                            value={formData.description || ""}
                            onChange={handleChange}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361]"
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="bg-[#6C8361] text-white p-3 rounded mt-4">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalEditarActividad;
