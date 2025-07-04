import CustomButton from "@/components/CustomButton";
import { Table } from "@/components/Table";
import { View, Text, StyleSheet } from "react-native";

export default function MenusList() {
  interface Column {
    nome: string;
    label: string;
  }

  interface Cardapio {
    id: number;
    codigo: string;
    data_cardapio: Date;
    tipo_cardapio: number;
  }

  const columns: Column[] = [
    { nome: "id", label: "ID" },
    { nome: "codigo", label: "Código" },
    { nome: "data_cardapio", label: "Data" },
    { nome: "tipo_cardapio", label: "Tipo" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Cardápios</Text>

      <CustomButton href="/menus/form" style={styles.button}>
        Novo Cardápio
      </CustomButton>

      <Table<Cardapio> columns={columns} route="/cardapio" editRoute="menus"/>
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
