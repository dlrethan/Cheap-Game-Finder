var requestOptions = {
  method: "GET",
  redirect: "follow",
};

let dealInfo = document.getElementById("dealInfo");
let apiUrl = "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15";
let userInput = document.getElementById("searchBar");
let button = document.getElementById("btnClick");

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
          "is-two-fifths",
          "is-flex",
          "is-flex-direction-row",
          "is-justify-content-flex-start"
        );
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
button.addEventListener("click", function (e) {
  e.preventDefault;
  let input = userInput.value;
  fetch(`https://www.cheapshark.com/api/1.0/games?title=${input}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let searchSection = document.getElementById("searchResults");
        let container = document.createElement("div");
        let pictureContainer = document.createElement("div");
        let picture = document.createElement("img");
        let priceContainer = document.createElement("div");
        let actualPrice = document.createElement("p");
        actualPrice.textContent = `Cheapest Price Found: $ ${data[i].cheapest}`;
        priceContainer.classList.add("column", "is-one-third");
        pictureContainer.classList.add("column", "is-one-third");
        picture.src = data[i].thumb;
        container.classList.add(
          "columns",
          "container",
          "is-fluid",
          "is-multiline",
          "m-4",
          "is-centered",
          "mainContent"
        );
        let nameOfGameContainer = document.createElement("div");
        nameOfGameContainer.classList.add("column", "is-one-third");
        let nameOfGame = document.createElement("a");
        nameOfGame.textContent = `Name of the game: ${data[i].external}`;
        nameOfGame.href = `https://www.cheapshark.com/redirect?dealID=${data[i].cheapestDealID}`;
        searchSection.append(container);
        container.append(nameOfGameContainer);
        nameOfGameContainer.append(nameOfGame);
        container.append(pictureContainer);
        pictureContainer.append(picture);
        container.append(priceContainer);
        priceContainer.append(actualPrice);
      }
    });
});
