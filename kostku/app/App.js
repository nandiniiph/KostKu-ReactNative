// app/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginOptionsScreen from './screens/LoginOptionsScreen';  // Path file LoginOptionsScreen
import LoginScreen from './screens/LoginScreen';  // Path file LoginScreen

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginOptions">
        <Stack.Screen name="LoginOptions" component={LoginOptionsScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
