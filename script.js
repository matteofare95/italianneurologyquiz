/* ═══════════════════════════════════════════════════════════════
   ITALIAN NEUROLOGY QUIZ — script.js
   ─────────────────────────────────────────────────────────────
   SECTIONS
   1. QUESTIONS
   2. CONFIG
   3. STATE
   4. LOCALSTORAGE HELPERS
   5. SCREEN NAVIGATION
   6. HOME SCREEN
   7. NICKNAME SCREEN
   8. QUIZ SCREEN
   9. RESULT SCREEN
  10. LEADERBOARD SCREEN
  11. STAFF RESET
  12. INIT
   ═══════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────────
   1. QUESTIONS
   ─────────────────────────────────────────────────────────────
   Each question object must have:
     question    : string  — the question text
     choices     : array of 4 strings  — answer options (A, B, C, D)
     correctIndex: number 0–3  — index of the correct answer

   Add between 1 and ~50 questions. The quiz will use ALL of them.
   To randomise question order each game, set CONFIG.shuffleQuestions = true.
   ─────────────────────────────────────────────────────────────── */
const QUESTIONS = [
  {
    question: "Which neurotransmitter is primarily depleted in Parkinson's disease?",
    choices: ["Serotonin", "Acetylcholine", "Dopamine", "Norepinephrine"],
    correctIndex: 2,
	image: "img/parkinson_dopamine.png",
    imageAlt: "Illustration of dopamine pathways in Parkinson's disease"
  },
  /*
    ── PASTE ADDITIONAL QUESTIONS BELOW THIS LINE ──
    Example template:
    ,{
      question: "Your question text here?",
      choices: ["Option A", "Option B", "Option C", "Option D"],
      correctIndex: 0,   // 0 = A, 1 = B, 2 = C, 3 = D
	  image: "img/image_name", //delete field if not used
      imageAlt: "description"  //delete field if not used
    }
  */
];


/* ─────────────────────────────────────────────────────────────
   2. CONFIG
   ─────────────────────────────────────────────────────────────── */
const CONFIG = {
  pointsPerCorrect:  100,        // points awarded for a correct answer
  feedbackDelay:     1500,       // ms before advancing to next question
  maxLeaderboardEntries: 2000,     // max stored scores
  shuffleQuestions:  true,       // randomise order each game
  shuffleChoices:    true,      // if true, randomise choice order (keep false unless you re-map correctIndex)
  questionTimeLimitMs: 10000,  // 10 seconds for question
  resetPassword: 'Cannella2026'
};

const STORAGE_KEY = 'neurologyQuizScores'; // localStorage key


/* ─────────────────────────────────────────────────────────────
   3. GAME STATE
   ─────────────────────────────────────────────────────────────── */
const state = {
  nickname: '',
  questions: [],      // working copy (possibly shuffled)
  currentIndex: 0,
  score: 0,
  correctCount: 0,
  answered: false,    // prevents double-tap
  timerId: null,
  questionStartTime: 0 // timestamp in ms
};


/* ─────────────────────────────────────────────────────────────
   4. LOCALSTORAGE HELPERS
   ─────────────────────────────────────────────────────────────── */

/**
 * Load all saved scores from localStorage.
 * Returns an array of { nickname, score, isoDate }.
 */
function loadScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Could not load scores:', e);
    return [];
  }
}

/**
 * Save a new score entry, then trim to max entries sorted by score DESC.
 * @param {string} nickname
 * @param {number} score
 */
function saveScore(nickname, score) {
  const scores = loadScores();
  scores.push({
    nickname: nickname,
    score: score,
    isoDate: new Date().toISOString()  // e.g. "2025-06-12T14:32:00.000Z"
  });
  // Sort descending by score
  scores.sort((a, b) => b.score - a.score);
  // Trim to max
  const trimmed = scores.slice(0, CONFIG.maxLeaderboardEntries);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('Could not save score:', e);
  }
}

/**
 * Return scores for today (local date), sorted by score DESC.
 */
function getTodayScores() {
  const todayStr = new Date().toLocaleDateString(); // locale-aware date string
  return loadScores().filter(entry => {
    return new Date(entry.isoDate).toLocaleDateString() === todayStr;
  });
  // Already sorted from loadScores() (which sorts on save)
}

/**
 * Return all scores, sorted by score DESC.
 */
function getAllTimeScores() {
  return loadScores();
}

/**
 * Format an ISO date string to a short human-readable date.
 */
function formatDate(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' });
}

/**
 * Compute the rank of a just-submitted score among all-time scores.
 * Returns the 1-based rank, or null if not found.
 */
function getRankOfScore(score) {
  const all = getAllTimeScores();
  const pos = all.findIndex(e => e.score === score);
  return pos >= 0 ? pos + 1 : null;
}


/* ─────────────────────────────────────────────────────────────
   5. SCREEN NAVIGATION
   ─────────────────────────────────────────────────────────────── */
const SCREENS = {
  home:        document.getElementById('screen-home'),
  nickname:    document.getElementById('screen-nickname'),
  quiz:        document.getElementById('screen-quiz'),
  result:      document.getElementById('screen-result'),
  leaderboard: document.getElementById('screen-leaderboard'),
};

/**
 * Show one screen, hide all others.
 * @param {'home'|'nickname'|'quiz'|'result'|'leaderboard'} name
 */
function showScreen(name) {
  Object.entries(SCREENS).forEach(([key, el]) => {
    el.classList.toggle('active', key === name);
    // Scroll back to top when switching screens
    if (key === name) el.scrollTop = 0;
  });
}


/* ─────────────────────────────────────────────────────────────
   6. HOME SCREEN
   ─────────────────────────────────────────────────────────────── */
function initHomeScreen() {
  renderHomeLeaderboard();

  document.getElementById('btn-start').addEventListener('click', () => {
    showScreen('nickname');
    document.getElementById('nickname-input').focus();
  });
}

/**
 * Render top-5 all-time scores in the home screen preview.
 */
function renderHomeLeaderboard() {
  const list = document.getElementById('home-scores-list');
  const top5 = getAllTimeScores().slice(0, 5);
  list.innerHTML = '';

  if (top5.length === 0) {
    list.innerHTML = '<li class="lb-empty-preview">No scores yet — be the first!</li>';
    return;
  }

  const medals = ['🥇', '🥈', '🥉'];
  top5.forEach((entry, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="score-rank ${i < 3 ? 'top' : ''}">${medals[i] || (i + 1)}</span>
      <span class="score-nick">${escapeHtml(entry.nickname)}</span>
      <span class="score-pts">${entry.score} pts</span>
    `;
    list.appendChild(li);
  });
}


/* ─────────────────────────────────────────────────────────────
   7. NICKNAME SCREEN
   ─────────────────────────────────────────────────────────────── */
function initNicknameScreen() {
  const input   = document.getElementById('nickname-input');
  const errorEl = document.getElementById('nickname-error');

  document.getElementById('btn-back-home').addEventListener('click', () => {
    showScreen('home');
  });

  document.getElementById('btn-begin-quiz').addEventListener('click', () => {
    startQuizFromNickname();
  });

  // Allow Enter key to submit
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') startQuizFromNickname();
  });

  // Clear error on typing
  input.addEventListener('input', () => {
    errorEl.textContent = '';
    input.style.borderColor = '';
  });

  function startQuizFromNickname() {
    const value = input.value.trim();
    if (!value) {
      errorEl.textContent = 'Please enter a nickname.';
      input.focus();
      return;
    }
    if (value.length > 20) {
      errorEl.textContent = 'Max 20 characters.';
      input.focus();
      return;
    }
    errorEl.textContent = '';
    input.value = '';

    state.nickname = value;
    startQuiz();
  }
}


/* ─────────────────────────────────────────────────────────────
   8. QUIZ SCREEN
   ─────────────────────────────────────────────────────────────── */

/** Shuffle an array in place using Fisher-Yates. */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Initialise and start a quiz session. */
function startQuiz() {
  // Reset state
  state.score        = 0;
  state.correctCount = 0;
  state.currentIndex = 0;
  state.answered     = false;

  // Build the question list (clone so we can shuffle safely)
  state.questions = [...QUESTIONS];
  if (CONFIG.shuffleQuestions) shuffle(state.questions);

  // Update static UI elements
  document.getElementById('quiz-player-name').textContent = state.nickname;
  document.getElementById('q-total').textContent = state.questions.length;

  showScreen('quiz');
  renderQuestion();
}

/** Render the current question onto the quiz screen. */
function renderQuestion() {
  const q = state.questions[state.currentIndex];
  state.questionStartTime = performance.now();
  state.answered = false;

  // Progress bar
  const pct = (state.currentIndex / state.questions.length) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';

  // Counter & score
  document.getElementById('q-current').textContent = state.currentIndex + 1;
  document.getElementById('quiz-score-display').textContent = state.score + ' pts';

  // Question text
  document.getElementById('question-text').textContent = q.question;

 // Question image
  const imgWrapper = document.getElementById('question-image-wrapper');
  const imgEl = document.getElementById('question-image');

  if (q.image) {
    imgWrapper.style.display = 'block';
    imgEl.src = q.image;
    imgEl.alt = q.imageAlt || 'Question illustration';
  } else {
    imgWrapper.style.display = 'none';
    imgEl.removeAttribute('src');
    imgEl.alt = '';
  }
	
  // Build answer buttons
  const grid = document.getElementById('choices-grid');
  grid.innerHTML = '';

  const letters = ['A', 'B', 'C', 'D'];
  q.choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.dataset.index = idx;
    btn.innerHTML = `
      <span class="choice-letter">${letters[idx]}</span>
      <span class="choice-text">${escapeHtml(choice)}</span>
    `;
    btn.addEventListener('click', () => handleAnswer(idx));
    grid.appendChild(btn);
  });

  // Hide feedback bar
  const fb = document.getElementById('feedback-bar');
  fb.className = 'feedback-bar hidden';

	// Reset timebar
  const timeBar = document.getElementById('time-bar-fill');
  if (timeBar) {
    timeBar.style.transition = 'none';
    timeBar.style.transform = 'scaleX(1)';
    void timeBar.offsetWidth;
    timeBar.style.transition = `transform ${CONFIG.questionTimeLimitMs}ms linear`;
    timeBar.style.transform = 'scaleX(0)';
  }
	
// --- TIMER FOR EACH QUESTION: reset + start ---
  if (state.timerId) {
  clearTimeout(state.timerId);
  state.timerId = null;
}

// Starts a 10 s timer if configured
  if (CONFIG.questionTimeLimitMs && CONFIG.questionTimeLimitMs > 0) {
  state.timerId = setTimeout(() => {
    // if no answer is given, it is ticked "wrong"
    if (!state.answered) {
      handleAnswer(-1);
      }
    }, CONFIG.questionTimeLimitMs);
  }
}

/**
 * Handle the player tapping an answer choice.
 * @param {number} chosenIndex — 0-based index of the chosen choice
 */
function handleAnswer(chosenIndex) {
  if (state.answered) return; // block double-tap
	
  if (state.timerId) {
    clearTimeout(state.timerId);
    state.timerId = null;
  }
  state.answered = true;

  const q = state.questions[state.currentIndex];
  const isCorrect = (chosenIndex === q.correctIndex);

  // Update score
  if (isCorrect) {
  state.correctCount += 1;

  const now = performance.now();
  const elapsedMs = now - state.questionStartTime;
  const limit = CONFIG.questionTimeLimitMs || 10000; // fallback

  // fattore da 1 (0 ms) a 0 (limite ms)
  let factor = 1 - elapsedMs / limit;
  if (factor < 0) factor = 0;

  const gained = Math.round(CONFIG.pointsPerCorrect * factor);
  state.score += gained;
  }

  // Visual feedback on all buttons
  const grid    = document.getElementById('choices-grid');
  const buttons = grid.querySelectorAll('.choice-btn');
  buttons.forEach(btn => {
    btn.disabled = true;
    const idx = parseInt(btn.dataset.index, 10);
    if (idx === q.correctIndex)  btn.classList.add('correct');
    if (idx === chosenIndex && !isCorrect) btn.classList.add('incorrect');
  });

  // Update score display immediately
  document.getElementById('quiz-score-display').textContent = state.score + ' pts';

  // Show feedback bar
  const fb     = document.getElementById('feedback-bar');
  const fbIcon = document.getElementById('feedback-icon');
  const fbText = document.getElementById('feedback-text');

  if (isCorrect) {
    fb.className    = 'feedback-bar correct';
    fbIcon.textContent = '✓';
    fbText.textContent = 'Correct! +'gained' pts';
  } else {
    fb.className    = 'feedback-bar incorrect';
    fbIcon.textContent = '✗';
    fbText.textContent = 'Incorrect — the answer was ' +
      ['A', 'B', 'C', 'D'][q.correctIndex] + ': ' + q.choices[q.correctIndex];
  }

  // Advance after delay
  setTimeout(() => {
    state.currentIndex++;
    if (state.currentIndex < state.questions.length) {
      renderQuestion();
    } else {
      endQuiz();
    }
  }, CONFIG.feedbackDelay);
}


/* ─────────────────────────────────────────────────────────────
   9. RESULT SCREEN
   ─────────────────────────────────────────────────────────────── */

/** Called when all questions have been answered. */
function endQuiz() {
  // Persist the score
  saveScore(state.nickname, state.score);

  // Compute rank
  const rank = getRankOfScore(state.score);

  // Decide emoji badge based on performance
  const pct = state.correctCount / state.questions.length;
  let badge = '🧠';
  if (pct === 1)       badge = '🏆';
  else if (pct >= 0.8) badge = '⭐';
  else if (pct >= 0.6) badge = '🎯';

  // Populate result screen
  document.getElementById('result-badge').textContent   = badge;
  document.getElementById('result-name').textContent    = state.nickname;
  document.getElementById('result-score').textContent   = state.score + ' pts';
  document.getElementById('result-correct').textContent =
    `${state.correctCount} correct out of ${state.questions.length}`;

  // Rank message
  const rankMsg = document.getElementById('result-rank-msg');
  if (rank === 1)       rankMsg.textContent = '🎉 New all-time #1!';
  else if (rank <= 3)   rankMsg.textContent = `🏅 You are #${rank} all time!`;
  else if (rank <= 10)  rankMsg.textContent = `You are ranked #${rank} all time.`;
  else                  rankMsg.textContent = '';

  showScreen('result');

  // Update home leaderboard in background so it's fresh when returning
  renderHomeLeaderboard();
}

function initResultScreen() {
  document.getElementById('btn-view-leaderboard').addEventListener('click', () => {
    showScreen('leaderboard');
    renderLeaderboard();
  });

  document.getElementById('btn-new-player').addEventListener('click', () => {
    showScreen('nickname');
    document.getElementById('nickname-input').focus();
  });
}


/* ─────────────────────────────────────────────────────────────
  10. LEADERBOARD SCREEN
   ─────────────────────────────────────────────────────────────── */
function initLeaderboardScreen() {
  document.getElementById('btn-back-from-lb').addEventListener('click', () => {
    showScreen('home');
  });

  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const which = tab.dataset.tab; // 'today' | 'alltime'
      document.getElementById('lb-today').classList.toggle('active',   which === 'today');
      document.getElementById('lb-alltime').classList.toggle('active', which === 'alltime');
    });
  });
}

/** Build and render both leaderboard panels. */
function renderLeaderboard() {
  // Default to today tab
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-today').classList.add('active');
  document.getElementById('lb-today').classList.add('active');
  document.getElementById('lb-alltime').classList.remove('active');

  renderScoreList(
    'lb-today-list',
    'lb-today-empty',
    getTodayScores(),
    true   // show date? false for today (redundant), true for all-time
  );
  renderScoreList(
    'lb-alltime-list',
    'lb-alltime-empty',
    getAllTimeScores(),
    true
  );
}

/**
 * Populate a <ol> leaderboard list.
 * @param {string}  listId    — element ID of the <ol>
 * @param {string}  emptyId   — element ID of the empty-state <p>
 * @param {Array}   entries   — array of { nickname, score, isoDate }
 * @param {boolean} showDate
 */
function renderScoreList(listId, emptyId, entries, showDate) {
  const list    = document.getElementById(listId);
  const emptyEl = document.getElementById(emptyId);
  list.innerHTML = '';

  if (entries.length === 0) {
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  const medals = ['🥇', '🥈', '🥉'];
  entries.forEach((entry, i) => {
    const rank = i + 1;
    const li   = document.createElement('li');
    li.classList.add(`rank-${Math.min(rank, 4)}`);   // rank-1, rank-2, rank-3, rank-4+
    li.innerHTML = `
      <span class="lb-rank">${medals[i] || rank}</span>
      <span class="lb-nick">${escapeHtml(entry.nickname)}</span>
      ${showDate ? `<span class="lb-date">${formatDate(entry.isoDate)}</span>` : ''}
      <span class="lb-pts">${entry.score}</span>
    `;
    list.appendChild(li);
  });
}


/* ─────────────────────────────────────────────────────────────
  11. STAFF RESET
   ─────────────────────────────────────────────────────────────── */
function initResetButton() {
  const btn = document.getElementById('btn-reset');

  btn.addEventListener('click', () => {
    const pwd = window.prompt(
      'STAFF ONLY\n\nEnter password to reset all scores:'
    );
    if (!pwd) return;
    if (pwd !== CONFIG.resetPassword) {
      alert('Incorrect password.');
      return;
    }
    const confirmed = window.confirm(
      '⚠️ This will permanently delete ALL quiz scores from this device.\n\nAre you sure?'
    );
    if (confirmed) {
      localStorage.removeItem(STORAGE_KEY);
      renderHomeLeaderboard();
      alert('All scores have been reset.');
    }
  });

  // Hidden keyboard shortcut: Ctrl + Shift + R  (alternative for staff on keyboard)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'R') {
      btn.click();
    }
  });
}


/* ─────────────────────────────────────────────────────────────
  12. UTILITY
   ─────────────────────────────────────────────────────────────── */

/**
 * Sanitise a string for safe innerHTML insertion.
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


/* ─────────────────────────────────────────────────────────────
  13. INIT — wire everything up on DOMContentLoaded
   ─────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHomeScreen();
  initNicknameScreen();
  initResultScreen();
  initLeaderboardScreen();
  initResetButton();

  // Start on the home screen
  showScreen('home');
});
