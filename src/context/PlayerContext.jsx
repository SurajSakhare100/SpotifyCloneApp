import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import img from '../../public/assets/img5.jpg';
import song from '../../public/assets/song5.mp3'; // Importing the audio file
const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  // Initialize track with default data
  const [track, setTrack] = useState({
    id: '',
    name: 'Illuminati',
    album: {
      name: 'Illuminati',
      images: [{ url: img }]
    },
    artists: [{
      name: "Vinayak Sasikumar"
    }],
    preview_url: song
  });
  const [query, setQuery] = useState("");
  const [playlist, setPlaylistContext] = useState([]);
  const [playlistinfo, setPlaylistContextInfo] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { minute: 0, second: 0 },
    totalTime: { minute: 0, second: 0 },
  });

  const playTrack = useCallback((currentTrack) => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.preview_url;
      audioRef.current.play().catch(err => console.error('Error playing track:', err));
      setTrack(currentTrack);
      setPlayStatus(true);
    }
  }, []);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.error('Error playing audio:', err));
      setPlayStatus(true);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  }, []);

  const previous = useCallback(() => {
    if (playlist.length > 0) {
      const currentIndex = playlist.findIndex((song) => song.id === track.id);
      if (currentIndex > 0) {
        const prevTrack = playlist[currentIndex - 1];
        playTrack(prevTrack);
      }
    }
  }, [playlist, track, playTrack]);

  const next = useCallback(() => {
    if (playlist.length > 0) {
      const currentIndex = playlist.findIndex((song) => song.id === track.id);
      if (currentIndex >= 0 && currentIndex < playlist.length - 1) {
        const nextTrack = playlist[currentIndex + 1];
        playTrack(nextTrack);
      }
    }
  }, [playlist, track, playTrack]);

  const seekSong = useCallback((e) => {
    if (audioRef.current && seekBg.current) {
      const duration = audioRef.current.duration || 0;
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * duration;
    }
  }, []);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current && seekBar.current) {
        const duration = audioRef.current.duration || 0;
        const currentTime = audioRef.current.currentTime || 0;

        seekBar.current.style.width =
          Math.floor((currentTime / duration) * 100) + '%';

        setTime({
          currentTime: {
            second: Math.floor(currentTime % 60),
            minute: Math.floor(currentTime / 60),
          },
          totalTime: {
            second: Math.floor(duration % 60),
            minute: Math.floor(duration / 60),
          },
        });
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [audioRef,playStatus,playlist,track]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    play,
    pause,
    previous,
    next,
    seekSong,
    playTrack,
    time,
    playlist,
    setPlaylistContext,
    playlistinfo,
    setPlaylistContextInfo,
    query,
    setQuery,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      <audio ref={audioRef} src={track.preview_url}/>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;