import React, { useEffect, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { getSongs } from '../api';
import { FaBox, FaTimes } from 'react-icons/fa';
import Modal from '../components/Modal.jsx';
const SearchSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { query } = usePlayer();
  const [selectedSong, setSelectedSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playTrack,setTrack } = usePlayer();
  useEffect(() => {
    const handleSearch = async () => {
      if (!query) return;
      setLoading(true);
      setError('');

      try {
        const response = await getSongs(query);
        setSongs(response);
      } catch (err) {
        setError('Failed to fetch songs');
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [query]);
  const handleOpenModal = ( song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedSong(null);
    setIsModalOpen(false);
  };
  const play = (track, e) => {
    e.preventDefault(); // Prevent page reload
    console.log(track)
    playTrack(track);
    setTrack(track)
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
        {query && songs.map((song) => (
          <li key={song.id} className="flex gap-4  p-4 rounded-md hover:bg-[#ffffff16] cursor-pointer" onClick={(e)=>{handleOpenModal(song)}}>
            <img src={song.album.images[0]?.url || 'default_image_url'} alt={song.name} className="w-20 h-20" />
            <div>
              <strong>{song.name}</strong>
              <p>by {song.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className='w-80 fixed mt-16 bg-[#050404e2] shadow-md p-4 h-screen top-0 right-0 z-90'>
          <div className='flex items-center justify-between my-2'>
          <h2 className="text-xl font-bold">{selectedSong.name}</h2>
          <p onClick={()=>setIsModalOpen(false)} className='cursor-pointer'><FaTimes/></p>
          </div>
          <img src={selectedSong.album.images[0]?.url || 'default_image_url'} alt={selectedSong.name} className="w-full mb-2 cursor-pointer" onClick={(e)=>{play(selectedSong,e)}} />
          <p className='text-xl'>{selectedSong.album.name}</p>
          <p className='text-xl'>{selectedSong.artists.map(artist => artist.name).join(', ')}</p>

        </div>
      )}

    </div>
  );
};

export default SearchSongs;
