/**
 * avatarConfig.js
 *
 * Central registry for all avatars. Each entry stores:
 *   id          – unique number (1-8)
 *   name        – display label
 *   unlockStars – total stars required (0 = free)
 *   emoji       – quick fallback
 */

const AVATAR_CONFIG = [
  { id: 1, name: 'Warrior',    unlockStars: 0,    emoji: '⚔️'  },
  { id: 2, name: 'Dancer',     unlockStars: 0,    emoji: '💃'  },
  { id: 3, name: 'Cricketer',  unlockStars: 0,    emoji: '🏏'  },
  { id: 4, name: 'Scientist',  unlockStars: 50,   emoji: '🔬'  },
  { id: 5, name: 'Chess Pro',  unlockStars: 150,  emoji: '♟️'  },
  { id: 6, name: 'Astronaut',  unlockStars: 300,  emoji: '🚀'  },
  { id: 7, name: 'Farmer',     unlockStars: 500,  emoji: '🌾'  },
  { id: 8, name: 'Teacher',    unlockStars: 1000, emoji: '📚'  },
];

export default AVATAR_CONFIG;
