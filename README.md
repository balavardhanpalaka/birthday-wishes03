# Birthday Wishes — Classical & Vibrant One‑Page Website

A lightweight, classical and vibrant single-page website to wish your friend a happy birthday. Built with plain HTML, CSS and JavaScript — easy to customize and deploy (GitHub Pages friendly).

Features
- Classical typography (Playfair Display) with modern contrast (Montserrat)
- Warm parchment + purple + gold color palette for a classical & vibrant look
- Confetti celebration animation
- Customizable name and short message via form or URL query parameters
- Works offline (no external JS libraries) — only Google Fonts are loaded externally

How to use
1. Open `index.html` in a browser.
2. To prefill the friend's name and message, use URL parameters:
   - example: `index.html?name=Priya&msg=Have%20the%20best%20day!`
   - short alias: `?to=Priya` also supported
3. Click "Celebrate 🎉" to trigger confetti.
4. Click "Customize" to edit name/message on the page. After applying, the page URL updates so you can copy & share it.

How to deploy to GitHub Pages
1. Create a new repository (or use your existing repository).
2. Add the files from this project (`index.html`, `styles.css`, `script.js`, `README.md`).
3. Commit and push to GitHub.
4. In the repository settings -> Pages, set the source to the branch (e.g., `main`) and root `/`.
5. The site will be available at `https://<your-username>.github.io/<repo-name>/`.

Customization ideas
- Replace the heart SVG in the left panel with a photo: edit `.decor` HTML.
- Swap colors in `styles.css` (see :root variables).
- Add a local audio clip and a "Play music" button if you'd like background music. (Keep autoplay off; add user-initiated play.)
- Increase confetti piece count in `script.js` if you want a more festive burst.

Want me to add this to your repository?
I can push these files directly to your repo (create a branch and add them) or open a pull request — tell me which you'd prefer and the branch name to use (for example `birthday-wish-page`). If you want that, reply with "Push to repo" and the branch name and I'll do it.