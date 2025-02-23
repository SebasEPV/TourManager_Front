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
      credentials: "include",
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

// Crear un usuario
export const registerUser = (userData) => apiRequest("/users/", "POST", userData);

// Iniciar sesión
export const loginUser = (email, password) => apiRequest("/users/sign_in", "POST", { email, password });

// Verificar la respuesta de seguridad 
export const verifySecurityAnswer = (userId, securityAnswer) => apiRequest("/verify_security_answer", "POST", { user_id: userId, security_answer: securityAnswer });

// Obtener datos de la sesión actual
export const getSessionData = () => apiRequest("/session_data", "GET");

// Cerrar sesión
// Eliminar el token de las cookies y redirigir al usuario
export const sign_out = async () => {
  try {
    const response = await apiRequest("/users/sign_out", "DELETE");

    if (response) {
      // Elimina el token de las cookies
      Cookies.remove("auth_token");
      // Redirige al usuario a la página de inicio de sesión
      window.location.href = "/login"; // O usa navigate() si lo prefieres
    }
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
