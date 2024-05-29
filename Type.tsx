export type RootStackParamList = {
    SearchScreen: undefined;
    MovieDetailsScreen: { videoId: string; movie: Movie };
  };
  
  export type Movie = {
    id: number;
    title: string;
    poster_path: string;
  };
  