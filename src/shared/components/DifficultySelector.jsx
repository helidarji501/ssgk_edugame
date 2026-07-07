import useGameStore, { useSettings } from '../store/useGameStore.js';

const LEVELS = [
  { value: 1, label: 'Easy', emoji: '🟢' },
  { value: 2, label: 'Medium', emoji: '🟡' },
  { value: 3, label: 'Hard', emoji: '🔴' },
];

export default function DifficultySelector() {
  const settings = useSettings();
  const setDifficulty = useGameStore((s) => s.setDifficulty);

  return (
    <div className="flex items-center justify-center gap-3 font-body">
      {LEVELS.map(({ value, label }) => {
        const active = settings.difficulty === value;
        return (
          <button
            key={value}
            onClick={() => setDifficulty(value)}
            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
              active
                ? 'bg-navy text-white shadow-xl shadow-navy/20 scale-105 border-2 border-pink/30'
                : 'bg-navy/5 text-navy border-2 border-transparent hover:border-pink/20 hover:bg-navy/10'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
