const API_BASE_URL = "http://localhost:3000/activity_types";

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

// Obtener todos los tipos de actividad
export const getActivityTypes = () => apiRequest("/");

// Obtener un tipo de actividad por ID
export const getActivityTypeById = (id) => apiRequest(`/${id}`);

// Crear un nuevo tipo de actividad
export const createActivityType = (activityType) => apiRequest("/", "POST", activityType);

// Actualizar un tipo de actividad por ID
export const updateActivityType = (id, activityType) => apiRequest(`/${id}`, "PATCH", activityType);

// Eliminar un tipo de actividad por ID
export const deleteActivityType = (id) => apiRequest(`/${id}`, "DELETE");
