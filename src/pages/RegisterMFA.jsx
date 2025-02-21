import './../styles/PrivatePasswordForm.css';
import { useNavigate } from "react-router-dom";
import { FaKey, FaUser } from "react-icons/fa";

export default function RegisterMFA() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        const form = event.target; // Obtiene el formulario
        if (form.checkValidity()) {
            navigate("/"); // Navega solo si el formulario es válido
        } else {
            form.reportValidity(); // Muestra los mensajes de validación de HTML5
        }
    };

    return (
        <div id='Body'>
            <div className='wrapper'>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Crea tu Pregunta de Seguridad</h1>
                    <div className="input-box input-box-3">
                        <label>Escribe tu pregunta:<input type="text" placeholder='Ejemplo: ¿Mis galletas favoritas?' required /></label>
                        <FaUser className='icon icon-3' />
                    </div>

                    <div className="input-box input-box-3">
                    <label>Escribe tu respuesta:<input type="password" placeholder='Ejemplo: OREO' required /></label>
                        <FaKey className='icon icon-3' />
                    </div>

                    <div className="input-box input-box-3">
                    <label>Repite tu respuesta:<input type="password" placeholder='Repite...' required /></label>
                        <FaKey className='icon icon-3' />
                    </div><br />

                    <button type='submit'>Enviar</button>

                    {/* <div className="register-link">
                        <p>¿No tienes una cuenta aún? <a href="#">Registrate</a></p>
                    </div> */}

                </form>
            </div>
        </div>
    )
}