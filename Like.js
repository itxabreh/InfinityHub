// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
// import { firebase } from './firebase'; // Import the Firebase instance

// const Like = () => {
//     const [myLikeMovies, setMyLikeMovies] = useState([]);

//   useEffect(() => {
//     const fetchMyListMovies = () => {
//       console.log('Fetching list of movies...');
//       const user = firebase.auth().currentUser;
//       if (user) {
//         const userId = user.uid;
//         const myListRef = firebase.firestore().collection('users').doc(userId).collection('my_like');

//         // Listen for changes in the My List movies collection
//         const unsubscribe = myListRef.onSnapshot(snapshot => {
//           const movies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//           // Remove duplicates based on youtubeVideoUrl
//           const uniqueMovies = Array.from(new Set(movies.map(movie => movie.youtubeVideoUrl)))
//                                    .map(url => movies.find(movie => movie.youtubeVideoUrl === url));
//             setMyLikeMovies(uniqueMovies);
//         });

//         return unsubscribe;
//       }
//     };

//     const unsubscribe = fetchMyListMovies();

//     // Unsubscribe from the snapshot listener when component unmounts
//     return () => {
//       if (unsubscribe) {
//         unsubscribe();
//       }
//     };
//   }, []);

//   const addToLike = async (movie) => {
//     try {
//       const user = firebase.auth().currentUser;
//       if (user) {
//         const userId = user.uid;
//         const myLikeRef = firebase.firestore().collection('users').doc(userId).collection('my_list');

//         // Check if the movie already exists in the list
//         const existingMovie = myLikeMovies.find(item => item.youtubeVideoUrl === movie.youtubeVideoUrl);
//         if (existingMovie) {
//           Alert.alert('Already Added', 'This movie is already in your liked list.');
//           return;
//         }

//         // Add the movie to the list
//         await myLikeRef.add({
//           title: movie.title,
//           overview: movie.overview,
//           youtubeVideoUrl: movie.youtubeVideoUrl,
//           poster_path: movie.poster_path,
//         });
//       }
//     } catch (error) {
//       console.error('Error adding movie to list:', error);
//     }
//   };

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { firebase } from './firebase'; // Import the Firebase instance
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const Like = () => {
    const [myLikeMovies, setMyLikeMovies] = useState([]);
    const navigation = useNavigation();

  useEffect(() => {
    const fetchMyLikeMovies = () => {
      console.log('Fetching list of liked movies...');
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        const myLikeRef = firebase.firestore().collection('users').doc(userId).collection('my_like');

        // Listen for changes in the Liked movies collection
        const unsubscribe = myLikeRef.onSnapshot(snapshot => {
          const movies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          // Remove duplicates based on youtubeVideoUrl
          const uniqueMovies = Array.from(new Set(movies.map(movie => movie.youtubeVideoUrl)))
                                   .map(url => movies.find(movie => movie.youtubeVideoUrl === url));
            setMyLikeMovies(uniqueMovies);
        });

        return unsubscribe;
      }
    };

    const unsubscribe = fetchMyLikeMovies();

    // Unsubscribe from the snapshot listener when component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const addToLike = async (movie) => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        const myLikeRef = firebase.firestore().collection('users').doc(userId).collection('my_like');

        // Check if the movie already exists in the list
        const existingMovie = myLikeMovies.find(item => item.youtubeVideoUrl === movie.youtubeVideoUrl);
        if (existingMovie) {
          Alert.alert('Already Liked', 'This movie is already in your liked list.');
          return;
        }

        // Add the movie to the list
        await myLikeRef.add({
          title: movie.title,
          overview: movie.overview,
          youtubeVideoUrl: movie.youtubeVideoUrl,
          poster_path: movie.poster_path,
        });
      }
    } catch (error) {
      console.error('Error adding movie to liked list:', error);
    }
  };
  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)}>
      <View style={styles.movieItem}>
        <Image
          style={styles.poster}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
        />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <View style={styles.playButton}>
            <Text style={styles.playButtonText}>▶</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const navigateToDetails = async (movie) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyAjwfp7NtheyVWVl7DMj2NCYzZ5J9mpahs',
          part: 'snippet',
          type: 'video',
          q: `${movie.title} trailer`,
          maxResults: 1,
        },
      });

      const videoId = response.data.items[0].id.videoId;

      navigation.navigate('MovieDetailsScreen', { videoId, movie });
    } catch (error) {
      console.error('Error navigating to details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Movies You've Liked</Text>
      <FlatList
        data={myLikeMovies}
        renderItem={renderMovieItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      marginVertical: 10,
      marginLeft: 10,
    },
    list: {
      paddingHorizontal: 16,
    },
    poster: {
      width: 150, // Adjust this value as needed
      height: 275, // Adjust this value as needed
      resizeMode: 'cover',
    },
    movieItem: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    movieImage: {
      width: 100,
      height: 150,
      borderRadius: 8,
    },
    movieInfo: {
      flex: 1,
      marginLeft: 16,
      justifyContent: 'center',
    },
    movieTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    movieOverview: {
      fontSize: 14,
      color: 'grey',
      marginTop: 8,
    },
    movieItem: {
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    poster: {
      width: 100,
      height: 150,
      resizeMode: 'cover',
      marginRight: 10,
    },
    movieDetails: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    movieTitle: {
      color: 'white',
      flex: 1,
      flexWrap: 'wrap',
    },
    playButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    playButtonText: {
      fontSize: 24,
      color: 'black',
    },
    sectionTitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
      marginTop: 10,
    }
  });
  
  export default Like;