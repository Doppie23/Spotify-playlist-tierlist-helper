import { Container, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useContext, useState, useEffect, createContext } from "react";
import { globalContext } from "../App";
import { MaakGroepjes } from "../utils/RatingUtils";
import { LogOutButton } from "../components/Backbutton";
import DragabbleList from "../components/DraggableList";
import { InitScoresNummers, VoegScoreBij, CreateObjectWithIdAndScore } from "../utils/RatingUtils";

import { testNummers } from "../components/LoadNummers-test-object";

export const ItemsContext = createContext();

function MainPage() {
  // const { Nummers } = useContext(globalContext);
  const [Nummers, setNummers] = useState(testNummers); // * voor testen anders hierboven
  const [NummerScores, setNummerScores] = useState(CreateObjectWithIdAndScore(Nummers));
  const [GegroepeerdeNummers, setGegroepeerdeNummers] = useState(MaakGroepjes(Nummers));
  const [IndexGroepNummers, setIndexGroepNummers] = useState(0);

  const [CurritemList, setCurrItemList] = useState(GegroepeerdeNummers[IndexGroepNummers]);

  const NextClicked = () => {
    let NummersmetScore = { ...NummerScores };
    const itemlist = [...CurritemList];
    itemlist.forEach((nummer, index) => {
      NummersmetScore = VoegScoreBij(NummersmetScore, index, nummer);
    });
    setNummerScores({ ...NummersmetScore });
    if (IndexGroepNummers == GegroepeerdeNummers.length) {
      console.log("end of list");
      return;
    } else {
      setIndexGroepNummers(IndexGroepNummers + 1);
      setTimeout(() => {
        console.log(IndexGroepNummers);
      }, 1000);
      setCurrItemList(GegroepeerdeNummers[IndexGroepNummers]);
    }
  };

  // todo - bij een knop klik als klaar gaat index omhoog krijgen curr in Nummers er de jusite score bij (lenlist - index)

  return (
    <Container sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <LogOutButton />
      <ItemsContext.Provider value={{ CurritemList, setCurrItemList }}>
        <DragabbleList items={GegroepeerdeNummers[IndexGroepNummers]} />
      </ItemsContext.Provider>
      <Button variant="contained" sx={{ position: "relative", top: "10%" }} endIcon={<NavigateNextIcon />} onClick={NextClicked}>
        Next
      </Button>
    </Container>
  );
}

export default MainPage;
