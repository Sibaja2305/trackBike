// screens/MaintenanceDetails.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MaintenanceDetails({ navigation }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulación de carga de datos
    const dummy = {
      title: "Revisión general",
      status: "Completado",
      description:
        "Inspección completa de la bicicleta, ajuste de frenos y cambios, lubricación de cadena.",
      info: {
        date: "15 mayo, 2025",
        time: "10:00 AM",
        workshop: "Taller RBS BIKE",
        location: "Golfito, Puntarenas",
        technician: "Kevin Sibaja",
        duration: "1 hora",
      },
      costs: [
        { label: "Lubricante de cadena", amount: "₡5000" },
        { label: "Ajuste de cambios", amount: "₡5000" },
        { label: "Revisión de frenos", amount: "₡5000" },
      ],
      note:
        "Se recomienda cambiar de pastillas de freno en la próxima sesión.",
    };
    setTimeout(() => setData(dummy), 500);
  }, []);

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  const total = data.costs.reduce(
    (sum, c) => sum + parseInt(c.amount.replace(/[^\d]/g, "")),
    0
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inner}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles de mantenimiento</Text>
      </View>
      <View style={styles.divider} />

      {/* Título + estado */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons
            name="construct-outline"
            size={24}
            color="#1E90FF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.cardTitle}>{data.title}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{data.status}</Text>
          </View>
        </View>
        <Text style={styles.cardDesc}>{data.description}</Text>
      </View>

      {/* Información general */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Información general</Text>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#888" />
          <Text style={styles.infoText}>
            {data.info.date} · {data.info.time}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#888" />
          <Text style={styles.infoText}>
            {data.info.workshop} · {data.info.location}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={20} color="#888" />
          <Text style={styles.infoText}>{data.info.technician}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#888" />
          <Text style={styles.infoText}>{data.info.duration}</Text>
        </View>
      </View>

      {/* Desglose de costos */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Desglose de costos</Text>
        {data.costs.map((c) => (
          <View key={c.label} style={styles.costRow}>
            <Text style={styles.costLabel}>{c.label}</Text>
            <Text style={styles.costValue}>{c.amount}</Text>
          </View>
        ))}
        <View style={styles.costTotalRow}>
          <Text style={styles.costTotalLabel}>Total</Text>
          <Text style={styles.costTotalValue}>₡{total}</Text>
        </View>
      </View>

      {/* Nota del técnico */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Nota del técnico</Text>
        <Text style={styles.noteText}>{data.note}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#171717" },
  inner: { padding: 20, paddingBottom: 40 },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#171717",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
  },
  headerTitle: {
    flex: 1,
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginRight: 32,
  },
  divider: {
    height: 1,
    backgroundColor: "#444",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#272727",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
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
    flex: 1,
  },
  statusBadge: {
    backgroundColor: "#27ae60",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  cardDesc: {
    color: "#CCC",
    fontSize: 14,
    lineHeight: 20,
  },

  sectionTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    color: "#CCC",
    fontSize: 14,
    marginLeft: 8,
  },

  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  costLabel: {
    color: "#CCC",
    fontSize: 14,
  },
  costValue: {
    color: "#FFF",
    fontSize: 14,
  },
  costTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#444",
    paddingTop: 8,
    marginTop: 8,
  },
  costTotalLabel: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  costTotalValue: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },

  noteText: {
    color: "#CCC",
    fontSize: 14,
    lineHeight: 20,
  },
});
