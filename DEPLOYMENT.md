# How to Deploy to GitHub Pages

To host this application on GitHub Pages, you can use the configured GitHub Actions workflow for automatic deployment.

## 1. Create a GitHub Repository
1. Go to [GitHub.com](https://github.com) and create a new repository (e.g., named `project-flow`).
2. Do not initialize it with a README, .gitignore, or license.

## 2. Update `package.json`
Open `package.json` and find the `"homepage"` field. Update it to match your GitHub URL:

```json
"homepage": "https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>",
```

## 3. Configure GitHub Actions Permissions
For the workflow to work, it needs permission to write to your repository.
1. Go to your repository on GitHub.
2. Click **Settings** > **Actions** > **General**.
3. Scroll down to **Workflow permissions**.
4. Select **Read and write permissions**.
5. Click **Save**.

## 4. Push your code
Push your code to the `main` branch. This will automatically trigger the deployment.

```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git branch -M main
git push -u origin main
```

## 5. Enable GitHub Pages
1. Go to your repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
3. Under **Branch**, select `gh-pages` and `/ (root)`.
4. Click **Save**.

Your app will be live in a few minutes!

## Manual Deployment (Optional)
If you prefer to deploy manually from your computer, you can still run:

```bash
npm run deploy
```
