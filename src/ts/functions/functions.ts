// Funktion för att skriva ut produkter/lista

import { Products } from "../models/models";
import { products, selectedItems } from "../services.ts/data";

export const showProducts = (products: Products[]) => {
  let container = document.getElementById(
    "productpageWrapper"
  ) as HTMLDivElement;

  for (let i = 0; i < products.length; i++) {
    let bookContainer = document.createElement("div");
    let title = document.createElement("h3");
    let img = document.createElement("img");
    let type = document.createElement("p");
    let price = document.createElement("p");
    let button = document.createElement("button");
    button.innerHTML = "Buy";
    button.addEventListener("click", () => {
      handleCLick(products[i]);
    });
    bookContainer.classList.add(products[i].type);
    title.innerHTML = products[i].title;
    img.src = products[i].img;
    type.innerHTML = products[i].type;
    price.innerHTML = JSON.stringify(products[i].prize);

    bookContainer.appendChild(title);
    bookContainer.appendChild(img);
    bookContainer.appendChild(type);
    bookContainer.appendChild(price);
    bookContainer.appendChild(button);
    container.appendChild(bookContainer);
  }
};

//Hantera klick/köp
export const handleCLick = (product: Products) => {
  selectedItems.push(product);
  localStorage.setItem("storageList", JSON.stringify(selectedItems));
  console.log(selectedItems);
  let sum: number = calcPrice(selectedItems);
  console.log(sum);
  return sum;
};

//Kalkylera totalsumman

const calcPrice = (selectedItems: Products[]) => {
  let sum: number = 0;

  for (let i = 0; i < selectedItems.length; i++) {
    sum += selectedItems[i].prize;
  }
  return sum;
};
