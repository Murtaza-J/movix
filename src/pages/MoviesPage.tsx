import React, { useState, useEffect } from "react";
import urls from "../utils/request_urls";
import axios from "../utils/axios";
import GenreModel from "../utils/GenreModel";
import MovieModel from "../utils/MovieModel";
import Movie from "../components/Movie";
import loading from "../assets/loading.gif";

const Moviespage = () => {
  const [genres, setGenres] = useState(Array<GenreModel>());
  const [movies, setMovies] = useState(Array<MovieModel>());
  const [selected, setSelected] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    (async () => {
      const genreResponse = await axios.get(urls.genres_movie);
      setGenres(genreResponse.data.genres);

      const moviesResponse = await axios.get(
        `${
          urls.discover_movie.src + (selected !== 0 ? selected : "")
        }&page=${page}`
      );
      setMovies((m) =>
        m.concat(
          moviesResponse.data.results.map((movie: MovieModel) => {
            return { ...movie, media_type: "movie" };
          })
        )
      );
    })();

    window.addEventListener("scroll", () => {
      const bottom = document.body.scrollHeight;
      if (Math.ceil(window.scrollY + window.innerHeight) >= bottom) {
        setPage((p) => p + 1);
      }
    });

    return () => window.removeEventListener("scroll", () => {});
  }, [page, selected]);

  return (
    <div>
      <div className="flex flex-col overflow-hidden md:flex-row">
        <div className="flex flex-row bg-black text-white py-4 px-6 overflow-x-scroll scrollbar-hidden md:flex-col">
          <div className="hidden text-2xl mb-4 md:block ">Genres</div>
          <span
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight - 64,
                behavior: "smooth",
              });
              setPage(1);
              setSelected(0);
              setMovies(Array<MovieModel>());
            }}
            className={`my-3 mx-2 whitespace-no-wrap cursor-pointer text-white ${selected === 0 ? "text-opacity-100" : "text-opacity-50"}`}
          >
            All
          </span>
          {genres.map((genre: GenreModel) => (
            <span
              key={genre.id}
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight - 64,
                  behavior: "smooth",
                });
                setPage(1);
                setSelected(genre.id);
                setMovies(Array<MovieModel>());
              }}
              className={`my-3 mx-2 whitespace-no-wrap cursor-pointer text-white  ${selected === genre.id ? "text-opacity-100" : "text-opacity-50"}`}
            >
              {genre.name}
            </span>
          ))}
        </div>
        <div className="flex-1 pt-4">
          <div className="grid p-2 grid-cols-2 gap-10 sm:grid-cols-4 md:grid-cols-3 md:p-4 lg:grid-cols-4 xl:grid-cols-6">
            {movies.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="flex justify-center items-center h-24">
            <img className="h-28" src={loading} alt="Loading" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moviespage;
