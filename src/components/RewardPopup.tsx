import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  visible: boolean;
  stars: number; // 1..3
  onClose: () => void;
  mode?: "level" | "complete";
};

export default function RewardPopup({ visible, stars, onClose, mode = "level" }: Props) {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const onResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={220} recycle={false} />
          <motion.div
            className="reward-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="reward-card"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h2>{mode === "complete" ? "You finished all levels!" : "Great job!"}</h2>
              <div className="stars">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className={`star ${i < stars ? "filled" : ""}`}>⭐</span>
                ))}
              </div>
              <button className="primary" onClick={onClose}>{mode === "complete" ? "Back to Home" : "Next Level ▶"}</button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

