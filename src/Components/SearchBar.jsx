import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!loading) onSearch(query);
  };

  return (
    <div className="flex items-center justify-center w-[100vw] mb-10">
      <div className="flex items-center bg-gray-100 rounded-full shadow-md p-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Type movie name here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          className="flex-grow px-4 py-2 text-gray-700 bg-transparent outline-none"
          disabled={loading} 
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className={`h-[30px] w-[30px] text-white p-2 rounded-full shadow-md transition duration-300 ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
