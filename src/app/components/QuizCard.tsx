import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizCardProps {
  question: string;
  options: QuizOption[];
  currentStep: number;
  totalSteps: number;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
  onBack: () => void;
}

export function QuizCard({
  question,
  options,
  currentStep,
  totalSteps,
  onCorrectAnswer,
  onWrongAnswer,
  onBack,
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set());
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    const option = options.find((opt) => opt.id === optionId);
    if (!option || isCorrect) return;

    setSelectedOption(optionId);
    setShowFeedback(true);

    if (option.isCorrect) {
      setIsCorrect(true);
      if (wrongAttempts.size > 0) {
        onWrongAnswer();
      }
      setTimeout(() => {
        onCorrectAnswer();
      }, 1500);
    } else {
      setWrongAttempts((prev) => new Set(prev).add(optionId));
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedOption(null);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="mb-8 px-6 py-2 rounded-xl bg-secondary text-secondary-foreground hover:opacity-80 transition-opacity"
        >
          ← Back to Map
        </button>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Progress: {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-card rounded-3xl shadow-lg p-8 border border-border">
          <h3 className="mb-6 text-foreground">{question}</h3>

          <div className="space-y-3">
            {options.map((option) => {
              const isSelected = selectedOption === option.id;
              const showCorrect = isSelected && showFeedback && isCorrect;
              const showIncorrect = isSelected && showFeedback && !isCorrect;

              return (
                <motion.button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={isCorrect}
                  whileHover={!isCorrect ? { scale: 1.02 } : {}}
                  whileTap={!isCorrect ? { scale: 0.98 } : {}}
                  className={`w-full px-6 py-4 rounded-xl text-left transition-all ${
                    showCorrect
                      ? "bg-success text-success-foreground"
                      : showIncorrect
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                  } ${isCorrect ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {option.text}
                </motion.button>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-xl shadow-2xl ${
                isCorrect
                  ? "bg-success text-success-foreground"
                  : "bg-destructive text-destructive-foreground"
              }`}
            >
              {isCorrect ? "✓ Correct!" : "✗ Try Again"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
