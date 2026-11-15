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
// 1b. CBSE NCERT CLASS 11 & 12 BIO-MATHS CURRICULUM REPOSITORY
// =============================================================================

const NCERT_CURRICULUM = [
  // ─── CLASS 12 BIOLOGY ───
  {
    id: "ncert-bio12-1", classNum: 12, subject: "Biology", plantType: "blossom", chapterNo: 1,
    title: "Sexual Reproduction in Flowering Plants", unit: "Reproduction", weightage: "High Yield (NEET: ~3-4 Qs)",
    ncertPage: "Chapter 1, NCERT Class 12",
    formula: "Pollen tube enters via micropyle (Porogamy); Double fertilization: Syngamy (2n Zygote) + Triple Fusion (3n PEN).",
    question: "What are the products of double fertilization in angiosperms, and what is the ploidy of each?",
    answer: "Syngamy forms diploid (2n) zygote; triple fusion of one male gamete with diploid secondary nucleus forms triploid (3n) Primary Endosperm Nucleus (PEN).",
    feynman: "Like a twin marriage: one gamete joins the egg to make the baby seed, while the second joins two polar nuclei to bake a 3-layer cake (endosperm) to nourish it!"
  },
  {
    id: "ncert-bio12-2", classNum: 12, subject: "Biology", plantType: "grape", chapterNo: 2,
    title: "Human Reproduction & Menstrual Cycle", unit: "Reproduction", weightage: "High Yield (NEET: ~3 Qs)",
    ncertPage: "Chapter 2, NCERT Class 12",
    formula: "Spermiogenesis (spermatid → sperm); LH surge triggers ovulation on Day 14; Cleavage → Morula → Blastocyst.",
    question: "Which hormone surge causes rupture of the Graafian follicle and release of the ovum during the menstrual cycle?",
    answer: "Rapid secretion of Luteinizing Hormone (LH) leading to maximum level (LH surge) mid-cycle (around 14th day) induces ovulation.",
    feynman: "Like an egg timer: estrogen builds up until it trips an LH master alarm in the pituitary, bursting open the follicle door!"
  },
  {
    id: "ncert-bio12-3", classNum: 12, subject: "Biology", plantType: "grape", chapterNo: 4,
    title: "Principles of Inheritance and Variation", unit: "Genetics and Evolution", weightage: "Super High Yield (NEET: ~5-6 Qs)",
    ncertPage: "Chapter 4, NCERT Class 12",
    formula: "Monohybrid: 3:1 (phenotypic), 1:2:1 (genotypic); Dihybrid: 9:3:3:1; Test cross ratio = 1:1 or 1:1:1:1.",
    question: "What is the genotypic and phenotypic ratio in incomplete dominance (e.g. Mirabilis jalapa / Antirrhinum)?",
    answer: "Both phenotypic and genotypic ratios are identical: 1 Red (RR) : 2 Pink (Rr) : 1 White (rr).",
    feynman: "Instead of one allele bullying the other into hiding, both alleles mix paint colors in the heterozygote like red and white blending to pink!"
  },
  {
    id: "ncert-bio12-4", classNum: 12, subject: "Biology", plantType: "tree", chapterNo: 5,
    title: "Molecular Basis of Inheritance (DNA & Lac Operon)", unit: "Genetics and Evolution", weightage: "Highest Yield (NEET: ~6-8 Qs)",
    ncertPage: "Chapter 5, NCERT Class 12",
    formula: "DNA pitch = 3.4 nm (10 bp/turn); Chargaff: A+G = T+C; Meselson-Stahl 15N/14N semi-conservative replication; Lac operon: i gene produces repressor.",
    question: "Explain the central dogma of molecular biology and name the enzyme responsible for reverse transcription.",
    answer: "DNA → (Transcription) → mRNA → (Translation) → Protein. Reverse transcriptase (RNA-dependent DNA polymerase) carries out reverse transcription in retroviruses.",
    feynman: "DNA is the architect's blueprint safely locked in the vault; mRNA is the photocopy sent to the construction site; ribosomes are the masons assembling the protein."
  },
  {
    id: "ncert-bio12-5", classNum: 12, subject: "Biology", plantType: "sunflower", chapterNo: 9,
    title: "Biotechnology: Principles and Processes", unit: "Biotechnology", weightage: "High Yield (NEET: ~4-5 Qs)",
    ncertPage: "Chapter 9, NCERT Class 12",
    formula: "PCR steps: Denaturation (94°C) → Annealing (54°C) → Extension (72°C via Taq polymerase); EcoRI cuts at 5'-GAATTC-3'.",
    question: "What are the three steps of Polymerase Chain Reaction (PCR) and which thermostable enzyme is used?",
    answer: "1. Denaturation (heat to separate strands). 2. Annealing (primers bind). 3. Extension (Taq polymerase from Thermus aquaticus synthesizes new strands).",
    feynman: "PCR is a molecular photocopier: heat unzips the paper, primers mark where to copy, and a heat-resistant enzyme duplicates a billion pages in an hour."
  },
  {
    id: "ncert-bio12-6", classNum: 12, subject: "Biology", plantType: "tree", chapterNo: 11,
    title: "Organisms and Populations & Ecosystems", unit: "Ecology", weightage: "High Yield (NEET: ~4 Qs)",
    ncertPage: "Chapter 11, NCERT Class 12",
    formula: "Verhulst-Pearl Logistic Growth: dN/dt = rN((K - N)/K); Lindeman's 10% ecological energy transfer efficiency.",
    question: "State the equation for logistic population growth and define the parameter 'K'.",
    answer: "dN/dt = rN[(K - N)/K], where N is population size, r is intrinsic rate of natural increase, and K is the carrying capacity of the habitat.",
    feynman: "A garden bed can only hold as many plants as its soil and sunlight allow; as population crowds near capacity K, growth slows down to zero."
  },

  // ─── CLASS 11 BIOLOGY ───
  {
    id: "ncert-bio11-1", classNum: 11, subject: "Biology", plantType: "tree", chapterNo: 8,
    title: "Cell: The Unit of Life", unit: "Cell Structure and Function", weightage: "High Yield (NEET: ~4 Qs)",
    ncertPage: "Chapter 8, NCERT Class 11",
    formula: "Fluid mosaic model by Singer & Nicolson (1972); Prokaryotic ribosomes (70S = 50S + 30S), Eukaryotic ribosomes (80S = 60S + 40S).",
    question: "What does the fluid mosaic model propose regarding the structure of the plasma membrane?",
    answer: "Proteins are embedded as a quasi-fluid mosaic within a phospholipid bilayer, allowing lateral movement of proteins within the overall lipid sea.",
    feynman: "Imagine an ocean of lipids with icebergs of protein floating and drifting smoothly across the surface."
  },
  {
    id: "ncert-bio11-2", classNum: 11, subject: "Biology", plantType: "sunflower", chapterNo: 11,
    title: "Photosynthesis in Higher Plants (C3, C4, Z-Scheme)", unit: "Plant Physiology", weightage: "High Yield (NEET: ~3-4 Qs)",
    ncertPage: "Chapter 11, NCERT Class 11",
    formula: "PS II (P680) & PS I (P700); Calvin Cycle: 6CO2 + 18ATP + 12NADPH → 1 Glucose; C4 Hatch-Slack pathway uses PEP carboxylase in mesophyll.",
    question: "Why do C4 plants lack photorespiration and show higher photosynthetic efficiency?",
    answer: "Kranz anatomy concentrates CO2 around RuBisCO in bundle sheath cells via the C4 dicarboxylic acid cycle, suppressing RuBisCO oxygenase activity.",
    feynman: "C4 plants run a turbocharger: they use PEP carboxylase as an ultra-sensitive pump to pack CO2 directly into RuBisCO's room so oxygen can never sneak in."
  },
  {
    id: "ncert-bio11-3", classNum: 11, subject: "Biology", plantType: "cactus", chapterNo: 12,
    title: "Respiration in Plants (Glycolysis & Krebs)", unit: "Plant Physiology", weightage: "High Yield (NEET: ~3 Qs)",
    ncertPage: "Chapter 12, NCERT Class 11",
    formula: "Glycolysis (EMP): 1 Glucose → 2 Pyruvate + 2ATP + 2NADH; Link Reaction: Pyruvate → Acetyl-CoA; 1 NADH = 3 ATP, 1 FADH2 = 2 ATP.",
    question: "Where does glycolysis take place in the cell, and does it require molecular oxygen?",
    answer: "Glycolysis takes place in the cytoplasm of all living cells; it is an anaerobic process that does not require oxygen.",
    feynman: "The universal molecular splitting machine: every living creature cracks 6-carbon glucose into two 3-carbon halves right in the cell soup without needing oxygen."
  },
  {
    id: "ncert-bio11-4", classNum: 11, subject: "Biology", plantType: "blossom", chapterNo: 9,
    title: "Biomolecules & Enzyme Kinetics", unit: "Chemical Constituents", weightage: "High Yield (NEET: ~3 Qs)",
    ncertPage: "Chapter 9, NCERT Class 11",
    formula: "Competitive inhibition: Km increases, Vmax unchanged; Non-competitive: Vmax decreases, Km unchanged; Peptide bond: -CO-NH- with loss of H2O.",
    question: "How does a competitive inhibitor affect the Km (Michaelis constant) and Vmax of an enzymatic reaction?",
    answer: "A competitive inhibitor increases apparent Km (decreases affinity) but leaves Vmax unchanged, because high substrate concentration overcomes inhibition.",
    feynman: "A rival key fits loosely in the lock: if you dump millions of the real keys into the room, the lock works at full speed (Vmax), but finding it takes more effort (higher Km)."
  },

  // ─── CLASS 12 MATHEMATICS ───
  {
    id: "ncert-math12-1", classNum: 12, subject: "Mathematics", plantType: "sunflower", chapterNo: 3,
    title: "Matrices & Determinants", unit: "Algebra", weightage: "Super High Yield (CBSE: ~10 Marks, JEE: ~2 Qs)",
    ncertPage: "Chapters 3 & 4, NCERT Class 12",
    formula: "A · adj(A) = |A| · I; A⁻¹ = (1/|A|) · adj(A); |adj(A)| = |A|^(n-1); |AB| = |A||B|.",
    question: "State the condition for a square matrix A to be invertible and state the formula for |adj(A)| for an n×n matrix.",
    answer: "Matrix A is invertible if and only if |A| ≠ 0 (non-singular). For an n×n matrix, |adj(A)| = |A|^(n-1).",
    feynman: "Like unfolding an origami crane: if determinant is zero, space was squashed flat into zero volume, meaning no formula can ever unfold it back."
  },
  {
    id: "ncert-math12-2", classNum: 12, subject: "Mathematics", plantType: "tree", chapterNo: 5,
    title: "Continuity and Differentiability (MVT)", unit: "Calculus", weightage: "High Yield (CBSE: ~8 Marks, JEE: ~2 Qs)",
    ncertPage: "Chapter 5, NCERT Class 12",
    formula: "f'(c) = [f(b) - f(a)] / (b - a) (Lagrange's MVT); d/dx [u/v] = (v u' - u v') / v²; d/dx [a^x] = a^x ln a.",
    question: "State the conditions and conclusion of Lagrange's Mean Value Theorem for a function f(x) on [a, b].",
    answer: "If f is continuous on [a, b] and differentiable on (a, b), then there exists at least one point c ∈ (a, b) such that f'(c) = [f(b) - f(a)] / (b - a).",
    feynman: "If your car trip averaged 60 km/h over two hours, your speedometer had to point exactly at 60 km/h at least once along the highway."
  },
  {
    id: "ncert-math12-3", classNum: 12, subject: "Mathematics", plantType: "grape", chapterNo: 7,
    title: "Integrals (Substitution, Parts & King's Property)", unit: "Calculus", weightage: "Highest Yield (CBSE: ~12 Marks, JEE: ~3 Qs)",
    ncertPage: "Chapter 7, NCERT Class 12",
    formula: "∫ u v dx = u ∫ v dx - ∫ [u' (∫ v dx)] dx; King's Property: ∫_0^a f(x)dx = ∫_0^a f(a-x)dx; ∫ dx/(x² + a²) = (1/a) arctan(x/a).",
    question: "State King's Property for definite integrals and explain why it is useful for evaluating trigonometric integrals.",
    answer: "∫_a^b f(x)dx = ∫_a^b f(a + b - x)dx. When applied to ratios like sin x / (sin x + cos x) from 0 to π/2, adding the two integrals cancels terms to leave 1.",
    feynman: "Flipping a garden flowerbed horizontally doesn't change its total area: integrate from left to right or right to left, the accumulated harvest is identical."
  },
  {
    id: "ncert-math12-4", classNum: 12, subject: "Mathematics", plantType: "cactus", chapterNo: 9,
    title: "Differential Equations (Linear & Homogeneous)", unit: "Calculus", weightage: "High Yield (CBSE: ~6 Marks, JEE: ~1-2 Qs)",
    ncertPage: "Chapter 9, NCERT Class 12",
    formula: "Linear DE: dy/dx + P(x)y = Q(x); Integrating Factor I.F. = e^(∫ P dx); General solution: y · (I.F.) = ∫ Q · (I.F.) dx + C.",
    question: "How do you solve a first-order linear differential equation of the form dy/dx + P(x)y = Q(x)?",
    answer: "Multiply through by the integrating factor I.F. = e^(∫ P(x)dx); then integrate d/dx[y · I.F.] = Q(x) · I.F. to get y · I.F. = ∫ Q(x) · I.F. dx + C.",
    feynman: "Multiplying by the integrating factor glues the terms together via the product rule, turning a messy differential equation into a clean derivative ready to be undone."
  },
  {
    id: "ncert-math12-5", classNum: 12, subject: "Mathematics", plantType: "tree", chapterNo: 10,
    title: "Vector Algebra & 3D Geometry", unit: "Vectors and 3D Geometry", weightage: "Super High Yield (CBSE: ~14 Marks, JEE: ~2-3 Qs)",
    ncertPage: "Chapters 10 & 11, NCERT Class 12",
    formula: "a · b = |a||b| cos θ; a × b = |a||b| sin θ n̂; Shortest distance between skew lines d = |(a2 - a1) · (b1 × b2)| / |b1 × b2|.",
    question: "What is the formula for the shortest distance between two skew lines r = a1 + λ b1 and r = a2 + μ b2?",
    answer: "d = |(a2 - a1) · (b1 × b2)| / |b1 × b2|. If d = 0, the lines intersect.",
    feynman: "The cross product creates a flagpole perpendicular to both walking trails; the shortest distance is simply the shadow of the bridge connecting them projected onto that pole."
  },
  {
    id: "ncert-math12-6", classNum: 12, subject: "Mathematics", plantType: "blossom", chapterNo: 13,
    title: "Probability (Bayes' Theorem & Conditional)", unit: "Probability", weightage: "High Yield (CBSE: ~8 Marks, JEE: ~1-2 Qs)",
    ncertPage: "Chapter 13, NCERT Class 12",
    formula: "P(E_i|A) = [P(E_i)P(A|E_i)] / [Σ P(E_j)P(A|E_j)]; P(A ∩ B) = P(A) · P(B|A); Independent: P(A ∩ B) = P(A)P(B).",
    question: "State Bayes' Theorem for finding the posterior probability P(E1|A) given mutually exclusive and exhaustive events E1, E2, ... En.",
    answer: "P(E1|A) = [P(E1) · P(A|E1)] / [Σ_{k=1}^n P(Ek) · P(A|Ek)].",
    feynman: "Updating your beliefs with evidence: start with your prior suspicion, multiply by how likely that evidence would be under your hypothesis, and divide by the total probability of seeing that evidence."
  },

  // ─── CLASS 11 MATHEMATICS ───
  {
    id: "ncert-math11-1", classNum: 11, subject: "Mathematics", plantType: "sunflower", chapterNo: 3,
    title: "Trigonometric Functions & Identities", unit: "Trigonometry", weightage: "High Yield Foundation (JEE: ~2 Qs, CBSE: ~8 Marks)",
    ncertPage: "Chapter 3, NCERT Class 11",
    formula: "sin(A±B) = sin A cos B ± cos A sin B; cos 2A = cos²A - sin²A = 2cos²A - 1; tan(A+B) = (tan A + tan B)/(1 - tan A tan B).",
    question: "Express cos 2x in terms of tan x, and write the formula for sin 3x.",
    answer: "cos 2x = (1 - tan²x) / (1 + tan²x); sin 3x = 3 sin x - 4 sin³x.",
    feynman: "Trigonometric transformations are like gears: changing angles inside the function smoothly scales and shifts frequencies without altering the underlying circle."
  },
  {
    id: "ncert-math11-2", classNum: 11, subject: "Mathematics", plantType: "tree", chapterNo: 11,
    title: "Conic Sections (Parabola, Ellipse, Hyperbola)", unit: "Coordinate Geometry", weightage: "Super High Yield (JEE: ~2-3 Qs, CBSE: ~8 Marks)",
    ncertPage: "Chapter 11, NCERT Class 11",
    formula: "Parabola: y² = 4ax (focus (a,0), directrix x = -a); Ellipse: x²/a² + y²/b² = 1 (e = √(1 - b²/a²)); Hyperbola: x²/a² - y²/b² = 1 (e > 1).",
    question: "What is the relation between semi-major axis a, semi-minor axis b, and eccentricity e for an ellipse x²/a² + y²/b² = 1?",
    answer: "b² = a²(1 - e²), or e = √(1 - b²/a²), where 0 < e < 1. The foci are at (±ae, 0).",
    feynman: "Slice an ice cream cone at different angles: horizontal gives a circle, tilted gives an oval ellipse, parallel to the slope gives an open parabola, and steep cuts both cones as a hyperbola."
  },
  {
    id: "ncert-math11-3", classNum: 11, subject: "Mathematics", plantType: "cactus", chapterNo: 13,
    title: "Limits and Derivatives (Calculus Foundation)", unit: "Calculus", weightage: "Core Foundation (JEE: ~2 Qs, CBSE: ~6 Marks)",
    ncertPage: "Chapter 13, NCERT Class 11",
    formula: "lim_{x→0} (sin x / x) = 1; lim_{x→0} (e^x - 1)/x = 1; First principle: f'(x) = lim_{h→0} [f(x+h) - f(x)] / h.",
    question: "Prove that lim_{x→0} (sin x / x) = 1 geometrically using the unit circle squeeze theorem.",
    answer: "In the unit circle for 0 < x < π/2, area(Δ OAP) < area(sector OAP) < area(Δ OA T) yields sin x < x < tan x; dividing by sin x gives 1 < x/sin x < 1/cos x; by squeeze theorem as x → 0, limit is 1.",
    feynman: "Zooming into a circle curve so closely that the arc and its chord become indistinguishable: at micro-scale, the bend turns completely straight!"
  }
];

// =============================================================================
// 1c. REVISION TROPHIES
// =============================================================================

const REVISION_TROPHIES = [
  { id: "trophy-grape", icon: "🍇", title: "Royal Concord Cluster", desc: "Revise a grapevine chapter 5+ times.", check: s => s.chapters.some(c => getPlantType(c) === "grape" && c.revisions >= 5) },
  { id: "trophy-oak", icon: "🌰", title: "Golden Oak Acorn", desc: "Grow a tree to stability S > 14 days.", check: s => s.chapters.some(c => getPlantType(c) === "tree" && c.stability >= 14) },
  { id: "trophy-sunflower", icon: "🌻", title: "Solar Flare Bloom", desc: "Achieve ≥95% retention on a sunflower.", check: s => s.chapters.some(c => getPlantType(c) === "sunflower" && retention(c, s.simDays) >= 0.95) },
  { id: "trophy-cactus", icon: "🌵", title: "Desert Pearl", desc: "Maintain a study streak of 7+ consecutive days.", check: s => s.streak >= 7 },
  { id: "trophy-ncert", icon: "📚", title: "CBSE Bio-Maths Scholar", desc: "Plant 6 or more authentic NCERT chapters in your garden.", check: s => s.chapters.filter(c => c.id.startsWith("ncert-")).length >= 6 },
  { id: "trophy-sprint", icon: "⚡", title: "NTA Sprint Master", desc: "Score +16 or higher in a NEET/JEE Formula Sprint.", check: () => parseInt(localStorage.getItem("mg_sprint_highscore") || "0") >= 16 }
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
    const hasPollinators = r >= 0.70;
    const pollinatorsHtml = hasPollinators ? `
      <div class="pollinator-wrap">
        <div class="pollinator bee" title="Honeybee pollinating this thriving chapter">🐝</div>
        ${r >= 0.85 ? `<div class="pollinator butterfly" title="Butterfly visiting this healthy bloom">🦋</div>` : ""}
        <div class="pollinator firefly" title="Firefly glowing in night garden">✨</div>
      </div>` : "";

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
      <div class="plant-visual">${plantSVG(ch, r, w)}${pollinatorsHtml}</div>
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
// 8. AMBIENT SOUNDSCAPE ENGINE (Web Audio API — multi-nature synthesis)
// =============================================================================

let soundState = {
  enabled: false,
  type: "rain", // "rain" | "breeze" | "stream" | "off"
  volume: 0.25
};
let soundNodes = [];
let soundCtx = null;
let soundGainNode = null;

function getAudioCtx() {
  if (!soundCtx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (C) soundCtx = new C();
  }
  if (soundCtx && soundCtx.state === "suspended") soundCtx.resume();
  return soundCtx;
}

function startAmbientSound(type = soundState.type) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  stopAmbientSound();

  if (type === "off") {
    soundState.enabled = false;
    updateSoundUI();
    return;
  }

  soundState.enabled = true;
  soundState.type = type;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(soundState.volume, ctx.currentTime);
  masterGain.connect(ctx.destination);
  soundGainNode = masterGain;

  if (type === "rain") {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0=.99886*b0+white*.0555179; b1=.99332*b1+white*.0750759;
      b2=.96900*b2+white*.1538520; b3=.86650*b3+white*.3104856;
      b4=.55000*b4+white*.5329522; b5=-.7616*b5-white*.0168980;
      data[i]=(b0+b1+b2+b3+b4+b5+b6+white*.5362)*0.16;
      b6=white*.115926;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer; src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass"; filter.frequency.value = 650;

    src.connect(filter); filter.connect(masterGain);
    src.start();
    soundNodes = [src, filter, masterGain];
  } else if (type === "breeze") {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.15;
    const src = ctx.createBufferSource();
    src.buffer = buffer; src.loop = true;

    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass"; bp.frequency.value = 400; bp.Q.value = 1.8;

    const lfo = ctx.createOscillator();
    lfo.type = "sine"; lfo.frequency.value = 0.15;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain); lfoGain.connect(bp.frequency);
    lfo.start();

    src.connect(bp); bp.connect(masterGain);
    src.start();
    soundNodes = [src, bp, lfo, lfoGain, masterGain];
  } else if (type === "stream") {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.12;
    const src = ctx.createBufferSource();
    src.buffer = buffer; src.loop = true;

    const bp1 = ctx.createBiquadFilter();
    bp1.type = "bandpass"; bp1.frequency.value = 520; bp1.Q.value = 3.5;
    const bp2 = ctx.createBiquadFilter();
    bp2.type = "bandpass"; bp2.frequency.value = 850; bp2.Q.value = 4.0;

    src.connect(bp1); bp1.connect(masterGain);
    src.connect(bp2); bp2.connect(masterGain);
    src.start();
    soundNodes = [src, bp1, bp2, masterGain];
  }

  updateSoundUI();
}

function stopAmbientSound() {
  soundNodes.forEach(n => { try { n.disconnect(); if (n.stop) n.stop(); } catch(e){} });
  soundNodes = [];
  soundGainNode = null;
  soundState.enabled = false;
  updateSoundUI();
}

function updateSoundUI() {
  const btn = document.getElementById("btn-sound-toggle");
  const icon = document.getElementById("sound-icon");
  const name = document.getElementById("sound-name");
  if (!btn) return;

  if (soundState.enabled) {
    btn.classList.add("sound-active");
    if (soundState.type === "rain")   { if (icon) icon.textContent = "🌧️"; if (name) name.textContent = "Rain Audio"; }
    if (soundState.type === "breeze") { if (icon) icon.textContent = "🍃"; if (name) name.textContent = "Breeze Audio"; }
    if (soundState.type === "stream") { if (icon) icon.textContent = "🌊"; if (name) name.textContent = "Stream Audio"; }
  } else {
    btn.classList.remove("sound-active");
    if (icon) icon.textContent = "🎧";
    if (name) name.textContent = "Focus Audio";
  }

  document.querySelectorAll(".sound-option").forEach(opt => {
    opt.classList.toggle("active", opt.dataset.sound === (soundState.enabled ? soundState.type : "off"));
  });
}

function setupSoundscapeControls() {
  const btn = document.getElementById("btn-sound-toggle");
  const dropdown = document.getElementById("sound-dropdown");
  const vol = document.getElementById("sound-volume");

  btn?.addEventListener("click", e => {
    e.stopPropagation();
    dropdown?.classList.toggle("hidden");
  });

  document.addEventListener("click", e => {
    if (!e.target.closest("#soundscape-pill")) {
      dropdown?.classList.add("hidden");
    }
  });

  document.querySelectorAll(".sound-option").forEach(opt => {
    opt.addEventListener("click", () => {
      const type = opt.dataset.sound;
      if (type === "off") {
        stopAmbientSound();
      } else {
        startAmbientSound(type);
      }
      dropdown?.classList.add("hidden");
    });
  });

  vol?.addEventListener("input", e => {
    soundState.volume = parseFloat(e.target.value);
    if (soundGainNode && soundCtx) {
      soundGainNode.gain.setValueAtTime(soundState.volume, soundCtx.currentTime);
    }
  });
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
  if (typeof recordDailyRevision === "function") recordDailyRevision();
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
  const el = document.getElementById("streak-count");
  if (el) el.textContent = state.streak;
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
  if (id === "sprint")     initSprintView();
  if (id === "ncert")      renderNCERTLibrary();
  if (id === "trophies")   { renderTrophies(); renderHeatmap(); }
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
// 26. NEET & JEE +4 / −1 FORMULA SPRINT ENGINE
// =============================================================================

let sprintState = {
  running: false,
  mode: "all",
  timeLeft: 60,
  timerInterval: null,
  score: 0,
  correct: 0,
  wrong: 0,
  skipped: 0,
  currentIndex: 0,
  questions: []
};

function getSprintPool(mode) {
  let pool = [];
  if (mode === "bio12") pool = NCERT_CURRICULUM.filter(c => c.classNum === 12 && c.subject === "Biology");
  else if (mode === "math12") pool = NCERT_CURRICULUM.filter(c => c.classNum === 12 && c.subject === "Mathematics");
  else if (mode === "bio11") pool = NCERT_CURRICULUM.filter(c => c.classNum === 11 && c.subject === "Biology");
  else if (mode === "math11") pool = NCERT_CURRICULUM.filter(c => c.classNum === 11 && c.subject === "Mathematics");
  else if (mode === "garden") pool = state.chapters.map(c => ({
    title: c.title, subject: c.subject, formula: c.question, question: c.question, answer: c.answer, feynman: c.feynman, weightage: "From Active Garden"
  }));
  else pool = [...NCERT_CURRICULUM, ...DEMO_CHAPTERS.map(d => ({
    title: d.title, subject: d.subject, formula: d.question, question: d.question, answer: d.answer, feynman: d.feynman, weightage: "High-Yield Foundation"
  }))];

  return [...pool].sort(() => Math.random() - 0.5);
}

function initSprintView() {
  sprintState.questions = getSprintPool(sprintState.mode);
  sprintState.currentIndex = 0;
  renderSprintCard();
  updateSprintScoreHUD();
}

function renderSprintCard() {
  if (!sprintState.questions.length) {
    document.getElementById("sprint-question").textContent = "No questions available for this filter.";
    return;
  }
  const q = sprintState.questions[sprintState.currentIndex % sprintState.questions.length];
  
  const subEl = document.getElementById("sprint-subject");
  const wtEl  = document.getElementById("sprint-weightage");
  const qEl   = document.getElementById("sprint-question");
  const fBox  = document.getElementById("sprint-formula");
  const aEl   = document.getElementById("sprint-answer");
  const feyEl = document.getElementById("sprint-feynman");

  if (subEl) subEl.textContent = q.subject;
  if (wtEl)  wtEl.textContent  = q.weightage || "🔥 High Yield";
  if (qEl)   qEl.textContent   = q.title;
  if (fBox)  fBox.textContent  = q.formula || q.question;
  if (aEl)   aEl.textContent   = q.answer;
  if (feyEl) feyEl.textContent = q.feynman ? `💡 Feynman Insight: ${q.feynman}` : "";

  document.getElementById("sprint-answer-box")?.classList.add("hidden");
  document.getElementById("btn-sprint-reveal")?.classList.remove("hidden");
  document.getElementById("sprint-grade-btns")?.classList.add("hidden");
}

function revealSprintAnswer() {
  document.getElementById("sprint-answer-box")?.classList.remove("hidden");
  document.getElementById("btn-sprint-reveal")?.classList.add("hidden");
  document.getElementById("sprint-grade-btns")?.classList.remove("hidden");
}

function gradeSprintQuestion(type) {
  if (type === "correct") {
    sprintState.score += 4;
    sprintState.correct++;
    playWaterSound();
  } else if (type === "wrong") {
    sprintState.score -= 1;
    sprintState.wrong++;
    playBuzzerSound();
  } else {
    sprintState.skipped++;
  }

  const high = parseInt(localStorage.getItem("mg_sprint_highscore") || "0");
  if (sprintState.score > high) localStorage.setItem("mg_sprint_highscore", sprintState.score);

  updateSprintScoreHUD();
  sprintState.currentIndex++;
  renderSprintCard();
}

function updateSprintScoreHUD() {
  const scoreEl = document.getElementById("sprint-score");
  const accEl   = document.getElementById("sprint-accuracy");
  const negEl   = document.getElementById("sprint-negatives");

  if (scoreEl) scoreEl.textContent = (sprintState.score > 0 ? "+" : "") + sprintState.score;
  const attempted = sprintState.correct + sprintState.wrong;
  const acc = attempted > 0 ? Math.round((sprintState.correct / attempted) * 100) : 0;
  if (accEl) accEl.textContent = acc + "%";
  if (negEl) negEl.textContent = "−" + sprintState.wrong;
}

function startSprintTimer() {
  if (sprintState.running) return;
  sprintState.running = true;
  sprintState.timeLeft = 60;
  sprintState.score = 0;
  sprintState.correct = 0;
  sprintState.wrong = 0;
  sprintState.skipped = 0;
  sprintState.currentIndex = 0;
  sprintState.questions = getSprintPool(sprintState.mode);

  renderSprintCard();
  updateSprintScoreHUD();

  const timerEl = document.getElementById("sprint-timer");
  const startBtn = document.getElementById("btn-sprint-start");
  if (startBtn) startBtn.textContent = "⏸ Running...";

  clearInterval(sprintState.timerInterval);
  sprintState.timerInterval = setInterval(() => {
    sprintState.timeLeft--;
    if (timerEl) timerEl.textContent = sprintState.timeLeft + "s";

    if (sprintState.timeLeft <= 0) {
      clearInterval(sprintState.timerInterval);
      sprintState.running = false;
      if (startBtn) startBtn.textContent = "⚡ Start 60s Sprint";
      finishSprint();
    }
  }, 1000);
}

function finishSprint() {
  playGrowthChime();
  confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
  const attempted = sprintState.correct + sprintState.wrong;
  const acc = attempted > 0 ? Math.round((sprintState.correct / attempted) * 100) : 0;
  alert(`🏁 Sprint Completed!\n\nNTA Score: ${sprintState.score}\nCorrect (+4): ${sprintState.correct}\nWrong (−1): ${sprintState.wrong}\nSkipped: ${sprintState.skipped}\nAccuracy: ${acc}%\n\nKeep negative marks to zero to boost your percentile!`);
}

function resetSprint() {
  clearInterval(sprintState.timerInterval);
  sprintState.running = false;
  sprintState.timeLeft = 60;
  sprintState.score = 0;
  sprintState.correct = 0;
  sprintState.wrong = 0;
  sprintState.skipped = 0;
  sprintState.currentIndex = 0;
  const timerEl = document.getElementById("sprint-timer");
  const startBtn = document.getElementById("btn-sprint-start");
  if (timerEl) timerEl.textContent = "60s";
  if (startBtn) startBtn.textContent = "⚡ Start 60s Sprint";
  initSprintView();
}

function playBuzzerSound() {
  try {
    const ctx = getAudioCtx(); if (!ctx) return;
    const osc = ctx.createOscillator(); const g = ctx.createGain();
    osc.type = "sawtooth"; osc.frequency.value = 160;
    g.gain.setValueAtTime(0.08, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.26);
  } catch(e){}
}

function setupSprintControls() {
  document.querySelectorAll("[data-sprint-mode]").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-sprint-mode]").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      sprintState.mode = chip.dataset.sprintMode;
      initSprintView();
    });
  });

  document.getElementById("btn-sprint-start")?.addEventListener("click", () => {
    if (sprintState.running) {
      clearInterval(sprintState.timerInterval);
      sprintState.running = false;
      const startBtn = document.getElementById("btn-sprint-start");
      if (startBtn) startBtn.textContent = "⚡ Resume Sprint";
    } else {
      startSprintTimer();
    }
  });

  document.getElementById("btn-sprint-reset")?.addEventListener("click", resetSprint);
  document.getElementById("btn-sprint-reveal")?.addEventListener("click", revealSprintAnswer);

  document.getElementById("btn-grade-correct")?.addEventListener("click", () => gradeSprintQuestion("correct"));
  document.getElementById("btn-grade-wrong")?.addEventListener("click", () => gradeSprintQuestion("wrong"));
  document.getElementById("btn-grade-unattempted")?.addEventListener("click", () => gradeSprintQuestion("skip"));
}

// =============================================================================
// 27. CBSE NCERT CLASS 11 & 12 CURRICULUM BROWSER
// =============================================================================

let ncertFilter = "all";

function renderNCERTLibrary() {
  const grid = document.getElementById("ncert-cards-grid");
  const countEl = document.getElementById("ncert-total-count");
  if (!grid) return;

  if (countEl) countEl.textContent = NCERT_CURRICULUM.length;

  const filtered = NCERT_CURRICULUM.filter(item => {
    if (ncertFilter === "bio12")  return item.classNum === 12 && item.subject === "Biology";
    if (ncertFilter === "math12") return item.classNum === 12 && item.subject === "Mathematics";
    if (ncertFilter === "bio11")  return item.classNum === 11 && item.subject === "Biology";
    if (ncertFilter === "math11") return item.classNum === 11 && item.subject === "Mathematics";
    return true;
  });

  grid.innerHTML = filtered.map(item => {
    const isPlanted = state.chapters.some(c => c.id === item.id || c.title.toLowerCase() === item.title.toLowerCase());
    const spec = speciesMeta(item.plantType);
    const badgeClass = item.subject === "Biology" ? "bio" : "math";

    return `
      <div class="ncert-card">
        <div>
          <div class="ncert-card-hdr">
            <span class="ncert-badge ${badgeClass}">Class ${item.classNum} ${item.subject}</span>
            <span class="species-badge species-${item.plantType}">${spec.icon} ${spec.name}</span>
          </div>
          <h4 class="ncert-card-title">${esc(item.title)}</h4>
          <p class="muted" style="font-size:.78rem;margin-bottom:.5rem">${esc(item.unit)} • ${esc(item.weightage)}</p>
          <div class="ncert-card-formula">${esc(item.formula)}</div>
        </div>
        <div class="ncert-card-actions">
          <span class="muted" style="font-size:.75rem">${esc(item.ncertPage)}</span>
          ${isPlanted ? `
            <span style="font-size:.82rem;font-weight:700;color:var(--green-l)">✓ In Garden</span>
          ` : `
            <button class="btn btn-primary btn-sm" onclick="plantNCERTChapter('${item.id}')">🌱 Plant in Garden</button>
          `}
        </div>
      </div>
    `;
  }).join("");
}

function plantNCERTChapter(id) {
  const item = NCERT_CURRICULUM.find(c => c.id === id);
  if (!item) return;

  if (state.chapters.some(c => c.id === id)) {
    alert("This chapter is already planted in your garden!");
    return;
  }

  const s0 = 2.4;
  state.chapters.unshift({
    id: item.id,
    title: item.title,
    subject: item.subject,
    plantType: item.plantType,
    dateStudied: today(),
    lastWatered: today(),
    revisions: 0,
    difficulty: 2,
    stability: s0,
    question: item.question,
    answer: item.answer,
    feynman: item.feynman
  });

  saveChapters();
  renderGarden();
  renderNCERTLibrary();
  playWaterSound();
  confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  alert(`🌱 Planted "${item.title}" into your garden! Water it regularly to build permanent memory stability.`);
}

function plantAllNCERTUnit(filterType) {
  const toPlant = NCERT_CURRICULUM.filter(item => {
    if (filterType === "bio12")  return item.classNum === 12 && item.subject === "Biology";
    if (filterType === "math12") return item.classNum === 12 && item.subject === "Mathematics";
    return false;
  });

  let count = 0;
  toPlant.forEach(item => {
    if (!state.chapters.some(c => c.id === item.id)) {
      state.chapters.push({
        id: item.id,
        title: item.title,
        subject: item.subject,
        plantType: item.plantType,
        dateStudied: today(),
        lastWatered: today(),
        revisions: 0,
        difficulty: 2,
        stability: 2.4,
        question: item.question,
        answer: item.answer,
        feynman: item.feynman
      });
      count++;
    }
  });

  if (count > 0) {
    saveChapters();
    renderGarden();
    renderNCERTLibrary();
    playGrowthChime();
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    alert(`🌿 Successfully planted ${count} NCERT chapters into your garden!`);
  } else {
    alert("All these chapters are already growing in your garden!");
  }
}

function setupNCERTControls() {
  document.querySelectorAll("[data-ncert-filter]").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-ncert-filter]").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      ncertFilter = chip.dataset.ncertFilter;
      renderNCERTLibrary();
    });
  });

  document.getElementById("btn-plant-all-ncert12bio")?.addEventListener("click", () => plantAllNCERTUnit("bio12"));
  document.getElementById("btn-plant-all-ncert12math")?.addEventListener("click", () => plantAllNCERTUnit("math12"));
}

// =============================================================================
// 28. HARVEST TROPHIES, 365-DAY HEATMAP & SHAREABLE PROGRESS CARD
// =============================================================================

function recordDailyRevision() {
  const t = today();
  let act = {};
  try {
    act = JSON.parse(localStorage.getItem("mg_daily_activity") || "{}");
  } catch(e){}
  act[t] = (act[t] || 0) + 1;
  localStorage.setItem("mg_daily_activity", JSON.stringify(act));
}

function getDailyActivity() {
  try {
    const act = JSON.parse(localStorage.getItem("mg_daily_activity") || "{}");
    if (Object.keys(act).length === 0) {
      act[daysAgo(1)] = 3;
      act[daysAgo(2)] = 2;
      act[daysAgo(3)] = 4;
      act[daysAgo(5)] = 1;
      act[today()] = 2;
    }
    return act;
  } catch(e) {
    return {};
  }
}

function renderHeatmap() {
  const grid = document.getElementById("revision-heatmap-grid");
  if (!grid) return;

  const act = getDailyActivity();
  const cells = [];
  const totalDays = 52 * 7;

  for (let i = totalDays - 1; i >= 0; i--) {
    const dStr = daysAgo(i);
    const count = act[dStr] || 0;
    let lvl = "";
    if (count >= 4) lvl = "lvl-4";
    else if (count === 3) lvl = "lvl-3";
    else if (count === 2) lvl = "lvl-2";
    else if (count === 1) lvl = "lvl-1";

    cells.push(`<div class="heatmap-cell ${lvl}" title="${dStr}: ${count} revisions"></div>`);
  }

  grid.innerHTML = cells.join("");
}

function renderTrophies() {
  const shelf = document.getElementById("trophy-shelf");
  if (!shelf) return;

  shelf.innerHTML = REVISION_TROPHIES.map(t => {
    const unlocked = t.check(state);
    return `
      <div class="trophy-card ${unlocked ? "unlocked" : "locked"}">
        <div class="trophy-icon">${t.icon}</div>
        <div class="trophy-info">
          <h4>${esc(t.title)}</h4>
          <p>${esc(t.desc)}</p>
          <span style="font-size:.72rem;font-weight:700;color:${unlocked ? "var(--green-l)" : "var(--text-3)"};display:block;margin-top:.3rem">
            ${unlocked ? "✓ UNLOCKED" : "🔒 LOCKED"}
          </span>
        </div>
      </div>
    `;
  }).join("");
}

function openShareCard() {
  const modal = document.getElementById("modal-share-card");
  if (!modal) return;

  let totalRet = 0, totalRev = 0;
  state.chapters.forEach(c => {
    totalRet += retention(c, state.simDays);
    totalRev += c.revisions || 0;
  });
  const avgHealth = state.chapters.length ? Math.round((totalRet / state.chapters.length) * 100) : 100;

  document.getElementById("share-card-health").textContent = avgHealth + "%";
  document.getElementById("share-card-plants").textContent = state.chapters.length;
  document.getElementById("share-card-streak").textContent = state.streak + "d";
  document.getElementById("share-card-revisions").textContent = totalRev;
  document.getElementById("share-card-date").textContent = new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });

  modal.classList.remove("hidden");
}

function setupShareCardActions() {
  document.getElementById("btn-open-share-card")?.addEventListener("click", openShareCard);

  document.getElementById("btn-copy-card-text")?.addEventListener("click", () => {
    let totalRet = 0, totalRev = 0;
    state.chapters.forEach(c => { totalRet += retention(c, state.simDays); totalRev += c.revisions || 0; });
    const avgHealth = state.chapters.length ? Math.round((totalRet / state.chapters.length) * 100) : 100;

    const summary = `🌿 *My Memory Garden Study Progress*
📅 Date: ${today()}
🔥 Day Streak: ${state.streak} days
🌱 Active Plants: ${state.chapters.length} chapters
💚 Garden Health: ${avgHealth}%
💧 Total Revisions: ${totalRev}
✨ Crafted by Lujain • https://memory-garden-zeta.vercel.app`;

    navigator.clipboard.writeText(summary).then(() => {
      alert("📋 Copied summary to clipboard! Share it in your study group or WhatsApp.");
    });
  });

  document.getElementById("btn-print-card")?.addEventListener("click", () => {
    window.print();
  });
}


// =============================================================================
// 24. ACADEMIC PRO COMMAND CENTER (CBSE CLASS 11 & 12 • NEET • JEE)
// Dedicated Plant-Free Workspace, Spaced Revision Taskforce,
// Official NCERT E-Books Reader, Worked Solutions & Exam Prep Bank
// =============================================================================

// Default High-Yield Syllabus Modules for Class 11 & 12 CBSE, NEET & JEE
const DEFAULT_ACADEMIC_TASKS = [
  {
    id: "acad_b12_01",
    subject: "Biology",
    classLevel: "12",
    targetExam: "NEET",
    title: "Molecular Basis of Inheritance (DNA Replication, Transcription, Lac Operon)",
    initialDate: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    stage: 1, // R1
    lastRevised: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    nextDue: new Date(Date.now()).toISOString().split('T')[0], // Due Today!
    priority: "high",
    notes: "High-yield (8-10 NEET Qs): Meselson-Stahl N15/N14 density gradient, tRNA cloverleaf model, lac operon allolactose inducer."
  },
  {
    id: "acad_m12_01",
    subject: "Mathematics",
    classLevel: "12",
    targetExam: "JEE",
    title: "Calculus: Integrals & Definite Integrals (King's Property & By-Parts)",
    initialDate: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
    stage: 2, // R2
    lastRevised: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
    nextDue: new Date(Date.now()).toISOString().split('T')[0], // Due Today!
    priority: "high",
    notes: "CBSE 6-marker & JEE standard: King's rule ∫₀ᵃ f(x)dx = ∫₀ᵃ f(a-x)dx, reduction formulas, and partial fractions."
  },
  {
    id: "acad_p12_01",
    subject: "Physics",
    classLevel: "12",
    targetExam: "JEE",
    title: "Current Electricity: Kirchhoff's Laws & Potentiometer Sensitivity",
    initialDate: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    stage: 1, // R1
    lastRevised: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    nextDue: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    priority: "high",
    notes: "Kirchhoff junction rule (charge conservation) & loop rule (energy conservation). Drift velocity vd = eEτ/m."
  },
  {
    id: "acad_c12_01",
    subject: "Chemistry",
    classLevel: "12",
    targetExam: "NEET",
    title: "Electrochemistry: Nernst Equation, Kohlrausch Law & Faraday's Laws",
    initialDate: new Date(Date.now() - 8 * 86400000).toISOString().split('T')[0],
    stage: 2, // R2
    lastRevised: new Date(Date.now() - 8 * 86400000).toISOString().split('T')[0],
    nextDue: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0], // Overdue!
    priority: "high",
    notes: "Ecell = E°cell - (0.0591/n) log Q at 298K. Λ°m for weak electrolytes via Kohlrausch limiting molar conductivities."
  },
  {
    id: "acad_b12_02",
    subject: "Biology",
    classLevel: "12",
    targetExam: "NEET",
    title: "Principles of Inheritance and Variation (Mendelian Genetics & Linkage)",
    initialDate: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
    stage: 3, // R3
    lastRevised: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
    nextDue: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    priority: "high",
    notes: "Morgan's Drosophila linkage experiments, recombination frequency map units, pedigree analysis autosomal recessive vs sex-linked."
  },
  {
    id: "acad_m12_02",
    subject: "Mathematics",
    classLevel: "12",
    targetExam: "CBSE",
    title: "Vectors & Three Dimensional Geometry (Shortest Distance Between Skew Lines)",
    initialDate: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    stage: 1, // R1
    lastRevised: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    nextDue: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    priority: "med",
    notes: "Shortest distance d = |(a2 - a1) · (b1 × b2)| / |b1 × b2|. Coplanarity condition [a2-a1, b1, b2] = 0."
  },
  {
    id: "acad_p12_02",
    subject: "Physics",
    classLevel: "12",
    targetExam: "NEET",
    title: "Ray Optics & Optical Instruments (Lens Maker Formula, Prism & Microscope)",
    initialDate: new Date(Date.now() - 28 * 86400000).toISOString().split('T')[0],
    stage: 4, // Mastered
    lastRevised: new Date(Date.now() - 10 * 86400000).toISOString().split('T')[0],
    nextDue: new Date(Date.now() + 20 * 86400000).toISOString().split('T')[0],
    priority: "high",
    notes: "1/f = (μ - 1)(1/R1 - 1/R2). Minimum deviation δm = 2i - A. Compound microscope magnifying power m = (L/fo)(1 + D/fe)."
  },
  {
    id: "acad_c12_02",
    subject: "Chemistry",
    classLevel: "12",
    targetExam: "JEE",
    title: "Aldehydes, Ketones and Carboxylic Acids (Aldol, Cannizzaro & Tollens)",
    initialDate: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
    stage: 2, // R2
    lastRevised: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
    nextDue: new Date(Date.now() + 1 * 86400000).toISOString().split('T')[0],
    priority: "high",
    notes: "Aldol with α-H, Cannizzaro disproportionation without α-H. Nucleophilic addition reactivity: HCHO > RCHO > RCOR."
  },
  {
    id: "acad_b11_01",
    subject: "Biology",
    classLevel: "11",
    targetExam: "NEET",
    title: "Cell: The Unit of Life (Endomembrane System, Mitochondria & Ribosomes)",
    initialDate: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    stage: 0, // R0
    lastRevised: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    nextDue: new Date(Date.now()).toISOString().split('T')[0], // Due Today!
    priority: "med",
    notes: "70S vs 80S ribosomes, fluid mosaic model (Singer-Nicolson 1972), 9+2 vs 9+0 microtubule axoneme arrangement."
  },
  {
    id: "acad_m11_01",
    subject: "Mathematics",
    classLevel: "11",
    targetExam: "JEE",
    title: "Conic Sections: Parabola, Ellipse & Hyperbola (Standard Forms & Eccentricity)",
    initialDate: new Date(Date.now() - 10 * 86400000).toISOString().split('T')[0],
    stage: 2, // R2
    lastRevised: new Date(Date.now() - 10 * 86400000).toISOString().split('T')[0],
    nextDue: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
    priority: "high",
    notes: "Eccentricity e = c/a. Parabola y²=4ax tangent y=mx+a/m. Ellipse x²/a²+y²/b²=1 (b²=a²(1-e²)). Directrix and focal properties."
  },
  {
    id: "acad_p11_01",
    subject: "Physics",
    classLevel: "11",
    targetExam: "JEE",
    title: "Laws of Motion & Friction (Free Body Diagrams, Banking of Roads)",
    initialDate: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
    stage: 1, // R1
    lastRevised: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
    nextDue: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    priority: "high",
    notes: "Optimum banking speed v = √(rg tan θ). Max safe speed with friction v = √[rg (μ + tan θ)/(1 - μ tan θ)]. Impulse J = Δp."
  },
  {
    id: "acad_c11_01",
    subject: "Chemistry",
    classLevel: "11",
    targetExam: "NEET",
    title: "Chemical Bonding & Molecular Structure (VSEPR, Hybridisation & MOT)",
    initialDate: new Date(Date.now() - 12 * 86400000).toISOString().split('T')[0],
    stage: 3, // R3
    lastRevised: new Date(Date.now() - 12 * 86400000).toISOString().split('T')[0],
    nextDue: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
    priority: "high",
    notes: "Bond order = 1/2(Nb - Na). O2 paramagnetic due to 2 unpaired electrons in π*2px, π*2py. Dipole moments: NH3 (1.47D) > NF3 (0.24D)."
  }
];

// Official NCERT E-Books Catalog with Real NCERT Text & Golden Lines

// =============================================================================
// ADDITIONAL NCERT E-BOOKS (CHEMISTRY, BIOLOGY, PHYSICS, ENGLISH 11 & 12)
// =============================================================================

const ADDITIONAL_NCERT_EBOOKS = [
  // Chemistry 12
  {
    id: "ncert_c12_ch01",
    code: "lech101",
    classLevel: "12",
    subject: "Chemistry",
    category: "12-chem",
    chNumber: "Chapter 1",
    title: "Solutions (Liquid & Solid)",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?lech1=1-5",
    topics: "Types of Solutions, Raoult's Law (Ideal & Non-ideal), Colligative Properties (RLVP, Elevation in BP, Depression in FP, Osmotic Pressure), Van 't Hoff Factor.",
    synopsis: "Solutions are homogeneous mixtures of two or more components. In a binary solution, the component present in larger quantity is solvent. Raoult's law states that for a solution of volatile liquids, the partial vapour pressure of each component is directly proportional to its mole fraction in solution.",
    goldenLines: [
      "NCERT Golden Line 1: 'Henry's law constant KH is a function of the nature of the gas. Higher the value of KH at a given pressure, the lower is the solubility of the gas in the liquid.'",
      "NCERT Golden Line 2: 'Solutions which show large positive deviations from Raoult's law form minimum boiling azeotropes (e.g. 95% ethanol in water). Solutions showing negative deviations form maximum boiling azeotropes (e.g. 68% nitric acid in water).' (NEET 2021, 2023)"
    ],
    formulas: [
      "Raoult's Law: p1 = x1 p1°",
      "Elevation in Boiling Point: ΔTb = i Kb m",
      "Depression in Freezing Point: ΔTf = i Kf m",
      "Osmotic Pressure: Π = i C R T = i (n2 / V) R T"
    ],
    intextQuestions: [
      "Q: Why are aquatic species more comfortable in cold waters rather than in warm waters? Ans: Because gas solubility increases with decrease in temperature (KH decreases). Hence cold water contains more dissolved oxygen than warm water."
    ]
  },
  {
    id: "ncert_c12_ch05",
    code: "lech105",
    classLevel: "12",
    subject: "Chemistry",
    category: "12-chem",
    chNumber: "Chapter 5",
    title: "Coordination Compounds",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?lech1=5-5",
    topics: "Werner's Theory, Ligands & Coordination Number, IUPAC Nomenclature, Isomerism (Geometrical, Optical, Linkage, Coordination), Valence Bond Theory, Crystal Field Theory (CFT).",
    synopsis: "Coordination compounds are the backbone of modern inorganic and bio-inorganic chemistry. Hemoglobin is a coordination compound of iron; chlorophyll of magnesium; vitamin B12 of cobalt. Alfred Werner postulated primary (ionisable) and secondary (non-ionisable) valencies.",
    goldenLines: [
      "NCERT Golden Line 1: 'According to Crystal Field Theory, in an octahedral crystal field, the degenerated d-orbitals split into two sets: lower energy triply degenerate t2g (dxy, dyz, dzx) and higher energy doubly degenerate eg (dx²-y², dz²).' (NEET 2020, 2022)",
      "NCERT Golden Line 2: 'Spectrochemical series is an experimentally determined series of ligands in order of increasing field strength: I⁻ < Br⁻ < SCN⁻ < Cl⁻ < S²⁻ < F⁻ < OH⁻ < C2O4²⁻ < H2O < NCS⁻ < EDTA⁴⁻ < NH3 < en < CN⁻ < CO.'"
    ],
    formulas: [
      "Crystal Field Splitting in Octahedral: Δo; Tetrahedral: Δt = (4/9) Δo",
      "Magnetic Moment (spin-only): μ = √[n(n + 2)] Bohr Magnetons (BM), where n = number of unpaired electrons"
    ],
    intextQuestions: [
      "Q: Why is [Ni(CO)4] diamagnetic whereas [NiCl4]²⁻ is paramagnetic? Ans: CO is a strong field ligand that forces pairing of 3d electrons in Ni(0) giving dsp² or sp³ configuration with zero unpaired electrons (diamagnetic). Cl⁻ is a weak field ligand, leaving two unpaired electrons in Ni(II) (paramagnetic)."
    ]
  },
  // English Core 12 - Flamingo
  {
    id: "ncert_e12_fl01",
    code: "lefl101",
    classLevel: "12",
    subject: "English",
    category: "12-eng",
    chNumber: "Flamingo Ch 1",
    title: "The Last Lesson (Alphonse Daudet)",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?lefl1=1-8",
    topics: "Franco-Prussian War (1870), Order from Berlin banning French in Alsace and Lorraine, M. Hamel's 40 years of service, Franz's realization of linguistic value, Patriotism and linguistic chauvinism.",
    synopsis: "Set during the Franco-Prussian War in which France was defeated by Prussia led by Bismarck. The French districts of Alsace and Lorraine passed into Prussian hands. The order came from Berlin that only German would be taught in the schools of Alsace and Lorraine. It depicts the sudden shock and deep remorse felt by students and villagers on realizing the irreplaceable value of their mother tongue.",
    goldenLines: [
      "NCERT Golden Line 1: 'When a people are enslaved, as long as they hold fast to their language it is as if they had the key to their prison.' (M. Hamel's profound declaration to his class).",
      "NCERT Golden Line 2: 'Vive La France!' (Long Live France!) — written on the blackboard in as large letters as he could by M. Hamel before leaning his head against the wall.",
      "CBSE Exam Theme: Linguistic chauvinism, procrastination in education ('Bah! I've plenty of time. I'll learn it tomorrow'), and the awakening of national consciousness."
    ],
    formulas: [
      "CBSE Literature 5-Mark Value Points: Character transformation of Franz from negligent student to respectful learner; dignity of M. Hamel in his Sunday best green coat and frilled shirt; villagers sitting quietly in the back benches honoring French heritage."
    ],
    intextQuestions: [
      "Q: What did Franz notice that was unusual about the school that day? Ans: Instead of the usual noisy bustle heard out in the street, everything was as quiet as Sunday morning. M. Hamel was wearing his ceremonial green coat and embroidered black silk cap, and the village elders (old Hauser, the former mayor, the former postmaster) were sitting quietly on the back benches."
    ]
  },
  {
    id: "ncert_e12_fl02",
    code: "lefl102",
    classLevel: "12",
    subject: "English",
    category: "12-eng",
    chNumber: "Flamingo Ch 2",
    title: "Lost Spring: Stories of Stolen Childhood (Anees Jung)",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?lefl1=2-8",
    topics: "Seemapuri Ragpickers & Saheb-e-Alam ('Lord of the Universe'), Firozabad Glass Bangle Industry & Mukesh, Systemic Poverty, Exploitation by Sahukars, Policemen, Bureaucrats & Politicians.",
    synopsis: "Anees Jung analyses the grinding poverty and traditions which condemn thousands of innocent Indian children to a life of perpetual exploitation. Part 1 depicts Saheb-e-Alam, a young ragpicker from Dhaka who searches for gold in the garbage heaps of Seemapuri. Part 2 portrays Mukesh of Firozabad who dares to dream of becoming a motor mechanic despite the vicious circle of the glass bangle industry.",
    goldenLines: [
      "NCERT Golden Line 1: 'Garbage to them is gold. It is their daily bread, a roof over their heads, even if it is a leaking roof. For children, it is wrapped in wonder; for elders, it is a means of survival.'",
      "NCERT Golden Line 2: 'Together they have imposed the baggage on the child that he cannot put down. Before he is aware, he accepts it as naturally as his father. To dare is not part of his growing up.' (Anees Jung on the nexus of sahukars and policemen in Firozabad)."
    ],
    formulas: [
      "CBSE Contrast Analysis: Saheb loses his freedom when he takes a job at the tea stall carrying a heavy steel canister ('The steel canister seems heavier than the plastic bag'); Mukesh retains his spirit of defiance and agency."
    ],
    intextQuestions: [
      "Q: What is the irony in the name 'Saheb-e-Alam'? Ans: 'Saheb-e-Alam' means 'Lord of the Universe'. The biting irony is that in reality, he is an impoverished, barefoot ragpicker wandering the filthy alleys of Delhi without even a pair of chappals."
    ]
  },
  {
    id: "ncert_e12_fl09",
    code: "lefl109",
    classLevel: "12",
    subject: "English",
    category: "12-eng",
    chNumber: "Flamingo Poem 1",
    title: "My Mother at Sixty-Six (Kamala Das)",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?lefl1=9-14",
    topics: "Poem on Aging, Drive from home to Cochin airport, Contrast between youthful vitality outside and elderly frail mother inside, Late winter's moon simile, Familiar ache of childhood fear.",
    synopsis: "Kamala Das captures the complex subtleties of human relationships in lyrical verse. While driving to Cochin airport with her mother beside her, she notices her mother dozing with open mouth, her face ashen like that of a corpse. To divert her mind, she looks outside at young trees sprinting and merry children spilling out of their homes.",
    goldenLines: [
      "NCERT Golden Line 1: '...looked but soon put that thought away, and looked out at Young Trees sprinting, the merry children spilling out of their homes...'",
      "NCERT Golden Line 2: '...as a late winter's moon and felt that old familiar ache, my childhood's fear, but all I said was, see you soon, Amma, all I did was smile and smile and smile...'"
    ],
    formulas: [
      "Poetic Devices: (1) Simile: 'face ashen like that of a corpse', 'as a late winter's moon'. (2) Personification: 'Young Trees sprinting'. (3) Metaphor: 'merry children spilling'. (4) Repetition: 'smile and smile and smile'."
    ],
    intextQuestions: [
      "Q: Why has the mother been compared to the 'late winter's moon'? Ans: The late winter's moon looks dim, hazy, pale, and lacks brightness and vitality due to mist and fog. Similarly, the poet's 66-year-old mother has lost her youthful radiance, glow, and energy due to advanced aging."
    ]
  },
  // English 12 - Vistas
  {
    id: "ncert_e12_vt02",
    code: "levt102",
    classLevel: "12",
    subject: "English",
    category: "12-eng",
    chNumber: "Vistas Ch 2",
    title: "The Tiger King (Kalki)",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?levt1=2-6",
    topics: "Maharaja of Pratibandapuram (Sir Jilani Jung Jung Bahadur), Astrologer's prophecy (death from hundredth tiger), Vow to hunt 100 tigers, British officer's wife diamond rings bribe, Climax with wooden toy tiger.",
    synopsis: "A biting political satire by Kalki on the vanity, arrogance, and ruthless exploitation of power by rulers. At the age of 10 days, the infant prince astonishes everyone by asking the astrologers the manner of his death. Told that he will be killed by a tiger, he vows to kill 100 tigers, only to succumb to an infection caused by a tiny wooden sliver from a cheap toy tiger bought for his son.",
    goldenLines: [
      "NCERT Golden Line 1: 'Let tigers beware!' — spoken by the ten-day-old prince of Pratibandapuram.",
      "NCERT Golden Line 2: 'In this manner the hundredth tiger took its final revenge upon the Tiger King.' (The ultimate dramatic irony in English literature)."
    ],
    formulas: [
      "CBSE Analysis Theme: Satire on bureaucratic sycophancy (Dewan arranging old tiger from Madras People's Park); wildlife conservation; inevitability of fate."
    ],
    intextQuestions: [
      "Q: What did the Maharaja do when he stood in danger of losing his kingdom due to refusing a British high-ranking officer permission to hunt tigers? Ans: He sent fifty expensive diamond rings from a famous British jeweller in Calcutta to the British officer's wife ('the good lady') expecting her to choose one or two. She kept all fifty, costing the Maharaja 3 lakh rupees, but his throne was saved."
    ]
  },
  // Physics 12 - Electrostatics
  {
    id: "ncert_p12_ch01",
    code: "leph101",
    classLevel: "12",
    subject: "Physics",
    category: "12-phys",
    chNumber: "Chapter 1",
    title: "Electric Charges and Fields",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?leph1=1-8",
    topics: "Coulomb's Law, Principle of Superposition, Electric Field Lines, Electric Dipole & Torque in Uniform Field, Gauss's Law & Applications (Infinite Wire, Infinite Sheet, Thin Spherical Shell).",
    synopsis: "Electrostatics deals with the study of forces, fields, and potentials arising from static charges. Coulomb's inverse square law describes the force between two point charges in vacuum: F = (1/4πε₀)(q1 q2 / r²). Gauss's law equates the total electric flux through a closed surface to Q_enclosed / ε₀.",
    goldenLines: [
      "NCERT Golden Line 1: 'Electric field inside a uniformly charged thin spherical shell is identically zero everywhere. Outside the shell, the electric field is as if the entire charge were concentrated at the center.'",
      "NCERT Golden Line 2: 'Electric field lines never cross each other because if they did, the field at the point of intersection would have two different directions, which is physically impossible.' (CBSE 2-Marker)"
    ],
    formulas: [
      "Electric Dipole on Axial Line: E_axial = 2kp / r³ (r >> 2a)",
      "Electric Dipole on Equatorial Line: E_eq = -kp / r³",
      "Torque on Dipole: τ = p × E; Potential Energy: U = -p · E"
    ],
    intextQuestions: [
      "Q: Why does a charged comb attract small bits of paper? Ans: The electric field of the charged comb polarizes the neutral bits of paper, inducing opposite charges near the comb and like charges away. The attractive force on the nearer induced charge exceeds the repulsive force on the farther charge."
    ]
  },
  // Biology 12 - Human Reproduction
  {
    id: "ncert_b12_ch03",
    code: "lebo103",
    classLevel: "12",
    subject: "Biology",
    category: "12-bio",
    chNumber: "Chapter 3",
    title: "Human Reproduction",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?lebo1=3-13",
    topics: "Male & Female Reproductive Systems, Microscopic Anatomy of Testis & Ovary, Spermatogenesis & Oogenesis, Menstrual Cycle (FSH, LH, Estrogen, Progesterone), Fertilisation & Implantation, Pregnancy & Parturition.",
    synopsis: "Humans are sexually reproducing and viviparous. The reproductive events in humans include gametogenesis, insemination, fertilisation leading to formation of zygote, blastocyst development and implantation in the uterine wall, gestation, and parturition.",
    goldenLines: [
      "NCERT Golden Line 1: 'LH surge: Rapid secretion of LH leading to its maximum level during the mid-cycle (around 14th day) induces rupture of Graafian follicle and thereby release of ovum (ovulation).' (NEET 2020, 2023)",
      "NCERT Golden Line 2: 'The secretions of acrosome (hyaluronidase & acrosin) help the sperm enter into the cytoplasm of the ovum through the zona pellucida and plasma membrane. Entry of sperm induces completion of meiotic division II of secondary oocyte.'"
    ],
    formulas: [
      "Spermatogonium (2n) --> Primary Spermatocyte (2n) --> 2 Secondary Spermatocytes (n) --> 4 Spermatids (n) --> 4 Spermatozoa (n)",
      "Oogonium (2n) --> Primary Oocyte (2n) --> 1 Secondary Oocyte (n) + 1st Polar Body --> 1 Ovum (n) + 2nd Polar Body"
    ],
    intextQuestions: [
      "Q: Mention the functions of Sertoli cells and Leydig cells. Ans: Sertoli cells provide nutrition to the developing germ cells (spermatozoa). Leydig (interstitial) cells synthesize and secrete testicular hormones called androgens (testosterone)."
    ]
  }
];

// Open-Source NCERT Solutions Expansion (including English literature & writing skills)
const ADDITIONAL_NCERT_SOLUTIONS = [
  {
    id: "sol_eng_01",
    classLevel: "12",
    subject: "English",
    type: "textbook",
    chapter: "The Last Lesson (Flamingo)",
    qNumber: "Thinking About Text Q1",
    question: "What changes did the order from Berlin cause in school that day in Alsace?",
    steps: [
      "<strong>Step 1: Environmental & Atmosphere Changes:</strong> The school was unusually quiet, like a Sunday morning. The customary hustle and bustle of opening desks and reciting lessons in unison was completely absent.",
      "<strong>Step 2: Change in Teacher's Deportment:</strong> M. Hamel was dressed in his solemn festive Sunday attire — his beautiful green coat, ruffled shirt, and embroidered black silk cap that he only wore on inspection and prize days.",
      "<strong>Step 3: Presence of Village Elders:</strong> The village elders (old Hauser with his primer, former mayor, former postmaster) occupied the empty back benches to pay respect to M. Hamel's 40 years of devoted service and show solidarity with their mother tongue.",
      "<strong>Step 4: Shift in Student Mindset:</strong> Franz, who had dreaded French and participles, suddenly developed an acute love and reverence for his books, realizing with guilt how much time he had wasted."
    ],
    answer: "The order from Berlin brought a heavy silence over the school, transformed M. Hamel into a dignified and gentle patriot, filled the classroom with repentant village elders, and awakened a fierce love for the French language among the students.",
    markingScheme: "1 Mark for school atmosphere + 1 Mark for M. Hamel's dress + 1 Mark for village elders + 1 Mark for Franz's emotional transformation. Total: 4 Marks (CBSE Board Standard)."
  },
  {
    id: "sol_eng_02",
    classLevel: "12",
    subject: "English",
    type: "exemplar",
    chapter: "Lost Spring (Flamingo)",
    qNumber: "CBSE Board HOTS Q4",
    question: "How is Mukesh's attitude to his situation different from that of his family and the community in Firozabad?",
    steps: [
      "<strong>Step 1: Community Mindset of Resignation:</strong> The bangle-making community in Firozabad has accepted their impoverished destiny as 'karam' (fate) or God-given lineage. Mukesh's grandmother believes that their caste destiny is unalterable.",
      "<strong>Step 2: Vicious Circle & Paralysis of Will:</strong> Years of mind-numbing toil have killed all initiative and ability to dream among the youth. They fear police harassment and sahukars if they organize a cooperative.",
      "<strong>Step 3: Mukesh's Defiance and Dream:</strong> Mukesh dares to break the ancestral mold. He insists: 'I will be a motor mechanic. I will learn to drive a car.'",
      "<strong>Step 4: Pragmatic Determination:</strong> When asked if he dreams of flying a plane, he looks down and says no — his dream is grounded in practical reality (he is content with cars, as few planes fly over Firozabad)."
    ],
    answer: "While his family and peers are paralyzed by fatalism and systemic exploitation, Mukesh exhibits independent agency, courage, and a spark of rebellion by aspiring to become a motor mechanic rather than surrender to the hereditary glass furnace.",
    markingScheme: "1.5 Marks for contrast with fatalistic family + 1.5 Marks for Mukesh's specific mechanic ambition + 1 Mark for analysis of reality vs fantasy. Total: 4 Marks."
  },
  {
    id: "sol_eng_03",
    classLevel: "12",
    subject: "English",
    type: "textbook",
    chapter: "Writing Skills: Notice Writing",
    qNumber: "CBSE 5-Mark Question",
    question: "You are Ananya/Arjun, Secretary of the Science Club of Delhi Public School, Chennai. Draft a formal notice in not more than 50 words inviting students of Classes 11 and 12 for the Annual Inter-School Science Exhibition.",
    steps: [
      "<strong>Step 1: Layout Requirements (Box Mandatory):</strong> Notice must be enclosed within a neat rectangular box.",
      "<strong>Step 2: Standard Format Breakdown:</strong>",
      "• Name of Institution: DELHI PUBLIC SCHOOL, CHENNAI (Bold, Centered)",
      "• Word 'NOTICE' (Centered, All Caps)",
      "• Date of Issue: 18 November 2026 (Left aligned)",
      "• Heading: ANNUAL INTER-SCHOOL SCIENCE EXHIBITION (Centered)",
      "<strong>Step 3: Content (50 Words Target):</strong> Must specify Date, Time, Venue, Eligibility, Submission deadline for models, and Teacher coordinator.",
      "<strong>Step 4: Sign-off:</strong> Name and Designation (Ananya / Arjun, Secretary - Science Club)."
    ],
    answer: "[BOX CONTAINER]\nDELHI PUBLIC SCHOOL, CHENNAI\nNOTICE\n18 November 2026\nANNUAL INTER-SCHOOL SCIENCE EXHIBITION\nThis is to notify all students of Classes XI and XII that the Science Club is organizing the Annual Inter-School Science Exhibition on 5 December 2026 from 9:00 AM to 3:00 PM in the School Auditorium. Interested students must register working science models/innovations with the undersigned by 28 November 2026. Attractive trophies and certificates await winners.\n\nArjun\n(ARJUN)\nSecretary, Science Club",
    markingScheme: "Format (Box, Institution, Date, Title, Sign-off): 1 Mark | Content (Date, Time, Venue, Purpose): 2 Marks | Accuracy & Fluency (Within 50 words): 1 Mark. Total: 4 Marks."
  },
  {
    id: "sol_chem_02",
    classLevel: "12",
    subject: "Chemistry",
    type: "textbook",
    chapter: "Solutions",
    qNumber: "Exercise 1.20",
    question: "A 5% solution (by mass) of cane sugar (C12H22O11) in water has a freezing point of 271 K. Calculate the freezing point of a 5% solution (by mass) of glucose (C6H12O6) in water if freezing point of pure water is 273.15 K.",
    steps: [
      "<strong>Step 1: Cane Sugar Solution Data:</strong>",
      "Molar mass of cane sugar = 342 g/mol. Mass of sugar w2 = 5 g. Mass of solvent w1 = 95 g = 0.095 kg.",
      "Moles of sugar = 5 / 342 = 0.0146 mol. Molality m1 = 0.0146 / 0.095 = 0.1537 mol/kg.",
      "ΔTf(sugar) = 273.15 K - 271 K = 2.15 K.",
      "<strong>Step 2: Calculate Cryoscopic Constant Kf:</strong>",
      "ΔTf = Kf × m  ==>  Kf = ΔTf / m1 = 2.15 / 0.1537 = 13.988 K kg/mol.",
      "<strong>Step 3: Glucose Solution Data:</strong>",
      "Molar mass of glucose = 180 g/mol. Mass of glucose w2 = 5 g. Mass of water w1 = 95 g.",
      "Molality m2 = (5 / 180) / 0.095 = 0.02778 / 0.095 = 0.2924 mol/kg.",
      "<strong>Step 4: Calculate Freezing Point of Glucose Solution:</strong>",
      "ΔTf(glucose) = Kf × m2 = 13.988 × 0.2924 = 4.09 K.",
      "Tf(glucose) = T°f - ΔTf = 273.15 K - 4.09 K = 269.06 K."
    ],
    answer: "The freezing point of the 5% glucose solution is 269.06 K.",
    markingScheme: "1 Mark for finding molality & Kf from cane sugar + 1 Mark for glucose molality + 1 Mark for final freezing point 269.06 K. Total: 3 Marks."
  }
];

// =============================================================================
// TOPPER'S HANDWRITTEN REVISION NOTES & MIND MAPS
// =============================================================================

const HANDWRITTEN_NOTES_CATALOG = [
  {
    id: "hand_b12_01",
    subject: "Biology",
    classLevel: "12",
    title: "Molecular Genetics & Central Dogma Flow Sheet",
    author: "NEET All-India Ranker Notes",
    sheetColor: "yellow",
    content: `
      <div class="note-meta-hdr">
        <span class="note-subject-tag bio">Class 12 Biology</span>
        <span style="font-size: .8rem; color: #64748b;">NEET High-Yield • 32 Marks</span>
      </div>
      <h3 class="note-title-hand">DNA Replication, Transcription &amp; Lac Operon <span class="hl-yellow">Cheat Sheet</span></h3>
      <div class="note-body-hand">
        <p><strong>1. Central Dogma (Francis Crick, 1958):</strong></p>
        <p style="font-size: 1.35rem; color: #0369a1; text-align: center;">
          DNA ──[Transcription]──> mRNA ──[Translation]──> Protein
        </p>
        <p><em>Reverse Transcription:</em> RNA ──[Reverse Transcriptase (Temin &amp; Baltimore)]──> DNA (in Retroviruses like HIV).</p>

        <div class="hand-sticky">
          ⚡ <strong>NEET Must-Remember Trap:</strong> DNA-dependent DNA polymerase synthesizes ONLY in 5' ➔ 3' direction!
          Leading strand = Continuous. Lagging strand = Discontinuous (Okazaki fragments joined by DNA Ligase).
        </div>

        <p><strong>2. Lac Operon (Jacob &amp; Monod, 1961):</strong></p>
        <ul>
          <li><strong>Regulator gene (i):</strong> Synthesizes active Repressor protein constitutively.</li>
          <li><strong>Inducer:</strong> <span class="hl-cyan">Allolactose / Lactose</span> binds repressor, inactivating it.</li>
          <li><strong>Structural Genes:</strong>
            <ul>
              <li><strong>z gene:</strong> β-galactosidase (Lactose ➔ Galactose + Glucose)</li>
              <li><strong>y gene:</strong> Permease (increases membrane permeability to β-galactosides)</li>
              <li><strong>a gene:</strong> Transacetylase (transfers acetyl group to β-galactosides)</li>
            </ul>
          </li>
        </ul>

        <div class="hand-diagram-box">
          <strong>Operon Switch States:</strong><br>
          • <em>No Lactose (OFF):</em> Repressor binds Operator (O) ➔ RNA Pol blocked ➔ No Transcription.<br>
          • <em>Lactose Present (ON):</em> Lactose binds Repressor ➔ Repressor releases Operator ➔ Transcription proceeds!
        </div>
      </div>
    `
  },
  {
    id: "hand_c12_01",
    subject: "Chemistry",
    classLevel: "12",
    title: "Organic Name Reactions & Curly Arrow Mechanisms",
    author: "CBSE 100/100 Chemistry Notes",
    sheetColor: "cyan",
    content: `
      <div class="note-meta-hdr">
        <span class="note-subject-tag chem">Class 12 Chemistry</span>
        <span style="font-size: .8rem; color: #64748b;">Organic Master Sheet</span>
      </div>
      <h3 class="note-title-hand">Top 6 Name Reactions &amp; <span class="hl-cyan">Conversion Shortcuts</span></h3>
      <div class="note-body-hand">
        <p><strong>1. Aldol Condensation:</strong> Aldehydes/ketones with <span class="hl-yellow">at least one α-H</span> + dil. NaOH.</p>
        <p style="color: #7e22ce;">2 CH3-CHO ──[dil. NaOH]──> CH3-CH(OH)-CH2-CHO (β-hydroxyaldehyde) ──[Δ, -H2O]──> CH3-CH=CH-CHO (But-2-enal)</p>

        <p><strong>2. Cannizzaro Reaction:</strong> Aldehydes <span class="hl-pink">WITHOUT α-H</span> (HCHO, PhCHO) + conc. 50% KOH.</p>
        <p style="color: #7e22ce;">2 HCHO + conc. KOH ──> CH3OH (Reduction) + HCOOK (Oxidation). Disproportionation!</p>

        <div class="hand-sticky">
          🔥 <strong>Topper Memory Trick:</strong> 'Aldol needs Alpha-H; Cannizzaro Cannot have Alpha-H!'
        </div>

        <p><strong>3. Sandmeyer vs Gattermann:</strong></p>
        <ul>
          <li>Aniline ──[NaNO2 + HCl, 0-5°C]──> Ph-N2⁺Cl⁻ (Benzene Diazonium Chloride)</li>
          <li><em>Sandmeyer:</em> Cu2Cl2 / HCl ➔ Chlorobenzene (Higher yield).</li>
          <li><em>Gattermann:</em> Cu powder / HCl ➔ Chlorobenzene (Lower yield).</li>
        </ul>

        <p><strong>4. Reimer-Tiemann Reaction:</strong> Phenol + CHCl3 + aq. NaOH ──> Salicylaldehyde (ortho major). Electrophile is <span class="hl-yellow">:CCl2 (Dichlorocarbene)</span>!</p>
      </div>
    `
  },
  {
    id: "hand_p12_01",
    subject: "Physics",
    classLevel: "12",
    title: "Electrodynamics & Optics Derivation Blueprint",
    author: "JEE Advanced Physics Topper",
    sheetColor: "yellow",
    content: `
      <div class="note-meta-hdr">
        <span class="note-subject-tag phys">Class 12 Physics</span>
        <span style="font-size: .8rem; color: #64748b;">Core 5-Marker Derivations</span>
      </div>
      <h3 class="note-title-hand">Lens Maker, Kirchhoff &amp; <span class="hl-yellow">Photoelectric Slopes</span></h3>
      <div class="note-body-hand">
        <p><strong>1. Lens Maker's Formula Derivation:</strong></p>
        <p>Refraction at 1st surface (radius R1): n2/v1 - n1/u = (n2 - n1)/R1 ... (1)</p>
        <p>Refraction at 2nd surface (radius R2): n1/v - n2/v1 = (n1 - n2)/R2 ... (2)</p>
        <p>Adding (1) and (2) with medium 1 = air (n1 = 1, n2 = n):</p>
        <p style="font-size: 1.35rem; color: #b45309; text-align: center;">
          1/v - 1/u = 1/f = (n - 1) [ 1/R1 - 1/R2 ]
        </p>

        <div class="hand-diagram-box">
          <strong>Sign Convention Golden Rules:</strong><br>
          • Convex lens: R1 > 0 (+), R2 < 0 (-) ➔ f is always POSITIVE.<br>
          • Concave lens: R1 < 0 (-), R2 > 0 (+) ➔ f is always NEGATIVE.<br>
          • Lens submerged in liquid of index n_liq > n_glass: Lens REVERSES nature (convex becomes diverging!).
        </div>

        <p><strong>2. Photoelectric Graphs:</strong></p>
        <ul>
          <li>V0 (Stopping Potential) vs ν (Frequency): Straight line with <span class="hl-cyan">slope = h/e</span>. Universal constant for ALL metals!</li>
          <li>X-intercept = ν0 (Threshold frequency). Y-intercept = -Φ0/e (Work function).</li>
        </ul>
      </div>
    `
  },
  {
    id: "hand_e12_01",
    subject: "English",
    classLevel: "12",
    title: "Flamingo & Vistas Character Sketches & Writing Templates",
    author: "CBSE English 98% Scorer Notes",
    sheetColor: "pink",
    content: `
      <div class="note-meta-hdr">
        <span class="note-subject-tag eng">Class 12 English</span>
        <span style="font-size: .8rem; color: #64748b;">Board Literature &amp; Writing</span>
      </div>
      <h3 class="note-title-hand">Core Literature Themes &amp; <span class="hl-pink">Notice / Letter Templates</span></h3>
      <div class="note-body-hand">
        <p><strong>1. Key Literature Characters &amp; Themes:</strong></p>
        <ul>
          <li><strong>M. Hamel (The Last Lesson):</strong> Devoted teacher, strict ruler, sudden dignity in grief, emblem of French cultural pride.</li>
          <li><strong>Saheb vs Mukesh (Lost Spring):</strong> Saheb surrenders autonomy for regular tea-stall wage (steel canister burden); Mukesh maintains dignity by aspiring to become a mechanic.</li>
          <li><strong>Tiger King (Vistas):</strong> Vain Maharaja blind to ecological harmony, bribing British officers with 50 diamond rings, killed by a toy sliver. Satire on political arrogance.</li>
        </ul>

        <div class="hand-sticky">
          📝 <strong>CBSE Formal Letter to Editor 5-Mark Layout:</strong><br>
          1. Sender's Address ➔ 2. Date ➔ 3. The Editor, Name of Newspaper, City ➔ 4. Subject: Concise (under 6 words) ➔ 5. Sir/Madam ➔ 6. Opening Line: <em>'Through the esteemed columns of your widely circulated daily, I wish to draw the attention of the authorities concerned towards...'</em>
        </div>
      </div>
    `
  }
];

// =============================================================================
// MASTER ACADEMIC CALENDAR & TIME ALLOTMENT CONTROLLER
// =============================================================================

let academicCalendarEvents = [];
let currentCalDate = new Date(); // Tracks viewing month
let selectedCalDate = new Date().toISOString().split('T')[0]; // Tracks clicked day

const DEFAULT_CALENDAR_EVENTS = [
  {
    id: "cal_ev_cbse_prac",
    date: "2027-02-01",
    title: "CBSE 12th Board Practical Examinations",
    subject: "General",
    category: "exam",
    duration: 180,
    priority: "high",
    notes: "Physics, Chemistry & Biology lab practicals, viva, and project files."
  },
  {
    id: "cal_ev_cbse_theory",
    date: "2027-02-15",
    title: "CBSE Class 12 Board Theory Exams Commence",
    subject: "General",
    category: "exam",
    duration: 180,
    priority: "high",
    notes: "Main board examination period begins."
  },
  {
    id: "cal_ev_jee_session1",
    date: "2027-01-24",
    title: "JEE Main 2027 Session 1 Examination",
    subject: "General",
    category: "exam",
    duration: 180,
    priority: "high",
    notes: "NTA Computer Based Test."
  },
  {
    id: "cal_ev_neet",
    date: "2027-05-02",
    title: "NEET-UG 2027 Medical Entrance",
    subject: "General",
    category: "exam",
    duration: 200,
    priority: "high",
    notes: "720 Marks pen & paper test across Physics, Chemistry, Biology."
  },
  // Today's sample allotments
  {
    id: "cal_ev_today_1",
    date: new Date().toISOString().split('T')[0],
    title: "Physics: Current Electricity & Kirchhoff Practice",
    subject: "Physics",
    category: "timelimit",
    duration: 90,
    priority: "high",
    notes: "Solve 15 bridge problems and potentiometer derivations."
  },
  {
    id: "cal_ev_today_2",
    date: new Date().toISOString().split('T')[0],
    title: "Biology: Genetics Pedigree & Hardy Weinberg",
    subject: "Biology",
    category: "revision",
    duration: 60,
    priority: "high",
    notes: "Spaced revision drill on dihybrid crosses."
  },
  {
    id: "cal_ev_today_3",
    date: new Date().toISOString().split('T')[0],
    title: "English: The Last Lesson & Notice Writing",
    subject: "English",
    category: "timelimit",
    duration: 45,
    priority: "med",
    notes: "Read M. Hamel's speech & draft 50-word formal notice."
  }
];

function loadCalendarEvents() {
  const saved = localStorage.getItem("mg_academic_calendar_events");
  if (saved) {
    try {
      academicCalendarEvents = JSON.parse(saved);
    } catch(e) {
      console.warn("Failed to parse calendar events, using defaults.");
      academicCalendarEvents = [...DEFAULT_CALENDAR_EVENTS];
    }
  } else {
    academicCalendarEvents = [...DEFAULT_CALENDAR_EVENTS];
    saveCalendarEvents();
  }
}

function saveCalendarEvents() {
  localStorage.setItem("mg_academic_calendar_events", JSON.stringify(academicCalendarEvents));
}

function renderAcademicCalendar() {
  const grid = document.getElementById("calendar-days-grid");
  const monthTitle = document.getElementById("cal-month-year-title");
  if (!grid || !monthTitle) return;

  const year = currentCalDate.getFullYear();
  const month = currentCalDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  monthTitle.textContent = `${monthNames[month]} ${year}`;

  // Update countdown timers
  updateExamCountdowns();

  // Calendar Day Math
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const todayStr = new Date().toISOString().split('T')[0];

  let cellsHtml = "";

  // 1. Padding days from previous month
  for (let i = firstDayIndex; i > 0; i--) {
    const dayNum = prevLastDate - i + 1;
    const prevMonthDate = new Date(year, month - 1, dayNum);
    const dateStr = prevMonthDate.toISOString().split('T')[0];
    cellsHtml += generateCalendarCellHtml(dateStr, dayNum, true);
  }

  // 2. Days of current month
  for (let i = 1; i <= lastDateOfMonth; i++) {
    const currentDate = new Date(year, month, i);
    // Correct timezone string format YYYY-MM-DD
    const padM = String(month + 1).padStart(2, '0');
    const padD = String(i).padStart(2, '0');
    const dateStr = `${year}-${padM}-${padD}`;
    cellsHtml += generateCalendarCellHtml(dateStr, i, false);
  }

  // 3. Padding days for next month to complete 42 or 35 cells
  const totalRendered = firstDayIndex + lastDateOfMonth;
  const nextDays = totalRendered <= 35 ? (35 - totalRendered) : (42 - totalRendered);
  for (let i = 1; i <= nextDays; i++) {
    const nextMonthDate = new Date(year, month + 1, i);
    const dateStr = nextMonthDate.toISOString().split('T')[0];
    cellsHtml += generateCalendarCellHtml(dateStr, i, true);
  }

  grid.innerHTML = cellsHtml;

  // Render agenda for the currently selected date
  renderCalendarAgenda(selectedCalDate);
}

function generateCalendarCellHtml(dateStr, dayNum, isOtherMonth) {
  const todayStr = new Date().toISOString().split('T')[0];
  const isToday = dateStr === todayStr;
  const isSelected = dateStr === selectedCalDate;

  // Filter events for this date
  const events = academicCalendarEvents.filter(e => e.date === dateStr);

  let eventsHtml = "";
  events.slice(0, 2).forEach(ev => {
    const categoryClass = ev.category === "exam" ? "exam" :
                          ev.category === "revision" ? "revision" : "timelimit";
    eventsHtml += `<div class="cal-event-pill ${categoryClass}" title="${escapeHtml(ev.title)} (${ev.duration}m)">${escapeHtml(ev.title)}</div>`;
  });

  if (events.length > 2) {
    eventsHtml += `<div style="font-size: .6rem; color: #94a3b8; font-weight: 700; margin-top: 1px;">+${events.length - 2} more</div>`;
  }

  const otherClass = isOtherMonth ? "cal-other-month" : "";
  const todayClass = isToday ? "cal-today" : "";
  const selectedClass = isSelected ? "cal-selected" : "";

  return `
    <div class="cal-day-cell ${otherClass} ${todayClass} ${selectedClass}" 
         onclick="handleCalendarDayClick('${dateStr}')" 
         data-date="${dateStr}">
      <span class="cal-day-num">${dayNum}</span>
      <div class="cal-cell-events">
        ${eventsHtml}
      </div>
    </div>
  `;
}

function handleCalendarDayClick(dateStr) {
  selectedCalDate = dateStr;
  renderAcademicCalendar();
  // Open the allotment modal pre-filled with this date!
  openDateSchedulerModal(dateStr);
}

function updateExamCountdowns() {
  const now = new Date();
  
  // CBSE 12th Board: Feb 15, 2027
  const cbseDate = new Date("2027-02-15");
  const diffCbse = Math.max(0, Math.ceil((cbseDate - now) / (1000 * 60 * 60 * 24)));
  const cbseEl = document.getElementById("countdown-cbse-days");
  if (cbseEl) cbseEl.textContent = diffCbse;

  // JEE Main: Jan 24, 2027
  const jeeDate = new Date("2027-01-24");
  const diffJee = Math.max(0, Math.ceil((jeeDate - now) / (1000 * 60 * 60 * 24)));
  const jeeEl = document.getElementById("countdown-jee-days");
  if (jeeEl) jeeEl.textContent = diffJee;

  // NEET: May 02, 2027
  const neetDate = new Date("2027-05-02");
  const diffNeet = Math.max(0, Math.ceil((neetDate - now) / (1000 * 60 * 60 * 24)));
  const neetEl = document.getElementById("countdown-neet-days");
  if (neetEl) neetEl.textContent = diffNeet;
}

function renderCalendarAgenda(dateStr) {
  const list = document.getElementById("agenda-events-list");
  const titleEl = document.getElementById("agenda-selected-date-str");
  const totalHoursEl = document.getElementById("agenda-total-hours");
  if (!list || !titleEl) return;

  const dateObj = new Date(dateStr + "T00:00:00");
  const dateFormatted = dateObj.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  titleEl.textContent = dateFormatted;

  const events = academicCalendarEvents.filter(e => e.date === dateStr);

  if (events.length === 0) {
    list.innerHTML = `
      <div style="padding: 1.5rem; text-align: center; color: var(--hub-muted); font-size: .85rem; font-style: italic;">
        No study slots or exams allotted for this date.<br>Click below to allot time limits!
      </div>
    `;
    if (totalHoursEl) totalHoursEl.textContent = "0h Planned";
    return;
  }

  let totalMinutes = 0;
  list.innerHTML = events.map(ev => {
    totalMinutes += (ev.duration || 0);
    const categoryIcon = ev.category === "exam" ? "🚨" :
                         ev.category === "revision" ? "🔄" : "⏱️";

    return `
      <div class="agenda-item">
        <div style="flex: 1;">
          <h5 class="agenda-item-title">${categoryIcon} ${escapeHtml(ev.title)}</h5>
          <div class="agenda-item-meta">
            <span style="font-weight: 700; color: #60a5fa;">${ev.subject}</span>
            <span>•</span>
            <span style="color: #38bdf8;">${ev.duration} min limit</span>
            ${ev.priority === 'high' ? '<span style="color: #fbbf24; font-weight: 700;">[Tier 1]</span>' : ''}
          </div>
          ${ev.notes ? `<div style="font-size: .75rem; color: var(--hub-muted); margin-top: 3px;">${escapeHtml(ev.notes)}</div>` : ''}
        </div>
        <button class="btn btn-ghost btn-sm" onclick="deleteCalendarEvent('${ev.id}')" title="Delete slot" style="padding: 2px 6px; color: #ef4444;">
          &times;
        </button>
      </div>
    `;
  }).join("");

  const hoursPlanned = (totalMinutes / 60).toFixed(1);
  if (totalHoursEl) totalHoursEl.textContent = `${hoursPlanned}h Planned`;
}

function openDateSchedulerModal(dateStr) {
  const targetDateInput = document.getElementById("allot-target-date");
  const displayDate = document.getElementById("modal-allot-date-display");
  const existingList = document.getElementById("modal-allot-existing-list");

  if (targetDateInput) targetDateInput.value = dateStr;
  if (displayDate) {
    const d = new Date(dateStr + "T00:00:00");
    displayDate.textContent = `Date: ${d.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
  }

  if (existingList) {
    const events = academicCalendarEvents.filter(e => e.date === dateStr);
    if (events.length === 0) {
      existingList.innerHTML = `<span style="font-size: .78rem; color: var(--hub-muted); font-style: italic;">No time limits allotted yet for this day.</span>`;
    } else {
      existingList.innerHTML = events.map(ev => {
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; background: var(--hub-card); padding: 4px 8px; border-radius: 4px; font-size: .78rem;">
            <span><strong>[${ev.subject}]</strong> ${escapeHtml(ev.title)} (${ev.duration}m)</span>
            <button type="button" onclick="deleteCalendarEvent('${ev.id}')" style="background:none; border:none; color:#ef4444; cursor:pointer;">&times;</button>
          </div>
        `;
      }).join("");
    }
  }

  openModal("modal-calendar-date-allot");
}

function deleteCalendarEvent(eventId) {
  academicCalendarEvents = academicCalendarEvents.filter(e => e.id !== eventId);
  saveCalendarEvents();
  renderAcademicCalendar();
  showNotification("Study slot / date removed from calendar.");
}

function setupCalendarListeners() {
  const btnPrev = document.getElementById("btn-cal-prev");
  const btnNext = document.getElementById("btn-cal-next");
  const btnToday = document.getElementById("btn-cal-today");
  const btnAllotNew = document.getElementById("btn-cal-allot-new");
  const btnAgendaAdd = document.getElementById("btn-agenda-add-slot");
  const navCalBtn = document.getElementById("btn-nav-calendar");
  const formAllot = document.getElementById("form-calendar-allot");

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      currentCalDate.setMonth(currentCalDate.getMonth() - 1);
      renderAcademicCalendar();
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      currentCalDate.setMonth(currentCalDate.getMonth() + 1);
      renderAcademicCalendar();
    });
  }

  if (btnToday) {
    btnToday.addEventListener("click", () => {
      currentCalDate = new Date();
      selectedCalDate = new Date().toISOString().split('T')[0];
      renderAcademicCalendar();
    });
  }

  if (btnAllotNew || btnAgendaAdd) {
    const handler = () => openDateSchedulerModal(selectedCalDate);
    if (btnAllotNew) btnAllotNew.addEventListener("click", handler);
    if (btnAgendaAdd) btnAgendaAdd.addEventListener("click", handler);
  }

  if (navCalBtn) {
    navCalBtn.addEventListener("click", () => {
      setAppMode("academic");
      switchAcademicTab("calendar");
    });
  }

  if (formAllot) {
    formAllot.addEventListener("submit", (e) => {
      e.preventDefault();
      const dateVal = document.getElementById("allot-target-date").value || selectedCalDate;
      const subject = document.getElementById("allot-subject").value;
      const category = document.getElementById("allot-category").value;
      const title = document.getElementById("allot-title").value.trim();
      const duration = parseInt(document.getElementById("allot-duration").value, 10) || 60;
      const priority = document.getElementById("allot-priority").value;
      const notes = document.getElementById("allot-notes").value.trim();

      if (!title || !dateVal) return;

      const newEvent = {
        id: "cal_ev_" + Date.now(),
        date: dateVal,
        title,
        subject,
        category,
        duration,
        priority,
        notes: notes || undefined
      };

      academicCalendarEvents.push(newEvent);
      saveCalendarEvents();
      renderAcademicCalendar();

      formAllot.reset();
      closeModal("modal-calendar-date-allot");
      showNotification(`📅 Allotted ${duration} mins for "${title}" on ${dateVal}!`);
    });
  }
}

// =============================================================================
// TOPPER'S HANDWRITTEN REVISION NOTES CONTROLLER
// =============================================================================

function renderHandwrittenNotes() {
  const grid = document.getElementById("handwritten-cards-grid");
  if (!grid) return;

  const searchVal = (document.getElementById("hand-search-input")?.value || "").toLowerCase().trim();
  const subjectVal = document.getElementById("hand-filter-subject")?.value || "all";
  const classVal = document.getElementById("hand-filter-class")?.value || "all";

  const filteredNotes = HANDWRITTEN_NOTES_CATALOG.filter(note => {
    if (subjectVal !== "all" && note.subject !== subjectVal) return false;
    if (classVal !== "all" && note.classLevel !== classVal) return false;
    if (searchVal) {
      const matchText = `${note.title} ${note.subject} ${note.author}`.toLowerCase();
      if (!matchText.includes(searchVal)) return false;
    }
    return true;
  });

  if (filteredNotes.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--hub-muted);">
        No handwritten notes found matching your criteria.
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredNotes.map(note => {
    return `
      <div class="notebook-sheet">
        ${note.content}
        <div class="note-footer-actions">
          <span style="font-size: .75rem; color: #64748b; font-style: italic;">Verified • ${note.author}</span>
          <button class="btn-print-note" onclick="window.print()">
            🖨️ Print Sheet
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function setupHandwrittenFilterListeners() {
  const searchInput = document.getElementById("hand-search-input");
  const subjSelect = document.getElementById("hand-filter-subject");
  const classSelect = document.getElementById("hand-filter-class");

  [searchInput, subjSelect, classSelect].forEach(el => {
    if (el) {
      el.addEventListener("input", renderHandwrittenNotes);
      el.addEventListener("change", renderHandwrittenNotes);
    }
  });
}

const NCERT_EBOOKS_CATALOG = [...ADDITIONAL_NCERT_EBOOKS, 
  {
    id: "ncert_b12_ch06",
    code: "lebo106",
    classLevel: "12",
    subject: "Biology",
    category: "12-bio",
    chNumber: "Chapter 6",
    title: "Molecular Basis of Inheritance",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?lebo1=6-13",
    topics: "The DNA Structure, Central Dogma, Packaging of DNA Helix, Griffith & Avery Experiments, Meselson-Stahl, Genetic Code, Lac Operon, Human Genome Project.",
    synopsis: "Deoxyribonucleic acid (DNA) and ribonucleic acid (RNA) are the two types of nucleic acids found in living systems. DNA acts as the genetic material in most organisms, whereas RNA acts as genetic material in some viruses (e.g., Tobacco Mosaic Virus, QB bacteriophage). A nitrogenous base is linked to the pentose sugar through an N-glycosidic linkage to form a nucleoside.",
    goldenLines: [
      "NCERT Golden Line 1: 'DNA is a long polymer of deoxyribonucleotides. The length of DNA is usually defined as number of nucleotides (or base pairs).' Bacteriophage φ174 has 5386 nucleotides; Bacteriophage lambda has 48502 base pairs; E. coli has 4.6 × 10⁶ bp, and human haploid genome has 3.3 × 10⁹ bp.",
      "NCERT Golden Line 2: 'Meselson and Stahl grew E. coli in a medium containing ¹⁵NH₄Cl as the only nitrogen source for many generations. ¹⁵N is not a radioactive isotope; it is separated purely on CsCl density gradient centrifugation.'",
      "NCERT Golden Line 3: 'The genetic code is degenerate: some amino acids are coded by more than one codon. The code is nearly universal; for example, from bacteria to human UUU codes for Phenylalanine (some exceptions in mitochondrial codons).' (NEET 2021, 2023)"
    ],
    formulas: [
      "Total length of DNA = (Total number of base pairs) × (Distance between two consecutive base pairs) = 6.6 × 10⁹ bp × 0.34 × 10⁻⁹ m/bp ≈ 2.2 metres.",
      "Chargaff's Rule: In double-stranded DNA, [A] = [T] and [G] = [C]; therefore, [A] + [G] = [T] + [C] (Purines = Pyrimidines)."
    ],
    intextQuestions: [
      "Q: Can you recall the two chemical differences between DNA and RNA? Ans: RNA contains ribose sugar (2'-OH) and Uracil, whereas DNA contains 2'-deoxyribose (lacks 2'-OH) and Thymine (5-methyl uracil). The 2'-OH group makes RNA labile and easily degradable."
    ]
  },
  {
    id: "ncert_m12_ch07",
    code: "lemh107",
    classLevel: "12",
    subject: "Mathematics",
    category: "12-math",
    chNumber: "Chapter 7",
    title: "Integrals (Calculus)",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?lemh1=7-13",
    topics: "Integration as inverse process of differentiation, Methods of Integration (Substitution, Partial Fractions, By Parts), Definite Integrals & Fundamental Theorem of Calculus, Properties of Definite Integrals.",
    synopsis: "Just as subtraction is inverse of addition, integration is the reverse process of differentiation. Let d/dx [F(x)] = f(x). Then we write ∫ f(x) dx = F(x) + C, where C is arbitrary constant of integration. Integrals arise both as antiderivatives and as the limit of Riemann sums representing the area under a curve.",
    goldenLines: [
      "NCERT Golden Line / Property P4 (King's Property): ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx. This single property solves over 70% of CBSE board definite integrals and JEE Main area symmetry questions.",
      "Property P7: ∫₀²ᵃ f(x) dx = 2∫₀ᵃ f(x) dx if f(2a - x) = f(x), and 0 if f(2a - x) = -f(x).",
      "Integration by Parts: ∫ u·v dx = u ∫ v dx - ∫ [u' (∫ v dx)] dx. ILATE order: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential."
    ],
    formulas: [
      "∫ dx / (x² + a²) = (1/a) arctan(x/a) + C",
      "∫ dx / √(a² - x²) = arcsin(x/a) + C",
      "∫ eˣ [f(x) + f'(x)] dx = eˣ f(x) + C"
    ],
    intextQuestions: [
      "Q: Evaluate ∫ eˣ (sin x + cos x) dx. Ans: Let f(x) = sin x. Then f'(x) = cos x. Applying ∫ eˣ[f(x) + f'(x)]dx, the integral is directly eˣ sin x + C."
    ]
  },
  {
    id: "ncert_p12_ch03",
    code: "leph103",
    classLevel: "12",
    subject: "Physics",
    category: "12-phys",
    chNumber: "Chapter 3",
    title: "Current Electricity",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?leph1=3-8",
    topics: "Electric Current, Drift Velocity & Ohm's Law, Temperature Dependence of Resistivity, Internal Resistance of Cell, Cells in Series & Parallel, Kirchhoff's Rules, Wheatstone Bridge.",
    synopsis: "Charges in motion constitute an electric current. By convention, direction of current is taken as direction of flow of positive charge. Current density j = I/A = n e vd. Ohm's law states V = IR where resistance R = ρL/A. Microscopic Ohm's law: j = σE.",
    goldenLines: [
      "NCERT Golden Line 1: 'The drift velocity vd is typically of the order of a few millimetres per second (10⁻⁴ m/s), yet an electric bulb glows almost instantaneously because the electric field propagates along the conductor at the speed of light.'",
      "NCERT Golden Line 2: 'Kirchhoff's first rule (Junction Rule) is based on conservation of charge. Kirchhoff's second rule (Loop Rule) is based on conservation of energy.' (NEET 2020, 2022)"
    ],
    formulas: [
      "Drift Velocity: vd = -eEτ / m",
      "Resistivity: ρ = m / (n e² τ)",
      "Internal Resistance: r = R (E/V - 1)",
      "Balanced Wheatstone Bridge: P/Q = R/S"
    ],
    intextQuestions: [
      "Q: Why are alloys like manganin and constantan used for making standard resistance coils? Ans: Because they have very high resistivity and nearly negligible (extremely low) temperature coefficient of resistance."
    ]
  },
  {
    id: "ncert_c12_ch02",
    code: "lech102",
    classLevel: "12",
    subject: "Chemistry",
    category: "12-chem",
    chNumber: "Chapter 2",
    title: "Electrochemistry",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?lech1=2-9",
    topics: "Electrochemical Cells, Galvanic Cells & Nernst Equation, Conductance of Electrolytic Solutions, Kohlrausch's Law, Electrolysis & Faraday's Laws, Batteries & Fuel Cells, Corrosion.",
    synopsis: "Electrochemistry is the study of production of electricity from energy released during spontaneous chemical reactions and the use of electrical energy to bring about non-spontaneous chemical transformations. The standard electrode potential E° is measured with respect to the Standard Hydrogen Electrode (SHE = 0.00 V).",
    goldenLines: [
      "NCERT Golden Line 1: 'ΔrG° = -n F E°cell. A cell reaction is thermodynamically spontaneous only when E°cell is positive (making ΔrG° negative).' (NEET 2021)",
      "NCERT Golden Line 2: 'Molar conductivity Λm increases with decrease in concentration (dilution) for both strong and weak electrolytes, but conductivity κ always decreases upon dilution because number of ions per unit volume decreases.'"
    ],
    formulas: [
      "Nernst Equation: Ecell = E°cell - (2.303 RT / nF) log Q = E°cell - (0.0591 / n) log Q at 298 K",
      "Kohlrausch Law: Λ°m (AxBy) = x λ°m (Aʸ⁺) + y λ°m (Bˣ⁻)",
      "Faraday's First Law: m = Z I t = (M / nF) I t"
    ],
    intextQuestions: [
      "Q: Why does conductivity of a solution decrease with dilution? Ans: Conductivity κ is the conductance of 1 cm³ (unit volume) of solution. On dilution, the number of current-carrying ions per unit volume decreases, hence κ decreases."
    ]
  },
  {
    id: "ncert_b12_ch05",
    code: "lebo105",
    classLevel: "12",
    subject: "Biology",
    category: "12-bio",
    chNumber: "Chapter 5",
    title: "Principles of Inheritance and Variation",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?lebo1=5-13",
    topics: "Mendel's Laws of Inheritance, Incomplete Dominance, Codominance & Multiple Alleles, Chromosomal Theory of Inheritance, Linkage and Recombination, Sex Determination, Mendelian & Chromosomal Disorders.",
    synopsis: "Genetics is the subject that deals with the inheritance, as well as the variation of characters from parents to offspring. Gregor Mendel conducted hybridization experiments on garden peas (Pisum sativum) for seven years (1856-1863) and proposed the laws of inheritance in living organisms.",
    goldenLines: [
      "NCERT Golden Line 1: 'Sutton and Boveri noted that the behaviour of chromosomes was parallel to the behaviour of genes and used chromosome movement to explain Mendel's laws.'",
      "NCERT Golden Line 2: 'Morgan attributed the difference in recombination frequency between white-miniature and yellow-white genes in Drosophila to linkage. Alfred Sturtevant used the frequency of recombination between gene pairs on the same chromosome as a measure of distance between genes.' (NEET 2019, 2023)"
    ],
    formulas: [
      "Monohybrid Phenotypic Ratio = 3:1; Genotypic Ratio = 1:2:1",
      "Dihybrid Phenotypic Ratio = 9:3:3:1",
      "Recombination Frequency (%) = (Total Recombinants / Total Progeny) × 100% (1% recombination = 1 map unit / centimorgan)"
    ],
    intextQuestions: [
      "Q: Mention the type of allele interaction in human ABO blood grouping. Ans: Codominance (IA and IB are equally expressed in IAIB producing AB blood group) and Multiple Allelism (three alleles IA, IB, i present in population)."
    ]
  },
  {
    id: "ncert_m12_ch10",
    code: "lemh202",
    classLevel: "12",
    subject: "Mathematics",
    category: "12-math",
    chNumber: "Chapter 10",
    title: "Vector Algebra",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?lemh2=4-7",
    topics: "Types of Vectors, Direction Cosines & Ratios, Scalar (Dot) Product, Vector (Cross) Product, Projection of a Vector.",
    synopsis: "A quantity that has magnitude as well as direction is called a vector. The position vector of a point P(x, y, z) with respect to origin is given by r = x i + y j + z k. Dot product produces a scalar (work, projection), while cross product produces a perpendicular vector (torque, area).",
    goldenLines: [
      "NCERT Core Theorem: Two non-zero vectors a and b are perpendicular if and only if a · b = 0.",
      "Two non-zero vectors a and b are collinear if and only if a × b = 0.",
      "Area of parallelogram with adjacent vectors a and b is |a × b|. Area of triangle = (1/2)|a × b|."
    ],
    formulas: [
      "Dot Product: a · b = |a||b| cos θ",
      "Cross Product: a × b = |a||b| sin θ n̂",
      "Projection of a on b: proj = (a · b) / |b|"
    ],
    intextQuestions: [
      "Q: Find the projection of vector a = 2i + 3j + 2k on b = i + 2j + k. Ans: a · b = (2)(1) + (3)(2) + (2)(1) = 10. |b| = √(1 + 4 + 1) = √6. Projection = 10 / √6."
    ]
  },
  {
    id: "ncert_p12_ch09",
    code: "leph201",
    classLevel: "12",
    subject: "Physics",
    category: "12-phys",
    chNumber: "Chapter 9",
    title: "Ray Optics and Optical Instruments",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?leph2=1-6",
    topics: "Refraction at Spherical Surfaces, Lens Maker's Formula, Combination of Thin Lenses, Refraction through a Prism, Dispersion, Optical Instruments (Microscopes & Telescopes).",
    synopsis: "Light travels along straight lines in homogeneous media. Snell's law governs refraction at boundary: n1 sin i = n2 sin r. Total internal reflection occurs when angle of incidence in denser medium exceeds critical angle θc = arcsin(1/n).",
    goldenLines: [
      "NCERT Golden Line 1: 'For a thin prism, deviation δ ≈ (n - 1) A. The angle of minimum deviation δm occurs when the ray passes symmetrically through the prism (r1 = r2 = A/2 and i = e).' (CBSE 5-Marker, NEET 2021)",
      "NCERT Golden Line 2: 'In an astronomical telescope in normal adjustment, length of tube L = fo + fe and magnifying power m = -fo / fe. To increase resolving power, the objective aperture must be as large as possible.'"
    ],
    formulas: [
      "Spherical Refraction: n2/v - n1/u = (n2 - n1)/R",
      "Lens Maker Formula: 1/f = (n - 1) [1/R1 - 1/R2]",
      "Prism Formula: n = sin[(A + δm)/2] / sin(A/2)"
    ],
    intextQuestions: [
      "Q: A convex lens of refractive index 1.5 is immersed in water (n = 1.33). How does its focal length change? Ans: Since relative refractive index n_rel = 1.5/1.33 = 1.13 is much smaller than in air (1.5), (n_rel - 1) decreases by ~4 times, so focal length increases by ~4 times."
    ]
  },
  {
    id: "ncert_c12_ch08",
    code: "lech202",
    classLevel: "12",
    subject: "Chemistry",
    category: "12-chem",
    chNumber: "Chapter 8",
    title: "Aldehydes, Ketones and Carboxylic Acids",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?lech2=2-5",
    topics: "Nomenclature & Nature of Carbonyl Group, Preparation of Aldehydes & Ketones (Rosenmund, Gatterman-Koch, Ozonolysis), Nucleophilic Addition Reactions, Acidity of Carboxylic Acids.",
    synopsis: "Carbonyl compounds containing >C=O group are central in organic synthesis. Due to electronegativity difference between carbon and oxygen, the carbonyl carbon is electrophilic (sp² hybridized, planar) and readily undergoes nucleophilic addition.",
    goldenLines: [
      "NCERT Golden Line 1: 'Aldol condensation is given only by aldehydes and ketones containing at least one α-hydrogen in the presence of dilute alkali (dil. NaOH) forming β-hydroxy aldehydes.'",
      "NCERT Golden Line 2: 'Cannizzaro reaction is a disproportionation (self oxidation-reduction) undergone by aldehydes lacking α-hydrogen (HCHO, PhCHO) on heating with concentrated alkali (50% KOH).' (NEET 2022)"
    ],
    formulas: [
      "Rosenmund Reduction: RCOCl + H2 --[Pd/BaSO4, S/quinoline]--> RCHO + HCl",
      "Tollens' Test: RCHO + 2[Ag(NH3)2]⁺ + 3OH⁻ --> RCOO⁻ + 2Ag↓ (Silver Mirror) + 4NH3 + 2H2O",
      "Fehling's Test: RCHO + 2Cu²⁺ + 5OH⁻ --> RCOO⁻ + Cu2O↓ (Red ppt) + 3H2O"
    ],
    intextQuestions: [
      "Q: Why is propanal more reactive towards nucleophilic addition than propanone? Ans: Propanone has two electron-donating methyl (+I) groups that reduce the electrophilicity of carbonyl carbon, and cause greater steric hindrance compared to propanal which has only one ethyl group."
    ]
  },
  {
    id: "ncert_b11_ch08",
    code: "kebo108",
    classLevel: "11",
    subject: "Biology",
    category: "11-bio",
    chNumber: "Chapter 8",
    title: "Cell: The Unit of Life",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?kebo1=8-19",
    topics: "Cell Theory, Prokaryotic vs Eukaryotic Cells, Cell Envelope, Endomembrane System (ER, Golgi, Lysosomes, Vacuoles), Mitochondria, Plastids, Ribosomes, Cytoskeleton, Cilia and Flagella, Nucleus.",
    synopsis: "All organisms are composed of cells. Unicellular organisms are capable of independent existence and performing essential functions of life. Cell is the fundamental structural and functional unit of all living organisms. Anton Von Leeuwenhoek first saw and described a live cell; Robert Brown discovered the nucleus.",
    goldenLines: [
      "NCERT Golden Line 1: 'Rudolf Virchow (1855) first explained that cells divided and new cells are formed from pre-existing cells (Omnis cellula-e cellula). He modified the hypothesis of Schleiden and Schwann to give cell theory its final shape.' (NEET 2019, 2021)",
      "NCERT Golden Line 2: 'The endomembrane system includes endoplasmic reticulum (ER), golgi complex, lysosomes and vacuoles. Mitochondria, chloroplasts and peroxisomes are NOT considered as part of endomembrane system because their functions are not coordinated with the components above.'"
    ],
    formulas: [
      "Ribosome Subunits: Prokaryotes = 70S (50S + 30S); Eukaryotes = 80S (60S + 40S). 'S' represents Svedberg unit (sedimentation coefficient, indirect measure of density and size)."
    ],
    intextQuestions: [
      "Q: Which cell organelle is known as the protein factory and lacks any membrane? Ans: Ribosomes (composed of ribonucleic acid and proteins, discovered by George Palade in 1953)."
    ]
  },
  {
    id: "ncert_m11_ch03",
    code: "kemh103",
    classLevel: "11",
    subject: "Mathematics",
    category: "11-math",
    chNumber: "Chapter 3",
    title: "Trigonometric Functions",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?kemh1=3-14",
    topics: "Angles (Degrees & Radians), Trigonometric Functions of Sum and Difference of Two Angles, Multiple and Submultiple Angles.",
    synopsis: "Trigonometry deals with the measurement of angles and problems relating to triangles. Radian measure θ = l/r where l is arc length and r is radius. π radians = 180°. Trigonometric functions extend to real numbers as periodic functions.",
    goldenLines: [
      "NCERT Fundamental Identity: cos(x + y) = cos x cos y - sin x sin y",
      "sin(x + y) = sin x cos y + cos x sin y",
      "tan(x + y) = (tan x + tan y) / (1 - tan x tan y)",
      "Double Angle: cos 2x = cos²x - sin²x = 2cos²x - 1 = 1 - 2sin²x = (1 - tan²x)/(1 + tan²x)"
    ],
    formulas: [
      "Transformation: 2 sin A cos B = sin(A + B) + sin(A - B)",
      "2 cos A sin B = sin(A + B) - sin(A - B)",
      "2 cos A cos B = cos(A + B) + cos(A - B)",
      "2 sin A sin B = cos(A - B) - cos(A + B)"
    ],
    intextQuestions: [
      "Q: Find the value of sin 15°. Ans: sin 15° = sin(45° - 30°) = sin 45° cos 30° - cos 45° sin 30° = (1/√2)(√3/2) - (1/√2)(1/2) = (√3 - 1)/(2√2)."
    ]
  },
  {
    id: "ncert_p11_ch05",
    code: "keph105",
    classLevel: "11",
    subject: "Physics",
    category: "11-phys",
    chNumber: "Chapter 5",
    title: "Laws of Motion",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?keph1=5-8",
    topics: "Aristotle's Fallacy & Newton's First Law (Inertia), Momentum & Second Law, Impulse & Third Law, Conservation of Linear Momentum, Equilibrium of a Particle, Friction, Circular Motion & Banking.",
    synopsis: "Dynamics is the study of motion of objects and the forces causing the motion. Newton's second law is the fundamental law of motion: F = dp/dt = m(dv/dt) = ma (for constant mass). First and third laws can be deduced from the second law.",
    goldenLines: [
      "NCERT Golden Line 1: 'Forces always occur in pairs. Action and reaction forces act simultaneously on different bodies, never on the same body; hence they never cancel each other.'",
      "NCERT Golden Line 2: 'Static friction fs is a self-adjusting force with maximum value (limiting friction) fs,max = μs N. Once motion starts, kinetic friction fk = μk N is slightly less than limiting friction (μk < μs).'"
    ],
    formulas: [
      "Impulse: J = ∫ F dt = Δp = p_final - p_initial",
      "Banking Angle (without friction): tan θ = v² / (rg)",
      "Maximum speed on banked road with friction: v_max = √[rg (tan θ + μs) / (1 - μs tan θ)]"
    ],
    intextQuestions: [
      "Q: A horse cannot pull a cart and run in empty space. Why? Ans: Because to accelerate forward, the horse must push the ground backward so that the ground exerts an equal and opposite forward reaction force (Newton's 3rd Law). In empty space, there is no reaction force."
    ]
  },
  {
    id: "ncert_c11_ch04",
    code: "kech104",
    classLevel: "11",
    subject: "Chemistry",
    category: "11-chem",
    chNumber: "Chapter 4",
    title: "Chemical Bonding and Molecular Structure",
    officialPdfUrl: "https://ncert.nic.in/textbook.php?kech1=4-7",
    topics: "Kossel-Lewis Approach, Octet Rule & Limitations, Ionic & Covalent Bonds, Dipole Moment, VSEPR Theory, Valence Bond Theory (Hybridisation), Molecular Orbital Theory (MOT).",
    synopsis: "The attractive force which holds various constituents (atoms, ions) together in different chemical species is called a chemical bond. Atoms combine either by transfer of valence electrons (ionic) or by sharing of valence electrons (covalent) to attain a stable octet configuration.",
    goldenLines: [
      "NCERT Golden Line 1: 'According to VSEPR theory, the repulsive interaction of electron pairs decreases in the order: Lone pair - Lone pair > Lone pair - Bond pair > Bond pair - Bond pair. Lone pairs occupy more space around the central atom than bonding pairs.' (NEET 2020, 2022)",
      "NCERT Golden Line 2: 'In O2 and F2 molecules, the filling order of molecular orbitals is: σ1s < σ*1s < σ2s < σ*2s < σ2pz < (π2px = π2py) < (π*2px = π*2py) < σ*2pz. For B2, C2, N2, the π2px and π2py orbitals are lower in energy than σ2pz.'"
    ],
    formulas: [
      "Bond Order = 1/2 [Nb - Na]",
      "Dipole Moment μ = q × d (expressed in Debye units, 1 D = 3.33564 × 10⁻³⁰ C·m)",
      "Formal Charge = [Total valence e⁻] - [Non-bonding e⁻] - 1/2 [Bonding e⁻]"
    ],
    intextQuestions: [
      "Q: Although both CO2 and H2O are triatomic molecules, the dipole moment of CO2 is zero whereas that of H2O is 1.85 D. Why? Ans: CO2 has a linear geometry (O=C=O) where the two equal C=O bond dipole moments cancel each other out. H2O has a bent / V-shaped geometry due to two lone pairs on oxygen, so bond dipoles do not cancel."
    ]
  }
];

// Worked NCERT Solutions & Exemplar Bank
const NCERT_SOLUTIONS_CATALOG = [...ADDITIONAL_NCERT_SOLUTIONS, 
  {
    id: "sol_b12_01",
    classLevel: "12",
    subject: "Biology",
    type: "textbook",
    chapter: "Principles of Inheritance and Variation",
    qNumber: "Exercise Question 8",
    question: "A cross between a normal vision man and a colour-blind woman produces children. What will be the genotype and phenotype of the male and female offspring?",
    steps: [
      "<strong>Step 1: Identify Mode of Inheritance:</strong> Red-green colour blindness is an X-linked recessive genetic disorder. Let Xᶜ represent the mutant colour-blind allele and X⁺ represent the normal dominant allele.",
      "<strong>Step 2: Assign Parental Genotypes:</strong> The colour-blind woman is homozygous recessive: XᶜXᶜ. The normal vision man has normal hemizygous genotype: X⁺Y.",
      "<strong>Step 3: Gamete Formation & Punnett Square:</strong> Mother produces all Xᶜ gametes. Father produces 50% X⁺ and 50% Y gametes.",
      "<strong>Step 4: Offspring Genotype Determination:</strong>",
      "• Female offspring: X⁺ (from father) + Xᶜ (from mother) = X⁺Xᶜ (100% Carrier females).",
      "• Male offspring: Y (from father) + Xᶜ (from mother) = XᶜY (100% Colour-blind males)."
    ],
    answer: "100% of the daughters will have normal vision but will be genetic carriers (X⁺Xᶜ). 100% of the sons will be colour-blind (XᶜY). This demonstrates criss-cross inheritance from mother to son.",
    markingScheme: "1 Mark for parent genotypes + 1 Mark for Punnett square cross + 1 Mark for concluding daughter & son phenotypes. Total: 3 Marks (CBSE Board Standard)."
  },
  {
    id: "sol_m12_01",
    classLevel: "12",
    subject: "Mathematics",
    type: "textbook",
    chapter: "Integrals",
    qNumber: "Exercise 7.11 Question 2",
    question: "Evaluate the definite integral: I = ∫₀^(π/2) [√sin x / (√sin x + √cos x)] dx",
    steps: [
      "<strong>Step 1: State the Given Integral:</strong>",
      "Let I = ∫₀^(π/2) [√sin x / (√sin x + √cos x)] dx  --- (Equation 1)",
      "<strong>Step 2: Apply King's Property:</strong>",
      "Using Property P4: ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx, where a = π/2.",
      "Replace x with (π/2 - x):",
      "sin(π/2 - x) = cos x  and  cos(π/2 - x) = sin x.",
      "Therefore, I = ∫₀^(π/2) [√cos x / (√cos x + √sin x)] dx  --- (Equation 2)",
      "<strong>Step 3: Add Equations (1) and (2):</strong>",
      "2I = ∫₀^(π/2) [(√sin x + √cos x) / (√sin x + √cos x)] dx",
      "2I = ∫₀^(π/2) 1 dx",
      "2I = [x]₀^(π/2) = π/2 - 0 = π/2",
      "<strong>Step 4: Solve for I:</strong>",
      "I = (1/2) × (π/2) = π/4"
    ],
    answer: "The exact value of the integral is I = π/4.",
    markingScheme: "1 Mark for writing Property P4 statement + 1.5 Marks for substituting and setting up 2I + 0.5 Mark for final answer π/4. Total: 3 Marks."
  },
  {
    id: "sol_p12_01",
    classLevel: "12",
    subject: "Physics",
    type: "exemplar",
    chapter: "Current Electricity",
    qNumber: "NCERT Exemplar Problem 3.7",
    question: "In a Wheatstone bridge network, four resistances P = 100 Ω, Q = 10 Ω, R = 5 Ω and S = 0.5 Ω are connected. A battery of 10 V is connected across the bridge. Find the current drawn from the battery and check if the bridge is balanced.",
    steps: [
      "<strong>Step 1: Check Wheatstone Balance Condition:</strong>",
      "Condition for bridge balance is P / Q = R / S.",
      "P / Q = 100 / 10 = 10.",
      "R / S = 5 / 0.5 = 10.",
      "Since P/Q = R/S = 10, the bridge is perfectly balanced! No current flows through the central galvanometer branch (Ig = 0).",
      "<strong>Step 2: Calculate Equivalent Resistance Req:</strong>",
      "Branch ABC has (P + Q) in series = 100 + 10 = 110 Ω.",
      "Branch ADC has (R + S) in series = 5 + 0.5 = 5.5 Ω.",
      "These two parallel branches give Req = (110 × 5.5) / (110 + 5.5) = 605 / 115.5 = 5.238 Ω.",
      "<strong>Step 3: Calculate Total Current:</strong>",
      "Total current from 10 V battery: I = V / Req = 10 / 5.238 ≈ 1.91 A."
    ],
    answer: "The bridge is balanced because P/Q = R/S = 10. The equivalent resistance is 5.24 Ω and current drawn from the battery is 1.91 A.",
    markingScheme: "1 Mark for proving P/Q = R/S balance + 1 Mark for branch series resistances + 1 Mark for Req and final current I. Total: 3 Marks."
  },
  {
    id: "sol_c12_01",
    classLevel: "12",
    subject: "Chemistry",
    type: "textbook",
    chapter: "Electrochemistry",
    qNumber: "In-Text Exercise 2.4",
    question: "Calculate the potential of a hydrogen electrode in contact with a solution whose pH is 10 at 298 K.",
    steps: [
      "<strong>Step 1: Formulate Electrode Half-Cell Reaction:</strong>",
      "H⁺(aq) + e⁻ --> 1/2 H2(g) (1 bar)",
      "Here, number of electrons transferred n = 1.",
      "<strong>Step 2: Determine [H⁺] from Given pH:</strong>",
      "pH = -log [H⁺] = 10  ==>  [H⁺] = 10⁻¹⁰ M.",
      "<strong>Step 3: Apply Nernst Equation:</strong>",
      "E(H⁺/H2) = E°(H⁺/H2) - (0.0591 / n) log [1 / [H⁺]]",
      "Since E° for standard hydrogen electrode is 0.00 V by definition:",
      "E = 0 - (0.0591 / 1) log [1 / 10⁻¹⁰]",
      "E = -0.0591 × log (10¹⁰)",
      "E = -0.0591 × 10 = -0.591 V"
    ],
    answer: "Electrode potential of the hydrogen electrode at pH 10 is -0.591 V.",
    markingScheme: "0.5 Mark for electrode reaction + 0.5 Mark for [H⁺] = 10⁻¹⁰ M + 1 Mark for correct substitution in Nernst equation. Total: 2 Marks."
  }
];

// Verified Previous Year Questions (PYQs 2020-2024)
const PYQ_ARCHIVE = [
  {
    exam: "NEET-UG 2023",
    subject: "Biology",
    topic: "Genetics & Molecular Biology",
    qText: "Which one of the following statements is NOT correct regarding the genetic code?",
    options: [
      "A. The code is nearly universal",
      "B. One codon codes for only one amino acid, hence it is unambiguous",
      "C. Some amino acids are coded by more than one codon, hence it is degenerate",
      "D. The codon AUG codes for Methionine and also acts as a stop codon"
    ],
    correctOption: "D",
    explanation: "AUG has dual functions: it codes for Methionine (Met) AND acts as the INITIATOR (start) codon, NOT a stop codon. The stop/termination codons are UAA (ochre), UAG (amber), and UGA (opal)."
  },
  {
    exam: "JEE Main 2024",
    subject: "Mathematics",
    topic: "Calculus (Integrals)",
    qText: "If ∫ (2x¹² + 5x⁹) / (x⁵ + x³ + 1)³ dx = (x¹⁰) / (2(x⁵ + x³ + 1)²) + C, find the value of the integral using power adjustment.",
    options: [
      "A. x⁵ / (2(x⁵ + x³ + 1)²) + C",
      "B. x¹⁰ / (2(x⁵ + x³ + 1)²) + C",
      "C. (2x⁵ - 1) / (x⁵ + x³ + 1)² + C",
      "D. x¹⁵ / (x⁵ + x³ + 1)³ + C"
    ],
    correctOption: "B",
    explanation: "Divide numerator and denominator by x¹⁵. Numerator becomes (2x⁻³ + 5x⁻⁶) dx. Denominator becomes (1 + x⁻² + x⁻⁵)³. Let t = 1 + x⁻² + x⁻⁵, then dt = (-2x⁻³ - 5x⁻⁶) dx. Integral becomes -∫ t⁻³ dt = t⁻²/2 = x¹⁰ / [2(x⁵ + x³ + 1)²] + C."
  },
  {
    exam: "NEET-UG 2022",
    subject: "Physics",
    topic: "Current Electricity",
    qText: "As the temperature increases, the electrical resistance of:",
    options: [
      "A. Increases for both conductors and semiconductors",
      "B. Decreases for both conductors and semiconductors",
      "C. Increases for conductors but decreases for semiconductors",
      "D. Decreases for conductors but increases for semiconductors"
    ],
    correctOption: "C",
    explanation: "In metals (conductors), thermal vibrations increase carrier scattering, reducing relaxation time τ, so resistance increases. In semiconductors, thermal energy breaks covalent bonds creating more free electron-hole pairs, so resistivity decreases exponentially (negative temperature coefficient of resistance)."
  },
  {
    exam: "JEE Main 2023",
    subject: "Chemistry",
    topic: "Electrochemistry",
    qText: "For the cell reaction 2Fe³⁺(aq) + 2I⁻(aq) --> 2Fe²⁺(aq) + I2(s), the value of E°cell is 0.236 V at 298 K. The equilibrium constant of the cell reaction is:",
    options: [
      "A. 9.6 × 10⁷",
      "B. 1.0 × 10⁸",
      "C. 9.6 × 10⁶",
      "D. 1.0 × 10⁴"
    ],
    correctOption: "A",
    explanation: "n = 2 electrons transferred. E°cell = (0.0591 / n) log Kc  ==>  0.236 = (0.0591 / 2) log Kc  ==>  log Kc = (0.236 × 2) / 0.0591 ≈ 7.986. Kc = 10^7.986 ≈ 9.68 × 10⁷."
  }
];

// High-Yield Formula Vault
const FORMULA_VAULT_DATA = [
  {
    subject: "Physics",
    classLevel: "12",
    category: "Electrostatics",
    title: "Gauss's Law & Electric Flux",
    formula: "\\Phi_E = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{enclosed}}}{\\varepsilon_0}",
    condition: "Valid for any closed Gaussian surface of arbitrary shape in vacuum/air.",
    trick: "For infinite wire: E = λ/(2πε₀r). For infinite sheet: E = σ/(2ε₀) (independent of distance!)."
  },
  {
    subject: "Physics",
    classLevel: "12",
    category: "Magnetism",
    title: "Biot-Savart Law & Circular Coil Field",
    formula: "B = \\frac{\\mu_0 N I R^2}{2(R^2 + x^2)^{3/2}} \\quad \\to \\quad B_{\\text{center}} = \\frac{\\mu_0 N I}{2R}",
    condition: "Steady current flowing in a circular loop of radius R with N turns.",
    trick: "At center x=0, B is maximum. At x = R/√2, rate of change of field is minimum (Helmholtz coil spacing)."
  },
  {
    subject: "Physics",
    classLevel: "12",
    category: "Modern Physics",
    title: "Einstein's Photoelectric Equation",
    formula: "h\\nu = \\Phi_0 + K_{\\max} = h\\nu_0 + e V_0",
    condition: "Photon of frequency ν incident on photosensitive metal with work function Φ₀.",
    trick: "Stopping potential V0 vs frequency ν graph slope is h/e (universal constant), x-intercept is threshold frequency ν₀."
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    category: "Physical Chem",
    title: "First Order Reaction Integrated Rate Law",
    formula: "k = \\frac{2.303}{t} \\log_{10} \\left(\\frac{[A]_0}{[A]_t}\\right), \\quad t_{1/2} = \\frac{0.693}{k}",
    condition: "Rate depends on concentration of single reactant to power 1. Unit of k is s⁻¹.",
    trick: "Half-life t1/2 is strictly independent of initial concentration. Time for 99.9% completion = 10 × t1/2."
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    category: "Solutions",
    title: "Colligative Properties & Van 't Hoff Factor",
    formula: "\\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\Pi = i C R T",
    condition: "Dilute solutions. For dissociation: i = 1 + (n - 1)α. For association: i = 1 + (1/n - 1)α.",
    trick: "For NaCl: i ≈ 2; for BaCl2: i ≈ 3; for K4[Fe(CN)6]: i ≈ 5. Highest boiling point = highest value of (i × m)."
  },
  {
    subject: "Mathematics",
    classLevel: "12",
    category: "Calculus",
    title: "Derivative of Inverse Trig Functions",
    formula: "\\frac{d}{dx}[\\arcsin x] = \\frac{1}{\\sqrt{1 - x^2}}, \\quad \\frac{d}{dx}[\\arctan x] = \\frac{1}{1 + x^2}",
    condition: "|x| < 1 for arcsin x; all real x for arctan x.",
    trick: "d/dx [arccos x] = -d/dx [arcsin x] and d/dx [arccot x] = -d/dx [arctan x]."
  },
  {
    subject: "Mathematics",
    classLevel: "12",
    category: "3D Geometry",
    title: "Shortest Distance Between Skew Lines",
    formula: "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}",
    condition: "Lines r = a1 + λ b1 and r = a2 + μ b2 are non-parallel, non-intersecting skew lines.",
    trick: "If d = 0, the lines intersect and are coplanar: (a2 - a1) · (b1 × b2) = 0."
  },
  {
    subject: "Biology",
    classLevel: "12",
    category: "Genetics",
    title: "Hardy-Weinberg Equilibrium Principle",
    formula: "p^2 + 2pq + q^2 = 1 \\quad \\text{and} \\quad p + q = 1",
    condition: "Large population, random mating, no mutation, no gene flow, no natural selection.",
    trick: "q² = frequency of homozygous recessive phenotype. Calculate q first: q = √(q²), then p = 1 - q, heterozygous = 2pq."
  }
];

const SPATIAL_INTERVALS = [1, 4, 7, 16, 30];

// Academic Pro Controller State
let academicTasks = [];
let deepWorkTimer = {
  seconds: 3000,
  initialSeconds: 3000,
  isRunning: false,
  intervalId: null,
  activeTargetId: null
};

// =============================================================================
// CONTROLLER: Setup & Event Handlers
// =============================================================================

function loadAcademicTasks() {
  const saved = localStorage.getItem("mg_academic_tasks");
  if (saved) {
    try {
      academicTasks = JSON.parse(saved);
    } catch(e) {
      console.warn("Failed to parse saved academic tasks, using defaults.");
      academicTasks = [...DEFAULT_ACADEMIC_TASKS];
    }
  } else {
    academicTasks = [...DEFAULT_ACADEMIC_TASKS];
    saveAcademicTasks();
  }
}

function saveAcademicTasks() {
  localStorage.setItem("mg_academic_tasks", JSON.stringify(academicTasks));
}

// Mode Switcher: Garden Mode vs Academic Pro Command
function setAppMode(mode) {
  const gardenLayout = document.getElementById("garden-main-layout");
  const academicHub = document.getElementById("academic-pro-hub");
  const btnSegGarden = document.getElementById("btn-seg-garden");
  const btnSegAcademic = document.getElementById("btn-seg-academic");
  const timeMachineBar = document.querySelector(".time-machine-bar");
  const waterBucketLayer = document.getElementById("water-bucket-layer");

  if (!gardenLayout || !academicHub) return;

  if (mode === "academic") {
    gardenLayout.classList.add("hidden");
    academicHub.classList.remove("hidden");
    if (timeMachineBar) timeMachineBar.style.display = "none";
    if (waterBucketLayer) waterBucketLayer.style.display = "none";

    btnSegAcademic.classList.add("active");
    btnSegGarden.classList.remove("active");

    // Render Academic Pro Hub
    renderAcademicTaskforce();
    renderAcademicEbooks();
    renderAcademicSolutions();
    renderPYQs();
    renderFormulaVault();
    updateDeepWorkTargetDropdown();

    localStorage.setItem("mg_app_mode", "academic");
  } else {
    academicHub.classList.add("hidden");
    gardenLayout.classList.remove("hidden");
    if (timeMachineBar) timeMachineBar.style.display = "";
    if (waterBucketLayer) waterBucketLayer.style.display = "";

    btnSegGarden.classList.add("active");
    btnSegAcademic.classList.remove("active");

    renderGarden();
    localStorage.setItem("mg_app_mode", "garden");
  }
}

function setupAcademicModeSwitcher() {
  const btnSegGarden = document.getElementById("btn-seg-garden");
  const btnSegAcademic = document.getElementById("btn-seg-academic");

  if (btnSegGarden) {
    btnSegGarden.addEventListener("click", () => setAppMode("garden"));
  }
  if (btnSegAcademic) {
    btnSegAcademic.addEventListener("click", () => setAppMode("academic"));
  }

  // Quick switch buttons inside academic hub
  const btnQuickDeep = document.getElementById("btn-acad-quick-deepwork");
  if (btnQuickDeep) {
    btnQuickDeep.addEventListener("click", () => {
      switchAcademicTab("deepwork");
    });
  }

  const btnEnlistModal1 = document.getElementById("btn-acad-enlist-modal");
  const btnEnlistModal2 = document.getElementById("btn-open-enlist-modal");
  if (btnEnlistModal1) {
    btnEnlistModal1.addEventListener("click", () => openModal("modal-enlist-task"));
  }
  if (btnEnlistModal2) {
    btnEnlistModal2.addEventListener("click", () => openModal("modal-enlist-task"));
  }

  const btnRadarReview = document.getElementById("btn-radar-review-now");
  if (btnRadarReview) {
    btnRadarReview.addEventListener("click", () => {
      const statusSelect = document.getElementById("tf-filter-status");
      if (statusSelect) {
        statusSelect.value = "due";
        renderAcademicTaskforce();
      }
    });
  }
}

// Switch between Academic Tabs
function switchAcademicTab(targetTab) {
  const tabs = document.querySelectorAll(".acad-tab-btn");
  tabs.forEach(btn => {
    if (btn.getAttribute("data-acad-tab") === targetTab) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const subviews = document.querySelectorAll(".acad-subview");
  subviews.forEach(view => {
    if (view.id === `acad-subview-${targetTab}`) {
      view.classList.remove("hidden");
    } else {
      view.classList.add("hidden");
    }
  });

  // Re-trigger KaTeX if switching to formula vault or solutions
  if (window.renderMathInElement && (targetTab === "formulas" || targetTab === "solutions")) {
    setTimeout(() => {
      renderMathInElement(document.getElementById(`acad-subview-${targetTab}`), {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ],
        throwOnError: false
      });
    }, 50);
  }
}

function setupAcademicNavTabs() {
  const tabs = document.querySelectorAll(".acad-tab-btn");
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-acad-tab");
      switchAcademicTab(target);
    });
  });
}

// =============================================================================
// SUBVIEW 1: REVISION TASKFORCE & RADAR
// =============================================================================

function calculateTaskMetrics(task) {
  const now = new Date();
  const nextDueDate = new Date(task.nextDue);
  const diffDays = Math.ceil((nextDueDate - now) / (1000 * 60 * 60 * 24));

  let status = "upcoming";
  let statusLabel = `In ${diffDays}d`;

  if (diffDays < 0) {
    status = "overdue";
    statusLabel = `Overdue (${Math.abs(diffDays)}d)`;
  } else if (diffDays === 0) {
    status = "due-today";
    statusLabel = "DUE TODAY";
  } else if (task.stage >= 4) {
    status = "mastered";
    statusLabel = "MASTERED (R4)";
  }

  return { diffDays, status, statusLabel };
}

function renderAcademicTaskforce() {
  const grid = document.getElementById("taskforce-cards-grid");
  if (!grid) return;

  const searchVal = (document.getElementById("tf-search-input")?.value || "").toLowerCase().trim();
  const subjectVal = document.getElementById("tf-filter-subject")?.value || "all";
  const classVal = document.getElementById("tf-filter-class")?.value || "all";
  const targetVal = document.getElementById("tf-filter-target")?.value || "all";
  const statusVal = document.getElementById("tf-filter-status")?.value || "all";

  // Calculate global summary metrics
  let dueTodayCount = 0;
  let totalTasks = academicTasks.length;
  let masteredCount = 0;

  const filteredTasks = academicTasks.filter(task => {
    const { status } = calculateTaskMetrics(task);
    if (status === "due-today" || status === "overdue") dueTodayCount++;
    if (task.stage >= 4) masteredCount++;

    if (subjectVal !== "all" && task.subject !== subjectVal) return false;
    if (classVal !== "all" && task.classLevel !== classVal) return false;
    if (targetVal !== "all" && task.targetExam !== targetVal) return false;

    if (statusVal === "due" && !(status === "due-today" || status === "overdue")) return false;
    if (statusVal === "upcoming" && status !== "upcoming") return false;
    if (statusVal === "mastered" && status !== "mastered") return false;

    if (searchVal) {
      const matchText = `${task.title} ${task.notes || ""} ${task.subject}`.toLowerCase();
      if (!matchText.includes(searchVal)) return false;
    }

    return true;
  });

  // Update hero stats
  const statTotal = document.getElementById("acad-stat-total");
  const statDue = document.getElementById("acad-stat-due");
  const statRetention = document.getElementById("acad-stat-retention");
  const tabBadgeDue = document.getElementById("badge-taskforce-due");
  const radarAlert = document.getElementById("acad-radar-alert");
  const radarAlertCount = document.getElementById("radar-alert-count");

  if (statTotal) statTotal.textContent = totalTasks;
  if (statDue) statDue.innerHTML = `${dueTodayCount} <span class="pulse-badge"></span>`;
  if (tabBadgeDue) tabBadgeDue.textContent = dueTodayCount;

  // Average retention calculation
  const avgRetention = totalTasks > 0 ? Math.round(((totalTasks - dueTodayCount) / totalTasks) * 100) : 100;
  if (statRetention) statRetention.textContent = `${avgRetention}%`;

  // Radar alert visibility
  if (radarAlert && radarAlertCount) {
    if (dueTodayCount > 0) {
      radarAlert.classList.remove("hidden");
      radarAlertCount.textContent = `${dueTodayCount} Chapter${dueTodayCount > 1 ? 's' : ''}`;
    } else {
      radarAlert.classList.add("hidden");
    }
  }

  // Render cards
  if (filteredTasks.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 3rem 1.5rem; text-align: center; background: var(--hub-surface); border-radius: var(--r-lg); border: 1px dashed var(--hub-border);">
        <p style="font-size: 1.1rem; color: var(--hub-muted); margin: 0 0 1rem 0;">No syllabus units found matching your current filter.</p>
        <button class="btn btn-primary" onclick="openModal('modal-enlist-task')">➕ Enlist a New Syllabus Unit</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredTasks.map(task => {
    const { status, statusLabel } = calculateTaskMetrics(task);

    const subjectClass = task.subject === "Biology" ? "bio" :
                         task.subject === "Mathematics" ? "math" :
                         task.subject === "Physics" ? "phys" : "chem";

    const cardBorderClass = status === "overdue" ? "card-overdue" :
                            status === "due-today" ? "card-due-today" :
                            status === "mastered" ? "card-mastered" : "card-upcoming";

    // Build cadence ticks (R0 through R4)
    let ticksHtml = "";
    for (let i = 0; i < 5; i++) {
      const isFilled = i <= task.stage;
      const isMastered = task.stage >= 4;
      ticksHtml += `<div class="tf-cadence-tick ${isFilled ? 'filled' : ''} ${isMastered ? 'tick-mastered' : ''}"></div>`;
    }

    return `
      <div class="taskforce-card ${cardBorderClass}" data-task-id="${task.id}">
        <div>
          <div class="tf-header">
            <div class="tf-meta-badges">
              <span class="tf-subject-pill ${subjectClass}">${task.subject}</span>
              <span class="tf-target-pill">Class ${task.classLevel}</span>
              <span class="tf-target-pill">${task.targetExam}</span>
              ${task.priority === 'high' ? '<span class="tf-target-pill" style="color:#fbbf24; background:rgba(245,158,11,.15);">High Yield</span>' : ''}
            </div>
            <span class="tf-status-badge ${status}">${statusLabel}</span>
          </div>

          <h3 class="tf-title">${escapeHtml(task.title)}</h3>

          ${task.notes ? `<div class="tf-notes">${escapeHtml(task.notes)}</div>` : ''}

          <!-- Spaced Cadence Progress -->
          <div class="tf-cadence-bar">
            <div class="tf-cadence-label-row">
              <span>Cadence Stage: <strong>R${task.stage}</strong> (${task.stage >= 4 ? 'Mastered' : `Interval: +${SPATIAL_INTERVALS[task.stage]}d`})</span>
              <span>Next: ${task.nextDue}</span>
            </div>
            <div class="tf-cadence-ticks">
              ${ticksHtml}
            </div>
          </div>
        </div>

        <div>
          <div class="tf-meta-footer">
            <span>Last Reviewed: ${task.lastRevised || task.initialDate}</span>
            <span>Target: ${task.targetExam}</span>
          </div>

          <div class="tf-actions">
            <button class="tf-btn tf-btn-revise" onclick="markTaskRevised('${task.id}')" title="Advance spaced repetition cadence to next interval">
              ✓ Mark Revised
            </button>
            <button class="tf-btn tf-btn-secondary" onclick="snoozeTask('${task.id}')" title="Snooze reminder by 24 hours">
              ⏰ +24h
            </button>
            <button class="tf-btn tf-btn-secondary" onclick="openNCERTReaderForSubject('${task.subject}')" title="Open related NCERT textbook e-book">
              📖 NCERT
            </button>
            <button class="tf-btn tf-btn-secondary" onclick="deleteAcademicTask('${task.id}')" title="Remove unit from taskforce">
              🗑️
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Mark Task Revised (Advances Spaced Cadence R0 -> R1 -> R2 -> R3 -> R4)
function markTaskRevised(taskId) {
  const task = academicTasks.find(t => t.id === taskId);
  if (!task) return;

  const currentStage = task.stage || 0;
  const nextStage = Math.min(4, currentStage + 1);
  const nextIntervalDays = SPATIAL_INTERVALS[nextStage];

  const now = new Date();
  const nextDueDate = new Date(now.getTime() + nextIntervalDays * 86400000);

  task.stage = nextStage;
  task.lastRevised = now.toISOString().split('T')[0];
  task.nextDue = nextDueDate.toISOString().split('T')[0];

  saveAcademicTasks();
  renderAcademicTaskforce();

  // Play crisp confirmation tone
  playTone(523.25, 0.12); // C5
  setTimeout(() => playTone(659.25, 0.15), 100); // E5

  showNotification(`✓ ${task.title.substring(0, 32)}... advanced to Cadence R${nextStage}! Next review in ${nextIntervalDays} days.`);
}

function snoozeTask(taskId) {
  const task = academicTasks.find(t => t.id === taskId);
  if (!task) return;

  const nextDue = new Date(task.nextDue);
  nextDue.setDate(nextDue.getDate() + 1);
  task.nextDue = nextDue.toISOString().split('T')[0];

  saveAcademicTasks();
  renderAcademicTaskforce();
  showNotification(`⏰ Snoozed review for 24 hours (Due: ${task.nextDue})`);
}

function deleteAcademicTask(taskId) {
  if (!confirm("Are you sure you want to remove this module from the Revision Taskforce?")) return;
  academicTasks = academicTasks.filter(t => t.id !== taskId);
  saveAcademicTasks();
  renderAcademicTaskforce();
  updateDeepWorkTargetDropdown();
  showNotification("Module removed from taskforce.");
}

function setupTaskforceFilterListeners() {
  const searchInput = document.getElementById("tf-search-input");
  const filterSubject = document.getElementById("tf-filter-subject");
  const filterClass = document.getElementById("tf-filter-class");
  const filterTarget = document.getElementById("tf-filter-target");
  const filterStatus = document.getElementById("tf-filter-status");

  [searchInput, filterSubject, filterClass, filterTarget, filterStatus].forEach(el => {
    if (el) {
      el.addEventListener("input", renderAcademicTaskforce);
      el.addEventListener("change", renderAcademicTaskforce);
    }
  });
}

// =============================================================================
// SUBVIEW 2: NCERT OFFICIAL E-BOOKS & IN-APP READER
// =============================================================================

function renderAcademicEbooks() {
  const grid = document.getElementById("ebooks-cards-grid");
  if (!grid) return;

  const searchVal = (document.getElementById("ebook-search-input")?.value || "").toLowerCase().trim();
  const categoryVal = document.getElementById("ebook-filter-category")?.value || "all";

  const filteredEbooks = NCERT_EBOOKS_CATALOG.filter(book => {
    if (categoryVal !== "all" && book.category !== categoryVal) return false;
    if (searchVal) {
      const matchText = `${book.title} ${book.chNumber} ${book.topics} ${book.subject}`.toLowerCase();
      if (!matchText.includes(searchVal)) return false;
    }
    return true;
  });

  grid.innerHTML = filteredEbooks.map(book => {
    const subjectColor = book.subject === "Biology" ? "#4ade80" :
                         book.subject === "Mathematics" ? "#38bdf8" :
                         book.subject === "Physics" ? "#fbbf24" : "#c084fc";

    const subjectIcon = book.subject === "Biology" ? "🌱" :
                        book.subject === "Mathematics" ? "📐" :
                        book.subject === "Physics" ? "⚡" : "🧪";

    return `
      <div class="ebook-card">
        <div>
          <div class="ebook-hdr">
            <div class="ebook-book-cover">
              <span class="cover-ncert-lbl">NCERT</span>
              <span class="cover-icon">${subjectIcon}</span>
              <span class="cover-code">${book.code}</span>
            </div>
            <div class="ebook-info">
              <div class="ebook-chapter-num" style="color: ${subjectColor};">${book.chNumber} • Class ${book.classLevel} ${book.subject}</div>
              <h3 class="ebook-title">${escapeHtml(book.title)}</h3>
              <span class="tf-target-pill" style="font-size: .65rem;">Rationalised Syllabus</span>
            </div>
          </div>
          <div class="ebook-topics">
            <strong>Key Topics:</strong> ${escapeHtml(book.topics)}
          </div>
        </div>

        <div class="ebook-actions">
          <button class="tf-btn tf-btn-revise" onclick="openNCERTReader('${book.id}')">
            📖 Read E-Book
          </button>
          <a href="${book.officialPdfUrl}" target="_blank" rel="noopener noreferrer" class="tf-btn tf-btn-secondary" style="text-decoration:none;">
            🌐 Official PDF ↗
          </a>
          <button class="tf-btn tf-btn-secondary" onclick="enlistBookToTaskforce('${book.id}')" title="Add chapter directly into spaced revision taskforce">
            ➕ Enlist
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function openNCERTReader(bookId) {
  const book = NCERT_EBOOKS_CATALOG.find(b => b.id === bookId);
  if (!book) return;

  const modal = document.getElementById("modal-ncert-reader");
  const titleEl = document.getElementById("reader-title");
  const subEl = document.getElementById("reader-subtitle");
  const bodyEl = document.getElementById("reader-scroll-body");
  const officialPdfBtn = document.getElementById("reader-btn-official-pdf");
  const enlistBtn = document.getElementById("btn-reader-enlist");

  if (!modal || !bodyEl) return;

  titleEl.textContent = `${book.chNumber}: ${book.title}`;
  subEl.textContent = `Class ${book.classLevel} ${book.subject} • Official NCERT Textbook (Code: ${book.code})`;

  if (officialPdfBtn) officialPdfBtn.href = book.officialPdfUrl;
  if (enlistBtn) {
    enlistBtn.onclick = () => {
      enlistBookToTaskforce(book.id);
    };
  }

  // Generate reader content
  let contentHtml = `
    <div style="background: rgba(59,130,246,.08); border-left: 4px solid #3b82f6; padding: 1rem 1.25rem; border-radius: 6px; margin-bottom: 1.5rem;">
      <h4 style="margin: 0 0 .3rem 0; color: #60a5fa; font-size: .95rem;">Official Syllabus Mapping &amp; Overview</h4>
      <p style="margin: 0; font-size: .88rem; line-height: 1.5;">${escapeHtml(book.synopsis)}</p>
    </div>

    <div class="reader-section-tag">🌟 NCERT Golden Lines (High-Yield Assertion-Reason &amp; Direct NEET/CBSE Triggers)</div>
  `;

  book.goldenLines.forEach(line => {
    contentHtml += `<div class="ncert-golden-box">${line}</div>`;
  });

  if (book.formulas && book.formulas.length > 0) {
    contentHtml += `<div class="reader-section-tag">⚡ Core Formulas &amp; Quantitative Laws</div>`;
    book.formulas.forEach(form => {
      contentHtml += `
        <div style="background: var(--hub-card); padding: .75rem 1rem; border-radius: 6px; margin-bottom: .6rem; font-family: var(--mono); font-size: .9rem; border: 1px solid var(--hub-border);">
          ${escapeHtml(form)}
        </div>
      `;
    });
  }

  if (book.intextQuestions && book.intextQuestions.length > 0) {
    contentHtml += `<div class="reader-section-tag">💡 NCERT In-Text Conceptual Questions</div>`;
    book.intextQuestions.forEach(q => {
      contentHtml += `
        <div style="background: rgba(16,185,129,.08); border-left: 3px solid #10b981; padding: .85rem 1rem; border-radius: 6px; margin-bottom: .75rem; font-size: .9rem;">
          ${escapeHtml(q)}
        </div>
      `;
    });
  }

  bodyEl.innerHTML = contentHtml;
  openModal("modal-ncert-reader");
}

function openNCERTReaderForSubject(subject) {
  const match = NCERT_EBOOKS_CATALOG.find(b => b.subject === subject);
  if (match) {
    openNCERTReader(match.id);
  } else if (NCERT_EBOOKS_CATALOG.length > 0) {
    openNCERTReader(NCERT_EBOOKS_CATALOG[0].id);
  }
}

function enlistBookToTaskforce(bookId) {
  const book = NCERT_EBOOKS_CATALOG.find(b => b.id === bookId);
  if (!book) return;

  // Check if already enlisted
  const exists = academicTasks.find(t => t.title.includes(book.title));
  if (exists) {
    showNotification(`"${book.title}" is already in your Revision Taskforce!`);
    return;
  }

  const now = new Date();
  const nextDueDate = new Date(now.getTime() + 1 * 86400000); // R0 -> R1 in 1 day

  const newTask = {
    id: "acad_custom_" + Date.now(),
    subject: book.subject,
    classLevel: book.classLevel,
    targetExam: book.subject === "Biology" ? "NEET" : "JEE",
    title: `${book.chNumber}: ${book.title}`,
    initialDate: now.toISOString().split('T')[0],
    stage: 0,
    lastRevised: now.toISOString().split('T')[0],
    nextDue: nextDueDate.toISOString().split('T')[0],
    priority: "high",
    notes: `Topics: ${book.topics.substring(0, 90)}...`
  };

  academicTasks.unshift(newTask);
  saveAcademicTasks();
  renderAcademicTaskforce();
  updateDeepWorkTargetDropdown();
  showNotification(`📋 "${book.title}" enlisted into your Revision Taskforce!`);
}

function setupNCERTReaderControls() {
  const modal = document.getElementById("modal-ncert-reader");
  const scrollBody = document.getElementById("reader-scroll-body");
  const btnFontDec = document.getElementById("btn-reader-font-dec");
  const btnFontInc = document.getElementById("btn-reader-font-inc");
  const btnTheme = document.getElementById("btn-reader-theme");

  let currentFontSize = 16;
  const themes = ["dark", "sepia", "white"];
  let themeIndex = 0;

  if (btnFontDec && scrollBody) {
    btnFontDec.addEventListener("click", () => {
      currentFontSize = Math.max(13, currentFontSize - 1.5);
      scrollBody.style.fontSize = `${currentFontSize}px`;
    });
  }

  if (btnFontInc && scrollBody) {
    btnFontInc.addEventListener("click", () => {
      currentFontSize = Math.min(24, currentFontSize + 1.5);
      scrollBody.style.fontSize = `${currentFontSize}px`;
    });
  }

  if (btnTheme && scrollBody) {
    btnTheme.addEventListener("click", () => {
      themeIndex = (themeIndex + 1) % themes.length;
      scrollBody.setAttribute("data-theme", themes[themeIndex]);
      showNotification(`Reader mode: ${themes[themeIndex].toUpperCase()}`);
    });
  }

  // E-book search & filter
  const searchInput = document.getElementById("ebook-search-input");
  const catSelect = document.getElementById("ebook-filter-category");
  if (searchInput) searchInput.addEventListener("input", renderAcademicEbooks);
  if (catSelect) catSelect.addEventListener("change", renderAcademicEbooks);
}

// =============================================================================
// SUBVIEW 3: WORKED SOLUTIONS & EXEMPLAR BANK
// =============================================================================

function renderAcademicSolutions() {
  const list = document.getElementById("solutions-cards-list");
  if (!list) return;

  const searchVal = (document.getElementById("sol-search-input")?.value || "").toLowerCase().trim();
  const subjectVal = document.getElementById("sol-filter-subject")?.value || "all";
  const classVal = document.getElementById("sol-filter-class")?.value || "all";
  const typeVal = document.getElementById("sol-filter-type")?.value || "all";

  const filteredSolutions = NCERT_SOLUTIONS_CATALOG.filter(sol => {
    if (subjectVal !== "all" && sol.subject !== subjectVal) return false;
    if (classVal !== "all" && sol.classLevel !== classVal) return false;
    if (typeVal !== "all" && sol.type !== typeVal) return false;
    if (searchVal) {
      const matchText = `${sol.chapter} ${sol.qNumber} ${sol.question} ${sol.answer}`.toLowerCase();
      if (!matchText.includes(searchVal)) return false;
    }
    return true;
  });

  list.innerHTML = filteredSolutions.map(sol => {
    const subjectClass = sol.subject === "Biology" ? "bio" :
                         sol.subject === "Mathematics" ? "math" :
                         sol.subject === "Physics" ? "phys" : "chem";

    return `
      <div class="solution-card">
        <div class="sol-q-hdr">
          <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
            <span class="tf-subject-pill ${subjectClass}">${sol.subject}</span>
            <span class="tf-target-pill">Class ${sol.classLevel}</span>
            <span class="tf-target-pill">${escapeHtml(sol.chapter)}</span>
            <span class="tf-target-pill" style="color: #60a5fa;">${escapeHtml(sol.qNumber)}</span>
          </div>
          <span class="tf-target-pill" style="background: rgba(59,130,246,.15); color: #93c5fd;">
            ${sol.type === 'exemplar' ? 'NCERT Exemplar HOTS' : 'Textbook Exercise'}
          </span>
        </div>

        <div class="sol-q-text">
          ${escapeHtml(sol.question)}
        </div>

        <div class="sol-steps-block">
          <div style="font-weight: 700; color: #38bdf8; margin-bottom: .6rem; text-transform: uppercase; font-size: .8rem; letter-spacing: .04em;">
            Step-by-Step Derivation &amp; Working:
          </div>
          ${sol.steps.map(step => `<div class="sol-step-item">${step}</div>`).join("")}
        </div>

        <div class="sol-ans-box">
          <strong>Final Answer:</strong> ${escapeHtml(sol.answer)}
        </div>

        <div style="font-size: .78rem; color: var(--hub-muted); margin-top: .75rem; border-top: 1px dashed rgba(255,255,255,.08); padding-top: .5rem;">
          <strong>Marking Breakdown:</strong> ${escapeHtml(sol.markingScheme)}
        </div>
      </div>
    `;
  }).join("");
}

function setupSolutionsFilterListeners() {
  const searchInput = document.getElementById("sol-search-input");
  const subjSelect = document.getElementById("sol-filter-subject");
  const classSelect = document.getElementById("sol-filter-class");
  const typeSelect = document.getElementById("sol-filter-type");

  [searchInput, subjSelect, classSelect, typeSelect].forEach(el => {
    if (el) {
      el.addEventListener("input", renderAcademicSolutions);
      el.addEventListener("change", renderAcademicSolutions);
    }
  });
}

// =============================================================================
// SUBVIEW 4: PREVIOUS YEAR QUESTIONS (PYQs) & BLUEPRINT
// =============================================================================

function renderPYQs() {
  const grid = document.getElementById("pyq-cards-grid");
  if (!grid) return;

  grid.innerHTML = PYQ_ARCHIVE.map((pyq, idx) => {
    return `
      <div class="pyq-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: .65rem;">
          <span class="tf-status-badge due-today" style="font-size: .68rem;">${pyq.exam}</span>
          <span class="tf-target-pill">${pyq.subject} • ${pyq.topic}</span>
        </div>
        <p style="font-size: .92rem; font-weight: 600; color: var(--hub-text); line-height: 1.45; margin: 0 0 1rem 0;">
          ${escapeHtml(pyq.qText)}
        </p>
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem;">
          ${pyq.options.map(opt => `
            <div style="background: var(--hub-card); padding: .45rem .75rem; border-radius: 4px; font-size: .84rem; color: var(--hub-text);">
              ${escapeHtml(opt)}
            </div>
          `).join("")}
        </div>
        <details style="background: rgba(16,185,129,.07); border: 1px solid rgba(16,185,129,.25); border-radius: 6px; padding: .65rem .85rem;">
          <summary style="cursor: pointer; font-size: .8rem; font-weight: 700; color: #34d399;">
            Reveal Verified Answer &amp; Solution ▾
          </summary>
          <div style="margin-top: .75rem; font-size: .84rem; line-height: 1.5; color: var(--hub-text);">
            <strong style="color: #34d399;">Correct Option: ${pyq.correctOption}</strong>
            <p style="margin: .35rem 0 0 0; color: var(--hub-muted);">${escapeHtml(pyq.explanation)}</p>
          </div>
        </details>
      </div>
    `;
  }).join("");
}

// =============================================================================
// SUBVIEW 5: HIGH-YIELD FORMULA VAULT
// =============================================================================

function renderFormulaVault() {
  const grid = document.getElementById("vault-cards-grid");
  if (!grid) return;

  const searchVal = (document.getElementById("vault-search-input")?.value || "").toLowerCase().trim();
  const subjectVal = document.getElementById("vault-filter-subject")?.value || "all";
  const classVal = document.getElementById("vault-filter-class")?.value || "all";

  const filteredFormulas = FORMULA_VAULT_DATA.filter(item => {
    if (subjectVal !== "all" && item.subject !== subjectVal) return false;
    if (classVal !== "all" && item.classLevel !== classVal) return false;
    if (searchVal) {
      const matchText = `${item.title} ${item.formula} ${item.condition} ${item.trick} ${item.category}`.toLowerCase();
      if (!matchText.includes(searchVal)) return false;
    }
    return true;
  });

  grid.innerHTML = filteredFormulas.map(item => {
    const subjectClass = item.subject === "Biology" ? "bio" :
                         item.subject === "Mathematics" ? "math" :
                         item.subject === "Physics" ? "phys" : "chem";

    return `
      <div class="vault-card">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: .5rem;">
            <span class="tf-subject-pill ${subjectClass}">${item.subject}</span>
            <span class="tf-target-pill">Class ${item.classLevel} • ${escapeHtml(item.category)}</span>
          </div>
          <h4 style="font-size: .98rem; font-weight: 700; color: var(--hub-text); margin: 0 0 .5rem 0;">
            ${escapeHtml(item.title)}
          </h4>
          <div class="vault-formula-box">
            $$${item.formula}$$
          </div>
          <div class="vault-notes">
            <strong>Condition:</strong> ${escapeHtml(item.condition)}
          </div>
          <div class="vault-notes" style="margin-top: 4px; color: #fbbf24;">
            <strong>Exam Shortcut:</strong> ${escapeHtml(item.trick)}
          </div>
        </div>
        <div style="margin-top: 1rem; text-align: right;">
          <button class="tf-btn tf-btn-secondary" style="font-size: .75rem; padding: .3rem .6rem;" onclick="copyFormulaText('${item.formula.replace(/\\/g, '\\\\')}')">
            📋 Copy Formula
          </button>
        </div>
      </div>
    `;
  }).join("");

  // Trigger KaTeX math auto-rendering
  if (window.renderMathInElement) {
    setTimeout(() => {
      renderMathInElement(grid, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ],
        throwOnError: false
      });
    }, 20);
  }
}

function copyFormulaText(formula) {
  navigator.clipboard.writeText(formula).then(() => {
    showNotification("Formula copied to clipboard!");
  }).catch(() => {
    showNotification("Failed to copy formula.");
  });
}

function setupFormulaVaultListeners() {
  const searchInput = document.getElementById("vault-search-input");
  const subjSelect = document.getElementById("vault-filter-subject");
  const classSelect = document.getElementById("vault-filter-class");

  [searchInput, subjSelect, classSelect].forEach(el => {
    if (el) {
      el.addEventListener("input", renderFormulaVault);
      el.addEventListener("change", renderFormulaVault);
    }
  });
}

// =============================================================================
// SUBVIEW 6: DEEP-WORK FOCUS STATION
// =============================================================================

function updateDeepWorkTargetDropdown() {
  const select = document.getElementById("deep-target-select");
  if (!select) return;

  if (academicTasks.length === 0) {
    select.innerHTML = `<option value="">No enlisted modules available</option>`;
    return;
  }

  select.innerHTML = academicTasks.map(t => {
    return `<option value="${t.id}">[${t.subject} ${t.classLevel}] ${escapeHtml(t.title)} (Stage R${t.stage})</option>`;
  }).join("");
}

function setupDeepWorkStation() {
  const clockDisplay = document.getElementById("deep-clock-display");
  const btnStart = document.getElementById("btn-deep-start");
  const btnPause = document.getElementById("btn-deep-pause");
  const btnReset = document.getElementById("btn-deep-reset");
  const presetButtons = document.querySelectorAll(".deep-btn-preset");
  const soundChips = document.querySelectorAll(".deep-sound-chip");

  function updateClockDisplay() {
    const mins = Math.floor(deepWorkTimer.seconds / 60);
    const secs = deepWorkTimer.seconds % 60;
    if (clockDisplay) {
      clockDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }

  presetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (deepWorkTimer.isRunning) return;
      presetButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const mins = parseInt(btn.getAttribute("data-minutes"), 10) || 50;
      deepWorkTimer.seconds = mins * 60;
      deepWorkTimer.initialSeconds = mins * 60;
      updateClockDisplay();
    });
  });

  if (btnStart) {
    btnStart.addEventListener("click", () => {
      if (deepWorkTimer.isRunning) return;
      deepWorkTimer.isRunning = true;
      btnStart.classList.add("hidden");
      if (btnPause) btnPause.classList.remove("hidden");

      deepWorkTimer.intervalId = setInterval(() => {
        if (deepWorkTimer.seconds > 0) {
          deepWorkTimer.seconds--;
          updateClockDisplay();
        } else {
          // Timer finished
          clearInterval(deepWorkTimer.intervalId);
          deepWorkTimer.isRunning = false;
          btnStart.classList.remove("hidden");
          if (btnPause) btnPause.classList.add("hidden");

          // Play finish chime
          playTone(523.25, 0.3);
          setTimeout(() => playTone(659.25, 0.4), 250);
          setTimeout(() => playTone(783.99, 0.6), 500);

          logCompletedSession();
          showNotification("🎯 Deep Work Block Complete! Outstanding focus.");
        }
      }, 1000);
    });
  }

  if (btnPause) {
    btnPause.addEventListener("click", () => {
      if (!deepWorkTimer.isRunning) return;
      clearInterval(deepWorkTimer.intervalId);
      deepWorkTimer.isRunning = false;
      btnPause.classList.add("hidden");
      if (btnStart) btnStart.classList.remove("hidden");
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      clearInterval(deepWorkTimer.intervalId);
      deepWorkTimer.isRunning = false;
      deepWorkTimer.seconds = deepWorkTimer.initialSeconds;
      updateClockDisplay();
      if (btnPause) btnPause.classList.add("hidden");
      if (btnStart) btnStart.classList.remove("hidden");
    });
  }

  // Sound chips selector for deep work
  soundChips.forEach(chip => {
    chip.addEventListener("click", () => {
      soundChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const soundType = chip.getAttribute("data-deep-sound");
      if (typeof playSoundscape === "function") {
        playSoundscape(soundType);
      }
    });
  });

  updateClockDisplay();
}

function logCompletedSession() {
  const targetSelect = document.getElementById("deep-target-select");
  const targetId = targetSelect ? targetSelect.value : null;
  const targetTask = academicTasks.find(t => t.id === targetId);

  const durationMins = Math.round(deepWorkTimer.initialSeconds / 60);
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const logList = document.getElementById("deep-log-list");
  if (logList) {
    const item = document.createElement("div");
    item.className = "deep-log-item";
    item.innerHTML = `
      <div>
        <strong>${durationMins}m Block:</strong> ${targetTask ? escapeHtml(targetTask.title.substring(0, 30)) + '...' : 'General NCERT Study'}
      </div>
      <span style="color: #60a5fa; font-family: var(--mono); font-size: .75rem;">${timeString}</span>
    `;
    // If first item was placeholder, remove it
    if (logList.children.length === 1 && logList.children[0].textContent.includes("No sessions completed")) {
      logList.innerHTML = "";
    }
    logList.prepend(item);
  }

  // Update total hours stat
  const hoursStat = document.getElementById("acad-stat-hours");
  if (hoursStat) {
    const prevHours = parseFloat(hoursStat.textContent) || 0;
    const newHours = (prevHours + durationMins / 60).toFixed(1);
    hoursStat.textContent = `${newHours}h`;
  }
}

// Setup Modal for Enlisting Custom Syllabus Unit
function setupAcademicEnlistModal() {
  const form = document.getElementById("form-enlist-task");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = document.getElementById("enlist-subject").value;
    const classLevel = document.getElementById("enlist-class").value;
    const targetExam = document.getElementById("enlist-target").value;
    const title = document.getElementById("enlist-title").value.trim();
    const dateVal = document.getElementById("enlist-date").value;
    const priority = document.getElementById("enlist-priority").value;
    const notes = document.getElementById("enlist-notes").value.trim();

    if (!title || !dateVal) return;

    const initialDate = new Date(dateVal);
    const nextDue = new Date(initialDate.getTime() + 1 * 86400000); // R0 -> R1 in 1 day

    const newTask = {
      id: "acad_task_" + Date.now(),
      subject,
      classLevel,
      targetExam,
      title,
      initialDate: dateVal,
      stage: 0,
      lastRevised: dateVal,
      nextDue: nextDue.toISOString().split('T')[0],
      priority,
      notes: notes || undefined
    };

    academicTasks.unshift(newTask);
    saveAcademicTasks();
    renderAcademicTaskforce();
    updateDeepWorkTargetDropdown();

    form.reset();
    closeModal("modal-enlist-task");
    showNotification(`📋 Enlisted "${title.substring(0, 30)}..." into Revision Taskforce!`);
  });

  // Set default initial date to today
  const dateInput = document.getElementById("enlist-date");
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }
}


// =============================================================================
// IN-WEBSITE DIGITAL NCERT READER & COMPLETE EXAM PREPARATION ENGINE
// Complete Textbook Chapters, Solved Examples, Exercises & Exam Materials
// =============================================================================

let readerStationState = {
  activeSubject: "Chemistry",
  activeClass: "12",
  activeChapterId: "ncert_c12_ch01",
  activeView: "theory", // 'theory' | 'intext' | 'exercises' | 'examprep' | 'formulas'
  fontSize: 17,
  theme: "dark"
};

// Comprehensive In-Depth Chapter Preparation Data
const DEEP_CHAPTER_PREPARATION_DATA = {
  "ncert_c12_ch01": {
    id: "ncert_c12_ch01",
    code: "lech101",
    classLevel: "12",
    subject: "Chemistry",
    title: "Solutions (Liquid & Solid)",
    curriculum: "Class 12 NCERT Rationalised Syllabus • Unit 1 • Weightage: 7 Marks CBSE, 2-3 Qs NEET/JEE",
    theorySections: [
      {
        heading: "1.1 Types of Solutions & Expressing Concentration",
        text: "<p>Solutions are homogeneous mixtures of two or more chemically non-reacting substances whose composition can be varied within certain limits. In a binary solution, the component present in the largest amount is called the <strong>solvent</strong>, and the other component is known as the <strong>solute</strong>.</p><p>Concentration expressions are classified into temperature-independent units (Mass percentage % w/w, Mole fraction x, Molality m) and temperature-dependent units (Molarity M, Volume percentage % v/v). Because mass does not change with temperature, <strong>molality is preferred over molarity</strong> in thermodynamic and colligative property calculations.</p>",
        definition: "<strong>Molality (m):</strong> The number of moles of solute dissolved in 1 kilogram (1000 grams) of solvent. Unit: mol/kg or m.",
        math: "m = \\frac{\\text{Moles of solute (}n_2\\text{)}}{\\text{Mass of solvent in kg (}w_1\\text{)}} = \\frac{w_2 \\times 1000}{M_2 \\times w_1}"
      },
      {
        heading: "1.2 Solubility of Gases & Henry's Law",
        text: "<p>The solubility of a gas in a liquid depends upon the nature of the gas and solvent, temperature, and pressure. The dissolution of a gas in a liquid is an exothermic process (Gas + Solvent ⇌ Solution + Heat). According to Le Chatelier's principle, <strong>solubility of gas decreases with increasing temperature</strong>. This explains why aquatic organisms are more comfortable in cold water than in warm water.</p>",
        definition: "<strong>Henry's Law:</strong> At constant temperature, the solubility of a gas in a liquid is directly proportional to the partial pressure of the gas present above the surface of the liquid or solution. In terms of mole fraction: p = KH · x, where KH is Henry's law constant.",
        math: "p = K_H \\cdot x \\quad \\text{where higher } K_H \\implies \\text{lower solubility at same pressure}"
      },
      {
        heading: "1.3 Vapour Pressure of Liquid Solutions & Raoult's Law",
        text: "<p>Vapour pressure of a liquid is the pressure exerted by vapours in dynamic equilibrium with the liquid at a given temperature. For a solution of volatile liquids, Raoult's Law states that the partial vapour pressure of each volatile component is equal to the product of its mole fraction in solution and the vapour pressure of the pure component.</p><p>Solutions that obey Raoult's law over the entire range of concentration are <strong>Ideal Solutions</strong> (ΔH_mix = 0, ΔV_mix = 0, e.g. n-hexane + n-heptane, benzene + toluene). Non-ideal solutions show positive deviations (A-B interactions weaker than A-A and B-B, e.g. ethanol + acetone) or negative deviations (A-B interactions stronger due to H-bonding, e.g. chloroform + acetone).</p>",
        definition: "<strong>Azeotropes:</strong> Binary mixtures having the same composition in liquid and vapour phase and boil at a constant temperature without fractional distillation.",
        math: "p_A = x_A p_A^\\circ, \\quad p_B = x_B p_B^\\circ, \\quad P_{\\text{total}} = p_A + p_B = p_A^\\circ + x_B(p_B^\\circ - p_A^\\circ)"
      },
      {
        heading: "1.4 Colligative Properties & Van 't Hoff Factor",
        text: "<p>Colligative properties depend strictly on the <strong>total number of solute particles</strong> in solution, regardless of their chemical nature. The four primary colligative properties are: (1) Relative Lowering of Vapour Pressure, (2) Elevation of Boiling Point, (3) Depression of Freezing Point, and (4) Osmotic Pressure.</p><p>For solutes that undergo dissociation (electrolytes) or association in solution, abnormal molecular masses are observed. The <strong>Van 't Hoff factor (i)</strong> accounts for this deviation.</p>",
        definition: "<strong>Van 't Hoff Factor (i):</strong> Ratio of normal molar mass to observed (experimental) molar mass, or ratio of total moles of particles after association/dissociation to moles of particles before.",
        math: "\\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\Pi = i C R T = i \\left(\\frac{n_2}{V}\\right) R T"
      }
    ],
    intextExamples: [
      {
        num: "NCERT Example 1.4",
        question: "18 g of glucose, C6H12O6, is dissolved in 1 kg of water in a saucepan. At what temperature will water boil at 1.013 bar? (Kb for water is 0.52 K kg/mol, normal boiling point of pure water = 373.15 K).",
        solution: "<strong>Step 1:</strong> Moles of glucose n2 = 18 g / 180 g·mol⁻¹ = 0.1 mol.<br><strong>Step 2:</strong> Mass of solvent water = 1 kg. Molality m = 0.1 mol / 1 kg = 0.1 m.<br><strong>Step 3:</strong> Elevation of boiling point: ΔTb = Kb · m = 0.52 K kg·mol⁻¹ × 0.1 mol·kg⁻¹ = 0.052 K.<br><strong>Step 4:</strong> Boiling point of solution: Tb = T°b + ΔTb = 373.15 K + 0.052 K = <strong>373.202 K (or 100.052 °C)</strong>."
      },
      {
        num: "NCERT Example 1.6",
        question: "45 g of ethylene glycol (C2H6O2) is mixed with 600 g of water. Calculate (a) the freezing point depression, and (b) the freezing point of the solution. (Kf for water = 1.86 K kg/mol).",
        solution: "<strong>Step 1:</strong> Molar mass of C2H6O2 = (2×12) + (6×1) + (2×16) = 62 g/mol.<br><strong>Step 2:</strong> Moles of glycol = 45 / 62 = 0.726 mol.<br><strong>Step 3:</strong> Mass of water in kg = 600 / 1000 = 0.6 kg. Molality m = 0.726 / 0.6 = 1.21 mol/kg.<br><strong>Step 4:</strong> ΔTf = Kf · m = 1.86 K kg/mol × 1.21 mol/kg = 2.25 K.<br><strong>Step 5:</strong> Freezing point Tf = 273.15 K - 2.25 K = <strong>270.90 K (-2.25 °C)</strong>."
      }
    ],
    goldenLines: [
      "NCERT Golden Line 1: 'Higher the value of KH at a given pressure, lower is the solubility of the gas in liquid. KH values increase with increase of temperature indicating that solubility of gases decreases with increase of temperature.' (NEET 2021)",
      "NCERT Golden Line 2: 'A solution of chloroform and acetone shows negative deviation from Raoult's law because chloroform molecule is able to form hydrogen bond with acetone molecule (Cl3C-H···O=C(CH3)2).'",
      "NCERT Golden Line 3: 'Osmotic pressure method is widely preferred for determining molar masses of proteins, polymers and other macromolecules because measurements are around room temperature and molarity is used instead of molality.' (CBSE Board 2-Marker)"
    ],
    exerciseSolutions: [
      {
        qNum: "Exercise Question 1.8",
        question: "An antifreeze solution is prepared from 222.6 g of ethylene glycol (C2H6O2) and 200 g of water. Calculate the molality of the solution. If the density of the solution is 1.072 g/mL, then what shall be the molarity of the solution?",
        solution: "<strong>Part (a) Molality:</strong><br>Moles of glycol = 222.6 / 62 = 3.59 mol.<br>Mass of solvent water = 200 g = 0.2 kg.<br>Molality m = 3.59 / 0.2 = <strong>17.95 mol/kg</strong>.<br><br><strong>Part (b) Molarity:</strong><br>Total mass of solution = 222.6 + 200 = 422.6 g.<br>Volume of solution = Mass / Density = 422.6 g / 1.072 g·mL⁻¹ = 394.2 mL = 0.3942 L.<br>Molarity M = 3.59 mol / 0.3942 L = <strong>9.11 mol/L (M)</strong>.<br><em>Marking Scheme: 1.5 Marks for Molality + 1.5 Marks for Molarity. Total: 3 Marks.</em>"
      },
      {
        qNum: "Exercise Question 1.15",
        question: "An aqueous solution of 2% non-volatile solute exerts a pressure of 1.004 bar at the normal boiling point of water. What is the molar mass of the solute?",
        solution: "<strong>Step 1:</strong> At normal boiling point of water (100°C), vapour pressure of pure water p1° = 1 atm = 1.013 bar.<br>Vapour pressure of solution p1 = 1.004 bar.<br><strong>Step 2:</strong> Relative lowering of vapour pressure: (p1° - p1) / p1° = (w2 / M2) / (w1 / M1) for dilute solution.<br>(1.013 - 1.004) / 1.013 = (2 / M2) / (98 / 18).<br>0.009 / 1.013 = (2 × 18) / (98 × M2) = 36 / (98 M2).<br>M2 = (36 × 1.013) / (98 × 0.009) = 36.468 / 0.882 = <strong>41.35 g/mol</strong>."
      }
    ],
    pyqs: [
      {
        exam: "NEET-UG 2023",
        q: "Which of the following aqueous solutions should have the highest boiling point?",
        opts: ["A. 1.0 M NaOH", "B. 1.0 M Na2SO4", "C. 1.0 M NH4NO3", "D. 1.0 M KNO3"],
        ans: "B. 1.0 M Na2SO4",
        expl: "Elevation in boiling point ΔTb = i × Kb × m. Na2SO4 dissociates into 2 Na⁺ + SO4²⁻, giving i = 3. Total effective particle concentration = 3 × 1.0 = 3.0 M, which is higher than NaOH (i=2, 2.0 M), NH4NO3 (i=2, 2.0 M), and KNO3 (i=2, 2.0 M)."
      },
      {
        exam: "JEE Main 2024",
        q: "A non-volatile solute X dissociates completely in water as X ➔ A²⁺ + 2B⁻. If 0.1 mol of X is dissolved in 1 kg water, the elevation in boiling point is (Kb = 0.52 K kg/mol):",
        opts: ["A. 0.052 K", "B. 0.104 K", "C. 0.156 K", "D. 0.208 K"],
        ans: "C. 0.156 K",
        expl: "X dissociates into 1 A²⁺ and 2 B⁻, so number of ions n = 3. Since dissociation is complete, i = 3. ΔTb = i × Kb × m = 3 × 0.52 × 0.1 = 0.156 K."
      }
    ],
    formulaMap: [
      "Mass % = (Mass of Solute / Total Mass of Solution) × 100",
      "Mole fraction xA = nA / (nA + nB), where xA + xB = 1",
      "Henry's Law: p = KH · x (KH depends on gas and temperature)",
      "Raoult's Law (Volatile): pA = xA pA°, pB = xB pB°, P_total = pA + pB",
      "Relative Lowering of Vapour Pressure: (p1° - p1) / p1° = i · x2",
      "Elevation in Boiling Point: ΔTb = i · Kb · m, where Kb = R · M1 · (Tb°)² / (1000 · ΔvapH)",
      "Depression in Freezing Point: ΔTf = i · Kf · m, where Kf = R · M1 · (Tf°)² / (1000 · ΔfusH)",
      "Osmotic Pressure: Π = i · C · R · T",
      "Degree of Dissociation: α = (i - 1) / (n - 1); Degree of Association: α = (1 - i) / (1 - 1/n)"
    ]
  },

  "ncert_b12_ch06": {
    id: "ncert_b12_ch06",
    code: "lebo106",
    classLevel: "12",
    subject: "Biology",
    title: "Molecular Basis of Inheritance",
    curriculum: "Class 12 NCERT Biology • Unit 7 • Weightage: 8-10 Questions in NEET (32-40 Marks), 7 Marks CBSE",
    theorySections: [
      {
        heading: "6.1 Structure of DNA & Packaging of DNA Helix",
        text: "<p>DNA is a long polymer of deoxyribonucleotides. A nucleotide consists of a nitrogenous base (Adenine, Guanine, Cytosine, Thymine), a pentose sugar (2'-deoxyribose), and a phosphate group. Two nucleotides are linked through <strong>3'-5' phosphodiester linkage</strong> to form a dinucleotide.</p><p>James Watson and Francis Crick (1953) proposed the Double Helix model based on X-ray diffraction data produced by Maurice Wilkins and Rosalind Franklin. The two chains have antiparallel polarity (5'➔3' and 3'➔5'). The pitch of the helix is 3.4 nm with roughly 10 bp per turn (distance between base pairs = 0.34 nm).</p>",
        definition: "<strong>Nucleosome:</strong> The basic repeating unit of chromatin packaging in eukaryotes, consisting of ~200 bp of DNA helix wrapped around an octamer of positively charged, basic histone proteins (H2A, H2B, H3, H4 pairs) sealed by H1 histone.",
        math: "\\text{Total DNA length in human cell} = 6.6 \\times 10^9 \\text{ bp} \\times 0.34 \\times 10^{-9} \\text{ m/bp} \\approx 2.2 \\text{ metres}"
      },
      {
        heading: "6.2 The Search for Genetic Material & Meselson-Stahl Experiment",
        text: "<p>Frederick Griffith (1928) conducted transformation experiments with <em>Streptococcus pneumoniae</em>. Avery, MacLeod, and McCarty (1944) discovered that DNA, not protein or RNA, was the transforming principle using DNase, RNase, and Protease digestion. Hershey and Chase (1952) provided unequivocal proof using radioactive ³⁵S (labels protein coat) and ³²P (labels DNA core) in T2 bacteriophage.</p><p>Matthew Meselson and Franklin Stahl (1958) proved semiconservative replication in <em>E. coli</em> by growing cells in ¹⁵NH₄Cl, then transferring them to ¹⁴NH₄Cl. Density gradient centrifugation in Cesium Chloride (CsCl) demonstrated that generation 1 (20 mins) produced 100% intermediate density hybrid DNA (¹⁵N-¹⁴N), and generation 2 (40 mins) produced 50% hybrid and 50% light DNA (¹⁴N-¹⁴N).</p>",
        definition: "<strong>Semiconservative Replication:</strong> During DNA duplication, the two parental strands separate and each serves as a template for synthesis of a complementary new strand, resulting in hybrid daughter molecules with one parental and one nascent strand.",
        math: "\\text{After } n \\text{ generations}: 2 \\text{ hybrid molecules (}^{15}\\text{N-}^{14}\\text{N}) \\text{ and } (2^n - 2) \\text{ light molecules (}^{14}\\text{N-}^{14}\\text{N})"
      },
      {
        heading: "6.3 Transcription & The Genetic Code",
        text: "<p>Transcription is the process of copying genetic information from one strand of DNA into RNA. It involves three regions in a transcription unit: a <strong>Promoter</strong>, the <strong>Structural gene</strong>, and a <strong>Terminator</strong>. Only the template strand (3'➔5') is copied into RNA by RNA polymerase. In eukaryotes, primary transcripts (hnRNA) undergo 5'-capping with methylguanosine triphosphate, 3'-polyadenylation (poly-A tail of 200-300 adenylate residues), and RNA splicing to remove non-coding introns.</p><p>George Gamow postulated that a triplet codon must code for 20 amino acids (4³ = 64 codons). Marshall Nirenberg, Severo Ochoa, and Har Gobind Khorana chemically cracked the genetic code. 61 codons code for amino acids; 3 codons (UAA, UAG, UGA) are stop/nonsense codons. AUG has dual functions: codes for Methionine and acts as initiator codon.</p>",
        definition: "<strong>Degeneracy of Genetic Code:</strong> The property where most amino acids are specified by more than one codon (e.g. Leucine, Serine, and Arginine are each coded by 6 codons).",
        math: "64 \\text{ Triplet Codons}: 61 \\text{ Sense Codons} + 3 \\text{ Stop Codons (UAA, UAG, UGA)}"
      },
      {
        heading: "6.4 Regulation of Gene Expression: The Lac Operon",
        text: "<p>Francois Jacob and Jacques Monod elucidated the lactose operon in <em>E. coli</em>. The operon consists of a regulatory gene (i gene) and three structural genes (z, y, a). The i gene encodes the repressor protein. In the absence of inducer, repressor binds the operator (O) and blocks RNA polymerase.</p><p>When lactose (or allolactose) is added, it binds to the repressor protein, altering its conformation so it cannot bind the operator. RNA polymerase accesses the promoter and transcribes polycistronic mRNA, expressing β-galactosidase, permease, and transacetylase. This is an example of <strong>negative inducible regulation</strong>.</p>",
        definition: "<strong>Polycistronic mRNA:</strong> A single continuous mRNA molecule in prokaryotes that carries genetic information for the translation of multiple distinct protein products.",
        math: "\\text{Lac Operon Unit}: P_i - i - P_{lac} - O - z - y - a"
      }
    ],
    intextExamples: [
      {
        num: "NCERT Concept Drill 6.1",
        question: "If a double stranded DNA has 20% of cytosine, calculate the percentage of adenine in the DNA.",
        solution: "<strong>Step 1:</strong> Apply Chargaff's rule: [G] = [C] and [A] = [T].<br><strong>Step 2:</strong> Since [C] = 20%, then [G] = 20%. Total [G] + [C] = 40%.<br><strong>Step 3:</strong> The remaining 60% must be [A] + [T].<br><strong>Step 4:</strong> Since [A] = [T], percentage of Adenine = 60% / 2 = <strong>30%</strong>."
      }
    ],
    goldenLines: [
      "NCERT Golden Line 1: 'DNA as an acidic substance present in nucleus was first identified by Friedrich Miescher in 1869. He named it as 'Nuclein'.' (NEET 2020)",
      "NCERT Golden Line 2: 'RNA is catalytic and labile: RNA was the first genetic material. Essential life processes (such as metabolism, translation, splicing) evolved around RNA. DNA has evolved from RNA with chemical modifications that make it more stable.'",
      "NCERT Golden Line 3: 'A typical mammalian cell has 6.6 × 10⁹ bp of DNA. The length of this DNA is approximately 2.2 metres, whereas the dimension of a typical nucleus is only about 10⁻⁶ m.' (NEET 2022)"
    ],
    exerciseSolutions: [
      {
        qNum: "Exercise Question 6.3",
        question: "Why is the Human Genome Project called a megaproject?",
        solution: "HGP was termed a megaproject because: (1) <strong>Immense Scope:</strong> Human genome has 3.3 × 10⁹ bp. Sequencing cost was estimated at $3 per bp, requiring roughly $9 billion USD. (2) <strong>Massive Data:</strong> Typing data in books of 1000 pages with 1000 letters per page would require 3,300 such volumes for a single human cell. (3) <strong>Global Interdisciplinary Effort:</strong> Coordinated by US Department of Energy, NIH, Wellcome Trust UK, Japan, France, Germany and China, leading to the birth of <em>Bioinformatics</em>."
      }
    ],
    pyqs: [
      {
        exam: "NEET-UG 2023",
        q: "In E. coli, the lac operon gets switched on when lactose is present because:",
        opts: [
          "A. Lactose binds to RNA polymerase",
          "B. Allolactose binds to the repressor protein, inactivating it",
          "C. Repressor protein binds to the operator region",
          "D. Lactose directly activates the promoter region"
        ],
        ans: "B. Allolactose binds to the repressor protein, inactivating it",
        expl: "Allolactose acts as the physiological inducer. It binds the allosteric site of the active repressor synthesized by the i gene, causing conformational change that prevents it from binding the operator region."
      }
    ],
    formulaMap: [
      "Chargaff's Rule: [A] = [T], [G] = [C]; [A + G] = [T + C] (Purines = Pyrimidines)",
      "DNA Length = Number of bp × 0.34 nm = Number of bp × 0.34 × 10⁻⁹ m",
      "Nucleosome: 200 bp wrapped around Histone Octamer (H2A, H2B, H3, H4)₂",
      "Central Dogma: DNA ➔ [Transcription] ➔ RNA ➔ [Translation] ➔ Protein",
      "Genetic Code: 64 Codons (61 Sense + 3 Stop: UAA, UAG, UGA)",
      "Lac Operon: z (β-galactosidase), y (permease), a (transacetylase)"
    ]
  },

  "ncert_e12_fl01": {
    id: "ncert_e12_fl01",
    code: "lefl101",
    classLevel: "12",
    subject: "English",
    title: "The Last Lesson (Alphonse Daudet)",
    curriculum: "Class 12 NCERT English Core • Flamingo Prose Chapter 1 • CBSE Board Weightage: 5-8 Marks",
    theorySections: [
      {
        heading: "1. Historical Background & The Setting",
        text: "<p>Set in 1870 during the Franco-Prussian War, in which France was defeated by Prussia led by Otto von Bismarck. The French districts of Alsace and Lorraine fell under Prussian occupation. The Prussian authorities issued a decree from Berlin ordering that only German be taught in the schools of Alsace and Lorraine, abruptly displacing the French language.</p>",
        definition: "<strong>Linguistic Chauvinism:</strong> An irrational, aggressive belief in the superiority of one's own language, accompanied by the forceful suppression of other languages.",
        math: "\\text{Alsace & Lorraine} \\xrightarrow{\\text{Prussian Annexation}} \\text{Ban on French} \\xrightarrow{\\text{Cultural Dispossession}}"
      },
      {
        heading: "2. Franz's Dilemma & The Morning of the Lesson",
        text: "<p>Little Franz is late for school and dreads a scolding from his schoolmaster, M. Hamel, who had announced a test on French participles—a topic Franz knows nothing about. The warm, sunny morning, the chirping birds, and the Prussian soldiers drilling in the open meadow tempt him to play truant. However, he resists temptation and hurries past the town hall bulletin board, where all bad news had been posted for two years.</p>",
        definition: "<strong>Internal Conflict:</strong> The contrast between adolescent indolence and the unconscious pull of duty.",
        math: "\\text{Franz's Mindset}: \\text{Dread of Scolding} \\to \\text{Temptation of Nature} \\to \\text{Urge to Escape}"
      },
      {
        heading: "3. The Transformation in the Classroom",
        text: "<p>Instead of the typical noisy chaos, the classroom is bathed in a solemn, Sunday-like stillness. M. Hamel wears his finest ceremonial dress—a green coat, frilled shirt, and embroidered black silk cap. Village elders sit quietly on the back benches. M. Hamel announces gently from his chair: <em>'My children, this is the last lesson I shall give you. The order has come from Berlin...'</em></p><p>Franz experiences an overwhelming wave of remorse. His French grammar and history books, which felt like a nuisance moments ago, now feel like old friends he cannot abandon.</p>",
        definition: "<strong>Epiphany:</strong> The sudden, profound realization of the value of something only after it is permanently lost.",
        math: "\\text{Procrastination ('I have plenty of time')} \\xrightarrow{\\text{Berlin Order}} \\text{Irreversible Regret}"
      },
      {
        heading: "4. M. Hamel's Patriotic Discourse & Conclusion",
        text: "<p>M. Hamel blames neither Franz alone nor the parents (who preferred sending children to mills for extra sous), but also himself for sending students on errands. He eulogizes French as <strong>the most beautiful, clearest, and most logical language in the world</strong>, urging his people to guard it. At noon, the church clock strikes twelve and Prussian trumpets sound. Choked with emotion, M. Hamel turns to the blackboard and writes in giant letters: <strong>'VIVE LA FRANCE!'</strong></p>",
        definition: "<strong>Cultural Resistance:</strong> Using mother tongue as a spiritual key to break mental enslavement.",
        math: "\\text{When people are enslaved} \\iff \\text{Holding fast to language} = \\text{Key to their prison}"
      }
    ],
    intextExamples: [
      {
        num: "CBSE Character Sketch Drill",
        question: "Discuss the character of M. Hamel as depicted in 'The Last Lesson'.",
        solution: "<strong>1. Strict Disciplinarian:</strong> Initially feared for his iron ruler and stern temper.<br><strong>2. Devoted Educator:</strong> Served the school for forty uninterrupted years with unshakeable fidelity.<br><strong>3. Honest Self-Examiner:</strong> Admitted his own flaws in sending children to water his garden or giving holidays when he went fishing.<br><strong>4. Ardent Patriot:</strong> Held French in supreme esteem and instilled pride in his community during their darkest hour of conquest."
      }
    ],
    goldenLines: [
      "NCERT Golden Line 1: 'When a people are enslaved, as long as they hold fast to their language it is as if they had the key to their prison.' (M. Hamel)",
      "NCERT Golden Line 2: 'Will they make them sing in German, even the pigeons?' (Franz's profound childlike critique of totalitarian imperialism).",
      "NCERT Golden Line 3: 'M. Hamel stood up, very pale, in his chair. I never saw him look so tall... He turned to the blackboard, took a piece of chalk, and bearing on with all his might, he wrote as large as he could: VIVE LA FRANCE!'"
    ],
    exerciseSolutions: [
      {
        qNum: "Exercise Question 1",
        question: "What was Franz expected to be prepared with for school that day?",
        solution: "Franz was expected to be prepared with rules on <strong>participles</strong>. M. Hamel had announced he would question the class on this grammatical topic, but Franz did not know even the first word about them."
      },
      {
        qNum: "Exercise Question 2",
        question: "What did Franz notice that was unusual about the school that day?",
        solution: "Unusual aspects included: (1) Absence of morning clamour—it was as quiet as Sunday. (2) Classmates were already seated at their desks. (3) M. Hamel walked with his ruler under his arm without anger and wore ceremonial clothes. (4) Village elders (Hauser, former mayor, postmaster) were seated silently on the back benches holding old primers."
      }
    ],
    pyqs: [
      {
        exam: "CBSE Board 2023",
        q: "Why did Hauser and the other villagers attend the school on the day of the last lesson?",
        opts: [
          "A. To congratulate M. Hamel on his retirement",
          "B. To complain about the new German orders",
          "C. To pay respect to M. Hamel's 40 years of service and show solidarity with their mother tongue",
          "D. To learn German grammar"
        ],
        ans: "C. To pay respect to M. Hamel's 40 years of service and show solidarity with their mother tongue",
        expl: "The village elders were repentant for not attending school more in their youth. Their presence on the back benches was an act of gratitude and patriotic defiance."
      }
    ],
    formulaMap: [
      "Setting: Alsace-Lorraine, 1870 Franco-Prussian War",
      "Major Themes: Linguistic Imperialism, Procrastination, Loss of Cultural Identity",
      "Key Symbols: Prussian Drills (Dominance), Bulletin Board (Calamity), Pigeons (Freedom), Blackboard 'Vive La France' (Resistance)"
    ]
  }
};

// Master Function to Render the In-Website Digital NCERT Reader
function renderNCERTReaderStation() {
  renderReaderSidebar();
  renderReaderStageContent();
}

function renderReaderSidebar() {
  const chList = document.getElementById("station-chapter-list");
  if (!chList) return;

  const currentSubj = readerStationState.activeSubject;
  const currentClass = readerStationState.activeClass;
  const searchVal = (document.getElementById("station-ch-search")?.value || "").toLowerCase().trim();

  // Filter NCERT_EBOOKS_CATALOG
  const matchedBooks = NCERT_EBOOKS_CATALOG.filter(b => {
    if (b.subject !== currentSubj) return false;
    if (b.classLevel !== currentClass) return false;
    if (searchVal) {
      const matchStr = `${b.title} ${b.chNumber} ${b.code} ${b.topics}`.toLowerCase();
      if (!matchStr.includes(searchVal)) return false;
    }
    return true;
  });

  if (matchedBooks.length === 0) {
    chList.innerHTML = `<div style="padding: 1rem; text-align: center; color: var(--hub-muted); font-size: .8rem;">No chapters found.</div>`;
    return;
  }

  // If current active chapter is not in this filtered list, switch to first
  const exists = matchedBooks.some(b => b.id === readerStationState.activeChapterId);
  if (!exists) {
    readerStationState.activeChapterId = matchedBooks[0].id;
  }

  chList.innerHTML = matchedBooks.map((b, idx) => {
    const isActive = b.id === readerStationState.activeChapterId;
    return `
      <div class="reader-ch-item ${isActive ? 'active' : ''}" onclick="selectReaderChapter('${b.id}')">
        <span class="reader-ch-num">${String(idx + 1).padStart(2, '0')}</span>
        <div class="reader-ch-meta">
          <h5 class="reader-ch-title">${escapeHtml(b.title)}</h5>
          <div class="reader-ch-code">${b.code} • ${b.chNumber}</div>
        </div>
      </div>
    `;
  }).join("");
}

function selectReaderChapter(chId) {
  readerStationState.activeChapterId = chId;
  renderReaderSidebar();
  renderReaderStageContent();
}

function renderReaderStageContent() {
  const titleEl = document.getElementById("station-active-title");
  const codeBadge = document.getElementById("station-badge-code");
  const pane = document.getElementById("station-reading-pane");
  if (!pane) return;

  const chId = readerStationState.activeChapterId;
  // Check deep prep data or fallback to catalog
  const deepData = DEEP_CHAPTER_PREPARATION_DATA[chId];
  const catalogData = NCERT_EBOOKS_CATALOG.find(b => b.id === chId) || NCERT_EBOOKS_CATALOG[0];

  const bookTitle = deepData ? deepData.title : catalogData.title;
  const bookCode = deepData ? deepData.code : catalogData.code;

  if (titleEl) titleEl.textContent = bookTitle;
  if (codeBadge) codeBadge.textContent = bookCode;

  // Render view depending on readerStationState.activeView
  const currentView = readerStationState.activeView;
  let html = "";

  // Common Header Hero
  html += `
    <div class="reader-ch-header-banner">
      <div class="reader-official-badge">
        <span>🏛️ NCERT Official Curriculum • ${catalogData.subject} • Class ${catalogData.classLevel}</span>
      </div>
      <h1 class="reader-main-heading">${escapeHtml(bookTitle)}</h1>
      <p class="reader-curriculum-sub">
        ${deepData ? deepData.curriculum : catalogData.topics}
      </p>
    </div>
  `;

  if (currentView === "theory") {
    if (deepData && deepData.theorySections) {
      deepData.theorySections.forEach(sec => {
        html += `
          <h2 class="reader-section-header">${escapeHtml(sec.heading)}</h2>
          <div class="reader-para">${sec.text}</div>
          ${sec.definition ? `<div class="ncert-def-box">${sec.definition}</div>` : ''}
          ${sec.math ? `<div class="ncert-math-block">$$${sec.math}$$</div>` : ''}
        `;
      });
    } else {
      // Fallback to catalog data with rich generated formatting
      html += `
        <h2 class="reader-section-header">1. Official Chapter Synopsis &amp; Foundations</h2>
        <div class="reader-para">${escapeHtml(catalogData.synopsis)}</div>
        <div class="ncert-def-box">
          <strong>Key Topic Mastery:</strong> ${escapeHtml(catalogData.topics)}
        </div>
      `;
    }

    // Golden Lines always included in theory
    const goldenList = (deepData && deepData.goldenLines) || catalogData.goldenLines || [];
    if (goldenList.length > 0) {
      html += `
        <h2 class="reader-section-header" style="color: #fbbf24; margin-top: 2.5rem;">
          🌟 NCERT Golden Lines (Direct NEET/JEE &amp; Board Triggers)
        </h2>
      `;
      goldenList.forEach(gl => {
        html += `<div class="ncert-golden-box">${gl}</div>`;
      });
    }

  } else if (currentView === "intext") {
    html += `<h2 class="reader-section-header">🔍 In-Text Conceptual Questions &amp; Worked Examples</h2>`;
    const examples = (deepData && deepData.intextExamples) || [];
    if (examples.length > 0) {
      examples.forEach(ex => {
        html += `
          <div class="ncert-worked-example">
            <div class="example-badge">${escapeHtml(ex.num)}</div>
            <div class="example-q">${escapeHtml(ex.question)}</div>
            <div class="example-sol">${ex.solution}</div>
          </div>
        `;
      });
    }
    const intextQs = (catalogData.intextQuestions) || [];
    intextQs.forEach(q => {
      html += `
        <div class="ncert-def-box" style="margin-bottom: 1rem;">
          ${escapeHtml(q)}
        </div>
      `;
    });

  } else if (currentView === "exercises") {
    html += `<h2 class="reader-section-header">💡 Complete NCERT End-of-Chapter Exercise Solutions</h2>`;
    const exercises = (deepData && deepData.exerciseSolutions) || [];
    if (exercises.length > 0) {
      exercises.forEach(ex => {
        html += `
          <details class="exercise-sol-card" open>
            <summary>
              <span>${escapeHtml(ex.qNum)}: ${escapeHtml(ex.question.substring(0, 75))}...</span>
              <span style="font-size: .8rem; color: #60a5fa;">Reveal ▾</span>
            </summary>
            <div class="exercise-sol-body">
              <p style="font-weight: 700; color: #fff; margin-bottom: .75rem;">${escapeHtml(ex.question)}</p>
              <div>${ex.solution}</div>
            </div>
          </details>
        `;
      });
    } else {
      html += `
        <div style="padding: 2rem; background: var(--hub-card); border-radius: var(--r-md); text-align: center; color: var(--hub-muted);">
          All worked solutions for ${catalogData.title} are pre-indexed. Switch to Solutions Bank in Tab 3 to search full question indices.
        </div>
      `;
    }

  } else if (currentView === "examprep") {
    html += `<h2 class="reader-section-header" style="color: #fbbf24;">🎯 NEET-UG &amp; JEE Main Previous Year Questions (PYQs 2020-2024)</h2>`;
    const pyqs = (deepData && deepData.pyqs) || [];
    if (pyqs.length > 0) {
      pyqs.forEach(item => {
        html += `
          <div class="reader-pyq-box">
            <div class="pyq-tag-exam">${escapeHtml(item.exam)}</div>
            <p style="font-weight: 700; color: #fff; margin: 0 0 .75rem 0;">${escapeHtml(item.q)}</p>
            <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: .75rem;">
              ${item.opts.map(o => `<div style="background: rgba(0,0,0,.25); padding: 4px 10px; border-radius: 4px; font-size: .85rem;">${escapeHtml(o)}</div>`).join("")}
            </div>
            <div style="background: rgba(16,185,129,.12); border: 1px solid rgba(16,185,129,.3); padding: .75rem 1rem; border-radius: 6px; font-size: .88rem;">
              <strong style="color: #34d399;">Correct Option: ${escapeHtml(item.ans)}</strong>
              <p style="margin: 4px 0 0 0; color: var(--hub-text); font-size: .82rem;">${escapeHtml(item.expl)}</p>
            </div>
          </div>
        `;
      });
    } else {
      html += `
        <div style="padding: 2rem; background: var(--hub-card); border-radius: var(--r-md); text-align: center; color: var(--hub-muted);">
          Exam preparation drill loaded. Access full PYQ Archive in Tab 4 for multi-year papers.
        </div>
      `;
    }

  } else if (currentView === "formulas") {
    html += `<h2 class="reader-section-header" style="color: #38bdf8;">⚡ High-Yield Formula &amp; Concept Map</h2>`;
    const formulas = (deepData && deepData.formulaMap) || catalogData.formulas || [];
    formulas.forEach(f => {
      html += `
        <div class="ncert-math-block" style="text-align: left; font-size: .95rem; margin-bottom: .75rem;">
          ${escapeHtml(f)}
        </div>
      `;
    });
  }

  pane.innerHTML = html;

  // Trigger KaTeX math rendering
  if (window.renderMathInElement) {
    setTimeout(() => {
      renderMathInElement(pane, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ],
        throwOnError: false
      });
    }, 20);
  }
}

function setupNCERTReaderStationControls() {
  // Subject pills
  const subjButtons = document.querySelectorAll(".reader-subj-btn");
  subjButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      subjButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      readerStationState.activeSubject = btn.getAttribute("data-r-subj");
      renderReaderSidebar();
      renderReaderStageContent();
    });
  });

  // Class toggle buttons
  const classButtons = document.querySelectorAll(".reader-class-btn");
  classButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      classButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      readerStationState.activeClass = btn.getAttribute("data-r-class");
      renderReaderSidebar();
      renderReaderStageContent();
    });
  });

  // Search in chapter list
  const searchInput = document.getElementById("station-ch-search");
  if (searchInput) {
    searchInput.addEventListener("input", renderReaderSidebar);
  }

  // View switcher buttons (Theory / InText / Exercises / ExamPrep / Formulas)
  const viewButtons = document.querySelectorAll(".reader-view-pill");
  viewButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      viewButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      readerStationState.activeView = btn.getAttribute("data-view");
      renderReaderStageContent();
    });
  });

  // Font sizing
  const pane = document.getElementById("station-reading-pane");
  const btnFontDec = document.getElementById("btn-station-font-dec");
  const btnFontInc = document.getElementById("btn-station-font-inc");
  if (btnFontDec && pane) {
    btnFontDec.addEventListener("click", () => {
      readerStationState.fontSize = Math.max(13, readerStationState.fontSize - 1.5);
      pane.style.fontSize = `${readerStationState.fontSize}px`;
    });
  }
  if (btnFontInc && pane) {
    btnFontInc.addEventListener("click", () => {
      readerStationState.fontSize = Math.min(24, readerStationState.fontSize + 1.5);
      pane.style.fontSize = `${readerStationState.fontSize}px`;
    });
  }

  // Theme switcher
  const btnTheme = document.getElementById("btn-station-theme");
  const themes = ["dark", "sepia", "white"];
  let tIdx = 0;
  if (btnTheme && pane) {
    btnTheme.addEventListener("click", () => {
      tIdx = (tIdx + 1) % themes.length;
      readerStationState.theme = themes[tIdx];
      pane.setAttribute("data-theme", themes[tIdx]);
      showNotification(`Reader Mode: ${themes[tIdx].toUpperCase()}`);
    });
  }

  // Print button
  const btnPrint = document.getElementById("btn-station-print");
  if (btnPrint) {
    btnPrint.addEventListener("click", () => window.print());
  }

  // Enlist active chapter
  const btnEnlist = document.getElementById("btn-station-enlist");
  if (btnEnlist) {
    btnEnlist.addEventListener("click", () => {
      enlistBookToTaskforce(readerStationState.activeChapterId);
    });
  }

  // Navbar direct "Read NCERT Online" button
  const btnNavRead = document.getElementById("btn-nav-read-ncert");
  const btnSwitchTop = document.getElementById("btn-switch-to-reader-top");
  
  const jumpToReader = () => {
    setAppMode("academic");
    switchAcademicTab("ebooks");
    const station = document.getElementById("ncert-reader-station");
    if (station) {
      station.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (btnNavRead) btnNavRead.addEventListener("click", jumpToReader);
  if (btnSwitchTop) btnSwitchTop.addEventListener("click", jumpToReader);
}


// Master Initializer for Academic Pro Hub
function initAcademicProHub() {
  loadAcademicTasks();
  loadCalendarEvents();
  setupAcademicModeSwitcher();
  setupAcademicNavTabs();
  setupTaskforceFilterListeners();
  setupNCERTReaderControls();
  setupSolutionsFilterListeners();
  setupFormulaVaultListeners();
  setupDeepWorkStation();
  setupAcademicEnlistModal();
  setupCalendarListeners();
  setupHandwrittenFilterListeners();

  // Setup In-Website Digital NCERT Reader Station
  setupNCERTReaderStationControls();

  // Render subviews
  renderAcademicCalendar();
  renderHandwrittenNotes();
  renderNCERTReaderStation();

  // Restore saved app mode (default to 'garden' or saved)
  const savedMode = localStorage.getItem("mg_app_mode") || "garden";
  setAppMode(savedMode);
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
  setupSoundscapeControls();
  setupSprintControls();
  setupNCERTControls();
  setupShareCardActions();

  // Initialize Academic Pro Command Center (CBSE 11-12 & NEET/JEE)
  initAcademicProHub();

  // Update dynamic elements
  renderGarden();
  updatePomoChapterSelect();
  renderCircadianTimeline(state.chronotype);
  document.getElementById("streak-count").textContent = state.streak;

  // Restore quiz result if already taken
  if (localStorage.getItem("mg_chronotype")) {
    renderCircadianTimeline(state.chronotype);
  }

  console.log("🌱 Memory Garden v2.5 (CBSE Bio-Maths Edition) — All systems online.");
});
