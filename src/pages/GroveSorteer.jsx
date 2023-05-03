import { Container, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useContext, useState, useRef, createContext, useEffect } from "react";
import { globalContext } from "../App";
import { MaakGroepjes } from "../utils/RatingUtils";
import { LogOutButton } from "../components/Backbutton";
import DragabbleList from "../components/DraggableList";
import {
  VoegScoreBij,
  CreateObjectWithIdAndScore,
  sortObjectbyValue,
  MaakGroepjesMetGesorteerdObject,
  CheckVoorDubbeleScores,
} from "../utils/RatingUtils";

import { testNummers } from "../components/LoadNummers-test-object";

export const ItemsContext = createContext();

function GroveSorteer({ WhenDone }) {
  // const { Nummers } = useContext(globalContext);
  const { GrofGesorteerdeNummers } = useContext(globalContext);
  const [Nummers, setNummers] = useState(testNummers); // * voor testen anders hierboven
  const NummerScoresRef = useRef(CreateObjectWithIdAndScore(Nummers));
  const [GegroepeerdeNummers, setGegroepeerdeNummers] = useState(MaakGroepjes(Nummers));
  const IndexGroepRef = useRef(0);

  const [CurritemList, setCurrItemList] = useState(GegroepeerdeNummers[IndexGroepRef.current]);

  const NextClicked = () => {
    const itemlist = [...CurritemList];
    itemlist.forEach((nummer, index) => {
      NummerScoresRef.current = VoegScoreBij(NummerScoresRef.current, index, nummer);
    });
    if (IndexGroepRef.current == GegroepeerdeNummers.length - 1) {
      console.log("end of list");
      const gesorteerdeNummers = sortObjectbyValue(NummerScoresRef.current);
      NummerScoresRef.current = gesorteerdeNummers;
      // NummerScoresRef.current = { ...NummersmetScore };

      // todo eerst checken of er nog dubbele scores zijn
      if (CheckVoorDubbeleScores(gesorteerdeNummers)) {
        StartNogEenSorteerRonde();
        return;
      } else {
        WhenDone();
        GrofGesorteerdeNummers.current = gesorteerdeNummers;
      }

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
    <Container sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <LogOutButton />
      <ItemsContext.Provider value={{ CurritemList, setCurrItemList }}>
        <DragabbleList items={GegroepeerdeNummers[IndexGroepRef.current]} />
      </ItemsContext.Provider>
      <Button variant="contained" sx={{ position: "relative", top: "10%" }} endIcon={<NavigateNextIcon />} onClick={NextClicked}>
        Next
      </Button>
    </Container>
  );
}

export default GroveSorteer;
