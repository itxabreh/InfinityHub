import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  mostViewedContainer: {
    alignItems: 'center',
    marginVertical: 20,
    height: 400,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
    marginLeft: 10,
  },
  item: {
    margin: 10,
  },
  poster: {
    width: 150, // Adjust this value as needed
    height: 275, // Adjust this value as needed
    resizeMode: 'cover',
  },
  mostViewedPoster: {
    width: 1000,
    height: 390,
    resizeMode: 'contain',
  },
  adultIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red', // Change color as needed
    color: 'white',
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
  },
});

export default styles;
