# Portfolio Website

This is a personal portfolio website built with React and deployed on GitHub Pages.

## 🚀 Live Demo
🔗 [View Portfolio](https://Hks30.github.io/portfolio/)

## 📌 Features
- Interactive portfolio showcasing projects
- Smooth navigation using React Router
- Animated transitions using Framer Motion
- Deployed on GitHub Pages

## 🛠️ Technologies Used
- **React** (Frontend framework)
- **React Router** (Navigation)
- **Styled Components** (CSS-in-JS for styling)
- **Framer Motion** (Animations)
- **Three.js** (3D elements)

## 📂 Project Structure
```
portfolio/
│-- public/
│   ├── index.html
│-- src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│-- package.json
│-- README.md
```

## 📦 Installation & Setup
To run the project locally:
```sh
# Clone the repository
git clone https://github.com/Hks30/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm start
```

## 🚀 Deployment to GitHub Pages
This project is deployed using GitHub Pages.

### Deployment Steps:
1. Ensure `gh-pages` is installed:
   ```sh
   npm install gh-pages --save-dev
   ```
2. Add the following scripts in `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
3. Deploy the project:
   ```sh
   npm run deploy
   ```

## 🔥 Issues & Fixes
### **React Router Not Working on GitHub Pages?**
- **Fix:** Use `HashRouter` instead of `BrowserRouter` in `index.js`:
  ```js
  import { HashRouter } from 'react-router-dom';
  ```
