import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGameStore } from '../../store/gameStore';
import { levelContent, mockLevels } from '../../src/data/levels';
import { useEffect, useRef } from 'react';

export default function SummaryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const { 
    mistakeIndices, 
    setReviewMode, 
    unlockLevel, 
    addXP 
  } = useGameStore();

  const levelId = Number(id);
  const level = levelContent.find((l) => l.id === levelId);
  const mistakeCount = mistakeIndices.length;
  const totalQuestions = level?.steps.length || 0;
  const correctCount = totalQuestions - mistakeCount;
  
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (!hasProcessed.current) {
      addXP(50);
      const nextLevelId = levelId + 1;
      if (nextLevelId <= mockLevels.length) {
        unlockLevel(nextLevelId);
      }
      hasProcessed.current = true;
    }
  }, [levelId, addXP, unlockLevel]);

  const handleReviewMistakes = () => {
    setReviewMode(true);
    router.replace(`/lesson/${levelId}`);
  };

  const handleBackToMap = () => {
    router.navigate('/(tabs)/map');
  };

  return (
    <View className="flex-1 bg-slate-50 items-center justify-center px-6">
      <View className="w-full max-w-sm bg-white rounded-3xl shadow-sm p-10 border border-slate-100 items-center">
        <Text className="text-6xl mb-6">🎉</Text>
        <Text className="text-3xl font-bold text-blue-600 mb-2">Level {levelId}</Text>
        <Text className="text-slate-500 text-center mb-8 text-lg">
          Great job completing this level!
        </Text>

        <View className="flex-row w-full justify-between gap-4 mb-8">
          <View className="flex-1 bg-green-50 rounded-2xl p-4 items-center border border-green-100">
            <Text className="text-4xl font-bold text-green-600 mb-1">{correctCount}</Text>
            <Text className="text-green-700 font-medium text-sm">Correct</Text>
          </View>
          <View className="flex-1 bg-red-50 rounded-2xl p-4 items-center border border-red-100">
            <Text className="text-4xl font-bold text-red-600 mb-1">{mistakeCount}</Text>
            <Text className="text-red-700 font-medium text-sm">Mistakes</Text>
          </View>
        </View>

        {mistakeCount > 0 ? (
          <View className="w-full gap-4">
            <Text className="text-slate-700 text-center mb-2 font-medium">
              Would you like to review the questions you got wrong?
            </Text>
            <Pressable
              onPress={handleReviewMistakes}
              className="w-full py-4 rounded-xl bg-blue-600 items-center shadow-sm"
            >
              <Text className="text-white font-semibold text-base">Yes, Review Mistakes</Text>
            </Pressable>
            <Pressable
              onPress={handleBackToMap}
              className="w-full py-4 rounded-xl bg-slate-100 items-center"
            >
              <Text className="text-slate-600 font-semibold text-base">No, Back to Map</Text>
            </Pressable>
          </View>
        ) : (
          <View className="w-full items-center gap-4">
            <Text className="text-slate-700 text-center mb-2 font-medium">Perfect score! 🌟</Text>
            <Pressable
              onPress={handleBackToMap}
              className="w-full py-4 rounded-xl bg-blue-600 items-center shadow-sm"
            >
              <Text className="text-white font-semibold text-base">Back to Map</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
