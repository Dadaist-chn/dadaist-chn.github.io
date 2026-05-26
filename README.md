# Personal Website — Yinda Xu / 徐寅达

A single-page bilingual (English / 中文) personal site, modern dark theme, deployable to GitHub Pages with zero build step.

## Local preview

Just open `index.html` in a browser. Or, with Python installed:

```powershell
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages (user homepage)

1. Create a new GitHub repository named **`<your-username>.github.io`** (the name must match your username exactly).
2. In a terminal in this `personal-website/` folder:

   ```powershell
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```

3. On GitHub, go to **Settings → Pages**. Source should auto-detect as **Deploy from a branch · main · /(root)**. Save.
4. Wait ~30 seconds — your site is live at `https://<your-username>.github.io`.

The `.nojekyll` file is included so GitHub Pages serves the files as-is (no Jekyll processing). No build, no CI needed.

## Structure

```
personal-website/
├── index.html          # All content (EN + ZH via data-* attributes)
├── css/style.css       # Dark theme, responsive
├── js/script.js        # Language toggle, scroll reveal, copy-phone
├── assets/
│   ├── photo.jpg
│   ├── CV_Yinda_Xu_EN.pdf
│   └── CV_XuYinda_CN.pdf
├── .nojekyll
└── README.md
```

## How the language toggle works

Every translatable element carries both `data-en` and `data-zh` attributes. The toggle in the top-right swaps `textContent` accordingly and saves the choice in `localStorage`. The CV download button also has `data-en-href` / `data-zh-href` to switch between the EN and CN PDF.

To add a new translatable string:

```html
<p data-en="Hello"
   data-zh="你好"></p>
```

Leave the inner text empty — JS fills it on load.

## Updating content

- **Add a publication:** copy a `<li>` block in the `Publications` section, set `pub-accepted` or `pub-review` status, fill `data-en` / `data-zh` on the meta span.
- **Add a project card:** copy any `.card` in the `Research & Projects` section. Use `.card-feature` for full-width spotlight cards.
- **Update the CV PDFs:** drop new files into `assets/` with the same filenames.
- **Change colors:** see the `:root` block at the top of `css/style.css`.

## Optional: custom domain

If you own a domain, add a `CNAME` file (one line containing the domain) and point a DNS CNAME record at `<your-username>.github.io`.
