// app/screens/LoginScreen.jsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ route }) => {
  const { userType } = route.params;  // Ambil userType yang dikirim dari LoginOptionsScreen

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Login Sebagai {userType}</Text>
      
      {/* Input untuk email */}
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      {/* Input untuk password */}
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      
      <TouchableOpacity style={styles.button} onPress={() => alert('Login')}>
        <Text style={styles.buttonText}>MASUK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
