import { Button, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function SpotifyLogin({ setLoggedIn }) {
  const ClientID = import.meta.env.VITE_CLIENTID;
  const [AUTHURL, setAUTHURL] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [IsMobile, setIsMobile] = useState(false);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    if (width <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

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
        flexDirection: "column",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Box my={4} textAlign="center" maxWidth={600}>
        <Typography variant="h4" mb={2}>
          Spotify Playlist Sorter
        </Typography>
        <Typography variant="body1" color={"text.secondary"} my={1} textAlign={"justify"}>
          Met deze handige app wordt het sorteren van nummers in jouw Spotify playlist een fluitje van een cent. Het enige wat je hoeft te
          doen, is de gewenste playlist selecteren en vervolgens de nummers sorteren in twee verschillende fases, zodat je tot een
          nauwkeurig resultaat komt. Een globale fase en een precieze fase.
        </Typography>
        <Typography variant="body1" color={"text.secondary"} my={1} textAlign={"justify"}>
          En als je het gevoel hebt dat je wat haast hebt kan op de knop "Precieze&nbsp;Sorteer" klikken en kan je de globale sorteer fase
          overslaan en direct doorgaan naar de precieze sorteer fase.
        </Typography>
        <Typography variant="body1" color={"text.secondary"} my={1} textAlign={"justify"}>
          Met deze app kun je makkelijk en snel persoonlijke Spotify toplijsten maken, zonder gedoe of stress. Dus waar wacht je nog op?
          Start nu en geniet van een perfect georganiseerde playlist! 😊
        </Typography>
        {IsMobile ? (
          <Typography color={"gray"} fontSize={14}>
            Deze website is niet gemaakt voor smartphones, houdt daar rekening mee.
          </Typography>
        ) : null}
      </Box>
      <Button href={AUTHURL} variant="contained" onClick={setLoggedIn}>
        Login met spotify
      </Button>
    </Box>
  );
}

export default SpotifyLogin;
