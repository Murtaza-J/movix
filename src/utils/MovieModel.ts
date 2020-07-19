import GenreModel from "./GenreModel";

interface MovieModel {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  popularity: number;
  first_air_date: string;
  release_date: string;
  overview: string;
  media_type: string;
  genres: Array<GenreModel>;
  trailer_key: string;
  cast: Array<{
    id: number;
    profile_path: string;
    character: string;
    name: string;
  }>;
  seasons: Array<{
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
  }>;
  similar: Array<MovieModel>;
}

export default MovieModel;
