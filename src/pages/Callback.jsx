// Callback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = null;
    
    if (hash) {
      const urlParams = new URLSearchParams(hash.substring(1));
      token = urlParams.get("access_token");
      
      if (token) {
        Cookies.set("spotifyAuthToken", token, { expires: 1 }); // Store token in cookies
        navigate("/");
      }
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
