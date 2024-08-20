import axios from 'axios';
import qs from 'qs';

// Retrieve client credentials from environment variables
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
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    return null;
  }
}
export async function getTopTrendingTracks(playlistId) {
  const accessToken = await getSpotifyToken();
  if (!accessToken) return null;
  const playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };

  try {
    const response = await axios.get(playlistUrl, { headers });
    const tracks = response.data.items.map(item => item.track);

    // Extract the top 10 tracks information
    const top10Tracks = tracks.slice(0, 10);
    return top10Tracks;
  } catch (error) {
    console.error('Error fetching top trending tracks:', error);
    return null;
  }
}
export const getPlaylists = async () => {
  const token = await getSpotifyToken();
  console.log(token)
  const response = await axios.get('https://api.spotify.com/v1/browse/categories/toplists/playlists?country=IN', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.playlists.items;
};
export const getSongs = async (query) => {
  const token = await getSpotifyToken();
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

  console.log(response)
  return response.data.tracks.items; // This will return an array of tracks
};
