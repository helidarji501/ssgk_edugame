import { useRef, useState, useCallback, useEffect } from 'react';
import { generateQuestion } from '../../shared/utils/mathUtils.js';
import useGameStore, { useSettings } from '../../shared/store/useGameStore.js';

/**
 * useTugOfWar
 *
 * Manages the Multiplayer Tug of War game state.
 * Two players compete by answering math questions to pull the rope.
 * Game ends when the rope marker crosses a win boundary.
 *
 * @returns {{
 *   containerRef:     React.RefObject<HTMLDivElement>,
 *   containerWidth:   number,
 *   containerHeight:  number,
 *   pullPosition:     number,    // 0 = center, negative = P2 winning, positive = P1 winning
 *   p1Question:     Object | null,
 *   p2Question:     Object | null,
 *   p1Input:        string,
 *   p2Input:        string,
 *   setP1Input:     (s: string) => void,
 *   setP2Input:     (s: string) => void,
 *   handleAnswerP1: (ans: number) => void,
 *   handleAnswerP2: (ans: number) => void,
 *   generateP1Question: () => void,
 *   generateP2Question: () => void,
 *   scoreP1:          number,
 *   scoreP2:          number,
 *   correctCountP1:   number,
 *   correctCountP2:   number,
 *   gameState:        'idle' | 'playing' | 'p1_won' | 'p2_won',
 *   winner:           string | null,
 *   startGame:        () => void,
 *   resetGame:        () => void,
 * }}
 */
export default function useTugOfWar() {
  const settings = useSettings();
  const { topic, difficulty } = settings;
  const startSession = useGameStore((s) => s.startSession);
  const endSession = useGameStore((s) => s.endSession);
  const addStars = useGameStore((s) => s.addStars);
  const incrementGames = useGameStore((s) => s.incrementGamesPlayed);
  const addEntry = useGameStore((s) => s.addEntry);
  const player = useGameStore((s) => s.player);

  const containerRef = useRef(null);

  const [gameState, setGameState] = useState('idle'); // idle | playing | p1_won | p2_won
  const [winner, setWinner] = useState(null);
  const [isCelebrating, setIsCelebrating] = useState(false);


  // Player 1 stats and state (right side)
  const [scoreP1, setScoreP1] = useState(0);
  const [correctCountP1, setCorrectCountP1] = useState(0);
  const [p1Question, setP1Question] = useState(null);
  const [p1Input, setP1Input] = useState('');
  const [prevP1Question, setPrevP1Question] = useState(null);

  // Player 2 stats and state (left side)
  const [scoreP2, setScoreP2] = useState(0);
  const [correctCountP2, setCorrectCountP2] = useState(0);
  const [p2Question, setP2Question] = useState(null);
  const [p2Input, setP2Input] = useState('');
  const [prevP2Question, setPrevP2Question] = useState(null);

  const [pullPosition, setPullPosition] = useState(0); // 0 = center, positive = P1 winning, negative = P2 winning
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // Dynamic resize tracking
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerWidth(rect.width);
        setContainerHeight(rect.height);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Generate question for Player 1
  const generateP1Question = useCallback(() => {
    const newQ = generateQuestion(topic, difficulty, prevP1Question);
    setPrevP1Question(newQ?.question || null);
    setP1Question(newQ);
  }, [topic, difficulty, prevP1Question]);

  // Generate question for Player 2
  const generateP2Question = useCallback(() => {
    const newQ = generateQuestion(topic, difficulty, prevP2Question);
    setPrevP2Question(newQ?.question || null);
    setP2Question(newQ);
  }, [topic, difficulty, prevP2Question]);

  // Check win condition when pullPosition changes - only ends when rope crosses boundary
  useEffect(() => {
    if (gameState === 'playing' && !isCelebrating) {
      if (pullPosition >= 200) {
        // Right-side player crosses boundary (mapped to Player 2)
        setPullPosition(200);
        setWinner('Player 2');
        setIsCelebrating(true);
        setTimeout(() => {
          setGameState('p1_won');
          setIsCelebrating(false);
        }, 3000);
      } else if (pullPosition <= -200) {
        // Left-side player crosses boundary (mapped to Player 1)
        setPullPosition(-200);
        setWinner('Player 1');
        setIsCelebrating(true);
        setTimeout(() => {
          setGameState('p2_won');
          setIsCelebrating(false);
        }, 3000);
      }

    }
  }, [pullPosition, gameState, isCelebrating]);


  // Generate initial questions when game starts
  useEffect(() => {
    if (gameState === 'playing' && !p1Question && !p2Question) {
      generateP1Question();
      generateP2Question();
    }
  }, [gameState, p1Question, p2Question, generateP1Question, generateP2Question]);

  /* ─── Callbacks ─── */

  // Player 1 answers (pulls rope to the right when correct, left when wrong)
  const handleAnswerP1 = useCallback((answer) => {
    if (gameState !== 'playing' || !p1Question || isCelebrating) return;


    const isCorrect = answer === p1Question.answer;
    const pullAmount = 40 + difficulty * 10;

    if (isCorrect) {
      // Correct: P1 pulls rope to the right
      const pts = 10 * difficulty;
      setScoreP1((s) => s + pts);
      setCorrectCountP1((c) => c + 1);
      setPullPosition(prev => prev + pullAmount);
    } else {
      // Wrong: Penalty - rope moves left (toward P2)
      setPullPosition(prev => prev - pullAmount);
    }

    // Always clear input and generate new question for P1
    setP1Input('');
    generateP1Question();

    return isCorrect;
  }, [gameState, p1Question, difficulty, generateP1Question]);

  // Player 2 answers (pulls rope to the left when correct, right when wrong)
  const handleAnswerP2 = useCallback((answer) => {
    if (gameState !== 'playing' || !p2Question || isCelebrating) return;


    const isCorrect = answer === p2Question.answer;
    const pullAmount = 40 + difficulty * 10;

    if (isCorrect) {
      // Correct: P2 pulls rope to the left
      const pts = 10 * difficulty;
      setScoreP2((s) => s + pts);
      setCorrectCountP2((c) => c + 1);
      setPullPosition(prev => prev - pullAmount);
    } else {
      // Wrong: Penalty - rope moves right (toward P1)
      setPullPosition(prev => prev + pullAmount);
    }

    // Always clear input and generate new question for P2
    setP2Input('');
    generateP2Question();

    return isCorrect;
  }, [gameState, p2Question, difficulty, generateP2Question]);

  /* ─── Start / Reset ─── */

  const [countdown, setCountdown] = useState(null);
  const countdownIntervalRel = useRef(null);

  const startGame = useCallback(() => {
    setScoreP1(0);
    setScoreP2(0);
    setCorrectCountP1(0);
    setCorrectCountP2(0);
    setPullPosition(0);
    setWinner(null);
    setP1Input('');
    setP2Input('');
    setPrevP1Question(null);
    setPrevP2Question(null);
    setP1Question(null);
    setP2Question(null);
    
    // Start Countdown
    setGameState('countdown');
    setCountdown(3);
    
    if (countdownIntervalRel.current) clearInterval(countdownIntervalRel.current);
    
    countdownIntervalRel.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRel.current);
          setGameState('playing');
          startSession('tug-of-war');
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, [startSession]);

  const resetGame = useCallback(() => {
    endSession();
    setGameState('idle');
    setScoreP1(0);
    setScoreP2(0);
    setCorrectCountP1(0);
    setCorrectCountP2(0);
    setPullPosition(0);
    setWinner(null);
    setP1Input('');
    setP2Input('');
    setPrevP1Question(null);
    setPrevP2Question(null);
    setP1Question(null);
    setP2Question(null);
  }, [endSession]);

  // Finalise stats when game ends
  useEffect(() => {
    if (gameState === 'p1_won' || gameState === 'p2_won') {
      const stars = 2; // Multiplayer game - fixed stars
      addStars(stars);
      incrementGames();
      addEntry({
        playerName: player.playerName || 'Player 1',
        avatarId: player.avatarId,
        game: 'Tug of War (Multiplayer)',
        score: scoreP1 + scoreP2,
        date: new Date().toISOString(),
      });
    }
  }, [gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    containerRef,
    containerWidth,
    containerHeight,
    pullPosition,
    p1Question,
    p2Question,
    p1Input,
    p2Input,
    setP1Input,
    setP2Input,
    handleAnswerP1,
    handleAnswerP2,
    generateP1Question,
    generateP2Question,
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
  };
}
