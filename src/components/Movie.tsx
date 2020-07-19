import React from "react";
import MovieModel from "../utils/MovieModel";
import { AiFillPicture } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Props {
  movie: MovieModel;
}

const Movie = ({ movie }: Props) => {
  const SIZE = 42;
  const STROKE = 2.5;
  const RADIUS = SIZE / 2 - STROKE * 2;
  const circumference = RADIUS * 2 * Math.PI;

  return (
    <Link
      to={`/${movie.media_type}/${movie.id}`}
      className="relative no-underline transform transition-transform duration-200 ease-in shadow-lg rounded-lg hover:scale-105"
      style={{ height: "231px", minWidth: "154px" }}
    >
      {movie.poster_path ? (
        <img
          src={`${process.env.REACT_APP_IMAGE_ORIGINAL}${movie.poster_path}`}
          alt={movie.title ?? movie.name}
          className="w-full h-full rounded-lg"
        />
      ) : (
        <div className="flex flex-col w-full h-full py-6 px-3">
          <AiFillPicture className="flex-1 w-full text-white" />
          <div className="text-center w-full text-white">
            {movie.title ?? movie.name}
          </div>
        </div>
      )}
      <div className="absolute bottom-0 right-0 transform translate-y-1/2">
        <svg width={SIZE} height={SIZE}>
          <circle
            className="transform -rotate-90 origin-center"
            stroke={
              movie.vote_average > 0
                ? movie.vote_average < 7
                  ? "#d2d531"
                  : "#21d07a"
                : "#333"
            }
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="#081c22"
            r={RADIUS}
            cx={SIZE / 2}
            cy={SIZE / 2}
            style={{
              strokeDasharray: `${circumference} ${circumference}`,
              strokeDashoffset:
                movie.vote_average > 0
                  ? circumference -
                    ((movie.vote_average * 10) / 100) * circumference
                  : undefined,
            }}
          />
          <text
            x="50%"
            y="50%"
            alignmentBaseline="central"
            textAnchor="middle"
            fill="white"
            fontFamily="Poppins"
          >
            {movie.vote_average * 10}
            <text fill="white" fontSize="8">
              %
            </text>
          </text>
        </svg>
      </div>
    </Link>
  );
};

export default Movie;
