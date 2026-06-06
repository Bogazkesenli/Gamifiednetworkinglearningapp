import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LessonStep } from '../../data/levels';

interface SortScenarioCardProps {
  step: LessonStep;
  onCorrect: (isFirstAttempt: boolean, answer: string) => void;
  onIncorrect: (answer: string) => void;
}

export function SortScenarioCard({ step, onCorrect, onIncorrect }: SortScenarioCardProps) {
  const [data, setData] = useState<{ id: string; text: string }[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (step.sortItems) {
      const shuffled = [...step.sortItems].sort(() => Math.random() - 0.5);
      setData(shuffled);
    }
  }, [step]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newData = [...data];
    const temp = newData[index - 1];
    newData[index - 1] = newData[index];
    newData[index] = temp;
    setData(newData);
    setShowFeedback(false);
  };

  const moveDown = (index: number) => {
    if (index === data.length - 1) return;
    const newData = [...data];
    const temp = newData[index + 1];
    newData[index + 1] = newData[index];
    newData[index] = temp;
    setData(newData);
    setShowFeedback(false);
  };

  const handleSubmit = () => {
    if (isCorrect) return;
    setShowFeedback(true);
    
    const isOrderCorrect = data.every((item, index) => item.id === step.sortItems![index].id);
    
    if (isOrderCorrect) {
      setIsCorrect(true);
      onCorrect(wrongAttempts === 0, "sorted");
    } else {
      setWrongAttempts(prev => prev + 1);
      onIncorrect("wrong_sort");
      setTimeout(() => setShowFeedback(false), 1500);
    }
  };

  return (
    <View className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100 flex-1">
      <Text className="text-xl text-slate-500 mb-2 font-medium">Order the Items</Text>
      <Text className="text-2xl font-bold text-slate-800 mb-6">{step.question}</Text>

      <View className="mb-6 gap-3">
        {data.map((item, index) => (
          <View 
            key={item.id}
            className="flex-row items-center px-4 py-3 rounded-xl border-2 bg-white border-slate-200 shadow-sm"
          >
            <View className="flex-1 mr-4">
              <Text className="text-lg font-medium text-slate-700">{item.text}</Text>
            </View>
            <View className="flex-row gap-2">
              <Pressable 
                onPress={() => moveUp(index)}
                disabled={index === 0 || isCorrect}
                className={`w-12 h-12 rounded-lg items-center justify-center ${
                  index === 0 || isCorrect ? 'bg-slate-100' : 'bg-blue-100 active:bg-blue-200'
                }`}
              >
                <Text className={`text-2xl font-bold ${index === 0 || isCorrect ? 'text-slate-300' : 'text-blue-600'}`}>↑</Text>
              </Pressable>
              <Pressable 
                onPress={() => moveDown(index)}
                disabled={index === data.length - 1 || isCorrect}
                className={`w-12 h-12 rounded-lg items-center justify-center ${
                  index === data.length - 1 || isCorrect ? 'bg-slate-100' : 'bg-blue-100 active:bg-blue-200'
                }`}
              >
                <Text className={`text-2xl font-bold ${index === data.length - 1 || isCorrect ? 'text-slate-300' : 'text-blue-600'}`}>↓</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      <Pressable
        onPress={handleSubmit}
        disabled={isCorrect}
        className={`w-full py-4 rounded-xl items-center shadow-sm mt-auto ${
          isCorrect ? 'bg-green-500' : 'bg-blue-600'
        }`}
      >
        <Text className="text-white font-semibold text-lg">Check Order</Text>
      </Pressable>

      {showFeedback && (
        <View className={`mt-6 self-center px-8 py-4 rounded-full shadow-sm ${
          isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
        }`}>
          <Text className={`font-bold text-lg text-center ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? "✓ Correct! Good job." : "✗ Incorrect Order. Try Again."}
          </Text>
        </View>
      )}
    </View>
  );
}
