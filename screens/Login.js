import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import appFirebase from "../credenciales";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(appFirebase);

export default function Login(props) {
  //creamos la variable estado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logueo = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      Alert.alert("Login exitoso", "Bienvenido a TrackBike");
      props.navigation.navigate("Home", { uid: user.uid });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.padre}>
      <View>
        <Image
          source={require("../assets/favicon.png")}
          style={styles.profile}
        />
      </View>
      <View style={styles.tarjeta}>
        <View style={styles.cajaTexto}>
          <TextInput
            placeholder="correo@gmail.com"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setEmail(text)} 
          />
        </View>

        <View style={styles.cajaTexto}>
          <TextInput
            placeholder="password"
            style={{ paddingHorizontal: 15 }}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.PadreBoton}>
          <TouchableOpacity style={styles.cajaBoton} onPress={logueo}>
            <Text style={styles.textBoton}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  padre: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 50,
  },
  tarjeta: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cajaTexto: {
    marginTop: 20,
    paddingVertical: 10,
    marginVertical: 20,
    borderRadius: 30,
    backgroundColor: "#cccccc40",
  },

  PadreBoton: {
    alignItems: "center",
  },
  cajaBoton: {
    backgroundColor: "#525fe1",
    borderRadius: 30,
    paddingVertical: 10,
    width: 150,
    height: 50,
    marginTop: 20,
  },
  textBoton: {
    textAlign: "center",
    marginTop: 10,
    color: "white",
  },
});
