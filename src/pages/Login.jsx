"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaLock, FaSpinner } from "react-icons/fa"
import { MdAlternateEmail } from "react-icons/md"
import { loginUser, sign_out } from "./../services/UserService"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const forceLogout = async () => {
      try {
        await sign_out()
      } catch (err) {
        console.error("Error during logout:", err)
      }
    }
    forceLogout()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await loginUser(email, password)

      if (response?.status === "PENDING_AUTHORIZATION") {
        navigate("/mfa", {
          state: {
            securityQuestion: response.security_question,
            userId: response.user_id,
          },
        })
      } else if (response?.status === "SUCCESS") {
        navigate("/dashboard")
      } else {
        setError("Credenciales incorrectas.")
      }
    } catch (err) {
      // Parse the error response
      try {
        const errorData = await err.response?.json()
        if (errorData?.error) {
          // Map API error messages to user-friendly Spanish messages
          const errorMessages = {
            "Invalid email or password": "El correo electrónico o la contraseña son incorrectos.",
            "User not found": "Usuario no encontrado.",
            "Account locked": "Cuenta bloqueada. Por favor contacta a soporte.",
          }
          setError(errorMessages[errorData.error] || "Ha ocurrido un error. Por favor intenta de nuevo.")
        } else if (err.response?.status === 401) {
          setError("El correo electrónico o la contraseña son incorrectos.")
        } else if (err.response?.status === 429) {
          setError("Demasiados intentos. Por favor espera unos minutos antes de intentar nuevamente.")
        } else if (err.response?.status >= 500) {
          setError("Error del servidor. Por favor intenta más tarde.")
        } else {
          setError("Ha ocurrido un error. Por favor verifica tu conexión e intenta de nuevo.")
        }
      } catch {
        setError("Ha ocurrido un error. Por favor intenta de nuevo.")
      }

      // Log the error for debugging
      console.error("Error during login:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div id="Body">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Inicio de Sesión</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="disabled:opacity-70"
            />
            <MdAlternateEmail className="icon" />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="disabled:opacity-70"
            />
            <FaLock className="icon" />
          </div>

          {error && (
            <div
              role="alert"
              className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 
                       rounded-lg text-sm font-medium text-center
                       animate-in fade-in slide-in-from-top-1 duration-200 mb-1"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="relative flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Iniciando...
              </>
            ) : (
              "Iniciar"
            )}
          </button>

          <div className="register-link">
            <p>
              ¿No tienes una cuenta aún?{" "}
              <a href="#" onClick={() => navigate("/Register")}>
                Regístrate
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

