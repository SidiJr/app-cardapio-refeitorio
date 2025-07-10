import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";
import api from "../api";

type Cardapio = {
  id: number;
  data_cardapio: string;
};

type MenusPorDia = Record<
  string,
  {
    almoco: string[];
    janta: string[];
  }
>;

export default function Calendar() {
  const [selected, setSelected] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [menus, setMenus] = useState<MenusPorDia>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Cardapio[]>("cardapio")
      .then((res) => {
        const data: MenusPorDia = {};
        res.data.forEach((cardapio: any) => {
          const date = cardapio.data_cardapio;
          if (!data[date]) data[date] = { almoco: [], janta: [] };

          if (Array.isArray(cardapio.pratos)) {
            const nomes = cardapio.pratos.map((p: any) => p.nome);
            if (cardapio.tipo_cardapio === 0) {
              data[date].almoco.push(...nomes);
            } else if (cardapio.tipo_cardapio === 1) {
              data[date].janta.push(...nomes);
            }
          }
        });
        setMenus(data);
        if (data[selected]) setSelected(selected);
        else if (Object.keys(data).length > 0)
          setSelected(Object.keys(data)[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const menu = menus[selected] || { almoco: [], janta: [] };

  const markedDates = Object.keys(menus).reduce((acc, date) => {
    const dots = [];
    if (menus[date].almoco.length) {
      dots.push({ key: "almoco", color: "#2563eb" });
    }
    if (menus[date].janta.length) {
      dots.push({ key: "janta", color: "#22c55e" });
    }
    acc[date] = {
      marked: true,
      dots,
      ...(date === selected && { selected: true, selectedColor: "#1e293b" }),
    };
    return acc;
  }, {} as any);

  return (
    <View>
      <RNCalendar
        onDayPress={(day) => setSelected(day.dateString)}
        markedDates={markedDates}
        markingType="multi-dot"
        theme={{
          todayTextColor: "#1e293b",
        }}
      />

      {/* Legenda */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 12,
          marginLeft: 8,
        }}
      >
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: "#2563eb",
            marginRight: 6,
          }}
        />
        <Text style={{ marginRight: 16, color: "#334155" }}>Almoço</Text>
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: "#22c55e",
            marginRight: 6,
          }}
        />
        <Text style={{ color: "#334155" }}>Janta</Text>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Almoço</Text>
          {menu.almoco.length ? (
            menu.almoco.map((item, idx) => (
              <Text key={idx} style={styles.menuItem}>
                {item}
              </Text>
            ))
          ) : (
            <Text style={styles.menuItem}>Sem cardápio para o almoço.</Text>
          )}
          <Text style={styles.menuTitle}>Janta</Text>
          {menu.janta.length ? (
            menu.janta.map((item, idx) => (
              <Text key={idx} style={styles.menuItem}>
                {item}
              </Text>
            ))
          ) : (
            <Text style={styles.menuItem}>Sem cardápio para a janta.</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
  },
  menuTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 12,
    marginBottom: 4,
    color: "#1e293b",
  },
  menuItem: {
    fontSize: 16,
    marginLeft: 8,
    color: "#334155",
  },
});
