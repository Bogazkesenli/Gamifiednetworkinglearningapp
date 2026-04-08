import { useState } from "react";
import { AuthScreen } from "./components/AuthScreen";
import { Dashboard } from "./components/Dashboard";
import { LearningMap } from "./components/LearningMap";
import { ContentCard } from "./components/ContentCard";
import { QuizCard } from "./components/QuizCard";
import { LevelSummary } from "./components/LevelSummary";

type Screen = "auth" | "dashboard" | "map" | "content" | "quiz" | "summary";

interface UserData {
  fullName: string;
  email: string;
}

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface LessonStep {
  title: string;
  content: string;
  question: string;
  options: QuizOption[];
}

interface Level {
  id: number;
  title: string;
  steps: LessonStep[];
}

const mockLevels = [
  { id: 1, title: "Introduction to Networks", isUnlocked: true },
  { id: 2, title: "Network Protocols", isUnlocked: false },
  { id: 3, title: "IP Addressing", isUnlocked: false },
  { id: 4, title: "Routing & Switching", isUnlocked: false },
  { id: 5, title: "Network Security", isUnlocked: false },
];

const levelContent: Level[] = [
  {
    id: 1,
    title: "Introduction to Networks",
    steps: [
      {
        title: "What is a Computer Network?",
        content: `A computer network is a collection of interconnected devices that can communicate and share resources with each other. Networks enable data transfer, resource sharing, and collaborative communication.

Networks can range from small home networks connecting a few devices to massive global networks like the Internet connecting billions of devices worldwide.

Key components of a network include:
• End devices (computers, phones, tablets)
• Networking devices (routers, switches)
• Transmission media (cables, wireless signals)
• Network protocols (rules for communication)`,
        question: "What is the primary purpose of a computer network?",
        options: [
          { id: "a", text: "To make computers run faster", isCorrect: false },
          { id: "b", text: "To enable devices to communicate and share resources", isCorrect: true },
          { id: "c", text: "To store data permanently", isCorrect: false },
          { id: "d", text: "To protect computers from viruses", isCorrect: false },
        ],
      },
      {
        title: "Network Types",
        content: `Networks are classified by their size and scope:

LAN (Local Area Network): Covers a small geographic area like a home, office, or building. Typically faster and more secure.

WAN (Wide Area Network): Spans large geographic areas, connecting multiple LANs. The Internet is the largest WAN.

MAN (Metropolitan Area Network): Covers a city or campus. Falls between LAN and WAN in scope.

PAN (Personal Area Network): Very small networks for personal devices within a few meters, like Bluetooth connections.`,
        question: "Which network type covers the largest geographic area?",
        options: [
          { id: "a", text: "LAN (Local Area Network)", isCorrect: false },
          { id: "b", text: "PAN (Personal Area Network)", isCorrect: false },
          { id: "c", text: "WAN (Wide Area Network)", isCorrect: true },
          { id: "d", text: "MAN (Metropolitan Area Network)", isCorrect: false },
        ],
      },
      {
        title: "Network Topologies",
        content: `Network topology refers to the arrangement of devices in a network:

Star Topology: All devices connect to a central hub or switch. Easy to manage but the hub is a single point of failure.

Bus Topology: All devices share a single communication line. Simple but can have performance issues.

Ring Topology: Devices form a circular data path. Data travels in one direction.

Mesh Topology: Every device connects to every other device. Very reliable but complex and expensive.`,
        question: "Which topology has all devices connected to a central hub?",
        options: [
          { id: "a", text: "Bus Topology", isCorrect: false },
          { id: "b", text: "Star Topology", isCorrect: true },
          { id: "c", text: "Ring Topology", isCorrect: false },
          { id: "d", text: "Mesh Topology", isCorrect: false },
        ],
      },
      {
        title: "Network Devices",
        content: `Common network devices include:

Router: Connects different networks together and directs data between them. Makes decisions about the best path for data.

Switch: Connects devices within a single network. More intelligent than a hub, sends data only to the intended recipient.

Hub: Simple device that broadcasts data to all connected devices. Largely replaced by switches.

Modem: Converts digital signals to analog (and vice versa) for transmission over phone lines or cable.`,
        question: "Which device connects different networks together?",
        options: [
          { id: "a", text: "Hub", isCorrect: false },
          { id: "b", text: "Switch", isCorrect: false },
          { id: "c", text: "Router", isCorrect: true },
          { id: "d", text: "Modem", isCorrect: false },
        ],
      },
      {
        title: "Data Transmission",
        content: `Data can be transmitted in different ways:

Simplex: Data flows in one direction only. Example: television broadcast, radio.

Half-Duplex: Data flows in both directions, but only one direction at a time. Example: walkie-talkies.

Full-Duplex: Data flows in both directions simultaneously. Example: telephone conversations, modern Ethernet.

Most modern networks use full-duplex transmission for maximum efficiency.`,
        question: "Which transmission mode allows data to flow in both directions simultaneously?",
        options: [
          { id: "a", text: "Simplex", isCorrect: false },
          { id: "b", text: "Half-Duplex", isCorrect: false },
          { id: "c", text: "Full-Duplex", isCorrect: true },
          { id: "d", text: "None of the above", isCorrect: false },
        ],
      },
    ],
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("auth");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [mistakeIndices, setMistakeIndices] = useState<Set<number>>(new Set());
  const [isReviewMode, setIsReviewMode] = useState(false);

  const handleAuth = (data: UserData) => {
    setUserData(data);
    setCurrentScreen("dashboard");
  };

  const handleStartLearning = () => {
    setCurrentScreen("map");
  };

  const handleSelectLevel = (levelId: number) => {
    const level = levelContent.find((l) => l.id === levelId);
    if (level) {
      setCurrentLevelId(levelId);
      setCurrentStepIndex(0);
      setMistakeIndices(new Set());
      setIsReviewMode(false);
      setCurrentScreen("content");
    }
  };

  const handleContinueToQuiz = () => {
    setCurrentScreen("quiz");
  };

  const handleCorrectAnswer = () => {
    const currentLevel = levelContent.find((l) => l.id === currentLevelId);
    if (!currentLevel) return;

    const totalSteps = isReviewMode
      ? mistakeIndices.size
      : currentLevel.steps.length;

    if (currentStepIndex + 1 < totalSteps) {
      setCurrentStepIndex(currentStepIndex + 1);
      setCurrentScreen("content");
    } else {
      if (isReviewMode) {
        setCurrentScreen("map");
      } else {
        setCurrentScreen("summary");
      }
    }
  };

  const handleWrongAnswer = () => {
    if (!isReviewMode) {
      setMistakeIndices((prev) => new Set(prev).add(currentStepIndex));
    }
  };

  const handleReviewMistakes = () => {
    setIsReviewMode(true);
    setCurrentStepIndex(0);
    setCurrentScreen("content");
  };

  const handleBackToMap = () => {
    const nextLevel = currentLevelId + 1;
    if (nextLevel <= mockLevels.length && !unlockedLevels.includes(nextLevel)) {
      setUnlockedLevels([...unlockedLevels, nextLevel]);
    }
    setCurrentScreen("map");
  };

  const handleBackFromLesson = () => {
    setCurrentScreen("map");
  };

  const levels = mockLevels.map((level) => ({
    ...level,
    isUnlocked: unlockedLevels.includes(level.id),
  }));

  const currentLevel = levelContent.find((l) => l.id === currentLevelId);

  const getCurrentStep = () => {
    if (!currentLevel) return null;

    if (isReviewMode) {
      const mistakeArray = Array.from(mistakeIndices);
      const actualIndex = mistakeArray[currentStepIndex];
      return currentLevel.steps[actualIndex];
    }

    return currentLevel.steps[currentStepIndex];
  };

  const currentStep = getCurrentStep();
  const totalSteps = isReviewMode
    ? mistakeIndices.size
    : currentLevel?.steps.length || 0;

  return (
    <div className="size-full">
      {currentScreen === "auth" && <AuthScreen onAuth={handleAuth} />}

      {currentScreen === "dashboard" && userData && (
        <Dashboard userName={userData.fullName} onStartLearning={handleStartLearning} />
      )}

      {currentScreen === "map" && (
        <LearningMap
          levels={levels}
          onSelectLevel={handleSelectLevel}
          currentLevel={currentLevelId}
        />
      )}

      {currentScreen === "content" && currentStep && (
        <ContentCard
          title={currentStep.title}
          content={currentStep.content}
          currentStep={currentStepIndex + 1}
          totalSteps={totalSteps}
          onContinue={handleContinueToQuiz}
          onBack={handleBackFromLesson}
        />
      )}

      {currentScreen === "quiz" && currentStep && (
        <QuizCard
          question={currentStep.question}
          options={currentStep.options}
          currentStep={currentStepIndex + 1}
          totalSteps={totalSteps}
          onCorrectAnswer={handleCorrectAnswer}
          onWrongAnswer={handleWrongAnswer}
          onBack={handleBackFromLesson}
        />
      )}

      {currentScreen === "summary" && currentLevel && (
        <LevelSummary
          levelId={currentLevelId}
          totalQuestions={currentLevel.steps.length}
          mistakeCount={mistakeIndices.size}
          onReviewMistakes={handleReviewMistakes}
          onBackToMap={handleBackToMap}
        />
      )}
    </div>
  );
}