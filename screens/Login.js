// screens/Login.js

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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import appFirebase from "../credenciales";
import { AuthContext } from "../context/AuthContext";

const auth = getAuth(appFirebase);

export default function Login({ navigation }) {
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe]   = useState(false);
  const { logIn }                     = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      logIn(user); // mantiene el flujo actual
      Alert.alert("¡Éxito!", `Bienvenido ${user.email}`);
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
      {/* Logo y tagline */}
      <Text style={styles.logo}>trackbike</Text>
      <Text style={styles.tagline}>Gestiona tu bicicleta</Text>

      {/* Formulario */}
      <View style={styles.form}>
        {/* Email */}
        <Text style={styles.label}>Correo electrónico</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="tu@gmail.com"
            placeholderTextColor="#888"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password con link de “olvidaste” */}
        <View style={styles.labelRow}>
          <Text style={styles.label}>Contraseña</Text>
          <TouchableOpacity onPress={() => {/* navegar a Recuperar */}}>
            <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="••••••••"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Recordarme */}
        <TouchableOpacity
          style={styles.rememberRow}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && (
              <Ionicons name="checkmark" size={16} color="#1E90FF" />
            )}
          </View>
          <Text style={styles.rememberText}>Recordarme</Text>
        </TouchableOpacity>

        {/* Botón principal */}
        <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
          <Text style={styles.primaryBtnText}>Iniciar sesión</Text>
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.separatorRow}>
          <View style={styles.line} />
          <Text style={styles.separatorText}>O continuar con</Text>
          <View style={styles.line} />
        </View>

        {/* Google */}
        <TouchableOpacity
          style={styles.googleBtn}
          onPress={() => {/* lógica Google Sign-In */}}
        >
          <Ionicons name="logo-google" size={20} color="#4285F4" />
          <Text style={styles.googleText}>Continuar con Google</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Necesitas una cuenta? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.footerLink}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 4,
  },
  tagline: {
    color: "#CCC",
    fontSize: 16,
    marginBottom: 24,
  },

  form: {
    width: "100%",
  },
  label: {
    color: "#FFF",
    fontSize: 14,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginTop: 8,
    height: 48,
  },
  inputField: {
    flex: 1,
    color: "#FFF",
    fontSize: 14,
    height: "100%",
  },

  forgot: {
    color: "#1E90FF",
    fontSize: 12,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FFF",
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
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  primaryBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 25,
    height: 48,
    width: "100%",
  },
  googleText: {
    color: "#FFF",
    fontSize: 14,
    marginLeft: 8,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#888",
    fontSize: 12,
  },
  footerLink: {
    color: "#1E90FF",
    fontSize: 12,
  },
});
