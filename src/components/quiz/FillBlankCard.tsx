import { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LessonStep } from '../../data/levels';

interface FillBlankCardProps {
  step: LessonStep;
  onCorrect: (isFirstAttempt: boolean, answer: string) => void;
  onIncorrect: (answer: string) => void;
}

export function FillBlankCard({ step, onCorrect, onIncorrect }: FillBlankCardProps) {
  const [input, setInput] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = () => {
    if (isCorrect || !input.trim()) return;

    setShowFeedback(true);
    const correctAnswers = step.correctAnswers?.map(a => a.toLowerCase()) || [];
    
    if (correctAnswers.includes(input.trim().toLowerCase())) {
      setIsCorrect(true);
      const isFirstAttempt = wrongAttempts === 0;
      onCorrect(isFirstAttempt, input);
    } else {
      setWrongAttempts(prev => prev + 1);
      onIncorrect(input);
      setTimeout(() => {
        setShowFeedback(false);
      }, 800);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100 flex-1 relative">
      <Text className="text-xl text-slate-500 mb-2 font-medium">Fill in the Blank</Text>
      <Text className="text-2xl font-bold text-slate-800 mb-6 leading-relaxed">
        {step.question}
      </Text>

      <TextInput
        value={input}
        onChangeText={(text) => {
          setInput(text);
          setShowFeedback(false);
        }}
        placeholder="Type your answer here..."
        className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 text-lg text-slate-800 bg-slate-50 mb-6"
        autoCapitalize="none"
        editable={!isCorrect}
        onSubmitEditing={handleSubmit}
      />

      <Pressable
        onPress={handleSubmit}
        disabled={isCorrect || !input.trim()}
        className={`w-full py-4 rounded-xl items-center shadow-sm ${
          isCorrect ? 'bg-green-500' : (input.trim() ? 'bg-blue-600' : 'bg-slate-300')
        }`}
      >
        <Text className="text-white font-semibold text-lg">Check Answer</Text>
      </Pressable>

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
