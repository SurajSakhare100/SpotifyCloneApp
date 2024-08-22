import axios from 'axios';
import qs from 'qs';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export async function getSpotifyToken() {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const data = qs.stringify({ grant_type: 'client_credentials' });

  // Create the authorization header
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = btoa(credentials); // Use btoa for Base64 encoding in the browser
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${encodedCredentials}`,
  };

  try {
    const response = await axios.post(tokenUrl, data, { headers });
    // setToken(response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    return null;
  }
}


export async function getTracks(playlistId, offset = 0) {
  const token = await getSpotifyToken();
  const limit=10;
  if (!token) return [];

  const playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const headers = {
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await axios.get(playlistUrl, {
      headers,
      params: {
        offset,
        limit
      }
    });

    const tracks = response.data.items.map(item => item.track);

    // Return the fetched tracks
    return tracks;
  } catch (error) {
    console.error('Error fetching playlist tracks:', error);
    return [];
  }
}

export const getTopPlayListInIndia = async () => {
  const token = await getSpotifyToken();
  const response = await axios.get('https://api.spotify.com/v1/browse/categories/toplists/playlists?country=IN', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.playlists.items;
};
export const getSongs = async (query) => {
  const token = await getSpotifyToken();
  if (!token) return null;
  const response = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: query,
      type: 'track', // Searching for tracks
      limit: 10, // Limit the results
    },
  });

  return response.data.tracks.items; // This will return an array of tracks
};

export const getPlaylistData = async (id) => {
  const token = await getSpotifyToken();
  if (!token) return null;
  const playlistData = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
       
      });
     
  return playlistData.data;
};

export const getCategoryPlaylists = async (categoryId) => {
  const token = await getSpotifyToken();
  if (!token) return null;
  const config = {
    method: 'get',
    url: `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
    headers: {
      'Authorization': `Bearer ${token}`
    },params:{
      limit:10,
    }}

  try {
    const response = await axios(config);
    const playlists = response.data.playlists.items;

    return playlists;
  } catch (error) {
    console.error('Error fetching top artists:', error.response.data);
  }
}; 