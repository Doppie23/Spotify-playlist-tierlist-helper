import { BackButton } from "../components/Backbutton";
import { Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { globalContext } from "../App";

import LaadWidget from "../components/NummersLaadWidget";
import { getAllSongs } from "../utils/spotifyUtils";

import { testNummers } from "../components/LoadNummers-test-object";

function LoadNummers({ WhenDone }) {
  const { Playlist, spotifyApi, setNummers } = useContext(globalContext);

  useEffect(() => {
    // * voor testen
    setNummers(testNummers);
    WhenDone();
    // * eind

    // getAllSongs(Playlist.id, spotifyApi)
    //   .then((nummers) => {
    //     setNummers(nummers);
    //     setStage("app");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }, []);

  return (
    <Container sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <LaadWidget progress={10} />
    </Container>
  );
}

export default LoadNummers;
