import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Extra = () => {
  const [nowPlayingData, setNowPlayingData] = useState([]);
  const [popularData, setPopularData] = useState([]);
  const [topRatedData, setTopRatedData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  const [tvShowsData, setTvShowsData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch now playing movies
    axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=e3d16f9387ec1aed0238e13b883b5c3a')
      .then((response) => {
        setNowPlayingData(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching now playing movies:', error);
      });

    // Fetch popular movies
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=e3d16f9387ec1aed0238e13b883b5c3a')
      .then((response) => {
        setPopularData(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching popular movies:', error);
      });

    // Top Rated movies
    axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e3d16f9387ec1aed0238e13b883b5c3a')
      .then((response) => {
        setTopRatedData(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching top rated movies:', error);
      });

    // Upcoming movies
    axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=e3d16f9387ec1aed0238e13b883b5c3a')
      .then((response) => {
        setUpcomingData(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching upcoming movies:', error);
      });

    // Fetch TV shows
    axios.get('https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&air_date.lte=2024-05-01&air_date.gte=2024-01-01&api_key=e3d16f9387ec1aed0238e13b883b5c3a')
      .then((response) => {
        setTvShowsData(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching TV shows:', error);
      });
  }, []);

  // Function for poster/image of movies 
  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)}> 
      <View style={styles.item}>
        <Image
          style={styles.poster}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
        />
        {item.adult && <Text style={styles.adultIndicator}>18+</Text>}
      </View>
    </TouchableOpacity>
  );

  const navigateToDetails = async (movie) => {
    try {
      // Search for movie trailer on YouTube
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyAjwfp7NtheyVWVl7DMj2NCYzZ5J9mpahs',
          part: 'snippet',
          type: 'video',
          q: `${movie.title} trailer`,
          maxResults: 1,
        },
      });

      // Extract video ID from the response
      const videoId = response.data.items[0].id.videoId;
     
      // Navigate to MovieDetailsScreen
      navigation.navigate('MovieDetailsScreen', { videoId, movie });
    } catch (error) {
      console.error('Error navigating to details:', error);
    }
  };

  // Determine the most viewed movie (assumed to be the first movie in popularData)
  const mostViewedMovie = popularData.length > 0 ? popularData[0] : null;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {mostViewedMovie && (
            <View style={styles.mostViewedContainer}>
              <ImageBackground
                source={require('./assets/background.jpg')}
                style={styles.background}
              >
                <TouchableOpacity onPress={() => navigateToDetails(mostViewedMovie)}>
                  <Image
                    style={styles.mostViewedPoster}
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${mostViewedMovie.poster_path}` }}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          )}
          <Text style={styles.heading}>Now Playing</Text>
          <FlatList
            data={nowPlayingData}
            renderItem={renderMovieItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
          <Text style={styles.heading}>Popular</Text>
          <FlatList
            data={popularData.slice(1)} // Skip the most viewed movie
            renderItem={renderMovieItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />

          <Text style={styles.heading}>Top Rated</Text>
          <FlatList
            data={topRatedData}
            renderItem={renderMovieItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
          <Text style={styles.heading}>Upcoming</Text>
          <FlatList
            data={upcomingData}
            renderItem={renderMovieItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
          <Text style={styles.heading}>TV Shows</Text>
          <FlatList
            data={tvShowsData}
            renderItem={renderMovieItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  mostViewedContainer: {
    alignItems: 'center',
    marginVertical: 20,
    height:400,
  },
  background: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Extra;
