const API_KEY = process.env.REACT_APP_API_KEY;

export default {
  latest_movie: { src: `/movie/now_playing?api_key=${API_KEY}`, type: "movie" },
  latest_tv: { src: `/tv/airing_today?api_key=${API_KEY}`, type: "tv" },
  trending_movie: {
    src: `/trending/movie/week?api_key=${API_KEY}`,
    type: "movie",
  },
  trending_tv: { src: `/trending/tv/week?api_key=${API_KEY}`, type: "tv" },
  popular_movie: { src: `/movie/popular?api_key=${API_KEY}`, type: "movie" },
  popular_tv: { src: `/tv/popular?api_key=${API_KEY}`, type: "tv" },
  top_rated_movie: {
    src: `/movie/top_rated?api_key=${API_KEY}`,
    type: "movie",
  },
  top_rated_tv: { src: `/tv/top_rated?api_key=${API_KEY}`, type: "tv" },
  horror_movie: {
    src: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    type: "movie",
  },
  horror_tv: {
    src: `/discover/tv?api_key=${API_KEY}&with_genres=27`,
    type: "tv",
  },
  thriller_movie: {
    src: `/discover/movie?api_key=${API_KEY}&with_genres=53`,
    type: "movie",
  },
  mystery_tv: {
    src: `/discover/tv?api_key=${API_KEY}&with_genres=9648`,
    type: "tv",
  },
  sci_fi_movie: {
    src: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
    type: "movie",
  },
  sci_fi_tv: {
    src: `/discover/tv?api_key=${API_KEY}&with_genres=10765`,
    type: "tv",
  },
  romance_movie: {
    src: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    type: "movie",
  },
  action_movie: {
    src: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    type: "movie",
  },
  action_tv: {
    src: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
    type: "tv",
  },
  genres_movie: `/genre/movie/list?api_key=${API_KEY}`,
  genres_tv: `/genre/tv/list?api_key=${API_KEY}`,
  discover_movie: {
    src: `/discover/movie?api_key=${API_KEY}&with_genres=`,
    type: "movie",
  },
  discover_tv: {
    src: `/discover/tv?api_key=${API_KEY}&with_genres=`,
    type: "tv",
  },
};
