import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTabs from "./AppTabs";
import AddBike from "../screens/AddBike";
import MyBikes from "../screens/MyBikes";
import History from "../screens/History";
import HistoryDetail from "../screens/HistoryDetail";
import EditBike from "../screens/EditBike";
const Stack = createNativeStackNavigator();
/**
 * 
 * AppStack es el principal navegador de pilas para la aplicación. 
 * Incluye las pestañas y pantallas principales para agregar bicicletas, ver bicicletas e historial. 
 * Se utiliza para navegar entre diferentes pantallas en la aplicación.
 */
export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="Tabs" component={AppTabs} />
     
      <Stack.Screen name="AddBike" component={AddBike} />
      <Stack.Screen name="MyBikes" component={MyBikes} />
      <Stack.Screen name="History" component={History} />
       <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
       <Stack.Screen name="EditBike" component={EditBike} />
    </Stack.Navigator>
  );
}
