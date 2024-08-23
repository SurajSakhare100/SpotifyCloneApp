import { useEffect, useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TopArtists } from "../api";
import { usePlayer } from "../context/PlayerContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    const loadArtists = async () => {
      try {
        const artistData = await TopArtists();
        setArtists(artistData);
      } catch (error) {
        console.error('Error loading artists:', error);
      }
    };

    loadArtists();
  }, []);

  const handleArtistClick = (artist) => {
    navigate(`/artist/${artist.id}`);
  };
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[20%] rounded flex flex-col justify-around px-2">
        <div onClick={()=>navigate('/')} className="flex items-center text-lg gap-3 pl-8 rounded-lg py-2 cursor-pointer hover:bg-[#242424]">
         <FaHome/>
          <p className="font-b old">Home</p>
        </div>
        <div className="flex items-center text-lg  gap-3 pl-8 cursor-pointer py-2 rounded-lg hover:bg-[#242424]" onClick={()=>navigate('/search')}>
          <FaSearch/>
          <p className="font-b old">Search</p>
        </div>
      </div>
      <div className="bg-[#121212] h-[85%] rounded py-6 px-2 overflow-y-auto">
        <h1 className="text-2xl  mb-2 pl-2 ">Artists</h1>
      {artists.map(artist => (
          <li
            key={artist?.id}
            className="mb-2 cursor-pointer hover:bg-[#242424] px-2 py-2 rounded-lg"
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
