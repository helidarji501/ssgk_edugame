import AVATAR_CONFIG from '../utils/avatarConfig.js';

const SIZES = { sm: 40, md: 64, lg: 96 };

// ── Indian-palette colours ──
const SAFFRON  = '#FF9933';
const WHITE_C  = '#FFFFFF';
const GREEN    = '#138808';
const NAVY     = '#0A0A2E';
const SKIN     = '#D4A574';
const SKIN_D   = '#C49464';
const BROWN    = '#5C3317';

/* ─────────────────────────────────────────────
   Individual SVG avatar renderers (48×48 viewBox)
   ───────────────────────────────────────────── */

function WarriorSvg() {
  return (
    <g>
      {/* Helmet */}
      <path d="M24 6 L30 16 L18 16 Z" fill={SAFFRON} />
      <circle cx="24" cy="20" r="8" fill={SKIN} />
      {/* Eyes */}
      <circle cx="21" cy="19" r="1.2" fill={NAVY} />
      <circle cx="27" cy="19" r="1.2" fill={NAVY} />
      {/* Moustache */}
      <path d="M20 23 Q24 26 28 23" fill="none" stroke={BROWN} strokeWidth="1" />
      {/* Body / armour */}
      <rect x="16" y="28" width="16" height="14" rx="3" fill={SAFFRON} />
      <rect x="20" y="28" width="8" height="14" rx="1" fill="#E07700" />
      {/* Sword */}
      <rect x="33" y="18" width="2" height="20" rx="1" fill="#C0C0C0" />
      <rect x="31" y="17" width="6" height="3" rx="1" fill={BROWN} />
      {/* Shield */}
      <circle cx="11" cy="34" r="5" fill={GREEN} stroke={WHITE_C} strokeWidth="1" />
    </g>
  );
}

function DancerSvg() {
  return (
    <g>
      {/* Hair bun */}
      <circle cx="24" cy="11" r="4" fill={BROWN} />
      <circle cx="24" cy="9" r="2" fill={SAFFRON} />
      {/* Head */}
      <circle cx="24" cy="18" r="8" fill={SKIN} />
      {/* Bindi */}
      <circle cx="24" cy="15" r="1" fill="red" />
      {/* Eyes */}
      <ellipse cx="21" cy="18" rx="1.2" ry="1" fill={NAVY} />
      <ellipse cx="27" cy="18" rx="1.2" ry="1" fill={NAVY} />
      {/* Smile */}
      <path d="M21 21 Q24 24 27 21" fill="none" stroke={BROWN} strokeWidth="0.8" />
      {/* Body / saree */}
      <path d="M16 26 Q24 24 32 26 L30 44 L18 44 Z" fill={GREEN} />
      <path d="M18 30 Q24 28 30 30 L29 44 L19 44 Z" fill={SAFFRON} />
      {/* Arms in dance pose */}
      <line x1="16" y1="28" x2="8" y2="20" stroke={SKIN} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="28" x2="40" y2="20" stroke={SKIN} strokeWidth="2.5" strokeLinecap="round" />
      {/* Anklets */}
      <circle cx="20" cy="44" r="2" fill="none" stroke={SAFFRON} strokeWidth="0.8" />
      <circle cx="28" cy="44" r="2" fill="none" stroke={SAFFRON} strokeWidth="0.8" />
    </g>
  );
}

function CricketerSvg() {
  return (
    <g>
      {/* Cap */}
      <ellipse cx="24" cy="12" rx="9" ry="4" fill="#1E40AF" />
      <rect x="15" y="10" width="18" height="4" rx="2" fill="#1E40AF" />
      {/* Head */}
      <circle cx="24" cy="19" r="7" fill={SKIN} />
      {/* Eyes */}
      <circle cx="21.5" cy="18" r="1" fill={NAVY} />
      <circle cx="26.5" cy="18" r="1" fill={NAVY} />
      {/* Grin */}
      <path d="M21 22 Q24 24.5 27 22" fill="none" stroke={BROWN} strokeWidth="0.8" />
      {/* Jersey */}
      <rect x="16" y="26" width="16" height="12" rx="3" fill="#1E40AF" />
      <text x="24" y="34" textAnchor="middle" fill={WHITE_C} fontSize="5" fontWeight="bold">IND</text>
      {/* Bat */}
      <rect x="34" y="16" width="3" height="18" rx="1.5" fill="#D4A040" />
      <rect x="33" y="34" width="5" height="6" rx="1" fill="#C49030" />
      {/* Pads */}
      <rect x="18" y="38" width="4" height="8" rx="1" fill={WHITE_C} />
      <rect x="26" y="38" width="4" height="8" rx="1" fill={WHITE_C} />
    </g>
  );
}

function ScientistSvg() {
  return (
    <g>
      {/* Hair */}
      <ellipse cx="24" cy="13" rx="9" ry="6" fill={BROWN} />
      {/* Head */}
      <circle cx="24" cy="19" r="7" fill={SKIN_D} />
      {/* Glasses */}
      <circle cx="21" cy="18" r="3" fill="none" stroke={NAVY} strokeWidth="1" />
      <circle cx="27" cy="18" r="3" fill="none" stroke={NAVY} strokeWidth="1" />
      <line x1="24" y1="18" x2="24" y2="18" stroke={NAVY} strokeWidth="1" />
      {/* Eyes behind glasses */}
      <circle cx="21" cy="18" r="1" fill={NAVY} />
      <circle cx="27" cy="18" r="1" fill={NAVY} />
      {/* Beard */}
      <path d="M18 22 Q24 28 30 22" fill={BROWN} opacity="0.6" />
      {/* Kurta */}
      <rect x="15" y="26" width="18" height="16" rx="3" fill={WHITE_C} />
      <line x1="24" y1="26" x2="24" y2="42" stroke={SAFFRON} strokeWidth="1" />
      {/* Scroll */}
      <rect x="34" y="28" width="8" height="10" rx="2" fill="#F5DEB3" />
      <text x="38" y="35" textAnchor="middle" fill={NAVY} fontSize="5">π</text>
    </g>
  );
}

function ChessProSvg() {
  return (
    <g>
      {/* Turban */}
      <path d="M15 16 Q24 4 33 16" fill={SAFFRON} />
      <ellipse cx="24" cy="16" rx="10" ry="4" fill={SAFFRON} />
      <circle cx="24" cy="10" r="2" fill={GREEN} />
      {/* Head */}
      <circle cx="24" cy="20" r="7" fill={SKIN} />
      {/* Eyes */}
      <circle cx="21.5" cy="19" r="1" fill={NAVY} />
      <circle cx="26.5" cy="19" r="1" fill={NAVY} />
      {/* Smile */}
      <path d="M22 23 Q24 25 26 23" fill="none" stroke={BROWN} strokeWidth="0.7" />
      {/* Body */}
      <rect x="16" y="27" width="16" height="14" rx="3" fill={NAVY} />
      {/* Chess piece (king) */}
      <rect x="8" y="30" width="6" height="10" rx="1" fill={WHITE_C} />
      <line x1="11" y1="28" x2="11" y2="31" stroke={WHITE_C} strokeWidth="1.5" />
      <line x1="9" y1="30" x2="13" y2="30" stroke={WHITE_C} strokeWidth="1.5" />
    </g>
  );
}

function AstronautSvg() {
  return (
    <g>
      {/* Helmet glass */}
      <circle cx="24" cy="18" r="10" fill="#A8D8EA" opacity="0.4" />
      <circle cx="24" cy="18" r="10" fill="none" stroke={WHITE_C} strokeWidth="1.5" />
      {/* Face */}
      <circle cx="24" cy="19" r="6" fill={SKIN} />
      {/* Eyes */}
      <circle cx="22" cy="18" r="1" fill={NAVY} />
      <circle cx="26" cy="18" r="1" fill={NAVY} />
      {/* Smile */}
      <path d="M22 22 Q24 23.5 26 22" fill="none" stroke={BROWN} strokeWidth="0.7" />
      {/* Suit */}
      <rect x="14" y="28" width="20" height="16" rx="4" fill={WHITE_C} />
      <rect x="20" y="30" width="8" height="5" rx="2" fill="#E0E0E0" />
      {/* Indian flag patch */}
      <rect x="30" y="30" width="6" height="1.5" fill={SAFFRON} />
      <rect x="30" y="31.5" width="6" height="1.5" fill={WHITE_C} />
      <rect x="30" y="33" width="6" height="1.5" fill={GREEN} />
      {/* Backpack */}
      <rect x="8" y="30" width="5" height="10" rx="2" fill="#B0B0B0" />
    </g>
  );
}

function FarmerSvg() {
  return (
    <g>
      {/* Hat */}
      <ellipse cx="24" cy="12" rx="12" ry="4" fill="#D4A040" />
      <ellipse cx="24" cy="10" rx="7" ry="5" fill="#C49030" />
      {/* Head */}
      <circle cx="24" cy="19" r="7" fill={SKIN_D} />
      {/* Eyes */}
      <circle cx="21.5" cy="18" r="1" fill={NAVY} />
      <circle cx="26.5" cy="18" r="1" fill={NAVY} />
      {/* Moustache */}
      <path d="M20 22 Q24 24 28 22" fill="none" stroke={BROWN} strokeWidth="1" />
      {/* Kurta */}
      <rect x="15" y="26" width="18" height="16" rx="3" fill={WHITE_C} />
      <rect x="15" y="26" width="18" height="4" rx="2" fill={GREEN} opacity="0.3" />
      {/* Hoe / tool */}
      <line x1="36" y1="14" x2="36" y2="42" stroke={BROWN} strokeWidth="2" strokeLinecap="round" />
      <path d="M32 14 L40 14 L38 18 L34 18 Z" fill="#808080" />
      {/* Wheat */}
      <line x1="10" y1="42" x2="10" y2="30" stroke={GREEN} strokeWidth="1.5" />
      <circle cx="10" cy="28" r="2" fill="#DAA520" />
    </g>
  );
}

function TeacherSvg() {
  return (
    <g>
      {/* Hair */}
      <ellipse cx="24" cy="13" rx="8" ry="5" fill={BROWN} />
      {/* Head */}
      <circle cx="24" cy="19" r="7" fill={SKIN} />
      {/* Bindi */}
      <circle cx="24" cy="15" r="0.8" fill="red" />
      {/* Glasses */}
      <circle cx="21" cy="19" r="2.5" fill="none" stroke={NAVY} strokeWidth="0.8" />
      <circle cx="27" cy="19" r="2.5" fill="none" stroke={NAVY} strokeWidth="0.8" />
      <line x1="23.5" y1="19" x2="24.5" y2="19" stroke={NAVY} strokeWidth="0.8" />
      {/* Eyes */}
      <circle cx="21" cy="19" r="0.8" fill={NAVY} />
      <circle cx="27" cy="19" r="0.8" fill={NAVY} />
      {/* Smile */}
      <path d="M22 22 Q24 24 26 22" fill="none" stroke={BROWN} strokeWidth="0.7" />
      {/* Saree */}
      <rect x="15" y="26" width="18" height="16" rx="3" fill={SAFFRON} />
      <path d="M15 26 Q20 30 15 42" fill={GREEN} opacity="0.5" />
      {/* Book */}
      <rect x="33" y="30" width="8" height="10" rx="1" fill="#DC2626" />
      <line x1="37" y1="30" x2="37" y2="40" stroke={WHITE_C} strokeWidth="0.8" />
      {/* Pointer stick */}
      <line x1="8" y1="28" x2="15" y2="34" stroke={BROWN} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

// Map avatar id → SVG renderer
const SVG_MAP = {
  1: WarriorSvg,
  2: DancerSvg,
  3: CricketerSvg,
  4: ScientistSvg,
  5: ChessProSvg,
  6: AstronautSvg,
  7: FarmerSvg,
  8: TeacherSvg,
};

/**
 * Avatar
 *
 * Props:
 *  - avatarId  : number (1-8)
 *  - size      : 'sm' | 'md' | 'lg'  (default 'md')
 *  - showName  : boolean (default false)
 *  - className : extra classes
 */
export default function Avatar({ avatarId, size = 'md', showName = false, className = '' }) {
  const px = SIZES[size] || SIZES.md;
  const SvgBody = SVG_MAP[avatarId];
  const config = AVATAR_CONFIG.find((a) => a.id === avatarId);

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-full bg-white/5"
      >
        {SvgBody ? <SvgBody /> : (
          <text x="24" y="30" textAnchor="middle" fontSize="20">{config?.emoji || '👤'}</text>
        )}
      </svg>
      {showName && config && (
        <span className="mt-1 text-xs text-gray-400 font-medium">{config.name}</span>
      )}
    </div>
  );
}
