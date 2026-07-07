import { useNavigate, Link } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-off-white font-body selection:bg-pink/30">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        {/* Soft geometric background accents */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-pink/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-navy/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-navy/5 text-navy text-sm font-bold tracking-wider uppercase mb-6 animate-fade-rise border border-navy/10">
            India's Premium Math Platform
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold text-navy leading-[1.1] mb-8 animate-fade-rise tracking-tighter">
            Think Fast.<br/>
            <span className="text-pink">Solve Faster.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-navy/70 text-xl font-medium mb-12 animate-fade-rise-delay leading-relaxed">
            Experience competitive mathematics in a sleek, modern boutique environment. Master your skills and climb the ranks.
          </p>
          <div className="flex flex-wrap justify-center gap-6 animate-fade-rise-delay-2">
            <Link
              to="/games"
              className="px-10 py-5 rounded-full bg-navy text-white font-bold text-lg hover:bg-pink hover:scale-105 active:scale-95 transition-all shadow-xl shadow-navy/20"
            >
              Enter The Arena
            </Link>

          </div>
        </div>
      </section>

      {/* Boutique Features Grid */}
      <section className="py-24 bg-white border-y border-navy/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: '⚡', title: 'High Performance', desc: 'Optimized for speed. Every millisecond counts when you are in the flow.' },
              { icon: '🎖️', title: 'Elite Rewards', desc: 'Earn exclusive badges and stars as you dominate the world of numbers.' },
              { icon: '🤝', title: 'Community', desc: 'Join thousands of students across India in daily competitive math sprints.' }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-off-white border border-navy/5 hover:border-pink/30 hover:scale-[1.02] transition-all group">
                <div className="text-4xl mb-6 bg-white w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm border border-navy/5 group-hover:bg-pink/5 group-hover:rotate-6 transition-all">{f.icon}</div>
                <h3 className="text-2xl font-bold text-navy mb-4">{f.title}</h3>
                <p className="text-navy/60 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Footer */}
      <footer className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-3xl mb-4">🧮</div>
          <p className="font-heading font-extrabold text-navy text-xl mb-4">MathQuest India</p>
          <p className="text-navy/40 text-sm font-bold uppercase tracking-widest">© 2024 Modern Boutique Mathematics</p>
        </div>
      </footer>
    </div>
  );
}
