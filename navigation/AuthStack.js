import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ResetPassword from "../screens/ResetPassword";

const Stack = createNativeStackNavigator();
/**
 * 
 * AuthStack es el navegador de pilas para las pantallas de autenticación.
 * Contiene las pantallas de inicio de sesión, registro y restablecimiento de contraseña.
 * Se utiliza para gestionar el acceso del usuario a la aplicación.
 */
export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login"   component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}
