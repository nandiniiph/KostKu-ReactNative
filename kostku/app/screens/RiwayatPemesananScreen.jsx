import React, { useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList, timeStyle } from 'react-native';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, onSnapshot, query, where, getDoc, doc } from 'firebase/firestore';
import { router } from 'expo-router';
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

// Utility functions to promote functional programming
const fetchDetailBookingData = (snapshot) => {
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const RiwayatPemesananScreen = ({ navigation }) => {
  const { email } = useLocalSearchParams();
  console.log("Email dari Riwayat Pemesanan:", email);

  const [detailBookingList, setDetailBookingList] = useState([]);
  const [kostData, setKostData] = useState({});

  useEffect(() => {
    if (!email) {
      Alert.alert("Error", "Email tidak ditemukan!");
      return;
    }

    const q = query(collection(db, "detail_booking"), where("owner_kost", "==", email));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingData = fetchDetailBookingData(snapshot);
      setDetailBookingList(bookingData);

      // Ambil detail kost berdasarkan id_kost dari detail_booking
      const kostIds = bookingData.map((item) => item.id_kost);
      if (kostIds.length > 0) {
        const kostPromises = kostIds.map((id) => getDoc(doc(db, "kost", id)));
        Promise.all(kostPromises).then((kostSnapshots) => {
          const kostDataMap = kostSnapshots.reduce((acc, docSnap) => {
            if (docSnap.exists()) {
              acc[docSnap.id] = docSnap.data();
            }
            return acc;
          }, {});
          setKostData(kostDataMap);
        });
      }
    });

    return () => unsubscribe();
  }, [email]);

  const renderDetailBookingItem = ({ item }) => {
    console.log("ini item",item);
    const kostDetail = kostData[item.id_kost];
    console.log("ini kostDetail",kostDetail);
    const formattedDate = new Date(item.timestamp.seconds * 1000 + item.timestamp.nanoseconds / 1e6)
    .toLocaleDateString("id-ID", { dateStyle: "medium" });
    return (
      <View style={styles.bookingItem}>
        {kostDetail ? (
          <>
            <Text style={styles.kostName}>Nama Kost: {kostDetail.kostName}</Text>
            <Text style={styles.kostName}>Pencari Kos: {item.email_user}</Text>
            <Text>Fasilitas: {kostDetail.facilities}</Text>
            <Text>Alamat: {kostDetail.location}</Text>
            <Text>Pemilik Kost: {kostDetail.ownerEmail}</Text>
            <Text>Harga: {kostDetail.price}</Text>
            <Text>Tanggal Booking: {formattedDate}</Text>
          </>
        ) : (
          <Text style={styles.noData}>Detail kost tidak ditemukan.</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riwayat Pemesanan</Text>
      {detailBookingList.length === 0 ? (
        <Text style={styles.noData}>Tidak ada pemesanan ditemukan.</Text>
      ) : (
        <FlatList
          data={detailBookingList}
          keyExtractor={(item) => item.id}
          renderItem={renderDetailBookingItem}
        />
      )}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Kembali</Text>
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
  bookingItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  kostItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  kostName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pemesananItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
  },
  noData: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  backButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RiwayatPemesananScreen;