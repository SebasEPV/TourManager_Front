import { useState } from "react";
import { X } from "lucide-react";

const ModalCrearActividad = ({ onClose }) => {
    const [formData, setFormData] = useState({
        imagen: "",
        nombre: "",
        descripcion: "",
        precio: "",
        cupo: "",
        duracion: "",
        actividad: "",
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        if (!formData.imagen.trim()) newErrors.imagen = "Imagen requerida.";
        if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
        if (!formData.descripcion.trim()) newErrors.descripcion = "La descripción es obligatoria.";
        if (!formData.precio.trim() || isNaN(formData.precio)) newErrors.precio = "Ingrese un precio válido.";
        if (!formData.cupo.trim() || isNaN(formData.cupo)) newErrors.cupo = "Ingrese un cupo válido.";
        if (!formData.duracion.trim()) newErrors.duracion = "La duración es obligatoria.";
        if (!formData.actividad.trim()) newErrors.actividad = "Ingrese una actividad.";

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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#E3E3E3] p-6 rounded-lg shadow-lg w-[320px] relative">
                <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
                    <X size={24} />
                </button>

                <h2 className="text-xl font-bold mb-4 text-center">Crear Actividad</h2>

                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="font-semibold bg-[#6C8361] text-white px-2 py-1 rounded">Imagen:</label>
                        <input className="border p-2 rounded" name="imagen" value={formData.imagen} onChange={handleChange} />
                        {errors.imagen && <p className="text-red-500 text-sm">{errors.imagen}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold bg-[#6C8361] text-white px-2 py-1 rounded">Nombre:</label>
                        <input className="border p-2 rounded" name="nombre" value={formData.nombre} onChange={handleChange} />
                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold bg-[#6C8361] text-white px-2 py-1 rounded">Descripción:</label>
                        <textarea className="border p-2 rounded" name="descripcion" value={formData.descripcion} onChange={handleChange} />
                        {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <label className="font-semibold bg-[#6C8361] text-white px-2 py-1 rounded">Precio:</label>
                            <input className="border p-2 rounded w-full" name="precio" value={formData.precio} onChange={handleChange} />
                            {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
                        </div>
                        <div>
                            <label className="font-semibold bg-[#6C8361] text-white px-2 py-1 rounded">Cupo:</label>
                            <input className="border p-2 rounded w-full" name="cupo" value={formData.cupo} onChange={handleChange} />
                            {errors.cupo && <p className="text-red-500 text-sm">{errors.cupo}</p>}
                        </div>
                        <div>
                            <label className="font-semibold bg-[#6C8361] text-white px-2 py-1 rounded">Duración:</label>
                            <input className="border p-2 rounded w-full" name="duracion" value={formData.duracion} onChange={handleChange} />
                            {errors.duracion && <p className="text-red-500 text-sm">{errors.duracion}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold bg-[#6C8361] text-white px-2 py-1 rounded">Actividad:</label>
                        <textarea className="border p-2 rounded" name="actividad" value={formData.actividad} onChange={handleChange} />
                        {errors.actividad && <p className="text-red-500 text-sm">{errors.actividad}</p>}
                    </div>

                    <button type="submit" className="bg-[#6C8361] text-white py-2 rounded-lg mt-2 w-full">
                        Crear
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalCrearActividad;
