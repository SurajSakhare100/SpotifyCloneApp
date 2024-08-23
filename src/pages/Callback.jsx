// Callback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the token from the URL fragment
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const tokenType = params.get('token_type');
    const expiresIn = params.get('expires_in');

    if (accessToken) {
      // Store the token in cookies or local storage
      Cookies.set('access_token', accessToken, { expires: 1 }); // Cookie expires in 1 day
      Cookies.set('token_type', tokenType, { expires: 1 });
      Cookies.set('expires_in', expiresIn, { expires: 1 });

      // Optionally redirect to a different page
      navigate('/');
    } else {
      console.error('Access token not found');
      // Handle the error as needed
      navigate('/error'); // Redirect to an error page or show a message
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
