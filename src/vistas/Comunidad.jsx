import React from 'react';
import { Link } from 'react-router-dom';
import { BsExclamationCircle, BsHeart } from 'react-icons/bs';
import Header from './Header';
import "./Comunidad.css";

function Comunidad() {
  return (
    <div>
      <Header />
      <div className="ComunidadPets-container">
      <h1>Comunidad Ayuda</h1>
      <div className="iconos-container">
        <Link to="/reportes" className="icono-link">
          <BsExclamationCircle className="icono" size={150} />
          <span className="icono-texto">Reportes de mascotas extraviadas</span>
        </Link>
        <p>En esta pagina puedes publicar un reporte de tu mascota, permitiendo  que todos los usuarios que vean la publicación ayuden en la búsqueda de tu mascota </p>
        <Link to="/adopta" className="icono-link">
          <BsHeart className="icono" size={150} />
          <span className="icono-texto">Adopción de mascotas</span>
        </Link>
        <p>En esta pagina se promueve la adopción responsable, ayudando y facilitando la adopción la adopción responsable </p>
      </div>
      </div>
    </div>
  );
}

export default Comunidad;


