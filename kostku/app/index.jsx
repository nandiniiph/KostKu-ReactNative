import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginOptionsScreen from './screens/LoginOptionsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PencariKostScreen from './screens/PencariKostScreen'; 
import PenyediaKostScreen from './screens/PenyediaKostScreen'; 
import DetailKostScreen from './screens/DetailKostScreen';

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
          options={{ title: 'Pencari Kost' }} 
        />
        <Stack.Screen
          name="PenyediaKost"
          component={PenyediaKostScreen}
          options={{ title: 'Penyedia Kost' }}
        />
        <Stack.Screen
          name="DetailKost"
          component={DetailKostScreen}
          options={{ title: 'Detail Kost' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
