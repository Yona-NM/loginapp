import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase.config';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Reporte.css';

const db = getFirestore(app);

function Reporte() {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const reportesCollection = collection(db, 'reportes');
        const reportesSnapshot = await getDocs(reportesCollection);
        const reportesData = reportesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReportes(reportesData);
      } catch (error) {
        console.error('Error al obtener los reportes:', error);
      }
    };

    fetchReportes();
  }, []);

  return (
    <div>
      <Header />
    <div className="ReportesPets-container">
      <h1>Reportes</h1>
      <Link to="/crear-reporte">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-megaphone-fill" viewBox="0 0 16 16">
  <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-11zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25.222 25.222 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56V3.224zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009a68.14 68.14 0 0 1 .496.008 64 64 0 0 1 1.51.048zm1.39 1.081c.285.021.569.047.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a65.81 65.81 0 0 1 1.692.064c.327.017.65.037.966.06z"/>
</svg>
        Crear Reporte</Link>
      <ul>
        {reportes.map((reporte) => (
          <li key={reporte.id}>
            <img src={reporte.fotoMascota} alt="Foto de la mascota" />
            <p>Nombre: {reporte.nombreMascota}</p>
            <p>Motivo: {reporte.motivo}</p>
            <p>Comentario: {reporte.comentario}</p>
            <p>Numero de Telefono: {reporte.numeroContacto}</p>
          </li>
        ))}
      </ul>
      <div>
            <Link to="/comunidad"> volver</Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg>
          </div>
    </div>
    </div>
  );
}

export default Reporte;





