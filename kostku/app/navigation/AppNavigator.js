// app/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginOptionsScreen from '../screens/LoginOptionsScreen';  // Pastikan pathnya benar
import LoginScreen from '../screens/LoginScreen';  // Pastikan pathnya benar

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginOptions">
      <Stack.Screen name="LoginOptions" component={LoginOptionsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
