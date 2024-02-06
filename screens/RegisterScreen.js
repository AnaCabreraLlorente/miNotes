import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { Provider as PaperProvider, Title } from 'react-native-paper';
import stylesRegister from '../style/styleRegister';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

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
          // Verificar si ya existe un usuario con el mismo nombre
          const existingUsers = await AsyncStorage.getItem('users');
          let users = existingUsers ? JSON.parse(existingUsers) : [];
          const userId = uuidv4();
          const existingUser = users.find((user) => user.username === username);

          if (existingUser === username) {
            Alert.alert('Error', 'El nombre de usuario ya está registrado');
          } else {
            // Almacenar las credenciales en AsyncStorage
            await AsyncStorage.setItem('users', JSON.stringify([...users, { id: userId, username, password }]));

            // Redirigir al usuario a la pantalla de inicio de sesión
            ToastAndroid.showWithGravity('Registro exitoso', ToastAndroid.SHORT, ToastAndroid.CENTER);
            navigation.navigate('Login');
          }
        } else {
          ToastAndroid.showWithGravity('Las contraseñas no coinciden', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
      } else {
        ToastAndroid.showWithGravity('Por favor, complete todos los campos', ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <View style={stylesRegister.formContainer}>
    <Title style={stylesRegister.title}>Crear cuenta / Registro</Title>
      <TextInput
        style={stylesRegister.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
      style={stylesRegister.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={stylesRegister.input}
        placeholder="Repetir contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button 
        mode="contained"
        onPress={handleRegister} style={stylesRegister.buttonContainer}>
          Registrarse
      </Button>
    </View>
  );
};

export default RegisterScreen;
