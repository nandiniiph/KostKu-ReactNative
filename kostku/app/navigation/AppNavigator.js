import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginOptionsScreen from "../screens/LoginOptionsScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PencariKostScreen from "../screens/PencariKostScreen";
import PenyediaKostScreen from "../screens/PenyediaKostScreen";
import RiwayatPemesananScreen from "../screens/RiwayatPemesananScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginOptions">
      <Stack.Screen name="LoginOptions" component={LoginOptionsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
      <Stack.Screen name="PencariKost" component={PencariKostScreen} options={{ headerShown: true }} />
      <Stack.Screen name="PenyediaKost" component={PenyediaKostScreen} options={{ headerShown: true }} />
      <Stack.Screen name="RiwayatPemesananScreen" component={RiwayatPemesananScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
