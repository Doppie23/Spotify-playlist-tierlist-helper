import { testNummers } from "../components/LoadNummers-test-object.js";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function InitScoresNummers(Nummers) {
  Nummers = shuffle(Nummers);
  Nummers.forEach((nummer) => {
    nummer.score = 0;
  });
  return Nummers;
}

function MaakGroepenVanVijfNummers(nummers) {
  let Nummers = [...nummers];
  function getVijfElementen(array) {
    let vijfElementen = [];
    for (let i = 0; i < 5; i++) {
      if (array[0] == undefined) {
        break;
      }

      vijfElementen.push(array[0]);
      array.splice(0, 1);
    }
    return vijfElementen;
  }
  if (!CheckIfNummerScoreHeeft(Nummers[0])) {
    throw new Error("Geef de nummers eerst een standaard score");
  }
  let groepen = [];
  let aantalGroepen = Math.ceil(Nummers.length / 5);
  for (let i = 0; i < aantalGroepen; i++) {
    groepen.push(getVijfElementen(Nummers));
  }
  return groepen;
}

function CheckIfNummerScoreHeeft(nummer) {
  return nummer.hasOwnProperty("score");
}

export function MaakGroepjes(Nummers) {
  let groepnummers = [...Nummers];
  groepnummers = InitScoresNummers(Nummers);
  groepnummers = MaakGroepenVanVijfNummers(groepnummers);
  return groepnummers;
}
