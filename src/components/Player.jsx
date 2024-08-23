import { useContext, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { FaBackward, FaForward, FaHeadSideCough, FaInfinity, FaModx, FaMusic, FaPause, FaPlay, FaSpotify, FaStepForward } from "react-icons/fa";
import { FaCube,  FaRepeat, FaShuffle, FaVolumeHigh } from "react-icons/fa6";

const Player = () => {
  const [val, setVal] = useState(true);
  const {
    audioRef,
    seekBg,
    seekBar,
    track,
    playStatus,
    play,
    pause,
    previous,
    next,
    seekSong,
    time,
    isModalOpen,
    setIsModalOpen
  } = usePlayer();
  const handleModal = () => {
    setVal(!val)
    setIsModalOpen(val)
  }
  return (
    <div className="h-[10%] shadow-sm shadow-white bottom-0 z-200 fixed w-full bg-black grid grid-cols-1 md:grid-cols-2 justify-center lg:grid-cols-3 gap-4 text-white px-4">
  
    {/* Album Cover and Track Info */}
    <div className="hidden lg:flex items-center gap-4">
      <img
        src={track.album?.images[0]?.url || assets.default_album_cover}
        className="w-14 h-14"
        alt="Album Cover"
      />
      <div>
        <p className="font-semibold">{track.name}</p>
        <p className="text-[12px] text-gray-300">
          by{" "}
          {track.artists
            .map((artist) => artist.name)
            .join(", ")
            .slice(0, 20) + (track.artists.length > 1 ? "..." : "")}
        </p>
      </div>
    </div>
  
    {/* Playback Controls */}
    <div className="h-full flex flex-col  justify-center items-center gap-1">
      <div className="flex gap-4 items-center">
        <FaBackward onClick={previous} className="cursor-pointer" />
        {playStatus ? (
          <FaPause onClick={pause} className="cursor-pointer" />
        ) : (
          <FaPlay onClick={play} className="cursor-pointer" />
        )}
        <FaForward onClick={next} className="cursor-pointer" />
        {/* <FaInfinity /> */}
      </div>
  
      {/* Time and Seek Bar */}
      <div className="flex items-center gap-5 w-full max-w-lg">
        <p>{`${time.currentTime.minute}:${time.currentTime.second
          .toString()
          .padStart(2, "0")}`}</p>
        <div
          ref={seekBg}
          onClick={seekSong}
          className="w-full bg-gray-300 rounded-full cursor-pointer"
        >
          <div
            ref={seekBar}
            className="h-1 bg-green-800 rounded-full"
            style={{
              width: `${Math.floor(
                (audioRef.current?.currentTime / audioRef.current?.duration) * 100
              )}%`,
            }}
          />
        </div>
        <p>{`${time.totalTime.minute}:${time.totalTime.second
          .toString()
          .padStart(2, "0")}`}</p>
      </div>
    </div>
  
    {/* Volume and Modal Controls */}
    <div className="hidden md:flex justify-end md:pr-10 gap-4 text-md items-center">
      <FaVolumeHigh className="cursor-pointer" />
      <FaRepeat/>
      <FaSpotify/>
      <FaShuffle/>
      <FaMusic/>
      <FaCube onClick={handleModal} className="cursor-pointer" />
    </div>
  </div>
  

  );
};

export default Player;
