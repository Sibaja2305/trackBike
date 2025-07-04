
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
/**
 * 
 * Login es una pantalla que permite a los usuarios iniciar sesión en la aplicación.
 * Incluye campos para correo electrónico y contraseña, con opciones para mostrar/ocultar la contraseña,
 * y recordar la sesión.
 * También incluye un botón para iniciar sesión, un enlace para restablecer la contraseña
 */
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { logIn } = useContext(AuthContext);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      logIn(user); 
      Alert.alert("¡Éxito!", `Bienvenido ${user.email}`);
    } catch (err) {
      console.error(err);
      setErrorMessage("Correo o contraseña incorrecta.");
      setShowErrorModal(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.logo}>trackbike</Text>
      <Text style={styles.tagline}>Gestiona tu bicicleta</Text>

      
      <View style={styles.form}>
    
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

        <View style={styles.labelRow}>
          <Text style={styles.label}>Contraseña</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ResetPassword");
            }}
          >
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
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

      
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

        
        <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
          <Text style={styles.primaryBtnText}>Iniciar sesión</Text>
        </TouchableOpacity>

     
        <View style={styles.separatorRow}>
          <View style={styles.line} />
          <Text style={styles.separatorText}>O continuar con</Text>
          <View style={styles.line} />
        </View>

   
        <TouchableOpacity
          style={styles.googleBtn}
          onPress={() => {
            
          }}
        >
          <Ionicons name="logo-google" size={20} color="#4285F4" />
          <Text style={styles.googleText}>Continuar con Google</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Necesitas una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.footerLink}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showErrorModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons name="alert-circle-outline" size={48} color="#FFD700" />
            <Text style={styles.modalTitle}>Error de inicio de sesión</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowErrorModal(false)}
            >
              <Text style={styles.modalButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
modalButton: {
  marginTop: 20,
  backgroundColor: "#1E90FF",
  borderRadius: 20,
  paddingVertical: 10,
  paddingHorizontal: 24,
},
modalButtonText: {
  color: "#FFF",
  fontSize: 14,
  fontWeight: "600",
},

});
