import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { FaClock } from "react-icons/fa";
import { getTopTrendingTracks } from "../api";
import { millisecondsToMMSS } from "../utils";
import { assets } from "../assets/assets";

const DisplayAlbum = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { playTrack,setTrack } = usePlayer();
  const { id } = useParams();
  const {setPlaylistContext}=usePlayer();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopTrendingTracks(id);
        setTracks(data || []);
        setPlaylistContext(data)
        
      } catch (err) {
        setError("Failed to fetch tracks");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const play = (track, e) => {
    e.preventDefault(); // Prevent page reload
    playTrack(track);
    setTrack(track)
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        {/* Uncomment and provide proper variables if image and name are available */}
        {/* <img className="w-48 rounded" src={"image"} alt={`${name} album cover`} /> */}
        <div className="flex flex-col">
          <p>Playlist</p>
          {/* <h2 className="text-5xl font-bold mb-4 md:text-7xl">{name}</h2> */}
          {/* <h4>{desc}</h4> */}
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt="Spotify logo"
            />
            <b> Spotify </b>
            <b>• 1,232,123 saves </b>
            • <b>50 songs,</b>
            <span className="text-[#a7a7a7]"> about 2hr 30 min</span>
          </p>
        </div>
      </div>
      <div className="md:px-4 mt-10 py-2 my-2 grid grid-cols-3 justify-between gap-2 items-center rounded-md cursor-pointer">
        <div>
          <p>
            <b className="mr-4">#</b>Title
          </p>
        </div>
        <div>
          <p className="hidden md:block">Album</p>
        </div>
        <div className="w-full h-full flex justify-end pr-2">
          <FaClock className="text-end" />
        </div>
      </div>
      <hr />
      {tracks.map((track, index) => (
        <div
          key={track.id}
          onClick={(e) => play(track, e)}
          className="md:px-4 my-2 grid grid-cols-2 md:grid-cols-3 justify-between gap-2 items-center rounded-md text-[#a7a7a7] hover:bg-[#ffffff16] cursor-pointer"
        >
          <div className="flex py-2 gap-4 items-center text-white text-sm md:text-[15px]" >
            <div className="flex items-center">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img
                src={track.album.images[0]?.url || assets.default_album_cover}
                alt={track.name}
                className="w-14 h-14 object-cover rounded-md"
              />
            </div>
            <div className="inline-block">
              <strong>
                {track.name.length > 20
                  ? track.name.slice(0, 20) + "..."
                  : track.name}
              </strong>
              <p className="text-[12px] text-gray-300">
                by{" "}
                {track.artists
                  .map((artist) => artist.name)
                  .join(", ")
                  .slice(0, 20) + (track.artists.length > 1 ? "..." : "")}
              </p>
            </div>
          </div>
          <p className="text-sm hidden md:block text-white">
            {track.album.name}
          </p>
          <p className="text-sm text-end text-white">
            {millisecondsToMMSS(track.duration_ms)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DisplayAlbum;
