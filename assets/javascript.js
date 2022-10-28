var requestOptions = {
  method: "GET",
  redirect: "follow",
};

let dealInfo = document.getElementById("dealInfo");
let apiUrl = "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15";
let userInput = document.getElementById("searchBar");
let button = document.getElementById("btnClick");
const searchSection = document.getElementById("searchResults");
const previousSearches = document.getElementById("appendSearch");

function fetchData() {
  fetch(apiUrl)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let containerDiv = document.getElementById("dealInfo");
        let gameDiv = document.createElement("div");
        let picGame = document.createElement("div");
        let gameName = document.createElement("a");
        let gamePic = document.createElement("img");
        let gamePriceCont = document.createElement("div");
        let gamePrice = document.createElement("p");
        let normalPriceCont = document.createElement("div");
        let regularPrice = document.createElement("p");
        let discountDiv = document.createElement("div");
        let discountPercent = document.createElement("p");
        let picContainer = document.createElement("div");

        discountDiv.classList.add("column", "is-one-fifth");

        gameDiv.classList.add(
          "columns",
          "is-multiline",
          "m-4",
          "is-centered",
          "mainContent"
        );
        picGame.classList.add(
          "column",
          "is-one-fifth",
          "is-flex",
          "is-flex-direction-row",
          "is-justify-content-flex-start",
          "is-mobile"
        );
        picContainer.classList.add("column", "is-one-fifth");
        normalPriceCont.classList.add("column", "is-one-fifth");
        gamePriceCont.classList.add("column", "is-one-fifth");
        gamePic.classList.add("px-4");
        discountPercent.textContent = `% off : ${data[i].savings}`;
        gameName.textContent = data[i].title;
        gameName.href = `https://www.cheapshark.com/redirect?dealID=${data[i].dealID}`;
        gamePic.src = data[i].thumb;
        gamePrice.textContent = "Sale Price " + data[i].salePrice;
        regularPrice.textContent = "Normal Price " + data[i].normalPrice;
        gameDiv.append(discountDiv);
        discountDiv.append(discountPercent);
        containerDiv.append(gameDiv);
        gameDiv.append(picGame);
        picGame.append(gameName);
        picGame.append(gamePic);
        picContainer.append(gamePic);
        gameDiv.append(picContainer);
        gameDiv.append(gamePriceCont);
        gamePriceCont.append(gamePrice);
        gameDiv.append(normalPriceCont);
        normalPriceCont.append(regularPrice);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchData();
// on click it will search for the game
button.addEventListener("click", function (e) {
  e.preventDefault;
  let input = userInput.value;
  let savedSearches = JSON.parse(localStorage.getItem("searches")) || [];
  let games = input.toLowerCase();
  if (!savedSearches.includes(games)) {
    savedSearches.push(games);
    localStorage.setItem("searches", JSON.stringify(savedSearches));
    generatePreviousSearches();
  }
  getGameNames(input);
});
// function to generate previous searches
function generatePreviousSearches() {
  let savedSearches = JSON.parse(localStorage.getItem("searches")) || [];
  previousSearches.innerHTML = "";

  for (let i = 0; i < savedSearches.length; i++) {
    let previousSearch = document.createElement("li");
    previousSearch.addEventListener("click", () => {
      getGameNames(savedSearches[i]);
    });
    previousSearch.setAttribute("id", "listItems");
    previousSearch.classList.add("mx-4", "fade-in-text");
    previousSearch.textContent = savedSearches[i];
    previousSearches.append(previousSearch);
  }
}

generatePreviousSearches();
function generateGames(data) {
  searchSection.innerHTML = "";
  if (!data.length) {
    searchSection.innerHTML = "No results found";
    return;
  }

  for (let i = 0; i < data.length; i++) {
    // creating elements
    const container = document.createElement("div");
    const pictureContainer = document.createElement("div");
    const picture = document.createElement("img");
    const priceContainer = document.createElement("div");
    const actualPrice = document.createElement("p");
    // changing text content and adding classes
    actualPrice.textContent = `Cheapest Price Found: $ ${data[i].cheapest}`;
    priceContainer.classList.add("column", "is-one-third");
    pictureContainer.classList.add("column", "is-one-third");
    picture.classList.add("picDimensions");
    picture.src = data[i].thumb;
    container.classList.add("columns", "is-multiline", "is-centered", "m-1");
    let nameOfGameContainer = document.createElement("div");
    nameOfGameContainer.classList.add("column", "is-one-third");
    let nameOfGame = document.createElement("a");
    nameOfGame.textContent = `${data[i].external}`;
    nameOfGame.href = `https://www.cheapshark.com/redirect?dealID=${data[i].cheapestDealID}`;
    // appending elements
    searchSection.append(container);
    container.append(nameOfGameContainer);
    nameOfGameContainer.append(nameOfGame);
    container.append(pictureContainer);
    pictureContainer.append(picture);
    container.append(priceContainer);
    priceContainer.append(actualPrice);
  }
}
function getGameNames(name) {
  fetch(`https://www.cheapshark.com/api/1.0/games?title=${name}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      generateGames(data);
    });
}
