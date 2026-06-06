import { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGameStore } from '../../store/gameStore';
import { levelContent } from '../../src/data/levels';

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const { 
    currentLevelId, 
    setCurrentLevel, 
    currentStepIndex, 
    isReviewMode, 
    mistakeIndices 
  } = useGameStore();

  const levelId = Number(id);

  const level = levelContent.find((l) => l.id === levelId);
  if (!level) return <Text>Level not found</Text>;

  const getStep = () => {
    if (isReviewMode) {
      const mistakeArray = Array.from(mistakeIndices);
      const actualIndex = mistakeArray[currentStepIndex];
      return level.steps[actualIndex];
    }
    return level.steps[currentStepIndex];
  };

  const currentStep = getStep();
  const totalSteps = isReviewMode ? mistakeIndices.length : level.steps.length;

  if (!currentStep) return <Text>Step not found</Text>;

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="max-w-3xl mx-auto px-6 py-12">
        <Pressable
          onPress={() => router.navigate('/(tabs)/map')}
          className="mb-8 px-6 py-3 rounded-xl bg-slate-200 self-start"
        >
          <Text className="text-slate-700 font-medium">← Back to Map</Text>
        </Pressable>

        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-sm text-slate-500 font-medium">
              Progress: {currentStepIndex + 1} of {totalSteps}
            </Text>
          </View>
          <View className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <View
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
            />
          </View>
        </View>

        <View className="bg-white rounded-3xl shadow-sm p-6 border border-slate-100">
          <Text className="text-3xl font-bold text-blue-600 mb-6">{currentStep.title}</Text>
          <Text className="text-slate-700 text-lg leading-relaxed mb-6">
            {currentStep.content}
          </Text>

          <Pressable
            onPress={() => router.push(`/quiz/${levelId}`)}
            className="w-full py-4 rounded-xl bg-blue-600 items-center shadow-sm"
          >
            <Text className="text-white font-semibold text-lg">Continue to Quiz</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
