import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const [track, setTrack] = useState({
    name: "zare se",
    album: {
      name: "zara",
      images: ""
    }
  });
  const [query, setQuery] = useState(null);
  const [playlist, setPlaylistContext] = useState(null);
  const [playlistinfo, setPlaylistContextInfo] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { minute: 0, second: 0 },
    totalTime: { minute: 0, second: 0 },
  });

  const playTrack = (currentTrack) => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.preview_url;
      audioRef.current.play();
      setTrack(currentTrack);
      setPlayStatus(true);
    }
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };
  const previous = () => {
    const songsData = playlist;
    const currentIndex = songsData.findIndex((song) => song.id === track.id);
    if (currentIndex > 0) {
      const prevTrack = songsData[currentIndex - 1];
      setTrack(prevTrack);
      if (audioRef.current) {
        audioRef.current.src = prevTrack.preview_url;
        audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const next = () => {
    const songsData = playlist;
    const currentIndex = songsData.findIndex((song) => song.id === track.id);
    if (currentIndex < songsData.length - 1) {
      const nextTrack = songsData[currentIndex + 1];
      setTrack(nextTrack);
      if (audioRef.current) {
        audioRef.current.src = nextTrack.preview_url;
        audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };
  console.log(playlist)
  const seekSong = (e) => {
    if (audioRef.current && seekBg.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

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
    playlistinfo, setPlaylistContextInfo,
    query, setQuery
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      <audio src="" ref={audioRef}></audio>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
