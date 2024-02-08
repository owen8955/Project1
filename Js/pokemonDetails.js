function displayPokemonDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonName = urlParams.get("name");
  const storedDetails = localStorage.getItem(pokemonName);

  if (storedDetails) {
    const details = JSON.parse(storedDetails);
    const detailsContainer = document.getElementById("pokemonDetails");
    detailsContainer.style.backgroundColor = "rgb(255, 212, 23)";
    const nameElement = document.createElement("p");
    nameElement.innerHTML = "<strong>Name :</strong> " + details.Name;
    nameElement.style.paddingLeft = "8px";
    nameElement.style.fontSize = "15px";
    const idElement = document.createElement("p");
    idElement.innerHTML = "<strong>ID :</strong> " + details.ID;
    idElement.style.paddingLeft = "8px";
    idElement.style.fontSize = "15px";
    const typesElement = document.createElement("p");
    typesElement.innerHTML =
      "<strong>Types :</strong> " + details.Types.join(", ");
    typesElement.style.paddingLeft = "8px";
    typesElement.style.fontSize = "15px";
    const abilitiesElement = document.createElement("p");
    abilitiesElement.innerHTML =
      "<strong>Abilities :</strong> " + details.Abilities.join(", ");
    abilitiesElement.style.paddingLeft = "8px";
    abilitiesElement.style.fontSize = "15px";
    const baseStatsElement = document.createElement("p");
    baseStatsElement.textContent = "Base Stats";
    baseStatsElement.style.backgroundColor = "black";
    baseStatsElement.classList.add(
      "bg-black",
      "text-center",
      "text-white",
      "font-bold"
    );
    details.BaseStats.forEach((stat) => {
      const statElement = document.createElement("p");
      statElement.innerHTML = `<strong>${stat.Name}</strong> = ${stat.Value}`;
      baseStatsElement.appendChild(statElement);
      statElement.classList.add(
        "px-2",
        "m-2",
        "rounded",
        "text-sm",
        "text-left",
        "font-light"
      );
    });
    detailsContainer.appendChild(nameElement);
    detailsContainer.appendChild(idElement);
    detailsContainer.appendChild(typesElement);
    detailsContainer.appendChild(abilitiesElement);
    detailsContainer.appendChild(baseStatsElement);
  } else {
    const detailsContainer = document.getElementById("pokemonDetails");
    const messageElement = document.createElement("p");
    messageElement.textContent = "Pokémon details not found.";
    detailsContainer.appendChild(messageElement);
  }
}
displayPokemonDetails();

async function fetchGif() {
  try {
    const response = await fetch(
      "https://g.tenor.com/v1/random?q=pokemon&key=LIVDSRZULELA&limit=3"
    );
    const data = await response.json();
    return data.results.map((gif) => gif.media[0].gif.url);
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function displayGifs() {
  const gifContainer = document.getElementById("gif-container");
  gifContainer.innerHTML = "";

  const gifUrls = await fetchGif();
  gifUrls.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    img.style.width = "232px";
    img.style.height = "150px";
    img.style.margin = "15px 0";
    gifContainer.appendChild(img);
  });
}

displayGifs();
