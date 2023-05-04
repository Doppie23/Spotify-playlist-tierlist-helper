import { Box, Button } from "@mui/material";

function SkipSortButton({ SkipHandler }) {
  const clickHandler = () => {
    SkipHandler();
  };

  return (
    <Box sx={{ position: "absolute", top: 0, right: 0, margin: 2 }}>
      <Button variant="contained" onClick={clickHandler}>
        Skip Globale Sorteer
      </Button>
    </Box>
  );
}

export default SkipSortButton;
