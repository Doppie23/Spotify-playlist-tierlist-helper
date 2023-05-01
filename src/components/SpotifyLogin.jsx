import { Button, Box } from "@mui/material";
import { useState } from "react";

function SpotifyLogin({ setLoggedIn }) {
  const ClientID = import.meta.env.VITE_CLIENTID;
  const [AUTHURL, setAUTHURL] = useState("");

  useState(() => {
    setAUTHURL(
      `https://accounts.spotify.com/authorize?client_id=${ClientID}&response_type=token&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private`
    );
  }, [ClientID]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button href={AUTHURL} variant="contained" onClick={setLoggedIn}>
        Login with spotify
      </Button>
    </Box>
  );
}

export default SpotifyLogin;
