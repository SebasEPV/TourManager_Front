"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FaKey, FaSpinner } from "react-icons/fa"
import { verifySecurityAnswer } from "./../services/UserService"
import { validateSecurityAnswer, sanitizeInput } from "../validations"
import Cookies from "js-cookie"
import  "./../styles/LoginForm.css"

export default function RegisterMFA() {
  const navigate = useNavigate()
  const location = useLocation()

  const securityQuestion = location.state?.securityQuestion
  const userId = location.state?.userId

  const [answer, setAnswer] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [validationError, setValidationError] = useState("")

  useEffect(() => {
    if (!securityQuestion || !userId) {
      navigate("/login")
    }
  }, [securityQuestion, userId, navigate])

  const validateForm = () => {
    if (!validateSecurityAnswer(answer)) {
      setValidationError("La respuesta no puede contener caracteres especiales")
      return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setValidationError("");
  
    if (!validateForm()) {
      return;
    }
  
    setIsLoading(true);
  
    try {
      const sanitizedAnswer = sanitizeInput(answer);
      const response = await verifySecurityAnswer(userId, sanitizedAnswer);
  
      console.log("Response from verifySecurityAnswer:", response); // Log the response
  
      if (response?.status === "AUTHORIZED") {
        Cookies.set("auth_token", response.token, { expires: 1 });
        Cookies.set("user_role", response.user.role, { expires: 1 });
  
        const roleRedirects = {
          1: "/",
          2: "/dashboard",
          3: "/payments/manage",
        };
  
        const redirectPath = roleRedirects[response.user.role] || "/";
        console.log("Redirecting to:", redirectPath); // Log the redirect path
        navigate(redirectPath);
      } else {
        setError("La respuesta de seguridad es incorrecta. Por favor intenta de nuevo.");
      }
    } catch (err) {
      console.error("Error during verification:", err);
      setError("Ha ocurrido un error. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('./bg1.jpg')] bg-cover bg-center bg-no-repeat p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border-4 border-black/90 rounded-xl p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Verificación de Seguridad</h1>
            <p className="text-sm text-gray-600">Por favor responde tu pregunta de seguridad</p>
          </div>

          <div className="bg-black/5 rounded-lg p-4 border border-black/10">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Tu pregunta de seguridad:</h2>
            <p className="text-gray-800 font-medium">{securityQuestion}</p>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tu respuesta:</label>
            <div className="relative">
              <input
                type="password"
                className={`w-full px-4 py-3 rounded-full border-2 
                          ${validationError ? "border-red-400" : "border-black/20"}
                          bg-transparent outline-none text-gray-800 
                          focus:border-black/40 transition-colors
                          placeholder:text-gray-500`}
                placeholder="Ingresa tu respuesta"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value)
                  if (validationError) setValidationError("")
                }}
                required
                disabled={isLoading}
              />
              <FaKey className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>
            {validationError && <div className="error-message">{validationError}</div>}
          </div>

          {error && (
            <div role="alert" className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-50 active:bg-gray-100
                     text-gray-800 font-semibold py-3 px-6 rounded-full
                     border border-black/10 shadow-sm transition-colors
                     focus:outline-none focus:ring-2 focus:ring-black/20
                     disabled:opacity-70 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Verificando...
              </>
            ) : (
              "Verificar"
            )}
          </button>

          <p className="text-center text-sm text-gray-600">
            ¿Problemas para acceder?{" "}
            <a href="#" onClick={() => navigate("/login")} className="font-semibold text-gray-800 hover:underline">
              Volver al inicio
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

