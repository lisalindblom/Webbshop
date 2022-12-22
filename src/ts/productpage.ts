import {
  cartBadge,
  filterProducts,
  handleCLick,
  showProducts,
} from "./functions/functions";
import { Products } from "./models/models";

import { products as filteredList } from "./services.ts/data";

showProducts(filteredList);
filterProducts();
cartBadge();
