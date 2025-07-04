import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
/**
 * 
 * ActionButton es un componente reutilizable que representa un botón de acción
 * con un ícono y una etiqueta. Se utiliza para realizar acciones rápidas en la pantalla de
 * inicio, como agendar citas, ver historial, tutoriales y productos.
 */
function ActionButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
      <Ionicons name={icon} size={28} color="#1E90FF" />
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}
/**
 * 
 * ListItem es un componente que representa un elemento de lista
 * con un ícono, título y tiempo estimado de lectura.
 * Se utiliza para mostrar consejos de mantenimiento y recordatorios en la pantalla de inicio.
 */
function ListItem({ icon, title, time }) {
  return (
    <View style={styles.listItem}>
      <Ionicons name={icon} size={22} color="#fff" style={styles.listIcon} />
      <View style={styles.listText}>
        <Text style={styles.listTitle}>{title}</Text>
        <Text style={styles.listTime}>{time}</Text>
      </View>
    </View>
  );
}
/**
 * 
 * Home es la pantalla principal de la aplicación, donde el usuario puede ver su información,
 * acciones rápidas, consejos de mantenimiento y recordatorios.
 * Incluye un encabezado con el logo y un ícono de perfil,
 * un saludo personalizado, una tarjeta de próximo mantenimiento,
 * botones de acción rápida y listas de consejos y recordatorios. 
 */
export default function Home() {
  const navigation = useNavigation();
  const { user, logOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>trackbike</Text>
        <TouchableOpacity onPress={logOut}>
          <Ionicons name="person-circle-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>
          Bienvenido, {user?.displayName ?? user?.email.split("@")[0]}
        </Text>
        <Text style={styles.subtitle}>¿Qué quieres hacer hoy?</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Próximo mantenimiento</Text>
            <TouchableOpacity>
              <Text style={styles.cardLink}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardItem}>
            <Ionicons
              name="calendar-outline"
              size={24}
              color="#1E90FF"
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>Revisión General</Text>
              <Text style={styles.itemSubtitle}>
                Taller RBS BIKE 15 Mayo, 10:00am
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Acciones rápidas</Text>
        <View style={styles.actionsRow}>
          <ActionButton
            icon="calendar-outline"
            label="Agendar cita"
            onPress={() => {}}
          />
          <ActionButton
            icon="time-outline"
            label="Historial"
            onPress={() => navigation.navigate("History")}
          />
          <ActionButton
            icon="play-outline"
            label="Tutoriales"
            onPress={() => navigation.navigate("Tutorials")}
          />
          <ActionButton
            icon="cart-outline"
            label="Productos"
            onPress={() => navigation.navigate("Products")}
          />
        </View>

        <Text style={styles.sectionTitle}>Consejos de mantenimiento</Text>
        <View style={styles.list}>
          <ListItem
            icon="play-circle-outline"
            title="Cómo ajustar tus frenos"
            time="3 min de lectura"
          />
          <ListItem
            icon="play-circle-outline"
            title="Lubricación de cadena"
            time="2 min de lectura"
          />
        </View>

        <Text style={styles.sectionTitle}>Recordatorios</Text>
        <View style={styles.list}>
          <ListItem
            icon="alarm-outline"
            title="Lubricación de cadena"
            time="2 min de lectura"
          />
        </View>
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
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1F1F1F",
  },
  logo: {
    color: "#1E90FF",
    fontSize: 24,
    fontWeight: "bold",
  },

  content: {
    padding: 20,
  },

  greeting: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
  subtitle: {
    color: "#bbb",
    fontSize: 16,
    marginTop: 4,
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#272727",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  cardLink: {
    color: "#1E90FF",
    fontSize: 14,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  itemSubtitle: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 2,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionBtn: {
    width: "23%",
    backgroundColor: "#272727",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  actionLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },

  list: {
    marginBottom: 24,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272727",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  listIcon: {
    marginRight: 12,
  },
  listText: {
    flex: 1,
  },
  listTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  listTime: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 2,
  },
});
