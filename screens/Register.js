import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import appFirebase from "../credenciales";
import { AuthContext } from "../context/AuthContext";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);
/**
 * 
 * Register es una pantalla que permite a los usuarios crear una nueva cuenta.
 * Incluye campos para nombre completo, correo electrónico, contraseña y confirmación de contraseña.
 * También incluye una opción para aceptar términos y condiciones,
 * y un botón para registrarse.
 */
export default function Register({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { logIn } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!fullName.trim())
      return Alert.alert("Error", "Ingresa tu nombre completo");
    if (password !== confirmPassword)
      return Alert.alert("Error", "Las contraseñas no coinciden");
    if (!termsAccepted)
      return Alert.alert("Error", "Acepta términos y condiciones");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: fullName });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email,
        createdAt: serverTimestamp(),
      });
      logIn(user);
      Alert.alert("¡OK!", `Bienvenido ${fullName}`);
    } catch (err) {
      console.error(err);
      Alert.alert("Error al registrarse", err.message);
    }
  };

  const isDisabled =
    !fullName.trim() ||
    !email.trim() ||
    !password ||
    password !== confirmPassword ||
    !termsAccepted;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Crear cuenta</Text>
        </View>

        <Text style={styles.logo}>
          Únete a <Text style={styles.logoHighlight}>trackbike</Text>
        </Text>
        <Text style={styles.tagline}>Gestiona tu bicicleta</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#888"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="tu@gmail.com"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="••••••••"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            style={styles.rememberRow}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <View
              style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}
            >
              {termsAccepted && (
                <Ionicons name="checkmark" size={16} color="#1E90FF" />
              )}
            </View>
            <Text style={styles.rememberText}>
              Acepto los términos y condiciones
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.primaryBtn, isDisabled && styles.primaryBtnDisabled]}
            onPress={handleRegister}
            disabled={isDisabled}
          >
            <Text style={styles.primaryBtnText}>Registrarse</Text>
          </TouchableOpacity>

          <View style={styles.separatorRow}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>O Registrarse con</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.googleBtn}
            onPress={() => Alert.alert("Google Sign-In")}
          >
            <Ionicons name="logo-google" size={24} color="#4285F4" />
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Al registrarte, aceptas nuestros{" "}
            <Text style={styles.footerLink}>Términos y condiciones</Text> y{" "}
            <Text style={styles.footerLink}>Políticas de privacidad</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1F1F1F" },
  inner: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 24,
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  logoHighlight: {
    color: "#1E90FF",
  },
  tagline: {
    color: "#CCC",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
  },

  form: {
    width: "100%",
  },
  label: {
    color: "#FFF",
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
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderRadius: 25,
    paddingHorizontal: 16,
    alignItems: "center",
    height: 48,
  },
  inputField: {
    flex: 1,
    color: "#FFF",
    fontSize: 14,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#222",
  },
  rememberText: {
    color: "#FFF",
    fontSize: 14,
  },

  primaryBtn: {
    backgroundColor: "#1E90FF",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 24,
  },
  primaryBtnDisabled: {
    opacity: 0.6,
  },
  primaryBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#555",
  },
  separatorText: {
    marginHorizontal: 12,
    color: "#888",
    fontSize: 12,
  },

  googleBtn: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 25,
    padding: 12,
    marginBottom: 24,
  },

  footerText: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
  },
  footerLink: {
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
});
