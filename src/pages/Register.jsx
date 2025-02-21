import './../styles/RegisterForm.css';
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useState } from "react";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 

        const form = event.target; 
        if (form.checkValidity()) {
            sessionStorage.setItem("registerData", JSON.stringify(formData));
            navigate("/register-mfa"); 
        } else {
            form.reportValidity(); 
        }
    };

    return (
        <div id='Body'>
            <div className='wrapper'>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Registrarse</h1>
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