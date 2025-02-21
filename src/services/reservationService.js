const API_BASE_URL = "http://localhost:3000/reservations";

/**
 * @param {string} endpoint - Ruta del API
 * @param {string} method - Método HTTP
 *  @param {Object} [body] - Datos opcionales para enviar en la petición.
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

// Obtener todas las reservaciones
export const getReservations = () => apiRequest("/");

// Obtener una reservación por ID
export const getReservationById = (id) => apiRequest(`/${id}`);

// Crear una nueva reservación
export const createReservation = (reservation) => apiRequest("/", "POST", reservation);

// Actualizar una reservación por ID
export const updateReservation = (id, reservation) => apiRequest(`/${id}`, "PATCH", reservation);

// Eliminar una reservación por ID
export const deleteReservation = (id) => apiRequest(`/${id}`, "DELETE");

// Cancelar una reservación
export const cancelReservation = (id) => apiRequest(`/${id}/cancel`, "PATCH");

// Marcar una reservación como pagada
export const markReservationPaid = (id) => apiRequest(`/${id}/mark_paid`, "PATCH");

// Obtener los tours más reservados
export const getMostReservedTours = () => apiRequest("/most_reserved_tours");

// Obtener las actividades más reservadas
export const getMostReservedActivities = () => apiRequest("/most_reserved_activities");

// Obtener ingresos mensuales
export const getMonthlyIncome = () => apiRequest("/monthly_income");

// Obtener porcentaje de cancelaciones
export const getCancelationPercentage = () => apiRequest("/cancelation_percentage");

// Obtener porcentaje de pagos pendientes
export const getPendingPaidPercentage = () => apiRequest("/pending_paid_percentage");

// Obtener porcentaje de pagos realizados
export const getPaidPercentage = () => apiRequest("/paid_percentage");