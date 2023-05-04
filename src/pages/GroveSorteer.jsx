import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Button, Container } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { globalContext } from "../App";
import { LogOutButton } from "../components/BackButton";
import SkipSortButton from "../components/SkipSortButton";
import DragabbleList from "../components/DraggableList";
import TopBalk from "../components/TopBalk";
import {
  AlleRatingKeerTien,
  CheckVoorDubbeleScores,
  CreateObjectWithIdAndScore,
  MaakGroepjes,
  MaakGroepjesMetGesorteerdObject,
  VoegScoreBij,
  sortObjectbyValue,
} from "../utils/RatingUtils";

// export const ItemsContext = createContext();

function GroveSorteer({ WhenDone }) {
  const { Nummers } = useContext(globalContext);
  // const [Nummers, setNummers] = useState(testNummers); // * voor testen anders hierboven
  const { GrofGesorteerdeNummers } = useContext(globalContext);
  const NummerScoresRef = useRef(CreateObjectWithIdAndScore(Nummers));
  const [GegroepeerdeNummers, setGegroepeerdeNummers] = useState(MaakGroepjes(Nummers));
  const IndexGroepRef = useRef(0);
  const AantalKeerDoorGroveSorteer = useRef(0);

  const [CurritemList, setCurrItemList] = useState(GegroepeerdeNummers[IndexGroepRef.current]);

  const NextClicked = () => {
    const itemlist = [...CurritemList];
    itemlist.forEach((nummer, index) => {
      NummerScoresRef.current = VoegScoreBij(NummerScoresRef.current, index, nummer);
    });
    if (IndexGroepRef.current == GegroepeerdeNummers.length - 1) {
      const gesorteerdeNummers = sortObjectbyValue(NummerScoresRef.current);
      NummerScoresRef.current = gesorteerdeNummers;
      // NummerScoresRef.current = { ...NummersmetScore };

      // todo eerst checken of er nog dubbele scores zijn
      if (CheckVoorDubbeleScores(gesorteerdeNummers)) {
        AantalKeerDoorGroveSorteer.current++;
        console.log(AantalKeerDoorGroveSorteer.current);
        console.log(!(AantalKeerDoorGroveSorteer.current > 2));
        if (!(AantalKeerDoorGroveSorteer.current > 1)) {
          StartNogEenSorteerRonde();
          return;
        }
      }
      WhenDone();
      GrofGesorteerdeNummers.current = AlleRatingKeerTien(gesorteerdeNummers);

      return;
    } else {
      IndexGroepRef.current += 1;
      setCurrItemList(GegroepeerdeNummers[IndexGroepRef.current]);
    }
  };

  useEffect(() => {
    setCurrItemList(GegroepeerdeNummers[IndexGroepRef.current]);
  }, [GegroepeerdeNummers]);

  const StartNogEenSorteerRonde = () => {
    setGegroepeerdeNummers(MaakGroepjesMetGesorteerdObject(Nummers, NummerScoresRef.current));
    IndexGroepRef.current = 0;
  };

  return (
    <Container
      sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflow: "auto" }}
    >
      <LogOutButton />
      {/* <SkipSortButton
        SkipHandler={() => {
          WhenDone();
          GrofGesorteerdeNummers.current = AlleRatingKeerTien(NummerScoresRef.current);
        }}
      /> */}
      <Box
        sx={{
          position: "relative",
          bottom: 50,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          overflow: "auto",
        }}
      >
        <TopBalk
          currPagina={"groveSorteer"}
          clickHandler={() => {
            WhenDone();
            GrofGesorteerdeNummers.current = AlleRatingKeerTien(NummerScoresRef.current);
          }}
        />
      </Box>
      <DragabbleList CurritemList={CurritemList} setCurrItemList={setCurrItemList} />
      <Button variant="contained" sx={{ position: "relative", top: 10 }} endIcon={<NavigateNextIcon />} onClick={NextClicked}>
        Next
      </Button>
    </Container>
  );
}

export default GroveSorteer;
