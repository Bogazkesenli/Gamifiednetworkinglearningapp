import { Lock } from "lucide-react";

interface Level {
  id: number;
  title: string;
  isUnlocked: boolean;
}

interface LearningMapProps {
  levels: Level[];
  onSelectLevel: (levelId: number) => void;
  currentLevel: number;
}

export function LearningMap({ levels, onSelectLevel, currentLevel }: LearningMapProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-2" style={{ color: 'var(--primary)' }}>
            NetPath
          </h1>
          <p className="text-muted-foreground">Your Learning Journey</p>
        </div>

        <div className="relative">
          {/* Curved path SVG */}
          <svg
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <path
              d={generateCurvedPath(levels.length)}
              stroke="var(--border)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Level nodes */}
          <div className="relative space-y-24 py-8" style={{ zIndex: 1 }}>
            {levels.map((level, index) => {
              const position = getLevelPosition(index, levels.length);
              return (
                <div
                  key={level.id}
                  className="flex items-center"
                  style={{
                    justifyContent: position === "left" ? "flex-start" : position === "right" ? "flex-end" : "center",
                  }}
                >
                  <button
                    onClick={() => level.isUnlocked && onSelectLevel(level.id)}
                    disabled={!level.isUnlocked}
                    className={`relative flex items-center justify-center w-24 h-24 rounded-full shadow-lg transition-all ${
                      level.isUnlocked
                        ? "bg-primary text-primary-foreground hover:scale-105 cursor-pointer"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {level.isUnlocked ? (
                      <div className="text-center">
                        <div className="text-2xl">{level.id}</div>
                      </div>
                    ) : (
                      <Lock size={32} />
                    )}
                  </button>
                  <div
                    className={`ml-4 ${position === "right" ? "order-first mr-4 ml-0 text-right" : ""}`}
                  >
                    <p className={level.isUnlocked ? "text-foreground" : "text-muted-foreground"}>
                      Level {level.id}
                    </p>
                    <p className="text-sm text-muted-foreground">{level.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function getLevelPosition(index: number, total: number): "left" | "right" | "center" {
  const pattern = ["center", "right", "left", "right", "left"];
  return pattern[index % pattern.length] as "left" | "right" | "center";
}

function generateCurvedPath(levelCount: number): string {
  let path = "M 50% 40";
  const spacing = 192;

  for (let i = 1; i < levelCount; i++) {
    const y = 40 + i * spacing;
    const position = getLevelPosition(i, levelCount);

    let x = "50%";
    if (position === "left") x = "30%";
    if (position === "right") x = "70%";

    const prevY = 40 + (i - 1) * spacing;
    const controlY = prevY + spacing / 2;

    path += ` Q 50% ${controlY}, ${x} ${y}`;
  }

  return path;
}
