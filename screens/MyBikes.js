// screens/MyBikes.js

import React, { useState, useContext } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
const db = getFirestore(appFirebase);
/**
 * 
 * MyBikes es una pantalla que muestra las bicicletas del usuario.
 * Permite al usuario ver, editar y eliminar sus bicicletas.
 * Incluye una lista de tarjetas con información de cada bicicleta,
 * un botón para agregar una nueva bicicleta y un modal de confirmación para eliminar bicicletas.
 */
export default function MyBikes({ navigation }) {
  const { user } = useContext(AuthContext);
  const [bikes, setBikes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBikeId, setSelectedBikeId] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
      fetchBikes();
    }, [])
  );

  const fetchBikes = async () => {
    try {
      const q = query(collection(db, "bikes"), where("owner", "==", user.uid));
      const snap = await getDocs(q);
      setBikes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudieron cargar las bicicletas");
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "bikes", selectedBikeId));
      setBikes((prev) => prev.filter((b) => b.id !== selectedBikeId));
      setShowDeleteModal(false);
      setSelectedBikeId(null);
      Alert.alert("Eliminado", "La bicicleta ha sido eliminada.");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo eliminar.");
      setShowDeleteModal(false);
    }
  };

  const typeLabel = (type) => {
    const m = { ruta: "Ruta", montaña: "MTB", bmx: "BMX", hibrida: "Híbrida" };
    return m[type] || type;
  };
  const handleDelete = (bikeId) => {
  setSelectedBikeId(bikeId);
  setShowDeleteModal(true);
};

  return (
    <View style={styles.container}>
     
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
        {bikes.map((bike) => (
          <View key={bike.id} style={styles.card}>
            
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
                onPress={() => navigation.navigate("EditBike", { bike })}
              >
                <Ionicons name="create-outline" size={20} color="#FFD700" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => handleDelete(bike.id)} 
              >
                <Ionicons name="trash-outline" size={20} color="#C0392B" />
              </TouchableOpacity>
            </View>

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
      {showDeleteModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons name="trash-outline" size={48} color="#C0392B" />
            <Text style={styles.modalTitle}>¿Eliminar bicicleta?</Text>
            <Text style={styles.modalMessage}>
              ¿Estás seguro de que deseas eliminar esta bicicleta? Esta acción
              no se puede deshacer.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#555" }]}
                onPress={() => {
                  setShowDeleteModal(false);
                  setSelectedBikeId(null);
                }}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#C0392B" }]}
                onPress={confirmDelete}
              >
                <Text style={styles.modalButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#2C2C2C",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  modalMessage: {
    color: "#CCC",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 6,
    borderRadius: 20,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
