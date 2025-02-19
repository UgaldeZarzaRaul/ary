import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

// Definir la interfaz para los documentos
interface Documento {
  id_documento: number;
  nombre_documento: string;
  descripcion_documento: string;
  tipo_documento?: string;
  ubicacion_documento?: string;
  archivero_id?: number;
}

const DocumentosScreen = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [archiveroId, setArchiveroId] = useState('');
  const [documentos, setDocumentos] = useState<Documento[]>([]); // Especificar el tipo
  const router = useRouter();

  // Obtener la lista de documentos
  const fetchDocumentos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/documentos');
      console.log('Respuesta del servidor:', response.data); // Depuración
      setDocumentos(response.data);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la lista de documentos');
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  // Crear un nuevo documento
  const handleCreateDocumento = async () => {
    if (!nombre || !descripcion || !tipo || !ubicacion || !archiveroId) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/documentos', {
        nombre_documento: nombre,
        descripcion_documento: descripcion,
        tipo_documento: tipo,
        ubicacion_documento: ubicacion,
        archivero_id: archiveroId,
      });

      if (response.data.message === 'Documento creado exitosamente') {
        Alert.alert('Éxito', 'Documento creado correctamente');
        fetchDocumentos(); // Actualizar la lista de documentos
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Documentos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del documento"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de documento"
        value={tipo}
        onChangeText={setTipo}
      />
      <TextInput
        style={styles.input}
        placeholder="Ubicación"
        value={ubicacion}
        onChangeText={setUbicacion}
      />
      <TextInput
        style={styles.input}
        placeholder="ID del archivero"
        value={archiveroId}
        onChangeText={setArchiveroId}
        keyboardType="numeric"
      />
      <Button title="Crear Documento" onPress={handleCreateDocumento} />

      <Text style={styles.subtitle}>Lista de Documentos:</Text>
      <FlatList
        data={documentos}
        keyExtractor={(item) => item.id_documento.toString()}
        renderItem={({ item }) => (
          <View style={styles.documentoItem}>
            <Text>{item.nombre_documento || 'Sin nombre'}</Text>
            <Text>{item.descripcion_documento || 'Sin descripción'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  documentoItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DocumentosScreen;