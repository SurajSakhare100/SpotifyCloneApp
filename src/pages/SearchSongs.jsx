import React, { useEffect, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { getSongs } from '../api';
import { FaBox, FaTimes } from 'react-icons/fa';
import Modal from '../components/Modal.jsx';
import { useNavigate } from 'react-router-dom';
const SearchSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [type, setType] = useState("track");
  const { query ,track,setTrack,isModalOpen, 
    setIsModalOpen} = usePlayer();
  const navigate = useNavigate();

  const spotifyTypes = [
    "track",
    "artist",
    "playlist"
  ];
  useEffect(() => {
    const handleSearch = async () => {
      if (!query) return;
      setLoading(true);
      setError('');

      try {
        const response = await getSongs(query, type);
        setSongs(response);
      } catch (err) {
        setError('Failed to fetch songs');
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [query, type]);
  const handleItemClick = (item) => {
    if (item.type === 'artist') {
      navigate(`/artist/${item.id}`);
    } else if (item.type === 'playlist') {
      navigate(`/playlist/${item.id}`);
    } else if (item.type === 'track') {
      setTrack(item);
    }
  };
  return (
    <div className="w-full relative">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && query && songs.length === 0 && (
        <p>No songs found for "{query}".</p>
      )}

      {query === "" && !loading && !error && (
        <p className='text-center text-2xl'>Please enter something to search.</p>
      )}

      <ul className="flex flex-col gap-4">
        {query && <div className='flex gap-4 overflow-auto md:py-6'>
          {spotifyTypes?.map((spotifyType, index) => (
            <button
              className={`w-30 rounded-2xl  ${spotifyType == type ? "bg-white text-black" : "bg-gray-500 text-white"}  shadow-md hover:text-black px-6 
          py-2 capitalize hover:bg-white cursor-pointer transition-all delay-10 ease-in-out`}
              key={index}
              onClick={() => setType(spotifyType)}
            >{spotifyType}s</button>
          ))}
        </div>

        }
        <ul className='z-10'>
        {query && songs.map((item) => {
          // Destructure the necessary properties based on the type of item
          let imageUrl = '';
          let name = '';
          let subInfo = '';

          if (item.type === 'track') {
            imageUrl = item.album.images[0]?.url || 'default_image_url';
            name = item.name;
            subInfo = `by ${item.artists.map(artist => artist.name).join(', ')}`;
          } else if (item.type === 'playlist') {
            imageUrl = item.images[0]?.url || 'default_image_url';
            name = item.name;
            subInfo = `${item.tracks.total} songs`;
          } else if (item.type === 'artist') {
            imageUrl = item.images[0]?.url || 'default_image_url';
            name = item.name;
            subInfo = `${item.followers.total} followers`;
          }

          return (
            <li key={item.id} className="flex gap-4 p-4 rounded-md hover:bg-[#ffffff16] cursor-pointer" onClick={() => handleItemClick(item)}>
              <img src={imageUrl} alt={name} className="w-20 h-20" />
              <div>
                <strong>{name}</strong>
                <p>{subInfo}</p>
              </div>
            </li>
          );
        })}
        </ul>


      </ul>


    </div>
  );
};

export default SearchSongs;
