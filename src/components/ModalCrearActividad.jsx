import { useState, useEffect } from "react";
import { X } from "lucide-react";

// URL de la API
const API_BASE_URL = "http://localhost:3000/activity_types";

// Función para obtener los tipos de actividad desde la API
const getActivityTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok)
      throw new Error("Error al obtener los tipos de actividad");
    return await response.json();
  } catch (error) {
    console.error("Error en la API:", error);
    return [];
  }
};

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
  const [activityTypes, setActivityTypes] = useState([]);

  useEffect(() => {
    // Cargar los tipos de actividad al montar el componente
    const fetchActivityTypes = async () => {
      const types = await getActivityTypes();
      setActivityTypes(types);
    };

    fetchActivityTypes();
  }, []);

  const validate = () => {
    let newErrors = {};
    if (!formData.imagen.trim()) newErrors.imagen = "Imagen requerida.";
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria.";
    if (!formData.precio.trim() || isNaN(formData.precio))
      newErrors.precio = "Ingrese un precio válido.";
    if (!formData.cupo.trim() || isNaN(formData.cupo))
      newErrors.cupo = "Ingrese un cupo válido.";
    if (!formData.duracion.trim())
      newErrors.duracion = "La duración es obligatoria.";
    if (!formData.actividad.trim())
      newErrors.actividad = "Seleccione una actividad.";

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar el tipo de archivo
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          imagen: "Formato de archivo no válido. Use .jpg, .jpeg o .png.",
        });
        return;
      }

      // Leer el archivo y simular guardarlo en la carpeta 'public'
      const reader = new FileReader();
      reader.onload = (event) => {
        const filePath = `/uploads/${file.name}`; // Ruta donde se guardará el archivo
        setFormData({ ...formData, imagen: filePath });

        // Simular que el archivo se guardó localmente
        console.log("Archivo guardado localmente en:", filePath);
      };
      reader.readAsDataURL(file);
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

        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          Crear Actividad
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Imagen y Nombre */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">
                Imagen:
              </label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361] transition-all ${
                  errors.imagen ? "border-red-500" : "border-gray-300"
                }`}
                onChange={handleFileChange}
              />
              {errors.imagen && (
                <p className="text-red-500 text-sm mt-1">{errors.imagen}</p>
              )}
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
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>
          </div>

          {/* Descripción */}
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
            {errors.descripcion && (
              <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>
            )}
          </div>

          {/* Precio, Cupo, Duración */}
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
              {errors.precio && (
                <p className="text-red-500 text-sm mt-1">{errors.precio}</p>
              )}
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
              {errors.cupo && (
                <p className="text-red-500 text-sm mt-1">{errors.cupo}</p>
              )}
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
              {errors.duracion && (
                <p className="text-red-500 text-sm mt-1">{errors.duracion}</p>
              )}
            </div>
          </div>

          {/* Select de actividad */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold bg-[#6C8361] text-white px-3 py-1 rounded">
              Actividad:
            </label>
            <select
              className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#6C8361] transition-all ${
                errors.actividad ? "border-red-500" : "border-gray-300"
              }`}
              name="actividad"
              value={formData.actividad}
              onChange={handleChange}
            >
              <option value="">Seleccione una actividad</option>
              {activityTypes.map((activity) => (
                <option key={activity.id} value={activity.id}
                >
                  {activity.name}
                </option>
              ))}
            </select>
            {errors.actividad && (
              <p className="text-red-500 text-sm mt-1">{errors.actividad}</p>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-[#6C8361] text-white px-6 py-3 rounded-xl hover:bg-[#4f6a49] transition-all duration-300"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearActividad;
