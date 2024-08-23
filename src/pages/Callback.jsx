import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash
        .substring(1)
        .split("&")
        .find(elem => elem.startsWith("access_token"))
        .split("=")[1];

      // Store the token in cookies
      Cookies.set("spotify_access_token", token, { expires: 1, sameSite: 'None', secure: true });

      // Clear the hash from the URL
      window.location.hash = "";

      // Redirect to the main app
      navigate("/");
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default Callback;
