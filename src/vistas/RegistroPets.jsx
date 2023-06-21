import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";//importo mi configuracion de firebase ya configurada
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./RegistroPets.css";
import Header from "./Header";
import { app, auth } from "../firebase.config";
import { Link } from "react-router-dom";//Es el navegador entre mis paginas con react/Router

const db = getFirestore(app); //iniciacion de firestore es la nube donde almaceno mis datos en la base de datos
const storage = getStorage(app);//iniciacion de storage es una carpeta donde guardo las imagenes 

// Aquí se inicializan las instancias de Firestore y Firebase Storage utilizando la configuración proporcionada por app
function RegistroPets() {
  const [nombreMascota, setNombreMascota] = useState("");// Estado para almacenar
  const [edadMascota, setEdadMascota] = useState("");// Estado para almacenar
  const [edadUnidad, setEdadUnidad] = useState("años"); // Estado para almacenar la unidad de la edad (años o meses)
  const [razaMascota, setRazaMascota] = useState("");// Estado para almacenar
  const [miTutor, setMiTutor] = useState("");// Estado para almacenar
  const [telefonoContacto, setTelefonoContacto] = useState("");
  const [fotoMascota, setFotoMascota] = useState(null);// Estado para almacenar
  const [registroExitoso, setRegistroExitoso] = useState(false);// Estado para almacenar

  //Aquí se definen los estados del componente utilizando el hook useState.
  // Cada estado corresponde a un campo en el formulario de registro de mascotas.
  // También se definen las funciones de manejo de cambios para cada campo.

  const handleNombreMascotaChange = (e) => { //constante del manejo del nombre de la mascota
    setNombreMascota(e.target.value);// coloca (e) contiene la informacion del evento,e.target se refiere a ese elemento del DOM y .value accede al valor actual del elemento.
  };

  const handleEdadMascotaChange = (e) => {
    setEdadMascota(e.target.value);
  };
  const handleEdadUnidadChange = (e) => {
    setEdadUnidad(e.target.value);
  };

  const handleRazaMascotaChange = (e) => {
    setRazaMascota(e.target.value);
  };

  const handleMiTutorChange = (e) => {
    setMiTutor(e.target.value);
  };

  const handleTelefonoContactoChange = (e) => {
    setTelefonoContacto(e.target.value);
  };

  const handleFotoMascotaChange = (e) => {
    const file = e.target.files[0];
    setFotoMascota(file);
  };

  const handleRegistroMascota = async (e) => {
    e.preventDefault();

    try {
       // Obtener el userId del usuario actual
       const userId = auth.currentUser.uid;

      // Subir la foto de la mascota a Firebase Storage
      const storageRef = ref(storage, `mascotas/${fotoMascota.name}`);
      //espera la accion
      await uploadBytes(storageRef, fotoMascota);

      // Obtener la URL de descarga de la foto de la mascota
      const downloadURL = await getDownloadURL(storageRef);

      // Guardar los datos de la mascota en Firestore en la estructura de mi formuluario
    
      const mascotaData = {
        nombre: nombreMascota,
        edad: `${edadMascota} ${edadUnidad}`,
        raza: razaMascota,
        tutor: miTutor,
        telefono: telefonoContacto,
        fotoURL: downloadURL,
        userId: userId, // Agregar el userId para que cada usuario tenga sus mascotas y no la app
      };
      await addDoc(collection(db, "mascotas"), mascotaData);//espera agregar a la coleccion de base de datos mascotas 

      // Limpiar los campos y mostrar mensaje de registro exitoso
      setNombreMascota("");//colocar en nombre mascota
      setEdadMascota("");
      setRazaMascota("");
      setMiTutor("");
      setTelefonoContacto("");
      setFotoMascota(null);
      setRegistroExitoso(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="RegistroPets-container">
        <h1>Registro de Mascotas</h1>
        <div className="icon-registromascota">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-postcard-heart-fill" viewBox="0 0 16 16">
  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2Zm6 2.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0Zm3.5.878c1.482-1.42 4.795 1.392 0 4.622-4.795-3.23-1.482-6.043 0-4.622ZM2 5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/>
</svg>
        </div>
        <form className="RegistroPets-form"> 
          <input
            type="text"
            placeholder="Nombre de la mascota"
            value={nombreMascota}//el valor
            onChange={handleNombreMascotaChange}//en cambio = manejo de lo que ingresa el usuario
          />
         <input
          type="text"
          placeholder="Edad de la mascota"
          value={edadMascota}
          onChange={handleEdadMascotaChange}
        />
        <select value={edadUnidad} onChange={handleEdadUnidadChange}>
          <option value="años">Años</option>
          <option value="meses">Meses</option>
        </select>
        
          <input
            type="text"
            placeholder="Raza de la mascota"
            value={razaMascota}
            onChange={handleRazaMascotaChange}
          />
          <input
            type="text"
            placeholder="Mi tutor"
            value={miTutor}
            onChange={handleMiTutorChange}
          />
          <input
            type="text"
            placeholder="Teléfono de contacto"
            value={telefonoContacto}
            onChange={handleTelefonoContactoChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoMascotaChange}
          />
          <button onClick={handleRegistroMascota}>Registrar</button>
          <Link to="/listapets" className="mis-mascotas-button">Ver mis Mascotas</Link>
        </form>
        {registroExitoso && (
          <p className="RegistroPets-success">
            Mascota registrada exitosamente.
          </p>
        )}
      </div>
    </div>
  );
}

export default RegistroPets;

