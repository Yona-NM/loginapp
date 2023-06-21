import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Cabecera.css";

function Header() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className="Cabecera">
        <h5>Bienvenido(a), {auth.user && auth.user.displayName}</h5> 
        <div className="Cabecera-acciones">
          <button onClick={toggleMenu} className="Cabecera-button" title="Abrir menú">
            <svg
              className="Cabecera-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </div>
        <nav className={`Cabecera-nav ${menuOpen ? "isActive" : ""}`}>
          <ul className="Cabecera-ul">
            <li className="Cabecera-li">
              <Link to="/home">Inicio</Link>
            </li>
            <li className="Cabecera-li">
              <Link to="/registropets">Registro</Link>
            </li>
            <li className="Cabecera-li">
              <Link to="/listapets">Mis Mascotas</Link>
            </li>
            <li className="Cabecera-li">
              <Link to="/comunidad">Comunidad</Link>
            </li>
            <li className="Cabecera-li">
              <Link to="/ventas">Ventas</Link>
            </li>
            <li className="Cabecera-li">
            <button onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </ul>
        </nav>
      </header>  
    </div>
  );
}

export default Header;




