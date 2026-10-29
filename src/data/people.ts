import { PHOTO, unsplash } from "./photos";

export interface Chef { name: string; role: string; image: string; photo: string }

export const CHEFS: Chef[] = [
  { name: "Alina Morish", role: "Expert Chef", image: "/images/chefs/chef-1.jpg", photo: unsplash(PHOTO.chef1, 1600) },
  { name: "Michel Clark", role: "Expert Chef", image: "/images/chefs/chef-2.jpg", photo: unsplash(PHOTO.chef2, 1600) },
  { name: "Esa Elizabed", role: "Expert Chef", image: "/images/chefs/chef-3.jpg", photo: unsplash(PHOTO.chef3, 1600) },
  { name: "William Latham", role: "Expert Chef", image: "/images/chefs/chef-4.jpg", photo: unsplash(PHOTO.chef4, 1600) },
  { name: "Florida Tusy", role: "Expert Chef", image: "/images/chefs/chef-5.jpg", photo: unsplash(PHOTO.chef5, 1600) },
  { name: "Ethan David", role: "Expert Chef", image: "/images/chefs/chef-6.jpg", photo: unsplash(PHOTO.chef6, 1600) },
  { name: "Alexa Michelle Duke", role: "Expert Chef", image: "/images/chefs/chef-7.jpg", photo: unsplash(PHOTO.chef7, 1600) },
  { name: "Wiliam Latham", role: "Expert Chef", image: "/images/chefs/chef-8.jpg", photo: unsplash(PHOTO.chef8, 1600) },
];

export interface Testimonial {
  name: string;
  company: string;
  quote: string;
  image: string;
  photo: string;
}

export const FEATURED_TESTIMONIALS: Testimonial[] = [
  { name: "Victoria Wotton", company: "Pemantum Dolo Co.", image: "/images/people/man.png", photo: unsplash(PHOTO.customerMan, 700), quote: "Every pizza starts with our hand-tossed dough, made fresh daily and topped with our signature sauce crafted from ripe tomatoes and secret herbs." },
  { name: "Emma Mia", company: "Pemantum Dolo Co.", image: "/images/people/woman.png", photo: unsplash(PHOTO.customerWoman, 700), quote: "Freshly tossed dough forms the base of every pizza, if the name topped with a homemade sauce made from juicy tomatoes and our special herb recipe." },
];

export interface Review { author: string; role: string; quote: string }

export const REVIEWS: Review[] = [
  { author: "Adam Michel", role: "Customer at TasteNest", quote: "Every pizza starts with our hand-tossed dough, made fresh daily and topped with our signature sauce crafted from ripe tomatoes and secret herbs. Whether you love classic pepperoni, cheesy Margherita, or bold, gourmet creations — we've got something to satisfy every craving." },
  { author: "Sophia Lane", role: "Food blogger", quote: "The crust is crisp outside and soft inside, and the toppings are always generous. Delivery was hot and on time — easily the best fast food we have ordered this year." },
  { author: "Rahul Verma", role: "Regular customer", quote: "Family dinners are sorted! The combo deals are great value and the kids love the black burger. Friendly staff and a lovely, cosy restaurant too." },
  { author: "Priya Nair", role: "Customer at TasteNest", quote: "Fresh ingredients, fast service and flavours that taste homemade. The smoked salmon bagel is my absolute favourite — I order it every week." },
];
