import './../styles/PrivatePasswordForm.css';
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import { verifySecurityAnswer } from "./../services/UserService";
import Cookies from 'js-cookie';

export default function RegisterMFA() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Verifica si vienen datos desde el login
    const securityQuestion = location.state?.securityQuestion;
    const userId = location.state?.userId;
    
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState("");

    // Si el usuario intenta acceder sin datos, lo redirige al login
    useEffect(() => {
        if (!securityQuestion || !userId) {
            navigate("/login");
        }
    }, [securityQuestion, userId, navigate]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!answer.trim()) {
            setError("La respuesta no puede estar vacía.");
            return;
        }

        const response = await verifySecurityAnswer(userId, answer);

        // Imprime la respuesta en la consola para depurar
        console.log("Respuesta del servidor:", response);

        if (response.status === 'AUTHORIZED') {
            // Guardar el token en cookies o local storage
            Cookies.set('auth_token', response.token, { expires: 1 }); // Expira en 1 día
            Cookies.set('user_role', response.user.role, { expires: 1 });

            // Redirigir según el rol del usuario
            const role = response.user.role;
            if (role === 1) {
                navigate("/"); // Página principal para rol 1
            } else if (role === 2) {
                navigate("/dashboard"); // Página de dashboard para rol 2
            } else if (role === 3) {
                navigate("/payments/manage"); // Página de gestión de pagos para rol 3
            }
        } else {
            setError("Respuesta incorrecta. Intenta de nuevo.");
        }
    };

    return (
        <div id='Body'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Verificación de Seguridad</h1>
                    <div className="question-box">
                        <p>{securityQuestion}</p>
                    </div>

                    <div className="input-box">
                        <label>Tu respuesta:
                            <input 
                                type="password" 
                                placeholder="Ingresa tu respuesta"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                required 
                            />
                        </label>
                        <FaKey className='icon' />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type='submit'>Enviar</button>
                </form>
            </div>
        </div>
    );
}
