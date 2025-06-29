// App.js

import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AuthStack from "./navigation/AuthStack";
import AppStack  from "./navigation/AppStack";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user } = useContext(AuthContext);
  // Si no hay usuario: AuthStack; si hay: AppStack
  return user ? <AppStack /> : <AuthStack />;
}
