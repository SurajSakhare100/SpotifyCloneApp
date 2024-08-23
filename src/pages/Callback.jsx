// Callback.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    console.log(hash)
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      console.log(token)
      if (token) {
        Cookies.set('spotify_access_token', token, { 
          expires: 1, // Set expiry as needed
          sameSite: 'None', 
          secure: true 
        });
        window.location.hash = ''; // Clear the fragment
        navigate('/'); 
      } else {
        // Handle error or missing token
        console.error('Access token not found in URL');
        navigate('/error'); // Redirect to an error page if needed
      }
    }
  }, [navigate]);

  return <div>Processing...</div>;
};

export default Callback;
