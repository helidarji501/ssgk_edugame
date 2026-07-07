/**
 * difficultyScaler.js
 * Pure functions that map a difficulty level (1 | 2 | 3) to game parameters.
 */

const SPEED_MULTIPLIERS = { 1: 1, 2: 1.4, 3: 2.0 };
const TIME_LIMITS = { 1: 90, 2: 60, 3: 45 };
const BALL_SPEEDS = { 1: 0.4, 2: 0.7, 3: 1.1 };

/**
 * General speed multiplier used by game engines to scale animations.
 * @param {1|2|3} difficulty
 * @returns {number} 1 | 1.4 | 2.0
 */
export function getSpeedMultiplier(difficulty) {
  return SPEED_MULTIPLIERS[difficulty] ?? 1;
}

/**
 * Time limit (in seconds) for timed game modes.
 * @param {1|2|3} difficulty
 * @returns {number} 90 | 60 | 45
 */
export function getTimeLimit(difficulty) {
  return TIME_LIMITS[difficulty] ?? 90;
}

/**
 * Ball speed in pixels-per-frame for the Math Zuma track.
 * @param {1|2|3} difficulty
 * @returns {number} 0.4 | 0.7 | 1.1
 */
export function getBallSpeed(difficulty) {
  return BALL_SPEEDS[difficulty] ?? 0.4;
}
