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
    price.innerHTML = JSON.stringify(products[i].price);

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
    sum += selectedItems[i].price;
  }
  return sum;
};

// Testfunktion för att skriva ut kundvagnen

export const showCart = (selectedItems: Products[]) => {
  let container = document.getElementById(
    "checkoutpageWrapper"
  ) as HTMLDivElement;

  for (let i = 0; i < selectedItems.length; i++) {
    let noOfProducts: number = 0;
    noOfProducts++;
    let bookContainer = document.createElement("div");
    let title = document.createElement("h3");
    let img = document.createElement("img");
    let price = document.createElement("p");
    let quantity = document.createElement("p");
    let addButton = document.createElement("button");
    let removeButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    quantity.innerHTML = JSON.stringify(noOfProducts++);
    removeButton.innerHTML = "-";
    addButton.innerHTML = "+";
    deleteButton.innerHTML = "delete";
    addButton.addEventListener("click", () => {
      handleCLick(products[i]);
    });
    removeButton.addEventListener("click", () => {
      handleRemove(products[i]);
    });
    bookContainer.classList.add(selectedItems[i].type);
    price.innerHTML = JSON.stringify(selectedItems[i].price);
    title.innerHTML = selectedItems[i].title;
    img.src = selectedItems[i].img;

    bookContainer.appendChild(title);
    bookContainer.appendChild(img);
    bookContainer.appendChild(price);
    bookContainer.appendChild(addButton);
    bookContainer.appendChild(removeButton);
    bookContainer.appendChild(quantity);
    bookContainer.appendChild(deleteButton);
    container.appendChild(bookContainer);

    // varukorgen och nummer badge
    const cartBadge = document.querySelectorAll("#cartItems");

    let badgeNumber = selectedItems.length;
    cartBadge[i].innerHTML = badgeNumber.toString();
  }
};

//Hantera bortagning
export const handleRemove = (product: Products) => {
  let isDeleted: boolean = false;

  selectedItems.forEach((product) => {
    let id = selectedItems.indexOf(product);
    if (!isDeleted) {
      selectedItems.splice(id, 1);
      isDeleted = true;
    }
  });

  localStorage.setItem("storageList", JSON.stringify(selectedItems));
  let container = document.getElementById(
    "checkoutpageWrapper"
  ) as HTMLDivElement;
  container.innerHTML = "";
  showCart(selectedItems);
  console.log(selectedItems);
};

export function displayPaymentForm() {
  const formContainer: HTMLDivElement = document.createElement("div");
  const payForm: HTMLFormElement = document.createElement("form");
  const formTitle: HTMLElement = document.createElement("h2");
  const personInfoHead: HTMLLabelElement = document.createElement("label");
  const firstName: HTMLInputElement = document.createElement("input");
  const lastName: HTMLInputElement = document.createElement("input");
  const personalNo: HTMLInputElement = document.createElement("input");
  const phone: HTMLInputElement = document.createElement("input");

  const addressHead: HTMLLabelElement = document.createElement("label");
  const streetName: HTMLInputElement = document.createElement("input");
  const postalCode: HTMLInputElement = document.createElement("input");
  const cityName: HTMLInputElement = document.createElement("input");
  const countryName: HTMLInputElement = document.createElement("input");

  const paymentDetails: HTMLLabelElement = document.createElement("label");
  const paymentMessage: HTMLParagraphElement = document.createElement("p");
  const cardContainer: HTMLDivElement = document.createElement("div");
  const visaRadio: HTMLInputElement = document.createElement("input");
  const visaText: HTMLLabelElement = document.createElement("label");
  const masterRadio: HTMLInputElement = document.createElement("input");
  const masterText: HTMLLabelElement = document.createElement("label");
  const klarnaRadio: HTMLInputElement = document.createElement("input");
  const klarnaText: HTMLLabelElement = document.createElement("label");
  const cardNo: HTMLInputElement = document.createElement("input");
  const cardDate: HTMLInputElement = document.createElement("input");
  const cardCVC: HTMLInputElement = document.createElement("input");
  const submitButton: HTMLInputElement = document.createElement("input");

  personInfoHead.innerHTML = "Personuppgifter";
  formTitle.innerHTML = " Betalningsformulär";
  addressHead.innerHTML = "Adressuppgifter";
  paymentDetails.innerHTML = "Betalningsuppgifter";
  firstName.placeholder = "Namn";
  lastName.placeholder = "Efternamn";
  personalNo.placeholder = "Personnummer";
  phone.placeholder = "Telefon";
  streetName.placeholder = "Gatuadress";
  postalCode.placeholder = "Postkod";
  cityName.placeholder = "Postort";
  countryName.placeholder = "Land";
  paymentMessage.innerHTML = "Vargod välj betalningsätt:";
  visaRadio.type = "radio";
  visaRadio.name = "pay";
  visaText.innerHTML = "Visa";
  masterRadio.type = "radio";
  masterRadio.name = "pay";
  masterText.innerHTML = "Master Card";
  klarnaRadio.type = "radio";
  klarnaRadio.name = "pay";
  klarnaText.innerHTML = "Klarna faktura";
  cardNo.placeholder = "kortnummer";
  cardDate.placeholder = "utgångsdatum";
  cardCVC.placeholder = "CVC";
  submitButton.type = "submit";
  submitButton.value = "Slutför";

  formContainer.classList.add("formContainer");
  payForm.classList.add("formContainer__payForm");
  personInfoHead.classList.add("formContainer__payForm--personInfoHead");
  firstName.classList.add("formContainer__payForm--firstName");
  lastName.classList.add("formContainer__payForm--lastName");
  personalNo.classList.add("formContainer__payForm--personalNo");
  phone.classList.add("formContainer__payForm--phone");
  addressHead.classList.add("formContainer__payForm--addressHead");
  streetName.classList.add("formContainer__payForm--streetName");
  postalCode.classList.add("formContainer__payForm--postalCode");
  cityName.classList.add("formContainer__payForm--cityName");
  countryName.classList.add("formContainer__payForm--countryName");
  paymentDetails.classList.add("formContainer__payForm--paymentDetails");
  paymentMessage.classList.add("formContainer__payForm--paymentMessage");
  cardContainer.classList.add("formContainer__payForm--cardContainer");
  visaRadio.classList.add("visaRadio");
  visaText.classList.add("visaText");
  masterRadio.classList.add("masterRadio");
  masterText.classList.add("masterText");
  klarnaRadio.classList.add("klarnaRadio");
  klarnaText.classList.add("klarnaText");
  cardNo.classList.add("formContainer__payForm--cardNo");
  cardDate.classList.add("formContainer__payForm--cardDate");
  cardCVC.classList.add("formContainer__payForm--cardCVC");
  submitButton.classList.add("formContainer__payForm--sudmitButton");

  document.body.appendChild(formContainer);
  formContainer.appendChild(payForm);
  payForm.appendChild(formTitle);
  payForm.appendChild(personInfoHead);
  payForm.appendChild(firstName);
  payForm.appendChild(lastName);
  payForm.appendChild(personalNo);
  payForm.appendChild(phone);
  payForm.appendChild(addressHead);
  payForm.appendChild(streetName);
  payForm.appendChild(postalCode);
  payForm.appendChild(cityName);
  payForm.appendChild(countryName);
  payForm.appendChild(paymentDetails);
  payForm.appendChild(paymentMessage);
  payForm.appendChild(cardContainer);
  cardContainer.appendChild(visaRadio);
  cardContainer.appendChild(visaText);
  cardContainer.appendChild(masterRadio);
  cardContainer.appendChild(masterText);
  cardContainer.appendChild(klarnaRadio);
  cardContainer.appendChild(klarnaText);
  payForm.appendChild(cardNo);
  payForm.appendChild(cardDate);
  payForm.appendChild(cardCVC);
  payForm.appendChild(submitButton);
}
