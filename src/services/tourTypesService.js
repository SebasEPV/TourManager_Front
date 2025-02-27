const API_BASE_URL = "http://localhost:3000/tour_types";

/**
 * @param {string} endpoint - Ruta del API
 * @param {string} method - Método HTTP
 * @param {Object} [body] - Datos opcionales para enviar en la petición.
 * @returns {Promise<Object|null>} - Respuesta de la API o `null`
 */
const apiRequest = async (endpoint, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    return await response.json();
  } catch (error) {
    console.error("Error en la API:", error);
    return null;
  }
};

// Obtener todos los tipos de tour
export const getTourTypes = () => apiRequest("/");

// Obtener un tipo de tour por ID
export const getTourTypeById = (id) => apiRequest(`/${id}`);

// Crear un nuevo tipo de tour
export const createTourType = (tourType) => apiRequest("/", "POST", tourType);

// Actualizar un tipo de tour por ID
export const updateTourType = (id, tourType) => apiRequest(`/${id}`, "PATCH", tourType);

// Eliminar un tipo de tour por ID
export const deleteTourType = (id) => apiRequest(`/${id}`, "DELETE");
