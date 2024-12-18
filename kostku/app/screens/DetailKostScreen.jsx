import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const DetailKostScreen = ({ route, navigation }) => {
  const [kost, setKost] = useState(null);
  const { kostId, kostName, email } = route.params;
  console.log(kostName)
  console.log("ini email dari detail", email)

  useEffect(() => {
    const fetchKostDetail = async () => {
      const kostDoc = doc(db, 'kost', kostId);
      const kostSnapshot = await getDoc(kostDoc);
      if (kostSnapshot.exists()) {
        setKost(kostSnapshot.data());
      } else {
        console.log('Kost tidak ditemukan');
      }
    };

    fetchKostDetail();
  }, [kostId]);

  const handleBooking = async () => {
    try {
      if (!kost) {
        alert("Detail kost tidak ditemukan!");
        return;
      }

      // Data yang akan ditambahkan ke koleksi `detail_booking`
      const bookingData = {
        email_user: email,
        id_kost: kostId,
        nama_kost: kostName,
        owner_kost: kost.ownerEmail, // Diasumsikan ada field `ownerEmail` di koleksi `kost`
        timestamp: new Date() // Menambahkan waktu booking
      };

      // Menambahkan data ke koleksi `detail_booking`
      const bookingRef = collection(db, 'detail_booking');
      await addDoc(bookingRef, bookingData);

      alert("Booking berhasil! Silakan hubungi contact person berikut: " + kost.contactPerson);
      navigation.goBack(); // Navigasi kembali atau ke halaman lain jika diperlukan
    } catch (error) {
      console.error("Gagal melakukan booking:", error);
      alert("Terjadi kesalahan saat melakukan booking. Silakan coba lagi.");
    }
  };

  if (!kost) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.kostName}>{kost.kostName}</Text>
      <Text style={styles.kostDetails}>Lokasi: {kost.location}</Text>
      <Text style={styles.kostDetails}>Harga: Rp{kost.price?.toLocaleString()}</Text>
      <Text style={styles.kostDetails}>Fasilitas: {kost.facilities}</Text>
      <Text style={styles.kostDetails}>Kontak: {kost.contactPerson}</Text>

      <TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
        <Text style={styles.bookingButtonText}>Booking Sekarang</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  kostName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  kostDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  bookingButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  bookingButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DetailKostScreen;