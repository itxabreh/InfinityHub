import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity, ImageBackground, ScrollView, Switch , Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { firebase } from './firebase';
import VerificationScreen from './VerificationScreen';
import { useNavigation } from '@react-navigation/native';


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // const handleSignUp = async (email,password) => {
  //   try {
  //     // Proceed with regular email/password authentication
  //     await firebase.auth().signInWithEmailAndPassword(email, password);
  
  //     const currentUser = firebase.auth().currentUser;
  
  //     // if (currentUser && !currentUser.emailVerified) {
  //     //   Alert.alert(
  //     //     "Email Not Verified",
  //     //     "You have not verified your email. Kindly verify it.",
  //     //     [
  //     //       { text: "OK", onPress: () => console.log("OK Pressed") }
  //     //     ],
  //     //     { cancelable: false }
  //     //   );
  //     //   return;
  //     // }
  
  //     // User is verified or there's no user, navigate accordingly
  //     if (currentUser) {
  //       navigation.navigate('Tabs');
  //     } else {
  //       // Handle the case where there's no user
  //       console.log("No user found");
  //     }
  //   } catch (error) {
  //     console.error("Error login :", error);
  //     // Handle the error gracefully, e.g., show an error message to the user
  //   }
  // };
  
  const handleSignUp = async (email, password) => {
    try {
      // Proceed with regular email/password authentication
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
  
      // Access the user object from userCredential
      const user = userCredential.user;
  
      // Check if there's a current user and the email is verified
      if (user && user.emailVerified) {
        // If the user is verified, navigate to the Tabs screen
        navigation.navigate('Tabs');
      } else if (user && !user.emailVerified) {
        // If the user is not verified, show an alert
        Alert.alert(
          "Email Not Verified",
          "You have not verified your email. Kindly verify it.",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      } else {
        // Handle the case where there's no user
        console.log("No user found");
      }
    } catch (error) {
      console.error("Error login:", error);
      // Handle the error gracefully, e.g., show an error message to the user
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.netflix}>INFINITY HUB</Text>
      </View>

      <View style={styles.center}>
        <TextInput
          style={styles.inputEmail}
          placeholder='Email'
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.inputPassword}
          placeholder='Password'
          value={password}
          onChangeText={(password) => setPassword(password)}
          autoCapitalize='none'
          secureTextEntry={true}
        />
      </View>

      <View style={styles.center2}>
        <TouchableOpacity style={styles.button} onPress={() => handleSignUp(email, password)}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.memberbutton} onPress={() => props.navigation.navigate("SignUp")}>
          <Text style={styles.memberbuttonText}>Not a member yet? Start your membership!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgetbutton} onPress={() => { }}>
          <Text style={styles.forgetbuttonText}>Forgot Your Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        {/* <TouchableOpacity style={styles.forgetbutton} onPress={() => { }}>
          <Text style={styles.forgetbuttonText}>Forgot Your Password?</Text>
        </TouchableOpacity> */}
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  top: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  netflix: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 40,
  },
  center: {
    flex: 0.2,
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  inputEmail: {
    backgroundColor: 'grey',
    width: 250,
    height: 50,
    paddingHorizontal: 10,
    // borderRadius: 5,
    marginBottom: 15,
  },
  inputPassword: {
    backgroundColor: 'grey',
    width: 250,
    height: 50,
    paddingHorizontal: 10,
    // borderRadius: 5,
  },
  center2: {
    flex: 0.2,
    alignItems: 'center',
    marginTop:40
    // justifyContent: 'space-around',
  },
  button: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    // borderRadius: 5,
    marginBottom: 15,
    backgroundColor:'yellow'
  },
  buttonText: {
    color: 'black',
    fontSize: 19,
  },
  memberbutton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberbuttonText: {
    color: 'white',
    fontSize: 15.3,
    fontWeight: 'bold',
  },
  bottom: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetbutton: {
    height: 40,
    justifyContent: 'center',
    paddingTop:20
    // alignItems: 'center',
  },
  forgetbuttonText: {
    color: 'grey',
    fontSize: 15.3,
  },
});

export default Login;