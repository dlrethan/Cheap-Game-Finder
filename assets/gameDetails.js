const gameId = window.location.search.split("=")[1];
const gameName = document.getElementById("appendGame");
const linksContainer = document.getElementById("appendLinks");
const priceofGame = document.getElementById("price");
const metaCritic = document.getElementById("metacritic");
const steamRating = document.getElementById("steamRating");

var requestOptions = {
  method: "GET",
  redirect: "follow",
};
let dealsData = [];

fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameId}`, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    gameName.textContent = data.info.title;
    priceofGame.textContent = `Cheapest Price Found: $${data.deals[0].price} `;
    fetch(
      `https://www.cheapshark.com/api/1.0/deals?id=${data.deals[0].dealID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.gameInfo.metacriticScore <= 0) {
          metaCritic.textContent = "No Metacritic Score Available D:";
        } else if (data.gameInfo.metacriticScore <= 50) {
          metaCritic.textContent = `Metacritic Score: ${data.gameInfo.metacriticScore}`;
          metaCritic.style.color = "red";
        } else if (data.gameInfo.metacriticScore <= 70) {
          metaCritic.textContent = `Metacritic Score: ${data.gameInfo.metacriticScore}`;
          metaCritic.style.color = "yellow";
        } else {
          metaCritic.textContent = `Metacritic Score: ${data.gameInfo.metacriticScore}`;
          metaCritic.style.color = "green";
        }

        if (data.gameInfo.steamRatingPercent <= 0) {
          steamRating.textContent = "No Steam Rating Found";
        } else if (data.gameInfo.steamRatingPercent <= 50) {
          steamRating.textContent = `Steam Rating: ${data.gameInfo.steamRatingPercent}%`;
          steamRating.style.color = "red";
        } else if (data.gameInfo.steamRatingPercent <= 70) {
          steamRating.textContent = `Steam Rating: ${data.gameInfo.steamRatingPercent}%`;
          steamRating.style.color = "yellow";
        } else {
          steamRating.textContent = `Steam Rating: ${data.gameInfo.steamRatingPercent}%`;
          steamRating.style.color = "green";
        }
      });
    for (let i = 0; i < data.deals.length; i++) {
      const dealID = data.deals[i].dealID;
      const link = document.createElement("a");
      link.href = `https://www.cheapshark.com/redirect?dealID=${dealID}`;
      link.textContent = `Deal ${i + 1}`;
      linksContainer.append(link);
    }
    console.log(dealsData);
  })
  .catch((error) => console.log("error", error));
