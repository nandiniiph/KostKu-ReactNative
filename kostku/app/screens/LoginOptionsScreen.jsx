// app/screens/LoginOptionsScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginOptionsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Selamat Datang!</Text>
      <Text style={styles.subText}>Masuk Sebagai</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login', { userType: 'PENCARI LAYANAN' })}
      >
        <Text style={styles.buttonText}>PENCARI LAYANAN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login', { userType: 'PENYEDIA LAYANAN' })}
      >
        <Text style={styles.buttonText}>PENYEDIA LAYANAN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginOptionsScreen;
