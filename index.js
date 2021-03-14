let data = [];
let menuSelected = "Burguers";

const fetchData = () => {
  fetch(
    "./data.json",
    // "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
  )
    .then((response) => response.json())
    .then((dataResp) => {
      data = dataResp;
      renderMenu();
    });
};

const renderOrder = () => {
  // document.getElementById("products-container").innerHTML = "";
  document.getElementById("products-container").classList.add("hidden");
  document.getElementById("actions").classList.remove("hidden");
  document.getElementById("actions").classList.add("actions-bot");
  document.getElementById("table-order").classList.remove("hidden");
  document.getElementById("table-order-body").innerHTML = "";
  let sum = 0;
  let listLocal = JSON.parse(localStorage.getItem("productsSelected"));
  let tableBody = document.getElementById("table-order-body");
  if (listLocal != null) {
    listLocal.forEach((product, index) => {
      let tr = document.createElement("tr");
      let idRow = document.createElement("th");
      idRow.innerHTML = index + 1;
      tr.appendChild(idRow);
      let qty = document.createElement("td");
      qty.innerHTML = product.qty;
      tr.appendChild(qty);
      let name = document.createElement("td");
      name.innerHTML = product.name;
      tr.appendChild(name);
      let price = document.createElement("td");
      price.innerHTML = product.price;
      tr.appendChild(price);
      let amount = document.createElement("td");
      amount.innerHTML = Math.round(product.price * product.qty * 100) / 100;
      sum += Math.round(product.price * product.qty * 100) / 100;
      tr.appendChild(amount);
      let buttonsContainer = document.createElement("div");
      let plus = document.createElement("a");
      plus.classList.add("btn");
      plus.classList.add("btn-secondary");
      plus.classList.add("me-2");
      plus.innerHTML = "+";
      plus.onclick = () => addToCart(product, true);
      let less = document.createElement("a");
      less.classList.add("btn");
      less.classList.add("btn-secondary");
      less.innerHTML = "-";
      less.onclick = () => removeProduct(product);
      buttonsContainer.appendChild(plus);
      buttonsContainer.appendChild(less);
      tr.appendChild(buttonsContainer);

      tableBody.appendChild(tr);
    });
  }

  document.getElementById("final-price").classList.add("price-text");
  document.getElementById("final-price").innerHTML = `Total:$ ${
    Math.round(sum * 100) / 100
  }`;
};

const renderMenu = () => {
  let dataFiltered = data.filter((elem) => elem.name == menuSelected)[0];
  document.getElementById("table-order").classList.add("hidden");
  document.getElementById("products-container").classList.remove("hidden");
  document.getElementById("products-container").innerHTML = "";
  document.getElementById("actions").classList.add("hidden");

  dataFiltered["products"].forEach((product) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("col-3");
    card.classList.add("p-0");
    card.classList.add("m-1");
    card.style.width = "18rem";
    let image = document.createElement("img");
    image.classList.add("cover");
    image.src = product.image;
    image.alt = product.name;
    card.appendChild(image);
    let body = document.createElement("div");
    body.classList.add("card-body");
    let containerInfo = document.createElement("div");
    containerInfo.classList.add("container-card_info");
    let titleBody = document.createElement("h5");
    titleBody.classList.add("card-title");
    titleBody.innerHTML = product.name;
    containerInfo.appendChild(titleBody);
    let description = document.createElement("p");
    description.classList.add("card-text");
    description.innerHTML = product.description;
    containerInfo.appendChild(description);
    let price = document.createElement("p");
    // price.classList.add("card-text");
    price.classList.add("price-text");
    price.innerHTML = `$ ${product.price}`;
    containerInfo.appendChild(price);
    body.appendChild(containerInfo);
    let buttonAction = document.createElement("a");
    buttonAction.classList.add("btn");
    buttonAction.classList.add("btn-dark");
    buttonAction.classList.add("btn-cart");
    buttonAction.innerHTML = "Add to cart";
    buttonAction.onclick = () => addToCart(product);
    body.appendChild(buttonAction);
    card.appendChild(body);
    document.getElementById("products-container").appendChild(card); // Append <li> to <ul> with id="myList"
  });
};

const addToCart = (product, order) => {
  let listLocal = JSON.parse(localStorage.getItem("productsSelected"));
  let newProduct = product;
  if (listLocal == null) {
    newProduct["qty"] = 1;
    localStorage.setItem("productsSelected", JSON.stringify([newProduct]));
  } else {
    let indexSearched = listLocal.findIndex(
      (productFind) => productFind.name == product.name,
    );
    newProduct["qty"] =
      indexSearched == -1 ? 1 : listLocal[indexSearched].qty + 1;
    listLocal.splice(
      indexSearched != -1 ? indexSearched : listLocal.length,
      1,
      newProduct,
    );
    localStorage.setItem("productsSelected", JSON.stringify(listLocal));
  }
  changeCartCounter();
  if (order) {
    renderOrder();
  }
};

const removeProduct = (product) => {
  let listLocal = JSON.parse(localStorage.getItem("productsSelected"));

  let indexSearched = listLocal.findIndex(
    (productFind) => productFind.name == product.name,
  );
  let newProduct = product;
  if (product.qty - 1 > 0) {
    newProduct["qty"] = product.qty - 1;
    listLocal.splice(indexSearched, 1, newProduct);
    localStorage.setItem("productsSelected", JSON.stringify(listLocal));
  } else {
    listLocal.splice(indexSearched, 1);
    localStorage.setItem("productsSelected", JSON.stringify(listLocal));
  }
  renderOrder();
};

const changeCartCounter = () => {
  let list = JSON.parse(localStorage.getItem("productsSelected"));
  let sum = 0;
  if (list != null) {
    list.forEach((prod) => (sum += prod.qty));
  }
  document.getElementById("numer-cart").innerHTML = list != null ? sum : 0;
};

const changeTitle = (newTitle) => {
  let titleElement = document.getElementById("title");
  menuSelected = newTitle;
  titleElement.innerHTML = newTitle;
  if (newTitle == "Order detail") {
    renderOrder();
  } else {
    renderMenu();
  }
};

const removeCartProducts = () => {
  localStorage.removeItem("productsSelected");
  renderOrder();
  changeCartCounter();
};

const printProducts = () => {
  let list = JSON.parse(localStorage.getItem("productsSelected"));
  console.log(list);
};

window.onload = function () {
  changeCartCounter();

  let burgersElement = document.getElementById("burgers");
  let tacosElement = document.getElementById("tacos");
  let saladsElement = document.getElementById("salads");
  let dessertsElement = document.getElementById("desserts");
  let drinksElement = document.getElementById("drinks");

  if (burgersElement != null) {
    burgersElement.addEventListener("click", () => {
      burgersElement.classList.add("active");
      tacosElement.classList.remove("active");
      saladsElement.classList.remove("active");
      dessertsElement.classList.remove("active");
      drinksElement.classList.remove("active");
      return changeTitle("Burguers");
    });
  }

  if (tacosElement != null) {
    tacosElement.addEventListener("click", () => {
      burgersElement.classList.remove("active");
      tacosElement.classList.add("active");
      saladsElement.classList.remove("active");
      dessertsElement.classList.remove("active");
      drinksElement.classList.remove("active");
      return changeTitle("Tacos");
    });
  }

  if (saladsElement != null) {
    saladsElement.addEventListener("click", () => {
      burgersElement.classList.remove("active");
      tacosElement.classList.remove("active");
      saladsElement.classList.add("active");
      dessertsElement.classList.remove("active");
      drinksElement.classList.remove("active");
      return changeTitle("Salads");
    });
  }

  if (dessertsElement != null) {
    dessertsElement.addEventListener("click", () => {
      burgersElement.classList.remove("active");
      tacosElement.classList.remove("active");
      saladsElement.classList.remove("active");
      dessertsElement.classList.add("active");
      drinksElement.classList.remove("active");
      return changeTitle("Desserts");
    });
  }

  if (drinksElement != null) {
    drinksElement.addEventListener("click", () => {
      burgersElement.classList.remove("active");
      tacosElement.classList.remove("active");
      saladsElement.classList.remove("active");
      dessertsElement.classList.remove("active");
      drinksElement.classList.add("active");
      return changeTitle("Drinks and Sides");
    });
  }

  let cartElement = document.getElementById("cart-container");
  if (cartElement != null) {
    cartElement.addEventListener("click", () => changeTitle("Order detail"));
  }

  let cancelButton = document.getElementById("cancel-button");
  if (cancelButton != null) {
    cancelButton.addEventListener("click", () => removeCartProducts());
  }

  let confirmOrderButton = document.getElementById("confirm-order");
  if (confirmOrderButton != null) {
    confirmOrderButton.addEventListener("click", () => printProducts());
  }
};

fetchData();
