const header = document.querySelector("header h1");

//Her hiver vi fat i vores rest.db, altså vores database, via. url samt vores API nøgle.
const url = "https://veganly-e90c.restdb.io/rest/kategorier";
const myHeaders = {
  "x-apikey": "620f772134fd6215658587bc",
};

//Vi starter ud med, at alt DOMcontent skal være loaded ved visning af siden
document.addEventListener("DOMContentLoaded", start);
let mad;
let filter = "alle";

//Funktionen start hiver fat i nav + button, hvorefter der bliver tilføjet et click event på dem alle. Samt bliver funktionen LOADjson kaldt.
function start() {
  const filterKnapper = document.querySelectorAll("div button");
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerMad));
  loadJSON();
}

//Funktionen filtrerMad er vores filter, som der tager fat i dataset fra HTML samt kategori fra vores database.
function filtrerMad() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  visMad();
}

//Her fetches vores database, samt logger vi informationen der er i databasen og kalder på visMad funktionen.
async function loadJSON() {
  const JSONData = await fetch(url, {
    headers: myHeaders,
  });
  mad = await JSONData.json();
  console.log("Kategori", mad);
  visMad();
}

//vismad funktionen gør brug af to konstanter, hvor den ene tager fat i main og den anden tager fat i template, som vi bruger til at clone.
//Deruodver så filtrerer den også, så hvis vores variabel filter = en kategori skal den vise den kategori og ellers skal den vise alle.
//Vi har konstanten klon, som der sørger for der bliver klonet.
function visMad() {
  const main = document.querySelector("main");
  const template = document.querySelector("template").content;
  main.textContent = "";
  mad.forEach((kategorier) => {
    if (filter == kategorier.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("h2").textContent = kategorier.navn;
      if (kategorier.beskrivelse.length > 90) {
        klon.querySelector(".beskrivelse").textContent =
          kategorier.beskrivelse.slice(0, 90) + "...";
      } else {
        klon.querySelector(".beskrivelse").textContent = kategorier.beskrivelse;
      }

      klon.querySelector(".billede").src = `./img/${kategorier.billede}`;
      klon.querySelector(".billede").alt = kategorier.alttag;
      klon
        .querySelector("article")
        .addEventListener("click", () => visOpskrift(kategorier));
      main.appendChild(klon);
    }
  });
}

const visOpskrift = (opskrift) => {
  console.log(`Dette er den opskrift der blev klikket på ${opskrift.id}`);
  location.href = `opskrift.html?id=${opskrift._id}`;
};
