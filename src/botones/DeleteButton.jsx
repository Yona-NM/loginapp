import React, { useState } from "react";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { app } from "../firebase.config";

const db = getFirestore(app);

function DeleteButton({ id, updateMascotas }) {
  const [mensaje, setMensaje] = useState(""); // Estado para almacenar el mensaje

  const handleDelete = async () => {
    try {
      // Eliminar el documento correspondiente al registro en Firestore
      await deleteDoc(doc(db, "mascotas", id));
      setMensaje("Registro eliminado exitosamente"); // Actualizar el mensaje en el estado
      updateMascotas(); // Llamar a la función de actualización de estado en ListaPets
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} style={{ backgroundColor: "red" }}>Eliminar</button>
      {mensaje && <p>{mensaje}</p>} {/* Mostrar el mensaje si existe */}
    </div>
  );
}

export default DeleteButton;



