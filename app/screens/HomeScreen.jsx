import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';

const HomeScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const { userType } = route.params || {};

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = async () => {
    await firebase.auth().signOut();
    navigation.navigate('LoginOptions');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user ? user.email : 'Guest'}!</Text>

      {userType === 'Pencari Kost' ? (
        <View style={styles.contentContainer}>
          <Text style={styles.userTypeText}>You are a Pencari Kost!</Text>
          <Button title="Find Kost" onPress={() => navigation.navigate('SearchKost')} />
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : userType === 'Penyedia Kost' ? (
        <View style={styles.contentContainer}>
          <Text style={styles.userTypeText}>You are a Penyedia Kost!</Text>
          <Button title="Manage Kost" onPress={() => navigation.navigate('ManageKost')} />
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <Text style={styles.userTypeText}>User type not recognized</Text>
      )}
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentContainer: {
    width: '80%',
    alignItems: 'center',
  },
  userTypeText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
});

export default HomeScreen;