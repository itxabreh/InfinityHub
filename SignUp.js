import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput , TouchableOpacity,ImageBackground, ScrollView , Switch ,Alert , KeyboardAvoidingView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import VerificationScreen from './VerificationScreen';
// import { color } from 'react-native-elements/dist/helpers';


const SignUp = (props) => {
  const [fullName, setFullName] = useState('');
  // const [confirmpassword, setConfirmpassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  

  const registerUser = async (email, password, fullName) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // Send email verification
          await user.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://fir-login-34c00.firebaseapp.com'
          });
          // Show a message to the user
          Alert.alert(
            'Verification Email Sent',
            'Please check your email to verify your account.'
          );
          // Wait for the user to verify their email
          await user.reload(); // Reload user data to get the latest email verification status
          if (user.emailVerified) {
            // Save user data to Firestore
            await firebase.firestore().collection('users')
              .doc(user.uid)
              .set({
                fullName,
                email
              });
          } else {
            // Email is not yet verified, handle this case if needed
            console.log('Email is not verified yet');
          }
        });
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error registering user:', error);
    }
  };
  
    return (
      // <ScrollView>
      <KeyboardAvoidingView  style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
  {/* top */}
        <View style={styles.top}>
          <Text style={styles.netflix}> INFINITY HUB</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={{fontWeight:'bold',
      fontSize:20,paddingTop:8,paddingRight:10 , color:'white'  } }>Sign In</Text>
          </TouchableOpacity>
        </View>
  

  {/* center */}
  
        <View style={styles.center}>
          <Text style={{ fontSize:27 , alignItems:'center', justifyContent:'center' ,color:'white'}}>    Create an account to start {"\n"}    your journey </Text>
        <Text style={{color:'white'}}> {"\n"}Just a few more steps and you're done! {"\n"}
         We hate paperwork, too. {"\n"}</Text> 
          {/* <TextInput style={styles.FullName} placeholder = 'Full Name' > </TextInput> */}

          <TextInput style={styles.inputPassword} placeholder = '  Full Name' 
          onChangeText={(fullName) => setFullName(fullName)}
          
          ></TextInput>

          <TextInput style={styles.inputPassword} placeholder = '  Email'
          onChangeText={(email) => setEmail(email)}
          autoCapitalize='none'
          keyboardType='email-address'
          ></TextInput>

  
          <TextInput style={styles.inputPassword} placeholder = '  Password'
          onChangeText={(password) => setPassword(password)} autoCapitalize='none' secureTextEntry={true}
          ></TextInput>
          {/* <TextInput style={styles.inputEmail} placeholder = 'Email' > </TextInput> */}

        </View>
  
  <View style={styles.center2}>
  
  <TouchableOpacity style={styles.button} onPress={() => registerUser(email,password,fullName)}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>   

          <TouchableOpacity style={styles.forgetbutton} onPress={() => props.navigation.navigate("Login")}>
          <Text style={styles.forgetbuttonText}>Already Have An Account? Go To Login</Text>
        </TouchableOpacity>     
  </View>
{/* 
        <StatusBar style="auto" /> */}
  
      </View>
      </ScrollView>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
      // {/* </ScrollView> */}
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'black'
    },
    scrollContainer: {
      backgroundColor:'black'

    },
    top:
    {
      paddingTop:10,
        // backgroundColor:'white',
        flex: 0.20,
        flexDirection:'row',
        justifyContent:"space-between"
        // alignItems:'center'
    },
    netflix:
    {
      // paddingLeft:10,
      color:'yellow',
      fontWeight:'bold',
      fontSize:30
    },
    center:
    {
      // backgroundColor:'white',
      flex: 0.35,
      paddingTop:50,
      alignItems:'center',
      justifyContent:'center'    },
    FullName:
    {
      backgroundColor:'green',
      width:230,
      height:50,
      // marginTop:2,
    },
    inputEmail:
    {
      backgroundColor:'grey',
      width:230,
      height:50,  
      marginTop:2,
    
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
      fontWeight:'bold'
    },
    inputPassword:
    {
      marginBottom:7,
       backgroundColor:'gray',
      width:230,
      height:50,    
      borderWidth:0.5, 
      borderRadius:1 ,
      borderColor:'grey',
    },
    center2:
    {
      marginTop:40,
       flex:0.30,
       justifyContent:'center',
       alignItems:'center'
    },
    
    button: {
      width: 200, // Define the width of the TouchableOpacity
      height: 40, // Define the height of the TouchableOpacity
      marginTop: 20, // Add marginTop for space
      alignItems: 'center', // Center content horizontally
      justifyContent: 'center', // Center content vertically
      backgroundColor:'yellow'
      },
    buttonText:
    {
      color: 'black', 
      fontSize: 19, 
    },
  
    memberbutton: {
      color:'red',
      height: 40, 
      marginTop: 40, // Add marginTop for space
      borderRadius: 5, // Border radius for rounded corners,
      marginLeft:36
  },
    memberbuttonText: {
      color: 'black', // Text color of the button
      fontSize: 15.3, // Font size of the button text
      fontWeight: 'bold' // Font weight of the button text
    },
    
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    }
  });
  
  
export default SignUp;