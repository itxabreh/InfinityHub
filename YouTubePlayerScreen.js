import React from 'react';
import { View, StyleSheet } from 'react-native';
import YouTubePlayer from 'react-native-youtube-iframe';

const YouTubePlayerScreen = ({ route }) => {
  const { videoId } = route.params;

  return (
    <View style={styles.container}>
      <YouTubePlayer
        videoId={videoId}
        height={900}
        play={true}
        onChangeState={event => console.log(event)}
        onReady={() => console.log("Ready")}
        onError={error => console.log(error)}
        style={styles.youtubePlayer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  youtubePlayer: {
    alignSelf: 'stretch',
  },
});

export default YouTubePlayerScreen;
