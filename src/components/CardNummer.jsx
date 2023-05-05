import { PropTypes } from "prop-types";
import { Card, Box, CardContent, Typography, CardMedia, IconButton } from "@mui/material";
import { useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

export default function CardNummer({ Nummer }) {
  const [Playing, setPlaying] = useState(false);
  const audioobj = new Audio(Nummer.track.preview_url);
  audioobj.loop = true;
  const audio = useRef(audioobj);

  const getArtist = () => {
    let artists = [];
    Nummer.track.artists.forEach((artistObject) => {
      artists.push(artistObject.name);
    });
    return artists.join(", ");
  };

  const clickHandler = () => {
    if (Playing) {
      audio.current.pause();
    } else {
      audio.current.play();
    }
    setPlaying(!Playing);
  };

  return (
    <Card sx={{ display: "flex", margin: 2, height: 100 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5" sx={{ fontSize: 20 }}>
            {Nummer.track.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontSize: 12 }}>
            {getArtist()}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ marginLeft: "auto", display: "flex", width: 100 }}>
        <Box sx={{ width: "100%" }}>
          <Box bgcolor={"black"} width={"100%"} height={"100%"} sx={{ opacity: 0.4 }}></Box>
        </Box>
        <Box sx={{ width: "100%", marginLeft: "-100%" }}>
          <CardMedia component="img" image={Nummer.track.album.images[1].url} alt="album cover" sx={{ width: 100 }} />
        </Box>
        <Box
          sx={{
            width: "100%",
            marginLeft: "-100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton aria-label="play/pause" onClick={clickHandler} size="small">
            {Playing ? <PauseIcon sx={{ height: 38, width: 38 }} /> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}

CardNummer.propTypes = {
  Nummer: PropTypes.object,
};
