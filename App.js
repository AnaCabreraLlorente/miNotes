import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"  screenOptions={{
      headerStyle: {
        backgroundColor: '#39A7C6', // Cambia el color de fondo de la barra aquí
      },
      headerTintColor: 'black', // Cambia el color del texto en la barra aquí
    }}
  >
        <Stack.Screen name="Login"  component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Notas" component={HomeScreen} options={({ navigation }) => ({
            headerShown: true,
            headerBackVisible: false,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{ marginRight: 15 }} // Ajusta el margen según tus necesidades
              >
                <Icon name="poweroff" size={20} color="black" />
              </TouchableOpacity>
            ),
          })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

