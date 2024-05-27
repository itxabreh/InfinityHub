import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput , TouchableOpacity,ImageBackground, ScrollView , Switch, SafeAreaView , Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { firebase } from './firebase';

const VerificationScreen = () => {
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object

  const [name , setName] = useState('');

  useEffect(() => {

    const currentUser = firebase.auth().currentUser;
    // if (currentUser && !currentUser.emailVerified) {
    //   Alert.alert(
    //     "Email Not Verified",
    //     "You have not verified your email. Kindly verify it.",
    //     [
    //       { text: "OK", onPress: () => console.log("OK Pressed") }
    //     ],
    //     { cancelable: false }
    //   );
    // }

    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get() 
    .then((snapshot) => {
      if(snapshot.exists){
        setName(snapshot.data())
      }
      else{
        // console.log("user does not exist");
      }
    })
  }, []) // Add empty dependency array to useEffect to run it only once

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:15 , }}>Hello , {name.fullName}</Text>

      <TouchableOpacity style={styles.button} onPress={() =>  {firebase.auth().signOut()}}> 
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black'
  },
  button: {
    width: 230, // Define the width of the TouchableOpacity
    height: 40, // Define the height of the TouchableOpacity
    marginTop: 20, // Add marginTop for space
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    // borderWidth: 1, // Add border width
    // borderColor: 'grey', // Add border color
    // borderRadius: 5, // Border radius for rounded corners,
backgroundColor:'yellow'  },
  buttonText: {
    color: 'black', // Text color of the button
    fontSize: 19, // Font size of the button text
    // fontWeight: 'bold' // Font weight of the button text
  },

});
export default VerificationScreen;
