# 11th Group: Gamified Networking Learning App (NetPath)

### Team Members
- **Elif Sedef** – 21091019
- **Emirhan Duru** – 22091018
- **Umut Ercan** - 22091021
- **Öykü Boğazkesenli** - 22091002
- **Sami Fathi Karaveli** - 22091032

**Repository:** [github.com/Bogazkesenli/Gamifiednetworkinglearningapp](https://github.com/Bogazkesenli/Gamifiednetworkinglearningapp)

---

Welcome to **NetPath**, a mobile-first learning application designed to teach Computer Networking fundamentals through interactive, gamified micro-lessons.

Built entirely with modern **React Native** tooling (Expo, NativeWind, Zustand), NetPath transforms dry technical concepts into engaging, bite-sized challenges.

![NetPath Demo Placeholder](https://via.placeholder.com/800x400?text=NetPath+App)

## 🎯 Features

- **Gamified Progression**: Learn through an interactive Map, unlocking new concepts level by level.
- **Dynamic Question Types**: Includes Multiple Choice, Drag & Drop (Sorting), Tap-to-Match, and Fill-in-the-Blanks.
- **Economy System**: Earn XP by answering correctly, and spend it in the Shop to refill your Hearts.
- **Energy Regeneration**: Hearts automatically regenerate over time when you are offline.
- **Review Mode**: A customized lesson that forces you to correct past mistakes before moving on.
- **Secure Local Auth**: Cryptographically hashed (SHA-256) local account registry using Expo Crypto.

## 🛠 Tech Stack

- **Framework**: React Native (Expo Router)
- **State Management**: Zustand (Persisted)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Icons**: Lucide React Native
- **Storage**: AsyncStorage

## 🚀 Getting Started

To run this project locally, you will need [Node.js](https://nodejs.org/) and [Expo CLI](https://expo.dev/) installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npx expo start
```

### 3. Run on Device or Emulator
- Press `i` to open the iOS Simulator.
- Press `a` to open the Android Emulator.
- Or, scan the QR code with the **Expo Go** app on your physical device.

## 📁 Project Structure

- `app/`: Expo Router screens and navigation (`_layout.tsx`, `index.tsx`, `shop.tsx`, etc.)
- `src/`: Reusable UI components, quiz engine, and static level data (`levels.ts`).
- `store/`: Zustand state management for game logic (`gameStore.ts`) and authentication (`authStore.ts`).
- `assets/`: Images and fonts.

## 📝 License

This project is open-source and available under the MIT License.
