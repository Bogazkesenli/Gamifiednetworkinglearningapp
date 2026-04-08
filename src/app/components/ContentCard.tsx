interface ContentCardProps {
  title: string;
  content: string;
  currentStep: number;
  totalSteps: number;
  onContinue: () => void;
  onBack: () => void;
}

export function ContentCard({
  title,
  content,
  currentStep,
  totalSteps,
  onContinue,
  onBack,
}: ContentCardProps) {
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
          <h2 className="mb-6" style={{ color: 'var(--primary)' }}>
            {title}
          </h2>
          <div className="text-foreground leading-relaxed whitespace-pre-line mb-8">
            {content}
          </div>

          <button
            onClick={onContinue}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground shadow-md hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
