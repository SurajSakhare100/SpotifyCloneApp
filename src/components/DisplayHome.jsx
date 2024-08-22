import React, { useContext, useEffect, useState } from 'react';
import {  getTopPlayListInIndia, getCategoryPlaylists } from "../api";
import { Link } from 'react-router-dom';

const DisplayHome = () => {
  const [playlists, setPlaylists] = useState([]);
  const [categoryPlaylist, setCategoryPlaylist] = useState([]);
  const [category, setCategory] = useState("pop");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const spotifyCategories = [
    "toplists",
    "pop",
    "hiphop",
    "chill",
    "mood",
    "workout",
    "romance",
    "party",
    "focus",
    "rock",
  ];
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getTopPlayListInIndia();
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
    const fetchArtists = async () => {
      try {
        const data = await getCategoryPlaylists(category);
        setCategoryPlaylist(data);
      } catch (err) {
        setError('Failed to fetch artists');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [category]);
  if (loading) {
    return <p>Loading playlists...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today&apos;s Biggest Hits</h1>
        <div className="flex overflow-auto">
          <ul className="flex  flex-wrap  gap-4 ">
            {playlists.map(playlist => (
              <li key={playlist.id} className=' flex-shrink-0 w-48 p-2 '>
                <Link to={`/playlist/${playlist.id}`}>
                  <img src={playlist.images[0].url} alt={playlist.name} className='w-48 h-48 ' />
                  <p className='text-md mt-1'>{playlist.name}</p>
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </div>
      <div className="mb-4">
        <h1 className="mt-5 font-bold text-2xl">Featured Charts</h1>
        <div className='flex gap-4 overflow-auto py-6'>
          {spotifyCategories?.map((spotifyCategory,index)=>(
          <button 
        className={`w-30 rounded-2xl  ${spotifyCategory==category?"bg-white text-black":"bg-gray-500 text-white"}  shadow-md hover:text-black mx-2 px-6 
          py-2 capitalize hover:bg-white cursor-pointer transition-all delay-10 ease-in-out`}
          key={index}
          onClick={()=>setCategory(spotifyCategory)}
          >{spotifyCategory}</button>
          ))}
        </div>
        <div >
          <ul className="flex flex-wrap gap-4 ">
            {categoryPlaylist?.map((playlist, index) => (
              <li key={playlist.snapshot_id} className=' flex-shrink-0 w-48 p-2 '>
                <Link to={`/playlist/${playlist.id}`}>
                  <img src={playlist.images[0].url} alt={playlist.name} className='w-48 h-48 ' />
                  <p className='text-md mt-1'>{playlist.name}</p>
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </div>

    </>
  );
};

export default DisplayHome;
