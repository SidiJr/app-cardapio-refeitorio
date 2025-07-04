import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Table } from "@/components/Table";
import CustomButton from "@/components/CustomButton";

export default function MealsList() {
  interface Column {
    nome: string;
    label: string;
  }

  interface Prato {
    id: number;
    codigo: string;
    nome: string;
  }

  const columns: Column[] = [
    { nome: "id", label: "ID" },
    { nome: "codigo", label: "Código" },
    { nome: "nome", label: "Nome" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Refeições</Text>

      <CustomButton href="/meals/form" style={styles.button}>
        Nova Refeição
      </CustomButton>

      <Table<Prato> columns={columns} route="/prato" editRoute="meals"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  button: {
    alignSelf: "flex-start",
  },
});
