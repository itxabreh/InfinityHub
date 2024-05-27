import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Alert ,ImageBackground , TouchableOpacity } from 'react-native';
//import axios from 'axios';
import PostHook from './PostHook';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const { signin } = PostHook();
    
    // const handleSignIn = () => {
    //  signin(email, password); 
    // };

    //signin button press firebase handling
    const handleSignIn = () => {
       

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User signed in successfully
                console.log('User signed in successfully', userCredential.user.uid);
                // Alert.alert('Sign In Successful');
                
                // Navigate to the next screen or perform any action after successful sign-in
                if(password=='adminadmin' && email == 'admin1@gmail.com'){
                    console.log("VIP")
                    navigation.navigate('SignUp')
        
                }
                else{
                    console.log("regular")
                    navigation.replace('Home1')
        
                }
                
            })
            .catch((error) => {
                console.error('Sign in failed:', error.message);
                Alert.alert('Sign In Failed', error.message);
            });
    };

    const OnPressButtonCreateAccount = () => {
        navigation.navigate('SignUp');
    }


    // const signIn = () => {
        // const signInParams = {
        //     email: email,
        //     password: password
        // };

        // axios.post('https://dev.iqrakitab.net/api/login', signInParams, {
        //     headers: {
        //         Accept: 'application/json',
        //     },
        // })
        //     .then((response) => {
        //         console.log('Sign in successful:', response.data);
        //         Alert.alert('Sign In Successful');
        //         // Redirect to next screen or perform any action after successful signin
        //     })
        //     .catch((error) => {
        //         console.error('Sign in failed:', error.response.data.message);
        //         Alert.alert('Sign In Failed', error.response.data.message);
        //     });
       
    // };

    return (
        <ImageBackground source={require('./assets/back2.png')} style={styles.container}>
            <View style = {{alignItems:'center',justifyContent:'center' }}>
            <Text style = {{color:'#00FFFF',fontSize:25 ,marginTop: -180}} > Welcome Back! </Text>
            </View>
            <View style = {{alignItems:'center',justifyContent:'center' }} >
            <Text style = {{color:'#00FFFF',fontSize:13,marginTop: -120 }} > Sign in to continue </Text>
            </View>
           
            <TextInput
                value={email}
                placeholder={'Email'}
                placeholderTextColor={'white'}
                style={styles.input}
                onChangeText={ setEmail}
            />
            <TextInput
                value={password}
                placeholder={'Password'}
                placeholderTextColor={'white'}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={setPassword}
            />
            {/* <Button style={{fontSize:17}} color={'darkgrey'} onPress={handleSignIn} title="Sign In" /> */}
            <TouchableOpacity  style = {{ borderRadius:30,marginTop:10,backgroundColor:'#00FFFF' , width : 270, marginLeft:25 , marginTop:40}} onPress={handleSignIn} >
                <Text style={{paddingLeft : 84, fontSize:30  ,  color:'#212F3C'}}>SIGN IN</Text>
                
            </TouchableOpacity>
            <TouchableOpacity  style = {{borderRadius:30, backgroundColor:'#00FFFF' ,marginTop:10 , alignContent:'center',justifyContent:'center' ,width:270,marginLeft:27}} onPress={OnPressButtonCreateAccount} >
            <Text style ={{color:'white' ,fontSize:30 , paddingLeft:30 , color:'#212F3C',  }} >Create Account</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
    }

const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent:'center',
        marginTop: -20
     },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#00FFFF',
        borderRadius: 3,
        marginBottom: 10,
        color:'white',
        fontSize:17,
    },
});