import { View, Text, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGameStore } from '../../store/gameStore';
import { levelContent } from '../../src/data/levels';
import { QuizEngine } from '../../src/engine/quizEngine';

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const { 
    currentStepIndex, 
    setCurrentStep, 
    isReviewMode, 
    mistakeIndices,
    addMistake,
    addXP,
    loseHeart,
    hearts
  } = useGameStore();

  const [showOutofHearts, setShowOutofHearts] = useState(false);

  const levelId = Number(id);
  const level = levelContent.find((l) => l.id === levelId);
  
  if (!level) return <Text>Level not found</Text>;

  const getStep = () => {
    if (isReviewMode) {
      const mistakeArray = Array.from(mistakeIndices);
      const actualIndex = mistakeArray[currentStepIndex];
      return { step: level.steps[actualIndex], originalIndex: actualIndex };
    }
    return { step: level.steps[currentStepIndex], originalIndex: currentStepIndex };
  };

  const { step: currentStep, originalIndex } = getStep();
  const totalSteps = isReviewMode ? mistakeIndices.length : level.steps.length;

  if (!currentStep) return <Text>Step not found</Text>;

  const handleCorrect = (isFirstAttempt: boolean, answer: string) => {
    if (isFirstAttempt && !isReviewMode) {
      addXP(10);
    } else if (!isFirstAttempt && !isReviewMode) {
      addMistake(originalIndex);
    }

    setTimeout(() => {
      if (currentStepIndex + 1 < totalSteps) {
        setCurrentStep(currentStepIndex + 1);
        router.replace(`/lesson/${levelId}`);
      } else {
        if (isReviewMode) {
           addXP(20); 
           router.navigate('/(tabs)/map');
        } else {
           router.replace(`/summary/${levelId}`);
        }
      }
    }, 1500); 
  };

  const handleIncorrect = (answer: string) => {
    loseHeart();
    const currentHearts = useGameStore.getState().hearts;
    if (currentHearts <= 0) {
      setShowOutofHearts(true);
    }
  };

  if (showOutofHearts) {
    return (
      <View className="flex-1 bg-slate-50 items-center justify-center p-6">
        <Text className="text-6xl mb-6">💔</Text>
        <Text className="text-3xl font-bold text-slate-800 mb-3 text-center">Out of Hearts!</Text>
        <Text className="text-slate-500 text-lg text-center mb-10 max-w-sm leading-relaxed">
          You made too many mistakes and ran out of hearts. Refill them on the map to continue learning.
        </Text>
        <Pressable 
          onPress={() => router.navigate('/(tabs)/map')}
          className="px-8 py-4 bg-blue-600 rounded-xl shadow-sm w-full max-w-xs items-center"
        >
          <Text className="text-white font-bold text-lg">Back to Map</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView 
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="max-w-3xl mx-auto w-full px-6 py-12 flex-1">
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

        <QuizEngine 
          step={currentStep} 
          onCorrect={handleCorrect} 
          onIncorrect={handleIncorrect} 
        />
      </View>
    </ScrollView>
  );
}
