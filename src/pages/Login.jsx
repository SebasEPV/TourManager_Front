"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaLock, FaSpinner } from "react-icons/fa"
import { MdAlternateEmail } from "react-icons/md"
import { loginUser, sign_out } from "./../services/UserService"
import { validateEmail, sanitizeInput } from "../validations"
import  "./../styles/LoginForm.css"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    const forceLogout = async () => {
      try {
        await sign_out();
        navigate("/login", { replace: true });
      } catch (err) {
        console.error("Error during logout:", err);
      }
    };
    
    forceLogout()
  }, [])

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
    }
    let isValid = true

    if (!validateEmail(email)) {
      errors.email = "Por favor ingresa un correo electrónico válido"
      isValid = false
    }

    setValidationErrors(errors)
    return isValid
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setValidationErrors({ email: "", password: "" })

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const sanitizedEmail = sanitizeInput(email)
      const sanitizedPassword = sanitizeInput(password)

      const response = await loginUser(sanitizedEmail, sanitizedPassword)

      if (response?.status === "PENDING_AUTHORIZATION") {
        navigate("/mfa", {
          state: {
            securityQuestion: response.security_question,
            userId: response.user_id,
          },
        })
      } else {
        setError("Credenciales incorrectas.")
      }
    } catch (err) {
      try {
        const errorData = await err.response?.json()
        if (errorData?.error) {
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
              onChange={(e) => {
                setEmail(e.target.value)
                if (validationErrors.email) {
                  setValidationErrors((prev) => ({ ...prev, email: "" }))
                }
              }}
              required
              disabled={isLoading}
              className={`disabled:opacity-70 ${validationErrors.email ? "border-red-400" : ""}`}
            />
            <MdAlternateEmail className="icon" />
            {validationErrors.email && <div className="validation-error">{validationErrors.email}</div>}
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (validationErrors.password) {
                  setValidationErrors((prev) => ({ ...prev, password: "" }))
                }
              }}
              required
              disabled={isLoading}
              className={`disabled:opacity-70 ${validationErrors.password ? "border-red-400" : ""}`}
            />
            <FaLock className="icon" />
            {validationErrors.password && <div className="validation-error">{validationErrors.password}</div>}
          </div>

          {error && (
            <div role="alert" className="error-message">
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

