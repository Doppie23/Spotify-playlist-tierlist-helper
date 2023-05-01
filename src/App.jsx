import { useState, createContext } from "react";

import SpotifyLogin from "./components/SpotifyLogin";
import GatherPlaylists from "./pages/GatherPlaylists";

import { isRedirect } from "./utils/authUtils";
import createSpotifyApi from "./utils/useSpotifyApi";

export const globalContext = createContext(null);

function App() {
  const [stage, setStage] = useState("login");
  const [spotifyApi, setSpotifyApi] = useState(null);

  useState(() => {
    // check if redirect voor auth key
    if (isRedirect()) {
      setSpotifyApi(createSpotifyApi());
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
      }}
    >
      {stage === "login" && (
        <SpotifyLogin
          setLoggedIn={() => {
            setStage("enterauthcode");
          }}
        />
      )}
      {stage === "playlist" && <GatherPlaylists onDataReady={() => setStage("app")} />}
    </globalContext.Provider>
  );
}

export default App;
