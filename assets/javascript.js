var requestOptions = {
  method: "GET",
  redirect: "follow",
};
function printTitles() {
  // function for printing our game deal data
  fetch(
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15",
    requestOptions
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.log("error", error));
}
printTitles();
