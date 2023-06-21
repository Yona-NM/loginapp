import React, { useState } from "react";
import { useAuth } from "../src/context/AuthContext";
import { Link } from "react-router-dom";
import "./RegistroPage.css";

function RegistroPage() {
  const auth = useAuth();
  const [emailRegistro, setEmailRegistro] = useState("");
  const [passwordRegistro, setPasswordRegistro] = useState("");
  const [registroError, setRegistroError] = useState("");

  const handleRegistro = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailRegistro)) {
      setRegistroError("Dirección de correo electrónico no válida");
      return;
    }

    auth
      .register(emailRegistro, passwordRegistro)
      .then(() => {
        window.alert("Registro exitoso");
      })
      .catch((error) => {
        console.error(error);
      });

    // Aquí  agrego la lógica adicional después del registro
  };

  return (
    <div>
      <h1>Registro</h1>
      <form>
        <div className="icon-registroUser">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="currentColor"
            className="bi bi-person-fill-add"
            viewBox="0 0 16 16"
          >
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
          </svg>
        </div>
        <input
          onChange={(e) => setEmailRegistro(e.target.value)}
          type="email"
          placeholder="Correo electrónico (ejemplo@ejemplo.com)"
        />
        <input
          onChange={(e) => setPasswordRegistro(e.target.value)}
          type="password"
        />
        <button onClick={handleRegistro}>Registrarse</button>
      </form>
      {registroError && <p>{registroError}</p>}
      <p>
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default RegistroPage;






