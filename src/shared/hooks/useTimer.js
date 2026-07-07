import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useTimer — countdown timer hook.
 *
 * @param {number}   totalSeconds  – starting seconds (e.g. 90)
 * @param {Object}   [opts]
 * @param {boolean}  [opts.autoStart=false]
 * @param {Function} [opts.onEnd]  – called once when timer reaches 0
 *
 * @returns {{
 *   timeLeft:  number,
 *   isRunning: boolean,
 *   start:     () => void,
 *   pause:     () => void,
 *   reset:     () => void,
 *   elapsed:   number,
 * }}
 */
export default function useTimer(totalSeconds, { autoStart = false, onEnd } = {}) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef(null);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  // Tick
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          onEndRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  const elapsed = totalSeconds - timeLeft;

  return { timeLeft, isRunning, start, pause, reset, elapsed };
}
