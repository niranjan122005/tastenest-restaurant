/**
 * End-to-end smoke test of every page + interaction.
 *   npm run build && npm run preview     (or node scripts/serve-dist.mjs)
 *   BASE_URL=http://localhost:4173 npm run test:e2e
 */
import { createRequire } from "node:module";
import assert from "node:assert/strict";

let chromium;
try { ({ chromium } = await import("playwright")); }
catch { chromium = createRequire("/home/claude/.npm-global/lib/node_modules/")("playwright").chromium; }

const BASE = process.env.BASE_URL ?? "http://localhost:4173";
const browser = await chromium.launch();
let passed = 0;
const test = async (name, fn) => {
  try { await fn(); passed++; console.log("  ✓", name); }
  catch (e) { console.error("  ✗", name, "\n   ", e.message.split("\n")[0]); process.exitCode = 1; }
};
const fresh = async (width = 1280, height = 900) => {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  page.errors = [];
  page.on("pageerror", (e) => page.errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && !/fonts\.g|Failed to load resource|ERR_/.test(m.text()) && page.errors.push(m.text()));
  return page;
};
const count = (page) => page.getByTestId("cart-count").innerText();

const ROUTES = ["/", "/about", "/menu", "/shop", "/product/italiano-pizza", "/chefs", "/testimonials", "/contact", "/account", "/checkout", "/blog", "/blog/how-we-get-fries-so-crispy", "/404", "/nope"];

console.log("Pages & responsiveness");
for (const width of [390, 768, 1280]) {
  await test(`all pages render without errors or horizontal scroll @${width}px`, async () => {
    const page = await fresh(width);
    for (const r of ROUTES) {
      await page.goto(BASE + r);
      await page.waitForSelector("h1");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      assert.ok(overflow <= 0, `${r} overflows by ${overflow}px`);
      await page.waitForTimeout(700);
      // remote photos fail offline and swap to local fallbacks; give that a moment before judging
      await page.waitForFunction(() => ![...document.images].some((i) => i.complete && i.naturalWidth === 0), null, { timeout: 15000 }).catch(() => {});
      const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
      assert.deepEqual(broken, [], `${r} broken images`);
    }
    assert.deepEqual(page.errors, []);
    await page.context().close();
  });
}

console.log("Navigation");
await test("desktop nav + dropdown + 404", async () => {
  const page = await fresh();
  await page.goto(BASE + "/");
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "About", exact: true }).click();
  assert.equal(new URL(page.url()).pathname, "/about");
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Menu", exact: true }).hover();
  await page.getByRole("link", { name: "Shop", exact: true }).first().click();
  assert.equal(new URL(page.url()).pathname, "/shop");
  assert.equal(await page.getByRole("link", { name: "Menu List" }).isVisible(), false, "dropdown should close after a click");
  const pages = page.getByRole("navigation", { name: "Main" });
  await pages.getByRole("link", { name: "Pages", exact: true }).hover();
  assert.equal(await page.getByRole("link", { name: "My Account" }).count(), 0, "My Account removed from nav");
  assert.equal(await page.getByRole("link", { name: "Error 404" }).count(), 0, "Error 404 removed from nav");
  await page.mouse.move(600, 600);
  await page.goBack();
  assert.equal(new URL(page.url()).pathname, "/about");
  await page.goto(BASE + "/nope");
  await page.getByText("Page Can't be Found").waitFor();
  await page.getByRole("link", { name: "Back to home" }).click();
  assert.equal(new URL(page.url()).pathname, "/");
});
await test("mobile menu opens, expands submenu and navigates", async () => {
  const page = await fresh(390, 800);
  await page.goto(BASE + "/");
  await page.getByRole("button", { name: "Toggle menu" }).click();
  await page.getByRole("button", { name: "Toggle Menu submenu" }).click();
  await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Shop" }).click();
  assert.equal(new URL(page.url()).pathname, "/shop");
  assert.equal(await page.getByRole("navigation", { name: "Mobile" }).count(), 0, "menu should close");
});

console.log("Menu, shop & product");
await test("menu tabs filter dishes", async () => {
  const page = await fresh();
  await page.goto(BASE + "/menu");
  await page.getByRole("tab", { name: "Burger" }).click();
  await page.getByRole("heading", { name: "Delicious Black Burger" }).waitFor();
  assert.equal(await page.getByRole("heading", { name: "Bacon Italian Pizza" }).count(), 0);
});
await test("shop sorting + pagination", async () => {
  const page = await fresh();
  await page.goto(BASE + "/shop");
  assert.match(await page.getByTestId("shop-count").innerText(), /1–12 of 17/);
  await page.getByLabel("Sort products").selectOption("priceAsc");
  assert.equal(await page.locator("article h3").first().innerText(), "Grill Chicken Fry");
  await page.getByRole("button", { name: "2", exact: true }).click();
  assert.match(await page.getByTestId("shop-count").innerText(), /13–17 of 17/);
});
await test("product: quantity, add to cart, wishlist, tabs, related", async () => {
  const page = await fresh();
  await page.goto(BASE + "/product/italiano-pizza");
  await page.getByRole("button", { name: "Increase quantity" }).click();
  await page.getByRole("button", { name: "Increase quantity" }).click();
  assert.equal(await page.getByTestId("qty-value").innerText(), "3");
  await page.getByRole("button", { name: "Add to cart" }).first().click();
  assert.equal(await count(page), "3");
  await page.getByRole("button", { name: "Toggle wishlist" }).click();
  assert.equal(await page.getByRole("button", { name: "Toggle wishlist" }).getAttribute("aria-pressed"), "true");
  await page.getByRole("tab", { name: "Reviews (0)" }).click();
  await page.getByText("There are no reviews yet").waitFor();
  await page.getByRole("heading", { name: "Related products" }).waitFor();
});

await test("blog: filter, search, pagination and post page", async () => {
  const page = await fresh();
  await page.goto(BASE + "/blog");
  assert.equal(await page.getByTestId("blog-grid").locator("article").count(), 6);
  await page.getByRole("button", { name: "2", exact: true }).click();
  assert.equal(await page.getByTestId("blog-grid").locator("article").count(), 3);
  await page.getByRole("tab", { name: "Offers" }).click();
  assert.equal(await page.getByTestId("blog-grid").locator("article").count(), 2);
  await page.getByRole("tab", { name: "All" }).click();
  await page.getByLabel("Search posts").fill("zzzz");
  await page.getByText("No posts match").waitFor();
  await page.getByLabel("Search posts").fill("burger");
  await page.getByRole("link", { name: "Building the Juiciest Burger at Home" }).first().click();
  assert.equal(new URL(page.url()).pathname, "/blog/building-the-juiciest-burger");
  await page.getByRole("heading", { name: "Building the Juiciest Burger at Home" }).waitFor();
  await page.getByRole("link", { name: "← Back to blog" }).click();
  assert.equal(new URL(page.url()).pathname, "/blog");
});

console.log("Cart, login & checkout");
await test("cart drawer: qty, remove, total, persistence", async () => {
  const page = await fresh();
  await page.goto(BASE + "/shop");
  await page.getByRole("button", { name: "Add to cart" }).first().click(); // 20.99
  await page.getByRole("button", { name: "Add to cart" }).nth(1).click();  // 40.00
  assert.equal(await count(page), "2");
  await page.getByRole("button", { name: /Open cart/ }).click();
  assert.equal(await page.getByTestId("cart-total").innerText(), "$60.99");
  await page.getByRole("button", { name: "Increase quantity" }).first().click();
  assert.equal(await page.getByTestId("cart-total").innerText(), "$81.98");
  await page.reload();
  assert.equal(await count(page), "3", "cart persisted");
  await page.getByRole("button", { name: /Open cart/ }).click();
  await page.getByRole("button", { name: /^Remove/ }).first().click();
  assert.equal(await page.getByTestId("cart-lines").locator("li").count(), 1);
});
await test("checkout requires login, then address + payment, then places order", async () => {
  const page = await fresh();
  await page.goto(BASE + "/shop");
  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await page.getByRole("button", { name: /Open cart/ }).click();
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.waitForURL("**/account");
  await page.getByText("Please log in to place your order.").waitFor();
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await page.getByText("Please enter your username.").waitFor();
  await page.getByLabel("Username").fill("angu");
  await page.getByLabel("Password").fill("12");
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await page.getByText("at least 4 characters").waitFor();
  await page.getByLabel("Password").fill("secret1");
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await page.waitForURL("**/checkout");   // sent straight back to checkout
  assert.equal(await page.getByLabel("Full name").inputValue(), "angu", "name prefilled");

  // empty form -> address errors
  await page.getByLabel("Full name").fill("");
  await page.getByRole("button", { name: "Place order" }).click();
  await page.getByText("Enter the receiver's name.").waitFor();
  await page.getByText("Enter your street address.").waitFor();
  await page.getByText("Enter a 5 or 6 digit ZIP / PIN code.").waitFor();

  await page.getByLabel("Full name").fill("Angu S");
  await page.getByLabel("Phone number").fill("+91 98765 43210");
  await page.getByLabel("Street address").fill("12 Anna Salai, T Nagar");
  await page.getByLabel("City").fill("Chennai");
  await page.getByLabel("ZIP / PIN code").fill("600017");

  // card payment is validated
  await page.getByRole("radio", { name: /Credit/ }).check();
  await page.getByRole("button", { name: "Place order" }).click();
  await page.getByText("Card number must be 16 digits.").waitFor();
  await page.getByLabel("Card number").fill("4242424242424242");
  assert.equal(await page.getByLabel("Card number").inputValue(), "4242 4242 4242 4242", "card number is formatted");
  await page.getByLabel("Name on card").fill("Angu S");
  await page.getByLabel("Expiry date").fill("0120");
  await page.getByLabel("CVV").fill("12");
  await page.getByRole("button", { name: "Place order" }).click();
  await page.getByText("Use a valid future date (MM/YY).").waitFor();
  await page.getByText("CVV must be 3 or 4 digits.").waitFor();

  // UPI is validated too
  await page.getByRole("radio", { name: /^UPI/ }).check();
  await page.getByRole("button", { name: "Place order" }).click();
  await page.getByText(/Enter a valid UPI ID/).waitFor();

  // cash on delivery places the order
  await page.getByRole("radio", { name: /Cash on delivery/ }).check();
  await page.getByRole("button", { name: "Place order" }).click();
  await page.getByRole("heading", { name: "Order placed!" }).waitFor();
  const summary = await page.getByTestId("order-summary").innerText();
  assert.match(summary, /12 Anna Salai/);
  assert.match(summary, /Cash on delivery/);
  assert.equal(await count(page), "0", "cart cleared");

  await page.getByRole("button", { name: "Log out angu" }).click();
  await page.goto(BASE + "/checkout");           // logged out -> login required again
  await page.waitForURL("**/account");
});
await test("checkout totals: delivery fee under $50, free above", async () => {
  const page = await fresh();
  await page.goto(BASE + "/shop");
  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await page.goto(BASE + "/account");
  await page.getByRole("button", { name: "Use demo account" }).click();
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await page.goto(BASE + "/checkout");
  const sub = Number((await page.getByTestId("checkout-subtotal").innerText()).replace("$", ""));
  const del = await page.getByTestId("checkout-delivery").innerText();
  const tot = Number((await page.getByTestId("checkout-total").innerText()).replace("$", ""));
  if (sub >= 50) { assert.equal(del, "Free"); assert.equal(tot, sub); }
  else { assert.equal(del, "$3.99"); assert.equal(Math.round(tot * 100), Math.round((sub + 3.99) * 100)); }
});
await test("demo account autofills and logs in", async () => {
  const page = await fresh();
  await page.goto(BASE + "/account");
  await page.getByRole("button", { name: "Use demo account" }).click();
  assert.equal(await page.getByLabel("Username").inputValue(), "demo");
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await page.getByRole("heading", { name: /Hello, demo/ }).waitFor();
});

console.log("Overlays & forms");
await test("search finds dishes and opens product", async () => {
  const page = await fresh();
  await page.goto(BASE + "/");
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByLabel("Search the menu").fill("burger");
  assert.ok((await page.getByTestId("search-results").locator("li").count()) >= 2);
  await page.getByTestId("search-results").getByRole("link").first().click();
  assert.match(new URL(page.url()).pathname, /^\/product\//);
  await page.getByRole("button", { name: "Search" }).click();
  await page.keyboard.press("Escape");
  assert.equal(await page.getByLabel("Search the menu").count(), 0);
});
await test("reservation requires login, then validates and confirms", async () => {
  const page = await fresh();
  await page.goto(BASE + "/");
  await page.getByRole("button", { name: "Reserve a table" }).click();
  await page.waitForURL("**/account");
  await page.getByText("Please log in to reserve a table.").waitFor();
  assert.equal(await page.getByRole("dialog", { name: "Reserve a table" }).count(), 0, "no form while logged out");
  await page.getByLabel("Username").fill("Angu");
  await page.getByLabel("Password").fill("secret1");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL(BASE + "/");
  await page.getByRole("dialog", { name: "Reserve a table" }).waitFor();
  assert.equal(await page.getByLabel("Your name").inputValue(), "Angu", "name prefilled");
  await page.getByLabel("Your name").fill("");
  await page.getByRole("button", { name: "Confirm reservation" }).click();
  await page.getByText("Please enter your name.").waitFor();
  await page.getByLabel("Your name").fill("Angu");
  await page.getByLabel("Phone number").fill("+91 98765 43210");
  await page.getByLabel("Date").fill("2030-01-15");
  await page.getByRole("button", { name: "Confirm reservation" }).click();
  await page.getByRole("status").getByText(/Table for 2 reserved/).waitFor();
});
await test("contact form validation + success", async () => {
  const page = await fresh();
  await page.goto(BASE + "/contact");
  await page.getByRole("button", { name: "Send message now" }).click();
  await page.getByText("Please enter a valid email address.").waitFor();
  await page.getByLabel("Your name").fill("Angu");
  await page.getByLabel("Your email").fill("angu@example.com");
  await page.getByLabel("Subject").selectOption("Feedback");
  await page.getByLabel("Message").fill("Loved the pizza, thank you!");
  await page.getByRole("button", { name: "Send message now" }).click();
  await page.getByRole("status").getByText(/message has been sent/).waitFor();
  assert.equal(await page.getByLabel("Your name").inputValue(), "");
});
await test("reviews slider + chef load more", async () => {
  const page = await fresh();
  await page.goto(BASE + "/testimonials");
  assert.match(await page.getByTestId("review-counter").innerText(), /01/);
  await page.getByRole("button", { name: "Next review" }).click();
  assert.match(await page.getByTestId("review-counter").innerText(), /02/);
  await page.getByRole("tab", { name: "Review 4" }).click();
  assert.match(await page.getByTestId("review-counter").innerText(), /04/);
  await page.goto(BASE + "/chefs");
  assert.equal(await page.locator("figure").count(), 8);
  await page.getByRole("button", { name: "Load more member" }).click();
  await page.getByText("whole kitchen team").waitFor();
});

await browser.close();
console.log(process.exitCode ? "\nSome tests FAILED" : `\nAll ${passed} tests passed`);
