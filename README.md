# TasteNest – React + TypeScript + Tailwind CSS

Fast-food restaurant UI built from the supplied Figma screens (Home, About, Menu List, Shop, Product Details,
Our Chef, Testimonials, Contact, My Account, 404 + Blog placeholder). Responsive: mobile, tablet, desktop.

## Run
```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check + production build
npm run preview      # http://localhost:4173
npm run test:e2e     # Playwright smoke test of every page/interaction (needs preview running)
```

## Structure
- `src/components/ui` – Button, SectionTitle, CategoryTabs, PageBanner, Pagination, QuantityInput, TextField, Stars
- `src/components/cards` – FoodCard, ProductCard, MenuListItem, ChefCard, TestimonialCard
- `src/components/layout` – TopBar, Header (+mobile menu), Footer, CartDrawer, SearchOverlay, ReserveModal, Toast
- `src/context` – Cart, Auth (demo login: any username + 4-char password; required to place an order or reserve a table), UI (overlays/toast)
- `src/data` – foods, chefs, testimonials, nav (edit here to change content)
- `src/router.tsx` – tiny History-API router (no dependency)
- `public/images` – local fallback images (the app loads HD photos from Unsplash first)

## Replacing images with higher quality ones
Photos were extracted from the screenshots, so they are limited by their resolution. Drop better files into
`public/images/foods|chefs|people|decor` using the **same file names** and they are picked up automatically.
