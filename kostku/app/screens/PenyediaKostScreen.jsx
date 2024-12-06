import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebase/firebaseConfig'; // Pastikan db dan auth diimpor dengan benar
import { collection, addDoc } from 'firebase/firestore'; 

const PenyediaKostScreen = ({ navigation }) => {
  const [kostName, setKostName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [facilities, setFacilities] = useState('');

  // Fungsi untuk menambahkan kost ke Firestore
  const addKost = async () => {
    console.log("Tombol 'Tambah Kost' diklik");
    if (!kostName || !location || !price || !facilities) {
      Alert.alert('Error', 'Semua field harus diisi!');
      return;
    }

    // Pastikan pengguna sudah login
    if (!auth.currentUser) {
      Alert.alert('Error', 'Anda harus login terlebih dahulu!');
      return;
    }

    console.log(auth.currentUser);

    try {
      // Menambahkan data kost ke Firestore
      const docRef = await addDoc(collection(db, 'kost'), {
        kostName,
        location,
        price: parseInt(price),
        facilities,
        createdBy: auth.currentUser.uid, 
      });

      // Menampilkan pesan sukses
      console.log("Kost berhasil ditambahkan dengan ID: ", docRef.id); 
      Alert.alert('Success', 'Kost berhasil ditambahkan!');

      // Reset form input setelah penambahan
      setKostName('');
      setLocation('');
      setPrice('');
      setFacilities('');

    } catch (error) {
      console.error("Error menambahkan kost:", error);  // Log error
      Alert.alert('Error', 'Gagal menambahkan kost! ');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Penyedia Kost</Text>

      {/* Form untuk menambahkan kost */}
      <TextInput
        style={styles.input}
        placeholder="Nama Kost"
        value={kostName}
        onChangeText={setKostName}
      />
      <TextInput
        style={styles.input}
        placeholder="Lokasi Kost"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Harga Kost"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Fasilitas Kost"
        value={facilities}
        onChangeText={setFacilities}
      />

      {/* Tombol untuk menambahkan kost */}
      <TouchableOpacity style={styles.button} onPress={addKost}>
        <Text style={styles.buttonText}>Tambah Kost</Text>
      </TouchableOpacity>

      {/* Tombol kembali ke halaman sebelumnya */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PenyediaKostScreen;