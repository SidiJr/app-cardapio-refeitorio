import api from "@/api";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

interface Column {
  nome: string;
  label: string;
}

interface TableProps<T> {
  columns: Column[];
  route: string;
}

export const Table = <T extends Record<string, any>>({
  columns,
  route,
}: TableProps<T>) => {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<T[]>(route);
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [route]);

  return (
    <ScrollView horizontal>
      <View>
        {/* Cabeçalho */}
        <View style={styles.header}>
          {columns.map((column) => (
            <Text key={`header-${column.nome}`} style={styles.headerText}>
              {column.label}
            </Text>
          ))}
        </View>

        {/* Linhas */}
        {data.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {columns.map((column) => (
              <Text key={`cell-${rowIndex}-${column.nome}`} style={styles.cell}>
                {row[column.nome]?.toString() || "-"}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontWeight: "bold",
    padding: 10,
    minWidth: 100,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: {
    padding: 10,
    minWidth: 100,
  },
});
