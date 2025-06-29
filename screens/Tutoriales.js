import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';

export default function Home({ navigation }) {
  const { user } = useContext(AuthContext);
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Sesión cerrada');
        navigation.replace('Login'); 
      })
      .catch((error) => {
        console.log('Error al cerrar sesión', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      {user ? (
        <>
          <Text style={styles.text}>UID: {user.uid}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
        </>
      ) : (
        <Text style={styles.text}>Cargando usuario...</Text>
      )}

   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  signOutButton: {
    marginTop: 30,
    backgroundColor: '#E74C3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  signOutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
