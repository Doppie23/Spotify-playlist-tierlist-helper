import { Box, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { globalContext } from "../App";

export function BackButton({ newstage }) {
  const { setStage } = useContext(globalContext);
  const clickHandler = () => {
    setStage(newstage);
  };

  return (
    <Box sx={{ position: "absolute", top: 0, left: 0, margin: 2 }}>
      <Button onClick={clickHandler}>back</Button>
    </Box>
  );
}

export function LogOutButton() {
  const { setStage, setSpotifyApi } = useContext(globalContext);

  const clickHandler = () => {
    setStage("login");
    setSpotifyApi(null);
  };

  return (
    <Box sx={{ position: "absolute", top: 0, left: 0, margin: 2 }}>
      <Button onClick={clickHandler} startIcon={<LogoutIcon sx={{ transform: "rotate(180deg)" }} />}>
        Log Out
      </Button>
    </Box>
  );
}
