import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput , Platform, TouchableOpacity,ImageBackground, ScrollView , Switch , SafeAreaView , KeyboardAvoidingView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'; // Importing correct functions from Firebase SDK
import {AsyncStorage} from 'react-native';
import {auth} from './firebase';

// import {createUserWithEmailAndPassword , signInWithEmailAndPassword , signInAnonymously , onAuthStateChanged} from 'firebase/auth'
const Previouslogin = (props) => {
    
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const handleSignUp = async () =>{

    await createUserWithEmailAndPassword(auth , email , password)
  //   if (email === 'admin' && password === 'admin') {
  //     // Navigate to admin screen
  //     navigation.navigate('AdminScreen');
  // } else {
  //     // Navigate to regular user screen
  //     navigation.navigate('Extra');
  // }
     .then((userCredential) =>{
        const user = userCredential.user;
        console.log("user data" , user);
        props.navigation.navigate('Extra')
    }
    )
    .catch((error) =>{
        console.log("error code : " , error.code);
        console.log("error code : " , error.message);
    })
  };
    return (
      // <ScrollView>
      <View style={styles.container}>
  {/* top */}
        <View style={styles.top}>
          <Text style={styles.netflix}> NETFLIX</Text>
        </View>
  
  {/* center */}
  {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}

        <View style={styles.center}>

          
          <TextInput style={styles.inputEmail} placeholder = 'Email' value={email} onChangeText={setEmail}>
            
          </TextInput>
  
          <TextInput style={styles.inputPassword} placeholder = 'Password' value={password} onChangeText={setPassword}></TextInput>
         
        </View>
        {/* </KeyboardAvoidingView> */}
  <View style={styles.center2}>
  
  <TouchableOpacity style={styles.button} onPress={() => {handleSignUp()}}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
  
  
          <TouchableOpacity style={styles.memberbutton} onPress={() => {}}>
            <Text style={styles.memberbuttonText}>Not a member yet? Start your membership!</Text>
          </TouchableOpacity>        
  </View>
  {/* bottom */}
        <View style={styles.bottom}>
        {/* <TouchableOpacity style={styles.forgetbutton} onPress={navigateToHome}>
          <Text style={styles.forgetbuttonText}>Forgot Your Password?</Text>
        </TouchableOpacity>           */}
  
      <TouchableOpacity style={styles.forgetbutton} onPress={() => {  }}>
            <Text style={styles.forgetbuttonText}>Forgot Your Password?</Text>
          </TouchableOpacity> 
        </View>
  
        <StatusBar style="auto" />
  
      </View>
      // {/* </ScrollView> */}
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'black'
    },
    top:
    {
        // backgroundColor:'white',
        flex: 0.40,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    netflix:
    {
      paddingTop:180,
      paddingLeft:65,
      color:'red',
      fontWeight:'bold',
      fontSize:55
    },
    center:
    {
      // backgroundColor:'white',
      flex: 0.15,
      paddingTop:50,
      paddingLeft:72,
    },
    inputEmail:
    {
      backgroundColor:'grey',
      width:230,
      height:50,      
    },
    inputPassword:
    {
      marginTop:2,
      backgroundColor:'gray',
      width:230,
      height:50,      
    },
    center2:
    {
       flex:0.22
    },
    bottom:
    {
      // backgroundColor:'white',
      flex: 0.20
      },
   
    button: {
      width: 230, // Define the width of the TouchableOpacity
      height: 40, // Define the height of the TouchableOpacity
      marginTop: 20, // Add marginTop for space
      alignItems: 'center', // Center content horizontally
      justifyContent: 'center', // Center content vertically
      borderWidth: 1, // Add border width
      borderColor: 'grey', // Add border color
      borderRadius: 5, // Border radius for rounded corners,
      marginLeft:72
  },
    buttonText: {
      color: 'grey', // Text color of the button
      fontSize: 16, // Font size of the button text
      fontWeight: 'bold' // Font weight of the button text
    },
  
    memberbutton: {
  
      height: 40, // Define the height of the TouchableOpacity
      marginTop: 40, // Add marginTop for space
      borderRadius: 5, // Border radius for rounded corners,
      marginLeft:36
  },
    memberbuttonText: {
      color: 'white', // Text color of the button
      fontSize: 15.3, // Font size of the button text
      fontWeight: 'bold' // Font weight of the button text
    },
    forgetbutton: {
  
      height: 40, // Define the height of the TouchableOpacity
      // marginTop: 40, // Add marginTop for space
      borderRadius: 5, // Border radius for rounded corners,
      alignItems:'center',
  },
    forgetbuttonText: {
      color: 'grey', // Text color of the button
      fontSize: 15.3, // Font size of the button text
      fontWeight: 'light' // Font weight of the button text
    },
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    }
  });
  
  
export default Previouslogin;