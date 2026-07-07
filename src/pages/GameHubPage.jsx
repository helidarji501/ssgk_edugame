import useGameStore, { useSettings } from '../shared/store/useGameStore.js';
import DifficultySelector from '../shared/components/DifficultySelector.jsx';
import GameCard from '../shared/components/GameCard.jsx';

const TOPICS = [
  { value: 'addition', label: 'Addition' },
  { value: 'subtraction', label: 'Subtraction' },
  { value: 'multiplication', label: 'Multiplication' },
  { value: 'division', label: 'Division' },
  { value: 'mixed', label: 'Mixed' },
];

const GAMES = [
  {
    title: 'Math Tug of War',
    description:
      'Race against your opponent to solve math equations and pull the rope to your side. Speed and accuracy take the trophy!',
    icon: '⚔️',
    route: '/tug-of-war',
  },
  {
    title: 'Math Zuma',
    description:
      'Shoot the correct answer at a moving chain of number-balls. Misses add penalties!',
    icon: '🐸',
    route: '/math-zuma',
  },
  {
    title: 'Knife Thrower',
    description:
      'Throw knives at the right target in a rapid-fire 60-second blitz. Keep the combo alive!',
    icon: '🔪',
    route: '/knife-thrower',
  },
];

export default function GameHubPage() {
  const settings = useSettings();
  const setTopic = useGameStore((s) => s.setTopic);

  return (
    <div className="min-h-screen bg-off-white font-body py-12 px-4 selection:bg-pink/30">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center animate-fade-rise">
          <div className="inline-block px-3 py-1 rounded-full bg-navy/5 text-navy text-xs font-bold tracking-widest uppercase mb-4 border border-navy/10">
            Game Menu
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-navy tracking-tighter mb-4">
            Pick Your <span className="text-pink underline decoration-pink/20 underline-offset-8">Challenge</span>
          </h1>
          <p className="text-navy/60 font-medium text-lg max-w-xl mx-auto">
            Three distinct arenas to test your speed, accuracy, and tactical thinking.
          </p>
        </header>

        {/* ─── Settings Bar ─── */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {/* Difficulty */}
          <DifficultySelector />

          {/* Topic Picker */}
          <div className="relative font-body">
            <select
              value={settings.topic}
              onChange={(e) => setTopic(e.target.value)}
              className="appearance-none bg-navy text-white text-sm font-bold uppercase tracking-widest rounded-full pl-8 pr-12 py-3.5 border-2 border-transparent focus:border-pink focus:outline-none transition-all cursor-pointer shadow-xl shadow-navy/20"
            >
              {TOPICS.map(({ value, label }) => (
                <option key={value} value={value} className="bg-navy text-white">
                  {label}
                </option>
              ))}
            </select>
            {/* Dropdown chevron */}
            <svg
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* ─── Game Cards ─── */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game) => (
            <GameCard
              key={game.route}
              title={game.title}
              description={game.description}
              icon={game.icon}
              route={game.route}
              difficulty={settings.difficulty}
              subject={settings.topic}
            />
          ))}
        </div>
      </div>
    </div>

  );
}
