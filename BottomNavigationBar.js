import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNavigationBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNavigationBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Extra')}>
        <Text style={styles.bottomNavItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
        <Text style={styles.bottomNavItem}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('NewAndHot')}>
        <Text style={styles.bottomNavItem}>New & Hot</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyAccountScreen')}>
        <Text style={styles.bottomNavItem}>My Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 20,
  },
  bottomNavItem: {
    color: 'white',
    fontSize: 16,
  },
});

export default BottomNavigationBar;
