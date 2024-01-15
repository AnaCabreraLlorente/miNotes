import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/styleLogin';
import { Button } from 'react-native-paper';
import { Provider as PaperProvider, Title } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Verificar que todos los campos estén completos
      if (username && password && confirmPassword) {
        // Verificar que las contraseñas coincidan
        if (password === confirmPassword) {
          // Almacenar las credenciales en AsyncStorage
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('password', password);

          // Redirigir al usuario a la pantalla de inicio de sesión
          Alert.alert('Éxito', 'Registro exitoso');
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', 'Las contraseñas no coinciden');
        }
      } else {
        Alert.alert('Error', 'Por favor, complete todos los campos');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <View style={styles.formContainer}>
    <Title style={styles.title}>Crear cuenta / Registro</Title>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
      style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Repetir contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button 
        mode="contained"
        onPress={handleRegister} style={styles.buttonContainer}>
          Registrarse
      </Button>
    </View>
  );
};

export default RegisterScreen;
