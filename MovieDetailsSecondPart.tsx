// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import YouTubePlayer from 'react-native-youtube-iframe';

// const MovieDetailsSecondPart = ({ route }) => {
//   const { videoId } = route.params;

//   return (
//     <View style={styles.container}>
//       <YouTubePlayer 
//         videoId={videoId}
//         height={250}
//         play={true}
//         onChangeState={event => console.log(event)}
//         onReady={() => console.log("Ready")}
//         onError={error => console.log(error)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
// });

// export default MovieDetailsSecondPart;


import React from 'react';
import { View, StyleSheet } from 'react-native';
import YouTubePlayer from 'react-native-youtube-iframe';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MovieDetailsSecondPart: { videoId: string };
};

type MovieDetailsSecondPartRouteProp = RouteProp<RootStackParamList, 'MovieDetailsSecondPart'>;

type Props = {
  route: MovieDetailsSecondPartRouteProp;
  navigation: StackNavigationProp<RootStackParamList, 'MovieDetailsSecondPart'>;
};

const MovieDetailsSecondPart: React.FC<Props> = ({ route }) => {
  const { videoId } = route.params;

  return (
    <View style={styles.container}>
      <YouTubePlayer 
        videoId={videoId}
        height={250}
        play={true}
        onChangeState={event => console.log(event)}
        onReady={() => console.log("Ready")}
        onError={error => console.log(error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default MovieDetailsSecondPart;



