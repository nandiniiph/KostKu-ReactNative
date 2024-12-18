import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginOptionsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Selamat Datang!</Text>
      <Text style={styles.subText}>Login Sebagai</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login', { role: 'pencari' })}
      >
        <Text style={styles.buttonText}>Pencari Kost</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login', { role: 'penyedia' })}
      >
        <Text style={styles.buttonText}>Penyedia Kost</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.linkText}>Belum punya akun? Daftar di sini</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 300,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#007bff',
    fontSize: 14,
  },
});

export default LoginOptionsScreen;