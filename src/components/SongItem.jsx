import { useContext } from "react";
import PropTypes from "prop-types";
import { usePlayer } from "../context/PlayerContext";

const SongItem = ({ name, image, desc, id }) => {
  const { playTrack } = usePlayer();


  return (
    <div onClick={() => playWithId(id)} className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

SongItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default SongItem;
