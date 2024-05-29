
// // // import firebase from 'firebase/compat';


// // // import React, { useState, useEffect } from 'react';
// // // import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
// // // import { useNavigation } from '@react-navigation/native';
// // // import axios from 'axios';
// // // const MyShareScreen = () => {
// // //   const [sharedMovies, setSharedMovies] = useState([]);
// // //   const navigation = useNavigation();

// // //   useEffect(() => {
// // //     const fetchSharedMovies = () => {
// // //       const user = firebase.auth().currentUser;
// // //       if (user) {
// // //         const userId = user.uid;
// // //         const sharedMoviesRef = firebase.firestore().collection('users').doc(userId).collection('shared_movies');
        
// // //         // Listen for changes in the shared movies collection
// // //         const unsubscribe = sharedMoviesRef.onSnapshot(snapshot => {
// // //           const movies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // //           setSharedMovies(movies);
// // //         });

// // //         return unsubscribe;
// // //       }
// // //     };

// // //     const unsubscribe = fetchSharedMovies();

// // //     // Unsubscribe from the snapshot listener when component unmounts
// // //     return () => {
// // //       if (unsubscribe) {
// // //         unsubscribe();
// // //       }
// // //     };
// // //   }, []);

// // //   const renderMovieItem = ({ item }) => (
// // //     <TouchableOpacity onPress={() => navigateToDetails(item)}>
// // //       <View style={styles.movieItem}>
// // //         <Image
// // //           style={styles.poster}
// // //           source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
// // //         />
// // //         <View style={styles.movieDetails}>
// // //           <Text style={styles.movieTitle}>{item.title}</Text>
// // //           <View style={styles.playButton}>
// // //             <Text style={styles.playButtonText}>▶</Text>
// // //           </View>
// // //         </View>
// // //       </View>
// // //     </TouchableOpacity>
// // //   );


// // //   const navigateToDetails = async (movie) => {
// // //     try {
// // //       const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
// // //         params: {
// // //           key: 'AIzaSyAjwfp7NtheyVWVl7DMj2NCYzZ5J9mpahs',
// // //           part: 'snippet',
// // //           type: 'video',
// // //           q: `${movie.title} trailer`,
// // //           maxResults: 1,
// // //         },
// // //       });

// // //       const videoId = response.data.items[0].id.videoId;

// // //       navigation.navigate('MovieDetailsScreen', { videoId, movie });
// // //     } catch (error) {
// // //       console.error('Error navigating to details:', error);
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.header}>Shared Movies</Text>
// // //       <FlatList
// // //         data={sharedMovies}
// // //         renderItem={renderMovieItem}
// // //         keyExtractor={item => item.id}
// // //         contentContainerStyle={styles.list}
// // //       />
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#121212',
// // //   },
// // //   heading: {
// // //     fontSize: 20,
// // //     fontWeight: 'bold',
// // //     color: 'white',
// // //     marginVertical: 10,
// // //     marginLeft: 10,
// // //   },
// // //   list: {
// // //     paddingHorizontal: 16,
// // //   },
// // //   poster: {
// // //     width: 150, // Adjust this value as needed
// // //     height: 275, // Adjust this value as needed
// // //     resizeMode: 'cover',
// // //   },
// // //   movieItem: {
// // //     flexDirection: 'row',
// // //     marginBottom: 16,
// // //   },
// // //   movieImage: {
// // //     width: 100,
// // //     height: 150,
// // //     borderRadius: 8,
// // //   },
// // //   movieInfo: {
// // //     flex: 1,
// // //     marginLeft: 16,
// // //     justifyContent: 'center',
// // //   },
// // //   movieTitle: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     color: 'white',
// // //   },
// // //   movieOverview: {
// // //     fontSize: 14,
// // //     color: 'grey',
// // //     marginTop: 8,
// // //   },
// // //   movieItem: {
// // //     margin: 10,
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //   },
// // //   poster: {
// // //     width: 100,
// // //     height: 150,
// // //     resizeMode: 'cover',
// // //     marginRight: 10,
// // //   },
// // //   movieDetails: {
// // //     flex: 1,
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //   },
// // //   movieTitle: {
// // //     color: 'white',
// // //     flex: 1,
// // //     flexWrap: 'wrap',
// // //   },
// // //   playButton: {
// // //     backgroundColor: 'rgba(255, 255, 255, 0.7)',
// // //     width: 40,
// // //     height: 40,
// // //     borderRadius: 20,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   playButtonText: {
// // //     fontSize: 24,
// // //     color: 'black',
// // //   },
// // //   sectionTitle: {
// // //         color: 'white',
// // //         fontSize: 20,
// // //         fontWeight: 'bold',
// // //         marginLeft: 10,
// // //         marginTop: 10,
// // //       }
// // // });

// // // export default MyShareScreen;


// // import firebase from 'firebase/compat';
// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import axios from 'axios';

// // const MyShare = () => {
// //   const [sharedMovies, setSharedMovies] = useState([]);
// //   const navigation = useNavigation();

// //   useEffect(() => {
// //     const fetchSharedMovies = () => {
// //       const user = firebase.auth().currentUser;
// //       if (user) {
// //         const userId = user.uid;
// //         const sharedMoviesRef = firebase.firestore().collection('users').doc(userId).collection('shared_movies');
        
// //         // Listen for changes in the shared movies collection
// //         const unsubscribe = sharedMoviesRef.onSnapshot(snapshot => {
// //           const uniqueMovies = new Set();
// //           const movies = snapshot.docs.map(doc => {
// //             const movie = { id: doc.id, ...doc.data() };
// //             if (!uniqueMovies.has(movie.id)) {
// //               uniqueMovies.add(movie.id);
// //               return movie;
// //             }
// //             return null;
// //           }).filter(movie => movie !== null);
// //           setSharedMovies(movies);
// //         });

// //         return unsubscribe;
// //       }
// //     };

// //     const unsubscribe = fetchSharedMovies();

// //     // Unsubscribe from the snapshot listener when component unmounts
// //     return () => {
// //       if (unsubscribe) {
// //         unsubscribe();
// //       }
// //     };
// //   }, []);

// //   const renderMovieItem = ({ item }) => (
// //     <TouchableOpacity onPress={() => navigateToDetails(item)}>
// //       <View style={styles.movieItem}>
// //         <Image
// //           style={styles.poster}
// //           source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
// //         />
// //         <View style={styles.movieDetails}>
// //           <Text style={styles.movieTitle}>{item.title}</Text>
// //           <View style={styles.playButton}>
// //             <Text style={styles.playButtonText}>▶</Text>
// //           </View>
// //         </View>
// //       </View>
// //     </TouchableOpacity>
// //   );

// //   const navigateToDetails = async (movie) => {
// //     try {
// //       const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
// //         params: {
// //           key: 'AIzaSyAjwfp7NtheyVWVl7DMj2NCYzZ5J9mpahs',
// //           part: 'snippet',
// //           type: 'video',
// //           q: `${movie.title} trailer`,
// //           maxResults: 1,
// //         },
// //       });

// //       const videoId = response.data.items[0].id.videoId;

// //       navigation.navigate('MovieDetailsScreen', { videoId, movie });
// //     } catch (error) {
// //       console.error('Error navigating to details:', error);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Shared Movies</Text>
// //       <FlatList
// //         data={sharedMovies}
// //         renderItem={renderMovieItem}
// //         keyExtractor={item => item.id}
// //         contentContainerStyle={styles.list}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#121212',
// //   },
// //   heading: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: 'white',
// //     marginVertical: 10,
// //     marginLeft: 10,
// //   },
// //   list: {
// //     paddingHorizontal: 16,
// //   },
// //   poster: {
// //     width: 150, // Adjust this value as needed
// //     height: 275, // Adjust this value as needed
// //     resizeMode: 'cover',
// //   },
// //   movieItem: {
// //     flexDirection: 'row',
// //     marginBottom: 16,
// //   },
// //   movieImage: {
// //     width: 100,
// //     height: 150,
// //     borderRadius: 8,
// //   },
// //   movieInfo: {
// //     flex: 1,
// //     marginLeft: 16,
// //     justifyContent: 'center',
// //   },
// //   movieTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: 'white',
// //   },
// //   movieOverview: {
// //     fontSize: 14,
// //     color: 'grey',
// //     marginTop: 8,
// //   },
// //   movieItem: {
// //     margin: 10,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   poster: {
// //     width: 100,
// //     height: 150,
// //     resizeMode: 'cover',
// //     marginRight: 10,
// //   },
// //   movieDetails: {
// //     flex: 1,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   movieTitle: {
// //     color: 'white',
// //     flex: 1,
// //     flexWrap: 'wrap',
// //   },
// //   playButton: {
// //     backgroundColor: 'rgba(255, 255, 255, 0.7)',
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   playButtonText: {
// //     fontSize: 24,
// //     color: 'black',
// //   },
// //   sectionTitle: {
// //     color: 'white',
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginLeft: 10,
// //     marginTop: 10,
// //   }
// // });

// // export default MyShare;


import firebase from 'firebase/compat';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const MyShare = () => {
  const [sharedMovies, setSharedMovies] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    const fetchSharedMovies = () => {
      console.log('Fetching list of movies...');
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        const sharedMoviesRef = firebase.firestore().collection('users').doc(userId).collection('shared_movies');

        // Listen for changes in the shared movies collection
        const unsubscribe = sharedMoviesRef.onSnapshot(snapshot => {
          const movies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          // Remove duplicates based on youtubeVideoUrl
          const uniqueMovies = Array.from(new Set(movies.map(movie => movie.youtubeVideoUrl)))
                                   .map(url => movies.find(movie => movie.youtubeVideoUrl === url));

         console.log('List of movies:', movies); // Log movies here
          setSharedMovies(uniqueMovies);
        });

        return unsubscribe;
      }
    };

    const unsubscribe = fetchSharedMovies();

    // Unsubscribe from the snapshot listener when component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);


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
      <Text style={styles.heading}>Movies You've Shared</Text>
      <FlatList
        data={sharedMovies}
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

export default MyShare;


// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Share, Button , FlatList} from 'react-native';
// import { useState , useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import YouTubePlayer from 'react-native-youtube-iframe';
// import { firebase } from './firebase'; // Import the Firebase instance

// const MyShare= () => {
//   const [sharedMovies, setSharedMovies] = useState([]);
//   const navigation = useNavigation();

//   // Function to delete a shared movie
//   const deleteSharedMovie = async (movieId) => {
//     try {
//       const user = firebase.auth().currentUser;
//       if (user) {
//         const userId = user.uid;
//         const sharedMoviesRef = firebase.firestore().collection('users').doc(userId).collection('shared_movies');
//         await sharedMoviesRef.doc(movieId).delete();
//         // Refresh the shared movies list after deletion
//         fetchSharedMovies();
//       }
//     } catch (error) {
//       console.error('Error deleting movie:', error);
//     }
//   };

//   useEffect(() => {
//     fetchSharedMovies();
//   }, []);

//   const fetchSharedMovies = () => {
//     const user = firebase.auth().currentUser;
//     if (user) {
//       const userId = user.uid;
//       const sharedMoviesRef = firebase.firestore().collection('users').doc(userId).collection('shared_movies');

//       const unsubscribe = sharedMoviesRef.onSnapshot(snapshot => {
//         const movies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setSharedMovies(movies);
//       });
//     }
//   };

//   const renderMovieItem = ({ item }) => (
//     <TouchableOpacity onPress={() => navigateToDetails(item)}>
//       <View style={styles.movieItem}>
//         <Image
//           style={styles.poster}
//           source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
//         />
//         <View style={styles.movieDetails}>
//           <Text style={styles.movieTitle}>{item.title}</Text>
//           <View style={styles.playButton}>
//             <Text style={styles.playButtonText}>▶</Text>
//           </View>
//           <TouchableOpacity onPress={() => deleteSharedMovie(item.id)}>
//             <Text style={styles.deleteButton}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Shared Movies</Text>
//       <FlatList
//         data={sharedMovies}
//         renderItem={renderMovieItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//     marginVertical: 10,
//     marginLeft: 10,
//   },
//   list: {
//     paddingHorizontal: 16,
//   },
//   poster: {
//     width: 150,
//     height: 275,
//     resizeMode: 'cover',
//   },
//   movieItem: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   movieDetails: {
//     flex: 1,
//     flexDirection: 'column',
//     marginLeft: 16,
//   },
//   movieTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 4,
//   },
//   playButton: {
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   playButtonText: {
//     fontSize: 24,
//     color: 'black',
//   },
//   deleteButton: {
//     color: 'red',
//     fontWeight: 'bold',
//     marginTop: 4,
//   },
// });

// export default MyShare;

