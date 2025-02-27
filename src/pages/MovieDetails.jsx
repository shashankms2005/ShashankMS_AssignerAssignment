import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "b1d0bf09";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      );
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="grid place-content-center">
      <div className="min-h-[80vh] w-[100vw] md:w-[60vw] rounded-lg p-5 mt-2 bg-gradient-to-b from-[#170B2E]/60 to-[#111111]/60 backdrop-blur-lg border border-white/10 shadow-lg text-white mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">{movie.Title}</h1>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-64 h-auto rounded-lg shadow-md"
          />
          <div className="space-y-3">
            <p>
              <strong>Synopsis:</strong> {movie.Plot}
            </p>
            <p>
              <strong>Released:</strong> {movie.Released}
            </p>
            <p>
              <strong>IMDB Rating:</strong> {movie.imdbRating}
            </p>
            <p>
              <strong>Genre:</strong> {movie.Genre}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.Runtime}
            </p>
            <p>
              <strong>Cast:</strong> {movie.Actors}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
