import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput , TouchableOpacity,ImageBackground, ScrollView , Switch} from 'react-native';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Extra from './Extra';
import Extra2 from './Extra2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import YouTubePlayerScreen from './YouTubePlayerScreen';
import MovieDetailsScreen from './MovieDetailsScreen';
import Previouslogin from './Previouslogin';
import SearchScreen from './SearchScreen';
import NewAndHot from './NewAndHot';
import MyAccountScreen from './MyAccountScreen';
import BottomNavigationBar from './BottomNavigationBar';

const Stack = createNativeStackNavigator();
const App = () =>{
 
  return(
    <NavigationContainer>
      <Stack.Navigator >
      {/* <Stack.Screen name = "Previouslogin" component = {Previouslogin}/> */}
      {/* initialRouteName="ContactsScreen" // Change initial route name to ContactsScreen */}

      <Stack.Screen name = "Home" component = {Home} options={{headerShown:false}}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{headerTintColor:'white' , headerStyle:{backgroundColor:'black'},
       headerTitle:'' ,headerLeft: () => (
        <Image
          source={require('./assets/applogo-removebg.png')} 
          style={{ width: 40, height: 40, }} 
        />
      )}}/>
        <Stack.Screen name = "Login" component = {Login}
        //  options={{title:"" ,
        // headerStyle:{backgroundColor:'black' }
        // }}
        options={{headerShown:false}}
        />

{/* <Stack.Screen name = "Previouslogin" component = {Previouslogin}/> */}


<Stack.Screen name = "Extra" component = {Extra} options={{headerTintColor:'white' , headerStyle:{backgroundColor:'black'},
       headerTitle:'' ,headerLeft: () => (
        <Image
          source={require('./assets/applogo-removebg.png')} 
          style={{ width: 40, height: 40, }}
        />
      )}}/>
<Stack.Screen name = "Extra2" component = {Extra2}/>

       <Stack.Screen name = "YouTubePlayerScreen" component = {YouTubePlayerScreen}/>
       <Stack.Screen name = "MovieDetailsScreen" component = {MovieDetailsScreen} options={{headerTintColor:'white' , headerStyle:{backgroundColor:'black'},
       headerTitle:'' ,headerRight: () => (
        <Image
          source={require('./assets/applogo-removebg.png')}
          style={{ width: 40, height: 40, marginRight: 2 }} 
        />
      ),
       } } />
       

       <Stack.Screen name='SearchScreen' component={SearchScreen} />
       <Stack.Screen name='NewAndHot' component={NewAndHot} />
       <Stack.Screen name='MyAccountScreen' component={MyAccountScreen} />
       <Stack.Screen name='BottomNavigationBar' component={BottomNavigationBar} />

      </Stack.Navigator>


    </NavigationContainer>

  )

};

export default App;