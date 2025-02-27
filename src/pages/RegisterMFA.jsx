import "./../styles/PrivatePasswordForm.css";
import { useNavigate } from "react-router-dom";
import { FaKey, FaUser } from "react-icons/fa";
import { useState } from "react";
import { registerUser } from "./../services/UserService";
import {
  validateEmail,
  validatePassword,
  validateSecurityAnswer,
  sanitizeInput,
} from "../validations";

export default function RegisterMFA() {
  const navigate = useNavigate();
  const [mfaData, setMfaData] = useState({
    secret_question: "",
    secret_answer: "",
  });
  const [confirmAnswer, setConfirmAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMfaData((prevData) => ({
      ...prevData,
      [name]: sanitizeInput(value),
    }));
  };

  const handleConfirmChange = (e) => {
    setConfirmAnswer(sanitizeInput(e.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateSecurityAnswer(mfaData.secret_answer)) {
      setErrorMessage("La respuesta de seguridad no es válida.");
      return;
    }

    if (mfaData.secret_answer !== confirmAnswer) {
      setErrorMessage("Las respuestas de seguridad no coinciden.");
      return;
    }

    const registerData = JSON.parse(sessionStorage.getItem("registerData"));

    if (!validateEmail(registerData.email)) {
      setErrorMessage("El correo electrónico no es válido.");
      return;
    }

    if (!validatePassword(registerData.password)) {
      setErrorMessage("La contraseña no cumple con los requisitos de seguridad.");
      return;
    }

    const userData = {
      user: {
        ...registerData,
        password_confirmation: registerData.password,
        secret_question: sanitizeInput(mfaData.secret_question),
        secret_answer: sanitizeInput(mfaData.secret_answer),
        role: 1,
        status: 1,
      },
    };

    const response = await registerUser(userData);

    if (response) {
      sessionStorage.removeItem("registerData");
      navigate("/login");
    } else {
      setErrorMessage("Error al registrar el usuario. Inténtalo de nuevo.");
    }
  };

  return (
    <div id="Body">
      <div className="wrapper">
        <form action="" onSubmit={handleSubmit}>
          <h1>Crea tu Pregunta de Seguridad</h1>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="relative flex flex-col gap-2">
            <label className="text-sm font-medium text-[#333333]">
              <div className="relative">
                <select
                  name="secret_question"
                  value={mfaData.secret_question}
                  onChange={handleChange}
                  required
                  className="w-full mt-7 pt-3 pb-3 px-4 py-2 pr-10 border-3 border-white rounded-full bg-transparent text-[#333333] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 truncate"
                >
                  <option value="">Seleccione una pregunta...</option>
                  <option value="¿Cuál fue el nombre de tu primera mascota?">
                    ¿Cuál fue el nombre de tu primera mascota?
                  </option>
                  <option value="¿En qué ciudad nació tu madre?">
                    ¿En qué ciudad nació tu madre?
                  </option>
                  <option value="¿Cómo se llamaba tu profesor/a favorito/a en la escuela primaria?">
                    ¿Cómo se llamaba tu profesor/a favorito/a en la escuela primaria?
                  </option>
                  <option value="¿Cuál es el segundo nombre de tu padre?">
                    ¿Cuál es el segundo nombre de tu padre?
                  </option>
                  <option value="¿Cuál es el nombre del primer videojuego que jugaste?">
                    ¿Cuál es el nombre del primer videojuego que jugaste?
                  </option>
                </select>
                <FaUser className="mt-3 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
              </div>
            </label>
          </div>

          <div className="input-box input-box-3">
            <label>
              Escribe tu respuesta:
              <input
                type="password"
                placeholder="Ejemplo: OREO"
                name="secret_answer"
                value={mfaData.secret_answer}
                onChange={handleChange}
                required
              />
            </label>
            <FaKey className="icon icon-3" />
          </div>

          <div className="input-box input-box-3">
            <label>
              Repite tu respuesta:
              <input
                type="password"
                placeholder="Repite..."
                value={confirmAnswer}
                onChange={handleConfirmChange}
                required
              />
            </label>
            <FaKey className="icon icon-3" />
          </div>
          <br />

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}
