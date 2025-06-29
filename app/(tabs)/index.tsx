import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Cardápio Virtual!</Text>
      
      <View style={styles.buttonsContainer}>
        {/* Botão Cardápios */}
        <CustomButton
          href="/menus"
          variant="primary"
          size="lg"
          style={styles.button}
        >
          Ver Cardápios
        </CustomButton>

        {/* Botão Refeições */}
        <CustomButton
          href="/meals"
          variant="secondary"
          size="lg"
          style={styles.button}
        >
          Ver Refeições
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#1e293b',
  },
  buttonsContainer: {
    gap: 16,
  },
  button: {
    width: '100%',
  },
});