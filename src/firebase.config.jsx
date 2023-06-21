// Importo las funciones del  from  SDKs de mi firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// mi configuracion web app's Firebase esta configuracion me la entrega firebase y solo tengo que pegarla
const firebaseConfig = {
  apiKey: "AIzaSyAlNwEns5lt9aIq2fpZH532BdvGjkKr_aE",
  authDomain: "loginappyenm.firebaseapp.com",
  projectId: "loginappyenm",
  storageBucket: "loginappyenm.appspot.com",
  messagingSenderId: "789012146226",
  appId: "1:789012146226:web:99e7763994a9378ddf742b"
};

// Inicio de  Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}

