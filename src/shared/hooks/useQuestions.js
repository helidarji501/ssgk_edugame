import { useState, useMemo, useCallback, useRef } from 'react';
import questionBank from '../data/questionBank.json';
import { shuffleArray, generateQuestion } from '../utils/mathUtils.js';

/**
 * useQuestions — custom hook that serves one question at a time from the bank.
 *
 * @param {Object}  opts
 * @param {"addition"|"subtraction"|"multiplication"|"division"|"mixed"} opts.topic
 * @param {1|2|3}   opts.difficulty
 * @param {number}  opts.count - how many questions the session should contain
 *
 * @returns {{
 *   questions:       Array,
 *   currentQuestion: Object | null,
 *   nextQuestion:    () => void,
 *   resetQuestions:  () => void,
 *   progress:        { current: number, total: number, percent: number }
 * }}
 */
export default function useQuestions({ topic, difficulty, count }) {
  // Track previous question string to prevent duplicates
  const prevQuestionRef = useRef(null);

  // Build the question pool once when params change
  const pool = useMemo(() => {
    // Filter the bank by topic + difficulty
    let filtered = questionBank.filter(
      (q) => q.topic === topic && q.difficulty === difficulty
    );

    // Shuffle what we have from the static bank
    filtered = shuffleArray(filtered);

    // If the bank doesn't have enough, generate extras at runtime
    while (filtered.length < count) {
      const newQ = generateQuestion(topic, difficulty, prevQuestionRef.current);
      prevQuestionRef.current = newQ.question;
      filtered.push(newQ);
    }

    // Trim to exactly `count` and return
    return filtered.slice(0, count);
  }, [topic, difficulty, count]);

  const [index, setIndex] = useState(0);

  /** Advance to the next question. No-op if already at the end. */
  const nextQuestion = useCallback(() => {
    setIndex((prev) => {
      const nextIdx = Math.min(prev + 1, pool.length);
      // Update prev question reference for next generation
      if (nextIdx < pool.length) {
        prevQuestionRef.current = pool[prev]?.question || null;
      }
      return nextIdx;
    });
  }, [pool]);

  /** Reset back to the first question (re-shuffles the pool). */
  const resetQuestions = useCallback(() => {
    setIndex(0);
  }, []);

  const currentQuestion = index < pool.length ? pool[index] : null;

  const progress = {
    current: Math.min(index + 1, pool.length),
    total: pool.length,
    percent: pool.length > 0 ? Math.round(((index) / pool.length) * 100) : 0,
  };

  return {
    questions: pool,
    currentQuestion,
    nextQuestion,
    resetQuestions,
    progress,
  };
}
