import { motion, AnimatePresence } from "framer-motion";

type Props = {
  lcmValue: number | null;
  a: number;
  b: number;
};

export default function ResultBox({ lcmValue, a, b }: Props) {
  return (
    <div className="result-box">
      <AnimatePresence>
        {lcmValue != null && (
          <motion.div
            key={lcmValue}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="result-pill"
          >
            You found the LCM of {a} and {b} = {lcmValue}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

