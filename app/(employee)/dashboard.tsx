import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function EmployeeDashboard() {
  const router = useRouter();

  return (
    <View>
      <Text>Bienvenido, empleado.</Text>
      <Button
        title="Registrar Nuevo Usuario"
        onPress={() => router.push('/(employee)/RegisterScreen')}
      />
      <Button
        title="Gestión de Documentos"
        onPress={() => router.push('/(employee)/DocumentosScreen')}
      />
    </View>
  );
}