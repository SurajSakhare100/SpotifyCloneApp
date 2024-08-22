import React, { useCallback, useEffect, useState } from 'react'
import { fetchArtistsAlbums } from '../api';
import { useParams } from 'react-router-dom';
import { millisecondsToMMSS } from '../utils';
import { FaClock } from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';
import spotifyLogo from '/assets/spotify_logo.png';
function DisplayArtistsAlbum() {
    const { id } = useParams();
    const [albums, setAlbums] = useState([]);
    const { playTrack, setTrack, setPlaylistContext,artistPlaylist,
        setArtistPlaylist } = usePlayer();
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetchArtistsAlbums(id);
                setAlbums(response);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };

        fetchAlbums();
    }, [id])
    const play = useCallback((track, e) => {
        e.preventDefault();
      
        playTrack(track);
        setTrack(track);
      }, [playTrack, setTrack]);
      console.log(artistPlaylist)
    return (
        <div className="p-4">
            {artistPlaylist && (
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
          <img
            className="w-48 rounded"
            src={artistPlaylist?.images[0]?.url || '/path/to/default_album_cover.jpg'}
            alt={`${artistPlaylist?.name} cover`}
          />
          <div className="flex flex-col">
            <p>{artistPlaylist?.type}</p>
            <h2 className="text-5xl font-bold mb-4 md:text-7xl">{artistPlaylist?.name}</h2>
            <h4>{artistPlaylist?.description}</h4>
            <p className="mt-1">
              <img
                className="inline-block w-5"
                src={spotifyLogo}
                alt="Spotify logo"
              />
              {/* <b> {artistPlaylist?.owner.display_name} </b> */}
              <b>• {artistPlaylist?.followers.total} followers </b>
              • <b>{tracks.length} songs,</b>
              <span className="text-[#a7a7a7]"> about 2hr 30 min</span>
            </p>
          </div>
        </div>
      )}
            <h1 className="text-2xl font-bold mb-4">Albums</h1>
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
            <ul className="list-disc">
                {albums.map((track, index) => (
                    <div
                        key={track.id}
                        onClick={(e) => play(track, e)}
                        className="md:px-4 my-2 grid grid-cols-2 md:grid-cols-3 justify-between gap-2 items-center rounded-md text-[#a7a7a7] hover:bg-[#ffffff16] cursor-pointer"
                    >
                        <div className="flex py-2 gap-4 items-center text-white text-sm md:text-[15px]">
                            <div className="flex items-center">
                                <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                                <img
                                    src={track.album.images[0]?.url || '/path/to/default_album_cover.jpg'}
                                    alt={track.name}
                                    className="w-14 h-14 object-cover rounded-md"
                                />
                            </div>
                            <div className="inline-block">
                                <strong>
                                    {track.name.length > 20 ? track.name.slice(0, 20) + "..." : track.name}
                                </strong>
                                <p className="text-[12px] text-gray-300">
                                    by {track.artists.map((artist) => artist.name).join(", ").slice(0, 20) + (track.artists.length > 1 ? "..." : "")}
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
            </ul>
        </div>
    )
}

export default DisplayArtistsAlbum
