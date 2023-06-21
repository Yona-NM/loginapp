import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile // Importa la función updateProfile
} from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("No hay usuario registrado");
        setUser(null);
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const register = async (email, password, displayName) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(response.user, { displayName }); // Actualiza el perfil con el displayName
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const response = await signOut(auth);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        logout,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
