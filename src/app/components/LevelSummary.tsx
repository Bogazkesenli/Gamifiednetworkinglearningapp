interface LevelSummaryProps {
  levelId: number;
  totalQuestions: number;
  mistakeCount: number;
  onReviewMistakes: () => void;
  onBackToMap: () => void;
}

export function LevelSummary({
  levelId,
  totalQuestions,
  mistakeCount,
  onReviewMistakes,
  onBackToMap,
}: LevelSummaryProps) {
  const correctCount = totalQuestions - mistakeCount;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-card rounded-3xl shadow-lg p-12 border border-border text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="mb-4" style={{ color: 'var(--primary)' }}>
              Level {levelId} Complete!
            </h2>
            <p className="text-muted-foreground mb-6">
              Great job completing this level!
            </p>

            <div className="flex justify-center gap-8 mb-8">
              <div className="bg-secondary rounded-2xl px-8 py-4">
                <div className="text-3xl mb-1" style={{ color: 'var(--success)' }}>
                  {correctCount}
                </div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="bg-secondary rounded-2xl px-8 py-4">
                <div className="text-3xl mb-1" style={{ color: 'var(--destructive)' }}>
                  {mistakeCount}
                </div>
                <div className="text-sm text-muted-foreground">Mistakes</div>
              </div>
            </div>
          </div>

          {mistakeCount > 0 ? (
            <>
              <p className="text-foreground mb-6">
                Would you like to review the questions you got wrong?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onBackToMap}
                  className="px-8 py-3.5 rounded-xl bg-secondary text-secondary-foreground hover:opacity-80 transition-opacity"
                >
                  No, Back to Map
                </button>
                <button
                  onClick={onReviewMistakes}
                  className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground shadow-md hover:opacity-90 transition-opacity"
                >
                  Yes, Review Mistakes
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-foreground mb-6">Perfect score! 🌟</p>
              <button
                onClick={onBackToMap}
                className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground shadow-md hover:opacity-90 transition-opacity"
              >
                Back to Map
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
