import { useContext } from "react";
import { usePlayer } from "../context/PlayerContext";
import { FaBackward, FaForward, FaInfinity, FaPause, FaPlay } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";

const Player = () => {
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
  } = usePlayer();

  return (
    <div className="h-[10%] bg-black grid grid-cols-3 gap-4 justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img
          src={track.album?.images[0]?.url || assets.default_album_cover}
          className="w-14 h-14"
          alt="Album Cover"
        />
        <div>
          <p className="font-semibold">{track.name}</p>
          <p className="text-[12px] text-gray-300">
            by {track.artists.map((artist) => artist.name).join(", ").slice(0, 20) + (track.artists.length > 1 ? "..." : "")}
          </p>
        </div>
      </div>
      <div className=" flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <FaBackward onClick={previous} className="cursor-pointer" />
          {playStatus ? (
            <FaPause onClick={pause} className="cursor-pointer" />
          ) : (
            <FaPlay onClick={play} className="cursor-pointer" />
          )}
          <FaForward onClick={next} className="cursor-pointer" />
          <FaInfinity />
        </div>

        {/* Time and Seek Bar */}
        <div className="flex items-center gap-5">
          <p>{`${time.currentTime.minute}:${time.currentTime.second
            .toString()
            .padStart(2, "0")}`}</p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <div
              ref={seekBar}
              className="h-1 border-none bg-green-800 rounded-full"
              style={{
                width: `${Math.floor(
                  (audioRef.current?.currentTime / audioRef.current?.duration) * 100
                )}%`
              }}
            />
          </div>
          <p>{`${time.totalTime.minute}:${time.totalTime.second
            .toString()
            .padStart(2, "0")}`}</p>
        </div>
      </div>
      <div className=" h-full flex justify-end items-center">
        <FaVolumeHigh />

      </div>
    </div> 
  );
};

export default Player;
