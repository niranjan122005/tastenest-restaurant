import { PHOTO, unsplash } from "./photos";

export type FoodCategory = "Pizza" | "Burger" | "Sushi" | "Chicken" | "Fries";

export interface Food {
  id: string;
  /** Real photo (remote). `image` is the local fallback. */
  photo: string;
  name: string;
  category: FoodCategory;
  price: number;
  /** Old price – when present the item is "on sale". */
  oldPrice?: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
}

export const FOOD_CATEGORIES: FoodCategory[] = ["Pizza", "Burger", "Sushi", "Chicken", "Fries"];

const img = (name: string) => `/images/foods/${name}.png`;
const ph = (id: string) => unsplash(id, 900);

/** Single source of truth for every menu / shop / related-products list. */
export const FOODS: Food[] = [
  { id: "bacon-italian-pizza", photo: ph(PHOTO.baconPizza), name: "Bacon Italian Pizza", category: "Pizza", price: 20.99, image: img("bacon-pizza"), description: "Spicy jalapeño, creamy ranch", rating: 5, reviews: 6 },
  { id: "combo-classic-duo-deal", photo: ph(PHOTO.duoPizza), name: "Combo: Classic Duo Deal", category: "Pizza", price: 40.0, image: img("combo-duo"), description: "2 large pizza + garlic bread + 4 soft drinks", rating: 5, reviews: 4 },
  { id: "combo-family-feast", photo: ph(PHOTO.familyFeast), name: "Combo: Family Feast", category: "Chicken", price: 60.0, image: img("family-feast"), description: "Roast chicken, herbs and a crispy wooden-board platter", rating: 4.5, reviews: 9 },
  { id: "combo-solo-snack-pack", photo: ph(PHOTO.dumplings), name: "Combo: Solo Snack Pack", category: "Sushi", price: 232.85, image: img("snack-pack"), description: "Steamed dumplings with chilli dip and fresh herbs", rating: 5, reviews: 3 },
  { id: "delicious-black-burger", photo: ph(PHOTO.blackBurger), name: "Delicious Black Burger", category: "Burger", price: 30.99, image: img("black-burger"), description: "Charcoal bun, cheddar, tomato and crisp lettuce", rating: 5, reviews: 8 },
  { id: "delicious-pizza-olive", photo: ph(PHOTO.roundPizza), name: "Delicious Pizza", category: "Pizza", price: 32.85, image: img("olive-pizza"), description: "Truffle mushroom, garlic butter", rating: 5, reviews: 5 },
  { id: "delicious-pizza-pepperoni", photo: ph(PHOTO.pepperoniPizza), name: "Delicious Pizza", category: "Pizza", price: 40.99, image: img("pepperoni-pizza"), description: "Spicy jalapeño, creamy ranch", rating: 5, reviews: 7 },
  { id: "truffle-mushroom-pizza", photo: ph(PHOTO.mushroomPizza), name: "Delicious Pizza", category: "Pizza", price: 34.5, image: img("pepperoni-pizza"), description: "Truffle mushroom, garlic butter", rating: 5, reviews: 4 },
  { id: "fry-chicken-ball", photo: ph(PHOTO.chickenBalls), name: "Fry Chicken Ball", category: "Chicken", price: 177.85, image: img("chicken-balls"), description: "Golden crispy chicken balls with garlic dip", rating: 5, reviews: 2 },
  { id: "grill-chicken-fry", photo: ph(PHOTO.hamPizza), name: "Grill Chicken Fry", category: "Pizza", price: 16.85, oldPrice: 20.99, image: img("grill-chicken-fry"), description: "Sweet pineapple, tangy ham", rating: 5, reviews: 11 },
  { id: "grill-chicken-pizza", photo: ph(PHOTO.boardPizza), name: "Grill Chicken Pizza", category: "Pizza", price: 30.99, image: img("board-pizza"), description: "Candied Jerusalem artichokes, truffle", rating: 5, reviews: 6 },
  { id: "italiano-pizza", photo: ph(PHOTO.italianoPizza), name: "Italiano Pizza", category: "Pizza", price: 16.85, oldPrice: 20.99, image: img("italiano-pizza"), description: "Cheesy bacon, maple drizzle", rating: 5, reviews: 10 },
  { id: "pepperoni-burger", photo: ph(PHOTO.burger), name: "Pepperoni Burger", category: "Burger", price: 18.0, oldPrice: 20.99, image: img("pepperoni-burger"), description: "Smoky pepperoni, melted cheese, fresh greens", rating: 5, reviews: 12 },
  // ---- page 2 of the shop ----
  { id: "smoked-salmon-bagel", photo: ph(PHOTO.salmonBagel), name: "Smoked Salmon Bagel", category: "Sushi", price: 39.85, image: img("salmon-bagel"), description: "Smoky pepperoni, melted cheese", rating: 5, reviews: 5 },
  { id: "solo-snack-pack", photo: ph(PHOTO.fries), name: "Solo Snack Pack", category: "Fries", price: 20.0, image: img("fries"), description: "Crispy fries with a ketchup dip", rating: 5, reviews: 14 },
  { id: "crispy-roast-chicken", photo: ph(PHOTO.roastChicken), name: "Crispy Roast Chicken", category: "Chicken", price: 48.0, image: img("roast-chicken"), description: "Slow roasted, finished on the grill", rating: 4.5, reviews: 4 },
  { id: "double-patty-burger", photo: ph(PHOTO.doubleBurger), name: "Double Patty Burger", category: "Burger", price: 24.5, image: img("pepperoni-burger"), description: "Two juicy patties, pickles and house sauce", rating: 4.5, reviews: 3 },
];

export const getFood = (id: string) => FOODS.find((f) => f.id === id);
export const foodsByCategory = (category: FoodCategory) => FOODS.filter((f) => f.category === category);
export const isOnSale = (f: Food) => f.oldPrice !== undefined;
export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
