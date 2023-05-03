import { Card, Box, CardContent, Typography, CardMedia } from "@mui/material";

export default function CardNummer({ Nummer }) {
  const getArtist = () => {
    let artists = [];
    Nummer.track.artists.forEach((artistObject) => {
      artists.push(artistObject.name);
    });
    return artists.join(", ");
  };

  return (
    <Card sx={{ display: "flex", margin: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5" sx={{ fontSize: 20 }}>
            {Nummer.track.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontSize: 12 }}>
            {getArtist()}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {/* <IconButton aria-label="previous">{theme.direction === "rtl" ? <SkipNextIcon /> : <SkipPreviousIcon />}</IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">{theme.direction === "rtl" ? <SkipPreviousIcon /> : <SkipNextIcon />}</IconButton> */}
        </Box>
      </Box>
      <CardMedia sx={{ marginLeft: "auto", width: 80 }} component="img" image={Nummer.track.album.images[1].url} alt="album cover" />
    </Card>
  );
}
