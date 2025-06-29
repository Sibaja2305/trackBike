// screens/Citas.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Citas({ navigation }) {
  const appointments = [
    {
      id: "1",
      title: "Revisión general",
      subtitle: "Taller RBS Bike",
      date: "15 mayo, 2025",
      time: "2:30 PM",
      cost: "₡15000",
    },
    {
      id: "2",
      title: "Revisión general",
      subtitle: "Taller RBS Bike",
      date: "15 mayo, 2025",
      time: "3:00 PM",
      cost: "₡15000",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Citas de mantenimientos</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddCita")}>
          <Ionicons name="add-circle-outline" size={28} color="#1E90FF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Próximas citas</Text>

        {appointments.map((appt) => (
          <View key={appt.id} style={styles.card}>
            {/* Título y subtítulo */}
            <View style={styles.cardHeader}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color="#1E90FF"
                style={{ marginRight: 8 }}
              />
              <View>
                <Text style={styles.cardTitle}>{appt.title}</Text>
                <Text style={styles.cardSubtitle}>{appt.subtitle}</Text>
              </View>
            </View>

            {/* Datos: fecha / hora / costo */}
            <View style={styles.row}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Fecha</Text>
                <Text style={styles.fieldValue}>{appt.date}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Hora</Text>
                <Text style={styles.fieldValue}>{appt.time}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Costo</Text>
                <Text style={styles.fieldValue}>{appt.cost}</Text>
              </View>
            </View>

            {/* Botones */}
            <View style={styles.rowButtons}>
              <TouchableOpacity style={styles.btnCancel}>
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnReschedule}>
                <Text style={styles.btnText}>Reprogramar</Text>
              </TouchableOpacity>
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
    height: 56,
    backgroundColor: "#1F1F1F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },

  content: {
    padding: 16,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#272727",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    color: "#AAA",
    fontSize: 12,
    marginTop: 2,
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

  rowButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnCancel: {
    backgroundColor: "#C0392B",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  btnReschedule: {
    backgroundColor: "#1E90FF",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  btnText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
