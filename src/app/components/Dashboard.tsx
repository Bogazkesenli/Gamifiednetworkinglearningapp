interface DashboardProps {
  userName: string;
  onStartLearning: () => void;
}

export function Dashboard({ userName, onStartLearning }: DashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-2" style={{ color: 'var(--primary)' }}>
            NetPath
          </h1>
          <p className="text-muted-foreground">Welcome back, {userName}!</p>
        </div>

        <div className="bg-card rounded-3xl shadow-lg p-12 border border-border text-center">
          <div className="mb-8">
            <h2 className="mb-4" style={{ color: 'var(--foreground)' }}>
              Ready to Learn?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Begin your journey through computer networking concepts. Complete
              levels sequentially to unlock new challenges.
            </p>
          </div>

          <button
            onClick={onStartLearning}
            className="px-12 py-4 rounded-xl bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}
