# 🎨 3D Portfolio

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

> Check out my experience with 3D animations - An interactive portfolio with stunning 3D animations.  

## 🌐 Live Demo

Visit the portfolio:   [https://EnriqueRocha13.github.io/3d-portfolio](https://EnriqueRocha13.github.io/3d-portfolio)

## ✨ Features

- 🎭 **Interactive 3D animations** using Three.js and React Three Fiber
- ⚡ **Optimized performance** with Vite
- 🎨 **Modern and responsive design**
- 🔧 **Built with TypeScript** for enhanced robustness and maintainability
- 🌊 **Animated background scenes** for a unique visual experience

## 🛠️ Tech Stack

- **React 19** - UI Library
- **TypeScript** - Static typing
- **Three.js** - 3D graphics engine
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **GitHub Pages** - Deployment

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EnriqueRocha13/3d-portfolio.git
   cd 3d-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser at** `http://localhost:5173`

## 🚀 Available Scripts

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

## 📁 Project Structure

```
3d-portfolio/
├── public/              # Static files
├── src/
│   ├── assets/         # Resources (images, 3D models, etc.)
│   ├── App.tsx         # Main component
│   ├── BackgroundScene.tsx          # 3D background scene
│   ├── PanelWithAnimatedBackground. tsx  # Panel with animations
│   ├── main. tsx        # Entry point
│   ├── App.css         # App styles
│   └── index.css       # Global styles
├── index.html          # Main HTML
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config. ts      # Vite configuration
```

## 🎯 Main Components

### BackgroundScene
Component that manages the 3D background scene with animations and visual effects. 

### PanelWithAnimatedBackground
Interactive panel that combines content with 3D animated backgrounds.

## 🚀 Deployment

The project is configured to automatically deploy to GitHub Pages:

```bash
npm run deploy
```

This command will build the project and deploy it to the `gh-pages` branch.

## 📝 License

This project is open source and available for personal and educational use.

## 👨‍💻 Author

**Enrique Rocha**
- GitHub: [@EnriqueRocha13](https://github.com/EnriqueRocha13)

---

⭐️ If you liked this project, don't forget to give it a star! 
