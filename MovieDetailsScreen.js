// // MovieDetailsScreen.js
// import React from 'react';
// import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
// import YouTubePlayer from 'react-native-youtube-iframe';

// const MovieDetailsScreen = ({ route }) => {
//   const { videoId, movie } = route.params;
 
//   return (
//     <View style={styles.container}>
//       <YouTubePlayer videoId={videoId} height={250} 
//       play={true}
//       onChangeState={event => console.log(event)}
//       onReady={() => console.log("Ready")}
//       onError={error => console.log(error)}
//       />
//       <View style={styles.detailsContainer}>

//         <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
//         <TouchableOpacity >
//         <Image source={require('./assets/plusicon.png')} style={{height:30,width:30}}/>
//             <Text style={{color:'white'}}>My list</Text>
            
         
            
//           </TouchableOpacity>
//           <TouchableOpacity >
//              <Image source={require('./assets/likeicon.png')} style={{height:30,width:30}}/>
//              <Text style={{color:'white'}}>Rate</Text>
            
//           </TouchableOpacity>
          
//           <TouchableOpacity >
//             <Image source={require('./assets/shareicon.png')} style={{height:30,width:30}}/>
//             <Text style={{color:'white'}}>Share</Text>
            
//           </TouchableOpacity>

//           <TouchableOpacity >
//             <Image source={require('./assets/downloadicon.png')} style={{height:30,width:30}}/>
//             <Text style={{color:'white'}}>Download</Text>
            
//           </TouchableOpacity>
          
//         </View>
//         <Text style={styles.title}>{movie.title}</Text>
//         <Text style={styles.overview} >{movie.overview}</Text>
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
//   errorText: {
//     color: 'red',
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   }
// });

// export default MovieDetailsScreen;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import YouTubePlayer from 'react-native-youtube-iframe';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';

const MovieDetailsScreen = ({ route }) => {
  const { videoId, movie } = route.params;

  const shareVideo = async () => {
    const youtubeVideoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    Clipboard.setString(youtubeVideoUrl);
    Alert.alert('Copied', 'Link copied to clipboard.');

    try {
      await Linking.openURL(`https://wa.me/?text=${encodeURIComponent(youtubeVideoUrl)}`);
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert('Error', 'Failed to open the share dialog.');
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
          <TouchableOpacity>
            <Image source={require('./assets/plusicon.png')} style={{ height: 30, width: 30 }} />
            <Text style={{ color: 'white' }}>My list</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./assets/likeicon.png')} style={{ height: 30, width: 30 }} />
            <Text style={{ color: 'white' }}>Rate</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={shareVideo}>
            <Image source={require('./assets/shareicon.png')} style={{ height: 30, width: 30 }} />
            <Text style={{ color: 'white' }}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./assets/downloadicon.png')} style={{ height: 30, width: 30 }} />
            <Text style={{ color: 'white' }}>Download</Text>
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
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MovieDetailsScreen;
