import { PHOTO, unsplash } from "./photos";

export type BlogCategory = "Recipes" | "Restaurant News" | "Food Tips" | "Offers";

export interface Post {
  slug: string;
  title: string;
  category: BlogCategory;
  date: string; // ISO
  author: string;
  readMins: number;
  excerpt: string;
  body: string[];
  photo: string;
  /** Local fallback (offline). */
  image: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = ["Recipes", "Restaurant News", "Food Tips", "Offers"];

const photo = (id: string) => unsplash(id, 1100);

export const POSTS: Post[] = [
  {
    slug: "secret-to-a-perfect-wood-fired-pizza", title: "The Secret to a Perfect Wood-Fired Pizza", category: "Recipes", date: "2026-10-20", author: "Chef Esa Elizabed", readMins: 5,
    excerpt: "Hot oven, slow-proofed dough and just three toppings — here is how our chefs get that blistered, chewy crust every single time.",
    body: [
      "A great pizza starts long before the oven is lit. Our dough rests for 48 hours, which gives it the deep flavour and airy, open crumb you taste in every bite.",
      "Heat is the second secret. Our wood-fired oven runs at close to 450°C, so a pizza is ready in barely 90 seconds. That blast of heat blisters the crust while keeping the centre soft and the cheese just melted.",
      "Finally, restraint. Good tomato sauce, fresh mozzarella and a few basil leaves beat a crowded pizza every time. Let the ingredients breathe and the crust do the talking.",
    ],
    photo: photo(PHOTO.boardPizza), image: "/images/foods/board-pizza.png",
  },
  {
    slug: "building-the-juiciest-burger", title: "Building the Juiciest Burger at Home", category: "Recipes", date: "2026-10-14", author: "Chef Michel Clark", readMins: 4,
    excerpt: "Fat ratio, a screaming hot pan and one small trick with the bun — the three things that separate a good burger from a great one.",
    body: [
      "Start with 80/20 beef. The fat is what keeps a burger juicy, so resist the urge to go leaner. Shape the patties gently and press a small dimple in the centre so they stay flat as they cook.",
      "Cook on a very hot cast-iron pan for about two minutes per side without pressing down. Add the cheese in the last 30 seconds and cover the pan so it melts properly.",
      "Toast the cut side of the bun in the beef fat. It adds flavour and stops the bun going soggy under all that juice.",
    ],
    photo: photo(PHOTO.burger), image: "/images/foods/pepperoni-burger.png",
  },
  {
    slug: "new-combo-deals-this-season", title: "New Combo Deals Are Here This Season", category: "Offers", date: "2026-10-10", author: "TasteNest Team", readMins: 2,
    excerpt: "Two large pizzas, garlic bread and four soft drinks for one price — meet the Classic Duo Deal and our other new family combos.",
    body: [
      "Sharing tastes better, so we built our new combos around big tables. The Classic Duo Deal brings two large pizzas, garlic bread and four soft drinks for $40.",
      "For bigger gatherings the Family Feast adds roast chicken, crispy sides and a dessert platter. Order online or at the counter — combos are available all day.",
    ],
    photo: photo(PHOTO.familyFeast), image: "/images/foods/family-feast.png",
  },
  {
    slug: "how-we-get-fries-so-crispy", title: "How We Get Our Fries Extra Crispy", category: "Food Tips", date: "2026-10-05", author: "Chef Michel Clark", readMins: 3,
    excerpt: "Double-frying, a cold-water soak and a pinch of patience. Try these fry tips and you will never go back to soggy chips.",
    body: [
      "Cut your potatoes evenly and soak them in cold water for 30 minutes to wash off the surface starch. Dry them thoroughly — water is the enemy of crispiness.",
      "Fry once at a lower temperature to cook the inside, rest them, then fry again at a higher temperature for a golden, crunchy shell. Salt immediately while they are hot.",
    ],
    photo: photo(PHOTO.fries), image: "/images/foods/fries.png",
  },
  {
    slug: "meet-our-new-chicken-menu", title: "Meet Our New Crispy Chicken Menu", category: "Restaurant News", date: "2026-09-28", author: "TasteNest Team", readMins: 3,
    excerpt: "Golden chicken balls, grill chicken fry and a brand new family platter — our kitchen has been busy.",
    body: [
      "After months of testing, our chefs are proud to launch a refreshed chicken menu. Everything is marinated overnight and cooked to order, so it arrives hot and juicy.",
      "Do not miss the Fry Chicken Balls with garlic dip — they have already become a firm favourite with our regulars.",
    ],
    photo: photo(PHOTO.chickenBalls), image: "/images/foods/chicken-balls.png",
  },
  {
    slug: "weekend-brunch-smoked-salmon-bagel", title: "Weekend Brunch: The Smoked Salmon Bagel", category: "Recipes", date: "2026-09-21", author: "Chef Alina Morish", readMins: 4,
    excerpt: "Toasted bagel, silky cream cheese, smoked salmon and a squeeze of lemon. Brunch does not get easier — or tastier.",
    body: [
      "Slice a fresh bagel and toast it until the edges turn golden. Spread a generous layer of cream cheese while it is still warm.",
      "Layer smoked salmon, thin red onion rings, capers and fresh dill. Finish with lemon juice and cracked black pepper. Serve with a good coffee.",
    ],
    photo: photo(PHOTO.salmonBagel), image: "/images/foods/salmon-bagel.png",
  },
  {
    slug: "pizza-night-toppings-that-work", title: "Pizza Night: Toppings That Always Work", category: "Food Tips", date: "2026-09-15", author: "Chef William Latham", readMins: 3,
    excerpt: "Mushroom and truffle, spicy salami and honey, or classic pepperoni — pairings our guests order again and again.",
    body: [
      "Balance is everything: pair something salty with something sweet and something fresh. Spicy salami with a drizzle of honey is a perfect example.",
      "For vegetarians, roasted mushrooms with garlic butter and a little thyme give a deep, savoury flavour without any meat.",
    ],
    photo: photo(PHOTO.mushroomPizza), image: "/images/foods/grill-chicken-fry.png",
  },
  {
    slug: "kids-eat-free-sundays", title: "Kids Eat Free Every Sunday", category: "Offers", date: "2026-09-08", author: "TasteNest Team", readMins: 2,
    excerpt: "Bring the family on Sundays — one free kids' meal with every adult main, all day long.",
    body: [
      "Sundays are for families. From now on every adult main comes with a free kids' meal — choose from mini burgers, cheesy pizza slices or crispy chicken bites.",
      "No coupon needed, just mention the offer when you order. It is valid for dine-in all day.",
    ],
    photo: photo(PHOTO.doubleBurger), image: "/images/foods/pepperoni-burger.png",
  },
  {
    slug: "our-kitchen-welcomes-new-chefs", title: "Our Kitchen Welcomes Three New Chefs", category: "Restaurant News", date: "2026-09-01", author: "TasteNest Team", readMins: 2,
    excerpt: "Fresh talent, fresh ideas. Say hello to the newest members of our expert chef team.",
    body: [
      "We are thrilled to welcome three talented chefs to the TasteNest family. Between them they bring experience from Italy, Mexico and Japan — and plenty of new ideas for our menu.",
      "Look out for special weekend dishes created by the new team, available for a limited time only.",
    ],
    photo: photo(PHOTO.woodPizza), image: "/images/foods/hero-pizza.png",
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
export const formatDate = (iso: string) => new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
