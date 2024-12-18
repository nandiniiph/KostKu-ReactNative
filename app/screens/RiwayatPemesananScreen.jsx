import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

// Utility functions to promote functional programming
const fetchKostData = (snapshot) => {
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const fetchPemesananData = (snapshot) => {
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const RiwayatPemesananScreen = ({ navigation }) => {
  const [kostList, setKostList] = useState([]);
  const [riwayatPemesanan, setRiwayatPemesanan] = useState({});

  useEffect(() => {
    if (!auth.currentUser) {
      Alert.alert('Error', 'Anda harus login terlebih dahulu!');
      return;
    }

    const q = query(
      collection(db, 'kost'),
      where('ownerEmail', '==', auth.currentUser.email)
    );

    const unsubscribeKost = onSnapshot(q, (snapshot) => {
      const kostData = fetchKostData(snapshot);
      setKostList(kostData);
    });

    return () => unsubscribeKost();
  }, []);

  useEffect(() => {
    if (kostList.length > 0) {
      const unsubscribeList = kostList.map((kost) => {
        const q = query(
          collection(db, 'pemesanan'),
          where('kostId', '==', kost.id)
        );

        return onSnapshot(q, (snapshot) => {
          const pemesananData = fetchPemesananData(snapshot);
          setRiwayatPemesanan((prev) => ({
            ...prev,
            [kost.id]: pemesananData,
          }));
        });
      });

      return () => unsubscribeList.forEach((unsubscribe) => unsubscribe());
    }
  }, [kostList]);

  const renderPemesananItem = ({ item }) => (
    <View style={styles.pemesananItem}>
      <Text>Nama Pemesan: {item.namaPemesan}</Text>
      <Text>Tanggal: {item.tanggal}</Text>
    </View>
  );

  const renderKostItem = ({ item }) => (
    <View style={styles.kostItem}>
      <Text style={styles.kostName}>{item.kostName}</Text>
      {riwayatPemesanan[item.id]?.length > 0 ? (
        <FlatList
          data={riwayatPemesanan[item.id]}
          keyExtractor={(item) => item.id}
          renderItem={renderPemesananItem}
        />
      ) : (
        <Text style={styles.noData}>Belum ada pemesanan.</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riwayat Pemesanan</Text>
      {kostList.length === 0 ? (
        <Text style={styles.noData}>Tidak ada kost terdaftar.</Text>
      ) : (
        <FlatList
          data={kostList}
          keyExtractor={(item) => item.id}
          renderItem={renderKostItem}
        />
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
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