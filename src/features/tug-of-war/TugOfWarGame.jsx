import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import useTugOfWar from './useTugOfWar.js';
import { formatQuestion } from '../../shared/utils/mathUtils.js';
import Lottie from 'lottie-react';
import celebrationData from '../../assets/QThgNwbRW6.json';


// Player Panel Component for each side
function PlayerPanel({
  question,
  input,
  setInput,
  onSubmit,
  isP1,
  gameState,
  score
}) {
  const [isError, setIsError] = useState(false);

  const handleNum = (n) => {
    if (gameState !== 'playing') return;
    if (input.length < 6) {
      setInput(prev => prev + n);
      setIsError(false); // Clear error when typing
    }
  };

  const handleClear = () => {
    setInput('');
    setIsError(false);
  };

  const handleBackspace = () => {
    setInput(prev => prev.slice(0, -1));
    setIsError(false);
  };

  const handleSubmitClick = () => {
    if (!input || !question) return;

    const userAnswer = parseInt(input, 10);
    const isCorrect = onSubmit(userAnswer);

    // Hook always clears input and generates new question
    if (isCorrect) {
      setIsError(false);
    } else {
      // Wrong answer - trigger error animation
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
    }
  };

  const bgClass = 'bg-white border-pink';
  const submitClass = 'bg-navy border-navy hover:bg-pink';

  return (
    <div className={`w-56 sm:w-64 ${bgClass} rounded-[2rem] border-2 p-5 sm:p-6 shadow-2xl shadow-navy/5 font-body scale-95 origin-top`}>
      {/* Player Label */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full bg-navy/10 text-xs font-bold uppercase tracking-widest text-navy border border-navy/10">
          PLAYER {isP1 ? '2' : '1'}
        </span>
        <span className="text-navy text-[10px] font-bold uppercase tracking-wider">Score: {score}</span>
      </div>

      {/* Question */}
      <div className="bg-navy/5 rounded-2xl px-4 py-4 text-center mb-4 border border-navy/5">
        <p className="text-3xl sm:text-4xl font-heading font-extrabold text-navy tracking-tighter">
          {question ? formatQuestion(question.question) : '...'}
        </p>
      </div>

      {/* Answer Display */}
      <div
        className={`bg-off-white rounded-xl px-4 py-3 text-center mb-4 border-2 transition-all duration-150 ${isError
            ? 'border-red-400 bg-red-50'
            : 'border-navy/5'
          }`}
        style={isError ? {
          animation: 'shake 0.4s ease-in-out',
        } : {}}
      >
        <p className={`text-3xl font-extrabold font-body ${isError ? 'text-red-500' : 'text-navy'}`}>
          {input || '_'}
        </p>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
          <button
            key={n}
            onClick={() => handleNum(n.toString())}
            className="py-2.5 rounded-xl font-bold text-xl text-navy bg-navy/5 hover:bg-pink/5 hover:text-pink active:scale-95 transition-all border border-transparent hover:border-pink/20"
          >
            {n}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-red-500 bg-red-50 hover:bg-red-100 active:scale-95 transition-all"
        >
          Clear
        </button>
        <button
          onClick={() => handleNum('0')}
          className="py-2.5 rounded-xl font-bold text-xl text-navy bg-navy/5 hover:bg-pink/5 hover:text-pink active:scale-95 transition-all border border-transparent hover:border-pink/20"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="py-2.5 rounded-xl font-bold text-lg text-navy bg-navy/5 hover:bg-pink/5 hover:text-pink active:scale-95 transition-all border border-transparent hover:border-pink/20"
        >
          ⌫
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitClick}
        disabled={!input}
        className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest text-white shadow-xl transition-all active:scale-95 ${input ? (submitClass + ' shadow-navy/20') : 'bg-navy/10 text-navy/20 cursor-not-allowed opacity-50'
          }`}
      >
        {isP1 ? 'P2 ENTER' : 'P1 ENTER'}
      </button>

      {/* Keyboard Hint */}
      <p className="text-center text-navy/30 text-[9px] mt-4 font-bold uppercase tracking-[0.2em]">
        {isP1 ? 'Numpad • Enter' : '1-0 • Space'}
      </p>
    </div>
  );
}



const BrandingBlock = () => (
  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-50 pointer-events-none hidden md:flex">
    <img
      src="/logo latest(050626) (1).jpg"
      className="h-16 w-16 object-contain"
      alt="SSGK Gurukul Logo"
    />
    <span className="text-sm font-bold tracking-wide text-[#1E2551]">SSGK</span>
  </div>
);

export default function TugOfWarGame() {
  const navigate = useNavigate();

  const {
    containerRef,
    containerWidth,
    pullPosition,
    p1Question,
    p2Question,
    p1Input,
    p2Input,
    setP1Input,
    setP2Input,
    handleAnswerP1,
    handleAnswerP2,
    scoreP1,
    scoreP2,
    correctCountP1,
    correctCountP2,
    winner,
    gameState,
    isCelebrating,
    countdown,
    startGame,
    resetGame,
  } = useTugOfWar();


  const isGameOver = gameState === 'p1_won' || gameState === 'p2_won';

  // Position calculations based on container width and pullPosition state
  const centerX = containerWidth / 2;

  // Wrap submit handlers to return boolean for UI feedback
  const onP1Submit = (ans) => {
    return handleAnswerP1(ans);
  };

  const onP2Submit = (ans) => {
    return handleAnswerP2(ans);
  };

  // Global keyboard support - no input focus needed
  useEffect(() => {
    if (gameState !== 'playing' || isCelebrating) return;


    const handleKeyDown = (e) => {
      // Prevent default for game keys to avoid page scrolling
      const gameKeys = ['Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4',
        'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9',
        'NumpadEnter', 'Backspace', 'Space', 'Escape',
        'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5',
        'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0',
        'KeyC', 'KeyX', 'KeyQ'];
      if (gameKeys.includes(e.code)) {
        e.preventDefault();
      }

      // ===== PLAYER 1 (Right) - Numpad Controls =====
      if (e.code.startsWith('Numpad') && e.code !== 'NumpadEnter') {
        const num = e.code.replace('Numpad', '');
        if (/^[0-9]$/.test(num) && p1Input.length < 6) {
          setP1Input(prev => prev + num);
        }
      }
      else if (e.code === 'NumpadEnter') {
        if (p1Input && p1Question) {
          const answer = parseInt(p1Input, 10);
          handleAnswerP1(answer);
        }
      }
      else if (e.code === 'Backspace') {
        setP1Input('');
      }

      // ===== PLAYER 2 (Left) - Left Side Keyboard =====
      else if (e.code.startsWith('Digit')) {
        const num = e.code.replace('Digit', '');
        if (/^[0-9]$/.test(num) && p2Input.length < 6) {
          setP2Input(prev => prev + num);
        }
      }
      else if (e.code === 'Space') {
        if (p2Input && p2Question) {
          const answer = parseInt(p2Input, 10);
          handleAnswerP2(answer);
        }
      }
      else if (e.code === 'KeyC') {
        setP2Input('');
      }
      else if (e.code === 'KeyX') {
        setP2Input(prev => prev.slice(0, -1));
      }
      else if (e.code === 'KeyQ' || e.code === 'Escape') {
        setP2Input('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, p1Input, p2Input, p1Question, p2Question, setP1Input, setP2Input, handleAnswerP1, handleAnswerP2]);

  // ─── Render Helper ───
  if (gameState === 'idle') {
    return (
      <div className="w-full h-full bg-[#E4C7A3] flex flex-col items-center justify-start pt-24 pb-12 px-4 font-body selection:bg-pink/30 overflow-x-hidden relative">
        <div className="flex flex-col items-center text-center w-full max-w-4xl">
          <span className="text-7xl mb-8 animate-bounce">⚔️</span>
          <h1 className="text-6xl md:text-7xl font-heading font-extrabold text-[#1E2551] tracking-tighter mb-8">
            Tug of <span className="text-pink">War</span>
          </h1>
          
          <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-10 mb-12 border border-white/20 max-w-lg w-full">
            <ul className="space-y-4 text-[#1E2551] font-bold uppercase tracking-widest text-sm text-left">
              <li className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-xs">1</span>
                Play with numbers
              </li>
              <li className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-xs">2</span>
                Submit Right Answers to pull
              </li>
              <li className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-xs">3</span>
                Winner takes the trophy
              </li>
            </ul>
          </div>

          <button
            onClick={startGame}
            className="px-16 py-6 rounded-full bg-[#1E2551] text-white font-bold text-xl hover:bg-pink hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-navy/30 min-w-[300px]"
          >
            Start Battle
          </button>
          <button
            onClick={() => navigate('/games')}
            className="mt-8 text-[#1E2551]/40 text-sm font-bold uppercase tracking-widest hover:text-[#1E2551] transition-colors"
          >
            ← Leave Arena
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'countdown') {
    return (
      <div className="w-full h-full bg-[#E4C7A3] flex flex-col items-center justify-center p-6 text-center font-body selection:bg-pink/30 relative">
        <h2 className="text-[#1E2551] text-5xl md:text-6xl font-black tracking-wider mb-4 uppercase animate-fade-in">
          Get Ready!
        </h2>
        <div className="text-[10rem] md:text-[14rem] font-heading font-black text-[#1E2551] leading-none animate-ping">
          {countdown}
        </div>
      </div>
    );
  }

  if (isGameOver) {
    return (
      <div className="w-full h-full bg-[#E4C7A3] flex flex-col items-center justify-start pt-24 pb-12 px-4 font-body selection:bg-pink/30 relative">
        <div className="flex flex-col items-center text-center w-full max-w-4xl px-4">
          <span className="text-7xl sm:text-8xl mb-6 transform hover:scale-110 transition-transform cursor-pointer">🏆</span>
          <h2 className="text-6xl md:text-8xl font-heading font-extrabold tracking-tighter mb-4 text-[#1E2551]">
            <span className="text-[#E9429F]">{(winner || 'Player')}</span> Wins!
          </h2>

          <div className="flex justify-center items-center gap-6 sm:gap-10 mt-8 mb-12 flex-wrap">
            <div className="text-center group px-2">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-navy/20 border-2 border-white">
                <p className="text-navy font-bold uppercase tracking-[0.2em] text-[10px] mb-3 opacity-60">Player 1</p>
                <p className="text-navy text-6xl font-extrabold tracking-tighter mb-1">{scoreP2}</p>
                <p className="text-pink text-[10px] font-bold uppercase tracking-widest">{correctCountP2} correct</p>
              </div>
            </div>
            <div className="text-center group px-2">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-navy/20 border-2 border-white">
                <p className="text-navy font-bold uppercase tracking-[0.2em] text-[10px] mb-3 opacity-60">Player 2</p>
                <p className="text-navy text-6xl font-extrabold tracking-tighter mb-1">{scoreP1}</p>
                <p className="text-pink text-[10px] font-bold uppercase tracking-widest">{correctCountP1} correct</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => { resetGame(); startGame(); }}
              className="px-16 py-5 rounded-full bg-pink text-white font-bold text-xl hover:bg-white hover:text-navy hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-pink/30 min-w-[280px]"
            >
              Battle Again
            </button>
            <button
              onClick={() => { resetGame(); navigate('/games'); }}
              className="mt-4 text-[#1E2551]/60 text-sm font-bold uppercase tracking-widest hover:text-[#1E2551] transition-colors"
            >
              ← Exit Arena
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. MAIN GAME ARENA
  return (
    <div ref={containerRef} className="w-full h-[calc(100vh-64px)] overflow-hidden relative z-10 bg-[#E4C7A3] select-none font-body">
      <BrandingBlock />
      {/* ─── Central Animation Stage ─── */}
      <div className="absolute inset-0 flex flex-col justify-end items-center z-0 pointer-events-none pb-[10vh]">
        {/* Sky/Stars */}
        <div className="absolute inset-0 bg-[#E4C7A3] -z-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-white/30 rounded-full" style={{ left: `${(i * 137.5) % 100}%`, top: `${(i * 73.3) % 40}%` }} />
          ))}
        </div>

        {/* Grass Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-[#2D5A1E] -z-10">
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#3A7A2E]" />
        </div>

        {/* Tug of War Characters (Video) */}
        <video
          src="/final_video.webm" autoPlay loop muted playsInline preload="auto" controls={false}
          className="z-20 w-[550px] h-auto object-contain mix-blend-multiply transition-all duration-300 block"
          style={{ 
            position: 'absolute', 
            left: '50%', 
            bottom: '30%', 
            transform: `translateX(calc(-50% + ${pullPosition}px))` 
          }}
        />

        {/* Boundary Lines & Ground Markers */}
        <div className="absolute bottom-[15%] left-0 right-0 h-20 w-full overflow-hidden">
          {/* Center Marker */}
          <div className="absolute bottom-0 left-1/2 w-0.5 h-16 border-l-2 border-dashed border-white/60 transform -translate-x-1/2" />
          
          {/* P1 Win (Left) */}
          <div className="absolute bottom-0 left-1/2 w-1 h-16 bg-red-600/80 transform -translate-x-[200.5px]" />
          
          {/* P2 Win (Right) */}
          <div className="absolute bottom-0 left-1/2 w-1 h-16 bg-green-600/80 transform translate-x-[199.5px]" />
        </div>
      </div>

      {!isCelebrating && (
        <>
          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 h-auto">
            <PlayerPanel question={p2Question} input={p2Input} setInput={setP2Input} onSubmit={onP2Submit} isP1={false} gameState={gameState} score={scoreP2} />
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 h-auto">
            <PlayerPanel question={p1Question} input={p1Input} setInput={setP1Input} onSubmit={onP1Submit} isP1={true} gameState={gameState} score={scoreP1} />
          </div>
        </>
      )}

      {isCelebrating && (
        <Lottie animationData={celebrationData} loop={false} autoplay={true} className="absolute inset-0 z-50 pointer-events-none" />
      )}
    </div>
  );
}
