import React, { useState, useEffect } from "react";
import MovieModel from "../utils/MovieModel";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
import { AiFillPicture } from "react-icons/ai";
import { MdPerson } from "react-icons/md";
import { Modal } from "../components";

const TvInfoPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieModel>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document
      .querySelector(".scrollable")
      ?.scrollTo({ top: 0, behavior: "smooth" });
    (async () => {
      const url = `/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits,videos,similar`;
      const response = await axios.get(url);

      setMovie({
        ...response.data,
        trailer_key: response.data.videos.results.filter(
          (video: { type: string }) => video.type === "Trailer"
        )[0]?.key,
        cast: response.data.credits.cast,
        similar: response.data.similar.results
          .sort((a: MovieModel, b: MovieModel) => b.popularity - a.popularity)
          .slice(0, 5),
        media_type: "tv",
      });
    })();
  }, [id]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const shortenName = (name: string) => {
    return name.length > 12 ? name.substring(0, 12) + "..." : name;
  };

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-start overflow-y-hidden"
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
      <div
        className="flex flex-col bg-black bg-opacity-75 z-10 w-full overflow-y-scroll lg:flex-row"
        style={{ backdropFilter: "saturate(180%) blur(3px)" }}
      >
        <div className="flex flex-col w-full h-screen pt-20 pb-6 px-12 justify-center items-center lg:w-96">
          <div className="max-w-xs rounded-lg border-b-2 overflow-hidden">
            {movie?.poster_path ? (
              <img
                src={`${process.env.REACT_APP_IMAGE_500}${movie.poster_path}`}
                alt={movie?.title ?? movie?.name}
                className="w-full h-full"
              />
            ) : (
              <AiFillPicture className="w-full h-full p-6" />
            )}
            {/* {!movie?.poster_path && (
              <div className="movie__title">{movie?.title ?? movie?.name}</div>
            )} */}
          </div>
          {movie?.trailer_key && (
            <button
              className="bg-black bg-opacity-25 border-b outline-none px-8 py-3 mt-8 rounded-lg flex items-center cursor-pointer transition-all duration-200 ease-in hover:bg-opacity-100"
              onClick={() => setShowModal(true)}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 fill-current text-white mr-1"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
              </svg>
              <span className="text-white text-lg font-light">
                Play Trailer
              </span>
            </button>
          )}
        </div>
        <div className="flex flex-1 flex-col w-full lg:pt-20 px-12 lg:pr-0 lg:overflow-hidden">
          <div className="mb-4 flex flex-col items-center lg:items-start">
            <h1 className="text-4xl hidden lg:block">
              {movie?.title ?? movie?.name}
            </h1>
            <div className="flex items-center flex-wrap text-sm text-white text-opacity-75">
              <svg
                className="w-4 fill-current text-orange-400"
                viewBox="0 0 24 24"
              >
                <g data-name="Layer 2">
                  <path
                    d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                    data-name="star"
                  ></path>
                </g>
              </svg>
              <span className="mr-1">{`${
                (movie?.vote_average ?? 0) * 10
              }%`}</span>
              <span className="mx-2">|</span>
              <span>
                {formatDate(
                  movie?.release_date ?? movie?.first_air_date ?? Date()
                )}
              </span>
              <span className="mx-2">|</span>
              <span>
                {movie?.genres
                  .reduce((acc, genre) => `${acc}, ${genre.name}`, "")
                  .slice(2)}
              </span>
            </div>
          </div>
          <div className="lg:overflow-y-scroll lg:pr-4">
            <p className="text-xl text-white text-opacity-75 text-medium text-center lg:text-left">
              {movie?.overview}
            </p>
            {Boolean(movie?.cast?.length) && (
              <div className="my-8 pb-8">
                <div className="text-3xl mb-3">Cast</div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {movie?.cast.map((cast) => (
                    <div
                      key={cast.id}
                      className="bg-black bg-opacity-75 flex h-28 rounded-lg border-b overflow-hidden"
                    >
                      {cast?.profile_path ? (
                        <img
                          alt={cast.name}
                          className="w-20 object-cover"
                          src={`${process.env.REACT_APP_IMAGE_185}${cast.profile_path}`}
                        />
                      ) : (
                        <MdPerson className="w-20 h-full p-3" />
                      )}
                      <div className="flex-1 flex flex-col p-3">
                        <span className="text-xl mb-1">{cast.name}</span>
                        <span className="text-lg text-white text-opacity-50">
                          {cast.character}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Boolean(movie?.seasons?.length) && (
              <div className="my-8 pb-8">
                <div className="text-3xl mb-3">Seasons</div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {movie?.seasons.map((season) => (
                    <div
                      key={season.id}
                      className="bg-black bg-opacity-75 flex h-28 rounded-lg border-b overflow-hidden"
                    >
                      {season?.poster_path ? (
                        <img
                          alt={season.name}
                          className="w-20 object-cover"
                          src={`${process.env.REACT_APP_IMAGE_185}${season.poster_path}`}
                        />
                      ) : (
                        <AiFillPicture className="w-20 h-full p-3" />
                      )}
                      <div className="flex-1 w-full flex flex-col p-3">
                        <span className="text-xl mb-1">
                          {shortenName(season.name)}
                          <span className="mx-1 text-sm text-white text-opacity-25 self-center">
                            |
                          </span>
                          <span className="text-sm text-white text-opacity-25">
                            {season.episode_count} episodes
                          </span>
                        </span>
                        <span className="w-4/5 truncate">
                          {season.overview}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Boolean(movie?.similar?.length) && (
              <div className="my-8 pb-10">
                <div className="text-3xl mb-3">Similar TV Shows</div>
                <div className="grid grid-cols-1 gap-6 grid-flow-row sm:grid-cols-2 md:grid-cols-3 md:pl-4 xl:grid-cols-5">
                  {movie?.similar.map((m) => (
                    <Movie key={m.id} movie={{ ...m, media_type: "tv" }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          id={movie?.trailer_key ?? ""}
          onClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TvInfoPage;
