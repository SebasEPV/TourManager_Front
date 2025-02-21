const API_BASE_URL = "http://localhost:3000/activities";

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

// Obtener todas las actividades
export const getActivities = () => apiRequest("/");

// Obtener una actividad por ID
export const getActivityById = (id) => apiRequest(`/${id}`);

// Crear una nueva actividad
export const createActivity = (activity) => apiRequest("/", "POST", activity);

// Actualizar una actividad por ID
export const updateActivity = (id, activity) => apiRequest(`/${id}`, "PATCH", activity);

// Eliminar una actividad por ID
export const deleteActivity = (id) => apiRequest(`/${id}`, "DELETE");
