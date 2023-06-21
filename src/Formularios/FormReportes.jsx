import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase.config';
import { Link } from 'react-router-dom';
import './FormReportes.css';

const db = getFirestore(app);
const storage = getStorage(app);

function FormReportes() {
  const [fotoMascota, setFotoMascota] = useState(null);
  const [nombreMascota, setNombreMascota] = useState('');
  const [motivo, setMotivo] = useState('');
  const [comentario, setComentario] = useState('');
  const [numeroTelefono, setNumeroTelefono] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Subir la imagen al almacenamiento de Firebase
      const storageRef = ref(storage, `mascotas/${fotoMascota.name}`);
      await uploadBytes(storageRef, fotoMascota);

      // Obtener la URL de descarga de la imagen subida
      const fotoMascotaURL = await getDownloadURL(storageRef);

      // Crear un objeto con los datos del formulario
      const nuevoReporte = {
        fotoMascota: fotoMascotaURL,
        nombreMascota: nombreMascota,
        motivo: motivo,
        comentario: comentario,
        numeroContacto: numeroTelefono,
      };

      // Guardar el nuevo reporte en Firebase Firestore
      await addDoc(collection(db, 'reportes'), nuevoReporte);

      console.log('Reporte guardado correctamente');

      // Limpiar los campos del formulario
      setFotoMascota(null);
      setNombreMascota('');
      setMotivo('');
      setComentario('');
      setNumeroTelefono('');
    } catch (error) {
      console.error('Error al guardar el reporte:', error);
    }
  };

  return (
    <div className="formReportes-container">
      <h1>Agregar Reporte</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fotoMascota" className="form-label">Fotografía de la mascota</label>
          <input type="file" className="form-control" id="fotoMascota" onChange={(e) => setFotoMascota(e.target.files[0])} />
        </div>
        <div className="form-group">
          <label htmlFor="nombreMascota" className="form-label">Nombre de la mascota</label>
          <input type="text" className="form-control" id="nombreMascota" value={nombreMascota} onChange={(e) => setNombreMascota(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="motivo" className="form-label">Motivo</label>
          <select className="form-control" id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)}>
            <option value="">Seleccione un motivo</option>
            <option value="perdida">Perdida</option>
            <option value="robo">Robo</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comentario" className="form-comentario-label">Comentario</label>
          <textarea className="form-control" id="comentario" value={comentario} onChange={(e) => setComentario(e.target.value)}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="numeroTelefono" className="form-label">Número de teléfono</label>
          <input type="text" className="form-control" id="numeroTelefono" value={numeroTelefono} onChange={(e) => setNumeroTelefono(e.target.value)} />
        </div>
        <p>Nota: al agregar una mascota en reportes, todos los usuarios que interactúen en comunidad verán la publicación realizada, así también no podrá volver editar la publicación</p>
        <button type="submit" className="btn btn-primary">Agregar</button>
        <div>
            <Link to="/reportes">Ir a reportes</Link>
          </div>
      </form>
    </div>
  );
}

export default FormReportes;



