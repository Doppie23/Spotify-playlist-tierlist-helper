import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Box, Button, Container, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { globalContext } from "../App";
import { LogOutButton } from "../components/BackButton";
import CardNummer from "../components/CardNummer";
import { MakeLinksFromObject, getNummerObjectFromID } from "../utils/RatingUtils";

// let TestGesorteerdeNummerscurrent = {
//   "5IW243rLPz7bfzJDikLhgw": 105,
//   "3E0IFVnznKJArbNUISgXso": 104,
//   "5UMs8rciA9omc6JDrWDV8Y": 95,
//   "6TEfjh6fh3bIagsfHKYbmW": 94,
//   "1wXa1UrStmCMgVs6HPSaZS": 85,
//   "7eWxBa1mMG6wpDlWikG5ge": 84,
//   "25JWVXUPzWOGochlE18MHp": 83,
//   "4eZETlLHwlC0vpww2avzLv": 82,
//   "00QY4pdQtNdftuKb2qbVeZ": 75,
//   "2mplvgni3GNGMorSx23lLe": 74,
//   "3kubgykmOVjRMK1hmgYsG6": 73,
//   "7fdH9c2DRXvoUNZb5awMkc": 72,
//   "38o5lj4mbLK34vQkJUlMrg": 65,
//   "7En6WS40qUdd9NMWLnOKiz": 64,
//   "7qDuDGkw8JPYYmoL87W54T": 63,
//   "70VYBf5VTLpAJGNp331ECt": 62,
//   "2CmoLRUtP5yrC3D1hroBqE": 61,
//   "0Xx9FIuzazDRQX8Bp9GVCr": 55,
//   "4XdaaDFE881SlIaz31pTAG": 54,
//   "5FJsxES5i0LIcBBQb4A2N1": 53,
//   "64YccwJHPzVcEhQJTRkofX": 52,
//   "1JY6B9ILvmRla2IKKRZvnH": 45,
//   "0E1RL6rKe18aUq70B2fgXs": 44,
//   "2c4s8OFu1IkIDdNA953M03": 43,
//   "6iZVQLI9gs9kFRnmbQLzHO": 35,
//   "3MbsCmgq7W4Z8ruxNbmd0g": 34,
//   "28vVIr9jmiBAVTTh3pbslM": 20,
// };

function FinalPlaylist({ GesorteerdeNummers }) {
  const { Nummers } = useContext(globalContext);
  // const Nummers = testNummers; //* voor test
  // const GesorteerdeNummers = TestGesorteerdeNummerscurrent; //* voor test
  const [TekstKnop, setTekstKnop] = useState("Kopieër naar klembord");
  const [IconKnop, setIconKnop] = useState(<ContentPasteIcon />);

  const ClickHandler = () => {
    const text = MakeLinksFromObject(GesorteerdeNummers.current);
    navigator.clipboard.writeText(text);
    setTekstKnop("Gelukt! :)");
    setIconKnop(null);
    setTimeout(() => {
      setTekstKnop("Kopieër naar klembord");
      setIconKnop(<ContentPasteIcon />);
    }, 500);
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <LogOutButton />
      <Typography variant="h4" textAlign={"center"} mt={10} mb={1}>
        Je gesorteerde playlist!
      </Typography>
      <Box maxWidth={500}>
        <Typography variant="caption" textAlign={"center"} color={"lightgrey"}>
          Je kan de playlist opslaan door op de knop hieronder te drukken en dan te plakken met CTRL + V in een nieuwe Spotify playlist.
        </Typography>
      </Box>
      <Box my={2}>
        <Button endIcon={IconKnop} onClick={ClickHandler}>
          {TekstKnop}
        </Button>
      </Box>
      <Box minWidth={300} mb={10}>
        {Object.keys(GesorteerdeNummers.current).map((id) => {
          const NummerObject = getNummerObjectFromID(id, Nummers);
          return (
            <Box key={id}>
              <CardNummer Nummer={NummerObject} />
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}

export default FinalPlaylist;
