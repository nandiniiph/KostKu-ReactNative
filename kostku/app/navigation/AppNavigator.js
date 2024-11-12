// app/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginOptionsScreen from '../screens/LoginOptionsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginOptions">
        <Stack.Screen 
          name="LoginOptions" 
          component={LoginOptionsScreen} 
          options={{ title: 'OPSI LOGIN' }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={({ route }) => ({
            title: route.params.userType === 'Pencari' ? 'LOGIN AS PENCARI' : 'LOGIN AS PENYEDIA',
          })}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'REGISTER AS PENCARI' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
