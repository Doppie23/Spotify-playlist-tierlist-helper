import { Container, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useState, useRef, createContext } from "react";
import { LogOutButton } from "../components/Backbutton";
import DragabbleList from "../components/DraggableList";

import { groupKeysByValue } from "../utils/RatingUtils";

// * voor test
const testRating = {
  "7fdH9c2DRXvoUNZb5awMkc": 100,
  "2mplvgni3GNGMorSx23lLe": 100,
  "7eWxBa1mMG6wpDlWikG5ge": 90,
  "5FJsxES5i0LIcBBQb4A2N1": 90,
  "28vVIr9jmiBAVTTh3pbslM": 80,
  "70VYBf5VTLpAJGNp331ECt": 80,
  "2c4s8OFu1IkIDdNA953M03": 80,
  "0Xx9FIuzazDRQX8Bp9GVCr": 80,
  "1JY6B9ILvmRla2IKKRZvnH": 70,
  "38o5lj4mbLK34vQkJUlMrg": 70,
  "3MbsCmgq7W4Z8ruxNbmd0g": 70,
  "7qDuDGkw8JPYYmoL87W54T": 70,
  "64YccwJHPzVcEhQJTRkofX": 60,
  "6TEfjh6fh3bIagsfHKYbmW": 60,
  "5UMs8rciA9omc6JDrWDV8Y": 60,
  "6iZVQLI9gs9kFRnmbQLzHO": 60,
  "25JWVXUPzWOGochlE18MHp": 60,
  "2CmoLRUtP5yrC3D1hroBqE": 50,
  "7En6WS40qUdd9NMWLnOKiz": 50,
  "1wXa1UrStmCMgVs6HPSaZS": 50,
  "4XdaaDFE881SlIaz31pTAG": 50,
  "3kubgykmOVjRMK1hmgYsG6": 40,
  "3E0IFVnznKJArbNUISgXso": 40,
  "5IW243rLPz7bfzJDikLhgw": 40,
  "00QY4pdQtNdftuKb2qbVeZ": 30,
  "4eZETlLHwlC0vpww2avzLv": 30,
  "0E1RL6rKe18aUq70B2fgXs": 20,
};
// *

export const ItemsContext = createContext();

function PreciezeSorteer({ GesorteerdeNummers }) {
  // const [GegroepeerdeNummers, setGegroepeerdeNummers] = useState(groupKeysByValue(GesorteerdeNummers.current));
  const [GegroepeerdeNummers, setGegroepeerdeNummers] = useState(groupKeysByValue(testRating)); // * voor test adnmer bocen
  const IndexGroepRef = useRef(0);

  const [CurritemList, setCurrItemList] = useState(GegroepeerdeNummers[IndexGroepRef.current]);

  return (
    <Container sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <LogOutButton />
      <ItemsContext.Provider value={{ CurritemList, setCurrItemList }}>
        <DragabbleList items={GegroepeerdeNummers[IndexGroepRef.current]} />
      </ItemsContext.Provider>
      <Button variant="contained" sx={{ position: "relative", top: 10 }} endIcon={<NavigateNextIcon />}>
        Next
      </Button>
    </Container>
  );
}

export default PreciezeSorteer;
