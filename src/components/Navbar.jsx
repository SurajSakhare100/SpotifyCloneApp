import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { usePlayer } from "../context/PlayerContext";
import Cookies from 'js-cookie';
import spotify from '../../public/logo.png'; // Assuming you want to use the Spotify logo

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = ["user-read-private", "user-read-email"];

const Navbar = () => {
  const { query, setQuery } = usePlayer();
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const {token, setToken} =usePlayer()

 

 
  const handleLogout = () => {
    Cookies.remove('spotify_access_token', { 
      sameSite: 'None', 
      secure: true 
    });
    setToken("");
    // Optionally redirect to a different page or refresh the page
    navigate('/');
  };
  useEffect(() => {
    // Check if the Spotify access token cookie exists
    const token = Cookies.get('spotify_access_token');
    
    // If the token is not present, redirect to Spotify login
    if (!token) {
      const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`;
      window.location.href = loginUrl;
    }
  }, [navigate,handleLogout]);
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        navigate(`/search?query=${encodeURIComponent(query)}`);
      }
    }, 300),
    [navigate]
  );

  const handleSearchChange = () => {
    const value = searchInput.current.value;
    debouncedSearch(value);
    setQuery(value);
  };

  useEffect(() => {
    handleSearchChange(); // Call the function when query changes
  }, [query]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (query.trim()) {
        navigate(`/search?query=${encodeURIComponent(query)}`);
      }
    }
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate(1);
  };

  // Fetch token from cookies or localStorage
  useEffect(() => {
    const storedToken = Cookies.get('spotify_access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="w-full h-16 text-white flex items-center px-10 gap-4 ">
      <div className="h-full flex items-center gap-4 w-1/3">
        <button onClick={handlePrevious} aria-label="Previous Page" className="text-xl">
          <FaArrowLeft />
        </button>
        <button onClick={handleNext} aria-label="Next Page" className="text-xl">
          <FaArrowRight />
        </button>
      </div>
      <div className="w-[300px] md:w-1/3 h-12 relative">
        <input
          type="text"
          ref={searchInput}
          className="w-full h-full outline-none rounded-full bg-[#1c1c1c] pl-8 md:pl-10 text-md md:text-lg"
          placeholder="what's your mood?"
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <FaSearch
          className="absolute top-[50%] -translate-y-1/2 left-3 text-lg md:text-xl  cursor-pointer"
          onClick={() => {
            if (query.trim()) {
              navigate(`/search?query=${encodeURIComponent(query)}`);
            }
          }}
        />
      </div>
      <div className="h-full flex items-center gap-4 w-1/3 justify-end">
       
          <p
            className="bg-white text-black text-sm px-4 py-1 rounded-2xl hidden md:block cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </p>
        <div className=" text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
          <img src={spotify} alt="Spotify Logo" className=""/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
