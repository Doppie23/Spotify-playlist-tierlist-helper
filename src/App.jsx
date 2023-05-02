import { useState, createContext } from "react";

import SpotifyLogin from "./components/SpotifyLogin";
import LoadNummers from "./pages/LoadNummersPage";
import GatherPlaylists from "./pages/GatherPlaylists";
import MainPage from "./pages/MainPage";

import { isRedirect } from "./utils/authUtils";
import createSpotifyApi from "./utils/useSpotifyApi";

export const globalContext = createContext(null);

function App() {
  const [stage, setStage] = useState("login");
  const [spotifyApi, setSpotifyApi] = useState(null);
  const [Playlist, setPlaylist] = useState(null);
  const [Nummers, setNummers] = useState(null);

  useState(() => {
    // check if redirect voor auth key
    if (isRedirect()) {
      const createdapi = createSpotifyApi();
      console.log(createdapi);
      setSpotifyApi(createdapi);
      setStage("playlist");
      setTimeout(() => {
        console.log(spotifyApi);
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
      {stage === "gathernummers" && <LoadNummers />}
      {stage === "app" && <MainPage />}
    </globalContext.Provider>
  );
}

export default App;
