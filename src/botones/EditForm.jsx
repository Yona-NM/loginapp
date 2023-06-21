import React, { useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../firebase.config";

const db = getFirestore(app);

function EditForm({ id }) {
  const [nombreMascota, setNombreMascota] = useState("");

  const handleEdit = async () => {
    try {
      // Actualizar los datos en Firestore
      await updateDoc(doc(db, "mascotas", id), {
        nombre: nombreMascota,
      });
      console.log("Datos actualizados exitosamente");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={nombreMascota}
        onChange={(e) => setNombreMascota(e.target.value)}
      />
      <button onClick={handleEdit}>Guardar</button>
    </div>
  );
}

export default EditForm;
