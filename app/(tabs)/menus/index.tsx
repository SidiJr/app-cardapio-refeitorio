import { Table } from "@/components/Table";
import { View, Text } from "react-native";

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
    <View>
      <Text>Lista de Cardápios</Text>
      <Table<Cardapio> columns={columns} route="/cardapio" />
    </View>
  );
}
