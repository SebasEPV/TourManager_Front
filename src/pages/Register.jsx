import './../styles/RegisterForm.css';
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useState } from "react";
import { validateEmail, validatePassword, sanitizeInput } from "../validations";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: sanitizeInput(value),
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        setError("");

        if (!validateEmail(formData.email)) {
            setError("Correo electrónico no válido.");
            return;
        }

        if (!validatePassword(formData.password)) {
            setError("La contraseña debe tener al menos 8 caracteres, tener una mayuscula, minuscula, un numero y un caracter especial.");
            return;
        }

        sessionStorage.setItem("registerData", JSON.stringify(formData));
        navigate("/register-mfa"); 
    };

    return (
        <div id='Body'>
            <div className='wrapper'>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Registrarse</h1>
                    {error && (
                        <div role="alert" className="error-message">
                            {error}
                        </div>
                    )}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Nombre'
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <FaUser className='icon' />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Apellido'
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                        <FaUser className='icon' />
                    </div>

                    <div className="input-box">
                        <input
                            type="email"
                            placeholder='Correo Electrónico'
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <MdAlternateEmail className='icon' />
                    </div>

                    <div className="input-box flex-box">
                        <input
                            type="password"
                            placeholder='Contraseña'
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <a href="#" onClick={() => navigate("/login")}>¿Ya tienes una cuenta?</a>
                    </div>

                    <button type='submit'>Registrarse</button>
                </form>
            </div>
        </div>
    );
}
