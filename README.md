# 🌱 Memory Garden: Spaced Repetition Bio-Maths System

> **Built with 💚 by Lujain**  
> *"A garden where every chapter you study becomes a living plant that wilts as your brain forgets it."*  
> Built with pure HTML5, CSS3, and JavaScript. Zero external backend required.

---

## 🏆 Presentation Quickstart for Judges

### 🎙️ The 30-Second Elevator Pitch
> *"Judges, why do students forget 70% of what they study within just 7 days? In high school, we cram for tests, pass, and three weeks later the memory is completely gone. **Memory Garden** solves this problem by transforming the neurobiology of memory consolidation and the calculus of exponential decay into a living, visual garden. Every chapter you study is a plant. As days pass, the Ebbinghaus forgetting curve mathematically calculates your retention. When your brain is about to discard the chapter, the plant wilts and calls for water. One click to revise strengthens the neural pathways, revives the plant, and pushes the next forgetting curve further away."*

### ⚡ 5-Step Live Demo Script
1. **Show the Garden at Day 0:**  
   Open `index.html`. Show the vibrant, glowing green plants with upright stems and open flowers. Point to the **Garden Health Score (100%)**.
2. **Hit the "🔥 Fast-Forward 7 Days" Button:**  
   Click the glowing amber button on the top Time Travel bar. Watch the magic happen live:
   - Stems droop and bend under math-driven SVG interpolation.
   - Leaves turn from lush green to wilting amber and crispy brown.
   - The notification pill drops from 100% to **38%**, and **"Water me today!"** badges appear.
3. **Water / Revise a Plant:**  
   Click **"💧 Revise & Water"** on *Photosynthesis*. Rate your recall (*Good* or *Easy*). Listen to the gentle water trickle sound, watch the confetti burst, and see the stability $S$ double as the blossom revives to vibrant green!
4. **Show the Ebbinghaus Math in the Analytics Tab:**  
   Switch to the **"📈 Ebbinghaus Maths & Curves"** tab. Show how Chart.js graphs the red steep drop (without revision) vs the green sawtooth stabilization (with spaced repetition). Explain the formula $R = e^{-t/S}$ and memory half-life $t_{1/2} = S \ln(2)$.
5. **Demonstrate the Circadian Body-Clock Quiz:**  
   Switch to the **"🦉 Circadian Clock Quiz"** tab. Explain how students shouldn't force high-order Calculus or Physics during their circadian low, and show the customized hourly energy blueprint.

---

## 🧠 The Science & Mathematics

### 1. The Mathematics: Hermann Ebbinghaus Forgetting Curve

Retention $R(t)$ follows an exponential decay differential equation:

$$\frac{dR}{dt} = -\frac{1}{S} R$$

Solving this first-order separable differential equation gives:

$$R(t) = e^{-\frac{t}{S}}$$

Where:
- **$R \in (0, 1]$**: Memory retention probability (rendered as plant health $0\% - 100\%$).
- **$t$**: Elapsed time in days since last study session (or simulated time offset).
- **$S$**: Memory stability / strength in days.

#### Memory Half-Life:
Setting $R(t_{1/2}) = 0.5$:

$$e^{-\frac{t_{1/2}}{S}} = 0.5 \implies -\frac{t_{1/2}}{S} = \ln(0.5) \implies t_{1/2} = S \ln(2) \approx 0.693 \cdot S$$

#### Spaced Repetition Factor:
Each time a student waters/revises a plant at the **critical inflection point ($40\% \le R \le 60\%$)**, stability $S$ is multiplied:

$$S_{n+1} = S_n \times k_{\text{recall}}$$

Where $k_{\text{recall}} \in \{1.4, 2.0, 2.8\}$ depending on active recall difficulty. This flattens the derivative $\frac{dR}{dt}$, meaning each subsequent revision lasts dramatically longer!

---

### 2. The Biology: Synaptic Consolidation & LTP

- **Long-Term Potentiation (LTP):** When you study a chapter, transient synaptic connections form in the hippocampus via glutamate receptors (NMDA & AMPA).
- **Synaptic Pruning:** Without reactivation, protein synthesis halts and the brain's microglia prune the dendritic spines to conserve biological energy.
- **Why 40%–60% is the "Sweet Spot":** Neurocognitive research shows that reviewing when material is too fresh yields minimal consolidation (no cognitive effort). Reviewing when retention is $<30\%$ requires full re-learning. The wilting zone ($40-60\%$) triggers maximum synaptic protein synthesis and shifts the trace into the neocortex for permanent storage.
- **Circadian Rhythms:** Morning Larks have early cortisol/dopamine surges suited for abstract mathematics; Night Owls experience peak prefrontal cortex cerebral blood flow in the late afternoon/evening.

---

## 💻 Technical Architecture

- **Front-End:** Semantic HTML5, CSS3 Variables, Glassmorphism, CSS Grid & Flexbox.
- **Dynamic SVGs:** Procedural mathematical curves with variable cubic Bézier control points ($Q$ / $C$) that bend stems and rotate leaf angles proportionally to $R(t)$.
- **Audio Synthesizer:** Pure Web Audio API oscillators and gain nodes (no external `.mp3` files needed; 100% offline & instantaneous).
- **Graphing:** Chart.js 4.4 via CDN.
- **Persistence:** Browser `localStorage` maintains chapters, revision histories, and exam countdown parameters across sessions.

---

## 🚀 How to Run

1. Simply double-click `index.html` or open it in any modern browser (Chrome, Edge, Safari, Firefox).
2. No Node.js server, Python backend, or database setup is needed!
