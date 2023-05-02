import { Container } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { globalContext } from "../App";
import { MaakGroepjes } from "../utils/RatingUtils";
import { LogOutButton } from "../components/Backbutton";
import DragabbleList from "../components/DraggableList";
import { InitScoresNummers } from "../utils/RatingUtils";

import { testNummers } from "../components/LoadNummers-test-object";

function MainPage() {
  // const { Nummers, setNummers } = useContext(globalContext);
  const Nummers = InitScoresNummers(testNummers); // * voor testen anders hierboven
  const [GegroepeerdeNummers, setGegroepeerdeNummers] = useState(MaakGroepjes(Nummers));
  const [IndexGroepNummers, setIndexGroepNummers] = useState(0);

  useEffect(() => {
    // setNummers(InitScoresNummers(Nummers));
  }, []);

  return (
    <Container sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <LogOutButton />
      <DragabbleList items={GegroepeerdeNummers[IndexGroepNummers]} />
    </Container>
  );
}

export default MainPage;
