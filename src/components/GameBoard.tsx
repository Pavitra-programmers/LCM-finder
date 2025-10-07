import { useEffect, useMemo, useState } from "react";
import NumberStrip from "./NumberStrip";
import ResultBox from "./ResultBox";
import { lcm as calcLcm } from "../utils/lcm";

type Props = {
  a: number;
  b: number;
  onWin: (stars: number) => void;
};

export default function GameBoard({ a, b, onWin }: Props) {
  const lcmTarget = useMemo(() => calcLcm(a, b), [a, b]);
  const [selectedA, setSelectedA] = useState<number | null>(null);
  const [selectedB, setSelectedB] = useState<number | null>(null);
  const [foundAt, setFoundAt] = useState<number | null>(null);

  const TABLE_LEN = 12;
  const multiplesA = useMemo(() => Array.from({ length: TABLE_LEN }, (_, i) => a * (i + 1)), [a]);
  const multiplesB = useMemo(() => Array.from({ length: TABLE_LEN }, (_, i) => b * (i + 1)), [b]);

  // Reset selections when the level numbers change
  useEffect(() => {
    setSelectedA(null);
    setSelectedB(null);
    setFoundAt(null);
  }, [a, b]);

  function handleSelectA(value: number) {
    if (foundAt != null) return;
    setSelectedA((prev) => (prev === value ? null : value));
    // If both selections match and equal LCM, win
    const nextA = selectedA === value ? null : value;
    if (nextA != null && selectedB != null && nextA === selectedB && nextA === lcmTarget) {
      setFoundAt(nextA);
      onWin(3);
    }
  }

  function handleSelectB(value: number) {
    if (foundAt != null) return;
    setSelectedB((prev) => (prev === value ? null : value));
    const nextB = selectedB === value ? null : value;
    if (selectedA != null && nextB != null && selectedA === nextB && nextB === lcmTarget) {
      setFoundAt(nextB);
      onWin(3);
    }
  }

  return (
    <div className="game-board">
      <div className="numbers-row">
        <div className="big-number">{a}</div>
        <div className="and">and</div>
        <div className="big-number">{b}</div>
      </div>
      <div className="multiples-area two-rows">
        <NumberStrip
          base={a}
          multiples={multiplesA}
          highlight={foundAt}
          selected={selectedA}
          disabled={foundAt != null}
          onSelect={handleSelectA}
          label={`Table of ${a}`}
        />
        <NumberStrip
          base={b}
          multiples={multiplesB}
          highlight={foundAt}
          selected={selectedB}
          disabled={foundAt != null}
          onSelect={handleSelectB}
          label={`Table of ${b}`}
        />
      </div>
      <ResultBox lcmValue={foundAt} a={a} b={b} />
    </div>
  );
}

