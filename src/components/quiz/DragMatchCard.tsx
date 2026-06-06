import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LessonStep } from '../../data/levels';

interface DragMatchCardProps {
  step: LessonStep;
  onCorrect: (isFirstAttempt: boolean, answer: string) => void;
  onIncorrect: (answer: string) => void;
}

export function DragMatchCard({ step, onCorrect, onIncorrect }: DragMatchCardProps) {
  const [leftItems, setLeftItems] = useState<{ id: string; text: string }[]>([]);
  const [rightItems, setRightItems] = useState<{ id: string; text: string; matchId: string }[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFeedbackCorrect, setIsFeedbackCorrect] = useState(false);

  useEffect(() => {
    if (step.matchPairs) {
      setLeftItems(step.matchPairs.map(p => ({ id: p.leftId, text: p.leftText })));
      const right = step.matchPairs.map(p => ({ id: p.rightId, text: p.rightText, matchId: p.leftId }));
      setRightItems(right.sort(() => Math.random() - 0.5));
    }
  }, [step]);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const rightObj = rightItems.find(r => r.id === selectedRight);
      if (rightObj?.matchId === selectedLeft) {
        setMatchedPairs(prev => new Set(prev).add(selectedLeft));
        setSelectedLeft(null);
        setSelectedRight(null);
        setIsFeedbackCorrect(true);
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 800);
      } else {
        setWrongAttempts(prev => prev + 1);
        onIncorrect("wrong_match");
        setIsFeedbackCorrect(false);
        setShowFeedback(true);
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setShowFeedback(false);
        }, 800);
      }
    }
  }, [selectedLeft, selectedRight]);

  useEffect(() => {
    if (matchedPairs.size > 0 && matchedPairs.size === leftItems.length && !isCorrect) {
      setIsCorrect(true);
      setShowFeedback(true);
      setIsFeedbackCorrect(true);
      onCorrect(wrongAttempts === 0, "matched_all");
    }
  }, [matchedPairs, leftItems.length]);

  return (
    <View className="bg-white rounded-3xl shadow-sm p-6 border border-slate-100 flex-1">
      <Text className="text-xl text-slate-500 mb-2 font-medium">Tap to Match</Text>
      <Text className="text-2xl font-bold text-slate-800 mb-6">{step.question}</Text>

      <View className="flex-row justify-between w-full mb-6 gap-4">
        {/* Left Column */}
        <View className="flex-1 gap-3">
          {leftItems.map(item => {
            const isMatched = matchedPairs.has(item.id);
            const isSelected = selectedLeft === item.id;
            
            return (
              <Pressable
                key={`left-${item.id}`}
                onPress={() => !isMatched && setSelectedLeft(isSelected ? null : item.id)}
                disabled={isMatched}
                className={`py-4 px-3 rounded-xl border-2 items-center justify-center min-h-[80px] ${
                  isMatched ? 'bg-slate-100 border-slate-200 opacity-50' :
                  isSelected ? 'bg-blue-100 border-blue-400' : 'bg-white border-slate-200'
                }`}
              >
                <Text className="font-medium text-slate-700 text-center">{item.text}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Right Column */}
        <View className="flex-1 gap-3">
          {rightItems.map(item => {
            const isMatched = matchedPairs.has(item.matchId);
            const isSelected = selectedRight === item.id;

            return (
              <Pressable
                key={`right-${item.id}`}
                onPress={() => !isMatched && setSelectedRight(isSelected ? null : item.id)}
                disabled={isMatched}
                className={`py-4 px-3 rounded-xl border-2 items-center justify-center min-h-[80px] ${
                  isMatched ? 'bg-slate-100 border-slate-200 opacity-50' :
                  isSelected ? 'bg-blue-100 border-blue-400' : 'bg-white border-slate-200'
                }`}
              >
                <Text className="font-medium text-slate-700 text-center">{item.text}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {showFeedback && (
        <View className={`mt-2 self-center px-8 py-4 rounded-full shadow-sm ${
          isFeedbackCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
        }`}>
          <Text className={`font-bold text-lg ${isFeedbackCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? "✓ All matched! Excellent." : isFeedbackCorrect ? "✓ Match!" : "✗ Incorrect Match."}
          </Text>
        </View>
      )}
    </View>
  );
}
