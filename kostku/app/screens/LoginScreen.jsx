// app/screens/LoginScreen.jsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const LoginScreen = ( {navigation} ) => {
  const route = useRoute();  // Menggunakan useRoute untuk mendapatkan parameter dari screen sebelumnya
  const { userType } = route.params || {};  // Mengambil nilai userType (Pencari atau Penyedia)

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login Sebagai {userType}</Text>

      {/* Input untuk email */}
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      {/* Input untuk password */}
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    width: '80%',
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
