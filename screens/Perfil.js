

import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import appFirebase from "../credenciales";
import { AuthContext } from "../context/AuthContext";
import { getAuth, signOut } from 'firebase/auth';
const db = getFirestore(appFirebase);

export default function Profile({ navigation }) {
  const { user, logOut } = useContext(AuthContext);
  const [bikes, setBikes] = useState([]);
 const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Sesión cerrada');
        navigation.replace('Login'); 
      })
      .catch((error) => {
        console.log('Error al cerrar sesión', error);
      });
  };
 useFocusEffect(
  React.useCallback(() => {
    const fetchBikes = async () => {
      try {
        const q = query(
          collection(db, "bikes"),
          where("owner", "==", user.uid),
          limit(2)
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBikes(data);
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "No se pudieron cargar las bicicletas");
      }
    };

    fetchBikes();
  }, [user.uid])
);
  
  const typeLabel = (type) => {
    const map = { ruta: "Ruta", montaña: "MTB", bmx: "BMX", hibrida: "Híbrida" };
    return map[type] || type;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inner}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi perfil</Text>
      </View>

     
      <View style={styles.profileInfo}>
        <View style={styles.avatar}>
          <Ionicons name="person-circle-outline" size={80} color="#888" />
        </View>
        <Text style={styles.name}>{user.displayName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.divider} />

    
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mis bicicletas</Text>
        <TouchableOpacity onPress={() => navigation.navigate("MyBikes")}>
          <Text style={styles.link}>Ver todas</Text>
        </TouchableOpacity>
      </View>
      {bikes.map((bike) => (
        <View key={bike.id} style={styles.bikeItem}>
          <Ionicons
            name="bicycle-outline"
            size={20}
            color="#1E90FF"
            style={styles.bikeIcon}
          />
          <View>
            <Text style={styles.bikeName}>{bike.name}</Text>
            <Text style={styles.bikeSubtitle}>
              {typeLabel(bike.type)} {bike.year}
            </Text>
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addBikeBtn}
        onPress={() => navigation.navigate("AddBike")}
      >
        <Text style={styles.addBikeBtnText}>Añadir bicicleta</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

     
      <Text style={styles.sectionTitle}>Configuración</Text>
      <TouchableOpacity style={styles.configItem} onPress={() => {}}>
        <Ionicons
          name="notifications-outline"
          size={20}
          color="#1E90FF"
          style={styles.configIcon}
        />
        <Text style={styles.configText}>Notificaciones</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.configItem} onPress={() => {}}>
        <Ionicons
          name="settings-outline"
          size={20}
          color="#FFF"
          style={styles.configIcon}
        />
        <Text style={styles.configText}>Configuración de cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.configItem} onPress={logOut}>
        <Ionicons
          name="exit-outline"
          size={20}
          color="#C0392B"
          style={styles.configIcon}
        />
        <Text style={[styles.configText, { color: "#C0392B" }]} onPress={handleSignOut}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#171717" },
  inner: { padding: 20 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 32,
  },

  profileInfo: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    backgroundColor: "#1F1F1F",
    borderRadius: 40,
    padding: 8,
    marginBottom: 12,
  },
  name: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "600",
  },
  email: {
    color: "#AAA",
    fontSize: 14,
  },

  divider: {
    height: 1,
    backgroundColor: "#444",
    marginVertical: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  link: {
    color: "#1E90FF",
    fontSize: 14,
  },

  bikeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272727",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  bikeIcon: {
    marginRight: 12,
  },
  bikeName: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "500",
  },
  bikeSubtitle: {
    color: "#AAA",
    fontSize: 13,
    marginTop: 2,
  },

  addBikeBtn: {
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  addBikeBtnText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },

  configItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272727",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  configIcon: {
    marginRight: 12,
  },
  configText: {
    color: "#FFF",
    fontSize: 14,
  },
});
