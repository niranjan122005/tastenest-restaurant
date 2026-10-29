import type { FoodCategory } from "./foods";
import { PHOTO, unsplash } from "./photos";

export interface NavItem {
  label: string;
  to: string;
  children?: { label: string; to: string }[];
}

export const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "Menu",
    to: "/menu",
    children: [
      { label: "Menu List", to: "/menu" },
      { label: "Shop", to: "/shop" },
    ],
  },
  {
    label: "Pages",
    to: "/chefs",
    children: [
      { label: "Our Chef", to: "/chefs" },
      { label: "Testimonials", to: "/testimonials" },
    ],
  },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const CONTACT = {
  address: "9502 Preston Rd. Inglewood, Maine 98380",
  email: "info@tastenest.com",
  hours: "Mon to Sat – 8am to 5pm",
  hoursLong: "Monday - Sunday: 9:00am - 10:00pm\nSunday is Closed",
  phone: "+252 6547 9976",
  phone2: "+12345678900",
  location: "213 W Tonichi Ave, Gunnison, CO\n81230, United States",
};

export const HOME_CATEGORIES: { name: string; items: number; icon: string; photo: string; filter: FoodCategory }[] = [
  { name: "Grill Chicken", items: 22, icon: "/images/foods/cat-1.png", photo: unsplash(PHOTO.familyFeast, 300), filter: "Chicken" },
  { name: "Delicious Burger", items: 23, icon: "/images/foods/cat-3.png", photo: unsplash(PHOTO.burger, 300), filter: "Burger" },
  { name: "Fries Meals", items: 12, icon: "/images/foods/cat-2.png", photo: unsplash(PHOTO.friesKetchup, 300), filter: "Fries" },
  { name: "Crispy Chicken", items: 25, icon: "/images/foods/cat-4.png", photo: unsplash(PHOTO.chickenBalls, 300), filter: "Chicken" },
  { name: "Combo Foods", items: 18, icon: "/images/foods/cat-5.png", photo: unsplash(PHOTO.burgerTray, 300), filter: "Sushi" },
  { name: "Dominos Pizza", items: 32, icon: "/images/foods/cat-6.png", photo: unsplash(PHOTO.pepperoniPizza, 300), filter: "Pizza" },
];
