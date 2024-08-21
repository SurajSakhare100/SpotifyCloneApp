import { useContext } from "react";
import { assets } from "../assets/assets";
import { usePlayer } from "../context/PlayerContext";

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
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* Track Information */}
      <div className="hidden lg:flex items-center gap-4">
        <img
          src={track.album?.images[0]?.url || assets.default_album_cover}
          className="w-14 h-14"
          alt="Album Cover"
        />
        <div>
          <p className="font-semibold">{track.name}</p>
          <p className="text-[12px] text-gray-300">{track.album?.name}</p>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt="Shuffle"
          />
          <img
            onClick={previous}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt="Previous"
          />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt="Pause"
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt="Play"
            />
          )}
          <img
            onClick={next}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="Next"
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.loop_icon}
            alt="Loop"
          />
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
              style={{ width: `${Math.floor(
                (audioRef.current?.currentTime / audioRef.current?.duration) * 100
              )}%` }}
            />
          </div>
          <p>{`${time.totalTime.minute}:${time.totalTime.second
            .toString()
            .padStart(2, "0")}`}</p>
        </div>
      </div>

      {/* Additional Controls */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon} alt="Plays" />
        <img className="w-4" src={assets.mic_icon} alt="Microphone" />
        <img className="w-4" src={assets.queue_icon} alt="Queue" />
        <img className="w-4" src={assets.speaker_icon} alt="Speaker" />
        <img className="w-4" src={assets.volume_icon} alt="Volume" />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img className="w-4" src={assets.mini_player_icon} alt="Mini Player" />
        <img className="w-4" src={assets.zoom_icon} alt="Zoom" />
      </div>
    </div>
  );
};

export default Player;
