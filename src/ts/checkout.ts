import { cartBadge, displayPaymentForm, showCart } from "./functions/functions";
import { selectedItems } from "./services.ts/data";
showCart(selectedItems);
displayPaymentForm();
cartBadge();
