import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ title: 'Login' }} />
      <Stack.Screen name="(admin)/dashboard" options={{ title: 'Admin Dashboard' }} />
      <Stack.Screen name="(employee)/dashboard" options={{ title: 'Employee Dashboard' }} />
      <Stack.Screen name="(employee)/register" options={{ title: 'Registrar Usuario' }} />
      <Stack.Screen name="(employee)/documentos" options={{ title: 'Gestión de Documentos' }} />
      <Stack.Screen name="(guest)/dashboard" options={{ title: 'Guest Dashboard' }} />
    </Stack>
  );
}