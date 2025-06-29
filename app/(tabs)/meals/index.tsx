import { Table } from "@/components/Table";
import { View, Text } from "react-native";

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
    <View>
      <Text>Lista de Refeições</Text>
      <Table<Prato> columns={columns}  route="/prato"/>
    </View>
  );
}
