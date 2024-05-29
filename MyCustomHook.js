import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3/movie/';

const MyCustomHook = () => {
  const [nowplayingmovies, setNowplayingmovies] = useState([]);
  const [popularmovies, setPopularmovies] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nowPlayingResponse = await axios.get(`${API_BASE_URL}now_playing?api_key=e3d16f9387ec1aed0238e13b883b5c3a`);
        setNowplayingmovies(nowPlayingResponse.data.results);
        await AsyncStorage.setItem('nowPlayingMovies', JSON.stringify(nowPlayingResponse.data.results));

        const popularResponse = await axios.get(`${API_BASE_URL}popular?api_key=e3d16f9387ec1aed0238e13b883b5c3a`);
        setPopularmovies(popularResponse.data.results);
        await AsyncStorage.setItem('popularMovies', JSON.stringify(popularResponse.data.results));

        const topRatedResponse = await axios.get(`${API_BASE_URL}top_rated?api_key=e3d16f9387ec1aed0238e13b883b5c3a`);
        setToprated(topRatedResponse.data.results);
        await AsyncStorage.setItem('topRatedMovies', JSON.stringify(topRatedResponse.data.results));

        const upcomingResponse = await axios.get(`${API_BASE_URL}upcoming?api_key=e3d16f9387ec1aed0238e13b883b5c3a`);
        setUpcoming(upcomingResponse.data.results);
        await AsyncStorage.setItem('upcomingMovies', JSON.stringify(upcomingResponse.data.results));
      } catch (error) {
        console.error('Error fetching or storing movies:', error);
      }
    };

    fetchData();
  }, []);

  return { nowplayingmovies, popularmovies, toprated, upcoming };
};

export default MyCustomHook;
