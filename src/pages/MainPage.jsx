import { Container } from "@mui/material";
import { useContext } from "react";
import { globalContext } from "../App";

function MainPage() {
  const { Nummers } = useContext(globalContext);

  return (
    <Container sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div>dsad</div>
    </Container>
  );
}

export default MainPage;
