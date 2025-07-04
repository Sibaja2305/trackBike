import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const completedData = [
  {
    id: "1",
    title: "Revisión general",
    subtitle: "Taller RBS Bike",
    date: "15 mayo, 2025",
    bicycle: "SPX",
    cost: "₡15000",
  },
  {
    id: "2",
    title: "Cambio de frenos",
    subtitle: "Taller RBS Bike",
    date: "15 mayo, 2025",
    bicycle: "SPX",
    cost: "₡15000",
  },
  {
    id: "3",
    title: "Cambio de frenos",
    subtitle: "Taller RBS Bike",
    date: "15 mayo, 2025",
    bicycle: "SPX",
    cost: "₡15000",
  },
];

const canceledData = [
  {
    id: "4",
    title: "Revisión general",
    subtitle: "Taller RBS Bike",
    date: "15 mayo, 2025",
    bicycle: "SPX",
    cost: "₡15000",
  },
];
/**
 * 
 * History es una pantalla que muestra el historial de mantenimiento de bicicletas.
 * Permite al usuario ver las citas completadas y canceladas.
 * Incluye una barra de búsqueda, pestañas para filtrar por citas completadas o canceladas,
 * y una lista de tarjetas que muestran los detalles de cada cita.
 */
export default function History({ navigation }) {
  const [activeTab, setActiveTab] = useState("completed");
  const data = activeTab === "completed" ? completedData : canceledData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial de mantenimiento</Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Buscar en historial"
        placeholderTextColor="#888"
      />

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "completed" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("completed")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "completed" && styles.tabTextActive,
            ]}
          >
            Completadas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "canceled" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("canceled")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "canceled" && styles.tabTextActive,
            ]}
          >
            Canceladas
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color="#1E90FF"
                style={{ marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
              {activeTab === "completed" ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate("HistoryDetail")}
                >
                  <Ionicons
                    name="arrow-forward-outline"
                    size={20}
                    color="#FFF"
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Cancelada</Text>
                </View>
              )}
            </View>

            <View style={styles.cardBody}>
              <View style={styles.row}>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>fecha</Text>
                  <Text style={styles.fieldValue}>{item.date}</Text>
                </View>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Bicicleta</Text>
                  <Text style={styles.fieldValue}>{item.bicycle}</Text>
                </View>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Costo</Text>
                  <Text style={styles.fieldValue}>{item.cost}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#171717" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 16,
  },
  headerTitle: {
    flex: 1,
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginRight: 40,
  },
  search: {
    margin: 16,
    backgroundColor: "#272727",
    borderRadius: 25,
    height: 48,
    paddingHorizontal: 16,
    color: "#FFF",
  },
  tabs: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#1E90FF",
  },
  tabText: {
    color: "#AAA",
    fontSize: 14,
  },
  tabTextActive: {
    color: "#1E90FF",
    fontWeight: "600",
  },
  list: { paddingHorizontal: 16, paddingBottom: 16 },
  card: {
    backgroundColor: "#272727",
    borderRadius: 10,
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
  badge: {
    backgroundColor: "#C0392B",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
  },
  cardBody: {
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  field: { flex: 1 },
  fieldLabel: { color: "#888", fontSize: 12 },
  fieldValue: {
    color: "#FFF",
    fontSize: 14,
    marginTop: 2,
  },
});
