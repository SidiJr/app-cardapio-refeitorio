import api from "@/api";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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
        console.log(response);
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
        window.alert("Sucesso: Dados excluídos com sucesso!");
        setData((prev) => prev.filter((item) => item.id !== id));
      } else {
        window.alert("Erro: Resposta inesperada do servidor.");
      }
    } catch (error) {
      console.error("Erro ao excluir dados:", error);
      window.alert("Erro: Não foi possível excluir os dados.");
    }
  };

  return (
    // <View style={styles.container}>
    //     <Table borderStyle={{borderColor: 'transparent'}}>
    //       <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
    //       {
    //         state.tableData.map((rowData, index) => (
    //           <TableWrapper key={index} style={styles.row}>
    //             {
    //               rowData.map((cellData, cellIndex) => (
    //                 <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
    //               ))
    //             }
    //           </TableWrapper>
    //         ))
    //       }
    //     </Table>
    //   </View>
      <View style={styles.container}>
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
        {data.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {columns.map((column) => (
              <Text key={`cell-${rowIndex}-${column.nome}`} style={styles.cell}>
                {row[column.nome]?.toString() || "-"}
              </Text>
            ))}
            <CustomButton
              style={styles.iconButton}
              size="sm"
              onPress={() => handleEdit(row.id)}
            >
              <Feather name="edit" size={18} color="#fff" />
            </CustomButton>

            <CustomButton
              style={styles.iconButton}
              size="sm"
              onPress={() => handleDelete(row.id)}
            >
              <Feather name="trash-2" size={18} color="#fff" />
            </CustomButton>
          </View>
        ))}
      </View>
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
  cell: {
    padding: 10,
    minWidth: 100,
  },
  iconButton: {
    padding: 10,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});
