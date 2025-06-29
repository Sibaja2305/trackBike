import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTabs from "./AppTabs";
import AddBike from "../screens/AddBike";
import MyBikes from "../screens/MyBikes";
import History from "../screens/History";
import HistoryDetail from "../screens/HistoryDetail";
const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Aquí mete primero tus tabs */}
      <Stack.Screen name="Tabs" component={AppTabs} />
      {/* Y luego la pantalla AddBike */}
      <Stack.Screen name="AddBike" component={AddBike} />
      <Stack.Screen name="MyBikes" component={MyBikes} />
      <Stack.Screen name="History" component={History} />
       <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
    </Stack.Navigator>
  );
}
