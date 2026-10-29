import type { ReactNode } from "react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { UIProvider } from "./context/UIContext";
import { Layout } from "./components/layout/Layout";
import { Router, matchPath, useRouter } from "./router";
import About from "./pages/About";
import Account from "./pages/Account";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Checkout from "./pages/Checkout";
import Chefs from "./pages/Chefs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import MenuList from "./pages/MenuList";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import Testimonials from "./pages/Testimonials";

const ROUTES: { pattern: string; render: (params: Record<string, string>) => ReactNode }[] = [
  { pattern: "/", render: () => <Home /> },
  { pattern: "/about", render: () => <About /> },
  { pattern: "/menu", render: () => <MenuList /> },
  { pattern: "/shop", render: () => <Shop /> },
  { pattern: "/product/:id", render: ({ id }) => <ProductDetails key={id} id={id} /> },
  { pattern: "/chefs", render: () => <Chefs /> },
  { pattern: "/testimonials", render: () => <Testimonials /> },
  { pattern: "/contact", render: () => <Contact /> },
  { pattern: "/checkout", render: () => <Checkout /> },
  { pattern: "/account", render: () => <Account /> },
  { pattern: "/blog", render: () => <Blog /> },
  { pattern: "/blog/:slug", render: ({ slug }) => <BlogPost key={slug} slug={slug} /> },
];

function Routes() {
  const { path } = useRouter();
  for (const { pattern, render } of ROUTES) {
    const params = matchPath(pattern, path);
    if (params) return <>{render(params)}</>;
  }
  return <NotFound />;
}

export default function App() {
  return (
    <Router>
      <UIProvider>
        <AuthProvider>
          <CartProvider>
            <Layout>
              <Routes />
            </Layout>
          </CartProvider>
        </AuthProvider>
      </UIProvider>
    </Router>
  );
}
