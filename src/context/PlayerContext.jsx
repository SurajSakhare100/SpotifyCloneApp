import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  // Initialize track with default data
  const [track, setTrack] = useState({
    id: '',
    name: 'No Track Selected',
    album: {
      name: 'Unknown Album',
      images: [{ url: '' }]
    },
    preview_url: ''
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
        setTrack(prevTrack);
        if (audioRef.current) {
          audioRef.current.src = prevTrack.preview_url;
          audioRef.current.play().catch(err => console.error('Error playing previous track:', err));
          setPlayStatus(true);
        }
      }
    }
  }, [playlist, track]);

  const next = useCallback(() => {
    if (playlist.length > 0) {
      const currentIndex = playlist.findIndex((song) => song.id === track.id);
      if (currentIndex < playlist.length - 1) {
        const nextTrack = playlist[currentIndex + 1];
        setTrack(nextTrack);
        if (audioRef.current) {
          audioRef.current.src = nextTrack.preview_url;
          audioRef.current.play().catch(err => console.error('Error playing next track:', err));
          setPlayStatus(true);
        }
      }
    }
  }, [playlist, track]);

  const seekSong = useCallback((e) => {
    if (audioRef.current && seekBg.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  }, []);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current && seekBar.current) {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + '%';
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
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
  }, [audioRef]);

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
      <audio ref={audioRef} />
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
