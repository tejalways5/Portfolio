# Surya Teja Tumu — Personal Portfolio (React + Vite)

Minimal, responsive portfolio built with React + Vite. Features:
- Theme switching (multiple color themes)
- Smooth Navbar with scroll-to sections
- Blog carousel pulling posts from Medium RSS (CORS-friendly fallback)
- Projects, About and Contact sections
- Tailwind CSS for styling, Lucide icons, Framer Motion for subtle animations

## Tech stack
- React (client components)
- Vite
- Tailwind CSS
- framer-motion
- lucide-react
- Optional: rss2json as RSS -> JSON fallback for Medium feed

## Quick start (macOS)
1. Install
   - npm:
     npm install
   - or yarn:
     yarn

2. Run dev
   npm run dev
   # open http://localhost:5173

3. Build / preview
   npm run build
   npm run preview

## Important files / folders
- src/App.jsx — theme list + root layout
- src/components/Navbar.jsx — top navigation and theme button
  - Note: remove focus outline on theme button by adding `className="outline-none"` or Tailwind `outline-none` (or add CSS `button:focus { outline: none; }`)
- src/components/About.jsx — About section content
- src/components/BLog.jsx — Blog carousel (fetches Medium RSS)
  - Medium RSS URL: https://medium.com/feed/@suryatejatumu
  - If you face CORS errors, the component falls back to `https://api.rss2json.com/v1/api.json?rss_url=...` — consider using your own serverless proxy for production.
- src/components/Projects.jsx, Contact.jsx, Footer.jsx — other sections

## Blog carousel behavior
- Shows one large card at a time with image on the left and info on the right.
- Supports:
  - swipe/drag gestures
  - arrow controls
  - dot pagination below the card (tiny dots)
- Animations use framer-motion for fluid sliding.

## Styling & Theme notes
- Colors are driven by CSS custom properties in App.jsx (e.g. `--color-primary`, `--color-bg`).
- Body/text color is forced to black (`--color-text: #000`) while headings use `--color-primary`.
- Tailwind utility classes are used project-wide — change sizes / spacing inside components.

## Accessibility & UX
- Buttons have aria-labels for assistive tech.
- Carousel supports keyboard and drag interactions (framer-motion).
- Keep focus outlines for keyboard users where necessary; theme button currently suppresses the blue focus ring visually — ensure keyboard focus styles remain via other visible indicators if needed.

## Deployment
- Any static host supporting Vite builds: Vercel, Netlify, GitHub Pages, etc.
- Build:
  npm run build
- Deploy the `dist/` folder.

## Customization
- To change themes, edit `themes` in `src/App.jsx`.
- To change Medium handle, update `MEDIUM_FEED` in `src/components/BLog.jsx`.
- To reduce dot size, update the Tailwind classes in the dots block (e.g., `w-1 h-1`).

## Troubleshooting
- Medium RSS CORS errors: use rss2json fallback or host a simple proxy (serverless function).
- Missing icons: ensure `lucide-react` is installed.
- Build errors: run `npm ci` then `npm run dev` to confirm dependency issues.

## License
MIT — adapt as needed.