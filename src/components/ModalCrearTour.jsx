import { useState, useEffect } from "react";
import { X } from "lucide-react";

const ModalCrearTour = ({ onClose }) => {
    const [formData, setFormData] = useState({
        imagen: "",
        nombre: "",
        descripcion: "",
        precio: "",
        cupo: "",
        duracion: "",
        actividades: [],
        tipoTour: "",
    });

    const [errors, setErrors] = useState({});
    const [tourTypes, setTourTypes] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Fetch tour types
        const fetchTourTypes = async () => {
            const response = await fetch("http://localhost:3000/tour_types");
            const data = await response.json();
            setTourTypes(data);
        };

        // Fetch activities
        const fetchActivities = async () => {
            const response = await fetch("http://localhost:3000/activities");
            const data = await response.json();
            setActivities(data);
        };

        fetchTourTypes();
        fetchActivities();
    }, []);

    const validate = () => {
        let newErrors = {};
        if (!formData.imagen.trim()) newErrors.imagen = "Imagen requerida.";
        if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
        if (!formData.descripcion.trim()) newErrors.descripcion = "La descripción es obligatoria.";
        if (!formData.precio.trim() || isNaN(formData.precio)) newErrors.precio = "Ingrese un precio válido.";
        if (!formData.cupo.trim() || isNaN(formData.cupo)) newErrors.cupo = "Ingrese un cupo válido.";
        if (!formData.duracion.trim()) newErrors.duracion = "La duración es obligatoria.";
        if (formData.actividades.length === 0) newErrors.actividades = "Las actividades son obligatorias.";
        if (!formData.tipoTour) newErrors.tipoTour = "El tipo de tour es obligatorio.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Datos enviados:", formData);
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value, selectedOptions } = e.target;

        if (name === "actividades") {
            const selectedActivities = Array.from(selectedOptions).map((option) => option.value);
            setFormData({ ...formData, actividades: selectedActivities });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center p-4">
            <div className="bg-[#E3E3E3] p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>

                <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Crear Tour</h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Primera fila: Imagen y Nombre */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">
                                Imagen:
                            </label>
                            <input
                                className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361] transition-all ${
                                    errors.imagen ? "border-red-500" : "border-gray-300"
                                }`}
                                type="text"
                                name="imagen"
                                value={formData.imagen}
                                onChange={handleChange}
                            />
                            {errors.imagen && <p className="text-red-500 text-sm mt-1">{errors.imagen}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">
                                Nombre:
                            </label>
                            <input
                                className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361] transition-all ${
                                    errors.nombre ? "border-red-500" : "border-gray-300"
                                }`}
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                        </div>
                    </div>

                    {/* Segunda fila: Descripción */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">
                            Descripción:
                        </label>
                        <textarea
                            className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361] transition-all ${
                                errors.descripcion ? "border-red-500" : "border-gray-300"
                            }`}
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                        />
                        {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
                    </div>

                    {/* Tercera fila: Precio, Cupo, Duración */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">
                                Precio:
                            </label>
                            <input
                                className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361] transition-all ${
                                    errors.precio ? "border-red-500" : "border-gray-300"
                                }`}
                                type="text"
                                name="precio"
                                value={formData.precio}
                                onChange={handleChange}
                            />
                            {errors.precio && <p className="text-red-500 text-sm mt-1">{errors.precio}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">
                                Cupo:
                            </label>
                            <input
                                className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361] transition-all ${
                                    errors.cupo ? "border-red-500" : "border-gray-300"
                                }`}
                                type="text"
                                name="cupo"
                                value={formData.cupo}
                                onChange={handleChange}
                            />
                            {errors.cupo && <p className="text-red-500 text-sm mt-1">{errors.cupo}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">
                                Duración:
                            </label>
                            <input
                                className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361] transition-all ${
                                    errors.duracion ? "border-red-500" : "border-gray-300"
                                }`}
                                type="text"
                                name="duracion"
                                value={formData.duracion}
                                onChange={handleChange}
                            />
                            {errors.duracion && <p className="text-red-500 text-sm mt-1">{errors.duracion}</p>}
                        </div>
                    </div>

                    {/* Fila de Tipo de Tour */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">
                            Tipo de Tour:
                        </label>
                        <select
                            className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361] transition-all ${
                                errors.tipoTour ? "border-red-500" : "border-gray-300"
                            }`}
                            name="tipoTour"
                            value={formData.tipoTour}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona un tipo de tour</option>
                            {tourTypes.map((tourType) => (
                                <option key={tourType.id} value={tourType.id}>
                                    {tourType.name}
                                </option>
                            ))}
                        </select>
                        {errors.tipoTour && <p className="text-red-500 text-sm mt-1">{errors.tipoTour}</p>}
                    </div>

                    {/* Actividades */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">
                            Actividades:
                        </label>
                        <select
                            name="actividades"
                            multiple
                            className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361] transition-all ${
                                errors.actividades ? "border-red-500" : "border-gray-300"
                            }`}
                            value={formData.actividades}
                            onChange={handleChange}
                            size={3} // Show 3 items by default
                        >
                            {activities.map((activity) => (
                                <option key={activity.id} value={activity.id}>
                                    {activity.name}
                                </option>
                            ))}
                        </select>
                        {errors.actividades && <p className="text-red-500 text-sm mt-1">{errors.actividades}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-4 bg-[#6C8361] text-white py-2 rounded-full hover:bg-[#4E704A] transition-colors"
                    >
                        Crear Tour
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalCrearTour;