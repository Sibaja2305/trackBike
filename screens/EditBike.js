import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import {
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore";
import appFirebase from "../credenciales";
import { AuthContext } from "../context/AuthContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
const db = getFirestore(appFirebase);

export default function EditBike() {
  const { user } = useContext(AuthContext);
  const route = useRoute();
  const navigation = useNavigation();
  const { bike } = route.params;

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [mileage, setMileage] = useState("");

  const [typeOpen, setTypeOpen] = useState(false);
  const [typeValue, setTypeValue] = useState(null);
  const [typeItems, setTypeItems] = useState([
    { label: "Ruta", value: "ruta" },
    { label: "Montaña", value: "montaña" },
    { label: "BMX", value: "bmx" },
    { label: "Híbrida", value: "hibrida" },
  ]);

  const [frameOpen, setFrameOpen] = useState(false);
  const [frameValue, setFrameValue] = useState(null);
  const [frameItems, setFrameItems] = useState([
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
  ]);

  const [wheelOpen, setWheelOpen] = useState(false);
  const [wheelValue, setWheelValue] = useState(null);
  const [wheelItems, setWheelItems] = useState([
    { label: "26″", value: "26" },
    { label: "27.5″", value: "27.5" },
    { label: "29″", value: "29" },
  ]);
const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (typeOpen) {
      setFrameOpen(false);
      setWheelOpen(false);
    }
  }, [typeOpen]);
  useEffect(() => {
    if (frameOpen) {
      setTypeOpen(false);
      setWheelOpen(false);
    }
  }, [frameOpen]);
  useEffect(() => {
    if (wheelOpen) {
      setTypeOpen(false);
      setFrameOpen(false);
    }
  }, [wheelOpen]);

  useEffect(() => {
    if (bike) {
      setName(bike.name);
      setBrand(bike.brand);
      setModel(bike.model);
      setYear(String(bike.year));
      setColor(bike.color);
      setMileage(String(bike.mileage));
      setTypeValue(bike.type);
      setFrameValue(bike.frameSize);
      setWheelValue(bike.wheelSize);
    }
  }, [bike]);

  const handleUpdate = async () => {
    if (
      !name.trim() ||
      !brand.trim() ||
      !model.trim() ||
      !year.trim() ||
      !color.trim() ||
      !typeValue ||
      !frameValue ||
      !wheelValue ||
      !mileage.trim()
    ) {
      return Alert.alert("Error", "Por favor completa todos los campos");
    }
    try {
      await updateDoc(doc(db, "bikes", bike.id), {
        name,
        brand,
        model,
        year,
        color,
        type: typeValue,
        frameSize: frameValue,
        wheelSize: wheelValue,
        mileage: Number(mileage),
      });
      Alert.alert("¡Actualizado!", "Los cambios han sido guardados");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar bicicleta</Text>
        </View>

       
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Información básica</Text>

          <Text style={styles.label}>Nombre de la bicicleta</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Mi bicicleta"
            placeholderTextColor="#888"
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Marca</Text>
              <TextInput
                style={styles.input}
                value={brand}
                onChangeText={setBrand}
                placeholder="Trek"
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Modelo</Text>
              <TextInput
                style={styles.input}
                value={model}
                onChangeText={setModel}
                placeholder="Marlin 7"
                placeholderTextColor="#888"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Año</Text>
              <TextInput
                style={styles.input}
                value={year}
                onChangeText={setYear}
                keyboardType="numeric"
                placeholder="2023"
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Color</Text>
              <TextInput
                style={styles.input}
                value={color}
                onChangeText={setColor}
                placeholder="Rojo"
                placeholderTextColor="#888"
              />
            </View>
          </View>

          <Text style={styles.label}>Tipo de bicicleta</Text>
          <View style={[styles.dropdownWrapper, { zIndex: 3000 }]}>
            <DropDownPicker
              open={typeOpen}
              value={typeValue}
              items={typeItems}
              setOpen={setTypeOpen}
              setValue={setTypeValue}
              setItems={setTypeItems}
              placeholder="Selecciona el tipo"
              placeholderStyle={{ color: "#888" }}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              dropDownDirection="TOP"
              ArrowDownIconComponent={() => (
                <Ionicons name="chevron-down" size={20} color="#888" />
              )}
              ArrowUpIconComponent={() => (
                <Ionicons name="chevron-up" size={20} color="#888" />
              )}
            />
          </View>
        </View>

        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Especificaciones técnicas</Text>

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Talla del cuadro</Text>
              <View style={[styles.dropdownWrapper, { zIndex: 2000 }]}>
                <DropDownPicker
                  open={frameOpen}
                  value={frameValue}
                  items={frameItems}
                  setOpen={setFrameOpen}
                  setValue={setFrameValue}
                  setItems={setFrameItems}
                  placeholder="Selecciona talla"
                  placeholderStyle={{ color: "#888" }}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  textStyle={styles.dropdownText}
                  dropDownDirection="TOP"
                  ArrowDownIconComponent={() => (
                    <Ionicons name="chevron-down" size={20} color="#888" />
                  )}
                  ArrowUpIconComponent={() => (
                    <Ionicons name="chevron-up" size={20} color="#888" />
                  )}
                />
              </View>
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Tamaño de rueda</Text>
              <View style={[styles.dropdownWrapper, { zIndex: 1000 }]}>
                <DropDownPicker
                  open={wheelOpen}
                  value={wheelValue}
                  items={wheelItems}
                  setOpen={setWheelOpen}
                  setValue={setWheelValue}
                  setItems={setWheelItems}
                  placeholder="Tamaño"
                  placeholderStyle={{ color: "#888" }}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  textStyle={styles.dropdownText}
                  dropDownDirection="TOP"
                  ArrowDownIconComponent={() => (
                    <Ionicons name="chevron-down" size={20} color="#888" />
                  )}
                  ArrowUpIconComponent={() => (
                    <Ionicons name="chevron-up" size={20} color="#888" />
                  )}
                />
              </View>
            </View>
          </View>

          <Text style={styles.label}>Kilometraje actual</Text>
          <TextInput
            style={styles.input}
            value={mileage}
            onChangeText={setMileage}
            keyboardType="numeric"
            placeholder="1"
            placeholderTextColor="#888"
          />
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowConfirmModal(true)}>
          <Text style={styles.primaryBtnText}>Guardar cambios</Text>
        </TouchableOpacity>
      </ScrollView>
      {showConfirmModal && (
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Ionicons name="help-circle-outline" size={48} color="#FFD700" />
      <Text style={styles.modalTitle}>¿Guardar cambios?</Text>
      <Text style={styles.modalMessage}>¿Estás seguro de actualizar los datos de esta bicicleta?</Text>

      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: "#555" }]}
          onPress={() => setShowConfirmModal(false)}
        >
          <Text style={styles.modalButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: "#1E90FF" }]}
          onPress={() => {
            setShowConfirmModal(false);
            handleUpdate();
          }}
        >
          <Text style={styles.modalButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)}

    </KeyboardAvoidingView>
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

  card: {
    backgroundColor: "#272727",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  label: {
    color: "#CCC",
    fontSize: 14,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#333",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#FFF",
    fontSize: 14,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  half: {
    width: "48%",
  },

  dropdownWrapper: {
    elevation: 10,
  },
  dropdown: {
    backgroundColor: "#333",
    borderRadius: 25,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  dropdownContainer: {
    backgroundColor: "#333",
    borderRadius: 12,
    marginTop: -4,
  },
  dropdownText: {
    color: "#FFF",
    fontSize: 14,
  },

  primaryBtn: {
    backgroundColor: "#1E90FF",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  primaryBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
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
