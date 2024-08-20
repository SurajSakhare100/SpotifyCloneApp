import { FaSearch } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { usePlayer } from "../context/PlayerContext";
import debounce from "lodash.debounce"; // Make sure to install lodash.debounce

const Navbar = () => {
  const { query, setQuery } = usePlayer();
  const navigate = useNavigate();
  
  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      if(query==""){
        navigate('/search')
      }
      if (query.trim()) {
        navigate(`/search?query=${encodeURIComponent(query)}`);
      }
    }, 300), // 300ms debounce delay
    [navigate]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Directly navigate on Enter key press
      if (query.trim()) {
        navigate(`/search?query=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <div className="w-full h-16 text-white flex items-center px-10 gap-4">
      <div className="h-full flex items-center gap-2 w-1/3">
        <FaArrowLeft className="" />
        <FaArrowRight className="" />
      </div>
      <div className="w-1/3 h-12 relative">
        <input
          type="text"
          className="w-full h-full outline-none rounded-full bg-[#1c1c1c] pl-12 pb-1 text-lg"
          placeholder="What do you want to play?"
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <FaSearch
          className="absolute top-[50%] -translate-y-1/2 left-3 text-2xl cursor-pointer"
          onClick={() => {
            if (query.trim()) {
              navigate(`/search?query=${encodeURIComponent(query)}`);
            }
          }}
        />
      </div>
      <div className="h-full flex items-center gap-4 w-1/3 justify-end">
        <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
          Explore Premium
        </p>
        <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
          Install App
        </p>
        <p className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
          C
        </p>
      </div>
    </div>
  );
};

export default Navbar;
