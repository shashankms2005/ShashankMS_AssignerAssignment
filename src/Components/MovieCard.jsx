import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    return (
        <div className=" rounded-lg p-5 mt-2 bg-gradient-to-b from-[#170B2E]/60 to-[#111111]/60 backdrop-blur-lg border border-white/10 shadow-lg">
            <img 
                src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"} 
                alt={movie.Title} 
                className=" object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2 text-white">{movie.Title}</h3>
            <p className="text-gray-400">{movie.Year}</p>
            <Link 
                to={`/movie/${movie.imdbID}`} 
                className="inline-block mt-3 text-blue-400 hover:text-blue-500 font-medium"
            >
                View Details
            </Link>
        </div>
    );
}

export default MovieCard;
