import { motion } from "framer-motion";

type Props = {
  base: number;
  multiples: number[];
  highlight?: number | null;
  selected?: number | null;
  disabled?: boolean;
  onSelect?: (value: number) => void;
  label: string;
};

export default function NumberStrip({ base, multiples, highlight, selected, disabled, onSelect, label }: Props) {
  return (
    <div className="number-strip">
      <div className="strip-header">
        <span className="chip">{label}</span>
        <span className="base">× {base}</span>
      </div>
      <div className="strip-grid">
        {multiples.map((m) => (
          <motion.button
            key={m}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            className={`tile ${highlight === m ? "highlight" : ""} ${selected === m ? "selected" : ""}`}
            disabled={disabled}
            onClick={() => onSelect?.(m)}
          >
            {m}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

