import { Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import SearchSongs from "../pages/SearchSongs";

const Display = () => {
  return (
    <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/playlist/:id" element={<DisplayAlbum />} />
        <Route path="/search" element={<SearchSongs />} />
      </Routes>
    </div>
  );
};

export default Display;
