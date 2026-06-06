import { LessonStep } from '../data/levels';
import { MCQCard } from '../components/quiz/MCQCard';
import { FillBlankCard } from '../components/quiz/FillBlankCard';
import { SortScenarioCard } from '../components/quiz/SortScenarioCard';
import { DragMatchCard } from '../components/quiz/DragMatchCard';

interface QuizEngineProps {
  step: LessonStep;
  onCorrect: (isFirstAttempt: boolean, answer: string) => void;
  onIncorrect: (answer: string) => void;
}

export function QuizEngine({ step, onCorrect, onIncorrect }: QuizEngineProps) {
  switch (step.questionType) {
    case 'mcq':
      return <MCQCard step={step} onCorrect={onCorrect} onIncorrect={onIncorrect} />;
    case 'fillBlank':
      return <FillBlankCard step={step} onCorrect={onCorrect} onIncorrect={onIncorrect} />;
    case 'sortScenario':
      return <SortScenarioCard step={step} onCorrect={onCorrect} onIncorrect={onIncorrect} />;
    case 'dragMatch':
      return <DragMatchCard step={step} onCorrect={onCorrect} onIncorrect={onIncorrect} />;
    default:
      return <MCQCard step={step} onCorrect={onCorrect} onIncorrect={onIncorrect} />;
  }
}
