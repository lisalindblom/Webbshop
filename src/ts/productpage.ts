import { handleCLick, showProducts } from "./functions/functions";
import { Products } from "./models/models";

import { products as filteredList } from "./services.ts/data";

showProducts(filteredList);

let btnOne = document.getElementById("btnOne") as HTMLInputElement;
let btnTwo = document.getElementById("btnTwo") as HTMLInputElement;
let btnThree = document.getElementById("btnThree") as HTMLInputElement;
let btnFour = document.getElementById("btnFour") as HTMLInputElement;
let btnFive = document.getElementById("btnFive") as HTMLInputElement;

let selectedFilter: string = "";

btnOne.addEventListener("click", () => {
  selectedFilter = "Alla";
});
btnTwo.addEventListener("click", () => {
  selectedFilter = "Pocket";
});
btnThree.addEventListener("click", () => {
  selectedFilter = "Häftad";
});
btnFour.addEventListener("click", () => {
  selectedFilter = "E-bok";
});
btnFive.addEventListener("click", () => {
  selectedFilter = "Inbunden";
});

let filterForm = document.getElementById("filterForm") as HTMLInputElement;
let submit = document.getElementById("btnSubmit") as HTMLButtonElement;

submit.addEventListener("click", () => {
  filterAlternatives(filteredList);
});

function filterAlternatives(products: Products[]) {
  let filteredList = products.filter((book) => {
    return book.type === selectedFilter;
  });

  console.log(selectedFilter);
  console.log(filteredList);
  if (selectedFilter === "Alla") {
    console.log("alla");
    showProducts(products);
  } else {
    showFilteredProducts(filteredList);
  }
}

const showFilteredProducts = (filteredList: Products[]) => {
  let container = document.getElementById(
    "productpageWrapper"
  ) as HTMLDivElement;

  container.innerHTML = "";

  for (let i = 0; i < filteredList.length; i++) {
    let bookContainer = document.createElement("div");
    let title = document.createElement("h3");
    let img = document.createElement("img");
    let type = document.createElement("p");
    let price = document.createElement("p");
    let button = document.createElement("button");
    button.innerHTML = "Buy";
    button.addEventListener("click", () => {
      handleCLick(filteredList[i]);
    });
    bookContainer.classList.add(filteredList[i].type);
    title.innerHTML = filteredList[i].title;
    img.src = filteredList[i].img;
    type.innerHTML = filteredList[i].type;
    price.innerHTML = JSON.stringify(filteredList[i].price);

    bookContainer.appendChild(title);
    bookContainer.appendChild(img);
    bookContainer.appendChild(type);
    bookContainer.appendChild(price);
    bookContainer.appendChild(button);
    container.appendChild(bookContainer);
  }
};
