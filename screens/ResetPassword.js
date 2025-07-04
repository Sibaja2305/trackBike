import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import appFirebase from "../credenciales";

const auth = getAuth(appFirebase);
/**
 * 
 * RecoverPassword es una pantalla que permite a los usuarios recuperar su contraseña.
 * Incluye un campo para ingresar el correo electrónico asociado a la cuenta,
 *  un botón para enviar un enlace de recuperación,
 * y un modal para mostrar mensajes de éxito o error. 
 */
export default function RecoverPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handlePasswordReset = async () => {
    if (!email) {
      setModalMessage("Por favor ingresa tu correo electrónico.");
      setModalVisible(true);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setModalMessage(
        "Revisa tu bandeja de entrada para restablecer tu contraseña."
      );
      setModalVisible(true);
    } catch (err) {
      console.error(err);
      setModalMessage(err.message);
      setModalVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image
        source={require("../assets/image.png")}
        style={styles.icon}
        resizeMode="contain"
      />

      <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
      <Text style={styles.subtitle}>
        No te preocupes, te ayudaremos a recuperar el acceso a tu cuenta
      </Text>

      <TextInput
        style={styles.input}
        placeholder="tu@gmail.com"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.helper}>
        Ingresa el email asociado a tu cuenta de TrackBike
      </Text>

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Enviar enlace de recuperación</Text>
      </TouchableOpacity>

      <Text style={styles.separator}>¿Recordaste tu contraseña?</Text>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.secondaryButtonText}>
          Volver al inicio de sesión
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#BBB",
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#333",
    borderRadius: 25,
    paddingHorizontal: 16,
    color: "#FFF",
    height: 48,
    fontSize: 14,
  },
  helper: {
    color: "#888",
    fontSize: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#1E90FF",
    borderRadius: 25,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  separator: {
    color: "#AAA",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 12,
  },
  secondaryButton: {
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 25,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFF",
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    maxWidth: 300,
    marginHorizontal: 24,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
