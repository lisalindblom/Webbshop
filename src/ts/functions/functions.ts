// Funktion för att skriva ut produkter/lista

import { Products } from "../models/models";
import { products, selectedItems } from "../services.ts/data";
import { products as filteredList } from "../services.ts/data";

export const showProducts = (products: Products[]) => {
  productSort(selectedItems);
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
    /********************************************** */
    bookContainer.classList.add("bookContainer");
    /*********************************************** */
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
  if (document.getElementById("checkoutpageWrapper")) {
  let container = document.getElementById(
    "checkoutpageWrapper"
  ) as HTMLDivElement;
  container.innerHTML = "";

  showCart(selectedItems);
  }
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
    if (!document.getElementById(selectedItems[i].id.toString())) {
      let noOfProducts: number = counter(selectedItems, selectedItems[i].title);
      let bookContainer = document.createElement("div");
      let title = document.createElement("h3");
      let img = document.createElement("img");
      let price = document.createElement("p");
      let quantity = document.createElement("p");
      let addButton = document.createElement("button");
      let removeButton = document.createElement("button");
      let deleteButton = document.createElement("button");

      bookContainer.setAttribute("id", `${selectedItems[i].id}`);
      quantity.innerHTML = JSON.stringify(noOfProducts);
      removeButton.innerHTML = "-";
      addButton.innerHTML = "+";
      deleteButton.innerHTML = "delete";
      addButton.addEventListener("click", () => {
        handleCLick(products[i]);
      });
      removeButton.addEventListener("click", () => {
        handleRemove(selectedItems[i].id, noOfProducts);
      });
      deleteButton.addEventListener("click", () => {
        handleDelete(selectedItems[i].id);
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
    }

    // varukorgen och nummer badge
    const cartBadge = document.querySelectorAll("#cartItems");

    let badgeNumber = selectedItems.length;
    //cartBadge[i].innerHTML = badgeNumber.toString();
  }
};

//Hantera bortagning av 1 produkt
export const handleRemove = (target: number, noOfProducts: number) => {
  let isDeleted: boolean = false;

  for (let i = 0; i < selectedItems.length; i++) {
    if (target === selectedItems[i].id) {
      if (!isDeleted) {
        if (noOfProducts < 2) {
          let confirm = window.confirm(
            "Vill du ta bort produkten från kundvagnen?"
          );
          if (!confirm) {
            return;
          }
        }
        selectedItems.splice(i, 1);
        isDeleted = true;
      }
    }
  }

  localStorage.setItem("storageList", JSON.stringify(selectedItems));
  let container = document.getElementById(
    "checkoutpageWrapper"
  ) as HTMLDivElement;
  container.innerHTML = "";
  showCart(selectedItems);
  console.log(selectedItems);
};

// Hantera delete.
export const handleDelete = (target: number) => {
  let confirm = window.confirm("Vill du ta bort produkten från kundvagnen?");
  if (!confirm) {
    return;
  } else {
    for (let i = selectedItems.length - 1; i >= 0; i--) {
      if (target === selectedItems[i].id) {
        selectedItems.splice(i, 1);
      }
    }

    localStorage.setItem("storageList", JSON.stringify(selectedItems));
    let container = document.getElementById(
      "checkoutpageWrapper"
    ) as HTMLDivElement;
    container.innerHTML = "";
    showCart(selectedItems);
    console.log(selectedItems);
  }
};

// Räknare för antar produkter av varje sort i köplistan
export const counter = (products: Products[], target: string) => {
  let sum: number = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].title === target) {
      sum++;
    }
  }
  return sum;
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

export function filterProducts() {
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

  let submit = document.getElementById("btnSubmit") as HTMLButtonElement;

  submit.addEventListener("click", () => {
    filterAlternatives(filteredList);
  });

  function filterAlternatives(products: Products[]) {
    let filteredList = products.filter((book) => {
      return book.type === selectedFilter;
    });

    if (selectedFilter === "Alla") {
      console.log("alla");
      let container = document.getElementById(
        "productpageWrapper"
      ) as HTMLDivElement;

      container.innerHTML = "";
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
      bookContainer.classList.add("bookContainer");

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
}


// Sorteringsfunktion av köplistan. -- gör så artiklarna inte hoppar runt när man raderar.
export const productSort = (selectedItems: Products[], desc: boolean = true) => {
  return selectedItems.sort((a: Products, b: Products) => {
    if (desc) {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;

      return 0;
    } else {
      if (a.title > b.title) return -1;
      if (a.title < b.title) return 1;

      return 0;
    }
  });
}
