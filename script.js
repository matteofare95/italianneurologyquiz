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
    image: "img/amaducci_portrait",
    imageAlt: "Portrait photograph of Luigi Amaducci"
  },
  {
    question: "In which year was the Italian Society of Neurology (Società Italiana di Neurologia, SIN) founded as an independent society?",
    choices: ["1873", "1907", "1950", "1971"],
    correctIndex: 1,
    image: "img/sin_historical_document",
    imageAlt: "Historical founding document of the Italian Society of Neurology (SIN), dated 1907"
  },
  {
    question: "From which Italian city did the family originate in which the first pathogenic SNCA (alpha-synuclein) variant was identified?",
    choices: ["Contursi", "Eboli", "Tufariello", "Battipaglia"],
    correctIndex: 0,
    image: "img/campania_map",
    imageAlt: "Map of the Campania region in southern Italy"
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
    image: "img/golgi_staining",
    imageAlt: "Microscopic image of neurons stained using the Golgi \"Black Reaction\" technique"
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
    image: "img/montalcini_lab",
    imageAlt: "Portrait photograph of Rita Levi-Montalcini in her laboratory, surrounded by microscopes and scientific equipment"
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
    image: "img/mingazzini_sign",
    imageAlt: "Representation of the Mingazzini I maneuver, to assess subtle strength changes in the upper limbs"
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
    image: "img/mondino_institute",
    imageAlt: "Photograph of the façade of the Mondino Neurological Institute in Pavia"
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
    image: "img/alzheimer_plaques_tangles",
    imageAlt: "Histopathological microscopy image showing amyloid plaques and neurofibrillary tangles in brain tissue"
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
    image: "img/marchiafava_mri",
    imageAlt: "Brain MRI showing signal abnormality and necrosis of the corpus callosum in a patient with Marchiafava-Bignami disease"
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
    image: "img/sleep_eeg",
    imageAlt: "Polysomnography EEG tracing showing different stages of sleep and wakefulness"
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
    image: "img/brainstem_pons",
    imageAlt: "Anatomical illustration of the human brainstem, with the pons highlighted and labeled"
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
    image: "img/cerletti_ect",
    imageAlt: "Historical black-and-white photograph of Ugo Cerletti alongside early electroconvulsive therapy (ECT) equipment, circa 1938"
  },
  {
    question: "\"Mirror neurons\" were first discovered by researchers at which Italian university?",
    choices: ["Rome", "Milan", "Parma", "Pisa"],
    correctIndex: 2,
    image: "img/mirror_neurons",
    imageAlt: "Schematic diagram illustrating a mirror neuron firing both when an action is performed and when the same action is observed in another individual"
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
    image: "img/golgi_cells",
    imageAlt: "Immunofluorescence image of Golgi cerebellar cells"
  },
  {
    question: "In which Italian city was electroconvulsive therapy (ECT) first performed in 1938?",
    choices: ["Milan", "Turin", "Rome", "Naples"],
    correctIndex: 2,
    image: "img/neurologia_sapienza",
    imageAlt: "Historical photograph of the façade of the Istituto di Neurologia, Sapienza University — Policlinico Umberto I, Rome"
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
    image: "img/visual_pathways",
    imageAlt: "Illustration of the occipital cortex and visual pathways, with the primary visual cortex (V1) highlighted in the posterior pole of the brain"
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
    image: "img/head_turning_sign"
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
    image: "img/mosso_portrait",
    imageAlt: "Portrait photograph of Angelo Mosso"
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
    image: "img/tamburini_portrait",
    imageAlt: "Portrait of Augusto Tamburini"
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
    image: "img/mingazzini_portrait",
    imageAlt: "Historical portrait photograph of Giovanni Mingazzini, Italian neurologist"
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
    image: "img/cerebellum_diagram",
    imageAlt: "Diagram of the cerebellum with functional areas labeled, highlighting the regions involved in muscle tone regulation and motor coordination"
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
    image: "img/bisiach_duomo_neglect",
    imageAlt: "Split illustration of Piazza del Duomo in Milan: the right half is shown in full detail while the left half is faded"
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
    image: "img/derenzi_portrait",
    imageAlt: "Portrait photograph of Ennio De Renzi, Italian neuropsychologist"
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
    image: "img/lombroso_painting",
    imageAlt: "Historical portrait painting of Cesare Lombroso, Italian physician and criminologist"
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
    image: "img/sin_logo",
    imageAlt: "Official logo of the Società Italiana di Neurologia (SIN)"
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
async function renderLeaderboard() {
  // Default to today tab
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-today').classList.add('active');
  document.getElementById('lb-today').classList.add('active');
  document.getElementById('lb-alltime').classList.remove('active');

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
