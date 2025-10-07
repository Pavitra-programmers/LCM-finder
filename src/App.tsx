import { useMemo, useState } from "react";
import "./App.css";
import LevelSelector from "./components/LevelSelector";
import GameBoard from "./components/GameBoard";
import RewardPopup from "./components/RewardPopup";
import { LEVELS } from "./data/levels";

function App() {
  const [currentLevelId, setCurrentLevelId] = useState<number | null>(null);
  const [unlockedLevelId, setUnlockedLevelId] = useState<number>(1);
  const [pendingStars, setPendingStars] = useState<number | null>(null);
  const [gameComplete, setGameComplete] = useState<boolean>(false);

  const currentLevel = useMemo(
    () => LEVELS.find((l) => l.id === currentLevelId) ?? null,
    [currentLevelId]
  );

  function onStartLevel(levelId: number) {
    setCurrentLevelId(levelId);
    setPendingStars(null);
  }

  function onWinLevel(stars: number) {
    if (pendingStars == null) setPendingStars(stars);
  }

  function onNextLevel() {
    if (currentLevelId == null) return;
    const nextId = Math.min(currentLevelId + 1, LEVELS.length);
    setUnlockedLevelId((u) => Math.max(u, currentLevelId + 1));
    if (nextId > LEVELS.length) {
      // Completed last level
      setGameComplete(true);
      setCurrentLevelId(null);
    } else {
      setCurrentLevelId(nextId);
    }
    setPendingStars(null);
  }

  const isFinalLevel = currentLevelId != null && currentLevelId === LEVELS.length;

  function onClosePopup() {
    if (isFinalLevel) {
      setGameComplete(true);
      setCurrentLevelId(null);
      setPendingStars(null);
    } else {
      onNextLevel();
    }
  }

  return (
    <div className="app">
      {!currentLevel && (
        <LevelSelector
          currentLevelId={currentLevelId}
          unlockedLevelId={unlockedLevelId}
          onSelect={onStartLevel}
        />
      )}

      {currentLevel && (
        <div className="screen">
          <div className="header">
            <button className="secondary" onClick={() => setCurrentLevelId(null)}>◀ Home</button>
            <h2>{currentLevel.name}</h2>
          </div>
          <GameBoard
            key={`level-${currentLevel.id}`}
            a={currentLevel.numbers[0]}
            b={currentLevel.numbers[1]}
            onWin={onWinLevel}
          />
        </div>
      )}

      <RewardPopup
        visible={pendingStars != null}
        stars={pendingStars ?? 0}
        onClose={onClosePopup}
        mode={isFinalLevel || gameComplete ? "complete" : "level"}
      />
    </div>
  );
}

export default App;
