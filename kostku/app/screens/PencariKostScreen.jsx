import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// Fungsi untuk memfilter data kost berdasarkan pencarian
const filterKosts = (kostList, query) => {
  if (!query) return kostList; // Jika query kosong, tampilkan semua data
  return kostList.filter(
    (kost) =>
      kost.kostName?.toLowerCase().includes(query.toLowerCase()) ||
      kost.location?.toLowerCase().includes(query.toLowerCase())
  );
};

// Fungsi untuk mengambil data kost dari Firebase Firestore
const fetchKostData = async () => {
  const kostCollection = collection(db, 'kost');
  const kostSnapshot = await getDocs(kostCollection);
  const kostData = kostSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return kostData;
};

const PencariKostScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [kostList, setKostList] = useState([]);
  const [filteredKosts, setFilteredKosts] = useState([]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const kostData = await fetchKostData();
        setKostList(kostData);
        setFilteredKosts(kostData); 
      } catch (error) {
        console.error('Error fetching kost data:', error);
      }
    };
    initializeData();
  }, []);

  useEffect(() => {
    const filtered = filterKosts(kostList, searchQuery);
    setFilteredKosts(filtered);
  }, [searchQuery, kostList]);

  const handleLogout = () => {
    navigation.navigate('LoginOptions');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang, Pencari Kost!</Text>
      <Text style={styles.subtitle}>Temukan kost terbaik untuk kebutuhan Anda.</Text>

      <TextInput
        style={styles.input}
        placeholder="Cari nama atau lokasi kost"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Jika tidak ada kost ditemukan */}
      {filteredKosts.length === 0 ? (
        <Text style={styles.noResults}>Tidak ada kost ditemukan.</Text>
      ) : (
        <FlatList
          data={filteredKosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.kostItem}>
              <Text style={styles.kostName}>{item.kostName || 'Nama kost tidak tersedia'}</Text>
              <Text style={styles.kostDetails}>
                Lokasi: {item.location || 'Lokasi tidak tersedia'}
              </Text>
              <Text style={styles.kostDetails}>
                Harga: Rp{item.price?.toLocaleString() || 'Harga tidak tersedia'}
              </Text>
              <Text style={styles.kostDetails}>
                Fasilitas: {item.facilities || 'Fasilitas tidak tersedia'}
              </Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  kostItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
  },
  kostName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  kostDetails: {
    fontSize: 14,
    color: '#555',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PencariKostScreen;
