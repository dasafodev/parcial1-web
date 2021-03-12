let data = [];
let menuSelected = "";

const fetchData = () => {
  fetch(
    "./data.json"
    // "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
  )
    .then((response) => response.json())
    .then((dataResp) => {
      data = dataResp;
      //   return console.log(data);
    });
};

const renderMenu = () => {
  let dataFiltered = data.filter((elem) => elem.name == menuSelected);
//   dataFiltered.products.forEach((product) => {
//     let card = document.createElement("div");               
//     card.classList.add("card");
//     card.style.width= "18rem";
//     let image = document.createElement("img")
//     image.src = product.



//     document.getElementById("products-container").appendChild(node); // Append <li> to <ul> with id="myList"

//     //         <div class="card" style="width: 18rem;">
//     //   <img src="..." class="card-img-top" alt="...">
//     //   <div class="card-body">
//     //     <h5 class="card-title">Card title</h5>
//     //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     //     <a href="#" class="btn btn-primary">Go somewhere</a>
//     //   </div>
//     // </div>
//   });
  console.log(dataFiltered);
};

const changeTitle = (newTitle) => {
  let titleElement = document.getElementById("title");
  menuSelected = newTitle;
  titleElement.innerHTML = newTitle;
  renderMenu();
};

window.onload = function () {
  let burgersElement = document.getElementById("burgers");
  if (burgersElement != null) {
    burgersElement.addEventListener("click", () => changeTitle("Burguers"));
  }

  let tacosElement = document.getElementById("tacos");
  if (tacosElement != null) {
    tacosElement.addEventListener("click", () => changeTitle("Tacos"));
  }

  let saladsElement = document.getElementById("salads");
  if (saladsElement != null) {
    saladsElement.addEventListener("click", () => changeTitle("Salads"));
  }

  let dessertsElement = document.getElementById("desserts");
  if (dessertsElement != null) {
    dessertsElement.addEventListener("click", () => changeTitle("Desserts"));
  }
  let drinksElement = document.getElementById("drinks");
  if (drinksElement != null) {
    drinksElement.addEventListener("click", () =>
      changeTitle("Drinks and Sides")
    );
  }
};

fetchData();
