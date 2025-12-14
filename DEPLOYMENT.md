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

### 1. Configuration (Already Done!)
The `vite.config.js` is already configured with `base: './'`, so it works automatically on any path.

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
