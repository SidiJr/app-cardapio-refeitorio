import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="menus/form/index"
          options={{ title: "Novo Cardápio" }}
        />
        <Stack.Screen
          name="menus/form/[id]"
          options={{ title: "Editar Cardápio" }}
        />
        <Stack.Screen
          name="meals/form/index"
          options={{ title: "Nova Refeição" }}
        />
        <Stack.Screen
          name="meals/form/[id]"
          options={{ title: "Editar Refeição" }}
        />
      </Stack>
      <Toast />
    </>
  );
}
