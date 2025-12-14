# How to Deploy to GitHub Pages

To host this application on GitHub Pages for free, follow these steps:

## 1. Create a GitHub Repository
1. Go to [GitHub.com](https://github.com) and create a new repository (e.g., named `project-flow`).
2. Do not initialize it with a README, .gitignore, or license (the project already has them).

## 2. Update `package.json`
Open `package.json` in your code editor and find the `"homepage"` field near the top.
Update it to match your GitHub username and repository name:

```json
"homepage": "https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>",
```

*Example:* If your username is `george` and repo is `project-flow`, it should be `"https://george.github.io/project-flow"`.

## 3. Push your code to GitHub
Run the following commands in your terminal (inside the project folder):

```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git branch -M main
git push -u origin main
```

## 4. Deploy the App
Once the code is on GitHub, run this command to deploy:

```bash
npm run deploy
```

This script will:
1. Build the React application.
2. Push the build files to a `gh-pages` branch on your repository.

## 5. Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** > **Pages**.
3. Under **Build and deployment** > **Branch**, ensure `gh-pages` is selected (it should happen automatically).
4. Wait a few minutes, and your app will be live at the link you configured in `homepage`!
