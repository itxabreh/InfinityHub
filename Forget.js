import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { firebase } from './firebase';

const Forget = (props) => {
  const [email, setEmail] = useState('');

  const resetPassword = async (email) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      Alert.alert(
        'Password Reset Email Sent',
        'Please check your email to reset your password.'
      );
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error resetting password:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.top}>
          <Text style={styles.netflix}>INFINITY HUB</Text>
        </View>

        <View style={styles.center}>
          <Text style={styles.headerText}>Reset Your Password</Text>
          <Text style={styles.subHeaderText}>
            Enter your email address below and we'll send you a link to reset your password.
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor="white"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize='none'
            keyboardType='email-address'
          />
        </View>

        <View style={styles.center2}>
          <TouchableOpacity style={styles.button} onPress={() => resetPassword(email)}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  netflix: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 30,
  },
  center: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 27,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'grey',
    color: 'white',
    width: '100%',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  center2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 5,
    backgroundColor: 'yellow',
  },
  buttonText: {
    color: 'black',
    fontSize: 19,
  },
});

export default Forget;
