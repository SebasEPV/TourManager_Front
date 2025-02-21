const API_BASE_URL = "http://localhost:3000/tours";

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

// Obtener todos los tours
export const getTours = () => apiRequest("/");

// Obtener un tour por ID
export const getTourById = (id) => apiRequest(`/${id}`);

// Crear un nuevo tour
export const createTour = (tour) => apiRequest("/", "POST", tour);

// Actualizar un tour por ID
export const updateTour = (id, tour) => apiRequest(`/${id}`, "PATCH", tour);

// Eliminar un tour por ID
export const deleteTour = (id) => apiRequest(`/${id}`, "DELETE");