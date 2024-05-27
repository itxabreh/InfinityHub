import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput , TouchableOpacity,ImageBackground, ScrollView , Switch} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';

import Asyncstorage from '@react-native-async-storage/async-storage';

const Extra2 = ({ navigation }) => { // Add navigation as a prop
    console.log('Extra2 top area')
  
      const [isEnabled, setIsEnabled] = useState(global.mode)
  
      const toggleSwitch = () => {
          console.log('Away toggle switch')
  
          console.log('global.mode before : ', global.mode)
          setIsEnabled((previousState) => !previousState)
          global.mode = !global.mode
          console.log('global.mode after : ', global.mode)        
      }
  
      useEffect(() => {
          console.log('Extra2 useEffect\n')
          return () => {
              console.log('Extra2 useEffect return\n')
              // console.log('Going Back');
          }
      }, [])
  
      const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isEnabled ? '#478db2' : 'white',
        },
        rowContainer: {
            flex: 0.5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        text: {
            marginRight: 50,
            fontSize: 24,
        },
        button: {
            marginLeft: 10,
        },
        backText: {
            fontSize: 24,
        },
    });
  
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>Dark Mode</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <TouchableOpacity style={styles.button} onPress={toggleSwitch}>
                    <Text style={styles.text}>{isEnabled ? 'Yes' : 'No'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Extra')}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
  
  export default Extra2;