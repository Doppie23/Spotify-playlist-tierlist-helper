import { createContext, useRef, useState } from "react";

import SpotifyLogin from "./components/SpotifyLogin";
import FinalPlaylist from "./pages/FinalPlaylist";
import GatherPlaylists from "./pages/GatherPlaylists";
import GroveSorteer from "./pages/GroveSorteer";
import LoadNummers from "./pages/LoadNummersPage";
import PreciezeSorteer from "./pages/preciezeSorteer";

import { isRedirect } from "./utils/authUtils";
import createSpotifyApi from "./utils/useSpotifyApi";

export const globalContext = createContext(null);

function App() {
  const [stage, setStage] = useState("login");
  const [spotifyApi, setSpotifyApi] = useState(null);
  const [Playlist, setPlaylist] = useState(null);
  const [Nummers, setNummers] = useState(null);
  const GrofGesorteerdeNummers = useRef({});

  useState(() => {
    // check if redirect voor auth key
    if (isRedirect()) {
      const createdapi = createSpotifyApi();
      setSpotifyApi(createdapi);
      setStage("playlist");
      setTimeout(() => {
        window.history.pushState({}, null, "/");
      }, 50); // hier moet perse timeout, geen idee waarom
    }
  }, []);

  return (
    <globalContext.Provider
      value={{
        setStage,
        spotifyApi,
        setSpotifyApi,
        Playlist,
        setPlaylist,
        Nummers,
        setNummers,
        GrofGesorteerdeNummers,
      }}
    >
      {stage === "login" && (
        <SpotifyLogin
          setLoggedIn={() => {
            setStage("enterauthcode");
          }}
        />
      )}
      {stage === "playlist" && <GatherPlaylists />}
      {stage === "gathernummers" && <LoadNummers WhenDone={() => setStage("groveSorteer")} />}
      {stage === "groveSorteer" && (
        <GroveSorteer
          WhenDone={() => {
            setStage("PreciesSorteer");
          }}
        />
      )}
      {stage === "PreciesSorteer" && <PreciezeSorteer GesorteerdeNummers={GrofGesorteerdeNummers} WhenDone={() => setStage("klaar")} />}
      {stage === "klaar" && <FinalPlaylist GesorteerdeNummers={GrofGesorteerdeNummers} />}
    </globalContext.Provider>
  );
}

export default App;
