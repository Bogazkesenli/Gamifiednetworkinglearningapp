import { Redirect } from 'expo-router';
import { useGameStore } from '../store/gameStore';

export default function Index() {
  const user = useGameStore((state) => state.user);

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/auth" />;
}
