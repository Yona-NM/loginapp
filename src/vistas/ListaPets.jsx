import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app, auth } from "../firebase.config";
import Header from "./Header";
import "./ListaPets.css";
import DeleteButton from "../botones/DeleteButton";
import EditForm from "./EditForm";
import QRCode from "qrcode.react";

const db = getFirestore(app);

function ListaPets() {
  const [mascotas, setMascotas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [qrVisible, setQRVisible] = useState(false);
  const [qrMascotaId, setQRMascotaId] = useState(null);

  const fetchMascotas = async () => {
    try {
      // Obtener el ID del usuario actual
      const currentUser = auth.currentUser;
      const userId = currentUser.uid;

      // Crear la consulta para obtener las mascotas del usuario actual
      const mascotasCollection = collection(db, "mascotas");
      const mascotasQuery = query(mascotasCollection, where("userId", "==", userId));
      const mascotasSnapshot = await getDocs(mascotasQuery);

      // Obtener los datos de las mascotas y actualizar el estado
      const mascotasData = mascotasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMascotas(mascotasData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMascotas();
  }, []);

  const handleShareQR = (id) => {
    setQRVisible(true);
    setQRMascotaId(id);
  };


  const handleEdit = (id) => {
    setEditingId(id);
  };

  const updateMascotas = () => {
    fetchMascotas();
  };

  return (
    <div>
      <Header />
      <div className="ListaPets-container">
        <h1>MIS MASCOTAS</h1>
        {mascotas.length === 0 && <p>No tienes mascotas para Mostrar.</p>}
        <ul>
          {mascotas.map((mascota) => (
            <li key={mascota.id}>
              <h3 style={{ textAlign: 'center', fontStyle: 'Channel' }}>{mascota.nombre}</h3>
              <img src={mascota.fotoURL} alt={mascota.nombre} style={{ maxWidth: '100%', height: 'auto', border: '2px solid black', borderRadius: '15px', }} />
              <p>Edad: {mascota.edad}</p>
              <p>Raza: {mascota.raza}</p>
              <p>Mi tutor: {mascota.tutor}</p>
              <p>Teléfono de contacto: {mascota.telefono}</p>
              <div className="qr-container">
              {qrVisible && qrMascotaId === mascota.id && (
                <QRCode value={mascota.id} /> /* Mostrar el código QR solo si qrVisible es true y el ID de la mascota coincide */
              )}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                  <DeleteButton id={mascota.id} updateMascotas={updateMascotas} />
                  <button className="ListaPets-editarButton" onClick={() => handleEdit(mascota.id)}>Editar</button>
                  <button className="ListaPets-compartirButton" onClick={() => handleShareQR(mascota.id)}>Generar QR</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {editingId && (
          <div>
            <h2>Editar Mascota</h2>
            <EditForm id={editingId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaPets;











