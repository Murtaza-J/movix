import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../utils/axios";
import MovieModel from "../utils/MovieModel";
import { Movie } from "../components/";
import loading from "../assets/loading.gif";

const SearchPage = () => {
  let query = new URLSearchParams(useLocation().search).get("q");
  const [movies, setMovies] = useState<Array<MovieModel>>();

  useEffect(() => {
    setMovies(undefined);
    (async () => {
      const url = `/search/multi/?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=`;
      const responsePage1 = await axios.get(`${url}1`);
      const responsePage2 = await axios.get(`${url}2`);

      setMovies([...responsePage1.data.results, ...responsePage2.data.results]);
    })();
  }, [query]);

  return (
    <div className="pt-24 px-12 pb-12">
      <div className="text-4xl mb-3">{movies && movies.length === 0 ? 'No results found.' : `Search results for "${query}"`}</div>
      
      {movies ? (
        <div className="grid p-2 grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 md:p-4 lg:grid-cols-5 xl:grid-cols-7">
          {movies
            .filter((movie: MovieModel) => movie.media_type !== "person")
            .map((movie: MovieModel) => (
              <Movie key={movie.id} movie={movie} />
            ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-24">
          <img className="h-28" src={loading} alt="Loading" />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
