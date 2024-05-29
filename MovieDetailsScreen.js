// // // MovieDetailsScreen.js
// // import React from 'react';
// // import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
// // import YouTubePlayer from 'react-native-youtube-iframe';

// // const MovieDetailsScreen = ({ route }) => {
// //   const { videoId, movie } = route.params;
 
// //   return (
// //     <View style={styles.container}>
// //       <YouTubePlayer videoId={videoId} height={250} 
// //       play={true}
// //       onChangeState={event => console.log(event)}
// //       onReady={() => console.log("Ready")}
// //       onError={error => console.log(error)}
// //       />
// //       <View style={styles.detailsContainer}>

// //         <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
// //         <TouchableOpacity >
// //         <Image source={require('./assets/plusicon.png')} style={{height:30,width:30}}/>
// //             <Text style={{color:'white'}}>My list</Text>
            
         
            
// //           </TouchableOpacity>
// //           <TouchableOpacity >
// //              <Image source={require('./assets/likeicon.png')} style={{height:30,width:30}}/>
// //              <Text style={{color:'white'}}>Rate</Text>
            
// //           </TouchableOpacity>
          
// //           <TouchableOpacity >
// //             <Image source={require('./assets/shareicon.png')} style={{height:30,width:30}}/>
// //             <Text style={{color:'white'}}>Share</Text>
            
// //           </TouchableOpacity>

// //           <TouchableOpacity >
// //             <Image source={require('./assets/downloadicon.png')} style={{height:30,width:30}}/>
// //             <Text style={{color:'white'}}>Download</Text>
            
// //           </TouchableOpacity>
          
// //         </View>
// //         <Text style={styles.title}>{movie.title}</Text>
// //         <Text style={styles.overview} >{movie.overview}</Text>
// //         <Text style={styles.overview}>{"\n"}Popularity: {movie.popularity}</Text>
// //         <Text style={styles.overview}>{"\n"}Release Date: {movie.release_date}</Text>
       
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: 'black',
// //   },
// //   detailsContainer: {
// //     paddingHorizontal: 16,
// //     paddingTop: 16,
// //   },
// //   title: {
// //     fontSize: 25,
// //     fontWeight: 'bold',
// //     color: 'white',
// //   },
// //   overview: {
// //     color: 'white',
// //     marginTop: 8,
// //   },
// //   errorText: {
// //     color: 'red',
// //     fontSize: 18,
// //     textAlign: 'center',
// //     marginTop: 20,
// //   }
// // });

// // export default MovieDetailsScreen;

// // import React from 'react';
// // import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
// // import YouTubePlayer from 'react-native-youtube-iframe';
// // import * as Clipboard from 'expo-clipboard';
// // import * as Linking from 'expo-linking';

// // const MovieDetailsScreen = ({ route }) => {
// //   const { videoId, movie } = route.params;

// //   const shareVideo = async () => {
// //     const youtubeVideoUrl = `https://www.youtube.com/watch?v=${videoId}`;
// //     Clipboard.setString(youtubeVideoUrl);
// //     Alert.alert('Copied', 'Link copied to clipboard.');

// //     try {
// //       await Linking.openURL(`https://wa.me/?text=${encodeURIComponent(youtubeVideoUrl)}`);
// //     } catch (error) {
// //       console.error('Error opening URL:', error);
// //       Alert.alert('Error', 'Failed to open the share dialog.');
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <YouTubePlayer
// //         videoId={videoId}
// //         height={250}
// //         play={true}
// //         onChangeState={event => console.log(event)}
// //         onReady={() => console.log('Ready')}
// //         onError={error => console.log(error)}
// //       />
// //       <View style={styles.detailsContainer}>
// //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
// //           <TouchableOpacity>
// //             <Image source={require('./assets/plusicon.png')} style={{ height: 30, width: 30 }} />
// //             <Text style={{ color: 'white' }}>My list</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity>
// //             <Image source={require('./assets/likeicon.png')} style={{ height: 30, width: 30 }} />
// //             <Text style={{ color: 'white' }}>Rate</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity onPress={shareVideo}>
// //             <Image source={require('./assets/shareicon.png')} style={{ height: 30, width: 30 }} />
// //             <Text style={{ color: 'white' }}>Share</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity>
// //             <Image source={require('./assets/downloadicon.png')} style={{ height: 30, width: 30 }} />
// //             <Text style={{ color: 'white' }}>Download</Text>
// //           </TouchableOpacity>
// //         </View>
// //         <Text style={styles.title}>{movie.title}</Text>
// //         <Text style={styles.overview}>{movie.overview}</Text>
// //         <Text style={styles.overview}>{"\n"}Popularity: {movie.popularity}</Text>
// //         <Text style={styles.overview}>{"\n"}Release Date: {movie.release_date}</Text>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: 'black',
// //   },
// //   detailsContainer: {
// //     paddingHorizontal: 16,
// //     paddingTop: 16,
// //   },
// //   title: {
// //     fontSize: 25,
// //     fontWeight: 'bold',
// //     color: 'white',
// //   },
// //   overview: {
// //     color: 'white',
// //     marginTop: 8,
// //   },
// //   errorText: {
// //     color: 'red',
// //     fontSize: 18,
// //     textAlign: 'center',
// //     marginTop: 20,
// //   },
// // });

// // export default MovieDetailsScreen;


// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Share, Button } from 'react-native';
// import YouTubePlayer from 'react-native-youtube-iframe';
// import { firebase } from './firebase'; // Import the Firebase instance

// const MovieDetailsScreen = ({ route }) => {
//   const { videoId, movie } = route.params;

//   const onShare = async () => {
//     try {
//       const youtubeVideoUrl = `https://www.youtube.com/watch?v=${videoId}`;
//       const message = `Check out this movie: ${movie.title} - ${movie.overview}\n${youtubeVideoUrl}`;

//       // Save shared movie record to Firestore
//       const user = firebase.auth().currentUser;
//       if (user) {
//         const userId = user.uid;
//         const sharedMoviesRef = firebase.firestore().collection('users').doc(userId).collection('shared_movies');
//         await sharedMoviesRef.add({
//           title: movie.title,
//           overview: movie.overview,
//           youtubeVideoUrl: youtubeVideoUrl,
//           poster_path: movie.poster_path, // Ensure poster_path is saved
//         });
//       }

//       // Share the message
//       const result = await Share.share({ message });
//       if (result.action === Share.sharedAction) {
//         // Shared successfully
//       } else if (result.action === Share.dismissedAction) {
//         // Share dismissed
//       }
//     } catch (error) {
//       Alert.alert(error.message);
//     }
//   };
  

//   return (
//     <View style={styles.container}>
//       <YouTubePlayer
//         videoId={videoId}
//         height={250}
//         play={true}
//         onChangeState={event => console.log(event)}
//         onReady={() => console.log('Ready')}
//         onError={error => console.log(error)}
//       />
//       <View style={styles.detailsContainer}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//           <TouchableOpacity onPress={addToMyList}>
//             <Image source={require('./assets/plusicon.jpg')} style={{ height: 60, width: 60 }} />
//             {/* <Text style={{ color: 'white' }}>My list</Text> */}
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Image source={require('./assets/rateicon.jpg')} style={{ height: 80, width: 30 }} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={onShare}>
//             <Image source={require('./assets/shareicon.jpg')} style={{ height: 85, width: 60 }} />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.title}>{movie.title}</Text>
//         <Text style={styles.overview}>{movie.overview}</Text>
//         <Text style={styles.overview}>{"\n"}Popularity: {movie.popularity}</Text>
//         <Text style={styles.overview}>{"\n"}Release Date: {movie.release_date}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   detailsContainer: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   overview: {
//     color: 'white',
//     marginTop: 8,
//   },
// });

// export default MovieDetailsScreen;





import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Share } from 'react-native';
import YouTubePlayer from 'react-native-youtube-iframe';
import { firebase } from './firebase'; // Import the Firebase instance

const MovieDetailsScreen = ({ route }) => {
  const { videoId, movie } = route.params;

  const onShare = async () => {
    try {
      const youtubeVideoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const message = `Check out this movie: ${movie.title} - ${movie.overview}\n${youtubeVideoUrl}`;

      // Save shared movie record to Firestore
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        const sharedMoviesRef = firebase.firestore().collection('users').doc(userId).collection('shared_movies');
        await sharedMoviesRef.add({
          title: movie.title,
          overview: movie.overview,
          youtubeVideoUrl: youtubeVideoUrl,
          poster_path: movie.poster_path, // Ensure poster_path is saved
        });
      }

      // Share the message
      const result = await Share.share({ message });
      if (result.action === Share.sharedAction) {
        // Shared successfully
      } else if (result.action === Share.dismissedAction) {
        // Share dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const addToMyList = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        const myListRef = firebase.firestore().collection('users').doc(userId).collection('my_list');
        await myListRef.add({
          title: movie.title,
          overview: movie.overview,
          youtubeVideoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          poster_path: movie.poster_path,
        });
        Alert.alert('Movie added to My List');
      }
    } catch (error) {
      console.error('Error adding movie to My List:', error);
    }
  };

  const addToMyLike = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        const myLikeRef = firebase.firestore().collection('users').doc(userId).collection('my_like');
        await myLikeRef.add({
          title: movie.title,
          overview: movie.overview,
          youtubeVideoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          poster_path: movie.poster_path,
        });
        Alert.alert('Movie liked');
      }
    } catch (error) {
      console.error('Error adding movie to My List:', error);
    }
  };

  return (
    <View style={styles.container}>
      <YouTubePlayer
        videoId={videoId}
        height={250}
        play={true}
        onChangeState={event => console.log(event)}
        onReady={() => console.log('Ready')}
        onError={error => console.log(error)}
      />
      <View style={styles.detailsContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={addToMyList}>
            <Image source={require('./assets/plusicon.jpg')} style={{ height: 60, width: 60 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={addToMyLike}>
            <Image source={require('./assets/rateicon.jpg')} style={{ height: 80, width: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare}>
            <Image source={require('./assets/shareicon.jpg')} style={{ height: 85, width: 60 }} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.overview}>{"\n"}Popularity: {movie.popularity}</Text>
        <Text style={styles.overview}>{"\n"}Release Date: {movie.release_date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  overview: {
    color: 'white',
    marginTop: 8,
  },
});

export default MovieDetailsScreen;

