var requestOptions = {
  method: "GET",
  redirect: "follow",
};
let dealInfo = document.getElementById("dealInfo");
let apiUrl = "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15";

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
        let gameName = document.createElement("h1");
        let gamePic = document.createElement("img");
        let gamePriceCont = document.createElement("div");
        let gamePrice = document.createElement("p");
        let normalPriceCont = document.createElement("div");
        let regularPrice = document.createElement("p");

        gameDiv.classList.add("columns", "is-multiline", "m-4", "is-centered");
        picGame.classList.add(
          "column",
          "is-half",
          "is-flex",
          "is-flex-direction-row"
        );
        normalPriceCont.classList.add("column", "is-one-quarter");
        gamePriceCont.classList.add("column", "is-one-quarter");
        gamePic.classList.add("px-4");
        gameName.textContent = data[i].title;
        gamePic.src = data[i].thumb;
        gamePrice.textContent = "Sale Price " + data[i].salePrice;
        regularPrice.textContent = "Normal Price " + data[i].normalPrice;

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
