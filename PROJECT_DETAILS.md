# Project Details: NetPath Gamified MVP

This document summarizes the technical decisions, architecture, and feature set of the NetPath Gamified Application.

## 1. Architecture Overview

The app is structured as a **React Native (Expo)** application with file-based routing provided by **Expo Router**. 
State management is handled globally by **Zustand**, which persists data across sessions using `@react-native-async-storage/async-storage`.

### Core Flow:
1. **Auth**: `app/auth.tsx` (Validates user, interacts with `authStore`, stores password hashes).
2. **Dashboard / Map**: `app/(tabs)/index.tsx` & `map.tsx` (Reads unlocked levels from `gameStore`, renders Map nodes).
3. **Lesson**: `app/lesson/[id].tsx` (Initializes level data).
4. **Quiz Engine**: `app/quiz/[id].tsx` (Iterates through steps, renders `MCQCard`, `FillBlankCard`, `SortScenarioCard`).
5. **Shop**: `app/(tabs)/shop.tsx` (Handles XP-to-Heart transactions).
6. **Summary**: `app/summary/[id].tsx` (Distributes rewards and unlocks next level).

## 2. Gamification Mechanics

- **XP System**: Users earn 10 XP per correct answer, and a bonus 20 XP for successfully reviewing mistakes.
- **Heart System (Lives)**: Users start with 5 Hearts. Answering incorrectly costs 1 Heart. 
- **Soft-Lock Prevention (Energy Regeneration)**: A background timer (implemented via `useHeartRegen` hook) automatically restores 1 Heart every minute, mimicking popular mobile games.
- **The Economy (Shop)**: Users can spend 50 XP to buy 1 Heart, or 200 XP for a full refill.
- **Spaced Repetition (Review Mode)**: If a user makes mistakes, they must complete a "Review Mistakes" session before advancing to the next map node.

## 3. Security

- Local authentication is managed via `authStore.ts`.
- Passwords are **never** stored in plain text.
- `expo-crypto` is utilized to generate a salted SHA-256 digest (using the normalized email as the salt) of the password before it is saved to the local registry.

## 4. Design Aesthetics

- Built entirely with **NativeWind** (Tailwind CSS for React Native).
- Color Palette: Professional slate grays (`slate-50` to `slate-800`), vibrant primary blues (`blue-600`), and semantic feedback colors (red for errors/hearts, green for success, yellow for XP).
- UI Components feature deep rounding (`rounded-2xl`, `rounded-3xl`), soft shadows (`shadow-sm`), and minimal borders.
- Responsive structures utilizing `ScrollView`, `flex-1`, and `SafeAreaView` concepts to adapt seamlessly to varying mobile device dimensions and orientations.
