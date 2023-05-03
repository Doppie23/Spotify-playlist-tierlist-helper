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
  let groepen = [];
  let aantalGroepen = Math.ceil(Nummers.length / 5);
  for (let i = 0; i < aantalGroepen; i++) {
    groepen.push(getVijfElementen(Nummers));
  }
  return groepen;
}

export function MaakGroepjes(Nummers) {
  let groepnummers = [...Nummers];
  groepnummers = MaakGroepenVanVijfNummers(groepnummers);
  return groepnummers;
}

export function VoegScoreBij(ObjectNummerIds, index, gesorteerdNummer) {
  let scorebij = 5 - index;
  for (const [NummerID, Score] of Object.entries(ObjectNummerIds)) {
    if (NummerID == gesorteerdNummer.track.id) {
      ObjectNummerIds[NummerID] += scorebij;
    }
  }
  return ObjectNummerIds;
}

export function CreateObjectWithIdAndScore(Nummers) {
  shuffle(Nummers);
  let object = {};
  Nummers.forEach((nummer) => {
    object[nummer.track.id] = 0;
  });
  return object;
}

export function sortObjectbyValue(obj = {}, asc = false) {
  const ret = {};
  Object.keys(obj)
    .sort((a, b) => obj[asc ? a : b] - obj[asc ? b : a])
    .forEach((s) => (ret[s] = obj[s]));
  return ret;
}

export function MaakGroepjesMetGesorteerdObject(Nummers, sortedObject) {
  function getNummerObjectWithID(id, Nummers) {
    let nummerNodig = null;
    Nummers.forEach((nummer) => {
      if (nummer.track.id == id) {
        nummerNodig = nummer;
      }
    });
    return nummerNodig;
  }

  let listtMetNummersGesorteerd = [];
  for (const [NummerID, Score] of Object.entries(sortedObject)) {
    listtMetNummersGesorteerd.push(getNummerObjectWithID(NummerID, Nummers));
  }
  return MaakGroepjes(listtMetNummersGesorteerd);
}

export function CheckVoorDubbeleScores(obj) {
  const values = Object.values(obj);
  const uniqueValues = new Set(values);
  for (const val of uniqueValues) {
    const count = values.filter((v) => v === val).length;
    if (count > 3) {
      return true;
    }
  }
  return false;
}
