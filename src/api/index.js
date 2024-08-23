import axios from 'axios';
import qs from 'qs';

// Fetch environment variables
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export async function getSpotifyToken() {
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const data = qs.stringify({ grant_type: "client_credentials" });

  // Create the authorization header
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = btoa(credentials); // For browser environment
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${encodedCredentials}`,
  };

  try {
    const response = await axios.post(tokenUrl, data, { headers });
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Spotify token:", error.message);
    return null;
  }
}

export async function getTracks(playlistId, offset = 0) {
  const token = await getSpotifyToken();
  const limit = 10;
  if (!token) return [];

  const playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(playlistUrl, {
      headers,
      params: { offset, limit },
    });

    return response.data.items.map(item => item.track);
  } catch (error) {
    console.error("Error fetching playlist tracks:", error.message);
    return [];
  }
}

export const getTopPlayListInIndia = async () => {
  const token = await getSpotifyToken();
  if (!token) return [];

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/categories/toplists/playlists?country=IN",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.playlists.items;
  } catch (error) {
    console.error("Error fetching top playlists:", error.message);
    return [];
  }
};

export const getSongs = async (query, type) => {
  const token = await getSpotifyToken();
  if (!token) return null;

  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: query, type, limit: 10 },
    });

    switch (type) {
      case "artist":
        return response.data.artists.items;
      case "playlist":
        return response.data.playlists.items;
      case "track":
        return response.data.tracks.items;
      default:
        return [];
    }
  } catch (error) {
    console.error("Error searching for songs:", error.message);
    return [];
  }
};

export const getPlaylistData = async (id) => {
  const token = await getSpotifyToken();
  if (!token) return null;

  try {
    const playlistData = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return playlistData.data;
  } catch (error) {
    console.error("Error fetching playlist data:", error.message);
    return null;
  }
};

export const getTracksData = async (id) => {
  const token = await getSpotifyToken();
  if (!token) return null;

  try {
    const tracksData = await axios.get(
      `https://api.spotify.com/v1/tracks/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return tracksData.data;
  } catch (error) {
    console.error("Error fetching track data:", error.message);
    return null;
  }
};

export const getCategoryPlaylists = async (categoryId) => {
  const token = await getSpotifyToken();
  if (!token) return null;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 10 },
      }
    );
    return response.data.playlists.items;
  } catch (error) {
    console.error("Error fetching category playlists:", error.message);
    return [];
  }
};

export const TopArtists = async () => {
  const token = await getSpotifyToken();
  if (!token) throw new Error("Unable to fetch Spotify token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const requests = artistNames.map(name =>
      axios.get("https://api.spotify.com/v1/search", {
        headers,
        params: { q: name, type: "artist", limit: 1 },
      })
    );

    const responses = await Promise.all(requests);
    return responses.map(response => response.data.artists.items[0]);
  } catch (error) {
    console.error("Error fetching artist information:", error.message);
    throw new Error("Error fetching artist information");
  }
};

// Example usage
const artistNames = [
  "Arijit Singh",
  "Shreya Ghoshal",
  "Neha Kakkar",
  "Badshah",
  "Tanishk Bagchi",
  "Atif Aslam",
  "Sonu Nigam",
  "Kumar Sanu",
  "Kailash Kher",
  "A.R. Rahman",
  "Jubin Nautiyal",
  "Udit Narayan",
  "Himesh Reshammiya",
  "Mohan Kanan",
  "Papon",
  "Amit Trivedi",
  "Gulzar",
  "Lata Mangeshkar",
  "Kriti Kharbanda",
  "Sukhwinder Singh",
];
TopArtists(artistNames);

export const fetchArtistsAlbums = async (artistId) => {
  try {
    const token = await getSpotifyToken();
    if (!token) throw new Error("Unable to fetch Spotify token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      { headers }
    );
    return response.data.tracks;
  } catch (error) {
    console.error("Error fetching albums:", error.message);
    return [];
  }
};

export const getArtistById = async (id) => {
  const token = await getSpotifyToken();
  if (!token) return null;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching artist:", error.message);
    return null;
  }
};
