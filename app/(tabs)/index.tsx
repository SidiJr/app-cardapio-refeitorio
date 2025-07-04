import Calendar from "@/components/Calendar";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text style={styles.title}>Bem-vindo ao Cardápio Virtual!</Text>

      <Calendar />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#1e293b",
  },
});
