import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./HomePage.css";

function HomePage() {
    const auth = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };


  return (
    <div>
      <Header/>
      <div className="HomePage-content">
        <h1>Mundo Fan Pets</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus dolores, quia ratione aut quibusdam tempore? Harum officiis magni neque molestiae autem obcaecati consequatur mollitia ut, vero accusantium aperiam eum? Sunt.</p>
        <li className="Cabecera-li">
            <button onClick={handleLogout}>Cerrar sesión</button>
            </li>
      </div>
      </div>
  )
}

export default HomePage