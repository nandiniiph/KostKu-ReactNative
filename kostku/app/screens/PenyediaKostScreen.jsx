import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from "react-native";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "expo-router";

// Fungsi tingkat tinggi untuk validasi
const withValidation = (callback, validations) => {
  return (...args) => {
    for (const validate of validations) {
      const error = validate(...args);
      if (error) {
        Alert.alert("Error", error);
        return;
      }
    }
    return callback(...args);
  };
};

const PenyediaKostScreen = ({ navigation, route }) => {
  const router = useRouter();
  const email = route?.params?.email || "";
  const [kostName, setKostName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [facilities, setFacilities] = useState("");
  const [kostList, setKostList] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) {
      Alert.alert("Error", "Anda harus login terlebih dahulu!");
      return;
    }

    const q = query(collection(db, "kost"), where("ownerEmail", "==", auth.currentUser.email));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKostList(data);
    });

    return () => unsubscribe();
  }, []);

  // Validasi input
  const validateInput = () => {
    if (!kostName || !location || !price || !facilities) {
      return "Harap isi semua field!";
    }
    if (isNaN(price)) {
      return "Harga harus berupa angka!";
    }
    return null;
  };

  // Fungsi untuk menambah kost dengan validasi
  const handleAddKost = withValidation(async () => {
    try {
      await addDoc(collection(db, "kost"), {
        kostName,
        location,
        price: parseInt(price),
        facilities,
        ownerEmail: auth.currentUser.email,
      });
      Alert.alert("Success", "Kost berhasil ditambahkan!");
      setKostName("");
      setLocation("");
      setPrice("");
      setFacilities("");
    } catch (error) {
      console.error("Error menambahkan kost:", error);
      Alert.alert("Error", "Gagal menambahkan kost!");
    }
  }, [validateInput]);

  const deleteKost = async (kostId) => {
    try {
      await deleteDoc(doc(db, "kost", kostId));
      Alert.alert("Success", "Kost berhasil dihapus!");
    } catch (error) {
      console.error("Error menghapus kost:", error);
      Alert.alert("Error", "Gagal menghapus kost!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Penyedia Kost</Text>

      {/* Input Form */}
      <TextInput style={styles.input} placeholder="Nama Kost" value={kostName} onChangeText={setKostName} />
      <TextInput style={styles.input} placeholder="Lokasi Kost" value={location} onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="Harga Kost" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Fasilitas Kost" value={facilities} onChangeText={setFacilities} />

      {/* Tombol Tambah Kost */}
      <TouchableOpacity style={styles.button} onPress={handleAddKost}>
        <Text style={styles.buttonText}>Tambah Kost</Text>
      </TouchableOpacity>

      {/* Daftar Kost */}
      <Text style={styles.subtitle}>Daftar Kost Anda</Text>
      <FlatList
        data={kostList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.kostItem}>
            <Text style={styles.kostName}>{item.kostName}</Text>
            <Text>Lokasi: {item.location}</Text>
            <Text>Harga: {item.price}</Text>
            <Text>Fasilitas: {item.facilities}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteKost(item.id)}>
              <Text style={styles.deleteButtonText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Tombol Lihat Riwayat Pemesanan */}
      <TouchableOpacity style={styles.button} onPress={() => router.push({pathname: "/screens/RiwayatPemesananScreen", params: {email : auth.currentUser.email }})}>
        <Text style={styles.buttonText}>Lihat Riwayat Pemesanan</Text>
      </TouchableOpacity>

      {/* Tombol Kembali */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
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
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  kostItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  kostName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default PenyediaKostScreen;
