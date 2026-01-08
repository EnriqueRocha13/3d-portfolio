# 🎨 3D Portfolio

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC? style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three. js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

> An interactive 3D portfolio with stunning animations featuring a crystal cube interface and automatic language detection.

## 🌐 Live Demo

🔗 **GitHub Pages:** [https://EnriqueRocha13.github.io/3d-portfolio](https://EnriqueRocha13.github.io/3d-portfolio)

## ✨ Features

- 🎭 **Interactive 3D Crystal Cube** - Clickable glass-effect cube with hover animations
- ⚡ **Optimized Performance** with Vite and React Three Fiber
- 🎨 **Modern Glassmorphism Design** with blur effects and transparency
- 🌍 **Automatic Language Detection** - Detects browser language (English/Spanish)
- 🔧 **Built with TypeScript** for enhanced robustness and maintainability
- 🌊 **Animated 3D Background** for an immersive visual experience
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile devices
- 🎯 **Resume Panel** - Complete professional portfolio with show/hide functionality

## 🛠️ Tech Stack

- **React 19** - UI Library
- **TypeScript** - Static typing
- **Three.js** - 3D graphics engine
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **Vercel** - Primary deployment
- **GitHub Pages** - Alternative deployment

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
│   ├── BackgroundScene.tsx              # 3D background scene
│   ├── PanelWithAnimatedBackground.tsx  # Resume panel with 3D cube
│   ├── main.tsx        # Entry point
│   ├── App.css         # App styles
│   └── index.css       # Global styles
├── index.html          # Main HTML
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🎯 Main Components

### ShowButtonCube
A 3D crystal cube component with: 
- **Glass effect** using `meshPhysicalMaterial` with transmission
- **Hover animations** - Changes color randomly and scales up
- **Rotation animation** - Continuous spinning on X and Y axes
- **Floating effect** - Smooth up and down movement
- **Click interaction** - Opens the resume panel

### PanelWithAnimatedBackground
Main portfolio component featuring:
- **Automatic language detection** based on browser settings
- **Glassmorphism panel** with blur effects and semi-transparency
- **Complete resume** with skills, projects, experience, and education
- **Bilingual support** - English and Spanish translations
- **Smooth animations** - Panel show/hide with fade effects

### BackgroundScene
Animated 3D background providing:
- **Dynamic visual effects** to enhance the portfolio presentation
- **Performance optimized** animations

## 🌍 Language Support

The portfolio automatically detects the user's browser language: 
- **Spanish (ES)** - For browsers set to Spanish
- **English (EN)** - Default for all other languages

No manual language switcher needed - it adapts automatically!

## 🎨 Design Features

- **Crystal Cube Button**
  - Transmission:  1.0 (fully transparent)
  - Thickness: 1.5
  - Roughness: 0.05 (very smooth)
  - IOR: 1.5 (glass-like refraction)
  - Dynamic emissive color on hover

- **Resume Panel**
  - Semi-transparent white background (37% opacity)
  - 8px backdrop blur for glassmorphism effect
  - Custom styled scrollbar
  - Responsive width (680px max, 96vw on mobile)

## 🚀 Deployment

This project is deployed on multiple platforms: 

### Vercel (Primary)
The main production site is hosted on Vercel at [henrydeveloper.digital](https://www.henrydeveloper.digital/)

### GitHub Pages (Alternative)
You can also deploy to GitHub Pages using: 

```bash
npm run deploy
```

This command will build the project and deploy it to the `gh-pages` branch.

## 💡 Usage

1. **On Load**: The page displays the resume panel by default
2. **Close Panel**: Click the "Close ×" button in the top-right corner
3. **3D Cube Appears**: After closing, the animated crystal cube is revealed
4. **Hover Effect**: Move mouse over cube to see color changes and scaling
5. **Open Resume**: Click the cube to display the resume panel again
6. **Language**:  Automatically shown in your browser's language (EN/ES)

## 🎓 Skills Showcased

This portfolio demonstrates proficiency in:
- Modern React development with hooks
- 3D graphics programming with Three.js
- TypeScript type safety
- Responsive design
- UI/UX design principles
- Performance optimization
- Internationalization (i18n)
- State management
- Component architecture

## 📝 License

This project is open source and available for personal and educational use.

## 👨‍💻 Author

**Enrique Domínguez**
- GitHub: [@EnriqueRocha13](https://github.com/EnriqueRocha13)
- Portfolio: [henrydeveloper.digital](https://www.henrydeveloper.digital/)
- LinkedIn: [enrique-domínguez13](https://www.linkedin.com/in/enrique-domínguez13)
- Email:  Enriquedominguez1375@gmail.com

## 🙏 Acknowledgments

- **Three.js** - For the amazing 3D graphics library
- **React Three Fiber** - For making Three.js work seamlessly with React
- **Vite** - For the lightning-fast development experience

---

⭐️ If you liked this project, don't forget to give it a star! 
