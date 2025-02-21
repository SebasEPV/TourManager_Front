import './../styles/RegisterForm.css';
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        const form = event.target; // Obtiene el formulario
        if (form.checkValidity()) {
            navigate("/CreatePrivatePassword"); // Navega solo si el formulario es válido
        } else {
            form.reportValidity(); // Muestra los mensajes de validación de HTML5
        }
    };

    return (
        <div id='Body'>
            <div className='wrapper'>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Registrarse</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Nombre' required />
                        <FaUser className='icon' />
                    </div>

                    <div className="input-box">
                        <input type="text" placeholder='Apellido' required />
                        <FaUser className='icon' />
                    </div>

                    <div className="input-box">
                        <input type="email" placeholder='Correo Electrónico' required />
                        <MdAlternateEmail className='icon' />
                    </div>

                        <div className="input-box flex-box">
                            <input type="password" placeholder='Contraseña' required />
                            <FaLock className='icon' />
                        </div>

                        {/* <div className="input-box flex-box">
                            <input type="password" placeholder='Repite tu Contraseña' required />
                            <FaLock className='icon' />
                        </div> */}
                    {/* PREGUNTA DE SEGURIDAD */}

                    {/* <div className="input-box">
                        <input type="password" placeholder='Escribe tu pregunta...' required />
                        <FaKey className='icon' />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder='Escribe tu respuesta...' required />
                        <FaKey className='icon' />
                    </div> */}

                    {/* <div className='option-box'>
                        <p hidden>Elige tu Rol:</p>
                        <select name="" id="" className='option-container' hidden>
                            <option value="cliente">Cliente</option>
                            <option value="administrador">Adminstrador</option>
                        </select>
                    </div> */}

                    <div className="remember-forgot">
                        {/* <label><input type="checkbox" />Mantener Sesión</label> */}
                        <a href="#" onClick={() => navigate("/login")}>¿Ya tienes una cuenta?</a>
                    </div>

                    <button type='submit' >Registrarse</button>

                    {/* <div className="register-link">
                        <p>¿No tienes una cuenta aún? <a href="#">Registrate</a></p>
                    </div> */}

                </form>
            </div>
        </div>
    )
}