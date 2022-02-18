const api = "https://veganly-e90c.restdb.io/rest/kategorier";
const key = "620f772134fd6215658587bc";

const options = {
  headers: {
    "x-apikey": key,
  },
};

async function hentData() {
  const resspons = await fetch(api, options);
  const kategori = await resspons.json();
  formatering(kategori);
}

const formatering = (kategori) => {
  const main = document.querySelector("#content");
  const template = document.querySelector("template").content;
  kategori.forEach((kategori) => {
    const klon = template.cloneNode(true);
    klon.querySelector("h2").textContent = kategori.navn;
    klon.querySelector(".beskrivelse").textContent = kategori.beskrivelse;
    klon.querySelector(".billede").src = `./milleh_img/${kategori.billede}`;
    main.appendChild(klon);
  });
  console.log(kategori);
};

console.log("wtf");
hentData();
