import { X } from "lucide-react";

const ModalVerDetalles = ({ isOpen, onClose, datos }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#A5D8D6] p-6 rounded-lg shadow-lg w-[400px] relative">
                <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
                    <X size={24} />
                </button>

                <img 
                    src={datos.img_path || "https://via.placeholder.com/400"} 
                    alt={datos.nombre} 
                    className="w-full h-40 object-cover rounded-lg"
                />

                <div className="mt-4 p-4 bg-[#D1E8E2] rounded-lg">
                    <h2 className="text-xl font-bold">{datos.name}</h2>
                    <div className="mt-2">
                        <p><strong>Descripción:</strong> {datos.description}</p>
                        <p><strong>Precio:</strong> ${datos.price}</p>
                        <p><strong>Cupo Máximo:</strong> {datos.max_capacity}</p>
                        <p><strong>Duración:</strong> {datos.duration} hr</p>
                    </div>
                    
                    {datos.actividades && datos.actividades.length > 0 && (
                        <div className="mt-4">
                            <p className="font-bold">Actividades:</p>
                            <ul className="list-disc ml-6">
                                {datos.actividades.map((actividad, index) => (
                                    <li key={index}>{actividad}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalVerDetalles;
