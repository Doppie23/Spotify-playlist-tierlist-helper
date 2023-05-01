import { useEffect, useState } from "react";
import { LogOutButton } from "../components/Backbutton";
import { getUserPlaylists } from "../utils/spotifyUtils";
import PlaylistsCard from "../components/Playlistcard";

import { Playlists_test } from "../components/Playlistcard-test-object";
import { Box, Container, Typography } from "@mui/material";

function GatherPlaylists() {
  const [Playlists, setPlaylists] = useState(null);

  useEffect(() => {
    // getUserPlaylists(spotifyApi).then((userPlaylists) => {
    //   setPlaylists(userPlaylists);
    // });
    setPlaylists(Playlists_test);
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
