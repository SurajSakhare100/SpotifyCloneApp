import { useEffect, useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { searchArtists } from "../api";
import { usePlayer } from "../context/PlayerContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const { artistPlaylist,
    setArtistPlaylist } = usePlayer();
  useEffect(() => {
    const loadArtists = async () => {
      try {
        const artistData = await searchArtists();
        setArtists(artistData);
      } catch (error) {
        console.error('Error loading artists:', error);
      }
    };

    loadArtists();
  }, []);

  const handleArtistClick = (artist) => {
    setArtistPlaylist(artist)
    navigate(`/album/${artist.id}`);
  };
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[20%] rounded flex flex-col justify-around">
        <div onClick={()=>navigate('/')} className="flex items-center gap-3 pl-8 rounded-lg py-2 cursor-pointer hover:bg-[#242424]">
         <FaHome/>
          <p className="font-b old">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer py-2 rounded-lg hover:bg-[#242424]" onClick={()=>navigate('/search')}>
          <FaSearch/>
          <p className="font-b old">Search</p>
        </div>
      </div>
      <div className="bg-[#121212] h-[85%] rounded py-6 px-2 overflow-y-auto">
        <h1 className="text-2xl  mb-2 pl-2 ">Artists</h1>
      {artists.map(artist => (
          <li
            key={artist?.id}
            className="mb-2 cursor-pointer hover:text-blue-600 py-1"
            onClick={() => handleArtistClick(artist)}
          >
            <div className="flex items-center">
              <img
                src={artist?.images[0]?.url}
                alt={artist?.name}
                className="w-12 h-12 mr-4 rounded-full"
              />
              <span>{artist?.name}</span>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
