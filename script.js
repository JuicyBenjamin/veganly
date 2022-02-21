const api = "https://veganly-e90c.restdb.io/rest/kategorier";
const key = "620f772134fd6215658587bc";

const options = {
  headers: {
    "x-apikey": key,
  },
};

let kategorier;
let filter = "alle";

start = () => {
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerKategorier)
  );
  hentData();
};

const filtrerKategorier = () => {
  filter = this.dataset.kategori;
  console.log(filter);
  hentData();
};

async function hentData() {
  const resspons = await fetch(api, options);
  kategorier = await resspons.json();
  formatering(kategorier);
}

const formatering = (kategorier) => {
  const main = document.querySelector("#content");
  const template = document.querySelector("template").content;
  kategorier.forEach((kategorier) => {
    if (filter == kategorier.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("h2").textContent = kategorier.navn;
      klon.querySelector(".beskrivelse").textContent = kategorier.beskrivelse;
      klon.querySelector(".billede").src = `./img/${kategorier.billede}`;
      klon.querySelector(".billede").alt = kategorier.alttag;
      main.appendChild(klon);
    }
  });
  console.log(kategorier);
};

console.log("wtf");
start();
