# NOVARA — Premium E-commerce Demo

A modern online store built with **React + Vite + Tailwind CSS + Framer Motion + Lucide React**.
No backend and no API keys needed. Cart and wishlist are saved in your browser (localStorage).

## How to run it (beginner steps)

1. **Install Node.js** (version 18 or newer) from https://nodejs.org — choose the "LTS" button.
2. **Unzip** this project and open the `novara-store` folder in **VS Code** (File → Open Folder).
3. Open the VS Code terminal: menu **Terminal → New Terminal**.
4. Type this and press Enter (only needed the first time, takes 1–2 minutes):

   ```
   npm install
   ```

5. Then type this and press Enter:

   ```
   npm run dev
   ```

6. The terminal prints a link like `http://localhost:5173/`. Your browser should open by itself — if not,
   hold **Ctrl** (or **Cmd** on Mac) and click the link.
7. To stop the site, click the terminal and press **Ctrl + C**.

## Where everything is

```
src/
  data/        products.js (all products, categories, collections) · promptLogic.js (Design Prompt text)
  context/     StoreContext.jsx (cart, wishlist, dark mode, open/close panels)
  hooks/       useHoverFx.js (tilt, spotlight, image follow) · useLocalStorage.js · useCanHover.js
  components/  Navbar, Footer, Hero, ProductCard, CartDrawer, QuickViewModal, SearchOverlay, PromptPanel ...
  pages/       Home, Shop, ProductDetails, Collections, Wishlist, Checkout, About, Account, InfoPage
  index.css    colours (light + dark) and the hover-effect styles
```

## Easy edits

- **Change products / prices / images:** `src/data/products.js`
- **Change colours:** the `:root` and `.dark` blocks at the top of `src/index.css`
- **Change the Design Prompt wording:** `src/data/promptLogic.js`
- **Free-shipping amount / fee:** top of `src/context/StoreContext.jsx`

## Notes

- Product photos load from Unsplash. If you're offline, elegant placeholder tiles appear instead.
- Checkout is a demo: no payment is taken. Placing an order shows "Order Confirmed #NV-10245".
- Hover effects (tilt, spotlight, image follow) turn off automatically on touch screens.
