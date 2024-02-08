document.addEventListener("DOMContentLoaded", function () {
  localStorage.clear();
});

function getPokemonDetailsByName(event) {
  event.preventDefault();
  const pokemonName = document.getElementById("search").value;
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
  document.getElementById("searchButton").innerText = "Loading...";
  fetch(apiUrl)
    .then((response) => {
      if (response.status === 200) {
        document.getElementById("searchButton").innerText = "Search";
        return response.json();
      } else {
        document.getElementById("searchButton").innerText = "Search";
        showModal();
      }
    })
    .then((data) => {
      if (data) {
        const importantDetails = {
          Name: data.name,
          ID: data.id,
          Types: data.types.map((type) => type.type.name),
          Abilities: data.abilities.map((ability) => ability.ability.name),
          BaseStats: data.stats.map((stat) => ({
            Name: stat.stat.name,
            Value: stat.base_stat,
          })),
        };

        localStorage.setItem(
          pokemonName.toLowerCase(),
          JSON.stringify(importantDetails)
        );
        const detailsURL = `pokemonDetails.html?name=${pokemonName.toLowerCase()}`;
        window.location.href = detailsURL;
      }
    })
    .catch((error) => {
      document.getElementById("searchButton").innerText = "Search";
      showModal();
      console.error("An error occurred:", error);
    });
}
function showModal() {
  document.getElementById("errorModal").classList.remove("hidden");
}

document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("errorModal").classList.add("hidden");
});
