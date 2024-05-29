import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput , TouchableOpacity,ImageBackground, ScrollView , Switch} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import VerificationScreen from './VerificationScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { firebase } from './firebase';
import AppSettings from './AppSettings';
import Account from './Account';
import Help from './Help';
import MovieDetailsSecondPart from './MovieDetailsSecondPart';
import MyShare from './MyShare';
import Mylist from './Mylist';
import Like from './Like';
import Forget from './Forget';
import Privacy from './Privacy';
import MyCustomHook from './MyCustomHook';
import styles from './styles';
import CustomButton from './CustomButton';
import Type from './Type'
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return(
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen name='Home' component={Extra} options={{headerTintColor:'white' , headerStyle:{backgroundColor:'black'},
       headerTitle:'' ,headerLeft: () => (
        <Image
          source={require('./assets/applogo-removebg.png')} 
          style={{ width: 40, height: 40, }}
        />
      ) ,tabBarLabel: 'Home',
      tabBarIcon: ({ focused }) => (
        <Image
          source={require('./assets/home.jpeg')}
          style={{ width: 30, height: 30 }}
        />
      ),}}/> 
      <Tab.Screen name='Search' component={SearchScreen} options={{
      tabBarIcon: ({ focused }) => (
        <Image
          source={require('./assets/search.jpeg')}
          style={{ width: 30, height: 30 }}
        />
      ),
      headerShown: false }}/>
      {/* <Tab.Screen name='New & Hot' component={NewAndHot} options={{
      tabBarIcon: ({ focused }) => (
        <Image
          source={require('./assets/newandhot.jpeg')}
          style={{ width: 30, height: 30 }}
        />
      ),}}/> */}
      <Tab.Screen name='MyAccount' component={MyAccountScreen} options={{
      tabBarIcon: ({ focused }) => (
        <Image
          source={require('./assets/myaccount.png')}
          style={{ width: 30, height: 30 }}
        />
      ),
      headerShown:false}}/>
    </Tab.Navigator>
  );
}

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
 
  // useEffect(() =>{
  //   const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // },[]);

  // function onAuthStateChanged(user){
  //   setUser(user);
  //   if(initializing) setInitializing(false);
  // }

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user from AsyncStorage', error);
      } finally {
        setInitializing(false);
      }
    };
    loadUser();

    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  const onAuthStateChanged = async (user) => {
    setUser(user);
    if (user) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem('user');
    }
    if (initializing) setInitializing(false);
  };


  if (initializing) return null;

  if (user && !user.emailVerified) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="VerificationScreen" component={VerificationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerTintColor: 'white', headerStyle: { backgroundColor: 'black' }, headerTitle: '', headerLeft: () => (
              <Image
                source={require('./assets/applogo-removebg.png')}
                style={{ width: 40, height: 40 }}
              />
            )}} />
           <Stack.Screen name="Forget" component={Forget}  options={{ headerTintColor: 'white', headerStyle: { backgroundColor: 'black' }, headerTitle: 'Forget Password ?'}}/>
           <Stack.Screen name="Privacy" component={Privacy} options={{ headerTintColor: 'white', headerStyle: { backgroundColor: 'black' }, headerTitle: 'Privacy Policy'}} />
          </>
        ) : (
          <>
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} /> 
            <Stack.Screen name="Extra2" component={Extra2} />
            <Stack.Screen name="YouTubePlayerScreen" component={YouTubePlayerScreen} />
            <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} options={{ headerTintColor: 'white', headerStyle: { backgroundColor: 'black' }, headerTitle: '', headerRight: () => (
              <Image
                source={require('./assets/applogo-removebg.png')}
                style={{ width: 40, height: 40, marginRight: 2 }}
              />
            )}} />
            <Stack.Screen name="MovieDetailsSecondPart" component={MovieDetailsSecondPart} options={{ headerTintColor: 'white', headerStyle: { backgroundColor: 'black' }, headerTitle: '', headerRight: () => (
              <Image
                source={require('./assets/applogo-removebg.png')}
                style={{ width: 40, height: 40, marginRight: 2 }}
              />
            )}} />
            <Stack.Screen name="MyCustomHook" component={MyCustomHook} options={{ headerShown: false }} /> 
            <Stack.Screen name="AppSettings" component={AppSettings} options={{ headerShown: false }} /> 
            <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} /> 
            <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} /> 
            <Stack.Screen name="MyShare" component={MyShare}  options={{ headerTintColor: 'white', headerStyle: { backgroundColor: 'black' }, headerTitle: 'Shared'}}/>
            <Stack.Screen name="Mylist" component={Mylist}  options={{ headerTintColor: 'white', headerStyle: { backgroundColor: 'black' }, headerTitle: 'My List'}}/>
            <Stack.Screen name="Like" component={Like}  options={{ headerTintColor: 'white', headerStyle: { backgroundColor: 'black' }, headerTitle: 'Liked'}}/>
            <Stack.Screen name="Forget" component={Forget}  options={{ headerTintColor: 'white', headerStyle: { backgroundColor: 'black' }, headerTitle: 'Forget Password ?'}}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


