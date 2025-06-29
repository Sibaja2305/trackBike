// screens/MyBikes.js

import React, { useState, useEffect, useContext } from "react";
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
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import appFirebase from "../credenciales";
import { AuthContext } from "../context/AuthContext";

const db = getFirestore(appFirebase);

export default function MyBikes({ navigation }) {
  const { user } = useContext(AuthContext);
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const q = query(
        collection(db, "bikes"),
        where("owner", "==", user.uid)
      );
      const snap = await getDocs(q);
      setBikes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudieron cargar las bicicletas");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "bikes", id));
      setBikes(bikes.filter(b => b.id !== id));
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo eliminar");
    }
  };

  const typeLabel = (type) => {
    const m = { ruta: "Ruta", montaña: "MTB", bmx: "BMX", hibrida: "Híbrida" };
    return m[type] || type;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis bicicletas</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddBike")}>
          <Ionicons name="add-circle-outline" size={28} color="#1E90FF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {bikes.map(bike => (
          <View key={bike.id} style={styles.card}>
            {/* header de tarjeta */}
            <View style={styles.cardHeader}>
              <Ionicons
                name="bicycle-outline"
                size={24}
                color="#1E90FF"
                style={{ marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{bike.name}</Text>
                <Text style={styles.cardSubtitle}>
                  {bike.brand} {bike.model} {bike.year}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => {/* detalles si quieres */}}
              >
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#FFF"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => handleDelete(bike.id)}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color="#C0392B"
                />
              </TouchableOpacity>
            </View>

            {/* body con datos */}
            <View style={styles.cardBody}>
              <View style={styles.row}>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Tipo</Text>
                  <Text style={styles.fieldValue}>{typeLabel(bike.type)}</Text>
                </View>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Color</Text>
                  <Text style={styles.fieldValue}>{bike.color}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Kilometraje</Text>
                  <Text style={styles.fieldValue}>
                    {bike.mileage.toLocaleString()} km
                  </Text>
                </View>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Talla de cuadro</Text>
                  <Text style={styles.fieldValue}>{bike.frameSize}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: "#1F1F1F",
  },
  headerTitle: {
    flex: 1,
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: "#272727",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  cardTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    color: "#AAA",
    fontSize: 12,
    marginTop: 4,
  },
  iconBtn: {
    marginLeft: 12,
    padding: 4,
  },
  cardBody: {
    backgroundColor: "#1F1F1F",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  field: {
    flex: 1,
  },
  fieldLabel: {
    color: "#888",
    fontSize: 12,
  },
  fieldValue: {
    color: "#FFF",
    fontSize: 14,
    marginTop: 2,
  },
});
