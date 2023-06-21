import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistroPage from "./RegistroPage";
import LoginPage from "./LoginPage";
import HomePage from "./vistas/HomePage";
import RegistroPets from "./vistas/RegistroPets";
import ListaPets from "./vistas/ListaPets";
import EditForm from "./vistas/EditForm";
import Comunidad from "./vistas/Comunidad";
import Reporte from "./vistas/Reporte";
import Adopta from "./vistas/Adopta";
import FormReportes from "./Formularios/FormReportes";
import Ventas from "./vistas/Ventas";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/registropets" element={<RegistroPets />} />
        <Route path="/listapets" element={<ListaPets />} />
        <Route path="/edit/:id" element={<EditForm />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/reportes" element={<Reporte />} />
        <Route path="/adopta" element={<Adopta />} />
        <Route path="/crear-reporte" element={<FormReportes />} />
        <Route path="/ventas" element={<Ventas />} />
      </Routes>
    </Router>
  );
}

export default App;
