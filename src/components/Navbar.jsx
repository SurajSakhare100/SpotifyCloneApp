import React, { useState, useCallback, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { usePlayer } from "../context/PlayerContext";
import Cookies from 'js-cookie';
import spotify from '../../public/logo.svg'

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "https://spotifyindia.vercel.app/callback";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = ["user-read-private", "user-read-email"];

const Navbar = () => {
  const { query, setQuery } = usePlayer();
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = Cookies.get("spotify_access_token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      Cookies.set("spotify_access_token", token, { 
        expires: 1, 
        sameSite: 'None', 
        secure: true 
      });
      window.location.hash = ""; // Clear the fragment
      setToken(token);

      navigate("/");
    } else if (token) {
      setToken(token);
    } else {
      window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`;
    }
  }, [navigate]);

  const logout = () => {
    Cookies.remove("spotify_access_token", { 
      sameSite: 'None', 
      secure: true 
    });
    setToken("");
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`;
  };

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
    handleSearchChange();  // Call the function when query changes
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

  return (
    <div className="w-full h-16 text-white flex items-center px-10 gap-4">
      <div className="h-full flex items-center gap-4 w-1/3">
        <button onClick={handlePrevious} aria-label="Previous Page">
          <FaArrowLeft />
        </button>
        <button onClick={handleNext} aria-label="Next Page">
          <FaArrowRight />
        </button>
      </div>
      <div className="w-[300px] md:w-1/3 h-12 relative">
        <input
          type="text"
          ref={searchInput}
          className="w-full h-full outline-none rounded-full bg-[#1c1c1c] pl-10 md:pl-12 pb-1 text-md md:text-lg"
          placeholder="what's your mood?"
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <FaSearch
          className="absolute top-[50%] -translate-y-1/2 left-3 text-lg md:text-2xl cursor-pointer"
          onClick={() => {
            if (query.trim()) {
              navigate(`/search?query=${encodeURIComponent(query)}`);
            }
          }}
        />
      </div>
      <div className="h-full flex items-center gap-4 w-1/3 justify-end">
        {token ? (
          <button
            onClick={logout}
            className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <p
            className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer"
            onClick={() => {
              window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`;
            }}
          >
            Login
          </p>
        )}
        <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
          <img src={spotify} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
