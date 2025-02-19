import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GuestDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Invitado</Text>
      <Text>Bienvenido, invitado.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default GuestDashboard;