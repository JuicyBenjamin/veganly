// const api = "https://veganly-e90c.restdb.io/rest/kategorier";
// const key = "620f772134fd6215658587bc";

// const options = {
//   headers: {
//     "x-apikey": key,
//   },
// };

// let kategorier;
// let filter = "alle";

// start = () => {
//   const filterKnapper = document.querySelectorAll("nav button");
//   filterKnapper.forEach((knap) =>
//     knap.addEventListener("click", filtrerKategorier)
//   );
//   hentData();
// };

// const filtrerKategorier = () => {
//   filter = this.dataset.kategori;
//   console.log(filter);
//   hentData();
// };

// async function hentData() {
//   const resspons = await fetch(api, options);
//   kategorier = await resspons.json();
//   formatering(kategorier);
// }

// const formatering = (kategorier) => {
//   const main = document.querySelector("#content");
//   const template = document.querySelector("template").content;
//   main.textContent = "";
//   kategorier.forEach((kategorier) => {
//     if (filter == kategorier.kategori || filter == "alle") {
//       const klon = template.cloneNode(true);
//       klon.querySelector("h2").textContent = kategorier.navn;
//       klon.querySelector(".beskrivelse").textContent = kategorier.beskrivelse;
//       klon.querySelector(".billede").src = `./img/${kategorier.billede}`;
//       klon.querySelector(".billede").alt = kategorier.alttag;
//       main.appendChild(klon);
//     }
//   });
//   console.log(kategorier);
// };

// console.log("wtf");
// start();

const header = document.querySelector("header h1");
const url = "https://veganly-e90c.restdb.io/rest/kategorier";
const myHeaders = {
  "x-apikey": "620f772134fd6215658587bc",
};

document.addEventListener("DOMContentLoaded", start);
let mad;
let filter = "alle";
function start() {
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerMad));
  loadJSON();
}
function filtrerMad() {
  filter = this.dataset.kategori;

  visMad();
}

async function loadJSON() {
  const JSONData = await fetch(url, {
    headers: myHeaders,
  });
  mad = await JSONData.json();
  console.log("Kategori", mad);
  visMad();
}

function visMad() {
  const main = document.querySelector("main");
  const template = document.querySelector("template").content;
  main.textContent = "";
  mad.forEach((kategorier) => {
    if (filter == kategorier.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("h2").textContent = kategorier.navn;
      klon.querySelector(".beskrivelse").textContent = kategorier.beskrivelse;
      klon.querySelector(".billede").src = `./img/${kategorier.billede}`;
      klon.querySelector(".billede").alt = kategorier.alttag;
      main.appendChild(klon);
    }
  });
}
