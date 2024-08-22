import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const token = hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))
      .split("=")[1];

    if (token) {
        Cookies.set("spotify_access_token", token, { 
            expires: 1, 
            sameSite: 'None', 
            secure: true 
          });
      window.location.hash = ""; // Clear the hash from the URL
      navigate("/"); // Redirect to home or another page
    } else {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);

  return null;
};

export default Callback;
