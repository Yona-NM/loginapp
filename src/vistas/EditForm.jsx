import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../firebase.config";
import "./EditForm.css";
import { Link } from "react-router-dom";


const db = getFirestore(app);

function EditForm({ id }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    raza: "",
    tutor: "",
    telefono: "",
  });

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const mascotaRef = doc(db, "mascotas", id);
        const mascotaSnapshot = await getDoc(mascotaRef);

        if (mascotaSnapshot.exists()) {
          setFormData(mascotaSnapshot.data());
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMascota();
  }, [id]);

  useEffect(() => {
    if (!editing) {
      setFormData({
        nombre: "",
        edad: "",
        raza: "",
        tutor: "",
        telefono: "",
      });
    }
  }, [editing]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const mascotaRef = doc(db, "mascotas", id);

      await updateDoc(mascotaRef, formData);

      console.log("Datos actualizados:", formData);
      setEditing(false);
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  return (
    <div>
      {editing ? (
        <div>
          <input
            type="text"
            name="nombre"
            value={formData.nombre || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="edad"
            value={formData.edad || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="raza"
            value={formData.raza || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="tutor"
            value={formData.tutor || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="telefono"
            value={formData.telefono || ""}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Guardar</button>
        </div>
      ) : (
        <div>
          <button onClick={handleEdit}>Editar</button>
          <Link to="/registropets" className="mis-mascotas-button">Actualizar</Link>
        </div>
      )}
    </div>
  );
}

export default EditForm;










