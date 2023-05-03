import { Container, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useContext, useState, useRef, createContext } from "react";
import { globalContext } from "../App";
import { MaakGroepjes } from "../utils/RatingUtils";
import { LogOutButton } from "../components/Backbutton";
import DragabbleList from "../components/DraggableList";
import { VoegScoreBij, CreateObjectWithIdAndScore, sortObjectbyValue, MaakGroepjesMetGesorteerdObject } from "../utils/RatingUtils";

import { testNummers } from "../components/LoadNummers-test-object";

export const ItemsContext = createContext();

function MainPage() {
  // const { Nummers } = useContext(globalContext);
  const [Nummers, setNummers] = useState(testNummers); // * voor testen anders hierboven
  const NummerScoresRef = useRef(CreateObjectWithIdAndScore(Nummers));
  const [GegroepeerdeNummers, setGegroepeerdeNummers] = useState(MaakGroepjes(Nummers));
  const IndexGroepRef = useRef(0);

  const [CurritemList, setCurrItemList] = useState(GegroepeerdeNummers[IndexGroepRef.current]);

  const NextClicked = () => {
    let NummersmetScore = { ...NummerScoresRef.current };
    const itemlist = [...CurritemList];
    itemlist.forEach((nummer, index) => {
      // console.log("scorebij", nummer, "op plek", index);
      NummersmetScore = VoegScoreBij(NummersmetScore, index, nummer);
    });
    if (IndexGroepRef.current == GegroepeerdeNummers.length - 1) {
      console.log("end of list");
      NummersmetScore = sortObjectbyValue(NummersmetScore);
      NummerScoresRef.current = { ...NummersmetScore };

      // todo eerst checken of er nog dubbele scores zijn
      StartNogEenSorteerRonde();
      // console.log(MaakGroepjesMetGesorteerdObject(Nummers, NummersmetScore));
      // setGegroepeerdeNummers(MaakGroepjesMetGesorteerdObject(Nummers, NummersmetScore));
      return;
    } else {
      NummerScoresRef.current = { ...NummersmetScore };
      IndexGroepRef.current += 1;
      setCurrItemList(GegroepeerdeNummers[IndexGroepRef.current]);
    }
    console.log(NummerScoresRef.current);
  };

  const StartNogEenSorteerRonde = () => {
    setGegroepeerdeNummers(MaakGroepjesMetGesorteerdObject(Nummers, NummerScoresRef.current));
    IndexGroepRef.current = 0;
    setCurrItemList(GegroepeerdeNummers[IndexGroepRef.current]);
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

export default MainPage;
