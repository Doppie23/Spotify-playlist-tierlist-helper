import { Container } from "@mui/material";
import { useContext, useEffect } from "react";
import { globalContext } from "../App";

import LaadWidget from "../components/NummersLaadWidget";
import { getAllSongs } from "../utils/spotifyUtils";

function LoadNummers({ WhenDone }) {
  const { Playlist, spotifyApi, setNummers } = useContext(globalContext);

  useEffect(() => {
    // * voor testen
    // setNummers(testNummers);
    // WhenDone();
    // * eind

    getAllSongs(Playlist.id, spotifyApi)
      .then((nummers) => {
        setNummers(nummers);
        WhenDone();
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Container sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <LaadWidget progress={10} />
    </Container>
  );
}

export default LoadNummers;
