export interface SppuSubjectUnit {
  unitNumber: number;
  title: string;
  subtopics: string[];
  inSemFocus?: boolean; // Unit 1 & 2 are tested in 30 Marks SPPU In-Sem
  weightageMarks: number;
}

export interface SppuSubject {
  code: string;
  name: string;
  shortName: string;
  branch: string;
  semester: number;
  credits: number;
  courseType: 'Core Theory' | 'Elective' | 'Program Core' | 'Basic Science' | 'Engineering Science';
  inSemMarks: number; // 30
  endSemMarks: number; // 70
  termWorkMarks?: number;
  oralPrMarks?: number;
  description: string;
  units: SppuSubjectUnit[];
}

export const SPPU_2024_BRANCHES = [
  { code: 'CSE', name: 'Computer Engineering', icon: 'Terminal', color: 'sky' },
  { code: 'IT', name: 'Information Technology', icon: 'Code', color: 'blue' },
  { code: 'AIDS', name: 'Artificial Intelligence & Data Science', icon: 'Sparkles', color: 'purple' },
  { code: 'ECE', name: 'Electronics & Telecommunication (E&TC)', icon: 'Cpu', color: 'cyan' },
  { code: 'MECH', name: 'Mechanical Engineering', icon: 'Wrench', color: 'amber' },
  { code: 'CIVIL', name: 'Civil Engineering', icon: 'Building2', color: 'emerald' },
  { code: 'EE', name: 'Electrical Engineering', icon: 'Zap', color: 'yellow' },
  { code: 'CHEM', name: 'Chemical Engineering', icon: 'FlaskConical', color: 'rose' },
  { code: 'ROBO', name: 'Robotics & Automation', icon: 'Bot', color: 'teal' },
];

export const SPPU_2024_SUBJECTS: SppuSubject[] = [
  // ===================== FIRST YEAR (FE) - SEMESTER 1 (Common SPPU Pattern 2024 NEP) =====================
  {
    code: '107001',
    name: 'Engineering Mathematics - I',
    shortName: 'M-1',
    branch: 'COMMON',
    semester: 1,
    credits: 4,
    courseType: 'Basic Science',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'Matrices, Eigenvalues, Cayley-Hamilton Theorem, Differential Calculus, Taylor-Maclaurin Series, Partial Differentiation & Euler Theorem.',
    units: [
      {
        unitNumber: 1,
        title: 'Differential Calculus & Successive Differentiation',
        subtopics: ['Leibnitz Theorem', 'Cauchy & Lagrange Mean Value Theorems', 'Taylor and Maclaurin expansions for one variable', 'Indeterminate forms (L-Hopital Rule)'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Fourier Series & Partial Differentiation',
        subtopics: ['Periodic functions, Dirichlet conditions', 'Euler formulas for Fourier series', 'Half range sine and cosine series', 'Partial derivatives and Homogeneous functions (Euler Theorem)'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Applications of Partial Differentiation',
        subtopics: ['Total derivative & Jacobians', 'Properties of Jacobians', 'Errors and Approximations', 'Maxima and Minima of functions of two variables, Lagrange Multipliers'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Linear Algebra - Matrices & Rank',
        subtopics: ['Rank of matrix (Echelon & Normal forms)', 'System of linear equations (Homogeneous & Non-homogeneous)', 'Linear dependence and independence of vectors'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Eigenvalues & Cayley-Hamilton Theorem',
        subtopics: ['Eigenvalues & Eigenvectors', 'Properties of Eigenvalues', 'Cayley-Hamilton theorem and inverse computation', 'Diagonalization of square matrices'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Orthogonal Transformation & Quadratic Forms',
        subtopics: ['Orthogonal vectors and matrices', 'Quadratic forms reduction to canonical form', 'Rank, Index, and Signature of quadratic form'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },
  {
    code: '107002',
    name: 'Engineering Physics',
    shortName: 'Physics',
    branch: 'COMMON',
    semester: 1,
    credits: 4,
    courseType: 'Basic Science',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'Wave optics, Interference in thin films, Lasers, Optical Fibers, Quantum Mechanics, and Superconductivity.',
    units: [
      {
        unitNumber: 1,
        title: 'Wave Optics - Interference & Diffraction',
        subtopics: ['Interference in parallel thin films', 'Wedge-shaped film & Newtons rings', 'Fraunhofer diffraction at single slit', 'Diffraction grating and resolving power'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Lasers & Fiber Optics',
        subtopics: ['Absorption, Spontaneous and Stimulated emissions', 'Ruby laser and He-Ne laser', 'Optical fiber principle, Acceptance angle, NA', 'Fiber types, Attenuation & Dispersion'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Quantum Mechanics Basics',
        subtopics: ['De-Broglie hypothesis, Matter waves', 'Heisenberg uncertainty principle', 'Wave function physical significance', 'Schrodinger 1D time-independent wave equation & particle in a box'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Semiconductor Physics & Band Theory',
        subtopics: ['Intrinsic and Extrinsic semiconductors', 'Fermi level and Fermi-Dirac distribution', 'Hall effect and applications', 'Solar cells and photodetectors'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Magnetism & Superconductivity',
        subtopics: ['Dia, Para and Ferromagnetic materials', 'Hysteresis loop', 'Meissner effect and Type I & II superconductors', 'BCS theory overview and High-Tc superconductors'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Nanotechnology & Non-Destructive Testing',
        subtopics: ['Introduction to nanomaterials (quantum dots, CNTs)', 'Synthesis methods (Sol-gel, Ball milling)', 'Ultrasonic testing and pulse echo method', 'Industrial NDT applications'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },
  {
    code: '102003',
    name: 'Systems in Mechanical Engineering',
    shortName: 'SME',
    branch: 'COMMON',
    semester: 1,
    credits: 3,
    courseType: 'Engineering Science',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'Energy sources, Thermal power systems, IC engines, Automobile systems, and Modern manufacturing overview.',
    units: [
      {
        unitNumber: 1,
        title: 'Energy Sources & Thermal Power Plants',
        subtopics: ['Renewable vs Non-renewable energy', 'Steam power plant cycles (Rankine)', 'Solar, Wind, and Biomass systems', 'Boilers & Steam turbines'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Internal Combustion Engines & Refrigeration',
        subtopics: ['4-Stroke and 2-Stroke petrol & diesel engines', 'Otto and Diesel thermodynamic cycles', 'Vapor compression refrigeration system', 'Domestic refrigerators & air conditioners'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Automobile Engineering & Electric Vehicles',
        subtopics: ['Vehicle layout and transmission systems', 'Clutch, Gearbox, and Differential mechanisms', 'EV powertrain, Lithium-ion battery packs', 'Regenerative braking in hybrids'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Engineering Materials & Heat Treatment',
        subtopics: ['Ferrous & non-ferrous metals', 'Polymers, composites, and ceramics', 'Annealing, Normalizing, and Hardening', 'Mechanical properties testing'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Manufacturing Processes Overview',
        subtopics: ['Sand casting process and defects', 'Metal cutting and Lathe machine operations', 'Welding techniques (Arc, Gas, Resistance)', 'Sheet metal cutting and forming'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Smart Manufacturing & Industry 4.0',
        subtopics: ['CNC and VMC machine fundamentals', '3D Printing & Additive Manufacturing', 'Industrial Robotics basics', 'IoT in modern smart factories'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },
  {
    code: '103004',
    name: 'Basic Electrical Engineering',
    shortName: 'BEE',
    branch: 'COMMON',
    semester: 1,
    credits: 3,
    courseType: 'Engineering Science',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'DC network theorems, AC fundamentals, Magnetic circuits, Single-phase transformers, and Electrical safety.',
    units: [
      {
        unitNumber: 1,
        title: 'DC Circuit Analysis & Network Theorems',
        subtopics: ['Kirchhoffs Voltage and Current Laws (KVL & KCL)', 'Mesh analysis and Nodal analysis', 'Superposition Theorem', 'Thevenin and Norton Theorems, Max Power Transfer'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Electromagnetism & Magnetic Circuits',
        subtopics: ['MMF, Reluctance, Permeability, Flux density', 'Comparison of electric and magnetic circuits', 'Faradays laws of electromagnetic induction', 'Self and mutual inductance'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Single Phase AC Fundamentals',
        subtopics: ['Generation of sinusoidal voltage, RMS and Average values', 'Form factor and Peak factor', 'Phasor representation of AC quantities', 'R-L, R-C and R-L-C series circuits, Power factor'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Polyphase AC Circuits',
        subtopics: ['Three-phase system advantages', 'Star and Delta connection relationships', 'Line and Phase voltages/currents', 'Measurement of 3-phase power by Two-Wattmeter method'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Single Phase Transformers',
        subtopics: ['Construction and working principle', 'EMF equation and turns ratio', 'Ideal and practical transformer on no-load and load', 'Efficiency, losses, and Open-Circuit / Short-Circuit tests'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Electrical Installations & Safety',
        subtopics: ['Fuses, MCB, ELCB, and MCCB', 'Earthing systems (Pipe & Plate earthing)', 'Electric tariff and energy billing calculation', 'Electrical shock prevention and safety regulations'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },
  {
    code: '110005',
    name: 'Programming & Problem Solving',
    shortName: 'PPS',
    branch: 'COMMON',
    semester: 1,
    credits: 4,
    courseType: 'Engineering Science',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'Problem solving concepts, Python programming, Control statements, Functions, Strings, Lists, Dictionaries, and File Handling.',
    units: [
      {
        unitNumber: 1,
        title: 'Problem Solving Concepts & Python Basics',
        subtopics: ['Algorithms, Flowcharts, and Pseudocode', 'Python data types, operators and expressions', 'Input and Output formatting', 'Precedence and Associativity of operators'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Decision Making & Control Structures',
        subtopics: ['if, if-else, if-elif-else ladder', 'for and while loops, nested loops', 'break, continue, and pass statements', 'Number series generation and prime testing'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Functions, Recursion & Modules',
        subtopics: ['Defining and calling functions, default arguments', 'Scope of variables (Local, Global)', 'Recursive functions (factorial, fibonacci)', 'Standard modules: math, random, time'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Strings, Lists & Tuples',
        subtopics: ['String slicing, formatting and built-in methods', 'List operations, list comprehensions', 'Searching and sorting on lists', 'Tuples: immutability and packing/unpacking'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Sets, Dictionaries & Data Processing',
        subtopics: ['Set operations: union, intersection, difference', 'Dictionary keys, values, and items', 'Nested dictionaries and counting frequencies', 'Data cleaning basics'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'File Handling & Exception Handling',
        subtopics: ['Opening, reading, writing, and appending text files', 'CSV file operations', 'try, except, else, finally blocks', 'Custom exceptions and debugging techniques'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },

  // ===================== FIRST YEAR (FE) - SEMESTER 2 (Common SPPU Pattern 2024 NEP) =====================
  {
    code: '107007',
    name: 'Engineering Mathematics - II',
    shortName: 'M-2',
    branch: 'COMMON',
    semester: 2,
    credits: 4,
    courseType: 'Basic Science',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'Ordinary Differential Equations of first order, Applications of ODEs, Integral Calculus, Curve Tracing, Double & Triple Integrals, Beta & Gamma Functions.',
    units: [
      {
        unitNumber: 1,
        title: 'First Order & First Degree Differential Equations',
        subtopics: ['Exact differential equations & Integrating factors', 'Linear differential equations (Leibnitz form)', 'Bernoulli differential equations', 'Orthogonal trajectories'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Applications of First Order ODEs',
        subtopics: ['Newtons law of cooling', 'Natural growth and decay models (radioactivity, population)', 'Electrical circuits (L-R and R-C circuits)', 'Rectilinear motion and kinematics problems'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Integral Calculus & Special Functions',
        subtopics: ['Reduction formulae for trigonometric functions', 'Beta and Gamma functions definitions', 'Properties of Beta and Gamma functions', 'Error function and its properties'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Curve Tracing & Rectification',
        subtopics: ['Tracing of Cartesian curves (symmetry, asymptotes, origin)', 'Tracing of Polar curves (cardioid, rose curves)', 'Tracing of Parametric curves (cycloid, astroid)', 'Rectification of plane curves'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Multiple Integrals (Double Integrals)',
        subtopics: ['Double integrals evaluation in Cartesian & Polar', 'Change of order of integration', 'Area enclosed by plane curves using double integrals', 'Change of variables (Jacobian method)'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Triple Integrals & Applications',
        subtopics: ['Triple integrals evaluation in Cartesian, Cylindrical & Spherical', 'Volume computation using triple integrals', 'Center of gravity and Moment of inertia of solids'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },
  {
    code: '107009',
    name: 'Engineering Chemistry',
    shortName: 'Chemistry',
    branch: 'COMMON',
    semester: 2,
    credits: 4,
    courseType: 'Basic Science',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'Water technology and treatment, Polymer materials, Electrochemistry and corrosion science, Instrumental analytical techniques, and Fuels.',
    units: [
      {
        unitNumber: 1,
        title: 'Water Technology & Hardness Treatment',
        subtopics: ['Hardness of water (Temporary & Permanent) and units', 'EDTA titrimetric method calculation', 'Boiler troubles: scales, sludges, priming, foaming, caustic embrittlement', 'Zeolite and Ion-Exchange demineralization processes'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Instrumental Methods of Chemical Analysis',
        subtopics: ['UV-Visible spectrophotometry and Beer-Lamberts Law', 'pH metry and glass electrode', 'Conductometry and titration curves', 'Flame photometry and chromatography overview'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Engineering Materials & Polymers',
        subtopics: ['Thermoplastic vs Thermosetting polymers', 'Conducting polymers (polyaniline, polythiophene)', 'Biodegradable polymers (PLA, polycaprolactone)', 'Nanomaterials: Carbon nanotubes and Graphene'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Fuels & Combustion Technology',
        subtopics: ['Calorific value (GCV, NCV) and Bomb calorimeter', 'Proximate and Ultimate analysis of coal', 'Petroleum refining and Octane / Cetane numbers', 'Hydrogen fuel cell technology'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Spectroscopy & Molecular Structure',
        subtopics: ['Electromagnetic spectrum regions', 'Infrared (IR) spectroscopy and functional group detection', 'Nuclear Magnetic Resonance (1H-NMR) basics', 'Chemical shift and peak splitting'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Corrosion Science & Surface Engineering',
        subtopics: ['Dry and Wet (Electrochemical) corrosion mechanisms', 'Galvanic corrosion and Pitting corrosion', 'Factors influencing corrosion rates', 'Cathodic protection (Sacrificial anode & Impressed current)'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },
  {
    code: '104010',
    name: 'Basic Electronics Engineering',
    shortName: 'BXE',
    branch: 'COMMON',
    semester: 2,
    credits: 3,
    courseType: 'Engineering Science',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'Semiconductor diodes, Rectifier circuits, BJT, Op-Amps, Digital Logic Gates, Microcontrollers, and Electronic Instrumentation.',
    units: [
      {
        unitNumber: 1,
        title: 'Diodes & Applications (Pattern 2024)',
        subtopics: ['PN Junction diode V-I characteristics and Shockley equation', 'Half-wave, Full-wave center-tapped and Bridge rectifiers', 'Capacitor filter & Ripple factor derivation', 'Zener diode voltage regulator, Clipper & Clamper circuits'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Bipolar Junction Transistor (BJT) & Biasing',
        subtopics: ['BJT structure: CB, CE, CC configurations', 'Input and Output characteristics in CE mode', 'Transistor as a switch and as an amplifier', 'Voltage divider biasing circuit analysis and Q-point stability'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Linear Integrated Circuits & Op-Amps',
        subtopics: ['Ideal operational amplifier characteristics and pin configuration', 'Inverting and Non-inverting amplifier configurations', 'Summing amplifier, Difference amplifier, Voltage follower', 'Op-amp as a Comparator and Schmitt trigger'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Digital Electronics & Logic Gates',
        subtopics: ['Binary, Octal, Hexadecimal number systems and conversions', 'Boolean algebra theorems and De-Morgans Laws', 'Logic gates: AND, OR, NOT, NAND, NOR, XOR, XNOR', 'Half adder and Full adder circuits, 2:1 Multiplexer'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Electronic Instrumentation & Sensors',
        subtopics: ['Functional block diagram of measurement systems', 'Temperature sensors: RTD, Thermocouple, Thermistor, LM35', 'Optical sensors: LDR, Photodiode, Phototransistor', 'Strain gauges and Piezoelectric transducers'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Microprocessors & Microcontroller Intro',
        subtopics: ['Comparison between Microprocessor and Microcontroller', 'Arduino Uno architecture and pinout', 'Embedded systems block diagram', 'IoT architecture and sensor-to-cloud interfacing'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },
  {
    code: '101011',
    name: 'Engineering Mechanics',
    shortName: 'Mechanics',
    branch: 'COMMON',
    semester: 2,
    credits: 4,
    courseType: 'Engineering Science',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'Coplanar force systems, Equilibrium equations, Beams & Trusses, Centroid & Moment of Inertia, Kinematics and Kinetics of Particles.',
    units: [
      {
        unitNumber: 1,
        title: 'Coplanar Force Systems & Resultant',
        subtopics: ['Resolution and composition of forces, Moment of force', 'Varignons theorem of moments', 'Resultant of concurrent, parallel, and non-concurrent force systems', 'Distributed loads on beams'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Equilibrium of Rigid Bodies & Friction',
        subtopics: ['Free body diagram (FBD) principles', 'Lamis theorem and equations of equilibrium', 'Laws of dry friction, angle of repose, cone of friction', 'Ladder friction and wedge friction problems'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Centroid, Center of Gravity & Moment of Inertia',
        subtopics: ['Centroid of composite plane figures (T, I, L, C sections)', 'Parallel and Perpendicular axes theorems', 'Moment of inertia of composite lamina', 'Radius of gyration and polar moment of inertia'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Kinematics of Particles',
        subtopics: ['Rectilinear motion with constant and variable acceleration', 'x-t, v-t, and a-t graphs interpretation', 'Curvilinear motion: Cartesian and Normal-Tangential components', 'Projectile motion analysis'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Kinetics of Particles - Force & Acceleration',
        subtopics: ['Newtons second law of motion', 'DAlemberts principle and dynamic equilibrium', 'Equations of motion for rectilinear and curvilinear paths', 'Motion of connected bodies over pulleys'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Work, Energy, Impulse & Momentum',
        subtopics: ['Work of forces, spring forces, gravitational forces', 'Work-Energy principle for particle systems', 'Impulse-Momentum theorem and conservation of linear momentum', 'Direct central elastic and inelastic impacts, Coefficient of restitution'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },
  {
    code: '102012',
    name: 'Engineering Graphics',
    shortName: 'Graphics',
    branch: 'COMMON',
    semester: 2,
    credits: 3,
    courseType: 'Engineering Science',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'Orthographic projections, Isometric views, Engineering curves, Section of solids, and CAD tools.',
    units: [
      {
        unitNumber: 1,
        title: 'Engineering Curves & Conic Sections',
        subtopics: ['Ellipse by concentric circles and arc of circles methods', 'Parabola by rectangle and tangent methods', 'Hyperbola by focus-directrix method', 'Involute of circle and polygon, Cycloid and Archimedean spiral'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Orthographic Projections',
        subtopics: ['First angle and third angle projection principles', 'Front view, Top view, and Side views of 3D objects', 'Missing lines and hidden features representation', 'Dimensioning techniques and standard rules'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Isometric Projections & Views',
        subtopics: ['Isometric scale and true scale relationship', 'Isometric views of plane figures (circles, polygons)', 'Isometric views of prisms, pyramids, cylinders, cones', 'Isometric drawing of composite mechanical components'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Projections of Lines & Planes',
        subtopics: ['True length and true inclination with HP and VP', 'Traces of lines (HT and VT)', 'Projections of plane surfaces inclined to both reference planes'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Projections & Sections of Solids',
        subtopics: ['Solids with axis inclined to one reference plane and parallel to other', 'Auxiliary cutting planes (AIP & AVP)', 'Sectional views of prisms, cylinders, pyramids, and cones', 'True shape of sections'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Development of Lateral Surfaces & Computer Drafting',
        subtopics: ['Parallel line development for prisms and cylinders', 'Radial line development for pyramids and cones', 'AutoCAD 2D commands (draw, modify, layers, text)', '3D modeling basics in modern CAD packages'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },

  // ===================== SECOND YEAR (SE) COMPUTER ENGG - SEMESTER 3 (SPPU 2024 NEP) =====================
  {
    code: '210241',
    name: 'Discrete Mathematics',
    shortName: 'DM',
    branch: 'CSE',
    semester: 3,
    credits: 4,
    courseType: 'Program Core',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'Set theory, Propositional and Predicate Logic, Relations, Functions, Recurrence Relations, and Graph Theory.',
    units: [
      {
        unitNumber: 1,
        title: 'Set Theory & Mathematical Logic',
        subtopics: ['Sets, Subsets, Power sets, Venn diagrams', 'Propositional logic, Truth tables, Tautologies, Fallacies', 'Rules of Inference and Proof techniques (Direct, Contradiction, Induction)', 'First-order predicate logic with quantifiers (∀, ∃)'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Relations & Functions',
        subtopics: ['Properties of binary relations (Reflexive, Symmetric, Transitive)', 'Equivalence relations and partitions', 'Partial order relations, Posets, Hasse diagrams, Lattices', 'Function types: Injective, Surjective, Bijective, Inverses'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Combinatorics & Recurrence Relations',
        subtopics: ['Pigeonhole principle and generalized pigeonhole principle', 'Permutations and Combinations with repetitions', 'Linear recurrence relations with constant coefficients', 'Homogeneous and non-homogeneous solutions'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Graph Theory Fundamentals',
        subtopics: ['Graphs terminology, degrees, Handshaking lemma', 'Eulerian paths, Eulerian circuits, Hamiltonian cycles', 'Graph coloring and Chromatic number', 'Bipartite graphs, planar graphs and Eulers formula'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Trees & Spanning Trees',
        subtopics: ['Trees properties, rooted trees, binary trees', 'Tree traversals (Inorder, Preorder, Postorder)', 'Minimum Spanning Trees: Kruskal and Prim algorithms', 'Prefix codes and Huffman coding tree'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Algebraic Structures & Group Theory',
        subtopics: ['Semi-groups, Monoids, Groups and Abelian groups', 'Subgroups, Cosets and Lagranges theorem', 'Rings, Integral domains and Fields definitions', 'Coding theory: Hamming distance and error correcting codes'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },
  {
    code: '210242',
    name: 'Fundamentals of Data Structures',
    shortName: 'FDS',
    branch: 'CSE',
    semester: 3,
    credits: 4,
    courseType: 'Program Core',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'Arrays, Searching & Sorting algorithms, Linked Lists, Stacks, Queues, and Sparse Matrices in C/C++.',
    units: [
      {
        unitNumber: 1,
        title: 'Algorithms & Complexity Analysis',
        subtopics: ['Asymptotic notations: Big O, Omega, Theta', 'Space and Time complexity calculations', 'Recursion vs Iteration trade-offs', 'Searching: Linear search, Binary search, Sentinel search, Fibonacci search'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Sorting Algorithms & Sparse Matrices',
        subtopics: ['Bubble, Insertion, and Selection sorts', 'Quick sort and Merge sort analysis', 'Radix sort and Shell sort', 'Sparse matrix representation and fast transpose'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Linear Data Structures - Linked Lists',
        subtopics: ['Singly linked list: creation, insertion, deletion, reversal', 'Doubly linked list and Circular linked list', 'Polynomial representation and addition using linked lists', 'Generalized linked lists (GLL)'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Stacks & Applications',
        subtopics: ['Stack ADT, array and linked list implementation', 'Infix to Postfix and Prefix expression conversion', 'Postfix evaluation using stack', 'Backtracking: recursion stack, Maze problem'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Queues & Deques',
        subtopics: ['Linear queue, limitations of linear array queue', 'Circular queue implementation and boundary conditions', 'Priority queue and Double-Ended Queue (Deque)', 'Job scheduling application simulation'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Files & Storage Structures',
        subtopics: ['Sequential, Index sequential, and Random file organizations', 'File access methods and I/O buffer management', 'External sorting basics'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },
  {
    code: '210243',
    name: 'Object Oriented Programming',
    shortName: 'OOP',
    branch: 'CSE',
    semester: 3,
    credits: 3,
    courseType: 'Program Core',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'OOP paradigm, Classes, Constructors, Inheritance, Polymorphism, Virtual Functions, Templates, Exception Handling, and STL in C++.',
    units: [
      {
        unitNumber: 1,
        title: 'Principles of OOP & Class Fundamentals',
        subtopics: ['Procedural vs Object-Oriented programming paradigms', 'Encapsulation, Data abstraction, Information hiding', 'Classes, objects, access specifiers (public, private, protected)', 'Static data members and static member functions, friend functions'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Constructors, Destructors & Operator Overloading',
        subtopics: ['Default, Parameterized, and Copy constructors', 'Destructors and dynamic memory allocation (new/delete)', 'Unary and binary operator overloading', 'Overloading using member function vs friend function, type conversions'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Inheritance & Reusability',
        subtopics: ['Single, Multiple, Multilevel, Hierarchical, and Hybrid inheritance', 'Virtual base classes and diamond problem', 'Constructors execution order in derived classes', 'Overriding base class methods'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Pointers, Virtual Functions & Polymorphism',
        subtopics: ['this pointer and pointers to derived objects', 'Compile-time vs Run-time polymorphism', 'Virtual functions, Pure virtual functions, and Abstract classes', 'Virtual table (VTable) and Virtual pointer (VPTR) mechanisms'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Templates & Exception Handling',
        subtopics: ['Function templates and class templates', 'Non-type template parameters', 'Exception handling: try, throw, catch blocks', 'Multiple catch handlers, rethrowing exceptions, standard exceptions'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Standard Template Library (STL) & Streams',
        subtopics: ['STL architecture: Containers, Iterators, and Algorithms', 'Vector, List, Map, Set, Stack, Queue in STL', 'Formatted and unformatted I/O, file streams (ifstream, ofstream)', 'Serialization and binary file persistence'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },
  {
    code: '210244',
    name: 'Computer Graphics',
    shortName: 'CG',
    branch: 'CSE',
    semester: 3,
    credits: 3,
    courseType: 'Program Core',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'Scan conversion, Line/Circle algorithms, Polygon clipping, 2D/3D transformations, Projections, Shading, and Animation.',
    units: [
      {
        unitNumber: 1,
        title: 'Scan Conversion & Raster Algorithms',
        subtopics: ['DDA and Bresenham line drawing algorithms', 'Bresenham and Midpoint circle drawing algorithms', 'Character generation techniques', 'Aliasing and Antialiasing methods'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Polygon Filling & Clipping',
        subtopics: ['Inside-outside tests for polygons', 'Seed fill, Flood fill, and Scan-line polygon filling algorithms', 'Cohen-Sutherland line clipping algorithm', 'Sutherland-Hodgman polygon clipping algorithm'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: '2D Geometric Transformations',
        subtopics: ['Translation, Rotation, and Scaling matrices', 'Reflection and Shearing transformations', 'Homogeneous coordinates representation', 'Composite transformations and inverse transforms'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: '3D Transformations & Projections',
        subtopics: ['3D translation, rotation, scaling matrices', 'Parallel vs Perspective projections', 'Vanishing points and perspective anomalies', 'Viewing coordinate system and viewing pipeline'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Illumination, Shading & Visible Surface Detection',
        subtopics: ['Ambient, Diffuse, and Specular reflection models (Phong)', 'Flat shading, Gouraud shading, and Phong shading', 'Back-face removal algorithm', 'Z-buffer (Depth buffer) and Painter algorithms'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Curves, Surfaces & Computer Animation',
        subtopics: ['Bezier curves and properties, B-Spline curves', 'Fractals and fractal dimensions', 'Animation principles: morphing, kinematics, keyframing', 'OpenGL pipeline basics'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  },
  {
    code: '210245',
    name: 'Digital Electronics & Logic Design',
    shortName: 'DELD',
    branch: 'CSE',
    semester: 3,
    credits: 3,
    courseType: 'Program Core',
    inSemMarks: 30,
    endSemMarks: 70,
    description: 'K-Maps, Quine-McCluskey, Combinational circuits, Flip-Flops, Counters, Shift Registers, State machines, and ASM charts.',
    units: [
      {
        unitNumber: 1,
        title: 'Combinational Logic Optimization',
        subtopics: ['K-Maps minimization up to 5 variables (POS & SOP)', 'Don\'t care conditions in K-Maps', 'Quine-McCluskey (Tabular) minimization method', 'Hazards in combinational circuits'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 2,
        title: 'Combinational Logic Circuits Design',
        subtopics: ['Carry look-ahead adder, BCD adder', 'Code converters (Binary to Gray, Gray to Binary)', 'Multiplexers, Demultiplexers and Decoders', 'Magnitude comparators and Parity generators/checkers'],
        inSemFocus: true,
        weightageMarks: 15
      },
      {
        unitNumber: 3,
        title: 'Sequential Logic & Flip-Flops',
        subtopics: ['Latches vs Flip-Flops', 'SR, JK, D, and T flip-flops', 'Master-Slave JK flip-flop and race-around condition', 'Excitation tables and flip-flop conversions'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 4,
        title: 'Counters & Shift Registers',
        subtopics: ['Asynchronous (Ripple) counter design', 'Synchronous counter design using state diagrams', 'Ring counter and Johnson counter', 'SISO, SIPO, PISO, PIPO universal shift registers'],
        inSemFocus: false,
        weightageMarks: 18
      },
      {
        unitNumber: 5,
        title: 'Finite State Machines & Sequential Design',
        subtopics: ['Mealy vs Moore machines', 'State diagram, State table, State reduction techniques', 'Sequence detector design', 'Algorithmic State Machine (ASM) charts'],
        inSemFocus: false,
        weightageMarks: 17
      },
      {
        unitNumber: 6,
        title: 'Logic Families & Programmable Devices',
        subtopics: ['TTL, CMOS characteristics (propagation delay, fan-out, noise margin)', 'Open collector and Tri-state buffers', 'PLD architecture: PROM, PLA, and PAL', 'FPGA vs CPLD architectures'],
        inSemFocus: false,
        weightageMarks: 17
      }
    ]
  }
];

export function getSppuSubjectsForBranchAndSemester(branchCode: string, semester: number): SppuSubject[] {
  // First year FE (semesters 1 & 2) are common across all engineering branches in SPPU NEP 2024
  if (semester === 1 || semester === 2) {
    return SPPU_2024_SUBJECTS.filter((s) => s.semester === semester && s.branch === 'COMMON');
  }

  // Check matching branch or CSE fallback if specific branch data is being populated
  const directMatches = SPPU_2024_SUBJECTS.filter(
    (s) => s.semester === semester && (s.branch === branchCode || s.branch === 'COMMON')
  );

  if (directMatches.length > 0) {
    return directMatches;
  }

  // Fallback to core curriculum template for that semester with adjusted codes
  const templateSubjects = SPPU_2024_SUBJECTS.filter((s) => s.semester === 3);
  return templateSubjects.map((s) => ({
    ...s,
    branch: branchCode,
    semester: semester,
    code: `${branchCode}${semester}0${Math.floor(Math.random() * 9 + 1)}`
  }));
}
