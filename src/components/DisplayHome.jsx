import React, { useContext, useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import { songsData } from "../assets/assets";
import SongItem from "./SongItem";
import { fetchAllPlaylistData, getPlaylists } from "../api";
import { usePlayer } from '../context/PlayerContext';
import { Link } from 'react-router-dom';

const DisplayHome = () => {
  const [playlists, setPlaylists] = useState([]);
  const [topplaylists, setTopPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getPlaylists();
        setPlaylists(data);
      } catch (err) {
        setError('Failed to fetch playlists');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await fetchAllPlaylistData();
        setTopPlaylists(data);
      } catch (err) {
        setError('Failed to fetch playlists');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);
  
  if (loading) {
    return <p>Loading playlists...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div >
          <ul className="flex overflow-auto gap-4 ">
            {playlists.map(playlist => (
              <li key={playlist.id} className=' flex-shrink-0 w-40 p-2 '>
                <Link to={`/playlist/${playlist.id}`}>
                <img src={playlist.images[0].url} alt={playlist.name} className='w-40 h-40 ' />
                <p className='text-md mt-1'>{playlist.name}</p>
              </Link>
              </li>
            ))}
          </ul>
          <ul className="flex overflow-auto gap-4 ">
            {topplaylists?.map((playlist,index) => (
              <li key={playlist.id} className=' flex-shrink-0 w-40 p-2 '>
                <Link to={`/playlist/${playlist.id}`}>
                <img src={playlist.images[0].url} alt={playlist.name} className='w-40 h-40 ' />
                <p className='text-md mt-1'>{playlist.name}</p>
              </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today&apos;s Biggest Hits</h1>
        <div className="flex overflow-auto">

        </div>
      </div>
    </>
  );
};

export default DisplayHome;
