import React, { useState, useEffect } from "react";
import MovieModel from "../utils/MovieModel";
import axios from "../utils/axios";
import { MdInfoOutline } from "react-icons/md";
import { Link } from "react-router-dom";

interface Url {
  src: string;
  type: string;
}

interface Props {
  urls: Array<Url>;
}

const Banner = ({ urls }: Props) => {
  const [movie, setMovie] = useState<MovieModel>();

  useEffect(() => {
    (async () => {
      const url = urls[Math.floor(Math.random() * urls.length)];
      const response = await axios.get(url.src);
      setMovie({
        ...response.data.results.filter(
          (movie: MovieModel) =>
            movie.backdrop_path !== null &&
            movie.backdrop_path !== undefined &&
            movie.overview.length !== 0
        )[Math.floor(Math.random() * response.data.results.length)],
        media_type: url.type,
      });
    })();
  }, [urls]);

  return (
    <div
      className="w-full h-96  md:h-screen"
      style={
        movie?.backdrop_path
          ? {
              backgroundImage: `url(${process.env.REACT_APP_IMAGE_ORIGINAL}${movie?.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }
          : undefined
      }
    >
      <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center px-12 sm:items-start" style={{ backdropFilter: "saturate(180%) blur(3px)"}}>
        <h1 className="text-4xl md:text-6xl">{movie?.name ?? movie?.title}</h1>
        <p className="hidden text-xl max-w-6xl md:block">{movie?.overview}</p>
        <Link to={`/${movie?.media_type}/${movie?.id}`} className="flex items-center bg-black bg-opacity-75 px-4 py-2 mt-2 md:mt-4 hover:bg-opacity-100 ">
          <MdInfoOutline className="mr-1" />
          More Info
        </Link>
      </div>
    </div>
  );
};

export default Banner;
