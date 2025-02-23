import './../styles/PrivatePasswordForm.css';
import { useNavigate } from "react-router-dom";
import { FaKey, FaUser } from "react-icons/fa";
import { useState } from "react";
import { registerUser } from "./../services/UserService";
import { validateEmail, validatePassword, validateSecurityAnswer, sanitizeInput } from "../validations";

export default function RegisterMFA() {
    const navigate = useNavigate();
    const [mfaData, setMfaData] = useState({
        secret_question: "",
        secret_answer: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMfaData((prevData) => ({
            ...prevData,
            [name]: sanitizeInput(value),
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        if (!validateSecurityAnswer(mfaData.secret_answer)) {
            alert("La respuesta de seguridad no es válida.");
            return;
        }

        const registerData = JSON.parse(sessionStorage.getItem("registerData"));

        if (!validateEmail(registerData.email)) {
            alert("El correo electrónico no es válido.");
            return;
        }

        if (!validatePassword(registerData.password)) {
            alert("La contraseña no cumple con los requisitos de seguridad.");
            return;
        }

        // Combina los datos del registro y MFA
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
            alert("Error al registrar el usuario. Inténtalo de nuevo.");
        }
    };

    return (
        <div id='Body'>
            <div className='wrapper'>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Crea tu Pregunta de Seguridad</h1>
                    <div className="input-box input-box-3">
                        <label>
                            Escribe tu pregunta:
                            <input
                                type="text"
                                placeholder='Ejemplo: ¿Mis galletas favoritas?'
                                name="secret_question"
                                value={mfaData.secret_question}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <FaUser className='icon icon-3' />
                    </div>

                    <div className="input-box input-box-3">
                        <label>
                            Escribe tu respuesta:
                            <input
                                type="password"
                                placeholder='Ejemplo: OREO'
                                name="secret_answer"
                                value={mfaData.secret_answer}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <FaKey className='icon icon-3' />
                    </div>

                    <div className="input-box input-box-3">
                        <label>
                            Repite tu respuesta:
                            <input
                                type="password"
                                placeholder='Repite...'
                                required
                            />
                        </label>
                        <FaKey className='icon icon-3' />
                    </div><br />

                    <button type='submit'>Enviar</button>
                </form>
            </div>
        </div>
    );
}
