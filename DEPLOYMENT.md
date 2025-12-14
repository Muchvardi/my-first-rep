# How to Deploy

You have two main options to host this application: **Vercel** (Recommended) or **GitHub Pages**.

## Option 1: Vercel (Recommended)
Vercel is the easiest way to deploy React/Vite applications.

1.  Push your code to GitHub.
2.  Go to [Vercel.com](https://vercel.com) and sign up/login with GitHub.
3.  Click **"Add New..."** > **"Project"**.
4.  Import your GitHub repository.
5.  Vercel will detect it's a Vite project automatically.
6.  Click **Deploy**.

That's it! Your app will be live and updated automatically when you push to GitHub.

---

## Option 2: GitHub Pages
If you prefer to stay on GitHub, follow these steps.

### 1. Update `vite.config.js`
Open `vite.config.js` and set the `base` property to your repository name.

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/<YOUR_REPO_NAME>/', // e.g., '/project-flow/'
})
```

### 2. Deployment
You can deploy manually or automatically.

**Automatic (using GitHub Actions):**
1. Ensure your `.github/workflows/deploy.yml` is present.
2. Push your changes to `main`.
3. Go to Repo Settings > Pages > Select `gh-pages` branch.

**Manual:**
Run this command in your terminal:

```bash
npm run deploy
```
