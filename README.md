# 🍅 Pomodoro Timer

A beautiful, modern web-based Pomodoro timer to boost your productivity and help you focus better with time-blocked work sessions and breaks.

![Pomodoro Timer](https://img.shields.io/badge/Status-Ready%20for%20Production-brightgreen)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.0.4-purple)

## ✨ Features

- **Timer Functionality**: Start, pause, and reset timer with ease
- **Multiple Session Types**: 
  - Pomodoro sessions (25 minutes default)
  - Short breaks (5 minutes default)
  - Long breaks (15 minutes default)
- **Smart Auto-Transitions**: Automatically switches between work and break sessions
- **Session Tracking**: Displays completed Pomodoro sessions count for the day
- **Customizable Durations**: Adjust timer durations to fit your workflow
- **Audio & Visual Notifications**: Get notified when sessions complete
- **Beautiful Progress Ring**: Visual progress indicator with smooth animations
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Clean, distraction-free interface with glassmorphism design

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd pomotodo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎯 How to Use

1. **Choose Your Session**: Click on "Pomodoro", "Short Break", or "Long Break" tabs
2. **Start the Timer**: Click the "▶️ Start" button to begin your session
3. **Stay Focused**: Work during Pomodoro sessions, relax during breaks
4. **Automatic Flow**: The app automatically transitions between sessions
5. **Track Progress**: See your completed Pomodoro count for the day
6. **Customize Settings**: Click the ⚙️ gear icon to adjust timer durations

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.4
- **Styling**: CSS3 with modern features (backdrop-filter, gradients)
- **Icons**: Emoji-based for universal compatibility
- **Notifications**: Web Notifications API + Web Audio API

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 94+
- Safari 15.4+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design Features

- **Glassmorphism UI**: Modern frosted glass effect
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: CSS transitions and transforms
- **Responsive Layout**: Mobile-first design approach
- **Accessibility**: Proper focus states and semantic HTML

## 🔧 Customization

The timer durations can be customized through the settings panel:
- Pomodoro: 1-60 minutes
- Short Break: 1-30 minutes  
- Long Break: 1-60 minutes

## 📦 Deployment

This app is ready for deployment on:
- **Vercel**: `npm run build` then deploy the `dist` folder
- **Netlify**: Connect your repository for automatic deployments
- **GitHub Pages**: Use the built files from the `dist` directory
- **Any static hosting service**

### Vercel Deployment (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the Pomodoro Technique® by Francesco Cirillo
- Built with modern web technologies for optimal performance
- Designed with productivity and user experience in mind

---

**Happy focusing! 🍅✨**
