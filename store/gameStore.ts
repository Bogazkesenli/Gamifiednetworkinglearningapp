import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// İleride data/levels.ts içine taşıyacağımız QuestionType yapısını buraya referans olarak koyalım.
// Şimdilik basit tutuyoruz, Faz 1.3 ve 1.4'te detaylandırılacak.
export interface UserState {
  user: { name: string; email: string } | null;
  xp: number;
  hearts: number;
  maxHearts: number;
  unlockedLevels: number[];
  currentLevelId: number | null;
  currentStepIndex: number;
  mistakeIndices: number[];
  isReviewMode: boolean;
  lastHeartRefreshTime: number | null;
}

interface GameActions {
  login: (name: string, email: string) => void;
  logout: () => void;
  addXP: (amount: number) => void;
  loseHeart: () => void;
  setCurrentLevel: (levelId: number) => void;
  startLevel: (levelId: number) => void;
  setCurrentStep: (stepIndex: number) => void;
  addMistake: (stepIndex: number) => void;
  clearMistakes: () => void;
  setReviewMode: (isReview: boolean) => void;
  unlockLevel: (levelId: number) => void;
  refreshHearts: () => void;
  buyHeart: (cost: number) => { success: boolean; error?: string };
  buyFullRefill: (cost: number) => { success: boolean; error?: string };
}

export const useGameStore = create<UserState & GameActions>()(
  persist(
    (set, get) => ({
      user: null,
      xp: 0,
      hearts: 5,
      maxHearts: 5,
      unlockedLevels: [1],
      currentLevelId: null,
      currentStepIndex: 0,
      mistakeIndices: [],
      isReviewMode: false,
      lastHeartRefreshTime: null,

      login: (name, email) => set({ user: { name, email } }),
      
      logout: () => set({ 
        user: null, xp: 0, hearts: 5, unlockedLevels: [1], 
        currentLevelId: null, currentStepIndex: 0, mistakeIndices: [], isReviewMode: false 
      }),
      
      addXP: (amount) => {
        if (amount > 0) set((state) => ({ xp: state.xp + amount }));
      },
      
      loseHeart: () => set((state) => {
        const newHearts = Math.max(0, state.hearts - 1);
        return { 
          hearts: newHearts,
          lastHeartRefreshTime: state.hearts === state.maxHearts ? Date.now() : state.lastHeartRefreshTime
        };
      }),
      
      setCurrentLevel: (levelId) => set({ currentLevelId: levelId, currentStepIndex: 0 }),
      
      startLevel: (levelId) => set({ 
        currentLevelId: levelId, 
        currentStepIndex: 0, 
        mistakeIndices: [], 
        isReviewMode: false 
      }),
      
      setCurrentStep: (stepIndex) => set({ currentStepIndex: stepIndex }),
      
      addMistake: (stepIndex) => set((state) => {
        if (!state.mistakeIndices.includes(stepIndex)) {
          return { mistakeIndices: [...state.mistakeIndices, stepIndex] };
        }
        return state;
      }),
      
      clearMistakes: () => set({ mistakeIndices: [] }),
      
      setReviewMode: (isReview) => set({ isReviewMode: isReview, currentStepIndex: 0 }),
      
      unlockLevel: (levelId) => set((state) => {
        if (!state.unlockedLevels.includes(levelId)) {
          return { unlockedLevels: [...state.unlockedLevels, levelId] };
        }
        return state;
      }),
      
      refreshHearts: () => set({ hearts: 5, lastHeartRefreshTime: Date.now() }),
      
      buyHeart: (cost) => {
        if (cost <= 0) return { success: false, error: "Geçersiz işlem." };
        const { xp, hearts, maxHearts, lastHeartRefreshTime } = get();
        if (hearts >= maxHearts) return { success: false, error: "Hearts are already full!" };
        if (xp < cost) return { success: false, error: "Not enough XP!" };
        
        const newHearts = hearts + 1;
        set({ 
          xp: xp - cost, 
          hearts: newHearts,
          lastHeartRefreshTime: newHearts >= maxHearts ? null : lastHeartRefreshTime
        });
        return { success: true };
      },

      buyFullRefill: (cost) => {
        if (cost <= 0) return { success: false, error: "Geçersiz işlem." };
        const { xp, hearts, maxHearts } = get();
        if (hearts >= maxHearts) return { success: false, error: "Hearts are already full!" };
        if (xp < cost) return { success: false, error: "Not enough XP!" };
        set({ xp: xp - cost, hearts: maxHearts, lastHeartRefreshTime: null });
        return { success: true };
      },
    }),
    {
      name: 'netpath-game-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
