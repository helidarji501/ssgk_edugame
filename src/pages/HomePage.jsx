import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-off-white font-body selection:bg-pink/30">
      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center overflow-hidden">
        {/* Soft geometric background accents */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-pink/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-navy/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-navy/5 text-navy text-sm font-bold tracking-wider uppercase mb-6 animate-fade-rise border border-navy/10">
            India's Premium Math Platform
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold text-navy leading-[1.1] mb-8 animate-fade-rise tracking-tighter">
            Think Fast.<br />
            <span className="text-pink">Solve Faster.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-navy/70 text-xl font-medium mb-12 animate-fade-rise-delay leading-relaxed">
            Experience competitive mathematics in a sleek, professional environment. Master your skills.
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


    </div>
  );
}
