import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import Cookies from 'js-cookie';

const Callback = () => {
  const navigate = useNavigate();
  // const { setToken } = usePlayer();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      // Extract token from URL hash
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');

      if (token) {
        // Calculate expiration time (6 hours from now)
        const expires = new Date();
        expires.setTime(expires.getTime() + (6 * 60 * 60 * 1000)); // 6 hours in milliseconds

        // Store the token in a cookie
        Cookies.set('spotify_access_token', token, { 
          expires: expires,
          sameSite: 'None',
          secure: true,
        });
        // setToken(token);

        // Clear hash to prevent re-processing on page reload
        window.location.hash = '';
      }
    }

    // Redirect to the home page
    navigate('/');
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default Callback;
