import api from "@/api";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomButton from "./CustomButton";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

interface Column {
  nome: string;
  label: string;
}

interface TableProps<T> {
  columns: Column[];
  route: string;
  editRoute: string;
}

export const Table = <T extends Record<string, any>>({
  columns,
  route,
  editRoute,
}: TableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<T[]>(route);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [route]);

  const handleEdit = async (id: number) => {
    router.push(`${editRoute}/form/${id}` as any);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`${route}/${id}`);

      if ([200, 201].includes(response.status)) {
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Dados excluídos com sucesso!",
        });
        setData((prev) => prev.filter((item) => item.id !== id));
      } else {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Resposta inesperada do servidor.",
        });
      }
    } catch (error) {
      console.error("Erro ao excluir dados:", error);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível excluir os dados.",
      });
    }
  };

  return (
    <ScrollView horizontal style={styles.scroll}>
      <ScrollView style={{ maxHeight: 400 }}>
        <View style={styles.table}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            {columns.map((column) => (
              <Text key={`header-${column.nome}`} style={styles.headerText}>
                {column.label}
              </Text>
            ))}
            <Text style={styles.headerText}>Editar</Text>
            <Text style={styles.headerText}>Excluir</Text>
          </View>

          {/* Linhas */}
          {data.length === 0 ? (
            <View style={styles.emptyRow}>
              <Text style={styles.emptyText}>Nenhum dado encontrado.</Text>
            </View>
          ) : (
            data.map((row, rowIndex) => (
              <View
                key={`row-${rowIndex}`}
                style={[
                  styles.row,
                  rowIndex % 2 === 0 ? styles.rowEven : styles.rowOdd,
                ]}
              >
                {columns.map((column) => (
                  <Text
                    key={`cell-${rowIndex}-${column.nome}`}
                    style={styles.cell}
                  >
                    {row[column.nome]?.toString() || "-"}
                  </Text>
                ))}
                <View style={styles.actionCell}>
                  <CustomButton
                    style={styles.iconButton}
                    size="sm"
                    onPress={() => handleEdit(row.id)}
                  >
                    <Feather name="edit" size={18} color="#2563eb" />
                  </CustomButton>
                </View>
                <View style={styles.actionCell}>
                  <CustomButton
                    style={{ ...styles.iconButton, ...styles.deleteButton }}
                    size="sm"
                    onPress={() => handleDelete(row.id)}
                  >
                    <Feather name="trash-2" size={18} color="#dc2626" />
                  </CustomButton>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
  table: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#1e293b",
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    textAlign: "center",
    flex: 1,
    flexShrink: 1,
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  rowEven: {
    backgroundColor: "#f1f5f9",
  },
  rowOdd: {
    backgroundColor: "#e2e8f0",
  },
  cell: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "#334155",
    fontSize: 16,
    textAlign: "center",
    flex: 1,
    flexShrink: 1,
    flexGrow: 1,
  },
  iconButton: {
    backgroundColor: "#e0e7ef",
    borderRadius: 20,
    padding: 8,
    marginHorizontal: 4,
    minWidth: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  actionCell: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    flexShrink: 1,
    flexGrow: 1,
  },
  deleteButton: {
    backgroundColor: "#fee2e2",
  },
  emptyRow: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 16,
    fontStyle: "italic",
  },
});
