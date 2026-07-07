import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* ─── 1. Player Slice ─── */
const playerSlice = (set) => ({
  player: {
    playerName: '',
    avatarId: null,
    totalStars: 0,
    gamesPlayed: 0,
  },
  setPlayerName: (name) =>
    set((s) => ({ player: { ...s.player, playerName: name } })),
  setAvatarId: (id) =>
    set((s) => ({ player: { ...s.player, avatarId: id } })),
  addStars: (n) =>
    set((s) => ({ player: { ...s.player, totalStars: s.player.totalStars + n } })),
  incrementGamesPlayed: () =>
    set((s) => ({ player: { ...s.player, gamesPlayed: s.player.gamesPlayed + 1 } })),
});

/* ─── 2. Settings Slice ─── */
const settingsSlice = (set) => ({
  settings: {
    topic: 'multiplication',
    difficulty: 1,
    questionCount: 20,
    soundEnabled: true,
  },
  setTopic: (t) =>
    set((s) => ({ settings: { ...s.settings, topic: t } })),
  setDifficulty: (d) =>
    set((s) => ({ settings: { ...s.settings, difficulty: d } })),
  setQuestionCount: (n) =>
    set((s) => ({ settings: { ...s.settings, questionCount: n } })),
  toggleSound: () =>
    set((s) => ({ settings: { ...s.settings, soundEnabled: !s.settings.soundEnabled } })),
});

/* ─── 3. Session Slice (NOT persisted) ─── */
const sessionSlice = (set) => ({
  session: {
    currentGame: null,
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    startTime: null,
  },
  startSession: (gameName) =>
    set(() => ({
      session: {
        currentGame: gameName,
        score: 0,
        correctCount: 0,
        wrongCount: 0,
        startTime: Date.now(),
      },
    })),
  recordCorrect: () =>
    set((s) => ({
      session: { ...s.session, correctCount: s.session.correctCount + 1 },
    })),
  recordWrong: () =>
    set((s) => ({
      session: { ...s.session, wrongCount: s.session.wrongCount + 1 },
    })),
  addScore: (n) =>
    set((s) => ({
      session: { ...s.session, score: s.session.score + n },
    })),
  endSession: () =>
    set(() => ({
      session: {
        currentGame: null,
        score: 0,
        correctCount: 0,
        wrongCount: 0,
        startTime: null,
      },
    })),
});

/* ─── 4. Leaderboard Slice ─── */
const leaderboardSlice = (set) => ({
  leaderboard: {
    entries: [],
  },
  addEntry: (entry) =>
    set((s) => ({
      leaderboard: {
        entries: [...s.leaderboard.entries, entry].sort((a, b) => b.score - a.score),
      },
    })),
  clearLeaderboard: () =>
    set(() => ({ leaderboard: { entries: [] } })),
});

/* ─── Combined Store ─── */
const useGameStore = create(
  persist(
    (set, get, api) => ({
      ...playerSlice(set, get, api),
      ...settingsSlice(set, get, api),
      ...sessionSlice(set, get, api),
      ...leaderboardSlice(set, get, api),
    }),
    {
      name: 'mathquest-storage',
      // Only persist player, settings, and leaderboard — NOT session
      partialize: (state) => ({
        player: state.player,
        settings: state.settings,
        leaderboard: state.leaderboard,
      }),
    }
  )
);

/* ─── Named Selectors ─── */
export const usePlayer = () => useGameStore((s) => s.player);
export const useSettings = () => useGameStore((s) => s.settings);
export const useSession = () => useGameStore((s) => s.session);
export const useLeaderboard = () => useGameStore((s) => s.leaderboard);

export default useGameStore;
