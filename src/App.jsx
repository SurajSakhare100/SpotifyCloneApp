import { useContext } from "react"
import Display from "./components/Display"
import Player from "./components/Player"
import Sidebar from "./components/Sidebar"
import PlayerContextProvider from "./context/PlayerContext"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <PlayerContextProvider >
      <div className="w-full h-screen bg-black font-poppins">
        <Navbar />
        <div className="h-[80%] flex">
          <Sidebar />
          <Display />
        </div>
        <Player />
        
      </div>
    </PlayerContextProvider>
  )
}

export default App