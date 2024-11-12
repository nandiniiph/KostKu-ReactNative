// app/screens/LoginOptionsScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginOptionsScreen = () => {
  const navigation = useNavigation(); // Use the useNavigation hook to get navigation
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Selamat Datang!</Text>
      <Text style={styles.subText}>Masuk Sebagai</Text>

      {/* Tombol untuk Pencari Layanan */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("Tombol Pencari Layanan ditekan");
          navigation.navigate('LoginScreen', { userType: 'Pencari' });
        }}
      >
        <Text style={styles.buttonText}>PENCARI LAYANAN</Text>
      </TouchableOpacity>

      {/* Tombol untuk Penyedia Layanan */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login', { userType: 'Penyedia' })}
      >
        <Text style={styles.buttonText}>PENYEDIA LAYANAN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginOptionsScreen;
