import { LEVELS } from "../data/levels";

type Props = {
  currentLevelId: number | null;
  unlockedLevelId: number;
  onSelect: (levelId: number) => void;
};

export default function LevelSelector({ currentLevelId, unlockedLevelId, onSelect }: Props) {
  return (
    <div className="level-selector">
      <h1 className="title">LCM Explorer</h1>
      <div className="levels">
        {LEVELS.map((lvl) => {
          const locked = lvl.id > unlockedLevelId;
          const isCurrent = lvl.id === currentLevelId;
          return (
            <button
              key={lvl.id}
              className={`level-btn ${locked ? "locked" : ""} ${isCurrent ? "current" : ""}`}
              onClick={() => !locked && onSelect(lvl.id)}
              disabled={locked}
            >
              <span>{lvl.name}</span>
              <small>{lvl.numbers[0]} & {lvl.numbers[1]}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
}

