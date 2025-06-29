import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />

      {/* Refeições */}
      <Tabs.Screen
        name="meals/index"
        options={{
          title: 'Refeições',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="restaurant" size={24} color={color} />
          ),
        }}
      />

      {/* Cardápios */}
      <Tabs.Screen
        name="menus/index"
        options={{
          title: 'Cardápios',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="menu-book" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}