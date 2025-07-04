import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appFirebase from "../credenciales";

export const AuthContext = createContext();
/**
 * AuthProvider es un componente que proporciona el contexto de autenticación
 * a toda la aplicación. Utiliza Firebase Authentication para gestionar el estado 
 * de autenticación del usuario.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authInitializing, setAuthInitializing] = useState(true);
  const auth = getAuth(appFirebase);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthInitializing(false);
    });

    return () => unsubscribe();
  }, []);
  const logIn = (firebaseUser) => setUser(firebaseUser);
  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };
  if (authInitializing) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
