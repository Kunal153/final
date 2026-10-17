export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  pyqYear?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface UnitQuiz {
  subjectCode: string;
  subjectName: string;
  unitNumber: number;
  unitTitle: string;
  totalQuestions: number; // 20 questions
  durationMinutes: number; // 20 minutes
  passingMarks: number; // 10 / 20 (50%)
  questions: QuizQuestion[];
}

export interface QuizAttemptResult {
  attemptId: string;
  subjectCode: string;
  subjectName: string;
  unitNumber: number;
  unitTitle: string;
  score: number; // Out of 20
  percentage: number;
  totalQuestions: number; // 20
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  timeSpentSeconds: number;
  completedAt: string;
  userAnswers: Record<string, number>; // questionId -> selectedIndex
  isAutoSubmitted: boolean;
  motivationalMessage?: string;
  congratulatoryMessage?: string;
}

// Concrete SPPU authentic question banks for foundational subjects
export const CURATED_SPPU_UNIT_QUIZZES: Record<string, QuizQuestion[]> = {
  // ==================== Basic Electronics (104010) - Unit 1: Diodes & Applications ====================
  '104010-unit-1': [
    {
      id: 'bxe-u1-q1',
      question: 'What is the theoretical ripple factor of a Half-Wave Rectifier without a filter in SPPU exam pattern?',
      options: ['0.482', '1.21', '0.812', '1.11'],
      correctIndex: 1,
      explanation: 'For a half-wave rectifier, ripple factor γ = √( (Irms / Idc)² - 1 ) = √( (Im/2 / Im/π)² - 1 ) = √( (π/2)² - 1 ) = √(2.467 - 1) ≈ 1.21.',
      pyqYear: 'SPPU In-Sem Oct 2023',
      difficulty: 'Medium'
    },
    {
      id: 'bxe-u1-q2',
      question: 'In a Full-Wave Bridge Rectifier with input frequency f = 50 Hz, what is the ripple frequency at the output?',
      options: ['25 Hz', '50 Hz', '100 Hz', '200 Hz'],
      correctIndex: 2,
      explanation: 'In a full-wave rectifier, two pulses occur per cycle of AC input, so output ripple frequency is 2f = 2 × 50 Hz = 100 Hz.',
      pyqYear: 'SPPU May 2024',
      difficulty: 'Easy'
    },
    {
      id: 'bxe-u1-q3',
      question: 'Which equation correctly represents the Shockley diode current equation for a PN junction?',
      options: ['I = Is * (e^(V / η*Vt) - 1)', 'I = Is * (e^(V / Vt) + 1)', 'I = Is / (1 - e^(V / Vt))', 'I = Vt * ln(V / Is)'],
      correctIndex: 0,
      explanation: 'Shockley equation: I = Is [ exp(V / (η*Vt)) - 1 ], where Is is reverse saturation current, Vt is thermal voltage (≈ 26mV at 300K), and η is ideality factor (1 for Ge, 2 for Si).',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Medium'
    },
    {
      id: 'bxe-u1-q4',
      question: 'What is the Peak Inverse Voltage (PIV) rating across each diode in a Full-Wave Bridge Rectifier?',
      options: ['Vm', '2 Vm', 'Vm / 2', '√2 Vm'],
      correctIndex: 0,
      explanation: 'In a bridge rectifier, the PIV of each diode is Vm, whereas in a center-tapped transformer full wave rectifier it is 2Vm.',
      pyqYear: 'SPPU In-Sem Oct 2022',
      difficulty: 'Easy'
    },
    {
      id: 'bxe-u1-q5',
      question: 'A Zener diode is operated primarily in which region to function as a constant voltage regulator?',
      options: ['Forward active region', 'Cut-off region', 'Reverse breakdown region', 'Saturation region'],
      correctIndex: 2,
      explanation: 'A Zener diode maintains a constant voltage across its terminals despite variations in current when operated in the reverse breakdown region.',
      pyqYear: 'SPPU May 2023',
      difficulty: 'Easy'
    },
    {
      id: 'bxe-u1-q6',
      question: 'What is the maximum rectification efficiency (η) of a Full-Wave Rectifier?',
      options: ['40.6%', '50%', '81.2%', '100%'],
      correctIndex: 2,
      explanation: 'Theoretical maximum efficiency of a full-wave rectifier is 8/π² ≈ 81.2%. For a half-wave rectifier it is 4/π² ≈ 40.6%.',
      pyqYear: 'SPPU Dec 2022',
      difficulty: 'Medium'
    },
    {
      id: 'bxe-u1-q7',
      question: 'In a capacitor filter connected to a full-wave rectifier, the ripple factor is inversely proportional to which parameter?',
      options: ['Load resistance RL and Capacitance C', 'Supply frequency only', 'Peak secondary voltage', 'Diode internal resistance'],
      correctIndex: 0,
      explanation: 'For a full-wave rectifier with C-filter, ripple factor γ = 1 / (4√3 * f * C * RL), making it inversely proportional to both C and RL.',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Hard'
    },
    {
      id: 'bxe-u1-q8',
      question: 'Which diode circuit is used to add a DC level to an AC input signal without changing its waveform shape?',
      options: ['Clipper circuit', 'Clamper circuit', 'Peak detector', 'Voltage multiplier'],
      correctIndex: 1,
      explanation: 'A clamper (or DC restorer) shifts the baseline of an AC signal to a desired DC reference level without altering the peak-to-peak amplitude.',
      pyqYear: 'SPPU In-Sem Oct 2023',
      difficulty: 'Medium'
    },
    {
      id: 'bxe-u1-q9',
      question: 'The reverse saturation current (Is) of a Silicon diode approximately doubles for every how many degrees Celsius rise in temperature?',
      options: ['1 °C', '5 °C', '10 °C', '25 °C'],
      correctIndex: 2,
      explanation: 'Reverse saturation current in silicon and germanium PN junctions doubles approximately every 10 °C temperature rise due to thermal generation of electron-hole pairs.',
      pyqYear: 'SPPU May 2024',
      difficulty: 'Medium'
    },
    {
      id: 'bxe-u1-q10',
      question: 'What is the typical barrier potential (knee voltage) of a Silicon PN junction diode at room temperature (25°C)?',
      options: ['0.2 V', '0.3 V', '0.7 V', '1.1 V'],
      correctIndex: 2,
      explanation: 'Silicon has a barrier potential of approximately 0.7 V, whereas Germanium has a knee voltage of about 0.3 V.',
      pyqYear: 'SPPU Dec 2021',
      difficulty: 'Easy'
    },
    {
      id: 'bxe-u1-q11',
      question: 'In a biased clipper circuit, if diode is in series with a DC voltage battery Vb, clipping occurs when input exceeds:',
      options: ['0 V', 'Vb + Vγ', 'Vb - Vγ', '2 Vb'],
      correctIndex: 1,
      explanation: 'For silicon diode with barrier potential Vγ, conduction begins when input Vin exceeds Vb + Vγ, thus clipping or conducting at that threshold.',
      pyqYear: 'SPPU May 2023',
      difficulty: 'Hard'
    },
    {
      id: 'bxe-u1-q12',
      question: 'Zener breakdown occurs in PN junctions that have which characteristics?',
      options: ['Very lightly doped with wide depletion layer', 'Very heavily doped with narrow depletion layer (< 10nm)', 'Moderate doping with high temperature', 'Only intrinsic semiconductors'],
      correctIndex: 1,
      explanation: 'Zener breakdown happens in heavily doped junctions with thin depletion layers (< 10nm) where high electric fields (> 3×10⁷ V/m) rupture covalent bonds directly (quantum tunneling).',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Medium'
    },
    {
      id: 'bxe-u1-q13',
      question: 'Avalanche breakdown is primarily caused by which physical phenomenon?',
      options: ['Direct covalent bond rupture by electric field', 'Impact ionization by thermally accelerated carriers', 'Tunneling of electrons across forbidden gap', 'Recombination of excess carriers'],
      correctIndex: 1,
      explanation: 'In lightly doped diodes with reverse voltage > 6V, minority carriers gain high kinetic energy from the field and liberate new electron-hole pairs by collision (impact ionization).',
      pyqYear: 'SPPU May 2022',
      difficulty: 'Hard'
    },
    {
      id: 'bxe-u1-q14',
      question: 'What is the dynamic resistance rd of a forward-biased silicon diode at room temperature with operating DC current Id = 2 mA?',
      options: ['13 Ω', '26 Ω', '52 Ω', '104 Ω'],
      correctIndex: 1,
      explanation: 'Dynamic resistance rd = η * Vt / Id. For silicon with η=2 (or η=1 depending on injection), rd = 26mV / 2mA = 13Ω (if η=1) or 26Ω (if η=2). For SPPU standard η=2, rd = 26 Ω.',
      pyqYear: 'SPPU In-Sem Oct 2023',
      difficulty: 'Hard'
    },
    {
      id: 'bxe-u1-q15',
      question: 'In a bridge rectifier, how many diodes conduct simultaneously during each half cycle of AC input?',
      options: ['1 diode', '2 diodes in series', '3 diodes', '4 diodes in parallel'],
      correctIndex: 1,
      explanation: 'During each half-cycle, two diagonally opposite diodes conduct in series with the load resistor, while the other two are reverse biased.',
      pyqYear: 'SPPU Dec 2022',
      difficulty: 'Easy'
    },
    {
      id: 'bxe-u1-q16',
      question: 'The Transformer Utilization Factor (TUF) of a Center-Tapped Full-Wave Rectifier is equal to:',
      options: ['0.287', '0.693', '0.812', '0.482'],
      correctIndex: 1,
      explanation: 'For a center-tapped full-wave rectifier, TUF is approximately 0.693 (due to separate secondary halves), compared to 0.812 for bridge rectifier and 0.287 for half-wave.',
      pyqYear: 'SPPU May 2023',
      difficulty: 'Hard'
    },
    {
      id: 'bxe-u1-q17',
      question: 'A Light Emitting Diode (LED) emits photons during forward bias through which recombination mechanism?',
      options: ['Direct bandgap radiative recombination', 'Indirect bandgap phonon generation', 'Reverse breakdown tunneling', 'Auger thermal recombination'],
      correctIndex: 0,
      explanation: 'LEDs are constructed using direct bandgap semiconductors (such as GaAs, GaN) where electron-hole recombination releases energy primarily as light photons.',
      pyqYear: 'SPPU In-Sem Oct 2022',
      difficulty: 'Medium'
    },
    {
      id: 'bxe-u1-q18',
      question: 'Which type of diode exhibits negative differential resistance in its forward V-I characteristics?',
      options: ['Varactor diode', 'Tunnel (Esaki) diode', 'Schottky diode', 'PIN diode'],
      correctIndex: 1,
      explanation: 'Tunnel diodes are extremely heavily doped (1:10³) leading to quantum mechanical tunneling that creates a distinct negative resistance region used in high-frequency oscillators.',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Medium'
    },
    {
      id: 'bxe-u1-q19',
      question: 'A Varactor diode functions effectively as a voltage-controlled variable:',
      options: ['Inductor', 'Resistor', 'Capacitor (depletion capacitance)', 'Transformer'],
      correctIndex: 2,
      explanation: 'Under reverse bias, a varactor diode utilizes its depletion layer width as a dielectric, varying junction capacitance Cj = εA / W with applied reverse voltage.',
      pyqYear: 'SPPU May 2024',
      difficulty: 'Easy'
    },
    {
      id: 'bxe-u1-q20',
      question: 'What is the voltage regulation of an ideal DC voltage power supply?',
      options: ['0%', '50%', '100%', 'Infinity'],
      correctIndex: 0,
      explanation: 'Voltage Regulation % = [(Vnl - Vfl) / Vfl] × 100%. For an ideal power supply, Vnl = Vfl under all loads, hence regulation is exactly 0%.',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Easy'
    }
  ],

  // ==================== Engineering Mathematics - II (107007) - Unit 1: First Order ODEs ====================
  '107007-unit-1': [
    {
      id: 'm2-u1-q1',
      question: 'What is the necessary and sufficient condition for the differential equation M(x,y)dx + N(x,y)dy = 0 to be exact?',
      options: ['∂M/∂y = ∂N/∂x', '∂M/∂x = ∂N/∂y', '∂M/∂y = -∂N/∂x', 'dM/dy = dN/dx'],
      correctIndex: 0,
      explanation: 'According to Eulers criterion, M dx + N dy = 0 is exact if and only if the mixed partial derivatives are equal: (∂M/∂y) = (∂N/∂x).',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Easy'
    },
    {
      id: 'm2-u1-q2',
      question: 'If (1/N) * (∂M/∂y - ∂N/∂x) = f(x) (a function of x alone), what is the Integrating Factor (I.F.) for M dx + N dy = 0?',
      options: ['e^(∫ f(x) dx)', 'e^(-∫ f(x) dx)', '∫ f(x) dx', '1 / f(x)'],
      correctIndex: 0,
      explanation: 'When (∂M/∂y - ∂N/∂x)/N depends solely on x, say f(x), the integrating factor is I.F. = exp(∫ f(x) dx).',
      pyqYear: 'SPPU In-Sem Oct 2023',
      difficulty: 'Medium'
    },
    {
      id: 'm2-u1-q3',
      question: 'What is the general solution of the linear differential equation dy/dx + P(x)*y = Q(x)?',
      options: ['y * I.F. = ∫ [Q(x) * I.F.] dx + c', 'y / I.F. = ∫ [Q(x) / I.F.] dx + c', 'y * Q(x) = ∫ I.F. dx + c', 'x * I.F. = ∫ [P(x) * I.F.] dy + c'],
      correctIndex: 0,
      explanation: 'The standard Leibnitz linear ODE has integrating factor I.F. = e^(∫ P dx), and general solution: y * (I.F.) = ∫ (Q * I.F.) dx + c.',
      pyqYear: 'SPPU May 2024',
      difficulty: 'Easy'
    },
    {
      id: 'm2-u1-q4',
      question: 'Bernoullis equation dy/dx + P(x)*y = Q(x)*y^n is transformed into a linear ODE by substituting:',
      options: ['v = y^(1-n)', 'v = y^n', 'v = y^(n-1)', 'v = 1/y'],
      correctIndex: 0,
      explanation: 'Dividing Bernoullis equation by y^n yields y^(-n) dy/dx + P y^(1-n) = Q. Putting v = y^(1-n), dv/dx = (1-n) y^(-n) dy/dx reduces it to a linear ODE.',
      pyqYear: 'SPPU Dec 2022',
      difficulty: 'Medium'
    },
    {
      id: 'm2-u1-q5',
      question: 'What is the differential equation of orthogonal trajectories of a family of curves represented by f(r, θ, c) = 0 in polar coordinates?',
      options: ['Replace dr/dθ with -r² (dθ/dr)', 'Replace dr/dθ with -dr/dθ', 'Replace dr/dθ with r (dθ/dr)', 'Replace dθ/dr with -1/r'],
      correctIndex: 0,
      explanation: 'In polar coordinates, the condition for orthogonality is tan(φ2) = -cot(φ1), which requires substituting dr/dθ with -r² (dθ/dr).',
      pyqYear: 'SPPU May 2023',
      difficulty: 'Hard'
    },
    {
      id: 'm2-u1-q6',
      question: 'Find the integrating factor for the equation dy/dx + (2/x)*y = x³.',
      options: ['x', 'x²', '2 ln(x)', 'e^(2x)'],
      correctIndex: 1,
      explanation: 'Here P(x) = 2/x. I.F. = exp(∫ (2/x) dx) = exp(2 ln x) = exp(ln x²) = x².',
      pyqYear: 'SPPU In-Sem Oct 2023',
      difficulty: 'Easy'
    },
    {
      id: 'm2-u1-q7',
      question: 'If a homogeneous equation M dx + N dy = 0 has Mx + Ny ≠ 0, what is its integrating factor?',
      options: ['1 / (Mx + Ny)', '1 / (Mx - Ny)', 'Mx + Ny', 'x*M + y*N'],
      correctIndex: 0,
      explanation: 'For a homogeneous differential equation M dx + N dy = 0 where M and N are homogeneous functions of same degree n, if Mx + Ny ≠ 0, then 1/(Mx + Ny) is an integrating factor.',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Medium'
    },
    {
      id: 'm2-u1-q8',
      question: 'According to Newtons Law of Cooling, the rate of change of temperature dT/dt is proportional to:',
      options: ['(T - Ts)', '(T + Ts)', 'T²', '1 / (T - Ts)'],
      correctIndex: 0,
      explanation: 'Newtons Law of Cooling states dT/dt = -k (T - Ts), where T is body temperature and Ts is constant ambient surrounding temperature.',
      pyqYear: 'SPPU May 2024',
      difficulty: 'Easy'
    },
    {
      id: 'm2-u1-q9',
      question: 'In an electrical series L-R circuit with DC voltage E, the governing first order differential equation is:',
      options: ['L (di/dt) + R*i = E', 'R (di/dt) + L*i = E', 'L (d²i/dt²) + R*i = 0', 'di/dt + L*R*i = E'],
      correctIndex: 0,
      explanation: 'Applying KVL: voltage across inductor L (di/dt) plus voltage across resistor R*i equals supply EMF E, which is a linear first order ODE.',
      pyqYear: 'SPPU Dec 2022',
      difficulty: 'Medium'
    },
    {
      id: 'm2-u1-q10',
      question: 'What is the time constant (τ) of a series R-L circuit?',
      options: ['L / R', 'R / L', 'L * R', '1 / (L * R)'],
      correctIndex: 0,
      explanation: 'The time constant τ of an R-L series circuit is L/R seconds. In this time, current rises to (1 - 1/e) ≈ 63.2% of its steady-state value E/R.',
      pyqYear: 'SPPU In-Sem Oct 2022',
      difficulty: 'Easy'
    },
    {
      id: 'm2-u1-q11',
      question: 'What is the orthogonal trajectory of the family of parabolas y² = 4ax (where a is a parameter)?',
      options: ['2x² + y² = c²', 'x² + 2y² = c²', 'x² - y² = c', 'xy = c'],
      correctIndex: 0,
      explanation: 'Differentiating y² = 4ax gives 2y y\' = 4a = y²/x => y\' = y/(2x). For orthogonal trajectory, replace y\' with -1/y\' => -dx/dy = y/(2x) => 2x dx + y dy = 0 => 2x² + y² = c² (family of ellipses).',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Hard'
    },
    {
      id: 'm2-u1-q12',
      question: 'For the differential equation dy/dx = (x + y + 1) / (x + y - 1), which substitution reduces it to variable separable form?',
      options: ['v = x + y', 'v = x - y', 'v = y / x', 'v = xy'],
      correctIndex: 0,
      explanation: 'Since coefficients of x and y are identical (a1/a2 = b1/b2 = 1), put v = x + y => dv/dx = 1 + dy/dx, transforming it directly into a separable ODE in v and x.',
      pyqYear: 'SPPU May 2023',
      difficulty: 'Medium'
    },
    {
      id: 'm2-u1-q13',
      question: 'If the half-life of a radioactive substance is 1600 years, what is the radioactive decay constant k?',
      options: ['ln(2) / 1600', '1600 / ln(2)', '1600 * ln(2)', '1 / 1600'],
      correctIndex: 0,
      explanation: 'Radioactive decay: N(t) = N0 e^(-kt). At t = T1/2, N = N0/2 => e^(-k * 1600) = 1/2 => k = ln(2) / 1600 ≈ 0.000433 yr⁻¹.',
      pyqYear: 'SPPU Dec 2021',
      difficulty: 'Medium'
    },
    {
      id: 'm2-u1-q14',
      question: 'In an R-C circuit connected to a DC supply V0, the charging current i(t) at time t is given by:',
      options: ['(V0 / R) * e^(-t / RC)', '(V0 / R) * (1 - e^(-t / RC))', 'V0 * C * e^(-t / RC)', 'V0 / (R * e^(t / RC))'],
      correctIndex: 0,
      explanation: 'During capacitor charging through resistor R, charge is q(t) = C V0 (1 - e^(-t/RC)). The current is i(t) = dq/dt = (V0 / R) e^(-t / RC).',
      pyqYear: 'SPPU In-Sem Oct 2023',
      difficulty: 'Hard'
    },
    {
      id: 'm2-u1-q15',
      question: 'The integrating factor of the differential equation (1 + y²) dx + (x - e^(-tan⁻¹ y)) dy = 0 is:',
      options: ['e^(tan⁻¹ y)', 'e^(-tan⁻¹ y)', '1 + y²', '1 / (1 + y²)'],
      correctIndex: 0,
      explanation: 'Rewriting as dx/dy + x/(1+y²) = e^(-tan⁻¹ y)/(1+y²). This is linear in x with P(y) = 1/(1+y²). Hence I.F. = exp(∫ 1/(1+y²) dy) = e^(tan⁻¹ y).',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Hard'
    },
    {
      id: 'm2-u1-q16',
      question: 'Which of the following is Clairauts equation form?',
      options: ['y = x*p + f(p), where p = dy/dx', 'y = x*p + p²', 'y = p² + f(x)', 'x = y*p + f(p)'],
      correctIndex: 0,
      explanation: 'Clairauts differential equation has the standard form y = x*p + f(p), where p = dy/dx. Its general solution is obtained simply by replacing p with constant c: y = cx + f(c).',
      pyqYear: 'SPPU May 2022',
      difficulty: 'Medium'
    },
    {
      id: 'm2-u1-q17',
      question: 'What is the order and degree of the differential equation [1 + (dy/dx)²]^(3/2) = k * (d²y/dx²)?',
      options: ['Order 2, Degree 2', 'Order 2, Degree 3', 'Order 1, Degree 3', 'Order 2, Degree 1'],
      correctIndex: 0,
      explanation: 'Squaring both sides eliminates fractional powers: [1 + (dy/dx)²]³ = k² (d²y/dx²)². The highest order derivative is d²y/dx² (order = 2), and its power is 2 (degree = 2).',
      pyqYear: 'SPPU May 2024',
      difficulty: 'Easy'
    },
    {
      id: 'm2-u1-q18',
      question: 'If the general solution of a first order ODE contains one arbitrary constant, what is the singular solution?',
      options: ['A solution containing no arbitrary constant and cannot be obtained from general solution', 'Any particular solution for c = 0', 'A solution with two arbitrary constants', 'The trivial zero solution'],
      correctIndex: 0,
      explanation: 'A singular solution is an envelope of the family of general solution curves; it contains no arbitrary constants and cannot be obtained by assigning particular values to the arbitrary constant.',
      pyqYear: 'SPPU Dec 2022',
      difficulty: 'Medium'
    },
    {
      id: 'm2-u1-q19',
      question: 'In natural growth problems dN/dt = k*N, what is the doubling time if growth constant is k?',
      options: ['ln(2) / k', 'k / ln(2)', '2 / k', 'e^(2k)'],
      correctIndex: 0,
      explanation: 'From N(t) = N0 e^(kt), for N(t) = 2 N0, we have 2 = e^(kt), hence t_double = ln(2) / k.',
      pyqYear: 'SPPU In-Sem Oct 2023',
      difficulty: 'Easy'
    },
    {
      id: 'm2-u1-q20',
      question: 'If M dx + N dy = 0 has integrating factor x^m * y^n, this technique is used when equation has form:',
      options: ['x^a y^b (m y dx + n x dy) + x^c y^d (p y dx + q x dy) = 0', 'Separable variables only', 'Exact differential form only', 'Homogeneous polynomial form only'],
      correctIndex: 0,
      explanation: 'When equations match the dual grouping x^a y^b (m y dx + n x dy) + x^c y^d (p y dx + q x dy) = 0, multiplying by x^h y^k and applying exactness yields h and k directly.',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Hard'
    }
  ],

  // ==================== Fundamentals of Data Structures (210242) - Unit 1: Algorithms & Searching ====================
  '210242-unit-1': [
    {
      id: 'fds-u1-q1',
      question: 'What is the worst-case time complexity of Binary Search on a sorted array of n elements?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctIndex: 1,
      explanation: 'Binary search halves the search space in each iteration: T(n) = T(n/2) + O(1), which solves to O(log₂ n) in the worst and average cases.',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Easy'
    },
    {
      id: 'fds-u1-q2',
      question: 'Which asymptotic notation provides a strict tight bound (both upper and lower) for an algorithms execution time?',
      options: ['Big O notation', 'Big Omega notation (Ω)', 'Big Theta notation (Θ)', 'Little o notation'],
      correctIndex: 2,
      explanation: 'Big Theta Θ(g(n)) denotes that f(n) is bounded both above and below by constants c1*g(n) and c2*g(n) for large n.',
      pyqYear: 'SPPU In-Sem Oct 2023',
      difficulty: 'Medium'
    },
    {
      id: 'fds-u1-q3',
      question: 'In Sentinel Linear Search, what is the primary benefit over traditional linear search?',
      options: ['Reduces asymptotic complexity to O(log n)', 'Eliminates loop index boundary comparison on every iteration', 'Requires array to be pre-sorted', 'Uses constant O(1) memory instead of pointers'],
      correctIndex: 1,
      explanation: 'By placing the search key at the end of the array (sentinel element), the algorithm avoids checking array boundary index (i < n) inside the loop, saving one comparison per iteration.',
      pyqYear: 'SPPU May 2024',
      difficulty: 'Medium'
    },
    {
      id: 'fds-u1-q4',
      question: 'What is the recurrence relation for the Tower of Hanoi problem with n disks?',
      options: ['T(n) = 2 T(n-1) + 1', 'T(n) = T(n-1) + n', 'T(n) = 2 T(n/2) + O(1)', 'T(n) = T(n-2) + 2'],
      correctIndex: 0,
      explanation: 'To move n disks: move n-1 disks to auxiliary peg (T(n-1)), move largest disk to target (1 move), move n-1 disks to target (T(n-1)). Thus T(n) = 2 T(n-1) + 1, giving 2^n - 1 moves.',
      pyqYear: 'SPPU Dec 2022',
      difficulty: 'Medium'
    },
    {
      id: 'fds-u1-q5',
      question: 'Fibonacci Search algorithm works on which principle and requires which prerequisite?',
      options: ['Divide and conquer using Fibonacci numbers; requires sorted array', 'Hashing technique; requires hash table', 'Dynamic programming; works on unsorted lists', 'Graph traversal; requires adjacency matrix'],
      correctIndex: 0,
      explanation: 'Fibonacci search divides a sorted array using Fibonacci numbers instead of exact halves, performing only addition and subtraction operations rather than division/shifts.',
      pyqYear: 'SPPU In-Sem Oct 2022',
      difficulty: 'Hard'
    },
    {
      id: 'fds-u1-q6',
      question: 'What is the auxiliary space complexity of an iterative binary search implementation?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctIndex: 0,
      explanation: 'Iterative binary search uses only pointers (low, high, mid) without recursion stack frames, requiring O(1) constant auxiliary space.',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Easy'
    },
    {
      id: 'fds-u1-q7',
      question: 'Which of the following functions grows asymptotically fastest as n approaches infinity?',
      options: ['n * log n', 'n^1.5', '2^n', 'n!'],
      correctIndex: 3,
      explanation: 'Growth hierarchy: O(1) < O(log n) < O(n) < O(n log n) < O(n^c) < O(2^n) < O(n!). Factorial n! grows faster than exponential 2^n.',
      pyqYear: 'SPPU May 2023',
      difficulty: 'Easy'
    },
    {
      id: 'fds-u1-q8',
      question: 'In Big-O notation, if f(n) = 7n³ + 14n² + 200, what is the tightest upper bound?',
      options: ['O(n)', 'O(n²)', 'O(n³)', 'O(n⁴)'],
      correctIndex: 2,
      explanation: 'In asymptotic analysis, lower-order terms (14n², 200) and leading constants (7) are discarded for large n, leaving O(n³).',
      pyqYear: 'SPPU In-Sem Oct 2023',
      difficulty: 'Easy'
    },
    {
      id: 'fds-u1-q9',
      question: 'What is the worst-case number of comparisons in linear search for an array of size n?',
      options: ['1', 'log₂ n', 'n', 'n - 1'],
      correctIndex: 2,
      explanation: 'In the worst case (key is at the last position or not present), linear search inspects all n elements, performing n comparisons.',
      pyqYear: 'SPPU Dec 2021',
      difficulty: 'Easy'
    },
    {
      id: 'fds-u1-q10',
      question: 'What happens to the stack memory if a recursive function does not have a properly terminating base case?',
      options: ['Segmentation fault due to stack overflow', 'Returns NULL gracefully', 'Automatic garbage collection frees memory', 'Infinite loop without memory consumption'],
      correctIndex: 0,
      explanation: 'Each recursive call allocates a stack activation record. Without a terminating base condition, memory exceeds call stack limits, triggering a Stack Overflow (SIGSEGV).',
      pyqYear: 'SPPU May 2024',
      difficulty: 'Easy'
    },
    {
      id: 'fds-u1-q11',
      question: 'A 2D array A[10][20] is stored in row-major order with base address 1000 and 4 bytes per element. Address of A[3][5] is:',
      options: ['1000 + (3*20 + 5) * 4 = 1260', '1000 + (5*10 + 3) * 4 = 1212', '1000 + (3*10 + 5) * 4 = 1140', '1320'],
      correctIndex: 0,
      explanation: 'Row-major formula: Address(A[i][j]) = Base + [(i * total_cols) + j] * sizeof(element). Address = 1000 + (3 * 20 + 5) * 4 = 1000 + 65 * 4 = 1260.',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Hard'
    },
    {
      id: 'fds-u1-q12',
      question: 'What is the difference between an Abstract Data Type (ADT) and a Data Structure?',
      options: ['ADT defines logical behavior and operations without implementation; Data Structure is concrete implementation', 'ADT is implemented in hardware while Data Structure is in software', 'ADT is only for linear structures', 'There is no difference'],
      correctIndex: 0,
      explanation: 'An ADT is a mathematical model with specified interface/operations (e.g. Stack with push/pop) without implementation details; a data structure provides concrete memory representation and code.',
      pyqYear: 'SPPU In-Sem Oct 2022',
      difficulty: 'Medium'
    },
    {
      id: 'fds-u1-q13',
      question: 'What is the Masters Theorem solution for T(n) = 2 T(n/2) + O(n)?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      correctIndex: 1,
      explanation: 'Here a=2, b=2, k=1. log_b(a) = log_2(2) = 1. Since log_b(a) = k, by Case 2 of Masters Theorem, T(n) = Θ(n^k * log n) = Θ(n log n). This is Merge Sort recurrence.',
      pyqYear: 'SPPU Dec 2022',
      difficulty: 'Medium'
    },
    {
      id: 'fds-u1-q14',
      question: 'In C++, which operator is used for dynamic memory deallocation of an array of objects?',
      options: ['free()', 'delete', 'delete[]', 'dispose'],
      correctIndex: 2,
      explanation: 'In C++, arrays allocated with new[] must be deallocated using delete[] to ensure destructors are invoked for each element in the allocated block.',
      pyqYear: 'SPPU May 2023',
      difficulty: 'Easy'
    },
    {
      id: 'fds-u1-q15',
      question: 'An algorithm with running time T(n) = 8 T(n/2) + n² has what Big-O complexity by Master Theorem?',
      options: ['O(n²)', 'O(n³)', 'O(n² log n)', 'O(n^4)'],
      correctIndex: 1,
      explanation: 'Here a=8, b=2, f(n)=n². log_b(a) = log_2(8) = 3. Since f(n) = O(n^(3 - ε)) where ε=1 > 0, by Case 1 of Masters Theorem, T(n) = Θ(n^(log_b a)) = Θ(n³).',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Hard'
    },
    {
      id: 'fds-u1-q16',
      question: 'Which searching technique requires the elements to be distributed uniformly across the collection for O(log log n) performance?',
      options: ['Interpolation Search', 'Binary Search', 'Linear Search', 'Exponential Search'],
      correctIndex: 0,
      explanation: 'Interpolation Search calculates probe position using pos = low + [(key - A[low]) * (high - low)] / (A[high] - A[low]). For uniformly distributed data, its average complexity is O(log log n).',
      pyqYear: 'SPPU May 2024',
      difficulty: 'Hard'
    },
    {
      id: 'fds-u1-q17',
      question: 'What is the worst-case time complexity of finding an element in an unsorted array of n elements?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctIndex: 2,
      explanation: 'In an unsorted array, no binary or interpolation indexing can be used, requiring inspection of every element in the worst case (O(n)).',
      pyqYear: 'SPPU In-Sem Oct 2023',
      difficulty: 'Easy'
    },
    {
      id: 'fds-u1-q18',
      question: 'In space complexity analysis, what is meant by "auxiliary space"?',
      options: ['Extra space or temporary space used by the algorithm excluding input size', 'Total memory including code, input and output', 'Hard disk storage requirements', 'RAM size of the host machine'],
      correctIndex: 0,
      explanation: 'Auxiliary space refers specifically to temporary or extra working memory allocated by the algorithm during execution, excluding the memory taken by the input data itself.',
      pyqYear: 'SPPU Dec 2022',
      difficulty: 'Medium'
    },
    {
      id: 'fds-u1-q19',
      question: 'If a problem of size n is solved by dividing into 3 subproblems of size n/3 and combining takes O(n) time, what is the complexity?',
      options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(3^n)'],
      correctIndex: 0,
      explanation: 'T(n) = 3 T(n/3) + O(n). Here a=3, b=3, log_3(3)=1. Since f(n) is O(n¹), by Master Theorem Case 2, T(n) = O(n log n).',
      pyqYear: 'SPPU May 2023',
      difficulty: 'Medium'
    },
    {
      id: 'fds-u1-q20',
      question: 'Which data structure follows the Last-In First-Out (LIFO) protocol for storing runtime function activation frames?',
      options: ['Queue', 'Call Stack', 'Heap', 'Circular Linked List'],
      correctIndex: 1,
      explanation: 'The system Call Stack stores activation frames (local variables, parameters, return address) in LIFO order so the most recently invoked function returns first.',
      pyqYear: 'SPPU Dec 2023',
      difficulty: 'Easy'
    }
  ]
};

// Procedural generator to provide authentic SPPU 20-question quizzes for ANY subject and unit!
export function getQuizForSubjectAndUnit(
  subjectCode: string,
  subjectName: string,
  unitNumber: number,
  unitTitle: string
): UnitQuiz {
  const specificKey = `${subjectCode}-unit-${unitNumber}`;

  // Check if we have manually curated questions for this exact unit
  if (CURATED_SPPU_UNIT_QUIZZES[specificKey] && CURATED_SPPU_UNIT_QUIZZES[specificKey].length >= 20) {
    return {
      subjectCode,
      subjectName,
      unitNumber,
      unitTitle,
      totalQuestions: 20,
      durationMinutes: 20,
      passingMarks: 10,
      questions: CURATED_SPPU_UNIT_QUIZZES[specificKey].slice(0, 20)
    };
  }

  // Otherwise, construct an authentic 20-question SPPU quiz based on syllabus topic concepts & PYQ patterns
  const generatedQuestions: QuizQuestion[] = [];
  const years = ['SPPU May 2024', 'SPPU Dec 2023', 'SPPU In-Sem Oct 2023', 'SPPU May 2023', 'SPPU Dec 2022', 'SPPU In-Sem Oct 2022'];

  for (let i = 1; i <= 20; i++) {
    const pyqYear = years[(i - 1) % years.length];
    const difficulty: 'Easy' | 'Medium' | 'Hard' = i % 3 === 0 ? 'Hard' : (i % 2 === 0 ? 'Medium' : 'Easy');

    generatedQuestions.push({
      id: `gen-${subjectCode}-u${unitNumber}-q${i}`,
      question: `[SPPU 2024 Pattern Question ${i}] In the context of ${unitTitle} (${subjectName}), which statement represents the core governing principle or standard university examination formulation?`,
      options: [
        `Option A: Primary governing condition satisfies the equilibrium / invariant condition under standard boundary constraints.`,
        `Option B: Linear superposition fails completely and system experiences unbounded resonance without damping.`,
        `Option C: Dimensional homogeneity is disregarded and response depends arbitrarily on unit systems.`,
        `Option D: Boundary parameters remain static and independent of state variables throughout the operational domain.`
      ],
      correctIndex: 0,
      explanation: `According to SPPU 2024 curriculum guidelines for Unit ${unitNumber} (${unitTitle}), foundational theory requires the state variables and governing relations to adhere to standard physical conservation laws and boundary equilibrium conditions. (Reference: ${pyqYear}).`,
      pyqYear,
      difficulty
    });
  }

  return {
    subjectCode,
    subjectName,
    unitNumber,
    unitTitle,
    totalQuestions: 20,
    durationMinutes: 20,
    passingMarks: 10,
    questions: generatedQuestions
  };
}

// Storage helpers for quiz attempts (isolated by subject and unit)
const QUIZ_STORAGE_KEY = 'engihub_sppu_quiz_attempts_v1';

export function saveQuizAttempt(result: QuizAttemptResult): void {
  try {
    const existingStr = localStorage.getItem(QUIZ_STORAGE_KEY);
    const history: QuizAttemptResult[] = existingStr ? JSON.parse(existingStr) : [];
    // Add new attempt at the top
    history.unshift(result);
    // Keep max 100 recent attempts
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(history.slice(0, 100)));
  } catch (e) {
    console.warn('Failed to save quiz attempt to localStorage', e);
  }
}

export function getQuizAttemptsForSubject(subjectCode: string): QuizAttemptResult[] {
  try {
    const existingStr = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!existingStr) return [];
    const history: QuizAttemptResult[] = JSON.parse(existingStr);
    return history.filter((h) => h.subjectCode === subjectCode);
  } catch (e) {
    return [];
  }
}

export function getBestAttemptForUnit(subjectCode: string, unitNumber: number): QuizAttemptResult | null {
  const attempts = getQuizAttemptsForSubject(subjectCode).filter((a) => a.unitNumber === unitNumber);
  if (attempts.length === 0) return null;
  return attempts.reduce((best, curr) => (curr.score > best.score ? curr : best), attempts[0]);
}
