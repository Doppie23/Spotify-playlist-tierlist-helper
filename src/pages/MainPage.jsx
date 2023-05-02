import { Container } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { globalContext } from "../App";
import { MaakGroepjes } from "../utils/RatingUtils";

function MainPage() {
  const { Nummers } = useContext(globalContext);
  const [GegroepeerdeNummers, setGegroepeerdeNummers] = useState(null);
  const [IndexGroepNummers, setIndexGroepNummers] = useState(0);

  useEffect(() => {
    setGegroepeerdeNummers(MaakGroepjes(Nummers));
  }, []);

  return (
    <Container sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <>dasd</>
      {/* TODO https://codesandbox.io/s/determined-rumple-o64qq?file=/src/App.js */}
    </Container>
  );
}

export default MainPage;
