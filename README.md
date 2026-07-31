# A Special Delivery 💌

A romantic, interactive Girlfriend's Day website — envelope drop, love letter,
a memories scrapbook, a bouquet builder, a pizza gift game, and a secret
ending. Pure HTML/CSS/JS, no build step, ready for GitHub Pages.

---

## 1. Add your personal touches (optional but recommended)

Before uploading, drop your own files into `assets/`:

| Put this file here...              | Used for                          |
|-------------------------------------|------------------------------------|
| `assets/images/cover-photo.jpg`     | Page 3 polaroid photo              |
| `assets/images/secret-photo.jpg`    | The secret ending photo            |
| `assets/images/memory1.jpg` … `memory15.jpg` | The 15 scrapbook photos   |
| `assets/music/music.mp3`            | Background music (loops)           |

If you skip this step, the site still works perfectly — photo frames just
show a soft placeholder color instead of a picture.

Also open `script.js` and find this line near the top:

```js
const RELATIONSHIP_START = new Date('2025-01-20T00:00:00'); // 20 • 01 • 2025
const SPOTIFY_PLACEHOLDER_URL = 'https://open.spotify.com/';
```

Update the date and the Spotify link if you'd like — everything else works
out of the box.

---

## 2. Upload to GitHub Pages (step-by-step for beginners)

**You will need:** a free GitHub account (sign up at github.com if you don't
have one).

### Step 1 — Create a new repository
1. Go to [github.com](https://github.com) and log in.
2. Click the **+** icon (top right) → **New repository**.
3. Name it something like `girlfriends-day` (any name works).
4. Set it to **Public**.
5. Do **not** check "Add a README" — you already have one.
6. Click **Create repository**.

### Step 2 — Upload your files
1. On your new (empty) repository page, click **uploading an existing file**.
2. Drag and drop the **entire contents** of this project folder —
   `index.html`, `style.css`, `script.js`, `README.md`, and the whole
   `assets` folder — into the upload box.
   - Tip: drag the *contents* of the folder in, not the folder itself, so
     `index.html` ends up at the top level of the repo.
3. Scroll down, add a commit message like `first upload`, and click
   **Commit changes**.

### Step 3 — Turn on GitHub Pages
1. In your repository, click **Settings** (top menu).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **main** and folder **/ (root)**, then click
   **Save**.
5. Wait about 1–2 minutes. Refresh the page — GitHub will show a green box
   with your live link, something like:

   ```
   https://your-username.github.io/girlfriends-day/
   ```

### Step 4 — Share it
Open that link on your phone to test it first (tap the envelope, scroll
through, try the gifts). Once you're happy, send the link to her. 💗

---

## 3. Making changes later

Any time you want to tweak text, photos, or colors:
1. Go to your repository on GitHub.
2. Click the file you want to change (e.g. `index.html`).
3. Click the pencil icon (✏️ Edit) top right.
4. Make your edit, scroll down, click **Commit changes**.
5. GitHub Pages auto-updates the live site within a minute or two — no
   extra steps needed.

---

## 4. What's inside

```
index.html   → all page markup (envelope, letter, gifts, final page, secret ending)
style.css    → all visual design, colors, animations
script.js    → all interactivity (counter, games, easter eggs, music player)
assets/
  images/    → your photos go here
  music/     → your background song goes here
  icons/     → optional, not required (icons are drawn in code)
  flowers/   → optional, not required (bouquet uses emoji flowers)
  fonts/     → optional, not required (fonts load from Google Fonts)
```

## 5. Easter eggs to know about

- Tap the teddy bear 7 times → he blushes.
- Type the word `babluuu` anywhere on the site → heart rain.
- Tap the relationship counter card → expands to show hours/minutes/seconds.
- Tap the gift box before opening it → a playful "patience" message.
- Complete the letter, memories, bouquet, and pizza sections → a glowing
  **"One Last Surprise"** button appears on the final page.

Happy Girlfriend's Day. 🌸
