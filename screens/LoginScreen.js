import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/styleLogin';
import { Provider as PaperProvider, Title } from 'react-native-paper';
import { Button } from 'react-native-paper';
import logo from '../imagenes/logo2png.png'
import { v4 as uuidv4 } from 'uuid';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Obtener los datos de usuarios almacenados en AsyncStorage
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      // Encontrar el usuario con las credenciales proporcionadas
      const foundUser = users.find((user) => user.username === username && user.password === password);

      if (foundUser) {
        // Obtener el identificador del usuario encontrado
        const userId = foundUser.id;

        // Cargar las notas asociadas con el identificador del usuario
        const storedNotes = await AsyncStorage.getItem(`notes_${userId}`);
        const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];

        // Realizar otras acciones necesarias y redirigir al usuario
        ToastAndroid.showWithGravity('Inicio de sesión exitoso', ToastAndroid.SHORT, ToastAndroid.CENTER);
        navigation.navigate('Notas', { userId, notes: parsedNotes });
      } else {
        ToastAndroid.showWithGravity('Credenciales inválidas', ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <>
      <Image source={logo} style={styles.portada}></Image>
      <View style={styles.formContainer}>
        <Title style={styles.title}>Inicio de sesión</Title>
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
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.buttonContainer}
        >
          Iniciar sesión
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.text}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginScreen;