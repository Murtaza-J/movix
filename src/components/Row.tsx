import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import MovieModel from "../utils/MovieModel";
import Movie from "./Movie";

interface Url {
  src: string;
  type: string;
}

interface Props {
  title: string;
  urls: Array<Url>;
}

const Row = ({ title, urls }: Props) => {
  const [movies, setMovies] = useState(Array<MovieModel>());

  useEffect(() => {
    urls.map(async (url) => {
      const response = await axios.get(url.src);
      if (urls.length === 1) setMovies(response.data.results.map((movie: MovieModel) => { return {...movie, type: url.type}}));
      else setMovies((m) => sort(m.concat(response.data.results.slice(0, 10).map((movie: MovieModel) => { return {...movie, media_type: url.type}}))));
    });
  }, [urls]);

  const sort = (array: MovieModel[]) => {
    array.sort((a, b) => a.popularity - b.popularity);
    return array;
  };

  return (
    <div>
      <h1 className="text-3xl font-medium mt-3 ml-3">{title}</h1>
      <div className="grid grid-rows-1 grid-flow-col col-gap-4 p-6 pb-7 overflow-x-scroll scrollbar-hidden">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Row;
