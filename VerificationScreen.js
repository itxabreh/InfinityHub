import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from './firebase';

const VerificationScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        }
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/applogo-removebg.png')} style={styles.logo} />
        <Text style={styles.logoText}>INFINITY HUB</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome. Please Verify Your Email {name.fullName}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {firebase.auth().signOut()}}>
          <Text style={styles.buttonText}>Go to login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoText: {
    color: 'yellow',
    fontSize: 25,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerificationScreen;
