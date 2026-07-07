import { useEffect, useState } from 'react';

/**
 * ScoreModal
 *
 * Props:
 *  - isOpen       : boolean
 *  - score        : number
 *  - correctCount : number
 *  - wrongCount   : number
 *  - timeTaken    : number (seconds)
 *  - onPlayAgain  : () => void
 *  - onGoHome     : () => void
 */
export default function ScoreModal({
  isOpen,
  score,
  correctCount,
  wrongCount,
  timeTaken,
  onPlayAgain,
  onGoHome,
}) {
  const [visible, setVisible] = useState(false);

  // Animate entrance
  useEffect(() => {
    if (isOpen) {
      // Small delay so the CSS transition can kick in
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const total = correctCount + wrongCount;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  // Star rating: 1-3 based on accuracy
  let stars = 1;
  if (accuracy >= 80) stars = 3;
  else if (accuracy >= 50) stars = 2;

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          visible ? 'opacity-60' : 'opacity-0'
        }`}
      />

      {/* Modal card */}
      <div
        className={`relative w-[90%] max-w-sm rounded-[2.5rem] bg-navy border-2 border-pink/10 p-10 text-center shadow-2xl transition-all duration-500 font-body ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.9] translate-y-10'
        }`}
      >
        {/* Stars */}
        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className={`text-3xl transform transition-transform duration-500 ${i < stars ? 'scale-110' : 'opacity-20 '}`}>
              ⭐
            </span>
          ))}
        </div>

        <h2 className="text-2xl font-heading font-extrabold text-white tracking-widest uppercase mb-6">Match Complete</h2>

        {/* Score */}
        <div className="relative inline-block mb-1">
          <p className="text-7xl font-heading font-extrabold text-pink tracking-tight">{score}</p>
        </div>
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em] mb-10">Total Points Earned</p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-6 mb-10 border-y border-white/5 py-8">
          <Stat label="Correct" value={correctCount} color="text-white" />
          <Stat label="Accuracy" value={`${accuracy}%`} color="text-pink" />
          <Stat label="Time" value={formatTime(timeTaken)} color="text-white" />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <button
            onClick={onPlayAgain}
            className="w-full py-4 rounded-full bg-pink text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-navy hover:scale-105 active:scale-95 transition-all shadow-xl shadow-pink/20"
          >
            Play Again
          </button>
          <button
            onClick={onGoHome}
            className="w-full py-4 rounded-full bg-navy border-2 border-white/10 text-white/60 text-sm font-bold uppercase tracking-widest hover:border-pink/40 hover:text-white transition-all"
          >
            Leave Arena
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="flex flex-col items-center">
      <p className={`text-xl font-heading font-extrabold ${color} mb-1`}>{value}</p>
      <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
}
