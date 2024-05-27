import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput , TouchableOpacity,ImageBackground, ScrollView , Switch} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import App from './App.js';


const Home = (props) => {
  return(
    <ImageBackground
      source={require('./assets/netflix.jpg')}
      style={styles.background}
    >
   <View style={{flex: 0.15, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
  <TouchableOpacity onPress={() => {}}>
    <Text style={{marginRight: 13 , fontSize:19, fontWeight:'bold', color:'white'}}>PRIVACY</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => {props.navigation.navigate("Login")}}>
    <Text style={{marginRight: 10 , fontSize:19, fontWeight:'bold', color:'white'}}>LOG IN</Text>
  </TouchableOpacity>
</View>

      
      <View style={styles.unlimited} >
        <Text style={{width:100, height:200,fontSize:23, fontWeight:'bold', color:'#B736BC'}}>Unlimited Movies, TV shows and more</Text>
      </View>

      <View style={{flex:0.10,alignItems:'center',justifyContent:'center' , marginBottom:80}}>
      <Text style={{fontSize:12, fontWeight:'bold', color:'#2FA88D',
      }}>
        
        Watch anywhere. Cancel anytime</Text>
        

      </View>

    <View style={styles.getStarted }>
    <TouchableOpacity style={styles.getStartedButton} onPress={() => {props.navigation.navigate("SignUp")}}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>  
    </View>
    </ImageBackground>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black'
  },
  unlimited:{
    flex:0.60,
     color:'blue',
     fontSize:32,
     alignItems: 'center',
    // justifyContent: 'center',
    justifyContent:'flex-end'
  },
  getStarted:{
    flex:0.15,
    justifyContent:'flex-end',
    marginBottom:3

  },
  getStartedButton:
  {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  getStartedText:{
    color: 'white',
    fontWeight:'bold',
    fontSize:18,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
});


export default Home;