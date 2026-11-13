/**
 * Memory Garden — Comprehensive Bio-Maths Engine
 * Features: Ebbinghaus forgetting curve, plant evolution, weather canvas,
 * Pomodoro timer, cramming vs spaced comparison, math sandbox,
 * streak system, CSV export, circadian quiz, exam planner
 */

// =============================================================================
// 1. CONSTANTS & DATA
// =============================================================================

const DEMO_CHAPTERS = [
  {
    id: "ch-bio-1",
    title: "Photosynthesis: Light Reactions & Calvin Cycle",
    subject: "Biology",
    plantType: "tree",
    dateStudied: daysAgo(6),
    lastWatered: daysAgo(6),
    revisions: 0,
    difficulty: 2,
    stability: 2.1,
    question: "What molecule supplies electrons to PS II, and which enzyme fixes CO₂ in the Calvin cycle?",
    answer: "Photolysis of water (H₂O → O₂ + 4H⁺ + 4e⁻) supplies PS II; RuBisCO fixes CO₂ onto RuBP.",
    feynman: "Water gets cracked open by sunlight like an egg, donating electrons; RuBisCO plucks CO₂ from thin air to weave living plant sugars."
  },
  {
    id: "ch-chem-1",
    title: "Aldehydes, Ketones & Nucleophilic Addition",
    subject: "Chemistry",
    plantType: "grape",
    dateStudied: daysAgo(8),
    lastWatered: daysAgo(3),
    revisions: 2,
    difficulty: 2,
    stability: 5.4,
    question: "Why are aldehydes more reactive than ketones toward nucleophilic addition?",
    answer: "Aldehydes experience less steric hindrance (one H vs two alkyl groups) and have a more electrophilic carbonyl carbon.",
    feynman: "An aldehyde has an open, undefended flank—just a tiny hydrogen—letting nucleophiles strike easily like ripe grapes ready to harvest!"
  },
  {
    id: "ch-math-1",
    title: "Matrix Inverses, Determinants & Eigenvalues",
    subject: "Mathematics",
    plantType: "sunflower",
    dateStudied: daysAgo(4),
    lastWatered: daysAgo(4),
    revisions: 1,
    difficulty: 3,
    stability: 3.2,
    question: "What geometric condition guarantees A⁻¹ exists, and what does det(A) = 0 signify?",
    answer: "det(A) ≠ 0. If det(A) = 0, the matrix squashes an n-dimensional space into lower dimensions (zero area/volume), so it cannot be inverted.",
    feynman: "Like sunflower seeds radiating in 2D spirals, a matrix stretches space. If determinant is zero, space is squashed flat into a line—you can never un-squash it."
  },
  {
    id: "ch-phys-1",
    title: "Electromagnetic Induction & Faraday's Law",
    subject: "Physics",
    plantType: "tree",
    dateStudied: daysAgo(12),
    lastWatered: daysAgo(12),
    revisions: 0,
    difficulty: 3,
    stability: 1.8,
    question: "State Faraday's Law and explain the physical significance of the minus sign (Lenz's Law).",
    answer: "ε = −dΦ/dt. The negative sign means induced EMF creates a current whose magnetic field opposes the original flux change.",
    feynman: "Nature hates abrupt magnetic shifts: push a magnet into a living wire coil, and the current fights back like resilient tree roots holding their ground."
  },
  {
    id: "ch-bio-2",
    title: "Neurobiology: Action Potentials & Synapses",
    subject: "Biology",
    plantType: "cactus",
    dateStudied: daysAgo(1),
    lastWatered: daysAgo(1),
    revisions: 0,
    difficulty: 2,
    stability: 2.0,
    question: "Which ion channels trigger depolarization, and what is the resting membrane potential?",
    answer: "Voltage-gated Na⁺ channels open rapidly, allowing Na⁺ influx. Resting potential is approximately −70 mV.",
    feynman: "Like a desert cactus bristling with sharp needles, a neuron stays primed at −70 mV; touch threshold and sodium floodgates fire a lightning spike!"
  },
  {
    id: "ch-chem-2",
    title: "Coordination Compounds & Crystal Field Theory",
    subject: "Chemistry",
    plantType: "grape",
    dateStudied: daysAgo(5),
    lastWatered: daysAgo(5),
    revisions: 1,
    difficulty: 2,
    stability: 2.6,
    question: "How does crystal field splitting (Δₒ) explain the vibrant purple/blue colors of transition metal complexes?",
    answer: "Ligand electron fields split d-orbitals into t₂g and e_g; absorbed visible photons promote d-d transitions, transmitting the complementary hue.",
    feynman: "Surrounding ligands push the metal's d-orbitals onto different energy shelves like hanging grape clusters—absorbed yellow light makes grapes gleam royal violet!"
  },
  {
    id: "ch-math-2",
    title: "Dynamic Programming & Bellman Optimality",
    subject: "Mathematics",
    plantType: "blossom",
    dateStudied: daysAgo(2),
    lastWatered: daysAgo(2),
    revisions: 1,
    difficulty: 3,
    stability: 3.5,
    question: "What two properties must a problem satisfy to be solvable with Dynamic Programming?",
    answer: "1. Optimal Substructure (optimal global solution is made of optimal sub-solutions). 2. Overlapping Subproblems.",
    feynman: "Don't count the petals on every new rosebud from scratch; store past sub-solutions in memory so you only calculate each branch once."
  },
  {
    id: "ch-phys-2",
    title: "Wave Optics: Young's Double Slit & Diffraction",
    subject: "Physics",
    plantType: "sunflower",
    dateStudied: daysAgo(9),
    lastWatered: daysAgo(9),
    revisions: 0,
    difficulty: 2,
    stability: 1.9,
    question: "Write the fringe width expression β in Young's Double Slit Experiment and describe how slit distance affects it.",
    answer: "β = λD / d. Fringe width is inversely proportional to slit distance d and directly proportional to screen distance D and wavelength λ.",
    feynman: "Like sunlight rippling through overlapping sunflower petals, light waves crest and trough together, painting alternating bright and dark stripes."
  },
  {
    id: "ch-cs-1",
    title: "Self-Balancing Trees: AVL Rotations & Red-Black Invariants",
    subject: "Mathematics",
    plantType: "tree",
    dateStudied: daysAgo(3),
    lastWatered: daysAgo(3),
    revisions: 2,
    difficulty: 3,
    stability: 4.8,
    question: "What is the maximum balance factor allowed in an AVL tree, and when is a double rotation (LR/RL) needed?",
    answer: "Balance factor must be in {-1, 0, +1}. A double rotation is required when the insertion creates a 'zig-zag' imbalance (left-right or right-left).",
    feynman: "Just like pruning a bonsai tree so heavy boughs don't topple the trunk, an AVL tree swings its branches around to guarantee O(log n) height."
  },
  {
    id: "ch-phys-3",
    title: "Thermodynamics & Carnot Engine Efficiency",
    subject: "Physics",
    plantType: "cactus",
    dateStudied: daysAgo(7),
    lastWatered: daysAgo(2),
    revisions: 2,
    difficulty: 2,
    stability: 4.2,
    question: "What is the maximum theoretical efficiency η of a Carnot heat engine operating between T_H and T_C?",
    answer: "η = 1 − (T_C / T_H), where temperatures are in Kelvin. It is the upper limit for any cyclic heat engine.",
    feynman: "Like a desert cactus surviving between blistering daylight heat and freezing desert night, heat engines can only convert work from the temperature difference!"
  }
];

// =============================================================================
// 2. APP STATE
// =============================================================================

let state = {
  chapters: [],
  simDays: 0,
  filter: "all",
  wateringId: null,
  recallFactor: 2.0,
  chronotype: localStorage.getItem("mg_chronotype") || "third_bird",
  streak: parseInt(localStorage.getItem("mg_streak") || "0"),
  lastStudyDate: localStorage.getItem("mg_last_study") || "",
  pomo: {
    running: false, paused: false,
    totalSecs: 25 * 60, remainingSecs: 25 * 60,
    phase: "focus", sessionCount: parseInt(localStorage.getItem("mg_pomo_sessions") || "0"),
    totalMins: parseInt(localStorage.getItem("mg_pomo_mins") || "0"),
    chapterId: null, intervalId: null, history: []
  },
  exam: JSON.parse(localStorage.getItem("mg_exam") || JSON.stringify({
    name:"Board Final Exams", date:futureDate(21), target:0.85
  })),
  sound: { enabled: false, ctx: null, nodes: [] },
  sandbox: { s0:2.0, lambda:0.5, k:2.0, revisions:3 },
  compareChart: null, retentionChart: null, sandboxChart: null
};

// =============================================================================
// 3. MATH ENGINE — Ebbinghaus R = e^(-t/S)
// =============================================================================

function retention(chapter, extraDays = 0) {
  const elapsed = daysSince(chapter.lastWatered) + extraDays;
  const S = Math.max(0.5, chapter.stability);
  return Math.min(1, Math.max(0.01, Math.exp(-elapsed / S)));
}

function halfLife(S) { return (S * Math.LN2).toFixed(1); }

function wiltStage(r) {
  if (r >= 0.80) return { stage:"thriving", label:"Thriving",    retClass:"ret-thriving", cardClass:"stage-thriving", stem:"#10b981", leaf:"#22c55e", flower:"#facc15", urgent:false };
  if (r >= 0.60) return { stage:"stable",   label:"Stable",      retClass:"ret-stable",   cardClass:"stage-stable",   stem:"#84cc16", leaf:"#a3e635", flower:"#fde047", urgent:false };
  if (r >= 0.40) return { stage:"wilting",  label:"Wilting 🥀",  retClass:"ret-wilting",  cardClass:"stage-wilting",  stem:"#d97706", leaf:"#f59e0b", flower:"#fbbf24", urgent:true  };
  return               { stage:"withered", label:"Withered 🍂", retClass:"ret-withered", cardClass:"stage-withered", stem:"#78350f", leaf:"#b45309", flower:"#92400e", urgent:true  };
}

function evolutionTier(chapter) {
  const r = chapter.revisions;
  if (r >= 5) return { tier:"ancient",  label:"✨ Ancient Bonsai", show:true };
  if (r >= 3) return { tier:"blossom",  label:"🌸 Full Blossom",   show:true };
  if (r >= 1) return { tier:"sapling",  label:"🌿 Sapling",        show:false };
  return              { tier:"seedling", label:"🌱 Seedling",       show:false };
}

// =============================================================================
// =============================================================================
// 4. SPECIES ENGINE & PROCEDURAL 3D BOTANICAL SVG GENERATOR
// =============================================================================

function getPlantType(chapter) {
  if (chapter && chapter.plantType) return chapter.plantType;
  const title = ((chapter && chapter.title) || "").toLowerCase();
  const subj  = ((chapter && chapter.subject) || "").toLowerCase();
  if (title.includes("tree") || title.includes("banyan") || title.includes("oak") || title.includes("avl") || title.includes("calvin") || title.includes("photo")) return "tree";
  if (title.includes("grape") || title.includes("chem") || title.includes("aldehyde") || title.includes("coordination") || subj === "chemistry") return "grape";
  if (title.includes("sunflower") || title.includes("wave") || title.includes("optics") || title.includes("eigen") || subj === "mathematics") return "sunflower";
  if (title.includes("cactus") || title.includes("neuro") || title.includes("thermo") || title.includes("carnot") || title.includes("induction")) return "cactus";
  if (title.includes("blossom") || title.includes("rose") || title.includes("dynamic") || title.includes("bellman") || title.includes("lotus")) return "blossom";
  return "tree";
}

function speciesMeta(type) {
  switch (type) {
    case "tree":      return { icon: "🌳", name: "Tree", label: "Ancient Oak / Bonsai" };
    case "grape":     return { icon: "🍇", name: "Grape", label: "Grapevine Trellis" };
    case "sunflower": return { icon: "🌻", name: "Sunflower", label: "Solar Sunflower" };
    case "cactus":    return { icon: "🌵", name: "Cactus", label: "Desert Cactus" };
    case "blossom":   return { icon: "🌸", name: "Blossom", label: "Rose Blossom" };
    default:          return { icon: "🌱", name: "Plant", label: "Botanical Sprout" };
  }
}

// ─── 1. BONSAI / OAK TREE ───
function renderTreeSVG(chapter, h, wilt, tier, id) {
  const droop = (1 - h);
  const stX = 100 + droop * 22;
  const sW = 9.5 - droop * 3;
  const foliageScale = 0.55 + h * 0.55;
  const leafCol1 = h > 0.4 ? wilt.leaf : "#b45309";
  const leafCol2 = h > 0.4 ? "#22c55e" : "#d97706";
  const leafCol3 = h > 0.4 ? "#15803d" : "#78350f";

  let fallenLeaves = "";
  if (droop > 0.35) {
    fallenLeaves = `
      <g opacity="${0.6 + droop * 0.4}">
        <ellipse cx="78" cy="148" rx="6" ry="2.8" fill="#b45309" transform="rotate(-15 78 148)"/>
        <ellipse cx="120" cy="149" rx="5.5" ry="2.5" fill="#78350f" transform="rotate(25 120 149)"/>
        <ellipse cx="98" cy="151" rx="4.5" ry="2.2" fill="#d97706" transform="rotate(-8 98 151)"/>
      </g>`;
  }

  let fruits = "";
  if (h > 0.65) {
    fruits = `
      <g opacity="${Math.min(1, (h - 0.6) * 2.5)}">
        <circle cx="70" cy="74" r="3.2" fill="#fbbf24"/>
        <circle cx="69" cy="73" r="1.1" fill="#fff" opacity=".85"/>
        <circle cx="128" cy="72" r="3.2" fill="#fbbf24"/>
        <circle cx="127" cy="71" r="1.1" fill="#fff" opacity=".85"/>
        <circle cx="102" cy="58" r="3.5" fill="#f59e0b"/>
        <circle cx="101" cy="57" r="1.2" fill="#fff" opacity=".85"/>
      </g>`;
  }

  return `
    <path d="M88 150 Q96 142 94 122 Q98 108 98 94 Q94 80 72 70" fill="none" stroke="url(#bark-${id})" stroke-width="${sW * 0.8}" stroke-linecap="round"/>
    <path d="M112 150 Q104 142 104 122 Q100 108 102 92 Q108 78 128 68" fill="none" stroke="url(#bark-${id})" stroke-width="${sW * 0.8}" stroke-linecap="round"/>
    <path d="M100 152 Q${stX} 118 100 82" fill="none" stroke="url(#bark-${id})" stroke-width="${sW}" stroke-linecap="round"/>
    <path d="M98 150 Q${stX - 2} 118 99 84" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="${sW * 0.28}" stroke-linecap="round"/>

    <g transform="translate(0, ${droop * 16})" opacity="${0.65 + h * 0.35}">
      <circle cx="72" cy="62" r="${22 * foliageScale}" fill="${leafCol3}" opacity=".85"/>
      <circle cx="128" cy="60" r="${22 * foliageScale}" fill="${leafCol3}" opacity=".85"/>
      <circle cx="100" cy="46" r="${26 * foliageScale}" fill="${leafCol3}" opacity=".85"/>
      <circle cx="62" cy="70" r="${18 * foliageScale}" fill="${leafCol1}"/>
      <circle cx="85" cy="52" r="${22 * foliageScale}" fill="${leafCol1}"/>
      <circle cx="115" cy="50" r="${22 * foliageScale}" fill="${leafCol1}"/>
      <circle cx="138" cy="68" r="${18 * foliageScale}" fill="${leafCol1}"/>
      <circle cx="100" cy="56" r="${20 * foliageScale}" fill="${leafCol2}"/>
      <circle cx="82" cy="64" r="${15 * foliageScale}" fill="${leafCol2}"/>
      <circle cx="118" cy="62" r="${15 * foliageScale}" fill="${leafCol2}"/>
      ${fruits}
    </g>
    ${fallenLeaves}
  `;
}

// ─── 2. GRAPEVINE & TRELLIS ───
function renderGrapeSVG(chapter, h, wilt, tier, id) {
  const droop = (1 - h);
  const vineW = 5 - droop * 1.5;
  const grapeRadius = 2.8 + h * 2.2;
  const leafCol = h > 0.4 ? wilt.leaf : "#78350f";
  const grapeFill = h > 0.38 ? `url(#grp-${id})` : "#5c3317";
  const glossOp = Math.max(0, (h - 0.25) * 1.3);

  const grapesCoords = [
    [87, 98], [95, 96], [105, 96], [113, 98],
    [89, 107], [97, 106], [103, 106], [111, 107],
    [93, 116], [100, 115], [107, 116],
    [96, 124], [104, 124],
    [100, 133]
  ];

  const grapesSvg = grapesCoords.map(([gx, gy]) => `
    <g transform="translate(${gx},${gy + droop * 8})">
      <circle cx="0" cy="0" r="${grapeRadius}" fill="${grapeFill}"/>
      ${glossOp > 0 ? `<circle cx="-${grapeRadius*0.35}" cy="-${grapeRadius*0.35}" r="${grapeRadius*0.32}" fill="rgba(255,255,255,${glossOp * 0.75})"/>` : ""}
    </g>
  `).join("");

  return `
    <g class="trellis-frame" opacity="0.95">
      <rect x="65" y="44" width="7" height="106" rx="2" fill="url(#wood-${id})" stroke="rgba(0,0,0,.2)" stroke-width=".8"/>
      <rect x="128" y="44" width="7" height="106" rx="2" fill="url(#wood-${id})" stroke="rgba(0,0,0,.2)" stroke-width=".8"/>
      <rect x="61" y="64" width="78" height="5" rx="1.5" fill="url(#wood-${id})" stroke="rgba(0,0,0,.15)" stroke-width=".6"/>
      <rect x="61" y="92" width="78" height="5" rx="1.5" fill="url(#wood-${id})" stroke="rgba(0,0,0,.15)" stroke-width=".6"/>
      <rect x="61" y="120" width="78" height="5" rx="1.5" fill="url(#wood-${id})" stroke="rgba(0,0,0,.15)" stroke-width=".6"/>
    </g>

    <path d="M100 150 Q94 135 76 122 Q66 110 69 94 Q73 78 88 66 Q104 56 128 62" fill="none" stroke="url(#bark-${id})" stroke-width="${vineW}" stroke-linecap="round"/>
    <path d="M100 150 Q96 135 78 123" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="${vineW*0.3}" stroke-linecap="round"/>

    <path d="M68 85 Q60 82 63 76 Q66 70 60 67" fill="none" stroke="${h > 0.4 ? '#84cc16' : '#a16207'}" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M132 64 Q140 60 138 54 Q135 48 141 46" fill="none" stroke="${h > 0.4 ? '#84cc16' : '#a16207'}" stroke-width="1.6" stroke-linecap="round"/>

    <g transform="translate(64, ${72 + droop * 8}) rotate(${-25 + droop * 40})" opacity="${0.7 + h * 0.3}">
      <path d="M0 0 C-12,-16,-28,-8,-22,6 C-30,12,-22,26,-10,24 C-4,32,10,26,12,18 C18,8,12,-8,0,0 Z" fill="${leafCol}"/>
      <path d="M0 0 Q-10 12 -4 24" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1"/>
      <path d="M-6 8 Q-18 6 -20 12" fill="none" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>
      <path d="M-4 14 Q6 12 10 16" fill="none" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>
    </g>
    <g transform="translate(132, ${70 + droop * 8}) rotate(${20 - droop * 35})" opacity="${0.7 + h * 0.3}">
      <path d="M0 0 C12,-16,28,-8,22,6 C30,12,22,26,10,24 C4,32,-10,26,-12,18 C-18,8,-12,-8,0,0 Z" fill="${leafCol}"/>
      <path d="M0 0 Q10 12 4 24" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1"/>
      <path d="M6 8 Q18 6 20 12" fill="none" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>
      <path d="M4 14 Q-6 12 -10 16" fill="none" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>
    </g>
    <g transform="translate(100, ${52 + droop * 6}) scale(${0.75 + h * 0.25})" opacity="${0.75 + h * 0.25}">
      <path d="M0 0 C-10,-14,-22,-6,-18,4 C-24,10,-18,20,-8,18 C-2,24,8,20,10,14 C14,6,10,-6,0,0 Z" fill="${leafCol}"/>
    </g>

    <path d="M97 86 Q100 90 100 95" fill="none" stroke="url(#bark-${id})" stroke-width="2.5" stroke-linecap="round"/>

    <g class="grape-cluster">
      ${grapesSvg}
    </g>
  `;
}

// ─── 3. SOLAR SUNFLOWER ───
function renderSunflowerSVG(chapter, h, wilt, tier, id) {
  const droop = (1 - h);
  const stX = 100 + droop * 30;
  const stY = 56 + droop * 40;
  const headRot = droop * 36;
  const stemW = 7 - droop * 2;
  const petalScale = 0.6 + h * 0.45;
  const leafCol = wilt.leaf;
  const petalCol1 = h > 0.4 ? "#f59e0b" : "#b45309";
  const petalCol2 = h > 0.4 ? "#fbbf24" : "#d97706";
  const petalCol3 = h > 0.4 ? "#fde047" : "#92400e";

  const outerPetals = Array.from({length: 16}, (_, i) => {
    const deg = i * 22.5;
    return `<ellipse cx="0" cy="-24" rx="4.8" ry="14" fill="${i % 2 === 0 ? petalCol1 : petalCol2}" transform="rotate(${deg})" opacity=".92"/>`;
  }).join("");

  const innerPetals = Array.from({length: 16}, (_, i) => {
    const deg = i * 22.5 + 11.25;
    return `<ellipse cx="0" cy="-19" rx="3.6" ry="10" fill="${petalCol3}" transform="rotate(${deg})" opacity=".95"/>`;
  }).join("");

  return `
    <path d="M100 150 Q${98 + droop * 18} 115 ${stX} ${stY}" fill="none" stroke="url(#sg-${id})" stroke-width="${stemW}" stroke-linecap="round"/>
    <path d="M99 150 Q${96 + droop * 18} 115 ${stX - 2} ${stY}" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="${stemW * 0.3}" stroke-linecap="round"/>

    <g transform="translate(${80 + droop * 12}, ${115 + droop * 10}) rotate(${-30 + droop * 50})" opacity="${0.7 + h * 0.3}">
      <path d="M0 0 C-18,-15,-32,4,0,22 C4,14,3,6,0,0 Z" fill="${leafCol}"/>
      <path d="M0 0 Q-12 8 0 20" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1"/>
      <path d="M-4 6 Q-18 4 -18 10" fill="none" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>
      <path d="M-2 12 Q-14 12 -12 16" fill="none" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>
    </g>
    <g transform="translate(${120 + droop * 20}, ${105 + droop * 14}) rotate(${30 - droop * 50})" opacity="${0.7 + h * 0.3}">
      <path d="M0 0 C18,-15,32,4,0,22 C-4,14,-3,6,0,0 Z" fill="${leafCol}"/>
      <path d="M0 0 Q12 8 0 20" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1"/>
      <path d="M4 6 Q18 4 18 10" fill="none" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>
      <path d="M2 12 Q14 12 12 16" fill="none" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>
    </g>

    <g transform="translate(${stX}, ${stY}) rotate(${headRot}) scale(${petalScale})">
      <circle cx="0" cy="4" r="28" fill="rgba(0,0,0,.2)" filter="url(#bl-${id})"/>
      ${outerPetals}
      ${innerPetals}
      <circle cx="0" cy="0" r="14.5" fill="url(#sf-${id})" stroke="#78350f" stroke-width="1"/>
      ${[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map(a => `<circle cx="0" cy="-9" r="1.3" fill="#fde68a" opacity=".7" transform="rotate(${a})"/>`).join("")}
      ${[18, 54, 90, 126, 162, 198, 234, 270, 306, 342].map(a => `<circle cx="0" cy="-5" r="1.1" fill="#fed7aa" opacity=".6" transform="rotate(${a})"/>`).join("")}
      <circle cx="-3" cy="-3" r="3" fill="rgba(255,255,255,.25)"/>
    </g>
  `;
}

// ─── 4. DESERT CACTUS ───
function renderCactusSVG(chapter, h, wilt, tier, id) {
  const droop = (1 - h);
  const cactusCol = h > 0.4 ? `url(#cact-${id})` : "#713f12";
  const cactusScale = 0.8 + h * 0.2;
  const bloomScale = 0.4 + h * 0.65;
  const bloomOp = 0.55 + h * 0.45;

  return `
    <g class="cactus-soil">
      <ellipse cx="80" cy="148" rx="4.5" ry="2.2" fill="#cbd5e1"/>
      <ellipse cx="122" cy="149" rx="5" ry="2.5" fill="#94a3b8"/>
      <ellipse cx="106" cy="147" rx="3.5" ry="1.8" fill="#e2e8f0"/>
    </g>

    <g transform="translate(0, ${droop * 10}) scale(${cactusScale})" style="transform-origin: 100px 150px;">
      <path d="M84 116 Q64 116 66 94 Q67 80 72 80 Q78 80 76 94 Q76 104 88 106 Z" fill="${cactusCol}" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>
      <path d="M72 80 L72 96" stroke="rgba(255,255,255,.3)" stroke-width="1" stroke-linecap="round"/>

      <path d="M116 124 Q136 124 134 102 Q133 90 128 90 Q122 90 124 102 Q124 112 112 114 Z" fill="${cactusCol}" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>
      <path d="M128 90 L128 104" stroke="rgba(255,255,255,.3)" stroke-width="1" stroke-linecap="round"/>

      <path d="M82 150 C80 95 82 66 100 66 C118 66 120 95 118 150 Z" fill="${cactusCol}" stroke="rgba(0,0,0,.2)" stroke-width="1"/>

      <path d="M88 150 C87 98 89 72 100 70" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="1.2"/>
      <path d="M112 150 C113 98 111 72 100 70" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="1.2"/>
      <path d="M100 150 L100 68" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.6"/>

      ${[82, 98, 114, 130, 144].map(y => `
        <line x1="88" y1="${y}" x2="84" y2="${y-2}" stroke="#fef08a" stroke-width="1.2"/>
        <line x1="88" y1="${y}" x2="85" y2="${y+2}" stroke="#fde047" stroke-width="1"/>
        <line x1="100" y1="${y-4}" x2="97" y2="${y-7}" stroke="#fef08a" stroke-width="1.2"/>
        <line x1="100" y1="${y-4}" x2="103" y2="${y-7}" stroke="#fef08a" stroke-width="1.2"/>
        <line x1="112" y1="${y}" x2="116" y2="${y-2}" stroke="#fef08a" stroke-width="1.2"/>
        <line x1="112" y1="${y}" x2="115" y2="${y+2}" stroke="#fde047" stroke-width="1"/>
      `).join("")}
    </g>

    <g transform="translate(100, ${66 + droop * 12}) scale(${bloomScale})" opacity="${bloomOp}">
      <circle cx="0" cy="2" r="14" fill="rgba(0,0,0,.22)" filter="url(#bl-${id})"/>
      ${[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => `
        <ellipse cx="0" cy="-10" rx="5" ry="9" fill="${i % 2 === 0 ? '#f43f5e' : '#fb7185'}" transform="rotate(${a})" opacity=".92"/>
      `).join("")}
      <circle cx="0" cy="0" r="5" fill="#fef08a"/>
      ${[0, 60, 120, 180, 240, 300].map(a => `<circle cx="0" cy="-3.5" r=".9" fill="#f59e0b" transform="rotate(${a})"/>`).join("")}
    </g>
  `;
}

// ─── 5. ROSE / CHERRY BLOSSOM ───
function renderBlossomSVG(chapter, h, wilt, tier, id) {
  const droop = (1 - h);
  const stX = 100 + droop * 36;
  const stY = 56 + droop * 46;
  const sc = 0.5 + h * 0.6;
  const fO = 0.55 + h * 0.45;
  const leafCol = wilt.leaf;

  return `
    <path d="M100 150 Q${98 + droop * 22} 110 ${stX} ${stY}" fill="none" stroke="url(#sg-${id})" stroke-width="5" stroke-linecap="round"/>
    <path d="M99 150 Q${96 + droop * 22} 110 ${stX - 2} ${stY}" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="1.4" stroke-linecap="round"/>

    <polygon points="${96 + droop * 12},126 ${90 + droop * 10},129 ${96 + droop * 12},132" fill="#15803d"/>
    <polygon points="${104 + droop * 18},108 ${110 + droop * 20},111 ${104 + droop * 18},114" fill="#15803d"/>

    <g transform="translate(${84 + droop * 12}, ${120 + droop * 8}) rotate(${-30 + droop * 60})" opacity="${0.7 + h * 0.3}">
      <path d="M0 0 C-18,-10,-24,6,0,16 C3,11,2,4,0,0 Z" fill="${leafCol}"/>
      <path d="M0 0 Q-10 6 0 15" fill="none" stroke="rgba(255,255,255,.2)" stroke-width=".8"/>
    </g>
    <g transform="translate(${116 + droop * 20}, ${106 + droop * 12}) rotate(${30 - droop * 60})" opacity="${0.7 + h * 0.3}">
      <path d="M0 0 C18,-10,24,6,0,16 C-3,11,-2,4,0,0 Z" fill="${leafCol}"/>
      <path d="M0 0 Q10 6 0 15" fill="none" stroke="rgba(255,255,255,.2)" stroke-width=".8"/>
    </g>

    <g transform="translate(${stX}, ${stY}) scale(${sc})" opacity="${fO}">
      <ellipse cx="0" cy="5" rx="18" ry="5.5" fill="rgba(0,0,0,.22)" filter="url(#bl-${id})"/>
      ${[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => `
        <ellipse cx="0" cy="-14" rx="6" ry="${10 + (i % 3)}" fill="${i % 2 === 0 ? wilt.flower : wilt.leaf}" transform="rotate(${a})" opacity="${0.78 + 0.1 * (i % 2)}"/>
      `).join("")}
      <circle cx="0" cy="0" r="9" fill="url(#bloss-${id})"/>
      <path d="M-4 -3 C-2 -7 2 -7 4 -3 C3 2 -3 3 -4 -3" fill="none" stroke="#ffe4e6" stroke-width="1.2"/>
      <circle cx="-2.5" cy="-3" r="3.2" fill="rgba(255,255,255,.32)"/>
    </g>
  `;
}

// ─── MASTER SVG DISPATCHER ───
function plantSVG(chapter, r, wilt) {
  const h = Math.max(0, Math.min(1, (r - 0.2) / 0.8));
  const tier = evolutionTier(chapter);
  const id = (chapter.id || "c1").replace(/[^a-z0-9]/gi, '');
  const plantType = getPlantType(chapter);

  let particles = "";
  if (tier.tier === "ancient" && h > 0.5) {
    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * 360;
      particles += `<circle cx="0" cy="-30" r="${i % 2 === 0 ? 3.5 : 2.5}" fill="${i % 2 === 0 ? '#fbbf24' : '#c084fc'}" opacity="0.85">
        <animateTransform attributeName="transform" type="rotate" from="${ang} 100 65" to="${ang+360} 100 65" dur="${1.8+i*0.35}s" repeatCount="indefinite"/>
      </circle>`;
    }
  }

  let plantBody = "";
  if (plantType === "tree") {
    plantBody = renderTreeSVG(chapter, h, wilt, tier, id);
  } else if (plantType === "grape") {
    plantBody = renderGrapeSVG(chapter, h, wilt, tier, id);
  } else if (plantType === "sunflower") {
    plantBody = renderSunflowerSVG(chapter, h, wilt, tier, id);
  } else if (plantType === "cactus") {
    plantBody = renderCactusSVG(chapter, h, wilt, tier, id);
  } else {
    plantBody = renderBlossomSVG(chapter, h, wilt, tier, id);
  }

  return `<svg class="plant-svg species-svg-${plantType}" viewBox="0 0 200 195" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="bl-${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter>
    <linearGradient id="pg-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c47b3a"/><stop offset="35%" stop-color="#a0612f"/>
      <stop offset="70%" stop-color="#7a4420"/><stop offset="100%" stop-color="#5c3010"/>
    </linearGradient>
    <linearGradient id="rm-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4895a"/><stop offset="50%" stop-color="#b06030"/>
      <stop offset="100%" stop-color="#7a4420"/>
    </linearGradient>
    <radialGradient id="sl-${id}" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#6b3d18"/><stop offset="60%" stop-color="#4a2810"/>
      <stop offset="100%" stop-color="#2d1608"/>
    </radialGradient>
    <linearGradient id="sg-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${wilt.stem}cc"/><stop offset="40%" stop-color="${wilt.stem}"/>
      <stop offset="100%" stop-color="${wilt.stem}88"/>
    </linearGradient>
    <linearGradient id="bark-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#451a03"/><stop offset="40%" stop-color="#78350f"/><stop offset="100%" stop-color="#9a3412"/>
    </linearGradient>
    <linearGradient id="wood-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78350f"/><stop offset="50%" stop-color="#92400e"/><stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <radialGradient id="grp-${id}" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#e879f9"/><stop offset="35%" stop-color="#a855f7"/><stop offset="70%" stop-color="#6b21a8"/><stop offset="100%" stop-color="#3b0764"/>
    </radialGradient>
    <radialGradient id="sf-${id}" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#d97706"/><stop offset="55%" stop-color="#78350f"/><stop offset="100%" stop-color="#451a03"/>
    </radialGradient>
    <linearGradient id="cact-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#047857"/><stop offset="25%" stop-color="#10b981"/><stop offset="50%" stop-color="#6ee7b7"/><stop offset="75%" stop-color="#10b981"/><stop offset="100%" stop-color="#065f46"/>
    </linearGradient>
    <radialGradient id="bloss-${id}" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fecdd3"/><stop offset="55%" stop-color="#f43f5e"/><stop offset="100%" stop-color="#9f1239"/>
    </radialGradient>
  </defs>

  <!-- Ground shadow -->
  <ellipse cx="100" cy="192" rx="42" ry="5" fill="rgba(0,0,0,.15)" filter="url(#bl-${id})"/>

  <!-- 3D Planter Pot -->
  <path d="M61 148 L139 148 L127 183 L73 183 Z" fill="url(#pg-${id})" stroke="rgba(0,0,0,.2)" stroke-width="1"/>
  <path d="M61 148 L73 183 L65 183 L57 148 Z" fill="rgba(0,0,0,.15)"/>
  <path d="M129 148 L127 183 L133 183 L143 148 Z" fill="rgba(255,255,255,.07)"/>
  <ellipse cx="100" cy="148" rx="40" ry="9.5" fill="url(#rm-${id})" stroke="rgba(0,0,0,.2)" stroke-width=".8"/>
  <path d="M68 143 Q100 136 132 143" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="2.5" stroke-linecap="round"/>
  <ellipse cx="100" cy="148" rx="36" ry="7.5" fill="url(#sl-${id})"/>
  <path d="M88 146 Q100 148 112 146" fill="none" stroke="rgba(0,0,0,.25)" stroke-width=".8"/>
  <ellipse cx="84" cy="147" rx="3" ry="2" fill="rgba(255,255,255,.08)"/>
  <ellipse cx="116" cy="148" rx="2.5" ry="1.5" fill="rgba(255,255,255,.06)"/>

  <!-- Living Botanical Subject -->
  <g class="plant-group">
    ${plantBody}
    ${particles}
  </g>
</svg>`;
}

// =============================================================================
// 5. GARDEN RENDER
// =============================================================================

function renderGarden() {
  const grid = document.getElementById("plants-grid");
  if (!grid) return;

  const chapters = state.chapters.filter(ch => {
    const r = retention(ch, state.simDays);
    if (state.filter === "urgent")   return r < 0.60;
    if (state.filter === "thriving") return r >= 0.80;
    if (state.filter.startsWith("species:")) {
      const spec = state.filter.split(":")[1];
      return getPlantType(ch) === spec;
    }
    if (["Biology","Mathematics","Physics","Chemistry","Other"].includes(state.filter)) return ch.subject === state.filter;
    return true;
  });

  document.getElementById("plant-count-badge").textContent = state.chapters.length;
  document.getElementById("garden-summary").textContent = `Showing ${chapters.length} of ${state.chapters.length}`;

  let urgent = 0, totalRet = 0;
  state.chapters.forEach(ch => {
    const r = retention(ch, state.simDays);
    totalRet += r;
    if (r < 0.60) urgent++;
  });

  const avgHealth = state.chapters.length ? Math.round((totalRet / state.chapters.length) * 100) : 100;
  document.getElementById("garden-health-score").textContent = avgHealth + "%";
  document.getElementById("garden-health-fill").style.width = avgHealth + "%";
  document.getElementById("garden-health-score").style.color = avgHealth < 50 ? "#ef4444" : avgHealth < 75 ? "#f59e0b" : "#4ade80";
  document.getElementById("urgent-count").textContent = urgent;

  updateWeatherBanner(avgHealth);

  if (!chapters.length) {
    grid.innerHTML = `<div class="empty-state"><p style="font-size:2.5rem">🪴</p><h3>No plants match this filter</h3><p class="muted" style="margin-top:.4rem">Try planting a chapter or switching filters</p></div>`;
    return;
  }

  grid.innerHTML = chapters.map(ch => {
    const r = retention(ch, state.simDays);
    const w = wiltStage(r);
    const tier = evolutionTier(ch);
    const pct = Math.round(r * 100);
    const subClass = `sub-${ch.subject}`;
    const plantType = getPlantType(ch);
    const spec = speciesMeta(plantType);

    return `<div class="plant-card ${w.cardClass} tier-${tier.tier}" data-id="${ch.id}">
      ${tier.show ? `<div class="tier-badge tier-${tier.tier}">${tier.label}</div>` : ""}
      ${w.urgent ? `<div class="water-callout">💧 Water me!</div>` : ""}
      <div class="plant-header">
        <div class="plant-tags">
          <span class="subject-badge ${subClass}">${ch.subject}</span>
          <span class="species-badge species-${plantType}" title="${spec.label}">${spec.icon} ${spec.name}</span>
        </div>
        <span class="retention-badge ${w.retClass}">${pct >= 60 ? "🌱" : "🥀"} ${pct}%</span>
      </div>
      <h3 class="plant-title">${esc(ch.title)}</h3>
      <div class="plant-visual">${plantSVG(ch, r, w)}</div>
      <div class="plant-stats">
        <div class="stat-item"><span class="stat-key">Stability S</span><span class="stat-num">${ch.stability.toFixed(1)}d</span></div>
        <div class="stat-item"><span class="stat-key">Half-life t½</span><span class="stat-num">${halfLife(ch.stability)}d</span></div>
        <div class="stat-item"><span class="stat-key">Revisions</span><span class="stat-num">${ch.revisions}×</span></div>
        <div class="stat-item"><span class="stat-key">Status</span><span class="stat-num" style="color:${w.stem}">${w.label}</span></div>
      </div>
      <div class="plant-actions">
        <button class="btn-water ${w.urgent?"urgent":""}" onclick="openWater('${ch.id}')">💧 Revise & Water</button>
        <button class="btn-icon" onclick="showCurve('${ch.id}')" title="View decay curve">📈</button>
        <button class="btn-icon del" onclick="deleteChapter('${ch.id}')" title="Remove plant">🗑️</button>
      </div>
    </div>`;
  }).join("");

  updateStatPanel();
}

// =============================================================================
// 6. WEATHER CANVAS & BANNER
// =============================================================================

let weatherCtx = null, weatherParticles = [], weatherAnimId = null;

function initWeatherCanvas() {
  const canvas = document.getElementById("weather-canvas");
  weatherCtx = canvas.getContext("2d");
  resizeWeatherCanvas();
  window.addEventListener("resize", resizeWeatherCanvas);
}

function resizeWeatherCanvas() {
  const c = document.getElementById("weather-canvas");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function setWeather(avgHealth) {
  const canvas = document.getElementById("weather-canvas");
  weatherParticles = [];

  if (avgHealth >= 85) {
    // Sunshine — golden pollen drifting upward
    canvas.style.opacity = "1";
    for (let i = 0; i < 40; i++) {
      weatherParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        drift: (Math.random() - 0.5) * 0.4,
        color: `rgba(251,191,36,${Math.random() * 0.25 + 0.05})`,
        type: "pollen"
      });
    }
  } else if (avgHealth >= 60) {
    // Cloudy — slow drifting grey motes
    canvas.style.opacity = "0.6";
    for (let i = 0; i < 25; i++) {
      weatherParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2 + 1,
        speed: Math.random() * 0.3 + 0.1,
        drift: (Math.random() - 0.5) * 0.3,
        color: `rgba(148,163,184,${Math.random() * 0.12 + 0.03})`,
        type: "mote"
      });
    }
  } else {
    // Drought — orange dust particles falling diagonally
    canvas.style.opacity = "1";
    for (let i = 0; i < 55; i++) {
      weatherParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.8 + 0.3,
        drift: Math.random() * 0.6 + 0.1,
        color: `rgba(180,83,9,${Math.random() * 0.2 + 0.04})`,
        type: "dust"
      });
    }
  }

  if (weatherAnimId) cancelAnimationFrame(weatherAnimId);
  animateWeather();
}

function animateWeather() {
  if (!weatherCtx) return;
  weatherCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  weatherParticles.forEach(p => {
    weatherCtx.beginPath();
    weatherCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    weatherCtx.fillStyle = p.color;
    weatherCtx.fill();

    if (p.type === "pollen") {
      p.y -= p.speed; p.x += p.drift;
      if (p.y < -10) { p.y = window.innerHeight + 10; p.x = Math.random() * window.innerWidth; }
    } else if (p.type === "dust") {
      p.y += p.speed; p.x += p.drift;
      if (p.y > window.innerHeight + 10) { p.y = -10; p.x = Math.random() * window.innerWidth; }
    } else {
      p.y += p.speed * 0.3; p.x += p.drift;
      if (p.y > window.innerHeight + 10) { p.y = -10; p.x = Math.random() * window.innerWidth; }
    }
  });
  weatherAnimId = requestAnimationFrame(animateWeather);
}

function updateWeatherBanner(avgHealth) {
  const banner = document.getElementById("weather-banner");
  if (!banner) return;

  setWeather(avgHealth);

  if (avgHealth >= 85) {
    banner.className = "weather-banner sunshine";
    banner.innerHTML = "☀️ <strong>Golden Sunshine:</strong> Your garden is thriving! Memories are well-consolidated in the neocortex.";
    banner.classList.remove("hidden");
  } else if (avgHealth >= 60) {
    banner.className = "weather-banner cloudy";
    banner.innerHTML = "⛅ <strong>Partly Cloudy:</strong> Some plants are drifting toward the wilting zone — keep an eye on urgent ones.";
    banner.classList.remove("hidden");
  } else if (avgHealth < 50) {
    banner.className = "weather-banner drought";
    banner.innerHTML = "🌵 <strong>Drought Alert:</strong> Over half your garden is withering. Synaptic pruning is accelerating — water urgently!";
    banner.classList.remove("hidden");
  } else {
    banner.classList.add("hidden");
  }
}

// =============================================================================
// 7. TIME MACHINE
// =============================================================================

function setupTimeMachine() {
  const slider = document.getElementById("time-slider");
  const label  = document.getElementById("simulated-day-label");
  const chips  = document.querySelectorAll(".tm-right .chip[data-days]");
  const reset  = document.getElementById("btn-reset-time");

  function set(days) {
    state.simDays = parseFloat(days);
    slider.value = days;
    label.textContent = days == 0 ? "Today" : `+${days} Days`;
    chips.forEach(c => c.classList.toggle("active", parseFloat(c.dataset.days) == days));
    renderGarden();
    updateExamPlanner();
    if (state.retentionChart) updateRetentionChart();
    playTick();
  }

  slider.addEventListener("input", e => set(parseFloat(e.target.value)));
  chips.forEach(c => c.addEventListener("click", () => set(parseFloat(c.dataset.days))));
  reset.addEventListener("click", () => set(0));
}

// =============================================================================
// 8. AMBIENT SOUND ENGINE (Web Audio API — no files needed)
// =============================================================================

let soundEnabled = false;
let soundNodes = [];
let soundCtx = null;

function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById("btn-toggle-sound");
  if (soundEnabled) {
    btn.textContent = "🔊";
    startAmbientSound();
  } else {
    btn.textContent = "🔇";
    stopAmbientSound();
  }
}

function getAudioCtx() {
  if (!soundCtx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (C) soundCtx = new C();
  }
  if (soundCtx && soundCtx.state === "suspended") soundCtx.resume();
  return soundCtx;
}

function startAmbientSound() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  stopAmbientSound();

  // Gentle rain-like pink noise
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0=.99886*b0+white*.0555179; b1=.99332*b1+white*.0750759;
    b2=.96900*b2+white*.1538520; b3=.86650*b3+white*.3104856;
    b4=.55000*b4+white*.5329522; b5=-.7616*b5-white*.0168980;
    data[i]=(b0+b1+b2+b3+b4+b5+b6+white*.5362)*0.11;
    b6=white*.115926;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer; src.loop = true;

  const gain = ctx.createGain(); gain.gain.value = 0.06;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass"; filter.frequency.value = 600;

  src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
  src.start();
  soundNodes = [src, gain, filter];
}

function stopAmbientSound() {
  soundNodes.forEach(n => { try { n.disconnect(); if (n.stop) n.stop(); } catch(e){} });
  soundNodes = [];
}

function playWaterSound() {
  try {
    const ctx = getAudioCtx(); if (!ctx) return;
    const now = ctx.currentTime;
    [587.33, 880, 1174.66, 1760].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine"; osc.frequency.value = freq;
      g.gain.setValueAtTime(0.07, now + i*0.08);
      g.gain.exponentialRampToValueAtTime(0.001, now + i*0.08 + 0.28);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(now + i*0.08); osc.stop(now + i*0.08 + 0.3);
    });
  } catch(e) {}
}

function playTick() {
  try {
    const ctx = getAudioCtx(); if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator(); const g = ctx.createGain();
    osc.type = "triangle"; osc.frequency.value = 900;
    g.gain.setValueAtTime(0.015, now); g.gain.exponentialRampToValueAtTime(0.0001, now+0.04);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(now); osc.stop(now+0.05);
  } catch(e) {}
}

function playPomoEnd() {
  try {
    const ctx = getAudioCtx(); if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      const osc = ctx.createOscillator(); const g = ctx.createGain();
      osc.type = "sine"; osc.frequency.value = f;
      g.gain.setValueAtTime(0.1, now+i*0.18); g.gain.exponentialRampToValueAtTime(0.001, now+i*0.18+0.4);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(now+i*0.18); osc.stop(now+i*0.18+0.45);
    });
  } catch(e) {}
}

function playPourSound(durationMs = 1800) {
  try {
    const ctx = getAudioCtx(); if (!ctx) return;
    const now = ctx.currentTime;
    const totalSecs = durationMs / 1000;

    // Filtered water rushing sound
    const bufSize = Math.floor(ctx.sampleRate * totalSecs);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufSize; i++) {
      const white = Math.random() * 2 - 1;
      d[i] = (last + (0.04 * white)) / 1.04;
      last = d[i];
      d[i] *= 2.8;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(650, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + totalSecs);
    filter.Q.value = 3.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
    gain.gain.setValueAtTime(0.10, now + totalSecs - 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + totalSecs);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + totalSecs);

    // Liquid water droplet resonant bloops
    const dropCount = Math.floor(durationMs / 100);
    for (let i = 0; i < dropCount; i++) {
      const dropTime = now + (i * 0.09) + (Math.random() * 0.04);
      if (dropTime > now + totalSecs) break;
      const osc = ctx.createOscillator();
      const dg = ctx.createGain();
      const startF = 450 + Math.random() * 750;
      osc.type = "sine";
      osc.frequency.setValueAtTime(startF, dropTime);
      osc.frequency.exponentialRampToValueAtTime(startF * 1.6, dropTime + 0.07);
      dg.gain.setValueAtTime(0.05 + Math.random() * 0.03, dropTime);
      dg.gain.exponentialRampToValueAtTime(0.0001, dropTime + 0.07);
      osc.connect(dg);
      dg.connect(ctx.destination);
      osc.start(dropTime);
      osc.stop(dropTime + 0.08);
    }
  } catch(e) {}
}

function playGrowthChime() {
  try {
    const ctx = getAudioCtx(); if (!ctx) return;
    const now = ctx.currentTime;
    // Harmonic celestial arpeggio: C5, E5, G5, B5, C6
    const freqs = [523.25, 659.25, 783.99, 987.77, 1046.50];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now + i * 0.09);
      g.gain.setValueAtTime(0.09, now + i * 0.09);
      g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.6);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.65);
    });
  } catch(e) {}
}

// =============================================================================
// 9. ACTIVE RECALL / WATER MODAL
// =============================================================================

function openWater(chapterId) {
  const ch = state.chapters.find(c => c.id === chapterId);
  if (!ch) return;
  state.wateringId = chapterId;

  document.getElementById("water-icon").textContent =
    ch.subject==="Biology"?"🌱": ch.subject==="Mathematics"?"📐": ch.subject==="Physics"?"⚡":"🧪";
  document.getElementById("water-chapter-title").textContent = ch.title;
  document.getElementById("water-subject-badge").textContent = ch.subject;

  const defaultQ = `What is the core mechanism or key formula for "${ch.title}"?`;
  const defaultA = `Review key principles and equations for ${ch.title}.`;
  const defaultF = `In simple words: ${ch.title} works by...`;

  const fcCard = document.getElementById("flashcard");
  if (fcCard) fcCard.classList.remove("flipped");
  document.getElementById("fc-q").textContent = ch.question || defaultQ;
  document.getElementById("fc-a").textContent = ch.answer   || defaultA;
  document.getElementById("feynman-prompt-text").textContent =
    `Explain "${ch.title}" simply — as if teaching a 10-year-old:`;
  document.getElementById("feynman-ideal-text").textContent = ch.feynman || ch.answer || defaultF;
  document.getElementById("feynman-input").value = "";
  document.getElementById("feynman-words").textContent = "0 words";
  document.getElementById("feynman-ideal").classList.add("hidden");

  // Reset mode to flashcard
  setWaterMode("flashcard");

  // Reset recall factor
  state.recallFactor = 2.0;
  document.querySelectorAll(".recall-btn").forEach(b => {
    b.classList.toggle("selected", parseFloat(b.dataset.factor) === 2.0);
  });

  openModal("modal-water");
}

function setWaterMode(mode) {
  document.querySelectorAll(".mode-btn").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
  document.getElementById("mode-flashcard").classList.toggle("hidden", mode !== "flashcard");
  document.getElementById("mode-feynman").classList.toggle("hidden", mode !== "feynman");
}

function confirmWater() {
  const id = state.wateringId;
  if (!id) return;
  closeModal("modal-water");
  // Give student the interactive water bucket to pour on the plant and watch it grow!
  startWaterBucketExperience(id);
}

// =============================================================================
// 10. ADD / DELETE CHAPTERS
// =============================================================================

function setupAddChapterModal() {
  const dateEl = document.getElementById("ch-date");
  if (dateEl) dateEl.value = today();

  document.getElementById("form-add").addEventListener("submit", e => {
    e.preventDefault();
    const subject     = document.getElementById("ch-subject").value;
    const plantTypeEl = document.getElementById("ch-plant-type");
    const plantType   = plantTypeEl ? plantTypeEl.value : "tree";
    const title       = document.getElementById("ch-name").value.trim();
    const date        = document.getElementById("ch-date").value;
    const difficulty  = parseInt(document.getElementById("ch-difficulty").value);
    const question    = document.getElementById("ch-question").value.trim();
    const answer      = document.getElementById("ch-answer").value.trim();

    if (!title) return;
    const s0 = difficulty===1?2.8: difficulty===2?2.0: 1.4;

    state.chapters.unshift({
      id: "ch-" + Date.now(), title, subject, plantType, dateStudied:date, lastWatered:date,
      revisions:0, difficulty, stability:s0,
      question: question || `What is the key principle of ${title}?`,
      answer:   answer   || `Core concepts of ${title}.`,
      feynman:  `${title} simply explained: ...`
    });

    saveChapters();
    renderGarden();
    if (state.retentionChart) updateRetentionChart();
    updateExamPlanner();
    updatePomoChapterSelect();
    closeModal("modal-add");
    playWaterSound();
    e.target.reset();
    dateEl.value = today();
  });
}

function deleteChapter(id) {
  if (!confirm("Remove this plant from your garden?")) return;
  state.chapters = state.chapters.filter(c => c.id !== id);
  saveChapters();
  renderGarden();
  if (state.retentionChart) updateRetentionChart();
  updateExamPlanner();
  updatePomoChapterSelect();
}

// =============================================================================
// 11. RETENTION CHART (Chart.js)
// =============================================================================

function populateChapterSelect() {
  const sel = document.getElementById("chapter-select");
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = state.chapters.map(ch =>
    `<option value="${ch.id}">${ch.subject}: ${esc(ch.title)}</option>`
  ).join("");
  if (cur && state.chapters.some(c => c.id === cur)) sel.value = cur;
  else if (state.chapters.length) sel.value = state.chapters[0].id;
}

function initRetentionChart() {
  const canvas = document.getElementById("retention-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  state.retentionChart = new Chart(ctx, {
    type:"line",
    data:{ labels:[], datasets:[
      { label:"No Revision (R = e^−t/1.8)", data:[], borderColor:"#ef4444", backgroundColor:"rgba(239,68,68,.07)", borderWidth:2, borderDash:[5,5], fill:true, tension:.35, pointRadius:0 },
      { label:"Current Chapter (Spaced)", data:[], borderColor:"#10b981", backgroundColor:"rgba(16,185,129,.12)", borderWidth:2.5, fill:true, tension:.25, pointRadius:3, pointHoverRadius:6, pointBackgroundColor:"#34d399" }
    ]},
    options:{
      responsive:true, maintainAspectRatio:false,
      interaction:{ mode:"index", intersect:false },
      plugins:{
        legend:{ labels:{ color:"#94a39b", font:{ family:"Plus Jakarta Sans", size:12 } } },
        tooltip:{
          backgroundColor:"rgba(14,28,20,.97)", titleColor:"#4ade80", bodyColor:"#e8f5ed",
          borderColor:"rgba(74,222,128,.3)", borderWidth:1,
          callbacks:{ label: ctx => `${ctx.dataset.label.split("(")[0].trim()}: ${(ctx.parsed.y*100).toFixed(0)}%` }
        }
      },
      scales:{
        x:{ title:{ display:true, text:"Days elapsed (t)", color:"#94a39b", font:{ weight:600 } }, grid:{ color:"rgba(255,255,255,.04)" }, ticks:{ color:"#64746b" } },
        y:{ min:0, max:1, title:{ display:true, text:"Retention R", color:"#94a39b", font:{ weight:600 } }, grid:{ color:"rgba(255,255,255,.04)" }, ticks:{ color:"#64746b", callback:v=>(v*100)+"%", stepSize:.2 } }
      }
    }
  });

  document.getElementById("chapter-select").addEventListener("change", updateRetentionChart);
  document.getElementById("chart-range").addEventListener("change", updateRetentionChart);
  updateRetentionChart();
}

function updateRetentionChart() {
  if (!state.retentionChart) return;
  const sel = document.getElementById("chapter-select");
  const ch = state.chapters.find(c => c.id === sel?.value) || state.chapters[0];
  if (!ch) return;

  const days = parseInt(document.getElementById("chart-range")?.value || "30");
  const S = ch.stability || 2.0;

  const labels = [], noRev = [], spaced = [];
  const revisionPoints = [];

  // Simulate spaced repetition intervals
  let curS = S;
  let nextRevAt = curS * 0.7; // Water at ~50% retention: t = S * ln(2)
  let lastRevAt = 0;

  for (let d = 0; d <= days; d++) {
    labels.push(`Day ${d}`);
    noRev.push(Math.max(0.02, Math.exp(-d / 1.8)));

    // If past a revision point, boost S
    if (d > 0 && d >= nextRevAt && nextRevAt <= days * 0.85) {
      revisionPoints.push(d);
      curS = Math.min(90, curS * 2.0);
      lastRevAt = d;
      nextRevAt = d + curS * 0.7;
    }

    const tSinceLastRev = d - lastRevAt;
    spaced.push(Math.min(1, Math.max(0.05, Math.exp(-tSinceLastRev / curS))));
  }

  state.retentionChart.data.labels = labels;
  state.retentionChart.data.datasets[0].data = noRev;
  state.retentionChart.data.datasets[1].data = spaced;
  state.retentionChart.data.datasets[1].label = `${ch.title.substring(0,30)} (S=${S.toFixed(1)}d)`;
  state.retentionChart.update();

  // Annotation badges
  const ann = document.getElementById("chart-annotations");
  if (ann) {
    ann.innerHTML = `
      <div class="annot"><div class="annot-dot" style="background:#ef4444"></div> No Revision: ${(noRev[Math.min(7,days)]*100).toFixed(0)}% at day 7</div>
      <div class="annot"><div class="annot-dot" style="background:#10b981"></div> Spaced Repetition: ${(spaced[Math.min(7,days)]*100).toFixed(0)}% at day 7</div>
      <div class="annot"><div class="annot-dot" style="background:#38bdf8"></div> Memory Half-life: ${halfLife(S)} days</div>
      <div class="annot"><div class="annot-dot" style="background:#a855f7"></div> Optimal revision points: Days ${revisionPoints.slice(0,4).join(", ")}</div>
    `;
  }
}

function showCurve(chapterId) {
  switchTab("analytics");
  const sel = document.getElementById("chapter-select");
  if (sel) { sel.value = chapterId; updateRetentionChart(); }
}

// =============================================================================
// 12. GARDEN STATS PANEL
// =============================================================================

function updateStatPanel() {
  const panel = document.getElementById("stats-panel");
  if (!panel || !state.chapters.length) return;

  const retentions = state.chapters.map(ch => retention(ch, state.simDays));
  const avg  = retentions.reduce((a,b) => a+b, 0) / retentions.length;
  const urgent = retentions.filter(r => r < 0.60).length;
  const thriving = retentions.filter(r => r >= 0.80).length;
  const totalRevisions = state.chapters.reduce((a,c) => a+c.revisions, 0);

  panel.innerHTML = `
    <div class="stat-box"><div class="stat-box-label">Avg Retention</div><div class="stat-box-val" style="color:#4ade80">${Math.round(avg*100)}%</div></div>
    <div class="stat-box"><div class="stat-box-label">Total Chapters</div><div class="stat-box-val">${state.chapters.length}</div></div>
    <div class="stat-box"><div class="stat-box-label">Need Water 🥀</div><div class="stat-box-val" style="color:#f59e0b">${urgent}</div></div>
    <div class="stat-box"><div class="stat-box-label">Thriving 💚</div><div class="stat-box-val" style="color:#34d399">${thriving}</div></div>
    <div class="stat-box"><div class="stat-box-label">Total Revisions</div><div class="stat-box-val" style="color:#38bdf8">${totalRevisions}</div></div>
    <div class="stat-box"><div class="stat-box-label">Study Streak 🔥</div><div class="stat-box-val" style="color:#fbbf24">${state.streak} days</div></div>
  `;
}

// =============================================================================
// 13. POMODORO FOCUS TIMER
// =============================================================================

const POMO_FOCUS = 25 * 60;
const POMO_BREAK = 5  * 60;

function updatePomoChapterSelect() {
  const sel = document.getElementById("pomo-chapter-select");
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = `<option value="">— Select chapter to auto-water —</option>` +
    state.chapters.map(ch => `<option value="${ch.id}">${ch.subject}: ${esc(ch.title)}</option>`).join("");
  if (cur) sel.value = cur;
}

function setupPomodoro() {
  const btnStart = document.getElementById("btn-pomo-start");
  const btnPause = document.getElementById("btn-pomo-pause");
  const btnReset = document.getElementById("btn-pomo-reset");

  btnStart.addEventListener("click", () => {
    if (state.pomo.running) return;
    state.pomo.running = true; state.pomo.paused = false;
    state.pomo.chapterId = document.getElementById("pomo-chapter-select").value || null;
    btnStart.disabled = true; btnPause.disabled = false;
    state.pomo.intervalId = setInterval(tickPomo, 1000);
    updatePomoDisplay();
  });

  btnPause.addEventListener("click", () => {
    if (!state.pomo.running) return;
    state.pomo.paused = !state.pomo.paused;
    btnPause.textContent = state.pomo.paused ? "▶ Resume" : "⏸ Pause";
  });

  btnReset.addEventListener("click", () => {
    clearInterval(state.pomo.intervalId);
    state.pomo.running = false; state.pomo.paused = false;
    state.pomo.remainingSecs = POMO_FOCUS; state.pomo.phase = "focus";
    btnStart.disabled = false; btnPause.disabled = true;
    btnPause.textContent = "⏸ Pause";
    updatePomoDisplay();
    renderPomoPlant(0);
  });

  updatePomoDisplay();
}

function tickPomo() {
  if (state.pomo.paused) return;
  state.pomo.remainingSecs--;

  const total = state.pomo.phase === "focus" ? POMO_FOCUS : POMO_BREAK;
  const progress = 1 - (state.pomo.remainingSecs / total);
  renderPomoPlant(progress);
  updatePomoDisplay();

  // Update nav pill
  const pill = document.getElementById("pomo-pill");
  const navTime = document.getElementById("pomo-nav-time");
  if (pill && navTime) {
    pill.classList.remove("hidden");
    navTime.textContent = formatTime(state.pomo.remainingSecs);
  }

  if (state.pomo.remainingSecs <= 0) {
    if (state.pomo.phase === "focus") {
      // Session complete!
      playPomoEnd();
      state.pomo.sessionCount++;
      state.pomo.totalMins += 25;
      localStorage.setItem("mg_pomo_sessions", state.pomo.sessionCount);
      localStorage.setItem("mg_pomo_mins", state.pomo.totalMins);

      document.getElementById("pomo-session-count").textContent = state.pomo.sessionCount;
      document.getElementById("pomo-total-time").textContent = state.pomo.totalMins + " min";

      // Auto-water selected chapter
      if (state.pomo.chapterId) {
        const idx = state.chapters.findIndex(c => c.id === state.pomo.chapterId);
        if (idx !== -1) {
          const ch = state.chapters[idx];
          ch.stability = Math.min(90, ch.stability * 2.0);
          ch.revisions++;
          ch.lastWatered = today();
          saveChapters();
          renderGarden();
          if (state.retentionChart) updateRetentionChart();
          confetti({ particleCount:40, spread:60, origin:{y:0.8}, colors:["#10b981","#fbbf24"] });
        }
      }

      // Add to history
      addPomoHistory(`Focus — 25min ${state.pomo.chapterId ? "→ watered chapter" : ""}`);

      // Switch to break
      state.pomo.phase = "break";
      state.pomo.remainingSecs = POMO_BREAK;
      document.getElementById("pomo-phase-label").textContent = "Break Time 🌿";
      document.getElementById("ring-progress").style.stroke = "#38bdf8";
    } else {
      // Break over — back to focus
      state.pomo.phase = "focus";
      state.pomo.remainingSecs = POMO_FOCUS;
      document.getElementById("pomo-phase-label").textContent = "Focus Session";
      document.getElementById("ring-progress").style.stroke = "#10b981";
      renderPomoPlant(0);
    }
  }
}

function updatePomoDisplay() {
  const timeEl = document.getElementById("pomo-time-display");
  if (timeEl) timeEl.textContent = formatTime(state.pomo.remainingSecs);

  const total = state.pomo.phase === "focus" ? POMO_FOCUS : POMO_BREAK;
  const fraction = 1 - (state.pomo.remainingSecs / total);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference * (1 - fraction);
  const ring = document.getElementById("ring-progress");
  if (ring) { ring.style.strokeDashoffset = circumference - (circumference - offset); }
}

function renderPomoPlant(progress) {
  const g = document.getElementById("pomo-plant-group");
  if (!g) return;

  const h = Math.min(1, progress);
  if (h < 0.1) {
    g.innerHTML = `<circle cx="100" cy="168" r="5" fill="#78350f"/>`;
  } else if (h < 0.3) {
    g.innerHTML = `<path d="M100 168 L100 ${168-h*60}" stroke="#166534" stroke-width="4" stroke-linecap="round"/>`;
  } else if (h < 0.6) {
    const stemH = 60 + h * 50;
    g.innerHTML = `
      <path d="M100 168 L100 ${168-stemH}" stroke="#15803d" stroke-width="5" stroke-linecap="round"/>
      <path d="M100 ${168-stemH*0.6} C80,${168-stemH*0.7} 70,${168-stemH*0.5} 72,${168-stemH*0.35}" stroke="#16a34a" stroke-width="3" fill="none" stroke-linecap="round"/>
    `;
  } else if (h < 0.9) {
    g.innerHTML = `
      <path d="M100 168 Q95,130 100 ${168-95}" stroke="#15803d" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M100 110 C80,100 72,82 76,68" stroke="#16a34a" stroke-width="3" fill="none"/>
      <path d="M100 110 C120,100 128,82 124,68" stroke="#16a34a" stroke-width="3" fill="none"/>
      <ellipse cx="100" cy="60" rx="${10*h}" ry="${10*h}" fill="#22c55e"/>
    `;
  } else {
    // Full blossom
    g.innerHTML = `
      <path d="M100 168 Q95,130 100 72" stroke="#15803d" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M100 110 C80,100 72,80 76,66" stroke="#16a34a" stroke-width="3" fill="none"/>
      <path d="M100 110 C120,100 128,80 124,66" stroke="#16a34a" stroke-width="3" fill="none"/>
      ${[0,60,120,180,240,300].map(a=>`<ellipse cx="100" cy="58" rx="8" ry="14" fill="#facc15" opacity="0.9" transform="rotate(${a},100,72)"/>`).join("")}
      <circle cx="100" cy="72" r="10" fill="#78350f" stroke="#22c55e" stroke-width="2"/>
    `;
  }
}

function addPomoHistory(label) {
  const list = document.getElementById("pomo-history-list");
  if (!list) return;
  const now = new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
  const item = document.createElement("div");
  item.className = "pomo-session-item";
  item.textContent = `${now} — ${label}`;
  if (list.querySelector(".muted")) list.innerHTML = "";
  list.prepend(item);
}

function formatTime(secs) {
  const m = Math.floor(secs/60).toString().padStart(2,"0");
  const s = (secs%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

// =============================================================================
// 14. CRAMMING VS SPACED COMPARISON
// =============================================================================

function setupCompare() {
  const rangeEl = document.getElementById("compare-exam-days");
  const labelEl = document.getElementById("exam-days-label");
  if (rangeEl) rangeEl.addEventListener("input", () => labelEl.textContent = rangeEl.value);

  document.getElementById("btn-run-compare")?.addEventListener("click", runCompare);
}

function runCompare() {
  const examDays = parseInt(document.getElementById("compare-exam-days")?.value || "30");
  const cramHours = parseInt(document.getElementById("cram-hours")?.value || "8");
  const cramDaysBefore = parseInt(document.getElementById("cram-days-before")?.value || "1");
  const spacedMins = parseInt(document.getElementById("spaced-mins")?.value || "20");
  const intervalType = document.getElementById("spaced-interval")?.value || "fibonacci";

  const days = examDays + 30; // show 30 days beyond exam too
  const labels = [];
  const crammer = [], gardener = [];

  // Crammer: initial stability based on hours studied, then pure decay
  const cramS = Math.min(3.0, cramHours * 0.35);
  const studyDay = examDays - cramDaysBefore;

  // Gardener: spaced sessions
  const spacedIntervals = {
    sm2: [1, 6, 15, 35, 70, 120, 200],
    fibonacci: [1, 2, 3, 5, 8, 13, 21, 34],
    conservative: [1, 3, 7, 14, 21, 35, 60]
  }[intervalType];

  let gardenS = 1.4; // start lower (short sessions)
  let sessionDays = [0];
  let acc = 0;
  spacedIntervals.forEach(gap => { acc += gap; if (acc < examDays) { sessionDays.push(acc); gardenS = Math.min(90, gardenS * 2.0); } });

  let curGardenS = 1.4, lastGardenSession = 0;

  for (let d = 0; d <= days; d++) {
    labels.push(d === examDays ? `📅 Exam` : `Day ${d}`);

    // Crammer curve
    if (d < studyDay) {
      crammer.push(0);
    } else {
      const t = d - studyDay;
      crammer.push(Math.max(0.02, Math.exp(-t / cramS)));
    }

    // Gardener curve — with spaced sessions
    if (sessionDays.includes(d) && d <= examDays) {
      curGardenS = Math.min(90, curGardenS * 2.0);
      lastGardenSession = d;
    }
    const tGarden = d - lastGardenSession;
    gardener.push(Math.min(1, Math.max(0.03, Math.exp(-tGarden / curGardenS))));
  }

  // Scoreboard
  const examRet_A = crammer[examDays] || 0;
  const examRet_B = gardener[examDays] || 0;
  const laterRet_A = crammer[Math.min(examDays+30, days)] || 0;
  const laterRet_B = gardener[Math.min(examDays+30, days)] || 0;

  document.getElementById("score-a-exam").textContent = Math.round(examRet_A*100)+"%";
  document.getElementById("score-b-exam").textContent = Math.round(examRet_B*100)+"%";
  document.getElementById("score-a-later").textContent = Math.round(laterRet_A*100)+"%";
  document.getElementById("score-b-later").textContent = Math.round(laterRet_B*100)+"%";

  const verdict = document.getElementById("compare-verdict");
  const diff = Math.round((examRet_B - examRet_A)*100);
  verdict.className = "verdict win";
  verdict.innerHTML = `🌱 <strong>Memory Garden student retains ${diff > 0 ? diff+"% more" : "similarly"} on exam day</strong>, and ${Math.round((laterRet_B - laterRet_A)*100)}% more a month later — with ${sessionDays.length} short sessions of ${spacedMins}min instead of one ${cramHours}-hour all-nighter.`;
  verdict.classList.remove("hidden");

  // Chart
  const canvas = document.getElementById("compare-chart");
  if (!canvas) return;
  if (state.compareChart) state.compareChart.destroy();

  // Mark exam day
  const examLine = { id:"exam-line", type:"line", scaleID:"x", value:examDays, borderColor:"rgba(251,191,36,.6)", borderWidth:2, label:{ content:"Exam", enabled:true, color:"#fbbf24", position:"top" } };

  state.compareChart = new Chart(canvas.getContext("2d"), {
    type:"line",
    data:{ labels,
      datasets:[
        { label:`Crammer A (${cramHours}h single session)`, data:crammer, borderColor:"#ef4444", backgroundColor:"rgba(239,68,68,.08)", borderWidth:2.5, fill:true, tension:.35, pointRadius:0 },
        { label:`Memory Gardener B (${sessionDays.length} spaced sessions)`, data:gardener, borderColor:"#10b981", backgroundColor:"rgba(16,185,129,.12)", borderWidth:2.5, fill:true, tension:.3, pointRadius:0 }
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{ labels:{ color:"#94a39b", font:{ family:"Plus Jakarta Sans" } } },
        tooltip:{ backgroundColor:"rgba(14,28,20,.95)", titleColor:"#4ade80", bodyColor:"#e8f5ed", borderColor:"rgba(74,222,128,.3)", borderWidth:1 }
      },
      scales:{
        x:{ ticks:{ color:"#64746b", maxTicksLimit:12 }, grid:{ color:"rgba(255,255,255,.04)" } },
        y:{ min:0, max:1, ticks:{ color:"#64746b", callback:v=>(v*100)+"%" }, grid:{ color:"rgba(255,255,255,.04)" } }
      }
    }
  });
}

// =============================================================================
// 15. CIRCADIAN CHRONOTYPE QUIZ
// =============================================================================

const QUIZ_QUESTIONS = [
  {
    q:"On a free weekend, when do you naturally wake up?",
    opts:[
      { text:"Before 6:30 AM — alert and ready", type:"lark" },
      { text:"7:00–8:30 AM — comfortable waking", type:"third_bird" },
      { text:"After 9:30 AM — blinds drawn please", type:"night_owl" }
    ]
  },
  {
    q:"When is your analytical focus (Maths/Physics problems) sharpest?",
    opts:[
      { text:"Early morning, 8–11 AM", type:"lark" },
      { text:"Late morning or late afternoon", type:"third_bird" },
      { text:"Evening and late night, 7PM+", type:"night_owl" }
    ]
  },
  {
    q:"How do you experience the post-lunch dip (2–4 PM)?",
    opts:[
      { text:"Severe — my brain shuts down", type:"lark" },
      { text:"Mild — fixed by a short walk", type:"third_bird" },
      { text:"What dip? I'm just warming up!", type:"night_owl" }
    ]
  },
  {
    q:"If your exam is at 8:30 AM tomorrow:",
    opts:[
      { text:"Perfect! Morning is my peak.", type:"lark" },
      { text:"Fine with coffee and warm-up.", type:"third_bird" },
      { text:"Disaster — my cortex won't boot till noon.", type:"night_owl" }
    ]
  }
];

let quizIndex = 0, quizScores = { lark:0, third_bird:0, night_owl:0 };

function setupChronoQuiz() {
  renderQuizQuestion();
  document.getElementById("btn-retake-quiz").addEventListener("click", () => {
    quizIndex = 0; quizScores = { lark:0, third_bird:0, night_owl:0 };
    document.getElementById("quiz-result").classList.add("hidden");
    document.getElementById("quiz-view").classList.remove("hidden");
    renderQuizQuestion();
  });
}

function renderQuizQuestion() {
  const q = QUIZ_QUESTIONS[quizIndex];
  if (!q) return finishQuiz();
  document.getElementById("quiz-fill").style.width = `${((quizIndex)/QUIZ_QUESTIONS.length)*100}%`;
  document.getElementById("quiz-container").innerHTML = `
    <h3 style="font-size:1rem;font-weight:700;margin-bottom:1rem">${q.q}</h3>
    ${q.opts.map(o => `<button class="quiz-option" onclick="answerQuiz('${o.type}')">${o.text}</button>`).join("")}
  `;
}

function answerQuiz(type) {
  quizScores[type]++;
  quizIndex++;
  renderQuizQuestion();
}

function finishQuiz() {
  const dominant = Object.keys(quizScores).sort((a,b)=>quizScores[b]-quizScores[a])[0];
  state.chronotype = dominant;
  localStorage.setItem("mg_chronotype", dominant);

  const profiles = {
    lark:{ emoji:"🌅", title:"Morning Lark", desc:"Your cortisol and core body temperature rise early. Peak prefrontal function: 8–11 AM. Schedule Maths and Physics here." },
    third_bird:{ emoji:"☀️", title:"Third Bird (Balanced)", desc:"Alertness climbs through morning, mild post-lunch dip, strong second surge at 4–7 PM. Split hard subjects across both windows." },
    night_owl:{ emoji:"🦉", title:"Night Owl", desc:"Melatonin suppression occurs late. Peak analytical power arrives 5–10 PM. Never force Maths at 8 AM — it costs you 30% performance." }
  };
  const p = profiles[dominant];

  document.getElementById("quiz-view").classList.add("hidden");
  const res = document.getElementById("quiz-result");
  res.classList.remove("hidden");
  res.innerHTML = `
    <div class="quiz-result-view">
      <div class="result-emoji">${p.emoji}</div>
      <div class="result-type">${p.title}</div>
      <p class="result-desc">${p.desc}</p>
    </div>
  `;
  renderCircadianTimeline(dominant);
}

function renderCircadianTimeline(chronotype) {
  const timelines = {
    lark:[
      { time:"07:00", type:"normal", title:"Circadian Awakening", desc:"Cortisol spike + light exposure initiates alertness" },
      { time:"08:00", type:"peak",   title:"⚡ Peak 1: Mathematics & Calculus", desc:"Dopamine & acetylcholine at maximum. Best for problem-solving." },
      { time:"11:30", type:"normal", title:"🌱 Biology Reading", desc:"Conceptual learning and long-form reading" },
      { time:"14:00", type:"slump",  title:"☕ Rest / Light Review", desc:"Circadian low — avoid heavy analytical work" },
      { time:"17:00", type:"peak",   title:"💧 Spaced Watering Session", desc:"Active recall and flashcard testing" },
      { time:"22:00", type:"normal", title:"🛌 Sleep — Memory Consolidation", desc:"Hippocampus replays memories into neocortex during SWS" }
    ],
    night_owl:[
      { time:"09:00", type:"normal", title:"Gentle Awakening", desc:"Melatonin clears; ease into the day" },
      { time:"11:00", type:"normal", title:"📖 Biology & Reading", desc:"Verbal memory warm-up" },
      { time:"14:30", type:"normal", title:"💧 Watering Session", desc:"Active recall while partially alert" },
      { time:"17:00", type:"peak",   title:"⚡ Peak: Mathematics & Physics", desc:"Prefrontal cortex hits peak efficiency. Deep problem-solving." },
      { time:"20:30", type:"peak",   title:"🧪 Chemistry & Complex Problems", desc:"Sustained focus without distraction" },
      { time:"01:00", type:"normal", title:"🛌 Sleep — Memory Consolidation", desc:"Essential 7-8 hours for synaptic consolidation" }
    ],
    third_bird:[
      { time:"07:30", type:"normal", title:"Morning Awakening", desc:"Standard circadian boot sequence" },
      { time:"09:30", type:"peak",   title:"⚡ Peak 1: Hard Maths / Physics", desc:"Analytical working memory at peak" },
      { time:"13:00", type:"normal", title:"🌱 Biology Concepts", desc:"Mid-day conceptual learning" },
      { time:"14:30", type:"slump",  title:"😴 Light Recovery", desc:"Short walk or nap — avoid heavy maths" },
      { time:"16:30", type:"peak",   title:"💧 Memory Garden Revision", desc:"Watering chapters in the optimal 40-60% window" },
      { time:"23:00", type:"normal", title:"🛌 Sleep", desc:"Memory replay and synaptic pruning" }
    ]
  };

  const slots = timelines[chronotype] || timelines.third_bird;
  document.getElementById("circadian-timeline").innerHTML = slots.map(s => `
    <div class="timeline-slot ${s.type==="peak"?"slot-peak":s.type==="slump"?"slot-slump":""}">
      <span class="slot-time">${s.time}</span>
      <div class="slot-content"><h5>${s.title}</h5><p>${s.desc}</p></div>
    </div>
  `).join("");
}

// =============================================================================
// 16. EXAM PLANNER
// =============================================================================

function setupExamPlanner() {
  const dateEl = document.getElementById("exam-date");
  if (dateEl) dateEl.value = state.exam.date;
  const nameEl = document.getElementById("exam-name");
  if (nameEl) nameEl.value = state.exam.name;
  const retEl = document.getElementById("target-ret");
  if (retEl) retEl.value = state.exam.target;

  document.getElementById("planner-form")?.addEventListener("submit", e => {
    e.preventDefault();
    state.exam.name   = document.getElementById("exam-name").value.trim() || "Board Final Exams";
    state.exam.date   = document.getElementById("exam-date").value;
    state.exam.target = parseFloat(document.getElementById("target-ret").value);
    localStorage.setItem("mg_exam", JSON.stringify(state.exam));
    updateExamPlanner();
  });

  updateExamPlanner();
}

function updateExamPlanner() {
  const daysEl = document.getElementById("countdown-days");
  const nameEl = document.getElementById("planner-exam-name");
  const statusEl = document.getElementById("planner-status");
  const queueEl = document.getElementById("planner-queue");
  if (!daysEl || !queueEl) return;

  const examDate = new Date(state.exam.date);
  const effectiveNow = new Date(Date.now() + state.simDays * 86400000);
  const daysLeft = Math.ceil((examDate - effectiveNow) / 86400000);

  nameEl.textContent = state.exam.name;
  daysEl.textContent = Math.max(0, daysLeft);
  statusEl.textContent = daysLeft > 0
    ? `${daysLeft} days to reach ≥${Math.round(state.exam.target*100)}% on exam day`
    : "Exam day — good luck!";

  const target = state.exam.target;
  const items = state.chapters.map(ch => {
    const r = retention(ch, state.simDays);
    const maxGap = -ch.stability * Math.log(target);
    return { ch, r, maxGap: maxGap.toFixed(1), urgent: r < target };
  }).sort((a,b) => a.r - b.r);

  queueEl.innerHTML = items.map((item, i) => {
    const pct = Math.round(item.r * 100);
    const color = item.urgent ? "#f59e0b" : "#10b981";
    return `<div class="queue-row" style="border-left-color:${color}">
      <div class="queue-info">
        <h4>#${i+1} ${esc(item.ch.title)}</h4>
        <span class="muted">Retention: <strong style="color:${color}">${pct}%</strong> | Max gap before exam: ${item.maxGap}d</span>
      </div>
      <div style="text-align:right">
        <span class="queue-ret" style="color:${color}">${item.urgent?"⚠️ Water Now":"✅ On Track"}</span><br>
        <button class="btn btn-ghost btn-sm" style="margin-top:.3rem" onclick="openWater('${item.ch.id}')">💧 Water</button>
      </div>
    </div>`;
  }).join("");
}

// =============================================================================
// 17. MATH SANDBOX
// =============================================================================

function setupSandbox() {
  const sb = state.sandbox;
  const sliders = {
    "sb-s0":      (v) => { sb.s0=parseFloat(v); sb.lambda=parseFloat((1/sb.s0).toFixed(2)); document.getElementById("sb-lambda").value=sb.lambda; document.getElementById("sb-lambda-val").textContent=sb.lambda.toFixed(2); },
    "sb-lambda":  (v) => { sb.lambda=parseFloat(v); sb.s0=parseFloat((1/sb.lambda).toFixed(1)); document.getElementById("sb-s0").value=sb.s0; document.getElementById("sb-s0-val").textContent=sb.s0.toFixed(1); },
    "sb-k":       (v) => { sb.k=parseFloat(v); document.getElementById("sb-k-val").textContent=parseFloat(v).toFixed(1); },
    "sb-revisions":(v)=> { sb.revisions=parseInt(v); document.getElementById("sb-revisions-val").textContent=v; }
  };

  Object.keys(sliders).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", e => {
        document.getElementById(id+"-val").textContent =
          id==="sb-revisions" ? e.target.value : parseFloat(e.target.value).toFixed(id==="sb-s0"?1:2);
        sliders[id](e.target.value);
        updateSandboxChart();
        updateSandboxDerived();
      });
    }
  });

  const tangent = document.getElementById("sb-tangent-slider");
  if (tangent) tangent.addEventListener("input", e => updateSandboxTangent(parseFloat(e.target.value)));

  initSandboxChart();
}

function initSandboxChart() {
  const canvas = document.getElementById("sandbox-chart");
  if (!canvas) return;

  state.sandboxChart = new Chart(canvas.getContext("2d"), {
    type:"line",
    data:{ labels:[], datasets:[
      { label:"No Revision R(t) = e^−λt", data:[], borderColor:"#ef4444", backgroundColor:"rgba(239,68,68,.07)", borderWidth:2, fill:true, tension:.3, pointRadius:0 },
      { label:"With Revisions (Spaced)", data:[], borderColor:"#10b981", backgroundColor:"rgba(16,185,129,.1)", borderWidth:2.5, fill:true, tension:.25, pointRadius:0 },
      { label:"Tangent Line (dR/dt)", data:[], borderColor:"rgba(56,189,248,.7)", borderDash:[4,4], borderWidth:1.5, fill:false, tension:0, pointRadius:0 }
    ]},
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{ labels:{ color:"#94a39b", font:{ family:"Plus Jakarta Sans",size:12 } } },
        tooltip:{ backgroundColor:"rgba(14,28,20,.97)", titleColor:"#4ade80", bodyColor:"#e8f5ed", borderColor:"rgba(74,222,128,.3)", borderWidth:1, callbacks:{ label:c=>`${c.dataset.label.split(" ")[0]}: ${(c.parsed.y*100).toFixed(1)}%` } }
      },
      scales:{
        x:{ title:{display:true,text:"Days (t)",color:"#94a39b"}, grid:{color:"rgba(255,255,255,.04)"}, ticks:{color:"#64746b"} },
        y:{ min:0, max:1.05, title:{display:true,text:"Retention R",color:"#94a39b"}, grid:{color:"rgba(255,255,255,.04)"}, ticks:{color:"#64746b",callback:v=>(v*100)+"%"} }
      }
    }
  });

  updateSandboxChart();
  updateSandboxDerived();
}

function updateSandboxChart() {
  if (!state.sandboxChart) return;
  const { s0, k, revisions } = state.sandbox;
  const daysRange = 60;
  const labels=[], noRev=[], spaced=[];

  let curS = s0, lastRev=0, nextRev=curS*0.693;
  let revsLeft = revisions;

  for (let d=0; d<=daysRange; d++) {
    labels.push(d%5===0?`${d}d`:"");
    noRev.push(Math.max(0.01, Math.exp(-d/s0)));

    if (revsLeft>0 && d>0 && d>=nextRev) {
      curS = Math.min(90, curS*k);
      lastRev=d; nextRev=d+curS*0.693;
      revsLeft--;
    }
    spaced.push(Math.min(1, Math.max(0.02, Math.exp(-(d-lastRev)/curS))));
  }

  state.sandboxChart.data.labels = labels;
  state.sandboxChart.data.datasets[0].data = noRev;
  state.sandboxChart.data.datasets[1].data = spaced;
  state.sandboxChart.update("none");
  updateSandboxTangent(parseFloat(document.getElementById("sb-tangent-slider")?.value || "0"));
}

function updateSandboxTangent(t) {
  if (!state.sandboxChart) return;
  const { s0 } = state.sandbox;
  const daysRange = 60;
  const R_t = Math.exp(-t/s0);
  const dR = -(1/s0)*R_t;
  const slope = dR;

  document.getElementById("sb-tangent-t").textContent = t.toFixed(1);
  document.getElementById("sb-derivative-val").textContent = slope.toFixed(4);

  const tangentPts = [];
  for (let d=0; d<=daysRange; d++) {
    const val = R_t + slope*(d-t);
    tangentPts.push((val>=0&&val<=1.05)?val:null);
  }
  state.sandboxChart.data.datasets[2].data = tangentPts;
  state.sandboxChart.update("none");
}

function updateSandboxDerived() {
  const { s0, k, revisions } = state.sandbox;
  const hl = (s0*Math.LN2).toFixed(2);
  const r7 = Math.round(Math.exp(-7/s0)*100);
  const finalS = Math.min(90, s0 * Math.pow(k, revisions));
  const r7spaced = Math.round(Math.exp(-7/finalS)*100);

  document.getElementById("sb-halflife").textContent = `${hl} days`;
  document.getElementById("sb-r7").textContent = `${r7}%`;
  document.getElementById("sb-final-s").textContent = `${finalS.toFixed(1)} days`;
  document.getElementById("sb-r7-spaced").textContent = `${Math.min(99,r7spaced)}%`;
}

// =============================================================================
// 18. STREAK SYSTEM
// =============================================================================

function updateStreak() {
  const todayStr = today();
  if (state.lastStudyDate === todayStr) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (state.lastStudyDate === yesterday) {
    state.streak++;
  } else if (state.lastStudyDate !== todayStr) {
    state.streak = 1;
  }
  state.lastStudyDate = todayStr;
  localStorage.setItem("mg_streak", state.streak);
  localStorage.setItem("mg_last_study", todayStr);
  document.getElementById("streak-count").textContent = state.streak;
}

// =============================================================================
// 19. CSV EXPORT
// =============================================================================

function exportCSV() {
  const rows = [
    ["Title","Subject","Date Studied","Last Watered","Revisions","Stability (days)","Current Retention %","Half-Life (days)","Stage"]
  ];
  state.chapters.forEach(ch => {
    const r = retention(ch, 0);
    const w = wiltStage(r);
    rows.push([
      `"${ch.title}"`, ch.subject, ch.dateStudied, ch.lastWatered,
      ch.revisions, ch.stability.toFixed(2),
      Math.round(r*100), halfLife(ch.stability), w.stage
    ]);
  });
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type:"text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = "memory-garden-export.csv";
  a.click(); URL.revokeObjectURL(url);
}

// =============================================================================
// 20. MODAL SYSTEM
// =============================================================================

function openModal(id) { document.getElementById(id)?.classList.remove("hidden"); }
function closeModal(id) { document.getElementById(id)?.classList.add("hidden"); }

function setupModals() {
  // Generic close by data-close attribute
  document.querySelectorAll("[data-close]").forEach(el => {
    el.addEventListener("click", () => closeModal(el.dataset.close));
  });

  // Close on overlay click
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // Water modal confirm
  document.getElementById("btn-confirm-water")?.addEventListener("click", confirmWater);

  // Water modal mode buttons
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => setWaterMode(btn.dataset.mode));
  });

  // Flashcard flip
  document.getElementById("flashcard")?.addEventListener("click", e => {
    document.getElementById("flashcard").classList.toggle("flipped");
  });

  // Feynman word count
  document.getElementById("feynman-input")?.addEventListener("input", e => {
    const words = e.target.value.trim().split(/\s+/).filter(Boolean).length;
    document.getElementById("feynman-words").textContent = `${words} words`;
  });

  // Feynman show ideal
  document.getElementById("btn-show-ideal")?.addEventListener("click", () => {
    document.getElementById("feynman-ideal").classList.toggle("hidden");
  });

  // Recall buttons
  document.querySelectorAll(".recall-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".recall-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      state.recallFactor = parseFloat(btn.dataset.factor);
    });
  });

  // Pitch modal
  document.getElementById("btn-open-pitch")?.addEventListener("click", () => openModal("modal-pitch"));

  // Add chapter
  document.getElementById("btn-add-chapter")?.addEventListener("click", () => openModal("modal-add"));

  // Export
  document.getElementById("btn-export-csv")?.addEventListener("click", exportCSV);

  // Sound toggle
  document.getElementById("btn-toggle-sound")?.addEventListener("click", toggleSound);

  // Theme toggle (light / dark)
  const savedTheme = localStorage.getItem("mg_theme") || "dark";
  if (savedTheme === "light") document.documentElement.setAttribute("data-theme", "light");
  document.getElementById("btn-toggle-theme")?.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("mg_theme", "dark");
      document.getElementById("btn-toggle-theme").textContent = "☀️";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("mg_theme", "light");
      document.getElementById("btn-toggle-theme").textContent = "🌙";
    }
  });
  if (savedTheme === "light") document.getElementById("btn-toggle-theme").textContent = "🌙";
}

// =============================================================================
// 21. TABS
// =============================================================================

function setupTabs() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });
}

function switchTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === id));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("active", p.id === `panel-${id}`));

  if (id === "analytics") {
    populateChapterSelect();
    if (!state.retentionChart) initRetentionChart();
    else { updateRetentionChart(); setTimeout(() => state.retentionChart.resize(), 50); }
    updateStatPanel();
  }
  if (id === "pomodoro")   renderPomoPlant(0);
  if (id === "compare")    runCompare();
  if (id === "sandbox")    { if (!state.sandboxChart) initSandboxChart(); else { updateSandboxChart(); setTimeout(()=>state.sandboxChart.resize(),50); } }
}

// =============================================================================
// 22. GARDEN FILTER & TOOLBAR
// =============================================================================

function setupGardenToolbar() {
  document.getElementById("btn-open-bucket")?.addEventListener("click", () => {
    startWaterBucketExperience(null);
  });

  document.querySelectorAll(".filter-row .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-row .chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.filter = chip.dataset.filter;
      renderGarden();
    });
  });

  document.getElementById("btn-water-all-urgent")?.addEventListener("click", () => {
    let count = 0;
    const simNow = new Date(Date.now() + state.simDays * 86400000).toISOString().split("T")[0];
    state.chapters.forEach(ch => {
      if (retention(ch, state.simDays) < 0.60) {
        ch.stability = Math.min(90, ch.stability * 1.8);
        ch.revisions++; ch.lastWatered = simNow; count++;
      }
    });
    if (count > 0) {
      saveChapters(); renderGarden(); updateStreak();
      if (state.retentionChart) updateRetentionChart();
      playWaterSound();
      confetti({ particleCount:80, spread:90, origin:{y:0.6} });
      alert(`💧 Watered ${count} urgent plants!`);
    } else {
      alert("🌿 All plants are healthy (>60%)!");
    }
  });

  document.getElementById("btn-reload-demo")?.addEventListener("click", () => {
    if (!confirm("Reset to initial demo dataset?")) return;
    state.chapters = JSON.parse(JSON.stringify(DEMO_CHAPTERS));
    saveChapters(); renderGarden();
    if (state.retentionChart) updateRetentionChart();
    updateExamPlanner(); updatePomoChapterSelect();
  });
}

// =============================================================================
// 23. PERSISTENCE
// =============================================================================

function saveChapters() {
  localStorage.setItem("mg_chapters_v3", JSON.stringify(state.chapters));
}

function loadChapters() {
  const savedV3 = localStorage.getItem("mg_chapters_v3");
  const savedV2 = localStorage.getItem("mg_chapters_v2");

  if (savedV3) {
    try {
      state.chapters = JSON.parse(savedV3);
    } catch(e) {
      state.chapters = JSON.parse(JSON.stringify(DEMO_CHAPTERS));
    }
  } else if (savedV2) {
    try {
      const old = JSON.parse(savedV2);
      const oldIds = new Set(old.map(c => c.id));
      const newDemos = DEMO_CHAPTERS.filter(d => !oldIds.has(d.id));
      old.forEach(ch => {
        if (!ch.plantType) ch.plantType = getPlantType(ch);
      });
      state.chapters = [...old, ...newDemos];
    } catch(e) {
      state.chapters = JSON.parse(JSON.stringify(DEMO_CHAPTERS));
    }
    saveChapters();
  } else {
    state.chapters = JSON.parse(JSON.stringify(DEMO_CHAPTERS));
    saveChapters();
  }

  // Ensure all chapters have plantType and flashcard info
  state.chapters.forEach(ch => {
    if (!ch.plantType) ch.plantType = getPlantType(ch);
    const demo = DEMO_CHAPTERS.find(d => d.id === ch.id);
    if (demo) {
      if (!ch.question)  ch.question  = demo.question;
      if (!ch.answer)    ch.answer    = demo.answer;
      if (!ch.feynman)   ch.feynman   = demo.feynman;
      if (!ch.plantType) ch.plantType = demo.plantType;
    }
  });
}

// =============================================================================
// 23b. INTERACTIVE WATER BUCKET & PLANT GROWTH ENGINE
// =============================================================================

let bucketState = {
  active: false,
  targetId: null,
  pouring: false,
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  isDragging: false,
  dragOffset: { x: 0, y: 0 }
};

function setupWaterBucket() {
  const bucketLayer = document.getElementById("water-bucket-layer");
  const bucketEl = document.getElementById("interactive-bucket");
  const autoPourBtn = document.getElementById("btn-bucket-autopour");
  const cancelBtn = document.getElementById("btn-bucket-cancel");

  if (!bucketLayer || !bucketEl) return;

  // Pointer down on bucket -> start drag
  bucketEl.addEventListener("pointerdown", e => {
    if (bucketState.pouring) return;
    bucketState.isDragging = true;
    bucketEl.classList.add("grabbing");
    const rect = bucketEl.getBoundingClientRect();
    bucketState.dragOffset.x = e.clientX - (rect.left + rect.width / 2);
    bucketState.dragOffset.y = e.clientY - (rect.top + rect.height / 2);
    bucketEl.setPointerCapture(e.pointerId);
  });

  // Pointer move globally when bucket is active
  window.addEventListener("pointermove", e => {
    if (!bucketState.active || bucketState.pouring) return;

    if (bucketState.isDragging) {
      bucketState.x = e.clientX - bucketState.dragOffset.x;
      bucketState.y = e.clientY - bucketState.dragOffset.y;
    } else {
      // Gentle follow cursor if hovering over page
      bucketState.x += (e.clientX - bucketState.x) * 0.15;
      bucketState.y += (e.clientY - bucketState.y) * 0.15;
    }

    updateBucketPosition();
    checkBucketProximity(false);
  });

  // Pointer up
  window.addEventListener("pointerup", e => {
    if (!bucketState.active) return;
    bucketState.isDragging = false;
    bucketEl.classList.remove("grabbing");
    checkBucketProximity(true);
  });

  // Auto pour button in HUD
  autoPourBtn?.addEventListener("click", () => {
    if (!bucketState.active || bucketState.pouring) return;
    const targetCard = getTargetCard();
    if (targetCard) {
      pourWaterOnPlant(targetCard.dataset.id, targetCard);
    }
  });

  // Cancel button
  cancelBtn?.addEventListener("click", () => {
    dismissWaterBucket();
  });

  // Clicking on any plant card while bucket is active triggers instant pour
  document.getElementById("plants-grid")?.addEventListener("click", e => {
    if (!bucketState.active || bucketState.pouring) return;
    const card = e.target.closest(".plant-card");
    if (card) {
      e.stopPropagation();
      pourWaterOnPlant(card.dataset.id, card);
    }
  });
}

function updateBucketPosition() {
  const bucketEl = document.getElementById("interactive-bucket");
  if (!bucketEl) return;
  bucketEl.style.left = `${bucketState.x}px`;
  bucketEl.style.top = `${bucketState.y}px`;
}

function startWaterBucketExperience(targetChapterId) {
  bucketState.active = true;
  bucketState.targetId = targetChapterId;
  bucketState.pouring = false;
  bucketState.isDragging = false;

  // Make sure we are on the garden tab
  const gardenTabBtn = document.querySelector('.tab[data-tab="garden"]');
  if (gardenTabBtn && !gardenTabBtn.classList.contains("active")) {
    gardenTabBtn.click();
  }

  // Clear previous target marks
  document.querySelectorAll(".plant-card").forEach(c => c.classList.remove("bucket-target"));

  const targetCard = getTargetCard();
  const hudTitle = document.getElementById("bucket-hud-title");
  const hudSub = document.getElementById("bucket-hud-sub");

  if (targetCard) {
    targetCard.classList.add("bucket-target");
    targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
    const ch = state.chapters.find(c => c.id === targetCard.dataset.id);
    if (hudTitle) hudTitle.textContent = `🪣 Water Bucket Ready for "${ch ? ch.title : 'Chapter'}"!`;
    if (hudSub) hudSub.textContent = "Bring the bucket near your plant to pour water & watch it grow!";

    // Position bucket nicely near the card
    const cardRect = targetCard.getBoundingClientRect();
    bucketState.x = Math.max(90, Math.min(window.innerWidth - 90, cardRect.right + 30));
    bucketState.y = Math.max(120, Math.min(window.innerHeight - 100, cardRect.top + 50));
  } else {
    if (hudTitle) hudTitle.textContent = "🪣 Water Bucket in Hand";
    if (hudSub) hudSub.textContent = "Move or click near any plant to pour water and nurture it!";
    bucketState.x = window.innerWidth / 2;
    bucketState.y = window.innerHeight / 2;
  }

  updateBucketPosition();
  const layer = document.getElementById("water-bucket-layer");
  if (layer) layer.classList.remove("hidden");
}

function getTargetCard() {
  if (bucketState.targetId) {
    const card = document.querySelector(`.plant-card[data-id="${bucketState.targetId}"]`);
    if (card) return card;
  }
  // Fallback: first urgent card or first card
  return document.querySelector(".plant-card.stage-wilting, .plant-card.stage-withered, .plant-card");
}

function checkBucketProximity(forceTrigger = false) {
  if (!bucketState.active || bucketState.pouring) return;

  const targetCard = getTargetCard();
  if (!targetCard) return;

  const cardRect = targetCard.getBoundingClientRect();
  const potCenterX = cardRect.left + cardRect.width / 2;
  const potCenterY = cardRect.top + 140;

  const dx = bucketState.x - potCenterX;
  const dy = bucketState.y - potCenterY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // If user dropped bucket near card, or moved within 130px
  if (distance < 130 || (forceTrigger && distance < 200)) {
    pourWaterOnPlant(targetCard.dataset.id, targetCard);
  }
}

function pourWaterOnPlant(chapterId, cardEl) {
  if (!cardEl || bucketState.pouring) return;
  bucketState.pouring = true;

  const ch = state.chapters.find(c => c.id === chapterId);
  if (!ch) {
    dismissWaterBucket();
    return;
  }

  // Smoothly move bucket to pouring position above the plant visual pot
  const visual = cardEl.querySelector(".plant-visual");
  const vRect = (visual || cardEl).getBoundingClientRect();

  bucketState.x = vRect.left + vRect.width * 0.44;
  bucketState.y = vRect.top + 25;
  updateBucketPosition();

  const bucketEl = document.getElementById("interactive-bucket");
  const streamWrap = document.getElementById("water-stream-wrap");

  // Tilt bucket and activate stream
  if (bucketEl) bucketEl.classList.add("pouring");
  if (streamWrap) streamWrap.classList.remove("hidden");

  // Play realistic continuous pouring sound
  playPourSound(1800);

  // Mark card with growing aura
  cardEl.classList.add("plant-growing");

  // Calculate growth parameters
  const oldR = retention(ch, state.simDays);
  const factor = state.recallFactor || 2.0;
  const newStability = Math.min(90, (ch.stability || 2.0) * factor);
  const newRevisions = ch.revisions + 1;

  // Frame by frame plant growth animation over 1500ms
  const startTime = performance.now();
  const duration = 1500;

  function growStep(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    // Smooth cubic ease out
    const ease = 1 - Math.pow(1 - progress, 3);

    // Live retention interpolating from oldR to 1.0 (100% full health!)
    const curR = Math.min(1, oldR + (1.0 - oldR) * ease);
    const curW = wiltStage(curR);

    // Live update of the 3D plant SVG
    const vis = cardEl.querySelector(".plant-visual");
    if (vis) {
      const liveCh = { ...ch, revisions: progress > 0.65 ? newRevisions : ch.revisions };
      vis.innerHTML = plantSVG(liveCh, curR, curW);
    }

    // Live retention score badge
    const badge = cardEl.querySelector(".retention-badge");
    if (badge) {
      badge.innerHTML = (curR >= 0.60 ? "🌱 " : "🥀 ") + Math.round(curR * 100) + "%";
      badge.className = `retention-badge ${curW.retClass}`;
    }

    // Live status label
    const statusVal = cardEl.querySelector(".stat-item:last-child .stat-num");
    if (statusVal) {
      statusVal.textContent = curW.label;
      statusVal.style.color = curW.stem;
    }

    if (progress < 1) {
      requestAnimationFrame(growStep);
    } else {
      finishGrowth();
    }
  }

  requestAnimationFrame(growStep);

  function finishGrowth() {
    // Commit state changes
    ch.stability = newStability;
    ch.revisions = newRevisions;
    const simNow = new Date(Date.now() + state.simDays * 86400000);
    ch.lastWatered = simNow.toISOString().split("T")[0];

    saveChapters();
    updateStreak();

    // Turn off stream and reset bucket tilt
    if (streamWrap) streamWrap.classList.add("hidden");
    if (bucketEl) bucketEl.classList.remove("pouring");

    // Audio & celebratory confetti
    playGrowthChime();

    const cRect = cardEl.getBoundingClientRect();
    confetti({
      particleCount: 80,
      spread: 85,
      origin: {
        x: (cRect.left + cRect.width / 2) / window.innerWidth,
        y: Math.max(0.1, (cRect.top + 30) / window.innerHeight)
      },
      colors: ["#10b981", "#38bdf8", "#facc15", "#a855f7", "#34d399"]
    });

    // Update charts & planner
    if (state.retentionChart) updateRetentionChart();
    updateExamPlanner();
    updatePomoChapterSelect();

    // Re-render full garden after brief delay so all totals sync
    setTimeout(() => {
      renderGarden();
      dismissWaterBucket();
    }, 700);
  }
}

function dismissWaterBucket() {
  bucketState.active = false;
  bucketState.pouring = false;
  bucketState.isDragging = false;

  const layer = document.getElementById("water-bucket-layer");
  if (layer) layer.classList.add("hidden");

  const bucketEl = document.getElementById("interactive-bucket");
  if (bucketEl) {
    bucketEl.classList.remove("pouring", "grabbing");
  }

  const streamWrap = document.getElementById("water-stream-wrap");
  if (streamWrap) streamWrap.classList.add("hidden");

  document.querySelectorAll(".plant-card").forEach(c => {
    c.classList.remove("bucket-target", "plant-growing");
  });
}

// =============================================================================
// 24. UTILITY FUNCTIONS
// =============================================================================

function today() { return new Date().toISOString().split("T")[0]; }
function daysAgo(n) { const d=new Date(); d.setDate(d.getDate()-n); return d.toISOString().split("T")[0]; }
function futureDate(n) { const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().split("T")[0]; }
function daysSince(dateStr) {
  const diff = new Date() - new Date(dateStr);
  return Math.max(0, diff / 86400000);
}
function esc(str) {
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// =============================================================================
// 25. BOOT
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  loadChapters();

  // Init weather canvas
  initWeatherCanvas();

  // Setup all systems
  setupTimeMachine();
  setupGardenToolbar();
  setupAddChapterModal();
  setupModals();
  setupTabs();
  setupPomodoro();
  setupCompare();
  setupChronoQuiz();
  setupExamPlanner();
  setupSandbox();
  setupWaterBucket();

  // Update dynamic elements
  renderGarden();
  updatePomoChapterSelect();
  renderCircadianTimeline(state.chronotype);
  document.getElementById("streak-count").textContent = state.streak;

  // Restore quiz result if already taken
  if (localStorage.getItem("mg_chronotype")) {
    renderCircadianTimeline(state.chronotype);
  }

  console.log("🌱 Memory Garden v2.0 — All systems online.");
});
