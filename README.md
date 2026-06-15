# 🐱 Kitty Terminal Portfolio

An interactive, high-fidelity terminal emulator portfolio website designed exactly to match my custom personal Linux **Kitty Terminal** setup.

Built as a client-side frontend project using **React**, **TypeScript**, and **CSS Variables** to create a gamified, quest-driven terminal experience.

---

## 🎨 Visual & Design Specifications

- **Wallpaper**: Cosmic starry background with planet overlays and blurred space gradients.
- **Terminal Frame**: Rounded corners, thin sleek borders, semi-transparent purple-slate terminal body, and backdrop-blur styling.
- **Typography**: `JetBrains Mono` imported from Google Fonts.
- **Two-Line Shell Prompt**:
  - *Line 1*: `╭─ 󰊠 billa at ~` (left-aligned) and a live ticking clock `🕒 HH:MM` (right-aligned).
  - *Line 2*: `╰─> ` (followed by the typing cursor).
- **Pokemon Art**: Pixel art of Regirock rendered inside the terminal upon startup or command execution.

---

## 🛠️ Tech Stack

- **Core**: React 18+ (TypeScript)
- **Tooling**: Vite (Dev Server & Bundler)
- **Styling**: Pure CSS (Custom variables, CSS Grid/Flexbox, Keyframes for transitions and glitch animations)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/kitty-terminal-portfolio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd kitty-terminal-portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production Build

To compile TypeScript and bundle the assets into the `/dist` folder for hosting:
```bash
npm run build
```

---

## 🏆 Quest Progress

This project is built step-by-step through a series of learning quests:
- [x] **Quest 1: The Kitty Window** — Setup, CSS layout models, and environment theme styling.
- [ ] **Quest 2: Interactive Terminal Shell** — Custom inputs, state hooks, and keyboard event handlers.
- [ ] **Quest 3: Shell Commands & Logic** — Command routing, conditional styling, and projects layout.
- [ ] **Quest 4: Contact Form & Polish** — Progressive shell forms, responsive styling, and final adjustments.
