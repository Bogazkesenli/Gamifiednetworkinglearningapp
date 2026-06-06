import { View, Text, ScrollView, Pressable } from 'react-native';
import { Lock } from 'lucide-react-native';
import { useGameStore } from '../../store/gameStore';
import { mockLevels } from '../../src/data/levels';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MapScreen() {
  const unlockedLevels = useGameStore((state) => state.unlockedLevels);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const levels = mockLevels.map((level) => ({
    ...level,
    isUnlocked: unlockedLevels.includes(level.id),
  }));

  const getOffset = (index: number) => {
    const pattern = [0, -60, 0, 60];
    return pattern[index % pattern.length];
  };

  return (
    <ScrollView 
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      <View className="items-center py-12 px-4">
        <Text className="text-4xl font-bold text-blue-600 mb-2">NetPath</Text>
        <Text className="text-slate-500 mb-12 text-base font-medium">Your Learning Journey</Text>

        <View className="w-full relative items-center pb-20">
          <View className="absolute top-10 bottom-10 w-4 bg-slate-200 rounded-full" />

          {levels.map((level, index) => {
            const offsetX = getOffset(index);
            const isUnlocked = level.isUnlocked;

            return (
              <View 
                key={level.id} 
                className="items-center justify-center mb-10 w-full"
              >
                <View 
                  style={{ transform: [{ translateX: offsetX }] }}
                  className={`px-5 py-2.5 rounded-2xl shadow-sm border mb-4 ${
                    isUnlocked ? 'bg-white border-blue-100' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <Text className={`font-bold text-center ${isUnlocked ? 'text-blue-600' : 'text-slate-400'}`}>
                    Level {level.id}
                  </Text>
                  <Text className="text-slate-500 text-xs text-center">{level.title}</Text>
                </View>

                <Pressable
                  disabled={!isUnlocked}
                  onPress={() => {
                    useGameStore.getState().startLevel(level.id);
                    router.push(`/lesson/${level.id}`);
                  }}
                  style={{ transform: [{ translateX: offsetX }] }}
                  className={`w-28 h-28 rounded-full items-center justify-center shadow-lg border-8 border-white ${
                    isUnlocked ? 'bg-blue-500 active:bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  {isUnlocked ? (
                    <Text className="text-white text-4xl font-black">{level.id}</Text>
                  ) : (
                    <Lock color="#94a3b8" size={36} />
                  )}
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
