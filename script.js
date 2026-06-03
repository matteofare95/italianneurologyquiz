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
    question: "Luigi Amaducci is best known for his contributions to which area of neurology?",
    choices: [
      "Drug-resistant epilepsy",
      "Dementias, especially Alzheimer's disease",
      "Neuromuscular diseases",
      "Primary headaches"
    ],
    correctIndex: 1,
    image: "img/amaducci_portrait.jpeg"
  },
  {
    question: "In which year was the Italian Society of Neurology (Società Italiana di Neurologia, SIN) founded as an independent society?",
    choices: ["1873", "1907", "1950", "1971"],
    correctIndex: 1,
    image: "img/sin_historical_document.jpeg"
  },
  {
    question: "From which Italian city did the family originate in which the first pathogenic SNCA (alpha-synuclein) variant was identified?",
    choices: ["Contursi", "Eboli", "Tufariello", "Battipaglia"],
    correctIndex: 0,
    image: "img/campania_map.jpeg"
  },
  {
    question: "Which Italian scientist developed the \"Black Reaction\" staining method that revolutionized the study of the nervous system?",
    choices: [
      "Camillo Golgi",
      "Ugo Cerletti",
      "Giuseppe Moruzzi",
      "Rita Levi-Montalcini"
    ],
    correctIndex: 0,
    image: "img/golgi_staining.jpeg"
  },
  {
    question: "Which Italian scientist discovered the Nerve Growth Factor (NGF), leading to a Nobel Prize in 1986?",
    choices: [
      "Giuseppe Moruzzi",
      "Guido Fanconi",
      "Rita Levi-Montalcini",
      "Lucio Bini"
    ],
    correctIndex: 2,
    image: "img/montalcini_lab.jpeg"
  },
  {
    question: "The clinical maneuver named after Italian neurologist Giovanni Mingazzini is primarily used to detect:",
    choices: [
      "Subtle motor weakness of the limbs",
      "Cerebellar ataxia",
      "Sensory extinction",
      "Rigidity"
    ],
    correctIndex: 0,
    image: "img/mingazzini_sign.jpeg"
  },
  {
    question: "Which Italian neurologist is credited with founding the integrated model of a university neurological clinic and neurological institute in Pavia?",
    choices: [
      "Casimiro Mondino",
      "Carlo Besta",
      "Beniamino Guidetti",
      "Marino Quarti Trevano"
    ],
    correctIndex: 0,
    image: "img/mondino_institute.jpeg"
  },
  {
    question: "Which Italian researcher collaborated with Alois Alzheimer and co-authored the first descriptions of the histopathological hallmarks — neuritic plaques and neurofibrillary tangles — of Alzheimer's disease?",
    choices: [
      "Gaetano Perusini",
      "Ettore Marchiafava",
      "Amico Bignami",
      "Ugo Cerletti"
    ],
    correctIndex: 0,
    image: "img/alzheimer_plaques_tangles.jpeg"
  },
  {
    question: "Marchiafava-Bignami disease is a rare, progressive neurological disorder characterized by demyelination and necrosis of the corpus callosum. It was historically associated with the consumption of what specific substance?",
    choices: [
      "Contaminated well water",
      "Cheap, homemade red wine",
      "Ergot-tainted rye bread",
      "Heavy metal industrial toxins"
    ],
    correctIndex: 1,
    image: "img/marchiafava_mri.jpeg"
  },
  {
    question: "In 1949, Giuseppe Moruzzi and H.W. Magoun published landmark research that transformed our understanding of arousal and wakefulness. Which brainstem system did they describe?",
    choices: [
      "Extrapyramidal system",
      "Reticular Activating System (RAS)",
      "Limbic System",
      "Vestibulocochlear Pathway"
    ],
    correctIndex: 1,
    image: "img/sleep_eeg.jpeg"
  },
  {
    question: "Which Italian physician and anatomist first described the pons in the brainstem?",
    choices: [
      "Camillo Golgi",
      "Costanzo Varolio",
      "Angelo Mosso",
      "Cesare Lombroso"
    ],
    correctIndex: 1,
    image: "img/brainstem_pons.jpeg"
  },
  {
    question: "Which Italian neurologist co-developed electroconvulsive therapy (ECT)?",
    choices: [
      "Giuseppe Moruzzi",
      "Ugo Cerletti",
      "Carlo Besta",
      "Edoardo Bisiach"
    ],
    correctIndex: 1,
    image: "img/cerletti_ect.jpeg"
  },
  {
    question: "\"Mirror neurons\" were first discovered by researchers at which Italian university?",
    choices: ["Trieste", "Catania", "Parma", "Pisa"],
    correctIndex: 2,
    image: "img/mirror_neurons.jpeg"
  },
  {
    question: "Camillo Golgi shared the 1906 Nobel Prize with which Spanish neuroscientist?",
    choices: [
      "Santiago Ramón y Cajal",
      "Severo Ochoa",
      "Luis Simarro",
      "Miguel Servet"
    ],
    correctIndex: 0,
    image: "img/golgi_cells.jpeg"
  },
  {
    question: "In which Italian city was electroconvulsive therapy (ECT) first performed in 1938?",
    choices: ["Milan", "Turin", "Rome", "Naples"],
    correctIndex: 2,
    image: "img/neurologia_sapienza.jpeg"
  },
  {
    question: "Which Italian neurologist first proposed that visual hallucinations arise from the spontaneous activation of the visual cortex?",
    choices: [
      "Augusto Tamburini",
      "Camillo Golgi",
      "Carlo Besta",
      "Giuseppe Moruzzi"
    ],
    correctIndex: 0,
    image: "img/visual_pathways.jpeg"
  },
  {
    question: "The \"Head-Turning Sign\", in which a patient turns toward a caregiver for help when answering questions during cognitive assessment, was first described by which Italian neurologist?",
    choices: [
      "Carlo Besta",
      "Luigi Amaducci",
      "Edoardo Bisiach",
      "Giuseppe Moruzzi"
    ],
    correctIndex: 1,
    image: "img/head_turning_sign.jpeg"
  },
  {
    question: "Angelo Mosso, a 19th-century Italian physiologist in Turin, invented a device that recorded changes in brain blood flow during mental activity — a principle that foreshadows which modern neuroimaging technique?",
    choices: [
      "Electroencephalography (EEG)",
      "Functional MRI (fMRI)",
      "Positron Emission Tomography (PET)",
      "Transcranial Magnetic Stimulation (TMS)"
    ],
    correctIndex: 1,
    image: "img/mosso_portrait.jpeg"
  },
  {
    question: "Which Italian physician first argued that epilepsy results from excessive cortical neuronal discharge, rather than supernatural causes?",
    choices: [
      "Augusto Tamburini",
      "Ugo Cerletti",
      "Camillo Golgi",
      "Leonardo Bianchi"
    ],
    correctIndex: 0,
    image: "img/tamburini_portrait.jpeg"
  },
  {
    question: "Which Italian neurologist is notable for his early descriptions of what is now recognized as Parkinson's disease in Italy, as well as for his systematic work on tendon reflexes?",
    choices: [
      "Camillo Golgi",
      "Cesare Lombroso",
      "Giovanni Mingazzini",
      "Augusto Tamburini"
    ],
    correctIndex: 2,
    image: "img/mingazzini_portrait.jpeg"
  },
  {
    question: "Which of the following best represents the Italian school's landmark contribution to cerebellar pathophysiology?",
    choices: [
      "Description of Purkinje cells",
      "Studies on the cerebellum in muscle tone and coordination",
      "Discovery of the red nucleus",
      "Identification of the extrapyramidal system"
    ],
    correctIndex: 1,
    image: "img/cerebellum_diagram.jpeg"
  },
  {
    question: "Which famous Italian square was used by Edoardo Bisiach in the classic experiment that demonstrated neglect of imagined space?",
    choices: [
      "Piazza San Marco, Venice",
      "Piazza del Duomo, Milan",
      "Piazza Navona, Rome",
      "Piazza della Signoria, Florence"
    ],
    correctIndex: 1,
    image: "img/bisiach_duomo_neglect.jpeg"
  },
  {
    question: "Which Italian neurologist made seminal contributions to the study of aphasia, apraxia, and agnosia, establishing himself as a leading figure in European neuropsychology?",
    choices: [
      "Ugo Cerletti",
      "Ennio De Renzi",
      "Giuseppe Moruzzi",
      "Camillo Golgi"
    ],
    correctIndex: 1,
    image: "img/derenzi_portrait.jpeg"
  },
  {
    question: "Who is considered one of the founding figures of modern Italian neurology and was associated with the early neurological school in Turin?",
    choices: [
      "Cesare Lombroso",
      "Ugo Cerletti",
      "Enrico Morselli",
      "Beniamino Guidetti"
    ],
    correctIndex: 0,
    image: "img/lombroso_painting.jpeg"
  },
  {
    question: "Who is the current President of the Italian Society of Neurology (Società Italiana di Neurologia, SIN)?",
    choices: [
      "Gioacchino Tedeschi",
      "Alessandro Padovani",
      "Mario Zappia",
      "Alfredo Berardelli"
    ],
    correctIndex: 2,
    image: "img/sin_logo.jpeg"
  },
  {
    question: "In 1855 physiologist Bartolomeo Panizza made a landmark discovery on cortical localization. What did he demonstrate?",
    choices: [
      "That the cerebellum controls voluntary movement",
      "That the occipital cortex is the cortical center for vision",
      "That the optic nerve decussates completely at the optic chiasm",
      "That visual hallucinations arise from the temporal lobe"
    ],
    correctIndex: 1,
    image: "img/visual_pathways.jpeg"
  },  
  {
    question: "How many training programmes in neurology are there in Italy? ",
    choices: [
      "32",
      "27",
      "39",
      "50"
    ],
    correctIndex: 2,
    image: "img/italy_map.jpeg"
  },  
  {
    question: "Which of the following are among the main scientific and territorial structures of the Italian Society of Neurology (Società Italiana di Neurologia, SIN)?",
    choices: [
      "National Boards, Specialty Colleges, and Scientific Councils",
      "Study Groups, Regional Sections, and Affiliated Autonomous Associations",
      "Research Committees, Clinical Networks, and Educational Panels",
      "European Committees, Task Forces, and Regional Academies"
    ],
    correctIndex: 1,
  },
  {
    question: "Which city will host the 56th National Congress of the Italian Society of Neurology (Società Italiana di Neurologia, SIN) in 2026?",
    choices: [
      "Florence",
      "Naples",
      "Rome",
      "Padua"
    ],
    correctIndex: 0,
    image: "img/florence.jpeg"
  },
  {
    question: "What is the official journal of the Italian Society of Neurology (Società Italiana di Neurologia, SIN)?",
    choices: [
      "Journal of Neurology",
      "European Journal of Neurology",
      "Neurological Sciences",
      "Brain"
    ],
    correctIndex: 2
  }
];
  /*
    ── PASTE ADDITIONAL QUESTIONS BELOW THIS LINE ──
    Example template:
    {
      question: "Your question text here?",
      choices: ["Option A", "Option B", "Option C", "Option D"],
      correctIndex: 0,   // 0 = A, 1 = B, 2 = C, 3 = D
	  image: "img/image_name", //delete field if not used
      imageAlt: "description"  //delete field if not used
    },
  */


/* ─────────────────────────────────────────────────────────────
   2. CONFIG
   ─────────────────────────────────────────────────────────────── */
const CONFIG = {
  questionsPerGame: 10,   
  pointsPerCorrect:  100,        // points awarded for a correct answer
  feedbackDelay:     2500,       // ms before advancing to next question
  maxLeaderboardEntries: 2000,     // max stored scores
  shuffleQuestions:  true,       // randomise order each game
  shuffleChoices:    true,      // if true, randomise choice order (keep false unless you re-map correctIndex)
  questionTimeLimitMs: 20000,  // 20 seconds for question
  resetPassword: 'Cannella2026'
};

const STORAGE_KEY = 'neurologyQuizScores'; // localStorage key


/* ─────────────────────────────────────────────────────────────
   3. GAME STATE
   ─────────────────────────────────────────────────────────────── */
let leaderboardRefreshTimer = null;
const state = {
  nickname: '',
  questions: [],      // working copy (possibly shuffled)
  currentIndex: 0,
  score: 0,
  correctCount: 0,
  answered: false,    // prevents double-tap
  timerId: null,
  questionStartTime: 0, // timestamp in ms
  leaderboardTab: 'today'
};


/* ─────────────────────────────────────────────────────────────
   4. FIRESTORE HELPERS
   ─────────────────────────────────────────────────────────────── */

/*Read all scores from Firestore, DESC ordered
 */
async function loadScores() {
  const snapshot = await db
    .collection('scores')
    .orderBy('score', 'desc')
    .limit(CONFIG.maxLeaderboardEntries)
    .get();

  const results = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    results.push({
      nickname: data.nickname,
      score: data.score,
      isoDate: data.isoDate
    });
  });
  return results;
}

// Given an array { nickname, score, isoDate } it gets
// only the best score for nickname, ordered DESC per score
function collapseBestScorePerNickname(entries) {
  const bestMap = new Map(); // nickname -> { nickname, score, isoDate }

  entries.forEach((entry) => {
    const existing = bestMap.get(entry.nickname);
    if (!existing || entry.score > existing.score) {
      bestMap.set(entry.nickname, entry);
    }
  });

  const collapsed = Array.from(bestMap.values());
  collapsed.sort((a, b) => b.score - a.score);
  return collapsed;
}

/**
 * Save a new score entry, then trim to max entries sorted by score DESC.
 * @param {string} nickname
 * @param {number} score
 */
async function saveScore(nickname, score) {
  const isoDate = new Date().toISOString();

  await db.collection('scores').add({
    nickname: nickname,
    score: score,
    isoDate: isoDate
  });
}

/**
 * Return scores for today (local date), sorted by score DESC.
 */
async function getTodayScores() {
  const raw = await loadScores();
  const collapsed = collapseBestScorePerNickname(raw);
  const todayStr = new Date().toLocaleDateString();
  const todayOnly = collapsed.filter((entry) => {
    return new Date(entry.isoDate).toLocaleDateString() === todayStr;
  });
  return todayOnly.slice(0, CONFIG.maxLeaderboardEntries);
}

/**
 * Return all scores, sorted by score DESC.
 */
async function getAllTimeScores() {
  const raw = await loadScores();
  const collapsed = collapseBestScorePerNickname(raw);
  // opzionale: applica il limite maxLeaderboardEntries anche qui
  return collapsed.slice(0, CONFIG.maxLeaderboardEntries);
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
function getRankOfScore(score, allScores) {
  const pos = allScores.findIndex((e) => e.score === score);
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
    el.classList.toggle("active", key === name);
    if (key === name) el.scrollTop = 0;
  });

  // ── Leaderboard auto-refresh ──────────────────────────
  if (name === "leaderboard") {
    // Avvia il polling se non è già attivo
    if (!leaderboardRefreshTimer) {
      leaderboardRefreshTimer = setInterval(() => {
        renderLeaderboard();
      }, 10000);
    }
  } else {
    // Ferma il polling quando si lascia la leaderboard
    if (leaderboardRefreshTimer) {
      clearInterval(leaderboardRefreshTimer);
      leaderboardRefreshTimer = null;
    }
  }
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

  document
  .getElementById('btn-view-leaderboard-home')
  .addEventListener('click', () => {
    showScreen('leaderboard');
    renderLeaderboard();
  });
}

/**
 * Render top-5 all-time scores in the home screen preview.
 */
async function renderHomeLeaderboard() {
  const list = document.getElementById('home-scores-list');
  const all = await getAllTimeScores();
  const top5 = all.slice(0, 5);
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

  // Mescola tutte le domande e prendi solo le prime questionsPerGame
  const pool = [...QUESTIONS];
  shuffle(pool);
  state.questions = pool.slice(0, CONFIG.questionsPerGame);

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
  const imgWrapper = document.getElementById("question-image-wrapper");
const imgEl = document.getElementById("question-image");
const captionEl = document.getElementById("question-image-caption");

if (q.image) {
  imgWrapper.style.display = "block";
  imgEl.src = q.image;
  imgEl.alt = q.imageAlt || "Question illustration";

  if (q.imageAlt && q.imageAlt.trim() !== "") {
    captionEl.textContent = q.imageAlt;
    captionEl.style.display = "block";
  } else {
    captionEl.textContent = "";
    captionEl.style.display = "none";
  }
} else {
  imgWrapper.style.display = "none";
  imgEl.removeAttribute("src");
  imgEl.alt = "";
  captionEl.textContent = "";
  captionEl.style.display = "none";
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
    fbText.textContent = 'Correct! The answer is right';
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
async function endQuiz() {
  // Persist the score
  await saveScore(state.nickname, state.score);

  // Compute rank
  const allScores = await getAllTimeScores();
  const rank = getRankOfScore(state.score, allScores);

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
  document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    state.leaderboardTab = tab.dataset.tab;

    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    document
      .getElementById('lb-today')
      .classList.toggle('active', state.leaderboardTab === 'today');

    document
      .getElementById('lb-alltime')
      .classList.toggle('active', state.leaderboardTab === 'alltime');
  });
});
}

/** Build and render both leaderboard panels. */
async function renderLeaderboard() {
	document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
	document
 	 .getElementById('tab-today')
 	 .classList.toggle('active', state.leaderboardTab === 'today');
	document
	  .getElementById('tab-alltime')
	  .classList.toggle('active', state.leaderboardTab === 'alltime');
	document
	  .getElementById('lb-today')
	  .classList.toggle('active', state.leaderboardTab === 'today');
	document
	  .getElementById('lb-alltime')
	  .classList.toggle('active', state.leaderboardTab === 'alltime');

  const today = await getTodayScores();
  const all = await getAllTimeScores();
  
  renderScoreList(
    'lb-today-list',
    'lb-today-empty',
    today,
    true   // show date? false for today (redundant), true for all-time
  );
  renderScoreList(
    'lb-alltime-list',
    'lb-alltime-empty',
    all,
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
async function resetAllScores() {
  const snapshot = await db.collection('scores').get();
  const batch = db.batch();
  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
}

function initResetButton() {
  const btn = document.getElementById('btn-reset');

  btn.addEventListener('click', async () => {
  const pwd = window.prompt(
    'STAFF ONLY\n\nEnter password to reset all scores:'
  );
  if (!pwd) return;
  if (pwd !== CONFIG.resetPassword) {
    alert('Incorrect password.');
    return;
  }
  const confirmed = window.confirm(
    '⚠️ This will permanently delete ALL quiz scores from the server.\n\nAre you sure?'
  );
  if (confirmed) {
    await resetAllScores();
    await renderHomeLeaderboard();
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
