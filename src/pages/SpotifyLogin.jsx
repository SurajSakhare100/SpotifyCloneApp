import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = ["user-read-private", "user-read-email"];

const SpotifyLogin = () => {

  const handleLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-private`;
  };

  return (
    <div>
      <h1>Login with Spotify</h1>
      <button onClick={handleLogin}>Login to Spotify</button>
    </div>
  );
};

export default SpotifyLogin;
