import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LessonStep } from '../../data/levels';

interface MCQCardProps {
  step: LessonStep;
  onCorrect: (isFirstAttempt: boolean, optionId: string) => void;
  onIncorrect: (optionId: string) => void;
}

export function MCQCard({ step, onCorrect, onIncorrect }: MCQCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set());
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    if (isCorrect) return;

    const option = step.options?.find((opt) => opt.id === optionId);
    if (!option) return;

    setSelectedOption(optionId);
    setShowFeedback(true);

    if (option.isCorrect) {
      setIsCorrect(true);
      const isFirstAttempt = wrongAttempts.size === 0;
      onCorrect(isFirstAttempt, optionId);
    } else {
      setWrongAttempts((prev) => new Set(prev).add(optionId));
      onIncorrect(optionId);
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedOption(null);
      }, 800);
    }
  };

  return (
    <View className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100 flex-1 relative">
      <Text className="text-xl text-slate-500 mb-2 font-medium">Multiple Choice</Text>
      <Text className="text-2xl font-bold text-slate-800 mb-6">{step.question}</Text>

      <View className="gap-3">
        {step.options?.map((option) => {
          const isSelected = selectedOption === option.id;
          const showCorrect = isSelected && showFeedback && isCorrect;
          const showIncorrect = isSelected && showFeedback && !isCorrect;

          let btnClass = "bg-slate-50 border-slate-200";
          let textClass = "text-slate-700";

          if (showCorrect) {
            btnClass = "bg-green-500 border-green-600";
            textClass = "text-white";
          } else if (showIncorrect) {
            btnClass = "bg-red-500 border-red-600";
            textClass = "text-white";
          }

          return (
            <Pressable
              key={option.id}
              onPress={() => handleOptionSelect(option.id)}
              disabled={isCorrect}
              className={`w-full px-6 py-5 rounded-xl border-2 transition-all ${btnClass} ${isCorrect ? 'opacity-90' : ''}`}
            >
              <Text className={`font-medium text-lg ${textClass}`}>{option.text}</Text>
            </Pressable>
          );
        })}
      </View>

      {showFeedback && (
        <View className={`mt-8 self-center px-8 py-4 rounded-full shadow-sm ${
          isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
        }`}>
          <Text className={`font-bold text-lg ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? "✓ Correct! Good job." : "✗ Try Again"}
          </Text>
        </View>
      )}
    </View>
  );
}
