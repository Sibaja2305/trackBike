import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home       from "../screens/Home";
import Citas      from "../screens/Citas";
import Tutoriales from "../screens/Tutoriales";
import Productos  from "../screens/Productos";
import Perfil     from "../screens/Perfil";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#1E90FF",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#222",
          borderTopColor: "#333",
        },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Inicio:      "home-outline",
            Citas:       "calendar-outline",
            Tutoriales:  "videocam-outline",
            Productos:   "cart-outline",
            Perfil:      "person-circle-outline",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio"     component={Home} />
      <Tab.Screen name="Citas"      component={Citas} />
      <Tab.Screen name="Tutoriales" component={Tutoriales} />
      <Tab.Screen name="Productos"  component={Productos} />
      <Tab.Screen name="Perfil"     component={Perfil} />

    </Tab.Navigator>
  );
}
