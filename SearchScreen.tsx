import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Fuse from 'fuse.js';
import { useNavigation, NavigationProp , ParamListBase} from '@react-navigation/native';
import debounce from 'lodash/debounce';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieDetailsScreenParams {
  videoId: string;
  movie: Movie;
}

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=e3d16f9387ec1aed0238e13b883b5c3a');
        const uniqueMovies = new Map<number, Movie>(response.data.results.map((movie: Movie) => [movie.id, movie]));
        setMovies(Array.from(uniqueMovies.values()));
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      }
    };

    fetchRecommendedMovies();
  }, []);

  const handleSearch = async (query: string) => {
    try {
      if (!query) {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=e3d16f9387ec1aed0238e13b883b5c3a');
        const uniqueMovies = new Map<number, Movie>(response.data.results.map((movie: Movie) => [movie.id, movie]));
        setMovies(Array.from(uniqueMovies.values()));
        return;
      }

      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=e3d16f9387ec1aed0238e13b883b5c3a&query=${query}`);
      const searchResults = response.data.results;

      const allMovies = [...movies, ...searchResults];
      const uniqueMovies = new Map<number, Movie>(allMovies.map((movie: Movie) => [movie.id, movie]));

      const fuse = new Fuse(Array.from(uniqueMovies.values()), {
        keys: ['title'],
        includeScore: true,
      });

      const results = fuse.search(query);
      const fuzzySearchResults = results.map(result => result.item);

      setMovies(fuzzySearchResults);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), [movies]);

  useEffect(() => {
    debouncedHandleSearch(searchQuery);
  }, [searchQuery]);

  const renderMovieItem = ({ item }: { item: Movie }) => (
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

  const navigateToDetails = async (movie: Movie) => {
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
      <View style={styles.searchContainer}>
        <Image
          style={styles.searchIcon}
          source={require('./assets/searchicon.jpeg')}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a movie..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>
      <Text style={styles.sectionTitle}>Recommended Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    backgroundColor: '#b2beb5'
  },
  searchIcon: {
    width: 35,
    height: 40,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    color: 'white',
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

export default SearchScreen;





// import React, { useState, useEffect, useCallback } from 'react';
// import { View, TextInput, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import Fuse from 'fuse.js';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import debounce from 'lodash/debounce';

// interface Movie {
//   id: number;
//   title: string;
//   poster_path: string;
// }

// interface MovieDetailsScreenParams {
//   videoId: string;
//   movie: Movie;
// }

// const SearchScreen: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const navigation = useNavigation<NavigationProp<ParamListBase>>();

//   useEffect(() => {
//     const fetchRecommendedMovies = async () => {
//       try {
//         const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=e3d16f9387ec1aed0238e13b883b5c3a');
//         const uniqueMovies = new Map<number, Movie>(response.data.results.map((movie: Movie) => [movie.id, movie]));
//         setMovies(Array.from(uniqueMovies.values()));
//       } catch (error) {
//         console.error('Error fetching recommended movies:', error);
//       }
//     };

//     fetchRecommendedMovies();
//   }, []);

//   const handleSearch = async (query: string) => {
//     try {
//       if (!query) {
//         const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=e3d16f9387ec1aed0238e13b883b5c3a');
//         const uniqueMovies = new Map<number, Movie>(response.data.results.map((movie: Movie) => [movie.id, movie]));
//         setMovies(Array.from(uniqueMovies.values()));
//         return;
//       }

//       const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=e3d16f9387ec1aed0238e13b883b5c3a&query=${query}`);
//       const searchResults = response.data.results;

//       const allMovies = [...movies, ...searchResults];
//       const uniqueMovies = new Map<number, Movie>(allMovies.map((movie: Movie) => [movie.id, movie]));

//       const fuse = new Fuse(Array.from(uniqueMovies.values()), {
//         keys: ['title'],
//         includeScore: true,
//       });

//       const results = fuse.search(query);
//       const fuzzySearchResults = results.map(result => result.item);

//       setMovies(fuzzySearchResults);
//     } catch (error) {
//       console.error('Error searching for movies:', error);
//     }
//   };

//   const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), [movies]);

//   useEffect(() => {
//     debouncedHandleSearch(searchQuery);
//   }, [searchQuery]);

//   const renderMovieItem = ({ item }: { item: Movie }) => (
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
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const navigateToDetails = async (movie: Movie) => {
//     try {
//       const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
//         params: {
//           key: 'AIzaSyAjwfp7NtheyVWVl7DMj2NCYzZ5J9mpahs',
//           part: 'snippet',
//           type: 'video',
//           q: `${movie.title} trailer`,
//           maxResults: 1,
//         },
//       });

//       const videoId = response.data.items[0].id.videoId;

//       navigation.navigate('MovieDetailsScreen', { videoId, movie });
//     } catch (error) {
//       console.error('Error navigating to details:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <Image
//           style={styles.searchIcon}
//           source={require('./assets/searchicon.jpeg')}
//         />
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Search for a movie..."
//           value={searchQuery}
//           onChangeText={text => setSearchQuery(text)}
//         />
//       </View>
//       <Text style={styles.sectionTitle}>Recommended Movies</Text>
//       <FlatList
//         data={movies}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderMovieItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     margin: 10,
//     borderWidth: 1,
//     backgroundColor: '#b2beb5'
//   },
//   searchIcon: {
//     width: 35,
//     height: 40,
//     marginRight: 10,
//   },
//   searchBar: {
//     flex: 1,
//     color: 'white',
//   },
//   movieItem: {
//     margin: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   poster: {
//     width: 100,
//     height: 150,
//     resizeMode: 'cover',
//     marginRight: 10,
//   },
//   movieDetails: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   movieTitle: {
//     color: 'white',
//     flex: 1,
//     flexWrap: 'wrap',
//   },
//   playButton: {
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   playButtonText: {
//     fontSize: 24,
//     color: 'black',
//   },
//   sectionTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     marginTop: 10,
//   }
// });

// export default SearchScreen;





// import React, { useState, useEffect, useCallback } from 'react';
// import { View, TextInput, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import Fuse from 'fuse.js';
// import { useNavigation } from '@react-navigation/native';
// import debounce from 'lodash/debounce';

// const SearchScreen = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [movies, setMovies] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchRecommendedMovies = async () => {
//       try {
//         const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=e3d16f9387ec1aed0238e13b883b5c3a');
//         const uniqueMovies = new Map(response.data.results.map(movie => [movie.id, movie]));
//         setMovies(Array.from(uniqueMovies.values()));
//       } catch (error) {
//         console.error('Error fetching recommended movies:', error);
//       }
//     };

//     fetchRecommendedMovies();
//   }, []);

//   const handleSearch = async (query) => {
//     try {
//       if (!query) {
//         // If the search query is empty, fetch the recommended movies again
//         const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=e3d16f9387ec1aed0238e13b883b5c3a');
//         const uniqueMovies = new Map(response.data.results.map(movie => [movie.id, movie]));
//         setMovies(Array.from(uniqueMovies.values()));
//         return;
//       }

//       const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=e3d16f9387ec1aed0238e13b883b5c3a&query=${query}`);
//       const searchResults = response.data.results;

//       // Combine recommended movies and search results without duplicates
//       const allMovies = [...movies, ...searchResults];
//       const uniqueMovies = new Map(allMovies.map(movie => [movie.id, movie]));

//       // Fuzzy search to handle spelling mistakes
//       const fuse = new Fuse(Array.from(uniqueMovies.values()), {
//         keys: ['title'],
//         includeScore: true,
//       });

//       const results = fuse.search(query);
//       const fuzzySearchResults = results.map(result => result.item);

//       setMovies(fuzzySearchResults);
//     } catch (error) {
//       console.error('Error searching for movies:', error);
//     }
//   };

//   const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), [movies]);

//   useEffect(() => {
//     debouncedHandleSearch(searchQuery);
//   }, [searchQuery]);

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
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const navigateToDetails = async (movie) => {
//     try {
//       const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
//         params: {
//           key: 'AIzaSyAjwfp7NtheyVWVl7DMj2NCYzZ5J9mpahs',
//           part: 'snippet',
//           type: 'video',
//           q: `${movie.title} trailer`,
//           maxResults: 1,
//         },
//       });

//       const videoId = response.data.items[0].id.videoId;

//       navigation.navigate('MovieDetailsScreen', { videoId, movie });
//     } catch (error) {
//       console.error('Error navigating to details:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>

//         <Image
//           style={styles.searchIcon}
//           source={require('./assets/searchicon.jpeg')}
//         />
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Search for a movie..."
//           value={searchQuery}
//           onChangeText={text => setSearchQuery(text)}
//         />
//       </View>
//       <Text style={styles.sectionTitle}>Recommended Movies</Text>

//       <FlatList
//         data={movies}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderMovieItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   searchContainer: {
//     marginTop:10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     margin: 10,
//     borderWidth: 1,
//     backgroundColor: '#b2beb5'
//   },
//   searchIcon: {
//     width: 35,
//     height: 40,
//     marginRight: 10,
//   },
//   searchBar: {
//     flex: 1,
//     color: 'white',
//   },
//   movieItem: {
//     margin: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   poster: {
//     width: 100,
//     height: 150,
//     resizeMode: 'cover',
//     marginRight: 10,
//   },
//   movieDetails: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   movieTitle: {
//     color: 'white',
//     flex: 1,
//     flexWrap: 'wrap',
//   },
//   playButton: {
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   playButtonText: {
//     fontSize: 24,
//     color: 'black',
//   },
//   sectionTitle: {
//         color: 'white',
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginLeft: 10,
//         marginTop: 10,
//       }
// });

// export default SearchScreen;