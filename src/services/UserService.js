const API_BASE_URL = "http://localhost:3000";

/**
 * @param {Object} userData - Datos del usuario
 * @param {String} method - Método HTTP
 * @returns {Promise<Object|null>} - Respuesta de la API o `null`
 */
const apiRequest = async (endpoint, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials : "include",
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    if (response.status === 204) {
      return null;
    }

    // Parse JSON for other responses
    return await response.json();
  } catch (error) {
    console.error("Error en la API:", error);
    return null;
  }
};

// Crear un usuario
export const registerUser = (userData) =>
  apiRequest("/users/", "POST", userData);

// Iniciar sesión
export const loginUser = (email, password) =>
  apiRequest("/users/sign_in", "POST", { email, password });

// Verificar la respuesta de seguridad
export const verifySecurityAnswer = (userId, securityAnswer) =>
  apiRequest("/verify_security_answer", "POST", {
    user_id: userId,
    security_answer: securityAnswer,
  });

// Obtener datos de la sesión actual
export const getSessionData = () => apiRequest("/session_data", "GET");

// Cerrar sesión
export const sign_out = async () => {
  try {
    const response = await fetch("http://localhost:3000/users/sign_out", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) throw new Error("Error en la solicitud de cierre de sesión");

    console.log("Signed out successfully.");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
