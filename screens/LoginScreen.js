import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/styleLogin';
import { Provider as PaperProvider, Title } from 'react-native-paper';
import { Button } from 'react-native-paper';
import logo from '../imagenes/logo2png.png'

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Obtener los datos del usuario almacenados en AsyncStorage
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');

      // Verificar las credenciales
      if (username === storedUsername && password === storedPassword) {
        // Credenciales válidas, puedes realizar acciones adicionales si es necesario
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        navigation.navigate('Home');
      } else {
        // Credenciales inválidas
        Alert.alert('Error', 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    //<ImageBackground
      //source={require('../imagenes/')}  Ruta de tu imagen de fondo
      //style={styles.backgroundImage}
    
    //>
    <>

      <Image source={logo} style={styles.portada}></Image>
      <View style={styles.formContainer}>
        <Title style={styles.title}>Inicio de sesion</Title>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={(text) => setUsername(text)} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)} />
        <Button
          mode="contained"
          onPress={handleLogin} style={styles.buttonContainer}>
          Iniciar sesion
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.text}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View></>
   // </ImageBackground>
  );
};
const App = () => {
  return (
    <PaperProvider>
      {/* Tu aplicación */}
    </PaperProvider>
  );
};

export default LoginScreen;
