import React from "react";
import { Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import SearchSongs from "../pages/SearchSongs";
import DisplayArtistsAlbum from "./DisplayArtistsAlbum";

const Display = () => {
  return (
    <div className="w-full m-2 md:px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/search" element={<SearchSongs />} />
        <Route path="/playlist/:id" element={<DisplayAlbum />} />
        <Route path="/artist/:id" element={<DisplayArtistsAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
