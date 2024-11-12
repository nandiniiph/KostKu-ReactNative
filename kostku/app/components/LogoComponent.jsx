// src/components/LogoComponent.jsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LogoComponent = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,      // Sesuaikan ukuran lebar gambar
    height: 100,     // Sesuaikan ukuran tinggi gambar
    resizeMode: 'contain',  // Agar gambar tidak terdistorsi
  },
});

export default LogoComponent;
