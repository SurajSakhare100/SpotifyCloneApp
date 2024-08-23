import React, { useCallback, useEffect, useState } from 'react'
import { fetchArtistsAlbums, getArtistById } from '../api';
import { useParams } from 'react-router-dom';
import { millisecondsToMMSS } from '../utils';
import { FaClock } from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';
import spotifyLogo from '/assets/spotify_logo.png';
function DisplayArtistsAlbum() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const { playTrack, setTrack, setPlaylistContext,  } = usePlayer();
  useEffect(() => {

    const fetchAlbums = async () => {
      setLoading(true)
      try {
        const data = await getArtistById(id)
        const response = await fetchArtistsAlbums(id);
        setAlbums(response);
        setArtistData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }finally{
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [id])
  const play = useCallback((track, e) => {
    e.preventDefault();

    playTrack(track);
    setTrack(track);
  }, [playTrack, setTrack]);
  return (
    <div className="p-4">
      {loading ?
      <p>Loading...</p>
      :
      <div>
      {artistData.length !== 0 && (
        <div className="flex gap-8 flex-col md:flex-row md:items-end">
          <img
            className=" w-28 md:w-48 rounded"
            src={artistData?.images[0]?.url || '/path/to/default_album_cover.jpg'}
            alt={`${artistData?.name} cover`}
          />
          <div className="flex flex-col">
            <p className='capitalize'>{artistData?.type}</p>
            <h2 className="text-5xl font-bold mb-4 md:text-7xl">{artistData?.name}</h2>
            <h4>{artistData?.description}</h4>
            <p className="mt-1">
              <img
                className="inline-block w-5"
                src={spotifyLogo}
                alt="Spotify logo"
              />
              <b className='capitalize'> {artistData?.genres.map((ara) => ara + " ")} </b>
              <b>• {artistData?.followers.total} followers </b>
              • <b>{albums.length} songs,</b>
              <span className="text-[#a7a7a7]"> about 1hr 30 min</span>
            </p>
          </div>
        </div>
      )}
      <h1 className="text-4xl font-bold my-4">Popular</h1>
      <div className="md:px-4 py-2 grid grid-cols-3 justify-between gap-2 items-center rounded-md cursor-pointer">
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
      <ul className="list-disc">
        {albums.map((track, index) => (
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
      </ul>
      </div>}
      
    </div>
  )
}

export default DisplayArtistsAlbum
