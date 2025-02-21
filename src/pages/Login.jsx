import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { loginUser, sign_out } from "./../services/UserService"; 

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const forceLogout = async () => {
            await sign_out();
        };
        forceLogout();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(""); // Clear any previous errors

        const response = await loginUser(email, password);

        if (response && response.status === "PENDING_AUTHORIZATION") {
            navigate("/mfa", { state: { securityQuestion: response.security_question, userId: response.user_id } });
        } else if (response) {
            navigate("/dashboard");
        } else {
            setError("Credenciales incorrectas.");
        }
    };

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
                        />
                        <FaLock className="icon" />
                    </div>

                    <button type="submit">Iniciar</button>

                    {error && <div className="error-message">{error}</div>}

                    <div className="register-link">
                        <p>¿No tienes una cuenta aún? <a href="#" onClick={() => navigate("/Register")}>Regístrate</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}