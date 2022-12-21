import { showProducts } from "./functions/functions";
import { Products } from "./models/models";

import { products } from "./services.ts/data";

showProducts(products);

let filteredList: Products[] = [];

let filterForm = document.getElementById("filterForm") as HTMLInputElement;
let submit = document.getElementById("btnSubmit") as HTMLButtonElement;

submit.addEventListener("click", () => {
  filterAlternatives(products);
});

function filterAlternatives(products: Products[]) {
  for (let i = 0; i < products.length; i++) {
    if (filterForm.value === products[i].type) {
      let filteredProduct = products[i];
      filteredList.push(filteredProduct);
    }
  }
  showProducts(filteredList);
}
console.log(filteredList);

/***************test*************** */
const filteredData = products.filter(
  (products) => products.type === filterForm.value
);
console.log(filteredData, "test filter");
