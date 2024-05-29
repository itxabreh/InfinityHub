import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Share } from 'react-native';
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

  return (
    <View style={styles.container}>
      <YouTubePlayer
        height={300}
        play={true}
        videoId={videoId}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  overview: {
    fontSize: 16,
    color: 'grey',
  },
  shareButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MovieDetailsScreen;
