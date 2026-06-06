import { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';

export const HEART_REGEN_TIME_MS = 60 * 1000; // 1 minute per heart for testing

export function useHeartRegen() {
  const hearts = useGameStore((state) => state.hearts);
  const maxHearts = useGameStore((state) => state.maxHearts);
  const lastHeartRefreshTime = useGameStore((state) => state.lastHeartRefreshTime);
  
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (hearts >= maxHearts) {
      setTimeRemaining(null);
      return;
    }

    // Immediate check on mount
    const checkRegen = () => {
      const currentTime = useGameStore.getState().lastHeartRefreshTime;
      if (!currentTime) {
        useGameStore.setState({ lastHeartRefreshTime: Date.now() });
        return;
      }
      
      const now = Date.now();
      
      // Mitigate time-travel backward exploit
      if (now < currentTime) {
        console.warn("Time anomaly detected (clock moved backward). Resetting timer.");
        useGameStore.setState({ lastHeartRefreshTime: now });
        return;
      }

      const timePassed = now - currentTime;
      
      if (timePassed >= HEART_REGEN_TIME_MS) {
        const heartsToAdd = Math.floor(timePassed / HEART_REGEN_TIME_MS);
        const currentHearts = useGameStore.getState().hearts;
        const newHearts = Math.min(maxHearts, currentHearts + heartsToAdd);
        
        useGameStore.setState({ 
          hearts: newHearts, 
          lastHeartRefreshTime: newHearts >= maxHearts ? null : currentTime + (heartsToAdd * HEART_REGEN_TIME_MS) 
        });
      } else {
        setTimeRemaining(HEART_REGEN_TIME_MS - timePassed);
      }
    };

    checkRegen(); // Run once immediately
    const interval = setInterval(checkRegen, 1000); // Check every second

    return () => clearInterval(interval);
  }, [hearts, maxHearts, lastHeartRefreshTime]);

  const formattedTime = timeRemaining !== null
    ? `${Math.floor(timeRemaining / 60000).toString().padStart(2, '0')}:${Math.floor((timeRemaining % 60000) / 1000).toString().padStart(2, '0')}`
    : null;

  return { timeRemaining, formattedTime };
}
