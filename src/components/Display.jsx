import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { useEffect, useRef } from "react";
import { albumsData } from "../assets/assets";
import SearchSongs from "../pages/SearchSongs";

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const albumData = albumsData[Number(albumId)];
  const bgColor = albumData ? albumData.bgColor : "#121212"; // Default to a safe color if albumData is not found

  useEffect(() => {
    if (isAlbum && albumData) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = "#121212";
    }
  }, [location, bgColor, isAlbum, albumData]);

  return (
    <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/playlist/:id" element={<DisplayAlbum />} />
        <Route path="/search" element={<SearchSongs />} />
      </Routes>
    </div>
  );
};

export default Display;
