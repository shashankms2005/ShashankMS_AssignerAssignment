import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../Components/MovieCard";
import SearchBar from "../Components/SearchBar";

const API_KEY = "b1d0bf09";

function Home() {
    const [movies, setMovies] = useState(() => JSON.parse(localStorage.getItem("movies")) || []);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState(localStorage.getItem("query") || "");

    const searchMovies = async (query, page = 1) => {
        if (!query) return;
        const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&page=${page}`);
        
        if (response.data.Response === "True") {
            setMovies(response.data.Search);
            setTotalResults(parseInt(response.data.totalResults, 10));
            setCurrentPage(page);
            setQuery(query);
            localStorage.setItem("movies", JSON.stringify(response.data.Search));
            localStorage.setItem("query", query);
        } else {
            setMovies([]);
            setTotalResults(0);
            localStorage.removeItem("movies");
            localStorage.removeItem("query");
        }
    };

    useEffect(() => {
        if (query) searchMovies(query, currentPage);
    }, [currentPage]);

    const totalPages = Math.ceil(totalResults / 10);

    return (
        <div>
            <div className="flex justify-center items-center h-[100px]">
                <h1 className="text-5xl text-center">MoviePedia</h1>
            </div>
            <SearchBar onSearch={(q) => searchMovies(q, 1)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {movies.length > 0 ? (
                    movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
                ) : (
                    <p className="text-white text-center col-span-full">No movies found.</p>
                )}
            </div>

            {totalResults > 10 && (
                <div className="flex justify-center items-center gap-4 my-6">
                    <button 
                        disabled={currentPage === 1} 
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-white">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button 
                        disabled={currentPage >= totalPages} 
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home;
