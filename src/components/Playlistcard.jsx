import { Card, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";

import { globalContext } from "../App";
import { useContext } from "react";

function PlaylistsCard({ playlists }) {
  const { setStage } = useContext(globalContext);

  const clickHandler = (playlist) => {
    console.log(playlist);
    setStage("gathernummers");
  };

  if (playlists == null) {
    return <div>Loading...</div>;
  }
  return (
    <Grid container spacing={2} maxWidth={800}>
      {playlists.map((playlist) => {
        return (
          <Grid item key={playlist.id} xs={6} sm={3} md={2}>
            <Card key={playlist.id} sx={{ width: 100, height: 150, cursor: "pointer" }} onClick={() => clickHandler(playlist)}>
              <CardMedia component="img" image={playlist.images[0]?.url} alt={playlist.name} />
              <CardContent sx={{ padding: 1 }}>
                <Typography fontSize={12}>{playlist.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default PlaylistsCard;
