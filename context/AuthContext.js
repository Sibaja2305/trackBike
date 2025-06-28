import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appFirebase from "../credenciales";




export const AuthContext = createContext();


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

  if (authInitializing) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
