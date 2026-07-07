import { useNavigate } from 'react-router-dom';

const DIFFICULTY_BADGE = {
  1: { label: 'Easy', color: 'bg-green-500/20 text-green-400' },
  2: { label: 'Medium', color: 'bg-yellow-500/20 text-yellow-400' },
  3: { label: 'Hard', color: 'bg-red-500/20 text-red-400' },
};

export default function GameCard({ title, description, icon, route, difficulty, subject }) {
  const navigate = useNavigate();
  const badge = DIFFICULTY_BADGE[difficulty] || DIFFICULTY_BADGE[1];

  return (
    <div
      onClick={() => navigate(route)}
      className="group relative bg-white rounded-[2rem] p-10 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-navy/5 border-2 border-pink/10 hover:border-pink/40 flex flex-col items-center text-center cursor-pointer overflow-hidden font-body"
    >
      {/* Kraft Paper texture overlay (subtle) */}
      <div className="absolute inset-0 bg-kraft/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Difficulty Badge */}
      <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-[10px] font-bold uppercase tracking-widest text-navy">
        {badge.label}
      </div>

      <div className="text-7xl mb-8 transform transition-transform group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>
      
      <h3 className="text-3xl font-heading font-extrabold text-navy mb-4 tracking-tighter">
        {title}
      </h3>
      
      <p className="text-navy/60 font-medium text-sm leading-relaxed mb-10">
        {description}
      </p>

      <div className="w-full py-4 rounded-full bg-navy text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-navy/10 group-hover:bg-pink group-hover:shadow-pink/20">
        Start Training
      </div>
    </div>


  );
}
