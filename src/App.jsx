import { useState, createContext, useRef } from "react";

import SpotifyLogin from "./components/SpotifyLogin";
import LoadNummers from "./pages/LoadNummersPage";
import GatherPlaylists from "./pages/GatherPlaylists";
import GroveSorteer from "./pages/GroveSorteer";
import KlaarMetSorteren from "./pages/KlaarMetSorteren";

import { isRedirect } from "./utils/authUtils";
import createSpotifyApi from "./utils/useSpotifyApi";

export const globalContext = createContext(null);

function App() {
  const [stage, setStage] = useState("groveSorteer");
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
            setStage("gesorteerd");
          }}
        />
      )}
      {stage === "gesorteerd" && <KlaarMetSorteren />}
    </globalContext.Provider>
  );
}

export default App;
