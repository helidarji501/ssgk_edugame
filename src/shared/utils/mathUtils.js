/**
 * mathUtils.js
 * Pure utility functions for math question generation and manipulation.
 */

/**
 * Fisher-Yates shuffle — returns a NEW shuffled array (does not mutate input).
 * @param {Array} arr
 * @returns {Array}
 */
export function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Generate `count` plausible wrong answers that are close to the correct answer.
 * - difficulty 1 → distractors within ±5
 * - difficulty 2/3 → distractors within ±15
 * All distractors are ≥ 0 and unique (and ≠ answer).
 *
 * @param {number} answer   - the correct answer
 * @param {number} [count=3] - how many distractors to produce
 * @param {number} [difficulty=1] - controls distractor range
 * @returns {number[]}
 */
export function pickDistractors(answer, count = 3, difficulty = 1) {
  const range = difficulty === 1 ? 5 : 15;
  const set = new Set();
  let attempts = 0;

  while (set.size < count && attempts < 200) {
    const offset = Math.floor(Math.random() * range * 2 + 1) - range;
    const d = answer + offset;
    if (d !== answer && d >= 0 && !set.has(d)) {
      set.add(d);
    }
    attempts++;
  }

  // Fallback: if we couldn't generate enough, pad with sequential offsets
  let fallback = 1;
  while (set.size < count) {
    const d = answer + fallback;
    if (!set.has(d) && d !== answer) set.add(d);
    fallback++;
  }

  return [...set];
}

/**
 * Format a question string for display.
 * Replaces `*` with the multiplication sign `×`.
 *
 * @param {string} question - e.g. "7 * 8"
 * @returns {string} - e.g. "7 × 8"
 */
export function formatQuestion(question) {
  return question.replace(/\*/g, '×');
}

/**
 * Generate a fresh question object at runtime (fallback when the question bank
 * doesn't have enough entries for a given topic / difficulty).
 * Ensures the generated question is not a duplicate of the previous one.
 *
 * @param {"addition"|"subtraction"|"multiplication"|"division"|"mixed"} topic
 * @param {1|2|3} difficulty
 * @param {string} [prevQuestion] - The previous question string to avoid duplicates (e.g., "5 + 3")
 * @returns {{ id: string, topic: string, difficulty: number, question: string, answer: number, distractors: number[] }}
 */
export function generateQuestion(topic, difficulty, prevQuestion = null) {
  let attempts = 0;
  let result = null;

  // Keep generating until we get a non-duplicate (max 50 attempts to prevent infinite loop)
  while (attempts < 50) {
    result = _generateSingleQuestion(topic, difficulty);
    
    // If no previous question or this one is different, use it
    if (!prevQuestion || result.question !== prevQuestion) {
      break;
    }
    
    attempts++;
  }

  return result;
}

/**
 * Internal: Generate a single question without duplicate checking.
 */
function _generateSingleQuestion(topic, difficulty) {
  const id = crypto.randomUUID();
  let a, b, answer, question;

  // Resolve topic for "mixed"
  const resolvedTopic =
    topic === 'mixed'
      ? ['addition', 'subtraction', 'multiplication', 'division'][
          Math.floor(Math.random() * 4)
        ]
      : topic;

  switch (resolvedTopic) {
    case 'addition':
      ({ a, b } = _operandsForAdd(difficulty));
      answer = a + b;
      question = `${a} + ${b}`;
      break;

    case 'subtraction':
      ({ a, b } = _operandsForSub(difficulty));
      answer = a - b;
      question = `${a} - ${b}`;
      break;

    case 'multiplication':
      ({ a, b } = _operandsForMul(difficulty));
      answer = a * b;
      question = `${a} × ${b}`;
      break;

    case 'division':
      ({ a, b } = _operandsForDiv(difficulty));
      answer = a / b;
      question = `${a} ÷ ${b}`;
      break;

    default:
      throw new Error(`Unknown topic: ${topic}`);
  }

  return {
    id,
    topic,
    difficulty,
    question,
    answer,
    distractors: pickDistractors(answer, 3, difficulty),
  };
}

/* ─── private helpers for operand generation ─── */

function _rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _operandsForAdd(d) {
  // Significantly expanded ranges for variety
  if (d === 1) return { a: _rand(1, 20), b: _rand(1, 20) };
  if (d === 2) return { a: _rand(10, 199), b: _rand(10, 199) };
  return { a: _rand(100, 2999), b: _rand(100, 2999) };
}

function _operandsForSub(d) {
  // Significantly expanded ranges for variety
  if (d === 1) {
    const a = _rand(2, 39);
    return { a, b: _rand(1, a - 1) };
  }
  if (d === 2) {
    const a = _rand(20, 299);
    return { a, b: _rand(5, a - 1) };
  }
  const a = _rand(200, 4999);
  return { a, b: _rand(50, a - 1) };
}

function _operandsForMul(d) {
  // Significantly expanded ranges for variety
  if (d === 1) return { a: _rand(2, 12), b: _rand(2, 12) };
  if (d === 2) return { a: _rand(5, 49), b: _rand(3, 19) };
  return { a: _rand(10, 99), b: _rand(5, 49) };
}

function _operandsForDiv(d) {
  // Division: generate (divisor * answer) / divisor for clean whole numbers
  if (d === 1) {
    const b = _rand(2, 12);
    const ans = _rand(2, 15);
    return { a: b * ans, b };
  }
  if (d === 2) {
    const b = _rand(3, 19);
    const ans = _rand(5, 49);
    return { a: b * ans, b };
  }
  const b = _rand(5, 49);
  const ans = _rand(10, 99);
  return { a: b * ans, b };
}
