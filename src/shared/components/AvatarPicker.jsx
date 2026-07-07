import useGameStore, { usePlayer } from '../store/useGameStore.js';
import AVATAR_CONFIG from '../utils/avatarConfig.js';
import Avatar from './Avatar.jsx';

/**
 * AvatarPicker
 *
 * Grid of all 8 avatars. Locked avatars show a 🔒 overlay + star requirement.
 * Selected avatar gets a saffron ring.
 */
export default function AvatarPicker() {
  const player = usePlayer();
  const setAvatarId = useGameStore((s) => s.setAvatarId);

  return (
    <div className="grid grid-cols-4 gap-4 sm:gap-6 font-body">
      {AVATAR_CONFIG.map((avatar) => {
        const isUnlocked = player.totalStars >= avatar.unlockStars;
        const isSelected = player.avatarId === avatar.id;

        return (
          <button
            key={avatar.id}
            disabled={!isUnlocked}
            onClick={() => isUnlocked && setAvatarId(avatar.id)}
            className={`
              relative flex flex-col items-center gap-3 p-4 rounded-3xl transition-all duration-300
              ${isSelected
                ? 'ring-4 ring-pink/20 bg-pink/5 scale-105 border-2 border-pink/40'
                : isUnlocked
                  ? 'bg-navy/5 hover:bg-navy/10 hover:scale-105 cursor-pointer border-2 border-transparent'
                  : 'bg-navy/[0.02] opacity-40 cursor-not-allowed border-2 border-dashed border-navy/10'
              }
            `}
          >
            {/* Avatar SVG */}
            <div className="relative group">
              <Avatar avatarId={avatar.id} size="lg" />

              {/* Lock overlay */}
              {!isUnlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-navy/80 backdrop-blur-sm">
                  <span className="text-xl">🔒</span>
                </div>
              )}
            </div>

            {/* Name */}
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-pink' : 'text-navy/60'}`}>
              {avatar.name}
            </span>

            {/* Star requirement for locked avatars */}
            {!isUnlocked && (
              <span className="text-[10px] text-pink font-bold flex items-center gap-1">
                ⭐ {avatar.unlockStars}
              </span>
            )}

            {/* Selected checkmark */}
            {isSelected && (
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pink flex items-center justify-center shadow-lg shadow-pink/30">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
