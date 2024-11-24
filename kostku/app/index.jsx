import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginOptionsScreen from './screens/LoginOptionsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PencariKostScreen from './screens/PencariKostScreen'; // Import baru
import PenyediaKostScreen from './screens/PenyediaKostScreen'; // Import baru

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginOptions">
        <Stack.Screen
          name="LoginOptions"
          component={LoginOptionsScreen}
          options={{ title: 'Select User Type' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Register' }}
        />
        <Stack.Screen
          name="PencariKost"
          component={PencariKostScreen}
          options={{ title: 'Pencari Kost' }} // Judul layar
        />
        <Stack.Screen
          name="PenyediaKost"
          component={PenyediaKostScreen}
          options={{ title: 'Penyedia Kost' }} // Judul layar
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
