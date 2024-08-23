import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { FaClock } from 'react-icons/fa';
import { getPlaylistData, getTracks } from '../api/index.js';
import { millisecondsToMMSS } from '../utils';
import spotifyLogo from '/assets/spotify_logo.png';

const DisplayAlbum = () => {
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { playTrack, setTrack, setPlaylistContext } = usePlayer();
  const { id } = useParams();
  const loader = useRef(null);

  // Fetch playlist and tracks data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch playlist data
        const playlistData = await getPlaylistData(id);
        setPlaylist(playlistData);

        // Fetch tracks data
        const newTracks = await getTracks(id, offset);
        if (newTracks.length === 0) {
          setHasMore(false);
        }

        // Update tracks and playlist context
        setTracks(prevTracks => [...(prevTracks || []), ...newTracks]);
        setPlaylistContext(prevTracks => [...(prevTracks || []), ...newTracks]);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, offset, setPlaylistContext]);

  // IntersectionObserver setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          setOffset(prevOffset => prevOffset + 10); // Fetch the next set of tracks
        }
      },
      { threshold: 1.0 } // Trigger when the loader is fully visible
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading, hasMore]);

  const play = useCallback((track, e) => {
    e.preventDefault();
  
    playTrack(track);
    setTrack(track);
  }, [playTrack, setTrack]);

  if (loading && tracks.length === 0) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className={`bg-${playlist?.primary_color} px-2` }>
      {playlist && (
        <div className="flex gap-8 flex-col md:flex-row md:items-end">
          <img
            className="w-28 md:w-48 rounded"
            src={playlist?.images[0]?.url || '/path/to/default_album_cover.jpg'}
            alt={`${playlist?.name} cover`}
          />
          <div className="flex flex-col">
            <p>{playlist?.type}</p>
            <h2 className="text-5xl font-bold mb-4 md:text-7xl">{playlist?.name}</h2>
            <h4>{playlist?.description}</h4>
            <p className="mt-1">
              <img
                className="inline-block w-5"
                src={spotifyLogo}
                alt="Spotify logo"
              />
              <b> {playlist?.owner.display_name} </b>
              <b>• {playlist?.followers.total} followers </b>
              • <b>{tracks.length} songs,</b>
              <span className="text-[#a7a7a7]"> about 2hr 30 min</span>
            </p>
          </div>
        </div>
      )}
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
       className="md:px-4 my-2 grid grid-cols-3 gap-2 items-center rounded-md text-[#a7a7a7] hover:bg-[#ffffff16] cursor-pointer"
     >
       {/* First Column: Track Number, Image, and Info */}
       <div className="flex py-2 gap-4 items-center text-white text-sm md:text-[15px] col-span-2 md:col-span-1">
         <div className="flex items-center">
           <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
           <img
             src={track.album.images[0]?.url || '/path/to/default_album_cover.jpg'}
             alt={track.name}
             className="w-14 h-14 object-cover rounded-md"
           />
         </div>
         <div>
           <strong>
             {track.name.length > 20 ? track.name.slice(0, 20) + "..." : track.name}
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
     
       {/* Second Column: Album Name (Hidden on Mobile) */}
       <p className="hidden md:block md:col-span-1 text-sm text-white">
         {track.album.name}
       </p>
     
       {/* Third Column: Track Duration */}
       <p className="text-sm text-white md:col-span-1 text-end pr-2">
         {millisecondsToMMSS(track.duration_ms)}
       </p>
     </div>
     
      
      ))}
      <div ref={loader} className="text-center my-4 py-4">
        {loading && <p>Loading more...</p>}
        {!hasMore && !loading && <p>No more items</p>}
      </div>
    </div>
  );
};

export default DisplayAlbum;
