import React, { useState } from "react";
import { useAuth } from "../src/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const auth = useAuth();
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (emailLogin.trim() === "" || passwordLogin.trim() === "") {
      setLoginError("Ingresa una dirección de correo electrónico y una contraseña válidas");
      return;
    }

    auth
      .login(emailLogin, passwordLogin)
      .then(() => {
        navigate("/home", { replace: true });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setLoginError("La dirección de correo electrónico no es válida.");
        } else {
          console.error(error);
        }
      });
  };

  const handleGoogle = (e) => {
    e.preventDefault();
    auth
      .loginWithGoogle()
      .then(() => {
        // Inicio de sesión exitoso me enviara a mi home 
        navigate("/home", { replace: true });
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          // La ventana emergente fue cerrada por el usuario, esto se mostrara solo por consola 
          console.log("Inicio de sesión cancelado por el usuario");
        } else {
          // Otro error ocurrió alguna accion realizada por el usuario
          console.error(error);
        }
      });
  };

  return (
    <div className="login-container">
      <h1>Login Fan Pets</h1>
      <div className="icon-UserLogin">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
</svg>
        </div>
      <form className="login-form">
        <input
          onChange={(e) => setEmailLogin(e.target.value)}
          type="email"
          placeholder="Correo electrónico"
        />
        <input
          onChange={(e) => setPasswordLogin(e.target.value)}
          type="password"
          placeholder="Contraseña"
        />
        <button onClick={handleLogin}>Iniciar sesión</button>
        <button onClick={handleGoogle} className="google-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
          </svg>
          Iniciar sesión con Google
        </button>
      </form>
      {loginError && <p className="error-message">{loginError}</p>}
      <p>
        ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default LoginPage;
