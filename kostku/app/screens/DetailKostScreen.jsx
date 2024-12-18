import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const DetailKostScreen = ({ route, navigation }) => {
  const [kost, setKost] = useState(null);
  const { kostId } = route.params;

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

  const handleBooking = () => {
    alert('Silakan melakukan pembayaran dengan menghubungi contact person berikut: ' + kost.contactPerson);
    // Navigasi atau logika tambahan jika diperlukan
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