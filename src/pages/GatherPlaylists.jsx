import { useContext, useEffect, useState } from "react";
import { LogOutButton } from "../components/Backbutton";
import PlaylistsCard from "../components/Playlistcard";
import { getUserPlaylists } from "../utils/spotifyUtils";

import { Box, Container, Typography } from "@mui/material";
import { globalContext } from "../App";

function GatherPlaylists() {
  const [Playlists, setPlaylists] = useState(null);
  const { spotifyApi } = useContext(globalContext);

  useEffect(() => {
    // * voor testen
    // setPlaylists(Playlists_test);
    // * eind

    getUserPlaylists(spotifyApi).then((userPlaylists) => {
      setPlaylists(userPlaylists);
    });
  }, []);

  return (
    <Container>
      <LogOutButton />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} py={4}>
        <Typography p={4} variant="h4" textAlign={"center"}>
          Kies de juiste playlist.
        </Typography>
        <PlaylistsCard playlists={Playlists} />
      </Box>
    </Container>
  );
}

export default GatherPlaylists;
