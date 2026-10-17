import { BranchInfo } from '../types';

export const BRANCHES_DATA: BranchInfo[] = [
  {
    code: 'CSE',
    name: 'Computer Engineering',
    shortDesc: 'Algorithms, data structures, operating systems, compilers, cloud architecture, and software design.',
    iconName: 'Terminal',
    accentColor: 'sky',
    gradient: 'from-sky-500/20 to-blue-600/20 border-sky-500/30 hover:border-sky-400',
    totalNotes: 480,
    popularSubjects: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks'],
    semesters: [
      {
        semester: 1,
        subjects: [
          { code: 'CS101', name: 'Engineering Mathematics I', credits: 4, description: 'Matrices, Eigenvalues, Differential Calculus, and Taylor Series', units: ['Unit 1: Linear Algebra & Matrices', 'Unit 2: Differential Calculus', 'Unit 3: Partial Derivatives', 'Unit 4: Infinite Series & Expansions'] },
          { code: 'CS102', name: 'Programming for Problem Solving (C)', credits: 4, description: 'Variables, loops, pointers, structures, file operations and modular programming', units: ['Unit 1: Algorithms & Flowcharts', 'Unit 2: Control Flow & Loops', 'Unit 3: Functions, Arrays & Pointers', 'Unit 4: Structures, Unions & File I/O'] },
          { code: 'CS103', name: 'Engineering Physics', credits: 3, description: 'Lasers, fiber optics, quantum physics and electromagnetic theory', units: ['Unit 1: Wave Optics & Interference', 'Unit 2: Quantum Mechanics Basics', 'Unit 3: Lasers & Fiber Optics', 'Unit 4: Superconductivity & Nanotech'] },
          { code: 'CS104', name: 'Basic Electrical Engineering', credits: 3, description: 'DC circuits, AC fundamentals, magnetic circuits and single-phase transformers', units: ['Unit 1: DC Circuit Analysis & Theorems', 'Unit 2: AC Fundamentals & Phasors', 'Unit 3: Magnetic Circuits & Transformers', 'Unit 4: Electrical Machines Intro'] }
        ]
      },
      {
        semester: 2,
        subjects: [
          { code: 'CS105', name: 'Engineering Mathematics II', credits: 4, description: 'Ordinary Differential Equations, Multiple Integrals and Vector Calculus', units: ['Unit 1: First Order Differential Equations', 'Unit 2: Higher Order Linear ODEs', 'Unit 3: Multiple Integrals & Applications', 'Unit 4: Vector Differential & Integral Calculus'] },
          { code: 'CS106', name: 'Object Oriented Programming with C++', credits: 4, description: 'Classes, encapsulation, inheritance, polymorphism, templates and STL', units: ['Unit 1: Principles of OOP & Classes', 'Unit 2: Constructors, Destructors & Overloading', 'Unit 3: Inheritance & Virtual Functions', 'Unit 4: Templates, Exception Handling & STL'] },
          { code: 'CS107', name: 'Engineering Chemistry', credits: 3, description: 'Electrochemistry, polymers, water softening, fuels and spectroscopic methods', units: ['Unit 1: Water Treatment & Hardness', 'Unit 2: Polymers & Advanced Materials', 'Unit 3: Electrochemistry & Corrosion', 'Unit 4: Fuels & Combustion'] },
          { code: 'CS108', name: 'Basic Electronics Engineering', credits: 3, description: 'Semiconductor diodes, bipolar junction transistors (BJT), op-amps and digital gates', units: ['Unit 1: Diodes & Rectifier Circuits', 'Unit 2: Bipolar Junction Transistors (BJT)', 'Unit 3: Operational Amplifiers (Op-Amps)', 'Unit 4: Number Systems & Logic Gates'] }
        ]
      },
      {
        semester: 3,
        subjects: [
          { code: 'CS201', name: 'Data Structures & Algorithms', credits: 4, description: 'Stacks, queues, linked lists, trees, heaps, graphs, sorting and hashing', units: ['Unit 1: Stacks, Queues & Linked Lists', 'Unit 2: Trees, AVL & Binary Search Trees', 'Unit 3: Graphs, BFS/DFS & Shortest Paths', 'Unit 4: Sorting, Searching & Hashing Techniques'] },
          { code: 'CS202', name: 'Discrete Mathematics', credits: 4, description: 'Set theory, propositional logic, relations, recurrence relations and graph theory', units: ['Unit 1: Sets, Relations & Functions', 'Unit 2: Propositional & Predicate Logic', 'Unit 3: Combinatorics & Recurrences', 'Unit 4: Graph Theory & Algebraic Structures'] },
          { code: 'CS203', name: 'Digital Electronics & Logic Design', credits: 3, description: 'Combinational circuits, Karnaugh maps, sequential flip-flops and counters', units: ['Unit 1: Boolean Algebra & K-Maps', 'Unit 2: Combinational Logic Circuits', 'Unit 3: Flip-Flops & Registers', 'Unit 4: Synchronous & Asynchronous Counters'] },
          { code: 'CS204', name: 'Computer Organization & Architecture', credits: 4, description: 'Instruction set architectures, CPU datapath, pipelining, cache memory and I/O', units: ['Unit 1: Basic Computer Architecture & Instructions', 'Unit 2: ALU Design & Computer Arithmetic', 'Unit 3: Pipelining & Hazard Resolution', 'Unit 4: Memory Hierarchy & Cache Coherence'] }
        ]
      },
      {
        semester: 4,
        subjects: [
          { code: 'CS205', name: 'Operating Systems', credits: 4, description: 'Process management, threads, CPU scheduling, synchronization, deadlocks and virtual memory', units: ['Unit 1: Processes, Threads & System Calls', 'Unit 2: CPU Scheduling & Synchronization', 'Unit 3: Deadlock Detection & Avoidance', 'Unit 4: Virtual Memory, Paging & File Systems'] },
          { code: 'CS206', name: 'Design & Analysis of Algorithms', credits: 4, description: 'Divide and conquer, greedy methods, dynamic programming and NP-completeness', units: ['Unit 1: Asymptotic Complexity & Recurrences', 'Unit 2: Divide & Conquer and Greedy Strategy', 'Unit 3: Dynamic Programming & Backtracking', 'Unit 4: Branch and Bound, NP-Completeness'] },
          { code: 'CS207', name: 'Database Management Systems', credits: 4, description: 'Relational data model, SQL queries, ER modeling, normalization and ACID transactions', units: ['Unit 1: ER Model & Relational Algebra', 'Unit 2: SQL & Complex Joins', 'Unit 3: Normalization (1NF to BCNF)', 'Unit 4: Transactions, Concurrency & ACID'] },
          { code: 'CS208', name: 'Theory of Computation', credits: 3, description: 'Finite automata, regular expressions, context-free grammars and Turing machines', units: ['Unit 1: Finite Automata & Regular Languages', 'Unit 2: Context-Free Grammars & Pushdown Automata', 'Unit 3: Turing Machines & Computability', 'Unit 4: Decidability & Halting Problem'] }
        ]
      },
      {
        semester: 5,
        subjects: [
          { code: 'CS301', name: 'Computer Networks', credits: 4, description: 'OSI model, TCP/IP protocol suite, IP routing, congestion control and sockets', units: ['Unit 1: Data Link Layer & MAC Protocols', 'Unit 2: Network Layer & IPv4/IPv6 Routing', 'Unit 3: Transport Layer (TCP/UDP)', 'Unit 4: Application Protocols (HTTP, DNS, TLS)'] },
          { code: 'CS302', name: 'Software Engineering', credits: 3, description: 'Software development life cycle (SDLC), Agile Scrum, UML diagrams and testing', units: ['Unit 1: Software Process Models & Agile', 'Unit 2: Requirement Engineering & UML', 'Unit 3: Software Architecture & Design', 'Unit 4: Testing, Verification & Maintenance'] },
          { code: 'CS303', name: 'Compiler Design', credits: 4, description: 'Lexical analysis, syntax analysis (LL/LR parsers), semantic analysis and code generation', units: ['Unit 1: Lexical Analyzer & Lex/Flex', 'Unit 2: Syntax Analysis & Parsing (LL/LR)', 'Unit 3: Intermediate Code Generation', 'Unit 4: Code Optimization & Machine Code'] },
          { code: 'CS304', name: 'Artificial Intelligence', credits: 3, description: 'Heuristic search algorithms, knowledge representation, game playing and expert systems', units: ['Unit 1: State Space Search & Heuristics (A*)', 'Unit 2: Adversarial Search & Minimax', 'Unit 3: Knowledge Representation & Logic', 'Unit 4: Expert Systems & Uncertainty Handling'] }
        ]
      },
      {
        semester: 6,
        subjects: [
          { code: 'CS305', name: 'Cloud Computing & Distributed Systems', credits: 3, description: 'Virtualization, AWS/GCP architecture, microservices, containerization and consensus', units: ['Unit 1: Cloud Service Models (IaaS, PaaS, SaaS)', 'Unit 2: Virtualization & Containers (Docker)', 'Unit 3: Distributed Systems & Consensus', 'Unit 4: Cloud Storage, Serverless & Security'] },
          { code: 'CS306', name: 'Information & Cyber Security', credits: 3, description: 'Symmetric/asymmetric cryptography, hashing, digital certificates and penetration testing', units: ['Unit 1: Classical & Modern Ciphers (AES/RSA)', 'Unit 2: Hashes, Digital Signatures & PKI', 'Unit 3: Network Attacks & Firewalls', 'Unit 4: Web Application Security & Audits'] },
          { code: 'CS307', name: 'Web Technologies & Full Stack Dev', credits: 4, description: 'Modern JavaScript, TypeScript, React, Node.js, Express and REST APIs', units: ['Unit 1: DOM, HTML5 & Modern ES6+ JS', 'Unit 2: React Component State & Hooks', 'Unit 3: Node.js & Express REST APIs', 'Unit 4: Full Stack Deployment & Security'] }
        ]
      },
      {
        semester: 7,
        subjects: [
          { code: 'CS401', name: 'Machine Learning & Deep Learning', credits: 4, description: 'Supervised learning, CNNs, RNNs, backpropagation and model optimization', units: ['Unit 1: Regression, Classification & SVM', 'Unit 2: Decision Trees & Ensemble Methods', 'Unit 3: Deep Neural Networks & Backprop', 'Unit 4: Convolutional Neural Networks (CNN)'] },
          { code: 'CS402', name: 'Internet of Things (IoT)', credits: 3, description: 'Sensors, embedded platforms, MQTT protocol, edge computing and smart systems', units: ['Unit 1: IoT Architecture & Embedded Boards', 'Unit 2: Communication Protocols (MQTT, CoAP)', 'Unit 3: Cloud & Edge Computing for IoT', 'Unit 4: Industrial IoT Case Studies'] }
        ]
      },
      {
        semester: 8,
        subjects: [
          { code: 'CS403', name: 'Big Data Analytics', credits: 3, description: 'Hadoop ecosystem, Apache Spark, HDFS, stream processing and NoSQL databases', units: ['Unit 1: Big Data Ecosystem & HDFS', 'Unit 2: MapReduce & Apache Spark', 'Unit 3: NoSQL Databases (MongoDB, Cassandra)', 'Unit 4: Real-Time Stream Analytics'] },
          { code: 'CS404', name: 'Capstone Project & Industry Internship', credits: 8, description: 'Full-cycle engineering system design, implementation, and thesis presentation', units: ['Unit 1: Problem Formulation & Architecture', 'Unit 2: Implementation & Benchmarking', 'Unit 3: Project Defense & Thesis Report'] }
        ]
      }
    ]
  },
  {
    code: 'MECH',
    name: 'Mechanical Engineering',
    shortDesc: 'Thermodynamics, fluid mechanics, CAD/CAM, manufacturing processes, strength of materials, and robotics.',
    iconName: 'Wrench',
    accentColor: 'amber',
    gradient: 'from-amber-500/20 to-orange-600/20 border-amber-500/30 hover:border-amber-400',
    totalNotes: 390,
    popularSubjects: ['Engineering Thermodynamics', 'Fluid Mechanics', 'Strength of Materials', 'Theory of Machines'],
    semesters: [
      {
        semester: 1,
        subjects: [
          { code: 'ME101', name: 'Engineering Mathematics I', credits: 4, description: 'Calculus, linear algebra, vector calculus and differential equations', units: ['Unit 1: Matrices & Linear Systems', 'Unit 2: Differential Calculus', 'Unit 3: Integral Calculus', 'Unit 4: Vector Calculus'] },
          { code: 'ME102', name: 'Engineering Mechanics', credits: 4, description: 'Statics of particles, rigid bodies, friction, centroid, moment of inertia and dynamics', units: ['Unit 1: Coplanar Force Systems & Equilibrium', 'Unit 2: Friction & Belt Friction', 'Unit 3: Centroid & Moment of Inertia', 'Unit 4: Kinematics & Kinetics of Particles'] },
          { code: 'ME103', name: 'Engineering Physics', credits: 3, description: 'Ultrasonics, optics, laser systems and thermal physics', units: ['Unit 1: Ultrasonics & NDT Testing', 'Unit 2: Laser & Wave Optics', 'Unit 3: Thermal Properties & Laws', 'Unit 4: Modern Physics & Nanomaterials'] },
          { code: 'ME104', name: 'Basic Electrical & Electronics', credits: 3, description: 'Fundamentals of electrical circuits, transformers and semiconductor devices', units: ['Unit 1: DC & AC Circuits', 'Unit 2: Transformers & DC Motors', 'Unit 3: Diode & Transistor Basics', 'Unit 4: Measuring Instruments'] }
        ]
      },
      {
        semester: 2,
        subjects: [
          { code: 'ME105', name: 'Engineering Mathematics II', credits: 4, description: 'Ordinary differential equations, partial differential equations and Laplace transforms', units: ['Unit 1: First & Second Order ODEs', 'Unit 2: Partial Differential Equations', 'Unit 3: Laplace Transforms & Applications', 'Unit 4: Fourier Series & Transforms'] },
          { code: 'ME106', name: 'Engineering Graphics & CAD', credits: 4, description: 'Orthographic projections, isometric drawings, sectioning and 2D/3D CAD modeling', units: ['Unit 1: Conic Sections & Engineering Curves', 'Unit 2: Orthographic Projections', 'Unit 3: Isometric Projections', 'Unit 4: Section of Solids & CAD Modeling'] },
          { code: 'ME107', name: 'Engineering Chemistry', credits: 3, description: 'Lubricants, fuels, corrosion control and phase equilibria', units: ['Unit 1: Lubricants & Tribology Basics', 'Unit 2: Fuels & Combustion Analysis', 'Unit 3: Corrosion & Surface Coatings', 'Unit 4: Phase Rule & Phase Diagrams'] },
          { code: 'ME108', name: 'Workshop Practice & Manufacturing', credits: 3, description: 'Carpentry, fitting, sheet metal, welding and basic machine tool operations', units: ['Unit 1: Fitting & Carpentry Tools', 'Unit 2: Welding Processes (Arc, Gas)', 'Unit 3: Sheet Metal Working', 'Unit 4: Machine Shop Operations (Lathe)'] }
        ]
      },
      {
        semester: 3,
        subjects: [
          { code: 'ME201', name: 'Engineering Thermodynamics', credits: 4, description: 'First and Second laws of thermodynamics, entropy, Carnot cycle and Rankine cycle', units: ['Unit 1: First Law for Closed & Open Systems', 'Unit 2: Second Law & Entropy Analysis', 'Unit 3: Properties of Pure Substances & Steam', 'Unit 4: Gas Power Cycles (Otto, Diesel, Brayton)'] },
          { code: 'ME202', name: 'Strength of Materials', credits: 4, description: 'Stress-strain analysis, shear force and bending moment diagrams, torsion and deflection', units: ['Unit 1: Simple Stresses, Strains & Elastic Constants', 'Unit 2: Shear Force & Bending Moment Diagrams', 'Unit 3: Bending & Shear Stresses in Beams', 'Unit 4: Torsion of Circular Shafts & Columns'] },
          { code: 'ME203', name: 'Material Science & Metallurgy', credits: 3, description: 'Crystal structures, Fe-C phase diagram, TTT curves and heat treatment of steels', units: ['Unit 1: Crystal Structures & Imperfections', 'Unit 2: Iron-Carbon Equilibrium Diagram', 'Unit 3: Heat Treatment & TTT Diagrams', 'Unit 4: Non-Ferrous Alloys & Composites'] },
          { code: 'ME204', name: 'Manufacturing Processes I', credits: 4, description: 'Foundry casting processes, pattern making, metal forming and plastic molding', units: ['Unit 1: Sand Casting & Pattern Making', 'Unit 2: Special Casting Techniques', 'Unit 3: Bulk Deformation (Forging, Rolling)', 'Unit 4: Extrusion & Sheet Metal Forming'] }
        ]
      },
      {
        semester: 4,
        subjects: [
          { code: 'ME205', name: 'Fluid Mechanics & Machinery', credits: 4, description: 'Fluid statics, Bernoulli equation, laminar/turbulent pipe flow, turbines and pumps', units: ['Unit 1: Fluid Statics & Pressure Measurement', 'Unit 2: Fluid Kinematics & Bernoulli Equation', 'Unit 3: Flow Through Pipes & Boundary Layer', 'Unit 4: Hydraulic Turbines (Pelton, Francis) & Pumps'] },
          { code: 'ME206', name: 'Theory of Machines', credits: 4, description: 'Kinematic links, 4-bar inversions, velocity & acceleration analysis, cams and governors', units: ['Unit 1: Mechanisms & Inversions', 'Unit 2: Velocity & Acceleration Diagrams', 'Unit 3: Cam Profiles & Follower Motion', 'Unit 4: Flywheels, Governors & Gyroscopes'] },
          { code: 'ME207', name: 'Applied Thermal Engineering', credits: 3, description: 'Steam boilers, nozzles, condensers, air compressors and gas turbines', units: ['Unit 1: High Pressure Boilers & Mountings', 'Unit 2: Steam Nozzles & Condensers', 'Unit 3: Reciprocating Air Compressors', 'Unit 4: Rotary Compressors & Gas Turbines'] },
          { code: 'ME208', name: 'Manufacturing Processes II (Machining)', credits: 3, description: 'Metal cutting theory, chip formation, lathe, milling, drilling and grinding machines', units: ['Unit 1: Mechanics of Metal Cutting & Tool Wear', 'Unit 2: Lathe & Shaper Operations', 'Unit 3: Milling & Drilling Machines', 'Unit 4: Grinding & Finishing Processes'] }
        ]
      },
      {
        semester: 5,
        subjects: [
          { code: 'ME301', name: 'Heat & Mass Transfer', credits: 4, description: 'Conduction, convection, radiation, heat exchanger design and LMTD/NTU methods', units: ['Unit 1: Steady State One-Dimensional Conduction', 'Unit 2: Forced & Natural Convection', 'Unit 3: Thermal Radiation & View Factors', 'Unit 4: Heat Exchanger Design (LMTD & NTU)'] },
          { code: 'ME302', name: 'Design of Machine Elements I', credits: 4, description: 'Static/fatigue failure theories, design of shafts, keys, couplings, riveted and welded joints', units: ['Unit 1: Failure Theories & Stress Concentration', 'Unit 2: Design of Shafts, Keys & Couplings', 'Unit 3: Riveted, Welded & Bolted Joints', 'Unit 4: Design of Power Screws & Springs'] },
          { code: 'ME303', name: 'Dynamics of Machinery', credits: 4, description: 'Balancing of rotating/reciprocating masses, vibration analysis and critical speed of shafts', units: ['Unit 1: Static & Dynamic Balancing of Masses', 'Unit 2: Single Degree Freedom Free Vibrations', 'Unit 3: Damped & Forced Vibrations', 'Unit 4: Critical Speed of Shafts & Whirling'] },
          { code: 'ME304', name: 'Industrial Engineering & Management', credits: 3, description: 'Work study, ergonomics, facility layout, inventory management and quality control', units: ['Unit 1: Work Study & Method Analysis', 'Unit 2: Plant Layout & Material Handling', 'Unit 3: Inventory Models & EOQ', 'Unit 4: Total Quality Management & Six Sigma'] }
        ]
      },
      {
        semester: 6,
        subjects: [
          { code: 'ME305', name: 'Design of Machine Elements II', credits: 4, description: 'Design of spur, helical, bevel and worm gears, rolling contact and sliding contact bearings', units: ['Unit 1: Design of Spur & Helical Gears', 'Unit 2: Design of Bevel & Worm Gears', 'Unit 3: Rolling Contact Bearing Selection', 'Unit 4: Sliding Contact Hydrodynamic Bearings'] },
          { code: 'ME306', name: 'Finite Element Analysis (FEA)', credits: 3, description: '1D bar and beam elements, 2D plane stress/strain, truss analysis and FEA software modeling', units: ['Unit 1: Introduction to FEA & Weighted Residuals', 'Unit 2: 1D Bar & Truss Element Formulations', 'Unit 3: Beam Elements & Boundary Conditions', 'Unit 4: 2D Triangular Elements & Applications'] },
          { code: 'ME307', name: 'Internal Combustion (IC) Engines', credits: 3, description: '4-stroke and 2-stroke cycles, combustion kinetics, fuel injection, knocking and emission norms', units: ['Unit 1: Engine Cycles & Actual Indicator Diagrams', 'Unit 2: Carburetion & Fuel Injection Systems', 'Unit 3: Combustion in SI & CI Engines & Knock', 'Unit 4: Engine Performance, Testing & Emissions'] },
          { code: 'ME308', name: 'Metrology & Quality Control', credits: 3, description: 'Linear/angular measurement, interferometry, surface roughness, screw thread gauges and CMM', units: ['Unit 1: Linear & Angular Measurements', 'Unit 2: Comparators & Optical Metrology', 'Unit 3: Surface Roughness & Texture Measurement', 'Unit 4: Coordinate Measuring Machines (CMM)'] }
        ]
      },
      {
        semester: 7,
        subjects: [
          { code: 'ME401', name: 'Refrigeration & Air Conditioning (RAC)', credits: 4, description: 'Vapor compression cycle, refrigerants, psychrometry, cooling load calculation and ducts', units: ['Unit 1: Vapor Compression Refrigeration System', 'Unit 2: Multi-Stage Systems & Eco Refrigerants', 'Unit 3: Psychrometric Charts & Air Conditioning', 'Unit 4: Cooling Load Calculations & Duct Design'] },
          { code: 'ME402', name: 'Automobile Engineering', credits: 3, description: 'Chassis, transmission systems, steering geometry, braking, suspension and EV technology', units: ['Unit 1: Vehicle Layout, Clutches & Gearboxes', 'Unit 2: Drive Shafts, Differential & Rear Axles', 'Unit 3: Steering Geometry & Braking Systems', 'Unit 4: Electric & Hybrid Vehicle Architectures'] },
          { code: 'ME403', name: 'CAD/CAM/CAE', credits: 3, description: 'Geometric modeling (Bezier, B-spline), CNC G-code/M-code programming and automation', units: ['Unit 1: Computer Graphics & Curve Formulations', 'Unit 2: Solid Modeling & Parametric CAD', 'Unit 3: CNC Machine Tools & G-Code Programming', 'Unit 4: Flexible Manufacturing Systems (FMS)'] }
        ]
      },
      {
        semester: 8,
        subjects: [
          { code: 'ME404', name: 'Mechatronics & Industrial Robotics', credits: 3, description: 'Sensors, microcontrollers, PLC programming, robot kinematics, end-effectors and vision', units: ['Unit 1: Sensors, Transducers & Signal Conditioning', 'Unit 2: Actuators, Stepper Motors & Drives', 'Unit 3: Industrial Robotics & Forward Kinematics', 'Unit 4: PLC Programming & Industrial Automation'] },
          { code: 'ME405', name: 'Power Plant Engineering', credits: 3, description: 'Thermal, hydroelectric, nuclear and solar power plants, economics and tariff structures', units: ['Unit 1: Thermal Power Plants & Rankine Cycle', 'Unit 2: Hydroelectric & Nuclear Stations', 'Unit 3: Combined Cycle Gas Turbine Plants', 'Unit 4: Power Plant Economics & Tariffs'] },
          { code: 'ME406', name: 'Capstone Project & Industry Internship', credits: 8, description: 'Comprehensive design project, prototype fabrication, mechanical benchmarking and report', units: ['Unit 1: Engineering Design & Simulation', 'Unit 2: Prototyping & Experimental Testing', 'Unit 3: Final Viva & Documentation'] }
        ]
      }
    ]
  },
  {
    code: 'IT',
    name: 'Information Technology',
    shortDesc: 'Software architecture, cloud infrastructure, enterprise systems, web services, DevOps, and information security.',
    iconName: 'Server',
    accentColor: 'cyan',
    gradient: 'from-cyan-500/20 to-teal-600/20 border-cyan-500/30 hover:border-cyan-400',
    totalNotes: 360,
    popularSubjects: ['Database Management & SQL', 'Web Technologies', 'Cloud & DevOps Practices', 'Information Security'],
    semesters: [
      {
        semester: 1,
        subjects: [
          { code: 'IT101', name: 'Engineering Mathematics I', credits: 4, description: 'Matrices, differential calculus, infinite series and multivariable functions', units: ['Unit 1: Linear Algebra & Matrix Inverses', 'Unit 2: Differential Calculus & Mean Value Theorems', 'Unit 3: Partial Derivatives & Jacobians', 'Unit 4: Fourier Series Expansions'] },
          { code: 'IT102', name: 'Fundamentals of Programming (C)', credits: 4, description: 'Problem solving, logic constructs, pointers, modular programming and file systems', units: ['Unit 1: Program Logic & Flowcharts', 'Unit 2: Control Structures & Arrays', 'Unit 3: Functions & Pointer Arithmetic', 'Unit 4: Structures, Dynamic Allocation & Files'] },
          { code: 'IT103', name: 'Engineering Physics', credits: 3, description: 'Optics, quantum states, semiconductor physics and nanomaterial properties', units: ['Unit 1: Wave Optics & Lasers', 'Unit 2: Quantum Physics & Tunneling', 'Unit 3: Semiconductor Bands & Doping', 'Unit 4: Fiber Optics & Waveguides'] },
          { code: 'IT104', name: 'Basic Electrical & Electronics', credits: 3, description: 'Circuits, semiconductor diodes, transistors and digital gates', units: ['Unit 1: DC & AC Network Analysis', 'Unit 2: Diode Rectifiers & Regulators', 'Unit 3: Transistor Biasing & Switches', 'Unit 4: Logic Gates & Karnaugh Maps'] }
        ]
      },
      {
        semester: 2,
        subjects: [
          { code: 'IT105', name: 'Engineering Mathematics II', credits: 4, description: 'Differential equations, vector calculus, Laplace and Z-transforms', units: ['Unit 1: First & Second Order ODEs', 'Unit 2: Vector Differential Calculus', 'Unit 3: Laplace Transforms & Applications', 'Unit 4: Complex Integration Basics'] },
          { code: 'IT106', name: 'Object Oriented Programming with Java', credits: 4, description: 'Classes, JVM architecture, polymorphism, interfaces, multithreading and collections', units: ['Unit 1: Java Basics & OOP Principles', 'Unit 2: Inheritance, Interfaces & Packages', 'Unit 3: Exception Handling & Multithreading', 'Unit 4: Java Collections Framework & Generics'] },
          { code: 'IT107', name: 'Engineering Chemistry', credits: 3, description: 'Polymer chemistry, electronic materials, water treatment and corrosion', units: ['Unit 1: Water Quality & Demineralization', 'Unit 2: Conducting Polymers & Composites', 'Unit 3: Electrochemical Energy & Batteries', 'Unit 4: Nanomaterials & Green Chemistry'] },
          { code: 'IT108', name: 'Digital Principles & System Design', credits: 3, description: 'Boolean algebra, logic design, multiplexers, decoders and sequential circuits', units: ['Unit 1: Number Systems & Codes', 'Unit 2: Combinational Logic Building Blocks', 'Unit 3: Sequential Circuit Analysis (Flip-Flops)', 'Unit 4: Programmable Logic Devices & Verilog'] }
        ]
      },
      {
        semester: 3,
        subjects: [
          { code: 'IT201', name: 'Data Structures & Algorithms', credits: 4, description: 'Linear and non-linear data structures, trees, graphs, sorting and asymptotic analysis', units: ['Unit 1: Arrays, Stacks & Queues', 'Unit 2: Linked Lists & Skip Lists', 'Unit 3: Binary Trees, BST & AVL Trees', 'Unit 4: Graph Traversals & Minimum Spanning Trees'] },
          { code: 'IT202', name: 'Computer Architecture & Organization', credits: 4, description: 'CPU instruction set, pipelining, memory hierarchy and cache coherence', units: ['Unit 1: Machine Instructions & Addressing Modes', 'Unit 2: CPU Control Unit & Datapath', 'Unit 3: Memory Hierarchy, Cache & Virtual Memory', 'Unit 4: Pipelining & Multiprocessor Systems'] },
          { code: 'IT203', name: 'Discrete Structures', credits: 3, description: 'Logic, sets, relations, combinatorics, graph theory and Boolean algebras', units: ['Unit 1: Propositional & First-Order Logic', 'Unit 2: Sets, Relations & Partially Ordered Sets', 'Unit 3: Recurrence Relations & Generating Functions', 'Unit 4: Graph Theory, Trees & Spanning Forests'] },
          { code: 'IT204', name: 'Principles of Data Communication', credits: 3, description: 'Signal encoding, transmission media, multiplexing, modulation and error detection', units: ['Unit 1: Analog & Digital Transmission Basics', 'Unit 2: Transmission Media & Impairments', 'Unit 3: Multiplexing (TDM/FDM) & Spread Spectrum', 'Unit 4: Error Detection, CRC & Flow Control'] }
        ]
      },
      {
        semester: 4,
        subjects: [
          { code: 'IT205', name: 'Database Management Systems & SQL', credits: 4, description: 'Relational data model, SQL optimization, normalization, indexing and transaction processing', units: ['Unit 1: Database Architecture & Relational Model', 'Unit 2: Advanced SQL, Views & Triggers', 'Unit 3: Functional Dependencies & Normalization (1NF-BCNF)', 'Unit 4: Concurrency Control, Locking & Recovery'] },
          { code: 'IT206', name: 'Operating Systems', credits: 4, description: 'Process synchronization, thread scheduling, deadlocks, page replacement and file systems', units: ['Unit 1: Process States & Inter-Process Comm (IPC)', 'Unit 2: Scheduling Algorithms & Semaphores', 'Unit 3: Memory Management & Page Replacement', 'Unit 4: File Systems, Disk Scheduling & I/O'] },
          { code: 'IT207', name: 'Web Technologies & Frontend Frameworks', credits: 4, description: 'HTML5, CSS3, responsive layouts, modern JavaScript, asynchronous APIs and React', units: ['Unit 1: Web Architecture, Semantic HTML & CSS', 'Unit 2: Modern JavaScript (ES6+), Promises & Fetch', 'Unit 3: React Components, Props & Hooks', 'Unit 4: Frontend State Management & Responsive UI'] },
          { code: 'IT208', name: 'Software Engineering & Agile Methodologies', credits: 3, description: 'SDLC, Agile Scrum, Sprint planning, UML modeling and automated testing', units: ['Unit 1: SDLC Models & Agile Manifesto', 'Unit 2: Requirement Elicitation & User Stories', 'Unit 3: UML Class, Sequence & State Diagrams', 'Unit 4: Software Quality Assurance & Unit Testing'] }
        ]
      },
      {
        semester: 5,
        subjects: [
          { code: 'IT301', name: 'Computer Networks & Protocols', credits: 4, description: 'Network layers, IP addressing, subnetting, TCP/UDP transport, BGP and socket programming', units: ['Unit 1: Data Link Protocols & Ethernet Switching', 'Unit 2: IP Addressing, Subnetting & Routing (OSPF/BGP)', 'Unit 3: Transport Layer Reliability & Flow Control', 'Unit 4: Application Layer (DNS, HTTP/3, SMTP)'] },
          { code: 'IT302', name: 'Design & Analysis of Algorithms', credits: 4, description: 'Divide & conquer, greedy paradigms, dynamic programming, string algorithms and NP problems', units: ['Unit 1: Asymptotic Notations & Master Theorem', 'Unit 2: Greedy Algorithms & Dynamic Programming', 'Unit 3: String Matching (KMP, Rabin-Karp)', 'Unit 4: NP-Complete & NP-Hard Problems'] },
          { code: 'IT303', name: 'Cloud Computing & DevOps Practices', credits: 4, description: 'Cloud infrastructure (AWS/GCP), Docker containerization, Kubernetes, CI/CD pipelines', units: ['Unit 1: Cloud Architecture, IaaS, PaaS & SaaS', 'Unit 2: Containerization with Docker & Docker Compose', 'Unit 3: Kubernetes Clusters, Pods & Services', 'Unit 4: CI/CD Pipelines (GitHub Actions/Jenkins)'] },
          { code: 'IT304', name: 'Information Security & Cryptography', credits: 3, description: 'Symmetric/asymmetric encryption, SHA-256 hashes, digital signatures, PKI and threat modeling', units: ['Unit 1: Mathematical Foundations & Classical Ciphers', 'Unit 2: Modern Ciphers (AES, DES & RSA)', 'Unit 3: Hash Functions, MACs & Digital Signatures', 'Unit 4: Network Security, Firewalls & VPNs'] }
        ]
      },
      {
        semester: 6,
        subjects: [
          { code: 'IT305', name: 'Full Stack Web Development & Node.js', credits: 4, description: 'Node.js event loop, Express REST APIs, JWT authentication, MongoDB and full-stack deployment', units: ['Unit 1: Node.js Architecture & Asynchronous I/O', 'Unit 2: Express Routing, Middleware & Controllers', 'Unit 3: MongoDB & Mongoose Schema Design', 'Unit 4: JWT Authentication, WebSockets & Hosting'] },
          { code: 'IT306', name: 'Data Warehousing & Data Mining', credits: 3, description: 'ETL pipelines, star/snowflake schemas, OLAP cubes, association rules and clustering', units: ['Unit 1: Data Warehousing Concepts & Star Schemas', 'Unit 2: ETL Pipelines & Data Cleaning', 'Unit 3: Association Rule Mining (Apriori)', 'Unit 4: Classification & Clustering Algorithms'] },
          { code: 'IT307', name: 'Mobile Application Development', credits: 3, description: 'Android/iOS app lifecycle, UI components, state management, storage and REST integration', units: ['Unit 1: Mobile UI Design & Layouts', 'Unit 2: Activity Lifecycle & Navigation', 'Unit 3: Local Storage (SQLite/Room) & Caching', 'Unit 4: REST API Integration & App Publishing'] }
        ]
      },
      {
        semester: 7,
        subjects: [
          { code: 'IT401', name: 'Machine Learning for IT Systems', credits: 4, description: 'Supervised/unsupervised algorithms, scikit-learn pipelines, anomaly detection and NLP', units: ['Unit 1: Supervised Learning (Regression, Trees, SVM)', 'Unit 2: Unsupervised Clustering & Dimensionality Reduction', 'Unit 3: Anomaly Detection in Network Traffic', 'Unit 4: NLP Fundamentals for Text Processing'] },
          { code: 'IT402', name: 'Cyber Forensics & IT Law', credits: 3, description: 'Digital evidence collection, disk imaging, memory forensics, chain of custody and cyber laws', units: ['Unit 1: Digital Forensics Principles & Evidence Rules', 'Unit 2: File System & Disk Imaging Techniques', 'Unit 3: Network & Memory Forensics', 'Unit 4: Cyber Law, IT Act & Ethical Frameworks'] }
        ]
      },
      {
        semester: 8,
        subjects: [
          { code: 'IT403', name: 'Distributed Systems & Enterprise Architecture', credits: 3, description: 'Remote procedure calls, message queues (Kafka), microservices design and consensus', units: ['Unit 1: RPC, gRPC & Message Brokers (Kafka)', 'Unit 2: Microservices Architecture & API Gateways', 'Unit 3: Distributed Consensus (Paxos/Raft)', 'Unit 4: High Availability & Fault Tolerance'] },
          { code: 'IT404', name: 'Capstone Project & Industry Internship', credits: 8, description: 'Full software product engineering, cloud deployment, load testing and defense report', units: ['Unit 1: Architecture Blueprint & Tech Stack Selection', 'Unit 2: Sprint Implementation & Integration Testing', 'Unit 3: Performance Benchmarking & Viva Defense'] }
        ]
      }
    ]
  },
  {
    code: 'AIDS',
    name: 'AI & Data Science',
    shortDesc: 'Machine learning, statistics, deep neural networks, computer vision, natural language processing, and MLOps.',
    iconName: 'Brain',
    accentColor: 'rose',
    gradient: 'from-rose-500/20 to-pink-600/20 border-rose-500/30 hover:border-rose-400',
    totalNotes: 340,
    popularSubjects: ['Deep Learning & Neural Networks', 'Natural Language Processing', 'Machine Learning Algorithms', 'Computer Vision'],
    semesters: [
      {
        semester: 1,
        subjects: [
          { code: 'AD101', name: 'Engineering Mathematics I', credits: 4, description: 'Calculus, matrices, linear transformations and Taylor series', units: ['Unit 1: Matrices, Rank & Eigenvalues', 'Unit 2: Differential Calculus', 'Unit 3: Multivariable Calculus', 'Unit 4: Series & Expansions'] },
          { code: 'AD102', name: 'Python Programming for AI', credits: 4, description: 'Data structures, functions, OOP, NumPy, Pandas and visualization', units: ['Unit 1: Python Basics & Control Structures', 'Unit 2: Data Structures & Functional Programming', 'Unit 3: NumPy Array Computing', 'Unit 4: Pandas for Data Wrangling'] },
          { code: 'AD103', name: 'Engineering Physics', credits: 3, description: 'Quantum computing fundamentals, optics and electromagnetic theory', units: ['Unit 1: Quantum Physics & Probability Waves', 'Unit 2: Semiconductor Physics & Band Gaps', 'Unit 3: Lasers & Optical Computing', 'Unit 4: Nanoelectronics & Qubits'] },
          { code: 'AD104', name: 'Basic Electrical & Digital Electronics', credits: 3, description: 'Circuits, logic gates, combinational logic and binary arithmetic', units: ['Unit 1: Circuit Laws & Analysis', 'Unit 2: Logic Gates & Boolean Algebra', 'Unit 3: Combinational Logic & Adders', 'Unit 4: Sequential Logic & Registers'] }
        ]
      },
      {
        semester: 2,
        subjects: [
          { code: 'AD105', name: 'Engineering Mathematics II', credits: 4, description: 'Vector calculus, differential equations and numerical approximations', units: ['Unit 1: Differential Equations & Applications', 'Unit 2: Vector Calculus & Gradient Fields', 'Unit 3: Laplace Transforms', 'Unit 4: Numerical Methods & Optimization'] },
          { code: 'AD106', name: 'Object Oriented Programming with C++/Java', credits: 4, description: 'OOP concepts, design patterns, memory management and data collections', units: ['Unit 1: Encapsulation & Classes', 'Unit 2: Inheritance & Polymorphism', 'Unit 3: Exception Handling & Generics', 'Unit 4: Standard Library Collections'] },
          { code: 'AD107', name: 'Discrete Mathematical Structures', credits: 3, description: 'Sets, graph theory, combinatorics, proof methods and recurrence relations', units: ['Unit 1: Propositional & Predicate Calculus', 'Unit 2: Sets, Relations & Lattices', 'Unit 3: Graph Theory & Spanning Trees', 'Unit 4: Combinatorics & Recurrences'] },
          { code: 'AD108', name: 'Data Visualization & Storytelling', credits: 3, description: 'Matplotlib, Seaborn, Plotly, dashboard design and exploratory data analysis', units: ['Unit 1: Principles of Data Visualization', 'Unit 2: Matplotlib & Seaborn Charting', 'Unit 3: Interactive Dashboards (Plotly/Dash)', 'Unit 4: Exploratory Data Analysis (EDA)'] }
        ]
      },
      {
        semester: 3,
        subjects: [
          { code: 'AD201', name: 'Applied Linear Algebra & Statistics', credits: 4, description: 'Vector spaces, SVD, PCA, probability distributions, hypothesis testing and Bayes theorem', units: ['Unit 1: Vector Spaces, SVD & PCA', 'Unit 2: Probability & Random Variables', 'Unit 3: Sampling Distributions & Central Limit Theorem', 'Unit 4: Hypothesis Testing & ANOVA'] },
          { code: 'AD202', name: 'Data Structures & Algorithms in Python', credits: 4, description: 'Trees, balanced search trees, priority queues, graphs, sorting and dynamic programming', units: ['Unit 1: Complexity Analysis, Stacks & Queues', 'Unit 2: Trees, Heaps & Priority Queues', 'Unit 3: Graph Algorithms (Dijkstra, Kruskal)', 'Unit 4: Dynamic Programming & Greedy Algorithms'] },
          { code: 'AD203', name: 'Database Management Systems & SQL', credits: 4, description: 'Relational data model, SQL queries, normalization, indexing and NoSQL databases', units: ['Unit 1: ER Modeling & Relational Algebra', 'Unit 2: SQL Complex Queries & Triggers', 'Unit 3: Normalization (1NF to BCNF)', 'Unit 4: NoSQL Databases (MongoDB, Cassandra)'] },
          { code: 'AD204', name: 'Computer Architecture & Systems', credits: 3, description: 'Processor organization, memory hierarchies, GPU architecture and SIMD computing', units: ['Unit 1: CPU Architecture & Instruction Formats', 'Unit 2: Memory Hierarchy & Cache Performance', 'Unit 3: GPU Parallel Computing Architecture', 'Unit 4: SIMD & Tensor Hardware Acceleration'] }
        ]
      },
      {
        semester: 4,
        subjects: [
          { code: 'AD205', name: 'Machine Learning Algorithms', credits: 4, description: 'Supervised, unsupervised, ensemble methods, gradient boosting and hyperparameter tuning', units: ['Unit 1: Linear & Logistic Regression', 'Unit 2: Decision Trees, Random Forests & XGBoost', 'Unit 3: Support Vector Machines & Kernel Methods', 'Unit 4: Clustering (K-Means, DBSCAN) & Model Evaluation'] },
          { code: 'AD206', name: 'Operating Systems & System Programming', credits: 4, description: 'Process scheduling, threads, virtual memory, concurrent programming and shell scripting', units: ['Unit 1: Processes, Threads & Concurrency', 'Unit 2: CPU Scheduling & Synchronization', 'Unit 3: Memory Management & Paging', 'Unit 4: File Systems & Linux Shell Scripting'] },
          { code: 'AD207', name: 'Data Warehousing & Mining', credits: 3, description: 'ETL pipelines, association rule mining, Apriori algorithm and OLAP architectures', units: ['Unit 1: Data Preprocessing & Cleaning', 'Unit 2: Data Warehouse Architecture & Star Schemas', 'Unit 3: Association Rule Mining (Apriori/FP-Growth)', 'Unit 4: Advanced Classification & Clustering'] },
          { code: 'AD208', name: 'Design & Analysis of Algorithms', credits: 3, description: 'Divide & conquer, greedy strategy, dynamic programming and NP-completeness', units: ['Unit 1: Asymptotic Complexities & Recurrence', 'Unit 2: Divide & Conquer Strategies', 'Unit 3: Dynamic Programming Approaches', 'Unit 4: Complexity Classes (P, NP, NP-Complete)'] }
        ]
      },
      {
        semester: 5,
        subjects: [
          { code: 'AD301', name: 'Deep Learning & Neural Networks', credits: 4, description: 'Multi-layer perceptrons, backpropagation, CNNs, RNNs, LSTMs and attention mechanisms', units: ['Unit 1: Feedforward Neural Networks & Backprop', 'Unit 2: Optimization (Adam, RMSProp) & Regularization', 'Unit 3: Convolutional Neural Networks (CNNs)', 'Unit 4: Recurrent Neural Networks (RNNs) & Transformers'] },
          { code: 'AD302', name: 'Natural Language Processing (NLP)', credits: 3, description: 'Tokenization, Word2Vec, BERT, transformer models, sentiment analysis and LLMs', units: ['Unit 1: Text Preprocessing & N-Grams', 'Unit 2: Word Embeddings (Word2Vec, GloVe)', 'Unit 3: Sequence Tagging & Transformer Models', 'Unit 4: Large Language Models (LLM) & Prompting'] },
          { code: 'AD303', name: 'Cloud Infrastructure for AI & Big Data', credits: 4, description: 'Hadoop, Spark dataframes, distributed training, cloud GPU instances and ML pipelines', units: ['Unit 1: Big Data Fundamentals & HDFS', 'Unit 2: Apache Spark DataFrames & Spark SQL', 'Unit 3: Distributed Deep Learning Training', 'Unit 4: Cloud ML Platforms (Vertex AI/AWS SageMaker)'] },
          { code: 'AD304', name: 'Optimization Techniques in Machine Learning', credits: 3, description: 'Convex optimization, gradient descent variants, Lagrange multipliers and duality', units: ['Unit 1: Convex Sets, Functions & Gradients', 'Unit 2: Stochastic Gradient Descent (SGD) Variants', 'Unit 3: Constrained Optimization & KKT Conditions', 'Unit 4: Non-Convex Optimization & Heuristics'] }
        ]
      },
      {
        semester: 6,
        subjects: [
          { code: 'AD305', name: 'Computer Vision & Image Processing', credits: 4, description: 'Image filtering, edge detection, feature extraction, object detection (YOLO) and segmentation', units: ['Unit 1: Image Representation & Spatial Filtering', 'Unit 2: Feature Detectors (SIFT, ORB, Harris)', 'Unit 3: Object Detection (YOLO, Faster R-CNN)', 'Unit 4: Semantic & Instance Segmentation'] },
          { code: 'AD306', name: 'MLOps & Model Deployment', credits: 3, description: 'Model versioning, Dockerization, FastAPI microservices, MLflow, CI/CD and drift monitoring', units: ['Unit 1: MLOps Principles & MLflow Tracking', 'Unit 2: FastAPI & Serving REST Endpoints', 'Unit 3: Docker Containers & Kubernetes for ML', 'Unit 4: Model Drift, Monitoring & CI/CD Pipelines'] },
          { code: 'AD307', name: 'Reinforcement Learning', credits: 3, description: 'Markov decision processes, Q-learning, deep Q-networks (DQN), policy gradients and robotics', units: ['Unit 1: Markov Decision Processes & Bellman Equations', 'Unit 2: Dynamic Programming & Monte Carlo Methods', 'Unit 3: Temporal Difference & Q-Learning', 'Unit 4: Deep Q-Networks (DQN) & Policy Gradients'] }
        ]
      },
      {
        semester: 7,
        subjects: [
          { code: 'AD401', name: 'Generative AI & Large Language Models', credits: 4, description: 'Diffusion models, GANs, autoencoders, LLM fine-tuning, LoRA, RAG and agents', units: ['Unit 1: Variational Autoencoders & GANs', 'Unit 2: Diffusion Models & Image Synthesis', 'Unit 3: LLM Architecture, LoRA & Fine-Tuning', 'Unit 4: Retrieval-Augmented Generation (RAG) & Agents'] },
          { code: 'AD402', name: 'AI Ethics, Privacy & Governance', credits: 3, description: 'Algorithmic bias, explainable AI (XAI - SHAP/LIME), differential privacy and AI regulation', units: ['Unit 1: Fairness, Accountability & Bias in AI', 'Unit 2: Explainable AI (SHAP, LIME)', 'Unit 3: Differential Privacy & Federated Learning', 'Unit 4: Global AI Governance & Safety Standards'] }
        ]
      },
      {
        semester: 8,
        subjects: [
          { code: 'AD403', name: 'Edge AI & Embedded Intelligence', credits: 3, description: 'Model quantization, pruning, TensorRT, edge accelerators and deployment on edge devices', units: ['Unit 1: Edge Computing & Hardware Constraints', 'Unit 2: Model Quantization & Pruning Techniques', 'Unit 3: TensorRT & ONNX Runtime Optimization', 'Unit 4: Microcontroller & IoT Edge Deployment'] },
          { code: 'AD404', name: 'Capstone AI Project & Thesis', credits: 8, description: 'End-to-end AI/ML application research, benchmarking, deployment and defense report', units: ['Unit 1: Research Problem & Literature Survey', 'Unit 2: Model Architecture & Empirical Evaluation', 'Unit 3: Production Deployment & Viva Defense'] }
        ]
      }
    ]
  },
  {
    code: 'ECE',
    name: 'Electronics & Telecommunication',
    shortDesc: 'Signals & systems, digital communications, VLSI design, microcontrollers, embedded systems, and RF.',
    iconName: 'Cpu',
    accentColor: 'indigo',
    gradient: 'from-indigo-500/20 to-violet-600/20 border-indigo-500/30 hover:border-indigo-400',
    totalNotes: 320,
    popularSubjects: ['Signals & Systems', 'Digital Signal Processing', 'Microprocessors & Microcontrollers', 'VLSI Design'],
    semesters: [
      {
        semester: 1,
        subjects: [
          { code: 'EC101', name: 'Engineering Mathematics I', credits: 4, description: 'Linear algebra, calculus and differential equations', units: ['Unit 1: Matrices & Eigenvalues', 'Unit 2: Differential Calculus', 'Unit 3: Partial Derivatives', 'Unit 4: Series Expansions'] },
          { code: 'EC102', name: 'Electronic Devices & Circuits', credits: 4, description: 'Semiconductor physics, PN junction diodes, Zener diodes, BJTs and FETs', units: ['Unit 1: Semiconductor Diodes & Physics', 'Unit 2: Diode Rectifiers & Regulators', 'Unit 3: Bipolar Junction Transistors (BJT)', 'Unit 4: Field Effect Transistors (FET)'] },
          { code: 'EC103', name: 'Engineering Physics', credits: 3, description: 'Wave optics, lasers, fiber optics and quantum mechanics', units: ['Unit 1: Interference & Diffraction', 'Unit 2: Lasers & Optical Fiber Waves', 'Unit 3: Quantum Mechanics Intro', 'Unit 4: Solid State Physics'] },
          { code: 'EC104', name: 'Basic Electrical Engineering', credits: 3, description: 'DC circuits, AC analysis, magnetic circuits and single-phase transformers', units: ['Unit 1: Circuit Theorems', 'Unit 2: Single Phase AC Circuits', 'Unit 3: Three Phase Circuits', 'Unit 4: Transformers & DC Motors'] }
        ]
      },
      {
        semester: 2,
        subjects: [
          { code: 'EC105', name: 'Engineering Mathematics II', credits: 4, description: 'Ordinary differential equations, vector calculus and Laplace transforms', units: ['Unit 1: First & Second Order ODEs', 'Unit 2: Vector Calculus & Theorems', 'Unit 3: Laplace Transforms', 'Unit 4: Fourier Series'] },
          { code: 'EC106', name: 'Programming in C & Data Structures', credits: 4, description: 'Arrays, pointers, linked lists, stacks, queues and sorting algorithms', units: ['Unit 1: C Pointers & Structures', 'Unit 2: Stacks & Queues', 'Unit 3: Linked Lists', 'Unit 4: Searching & Sorting'] },
          { code: 'EC107', name: 'Engineering Chemistry', credits: 3, description: 'Polymers, electrochemistry, semiconductors and corrosion control', units: ['Unit 1: Water Quality Analysis', 'Unit 2: Electrochemistry & Cells', 'Unit 3: Electronic Polymers', 'Unit 4: Corrosion Prevention'] },
          { code: 'EC108', name: 'Engineering Graphics & PCB Design', credits: 3, description: 'Engineering drawing, orthographic projection and schematic PCB layout tools', units: ['Unit 1: Engineering Curves', 'Unit 2: Orthographic Projections', 'Unit 3: Isometric Drawings', 'Unit 4: PCB Schematic & Layout'] }
        ]
      },
      {
        semester: 3,
        subjects: [
          { code: 'EC201', name: 'Signals & Systems', credits: 4, description: 'Continuous & discrete time signals, LTI systems, Fourier series, Laplace and Z-transforms', units: ['Unit 1: Classification of Signals & Systems', 'Unit 2: LTI Systems & Convolution', 'Unit 3: Continuous-Time Fourier Transform (CTFT)', 'Unit 4: Z-Transform & ROC Analysis'] },
          { code: 'EC202', name: 'Network Theory', credits: 4, description: 'Mesh & nodal analysis, Thevenin/Norton theorems, transient response and two-port networks', units: ['Unit 1: Network Topology & Circuit Theorems', 'Unit 2: Transient Analysis of RL, RC & RLC', 'Unit 3: Two-Port Network Parameters (Z, Y, ABCD, h)', 'Unit 4: Resonant Circuits & Filters'] },
          { code: 'EC203', name: 'Analog Circuits', credits: 4, description: 'Small-signal BJT/FET amplifiers, feedback topologies, oscillators and operational amplifiers', units: ['Unit 1: BJT Small Signal Models (h-parameters)', 'Unit 2: Feedback Amplifiers & Stability', 'Unit 3: Sinusoidal Oscillators (Wien-Bridge, Colpitts)', 'Unit 4: Op-Amp Applications (Inverting, Non-Inverting, Active Filters)'] },
          { code: 'EC204', name: 'Digital System Design', credits: 3, description: 'Combinational logic, Karnaugh maps, sequential circuits, finite state machines and Verilog', units: ['Unit 1: Boolean Minimization & Logic Gates', 'Unit 2: Combinational Logic (Mux, Decoder, Adders)', 'Unit 3: Flip-Flops, Registers & Counters', 'Unit 4: Finite State Machines & Verilog Intro'] }
        ]
      },
      {
        semester: 4,
        subjects: [
          { code: 'EC205', name: 'Electromagnetic Field Theory', credits: 4, description: 'Maxwell equations, electrostatics, magnetostatics, electromagnetic waves and transmission lines', units: ['Unit 1: Electrostatic Fields & Gauss Law', 'Unit 2: Magnetostatics & Biot-Savart Law', 'Unit 3: Time-Varying Fields & Maxwell Equations', 'Unit 4: Wave Propagation & Transmission Lines'] },
          { code: 'EC206', name: 'Analog Communication', credits: 4, description: 'AM, FM, PM modulation, demodulation techniques, noise analysis and superheterodyne receivers', units: ['Unit 1: Amplitude Modulation (DSB-SC, SSB, VSB)', 'Unit 2: Frequency & Phase Modulation (NBFM, WBFM)', 'Unit 3: Noise in Communication Systems (SNR, Noise Figure)', 'Unit 4: Radio Receivers & Superheterodyne Principles'] },
          { code: 'EC207', name: 'Linear Integrated Circuits', credits: 3, description: 'Op-amp characteristics, comparators, 555 timer, phase locked loops (PLL) and DAC/ADC converters', units: ['Unit 1: Op-Amp Internal Architecture & Non-Idealities', 'Unit 2: Comparators, Schmitt Triggers & Voltage Regulators', 'Unit 3: 555 Timer Astable/Monostable & PLL', 'Unit 4: D/A & A/D Converters (Flash, Successive Approx)'] },
          { code: 'EC208', name: 'Microprocessors (8086) & Assembly', credits: 3, description: '8086 architecture, memory segmentation, assembly language programming and peripheral interfacing', units: ['Unit 1: 8086 Architecture & Register Organization', 'Unit 2: Instruction Set & Assembly Programming', 'Unit 3: Memory & I/O Interfacing', 'Unit 4: Programmable Peripheral Interface (8255)'] }
        ]
      },
      {
        semester: 5,
        subjects: [
          { code: 'EC301', name: 'Digital Signal Processing (DSP)', credits: 4, description: 'DFT, FFT algorithms, FIR/IIR filter design, bilinear transformation and DSP processors', units: ['Unit 1: Discrete Fourier Transform (DFT) & Properties', 'Unit 2: Fast Fourier Transform (FFT Decimation)', 'Unit 3: IIR Filter Design (Butterworth, Chebyshev)', 'Unit 4: FIR Filter Design (Windowing Techniques)'] },
          { code: 'EC302', name: 'Digital Communication', credits: 4, description: 'Sampling, PCM, DPCM, digital modulation (ASK, FSK, PSK, QAM) and error control coding', units: ['Unit 1: Sampling Theorem & Pulse Code Modulation (PCM)', 'Unit 2: Digital Modulation Schemes (BPSK, QPSK, QAM)', 'Unit 3: Optimum Receivers & Matched Filters', 'Unit 4: Error Control Codes (Linear Block & Convolutional)'] },
          { code: 'EC303', name: 'Microcontrollers & Embedded Systems (ARM)', credits: 4, description: '8051 and ARM Cortex architecture, timers, serial communication, GPIO and embedded C', units: ['Unit 1: 8051 & ARM Cortex-M Architecture', 'Unit 2: Timers, Interrupts & Serial Communication (UART)', 'Unit 3: Embedded C Programming & IDEs', 'Unit 4: Interfacing Sensors, LCDs & Motor Drivers'] },
          { code: 'EC304', name: 'Antenna & Wave Propagation', credits: 3, description: 'Dipole radiation, antenna parameters, antenna arrays, microstrip patch and ionospheric propagation', units: ['Unit 1: Radiation Principles & Antenna Parameters', 'Unit 2: Half-Wave Dipole & Loop Antennas', 'Unit 3: Antenna Arrays (Broadside & End-Fire)', 'Unit 4: Ground Wave, Sky Wave & Space Wave Propagation'] }
        ]
      },
      {
        semester: 6,
        subjects: [
          { code: 'EC305', name: 'VLSI Design & Verilog HDL', credits: 4, description: 'CMOS transistor theory, inverter characteristics, layout design rules, Verilog synthesis and FPGA', units: ['Unit 1: MOS Transistor Theory & IV Curves', 'Unit 2: CMOS Inverter Characteristics & Delay', 'Unit 3: Combinational & Sequential Logic in Verilog', 'Unit 4: Physical Layout Rules & FPGA Architecture'] },
          { code: 'EC306', name: 'Microwave & Radar Engineering', credits: 3, description: 'Waveguides, cavity resonators, klystron, magnetron, radar range equation and Doppler radar', units: ['Unit 1: Rectangular & Circular Waveguides', 'Unit 2: Microwave Passive Devices (Tees, Isolators)', 'Unit 3: Microwave Tubes (Klystron, TWT, Magnetron)', 'Unit 4: Radar Range Equation & MTI Radar'] },
          { code: 'EC307', name: 'Wireless & Mobile Communication', credits: 3, description: 'Cellular concept, frequency reuse, handoff, fading channels, CDMA, LTE and 5G overview', units: ['Unit 1: Cellular Concepts & Capacity Expansion', 'Unit 2: Mobile Radio Propagation & Multipath Fading', 'Unit 3: Multiple Access Schemes (TDMA, CDMA, OFDMA)', 'Unit 4: 4G LTE & 5G NR Architecture'] }
        ]
      },
      {
        semester: 7,
        subjects: [
          { code: 'EC401', name: 'Optical Fiber Communication', credits: 4, description: 'Optical fibers, attenuation, dispersion, laser sources, PIN/APD detectors and WDM systems', units: ['Unit 1: Optical Fiber Structures & Waveguiding', 'Unit 2: Signal Degradation (Attenuation & Dispersion)', 'Unit 3: Optical Sources (LED/Laser) & Detectors (PIN/APD)', 'Unit 4: Optical Link Design & WDM Networks'] },
          { code: 'EC402', name: 'Embedded IoT Systems & Protocols', credits: 3, description: 'ESP32, Raspberry Pi, MQTT, CoAP, wireless sensor networks and smart IoT applications', units: ['Unit 1: Embedded IoT Hardware (ESP32/RPi)', 'Unit 2: IoT Communication Protocols (MQTT, CoAP)', 'Unit 3: Cloud Platforms & Sensor Interfacing', 'Unit 4: Edge Processing & Smart City Applications'] }
        ]
      },
      {
        semester: 8,
        subjects: [
          { code: 'EC403', name: 'Satellite & Space Communication', credits: 3, description: 'Orbital mechanics, link budget, earth station equipment, transponders and GPS navigation', units: ['Unit 1: Orbital Mechanics & Satellite Launching', 'Unit 2: Satellite Subsystems & Transponders', 'Unit 3: Link Budget Design (C/N, G/T)', 'Unit 4: GPS, GLONASS & NavIC Systems'] },
          { code: 'EC404', name: 'Capstone Engineering Project', credits: 8, description: 'Full system hardware/software integration, simulation, PCB fabrication and thesis report', units: ['Unit 1: System Specifications & Circuit Simulation', 'Unit 2: Hardware Prototype & Testing', 'Unit 3: Project Presentation & Documentation'] }
        ]
      }
    ]
  },
  {
    code: 'EEE',
    name: 'Electrical Engineering',
    shortDesc: 'Power systems, electrical machines, power electronics, control theory, switchgear, and electric drives.',
    iconName: 'Zap',
    accentColor: 'yellow',
    gradient: 'from-amber-500/20 to-yellow-600/20 border-yellow-500/30 hover:border-yellow-400',
    totalNotes: 290,
    popularSubjects: ['Control Systems', 'Electrical Machines', 'Power System Analysis', 'Power Electronics'],
    semesters: [
      {
        semester: 1,
        subjects: [
          { code: 'EE101', name: 'Engineering Mathematics I', credits: 4, description: 'Calculus, linear algebra and differential equations', units: ['Unit 1: Matrices & Eigenvalues', 'Unit 2: Differential Calculus', 'Unit 3: Multivariable Calculus', 'Unit 4: Vector Calculus'] },
          { code: 'EE102', name: 'Basic Electrical Engineering', credits: 4, description: 'DC circuits, AC circuits, magnetic circuits and single-phase transformers', units: ['Unit 1: Circuit Theorems (Thevenin, Norton, Superposition)', 'Unit 2: AC Fundamentals & Three Phase Circuits', 'Unit 3: Magnetic Circuits & Induction', 'Unit 4: Transformers & Electrical Safety'] },
          { code: 'EE103', name: 'Engineering Physics', credits: 3, description: 'Electromagnetics, quantum physics, lasers and solid state materials', units: ['Unit 1: Electromagnetic Fields', 'Unit 2: Lasers & Fiber Optics', 'Unit 3: Quantum Mechanics', 'Unit 4: Magnetic & Superconducting Materials'] },
          { code: 'EE104', name: 'Engineering Mechanics', credits: 3, description: 'Statics, dynamics, friction and moments of inertia', units: ['Unit 1: Coplanar Forces & Equilibrium', 'Unit 2: Friction & Moments of Inertia', 'Unit 3: Kinematics of Particles', 'Unit 4: Kinetics & Work-Energy'] }
        ]
      },
      {
        semester: 2,
        subjects: [
          { code: 'EE105', name: 'Engineering Mathematics II', credits: 4, description: 'ODEs, vector integration, Laplace transforms and Fourier series', units: ['Unit 1: Linear Differential Equations', 'Unit 2: Vector Integration (Gauss, Stokes)', 'Unit 3: Laplace Transforms & Applications', 'Unit 4: Fourier Series Expansions'] },
          { code: 'EE106', name: 'Basic Electronics Engineering', credits: 4, description: 'Diodes, BJTs, Op-Amps, rectifiers and digital logic gates', units: ['Unit 1: Semiconductor Physics & Diodes', 'Unit 2: Bipolar Junction Transistors (BJT)', 'Unit 3: Operational Amplifiers (Op-Amps)', 'Unit 4: Digital Gates & Boolean Algebra'] },
          { code: 'EE107', name: 'Engineering Chemistry', credits: 3, description: 'Insulating oils, dielectric materials, batteries and electrochemistry', units: ['Unit 1: Dielectrics & Insulating Materials', 'Unit 2: Batteries & Energy Storage', 'Unit 3: Corrosion Prevention', 'Unit 4: Water Treatment'] },
          { code: 'EE108', name: 'Electrical Engineering Drawing & CAD', credits: 3, description: 'Electrical schematics, winding diagrams, substation layouts and CAD', units: ['Unit 1: Electrical Symbols & Standards', 'Unit 2: Transformer & Motor Schematics', 'Unit 3: Substation Single Line Diagrams', 'Unit 4: CAD Drafting for Electrical Systems'] }
        ]
      },
      {
        semester: 3,
        subjects: [
          { code: 'EE201', name: 'Electrical Circuit Analysis', credits: 4, description: 'Mesh, nodal, Laplace analysis of circuits, graph theory, two-port networks and transient response', units: ['Unit 1: Circuit Analysis & Theorems', 'Unit 2: Transient Analysis of RL, RC & RLC Circuits', 'Unit 3: Laplace Transform in Circuit Analysis', 'Unit 4: Two-Port Networks & Resonance'] },
          { code: 'EE202', name: 'Electrical Machines I', credits: 4, description: 'Electromechanical energy conversion, DC generators, DC motors and single/three phase transformers', units: ['Unit 1: Magnetic Circuits & Principles of Energy Conversion', 'Unit 2: DC Generators (EMF, Armature Reaction)', 'Unit 3: DC Motors (Speed Control & Starters)', 'Unit 4: Single-Phase & Three-Phase Transformers'] },
          { code: 'EE203', name: 'Electromagnetic Field Theory', credits: 4, description: 'Coulomb law, Gauss law, Ampere law, Maxwell equations and wave propagation', units: ['Unit 1: Electrostatics & Boundary Conditions', 'Unit 2: Magnetostatics & Magnetic Materials', 'Unit 3: Time-Varying Fields & Maxwell Equations', 'Unit 4: Electromagnetic Waves in Media'] },
          { code: 'EE204', name: 'Analog & Digital Electronics', credits: 3, description: 'Amplifiers, feedback oscillators, operational amplifiers, flip-flops and counters', units: ['Unit 1: Transistor Amplifiers & Oscillators', 'Unit 2: Linear Op-Amp Applications', 'Unit 3: Combinational Logic (Mux, Adders)', 'Unit 4: Sequential Logic (Counters, Registers)'] }
        ]
      },
      {
        semester: 4,
        subjects: [
          { code: 'EE205', name: 'Electrical Machines II', credits: 4, description: 'Three-phase induction motors, synchronous generators (alternators), synchronous motors and fractional HP motors', units: ['Unit 1: Three-Phase Induction Motors (Torque-Slip)', 'Unit 2: Induction Motor Starting & Speed Control', 'Unit 3: Synchronous Generators & Voltage Regulation', 'Unit 4: Synchronous Motors & Special Electric Machines'] },
          { code: 'EE206', name: 'Control Systems', credits: 4, description: 'Transfer functions, block diagram algebra, Routh-Hurwitz stability, Root Locus, Nyquist and Bode plots', units: ['Unit 1: Modeling of Dynamic Systems & Signal Flow', 'Unit 2: Time Response Analysis & PID Controllers', 'Unit 3: Stability & Root Locus Technique', 'Unit 4: Frequency Response Analysis (Bode & Nyquist)'] },
          { code: 'EE207', name: 'Power Generation & Transmission', credits: 3, description: 'Thermal, hydro, nuclear plants, transmission line parameters, performance models and sag calculations', units: ['Unit 1: Conventional & Renewable Power Generation', 'Unit 2: Transmission Line Parameters (R, L, C)', 'Unit 3: Performance of Short, Medium & Long Lines', 'Unit 4: Mechanical Design, Insulators & Sag Analysis'] },
          { code: 'EE208', name: 'Electrical Measurements & Instrumentation', credits: 3, description: 'PMMC, moving iron meters, wattmeters, energy meters, AC bridges and digital instruments', units: ['Unit 1: Analog Instruments (PMMC, MI Meters)', 'Unit 2: Power & Energy Measurement (Wattmeters)', 'Unit 3: Resistance & Impedance Bridges (Wheatstone, Maxwell)', 'Unit 4: Sensors, Transducers & Digital Multimeters'] }
        ]
      },
      {
        semester: 5,
        subjects: [
          { code: 'EE301', name: 'Power Electronics', credits: 4, description: 'SCR, MOSFET, IGBT, phase controlled rectifiers, DC-DC choppers and PWM inverters', units: ['Unit 1: Power Semiconductor Switching Devices', 'Unit 2: Controlled Rectifiers (Single & Three Phase)', 'Unit 3: DC-DC Converters (Buck, Boost, Buck-Boost)', 'Unit 4: Inverters (Single/Three Phase VSI & PWM)'] },
          { code: 'EE302', name: 'Power System Analysis', credits: 4, description: 'Per unit system, symmetrical components, fault analysis (symmetrical & unsymmetrical) and load flow studies', units: ['Unit 1: Per Unit System & Reactance Diagrams', 'Unit 2: Symmetrical Fault Analysis (Bus Impedance)', 'Unit 3: Symmetrical Components & Unsymmetrical Faults (LG, LL, LLG)', 'Unit 4: Power Flow Analysis (Gauss-Seidel & Newton-Raphson)'] },
          { code: 'EE303', name: 'Microprocessors & Microcontrollers', credits: 3, description: '8085/8086 microprocessors, 8051 microcontroller, timers, interrupts and motor control interfacing', units: ['Unit 1: 8085 Architecture & Assembly Programming', 'Unit 2: 8051 Microcontroller Hardware Architecture', 'Unit 3: 8051 Timers, Interrupts & Serial I/O', 'Unit 4: Interfacing ADC, DAC & Stepper Motors'] },
          { code: 'EE304', name: 'Signals & Systems for Electrical Engg', credits: 3, description: 'Fourier transform, Laplace transform, discrete systems, filter circuits and state space models', units: ['Unit 1: Signal Classification & Continuous LTI', 'Unit 2: Fourier Analysis of Power Waveforms', 'Unit 3: Discrete Systems & Z-Transforms', 'Unit 4: State Variable Representation of Circuits'] }
        ]
      },
      {
        semester: 6,
        subjects: [
          { code: 'EE305', name: 'Switchgear & Protection', credits: 4, description: 'Circuit breakers (air blast, SF6, vacuum), electromagnetic & numerical relays, generator and transformer protection', units: ['Unit 1: Arc Interruption & Circuit Breakers (SF6, Vacuum)', 'Unit 2: Overcurrent & Distance Relaying Principles', 'Unit 3: Generator, Transformer & Motor Protection', 'Unit 4: Busbar & Line Protection, Numerical Relays'] },
          { code: 'EE306', name: 'Electric Drives & Control', credits: 4, description: 'Dynamics of electric drives, DC drive speed control, induction motor drives (V/f control) and vector control', units: ['Unit 1: Dynamics of Electric Drives & Four-Quadrant Operation', 'Unit 2: DC Motor Drives (Converter & Chopper Fed)', 'Unit 3: Induction Motor Drives (V/f Control & Inverters)', 'Unit 4: Synchronous Motor Drives & Industrial Applications'] },
          { code: 'EE307', name: 'High Voltage Engineering', credits: 3, description: 'Breakdown in gases, liquids and solids, generation of high AC/DC/impulse voltages and lightning testing', units: ['Unit 1: Conduction & Breakdown in Dielectrics', 'Unit 2: Generation of High AC, DC & Impulse Voltages', 'Unit 3: Measurement of High Voltages & Currents', 'Unit 4: Overvoltage Transients & Insulation Coordination'] }
        ]
      },
      {
        semester: 7,
        subjects: [
          { code: 'EE401', name: 'Smart Grid Technologies & Microgrids', credits: 4, description: 'Smart meters, wide area measurement (PMUs), microgrid control, energy storage and demand response', units: ['Unit 1: Smart Grid Concept, Architecture & Standards', 'Unit 2: Phasor Measurement Units (PMU) & WAMS', 'Unit 3: Microgrid Architectures & Islanding Operation', 'Unit 4: Battery Energy Storage Systems (BESS)'] },
          { code: 'EE402', name: 'Electric Vehicle Powertrains & Charging', credits: 3, description: 'EV battery chemistry, battery management systems (BMS), motor selection and DC fast charging standards', units: ['Unit 1: EV Configurations & Vehicle Mechanics', 'Unit 2: Motors for EVs (BLDC, PMSM, Induction)', 'Unit 3: Battery Management Systems (BMS) & State of Charge', 'Unit 4: EV Charging Stations & Grid Integration'] }
        ]
      },
      {
        semester: 8,
        subjects: [
          { code: 'EE403', name: 'Industrial Automation (PLC & SCADA)', credits: 3, description: 'PLC programming, ladder logic, SCADA systems, HMI interfaces and distributed control systems (DCS)', units: ['Unit 1: PLC Architecture & Memory Organization', 'Unit 2: Ladder Logic Programming (Timers, Counters)', 'Unit 3: SCADA Architecture & HMI Interfaces', 'Unit 4: Distributed Control Systems (DCS) & Industrial IoT'] },
          { code: 'EE404', name: 'Capstone Electrical Project & Defense', credits: 8, description: 'Comprehensive design, hardware prototype, power simulation and thesis documentation', units: ['Unit 1: System Design & MATLAB/Simulink Simulation', 'Unit 2: Hardware Prototype Fabrication & Testing', 'Unit 3: Project Defense & Thesis Report'] }
        ]
      }
    ]
  },
  {
    code: 'CIVIL',
    name: 'Civil Engineering',
    shortDesc: 'Structural analysis, geotechnical engineering, concrete technology, hydraulics, survey, and transportation.',
    iconName: 'Building',
    accentColor: 'emerald',
    gradient: 'from-emerald-500/20 to-teal-600/20 border-emerald-500/30 hover:border-emerald-400',
    totalNotes: 260,
    popularSubjects: ['Structural Analysis', 'Geotechnical Engineering', 'Design of RCC Structures', 'Concrete Technology'],
    semesters: [
      {
        semester: 1,
        subjects: [
          { code: 'CE101', name: 'Engineering Mathematics I', credits: 4, description: 'Calculus, matrices, linear algebra and coordinate geometry', units: ['Unit 1: Linear Systems & Matrices', 'Unit 2: Differential Calculus', 'Unit 3: Multivariable Calculus', 'Unit 4: Vector Calculus'] },
          { code: 'CE102', name: 'Engineering Mechanics', credits: 4, description: 'Statics, coplanar forces, trusses, friction, centroids and moment of inertia', units: ['Unit 1: Force Systems & Equilibrium', 'Unit 2: Analysis of Simple Trusses', 'Unit 3: Friction & Centroid Calculations', 'Unit 4: Moment of Inertia of Areas'] },
          { code: 'CE103', name: 'Engineering Physics', credits: 3, description: 'Acoustics, ultrasonics, optics, laser surveying and materials science', units: ['Unit 1: Architectural Acoustics & Ultrasonics', 'Unit 2: Laser Surveying & Fiber Optics', 'Unit 3: Properties of Matter & Elasticity', 'Unit 4: Quantum Physics Basics'] },
          { code: 'CE104', name: 'Basic Electrical & Mechanical Engg', credits: 3, description: 'Pumps, compressors, electrical circuits, motors and wiring', units: ['Unit 1: DC & AC Electrical Systems', 'Unit 2: Transformers & Induction Motors', 'Unit 3: Fluid Machinery (Pumps & Compressors)', 'Unit 4: Heat Engines & Power Transmission'] }
        ]
      },
      {
        semester: 2,
        subjects: [
          { code: 'CE105', name: 'Engineering Mathematics II', credits: 4, description: 'Differential equations, Fourier series and partial differential equations', units: ['Unit 1: Differential Equations & Applications', 'Unit 2: Partial Differential Equations', 'Unit 3: Laplace Transforms', 'Unit 4: Fourier Analysis'] },
          { code: 'CE106', name: 'Building Materials & Construction', credits: 4, description: 'Stones, bricks, cement, concrete, mortar, timber, masonry, foundations and roofing', units: ['Unit 1: Traditional Building Materials (Stone, Brick, Cement)', 'Unit 2: Modern Composites, Timber & Paints', 'Unit 3: Masonry, Foundations & Damp-Proofing', 'Unit 4: Roofs, Flooring, Doors & Windows'] },
          { code: 'CE107', name: 'Engineering Chemistry', credits: 3, description: 'Water analysis, cement chemistry, corrosion and lime manufacturing', units: ['Unit 1: Water Analysis & Softening', 'Unit 2: Chemistry of Cement & Hydration', 'Unit 3: Corrosion of Reinforcing Steel', 'Unit 4: Lime, Plaster & Bituminous Materials'] },
          { code: 'CE108', name: 'Engineering Graphics & Building Drawing', credits: 3, description: 'Orthographic projections, building plans, elevations, sections and CAD drafting', units: ['Unit 1: Engineering Scales & Projections', 'Unit 2: Plans, Elevations & Sections of Buildings', 'Unit 3: Municipal Building Bye-Laws', 'Unit 4: AutoCAD Drafting for Civil Structures'] }
        ]
      },
      {
        semester: 3,
        subjects: [
          { code: 'CE201', name: 'Surveying & Geomatics', credits: 4, description: 'Chain surveying, compass, levelling, contouring, theodolite, total station and GPS/GIS', units: ['Unit 1: Linear Measurements & Compass Surveying', 'Unit 2: Levelling, Contouring & Earthwork Calculations', 'Unit 3: Theodolite Surveying & Trigonometric Levelling', 'Unit 4: Total Station, GPS & Remote Sensing Intro'] },
          { code: 'CE202', name: 'Mechanics of Solids (SOM)', credits: 4, description: 'Stress-strain behavior, Mohr circle, bending and shear stresses in beams, torsion and deflection', units: ['Unit 1: Simple Stresses, Strains & Mohr Circle', 'Unit 2: Shear Force & Bending Moment in Beams', 'Unit 3: Stresses in Beams & Deflection of Beams', 'Unit 4: Torsion of Shafts & Buckling of Columns'] },
          { code: 'CE203', name: 'Fluid Mechanics', credits: 4, description: 'Fluid properties, hydrostatic pressure, Bernoulli theorem, laminar/turbulent pipe flow and losses', units: ['Unit 1: Fluid Properties & Hydrostatic Forces', 'Unit 2: Fluid Kinematics & Bernoulli Equation', 'Unit 3: Flow Through Pipes & Energy Losses', 'Unit 4: Flow Measurement (Venturimeter, Notches)'] },
          { code: 'CE204', name: 'Engineering Geology', credits: 3, description: 'Minerals, rock types, geological structures, faults, folds, earthquakes and dam site selection', units: ['Unit 1: Physical Geology & Mineralogy', 'Unit 2: Petrology (Igneous, Sedimentary, Metamorphic)', 'Unit 3: Structural Geology (Folds, Faults, Joints)', 'Unit 4: Geological Investigations for Dams & Tunnels'] }
        ]
      },
      {
        semester: 4,
        subjects: [
          { code: 'CE205', name: 'Structural Analysis I', credits: 4, description: 'Determinate structures, deflection of trusses, strain energy, slope deflection and moment distribution', units: ['Unit 1: Analysis of Determinate Pin-Jointed Trusses', 'Unit 2: Deflection of Determinate Beams & Frames', 'Unit 3: Slope Deflection Method for Indeterminate Beams', 'Unit 4: Moment Distribution Method (Hardy Cross)'] },
          { code: 'CE206', name: 'Concrete Technology', credits: 4, description: 'Cement hydration, aggregate properties, fresh concrete workability, IS 10262 mix design and NDT', units: ['Unit 1: Concrete Ingredients & Cement Hydration', 'Unit 2: Workability, Segregation & Admixtures', 'Unit 3: Concrete Mix Design as per IS 10262', 'Unit 4: Durability, Cracking & Non-Destructive Testing'] },
          { code: 'CE207', name: 'Hydraulics & Open Channel Flow', credits: 3, description: 'Open channel flow, Chezy/Manning formulas, specific energy, hydraulic jump and water turbines', units: ['Unit 1: Uniform Flow in Open Channels (Manning/Chezy)', 'Unit 2: Specific Energy & Critical Flow Conditions', 'Unit 3: Rapidly Varied Flow & Hydraulic Jump', 'Unit 4: Impact of Jets, Pelton & Francis Turbines'] },
          { code: 'CE208', name: 'Water Supply & Environmental Engineering', credits: 3, description: 'Water demand, intake structures, water treatment (coagulation, filtration, disinfection) and distribution', units: ['Unit 1: Water Demand, Forecasting & Sources', 'Unit 2: Water Quality Standards & Sedimentation', 'Unit 3: Filtration, Disinfection & Water Softening', 'Unit 4: Distribution Networks & Pipe Hydraulics'] }
        ]
      },
      {
        semester: 5,
        subjects: [
          { code: 'CE301', name: 'Design of Reinforced Concrete Structures (RCC)', credits: 4, description: 'Limit state design (IS 456), singly/doubly reinforced beams, flanged beams, slabs, columns and footings', units: ['Unit 1: Limit State Philosophy & Flexural Design of Beams', 'Unit 2: Design for Shear, Bond & Torsion', 'Unit 3: Design of One-Way & Two-Way Slabs', 'Unit 4: Axially Loaded Columns & Isolated Footings'] },
          { code: 'CE302', name: 'Geotechnical Engineering (Soil Mechanics)', credits: 4, description: 'Phase relations, classification, permeability, seepage, compaction, 1D consolidation and shear strength', units: ['Unit 1: Soil Phase Relationships & Index Properties', 'Unit 2: Permeability, Seepage & Flow Nets', 'Unit 3: Soil Compaction & 1D Consolidation Settlement', 'Unit 4: Mohr-Coulomb Failure Criteria & Shear Strength'] },
          { code: 'CE303', name: 'Transportation Engineering (Highways)', credits: 4, description: 'Geometric design of highways, sight distances, pavement materials, flexible/rigid pavement design (IRC)', units: ['Unit 1: Highway Planning & Geometric Alignment', 'Unit 2: Sight Distances, Superelevation & Curves', 'Unit 3: Pavement Materials & Subgrade CBR Testing', 'Unit 4: Design of Flexible & Rigid Pavements (IRC 37/58)'] },
          { code: 'CE304', name: 'Structural Analysis II (Matrix Methods)', credits: 3, description: 'Flexibility and stiffness matrix methods, plastic analysis of beams and portal frames', units: ['Unit 1: Flexibility Matrix Method for Beams & Trusses', 'Unit 2: Stiffness Matrix Method for Beams & Frames', 'Unit 3: Plastic Analysis & Collapse Mechanisms', 'Unit 4: Approximate Analysis of Multistory Frames'] }
        ]
      },
      {
        semester: 6,
        subjects: [
          { code: 'CE305', name: 'Design of Steel Structures (IS 800)', credits: 4, description: 'Limit state design of steel members, welded/bolted connections, tension members, compression columns and plate girders', units: ['Unit 1: Bolted & Welded Connections (IS 800:2007)', 'Unit 2: Design of Tension Members & Lug Angles', 'Unit 3: Design of Compression Members & Built-Up Columns', 'Unit 4: Design of Laterally Supported/Unsupported Beams'] },
          { code: 'CE306', name: 'Foundation Engineering', credits: 4, description: 'Terzaghi bearing capacity, settlement of footings, pile foundations, lateral earth pressure and retaining walls', units: ['Unit 1: Subsurface Soil Exploration & SPT/CPT Tests', 'Unit 2: Shallow Foundations & Terzaghi Bearing Capacity', 'Unit 3: Deep Foundations (Pile Capacity & Settlement)', 'Unit 4: Lateral Earth Pressure & Cantilever Retaining Walls'] },
          { code: 'CE307', name: 'Hydrology & Water Resources Engineering', credits: 3, description: 'Precipitation, hydrographs (Unit Hydrograph), flood routing, reservoir planning and groundwater hydrology', units: ['Unit 1: Hydrologic Cycle, Precipitation & Infiltration', 'Unit 2: Streamflow Measurement & Unit Hydrographs', 'Unit 3: Flood Routing & Reservoir Capacity Determination', 'Unit 4: Well Hydraulics & Groundwater Recharge'] }
        ]
      },
      {
        semester: 7,
        subjects: [
          { code: 'CE401', name: 'Estimation, Costing & Valuation', credits: 4, description: 'Detailed quantity estimates, rate analysis, bill of quantities (BOQ), tender documents and property valuation', units: ['Unit 1: Methods of Building Quantity Estimation', 'Unit 2: Rate Analysis for Concrete, Masonry & Steel', 'Unit 3: Preparation of Tender Documents & Contracts', 'Unit 4: Valuation of Real Estate & Depreciation Methods'] },
          { code: 'CE402', name: 'Earthquake Resistant Structural Design', credits: 3, description: 'Seismic waves, response spectrum, IS 1893 equivalent static method and ductile detailing (IS 13920)', units: ['Unit 1: Engineering Seismology & Ground Motion', 'Unit 2: Response Spectrum & Dynamic Characteristics', 'Unit 3: Seismic Force Calculation as per IS 1893', 'Unit 4: Ductile Detailing of RC Structures (IS 13920)'] }
        ]
      },
      {
        semester: 8,
        subjects: [
          { code: 'CE403', name: 'Construction Planning & Management', credits: 3, description: 'CPM/PERT network techniques, project scheduling, equipment economics, safety and contracts', units: ['Unit 1: Construction Project Scheduling & CPM/PERT', 'Unit 2: Resource Allocation, Crashing & Cost Optimization', 'Unit 3: Construction Heavy Equipment Management', 'Unit 4: Site Safety Standards & Dispute Resolution'] },
          { code: 'CE404', name: 'Capstone Civil Project & Thesis', credits: 8, description: 'Comprehensive civil infrastructure design, structural modeling (STAAD/ETABS), costing and defense', units: ['Unit 1: Site Survey & Architectural Blueprint', 'Unit 2: Structural Analysis & Detailing in ETABS', 'Unit 3: Quantity Estimation & Viva Defense'] }
        ]
      }
    ]
  },
  {
    code: 'CHEM',
    name: 'Chemical Engineering',
    shortDesc: 'Thermodynamics, fluid flow, heat & mass transfer, chemical reaction engineering, and plant design.',
    iconName: 'FlaskConical',
    accentColor: 'rose',
    gradient: 'from-pink-500/20 to-rose-600/20 border-rose-500/30 hover:border-rose-400',
    totalNotes: 210,
    popularSubjects: ['Mass Transfer Operations', 'Chemical Reaction Engineering', 'Chemical Engg Thermodynamics', 'Process Dynamics & Control'],
    semesters: [
      {
        semester: 1,
        subjects: [
          { code: 'CH101', name: 'Engineering Mathematics I', credits: 4, description: 'Calculus, matrices, linear algebra and differential equations', units: ['Unit 1: Matrices & Eigenvalues', 'Unit 2: Differential Calculus', 'Unit 3: Multivariable Calculus', 'Unit 4: Series Expansions'] },
          { code: 'CH102', name: 'Applied Chemistry & Chemical Principles', credits: 4, description: 'Physical chemistry, solutions, reaction kinetics and thermodynamics basics', units: ['Unit 1: Chemical Kinetics & Equilibrium', 'Unit 2: Solution Thermodynamics', 'Unit 3: Catalysis & Surface Chemistry', 'Unit 4: Analytical Chemistry'] },
          { code: 'CH103', name: 'Engineering Physics', credits: 3, description: 'Fluid properties, lasers, acoustics and thermodynamics principles', units: ['Unit 1: Fluid Statics & Surface Tension', 'Unit 2: Wave Optics & Lasers', 'Unit 3: Thermal Physics Laws', 'Unit 4: Quantum Mechanics Intro'] },
          { code: 'CH104', name: 'Basic Electrical & Mechanical Engg', credits: 3, description: 'Circuits, electric motors, pumps and mechanical power systems', units: ['Unit 1: DC & AC Circuits', 'Unit 2: Electric Motors in Plants', 'Unit 3: Fluid Pumps & Valves', 'Unit 4: Heat Transmission'] }
        ]
      },
      {
        semester: 2,
        subjects: [
          { code: 'CH105', name: 'Engineering Mathematics II', credits: 4, description: 'ODEs, vector calculus, Laplace transforms and numerical methods', units: ['Unit 1: Linear Differential Equations', 'Unit 2: Vector Calculus & Theorems', 'Unit 3: Laplace Transforms', 'Unit 4: Numerical Methods'] },
          { code: 'CH106', name: 'Organic Chemistry for Chemical Engineers', credits: 4, description: 'Reaction mechanisms, aliphatic, aromatic compounds and industrial syntheses', units: ['Unit 1: Reaction Mechanisms (SN1, SN2)', 'Unit 2: Aromatic Hydrocarbons & Synthesis', 'Unit 3: Polymers & Petrochemical Feedstocks', 'Unit 4: Heterocyclic Compounds'] },
          { code: 'CH107', name: 'Computer Programming & Process Flow', credits: 3, description: 'Programming in Python/C for chemical balance calculations', units: ['Unit 1: Programming Fundamentals', 'Unit 2: Numerical Arrays & Solvers', 'Unit 3: Iterative Flowsheet Solvers', 'Unit 4: Process Flow Diagram Coding'] },
          { code: 'CH108', name: 'Engineering Graphics & Equipment Layout', credits: 3, description: 'Piping and instrumentation diagrams (P&ID) and process equipment drawings', units: ['Unit 1: Orthographic Projections', 'Unit 2: Piping & Instrumentation Symbols', 'Unit 3: Equipment Layout Drawings', 'Unit 4: AutoCAD for Chemical Plants'] }
        ]
      },
      {
        semester: 3,
        subjects: [
          { code: 'CH201', name: 'Chemical Process Calculations (Stoichiometry)', credits: 4, description: 'Material balances with/without reaction, recycle, bypass, purge and energy balance calculations', units: ['Unit 1: Units, Dimensions & Ideal Gas Laws', 'Unit 2: Material Balance Without Chemical Reactions', 'Unit 3: Material Balance With Reactions (Recycle, Purge)', 'Unit 4: Energy Balance, Combustion & Heat of Reaction'] },
          { code: 'CH202', name: 'Fluid Flow Operations', credits: 4, description: 'Fluid statics, Bernoulli equation, laminar/turbulent pipe flow, pumps, blowers and metering', units: ['Unit 1: Fluid Statics & Fluid Kinematics', 'Unit 2: Incompressible Flow in Pipes & Friction Factor', 'Unit 3: Pumps, Compressors & Flow Control Valves', 'Unit 4: Flow Measurement (Orifice, Venturi, Rotameter)'] },
          { code: 'CH203', name: 'Mechanical Operations', credits: 3, description: 'Particle characterization, size reduction (crushers), screening, filtration, settling and mixing', units: ['Unit 1: Particle Size Analysis & Screen Effectiveness', 'Unit 2: Size Reduction Laws (Rittinger, Kick, Bond)', 'Unit 3: Filtration Principles & Centrifugation', 'Unit 4: Mixing, Agitation & Fluidization'] },
          { code: 'CH204', name: 'Chemical Engineering Thermodynamics I', credits: 4, description: 'First and Second laws of thermodynamics, PVT behavior of pure fluids and heat effects', units: ['Unit 1: First Law & State Functions', 'Unit 2: Volumetric Properties of Pure Fluids (EOS)', 'Unit 3: Second Law, Entropy & Irreversibility', 'Unit 4: Refrigeration Cycles & Liquefaction Processes'] }
        ]
      },
      {
        semester: 4,
        subjects: [
          { code: 'CH205', name: 'Chemical Engineering Thermodynamics II', credits: 4, description: 'Phase equilibria (VLE), chemical reaction equilibria, fugacity, activity coefficients and Gibbs energy', units: ['Unit 1: Solution Thermodynamics & Chemical Potential', 'Unit 2: Fugacity & Activity Coefficients', 'Unit 3: Vapor-Liquid Equilibrium (VLE & Raoult Law)', 'Unit 4: Chemical Reaction Equilibria & Equilibrium Constants'] },
          { code: 'CH206', name: 'Heat Transfer Operations', credits: 4, description: 'Conduction, convection, radiation, boiling, condensation and design of shell-and-tube heat exchangers', units: ['Unit 1: Steady & Unsteady Heat Conduction', 'Unit 2: Forced & Natural Convection Correlations', 'Unit 3: Boiling, Condensation & Evaporators', 'Unit 4: Shell & Tube Heat Exchanger Design'] },
          { code: 'CH207', name: 'Process Instrumentation', credits: 3, description: 'Temperature, pressure, flow, level measurement instruments and transmitter principles', units: ['Unit 1: Temperature Sensors (RTD, Thermocouples)', 'Unit 2: Pressure Measurement (Manometers, Diaphragms)', 'Unit 3: Level & Flow Measurement Transducers', 'Unit 4: Signal Conditioning & Data Acquisition'] },
          { code: 'CH208', name: 'Chemical Technology (Inorganic & Petrochemical)', credits: 3, description: 'Manufacture of sulfuric acid, ammonia, caustic soda, fertilizers, petroleum refining and polymers', units: ['Unit 1: Chlor-Alkali & Sulfuric Acid Industries', 'Unit 2: Ammonia, Urea & Fertilizer Manufacturing', 'Unit 3: Petroleum Refining Unit Operations', 'Unit 4: Synthetic Polymers & Petrochemicals'] }
        ]
      },
      {
        semester: 5,
        subjects: [
          { code: 'CH301', name: 'Mass Transfer Operations I', credits: 4, description: 'Fick diffusion law, mass transfer coefficients, continuous distillation (McCabe-Thiele) and absorption', units: ['Unit 1: Molecular Diffusion in Gases & Liquids', 'Unit 2: Interphase Mass Transfer & Two-Film Theory', 'Unit 3: Gas Absorption Column Design', 'Unit 4: Distillation Column Design (McCabe-Thiele & Ponchon-Savarit)'] },
          { code: 'CH302', name: 'Chemical Reaction Engineering I (CRE)', credits: 4, description: 'Kinetics of homogeneous reactions, design of batch, CSTR and PFR reactors, temperature effects', units: ['Unit 1: Kinetics of Homogeneous Reactions & Rate Equations', 'Unit 2: Batch Reactor Design & Interpretation of Kinetic Data', 'Unit 3: Continuous Stirred Tank (CSTR) & Plug Flow (PFR) Reactors', 'Unit 4: Multiple Reactions & Temperature Optimization'] },
          { code: 'CH303', name: 'Numerical Methods in Chemical Engineering', credits: 3, description: 'Root finding, system of linear/nonlinear equations, ODE solvers and finite difference approximations', units: ['Unit 1: Non-Linear Algebraic Equations (Newton-Raphson)', 'Unit 2: Systems of Linear Equations (Gauss Elimination)', 'Unit 3: Numerical Integration & Differentiation', 'Unit 4: Ordinary Differential Equations (Runge-Kutta)'] }
        ]
      },
      {
        semester: 6,
        subjects: [
          { code: 'CH304', name: 'Mass Transfer Operations II', credits: 4, description: 'Liquid-liquid extraction, leaching, crystallization, drying kinetics and membrane separation processes', units: ['Unit 1: Liquid-Liquid Extraction (Ternary Diagrams)', 'Unit 2: Solid-Liquid Extraction (Leaching Principles)', 'Unit 3: Crystallization & Crystal Size Distribution', 'Unit 4: Drying Operations & Membrane Separation (RO/UF)'] },
          { code: 'CH305', name: 'Chemical Reaction Engineering II', credits: 4, description: 'Non-ideal reactors, residence time distribution (RTD), heterogeneous catalysis and fluid-particle reactions', units: ['Unit 1: Non-Ideal Flow & Residence Time Distribution (RTD)', 'Unit 2: Heterogeneous Catalysis & Adsorption Isotherms', 'Unit 3: Fluid-Particle Non-Catalytic Reactions (Shrinking Core)', 'Unit 4: Gas-Liquid Catalytic Reactors (Trickle Bed, Slurry)'] },
          { code: 'CH306', name: 'Process Dynamics & Control', credits: 4, description: 'Transfer functions of first/second order systems, feedback loops, PID tuning and stability analysis', units: ['Unit 1: Dynamic Modeling of First & Second Order Systems', 'Unit 2: P, PI & PID Controllers & Control Valves', 'Unit 3: Closed-Loop Stability (Routh-Hurwitz, Bode Plots)', 'Unit 4: Advanced Control Strategies (Cascade, Feedforward)'] }
        ]
      },
      {
        semester: 7,
        subjects: [
          { code: 'CH401', name: 'Chemical Process Equipment Design', credits: 4, description: 'Design codes (ASME/IS 2825), pressure vessels, tall towers, storage tanks and piping networks', units: ['Unit 1: Pressure Vessel Design Under Internal Pressure', 'Unit 2: Design of Tall Distillation Columns & Flanges', 'Unit 3: Storage Tanks for Hazardous Chemicals', 'Unit 4: Piping Stress Analysis & Safety Relief Devices'] },
          { code: 'CH402', name: 'Transport Phenomena', credits: 3, description: 'Unified momentum, heat and mass transfer, shell balances and Navier-Stokes equations', units: ['Unit 1: Molecular Transport Mechanisms & Newton Law', 'Unit 2: Shell Momentum Balances & Velocity Profiles', 'Unit 3: Shell Energy Balances & Temperature Profiles', 'Unit 4: Shell Mass Balances & Concentration Profiles'] }
        ]
      },
      {
        semester: 8,
        subjects: [
          { code: 'CH403', name: 'Plant Economics & Safety Management', credits: 3, description: 'Capital investment, profitability analysis, HAZOP studies, fault tree analysis and OSHA compliance', units: ['Unit 1: Total Capital Investment & Cost Estimation', 'Unit 2: Depreciation, Profitability & Discounted Cash Flow', 'Unit 3: Process Safety Management & HAZOP Analysis', 'Unit 4: Waste Minimization & Environmental Regulations'] },
          { code: 'CH404', name: 'Capstone Plant Design Project & Defense', credits: 8, description: 'Complete chemical plant techno-economic design, flowsheet simulation (Aspen), equipment sizing and defense', units: ['Unit 1: Process Flowsheet & Mass/Energy Balances', 'Unit 2: Rigorous Equipment Sizing & Economic Evaluation', 'Unit 3: Final Plant Design Defense & Thesis Report'] }
        ]
      }
    ]
  },
  {
    code: 'ROBO',
    name: 'Robotics & Automation',
    shortDesc: 'Kinematics, dynamics, PLC/SCADA, ROS 2, computer vision, mobile robots, and mechatronic design.',
    iconName: 'Cpu',
    accentColor: 'indigo',
    gradient: 'from-violet-500/20 to-purple-600/20 border-violet-500/30 hover:border-violet-400',
    totalNotes: 195,
    popularSubjects: ['Robot Kinematics & Dynamics', 'Robot Operating System (ROS 2)', 'Industrial Automation & PLC', 'Autonomous Mobile Robots'],
    semesters: [
      {
        semester: 1,
        subjects: [
          { code: 'RB101', name: 'Engineering Mathematics I', credits: 4, description: 'Calculus, linear algebra, vector calculus and coordinate frames', units: ['Unit 1: Matrices & Linear Transformations', 'Unit 2: Differential Calculus', 'Unit 3: Multivariable Calculus', 'Unit 4: Coordinate Transformations'] },
          { code: 'RB102', name: 'Programming for Robotics (C/C++)', credits: 4, description: 'Variables, pointers, algorithms, memory management and embedded coding', units: ['Unit 1: Problem Solving & C Syntax', 'Unit 2: Functions, Pointers & Memory Management', 'Unit 3: Object-Oriented Principles in C++', 'Unit 4: Real-Time Coding Practices'] },
          { code: 'RB103', name: 'Engineering Physics & Sensors', credits: 3, description: 'Optics, acoustics, electromagnetics and transducer physics', units: ['Unit 1: Optics & Optical Encoders', 'Unit 2: Ultrasonic & Acoustic Waves', 'Unit 3: Magnetic Sensors (Hall Effect)', 'Unit 4: Piezoelectric & Strain Transducers'] },
          { code: 'RB104', name: 'Basic Electrical & Electronics', credits: 3, description: 'Circuits, transistors, operational amplifiers and digital gates', units: ['Unit 1: DC & AC Network Analysis', 'Unit 2: Transistor Switching & Drivers', 'Unit 3: Operational Amplifiers in Sensors', 'Unit 4: Logic Gates & Flip-Flops'] }
        ]
      },
      {
        semester: 2,
        subjects: [
          { code: 'RB105', name: 'Engineering Mathematics II', credits: 4, description: 'Differential equations, Laplace transforms and numerical methods', units: ['Unit 1: Differential Equations & Dynamics', 'Unit 2: Laplace Transforms in Control', 'Unit 3: Fourier Series & Transforms', 'Unit 4: Numerical Solvers for Dynamics'] },
          { code: 'RB106', name: 'Engineering Mechanics for Robotics', credits: 4, description: 'Statics, rigid body kinematics, friction and moments of inertia', units: ['Unit 1: Coplanar Forces & Rigid Bodies', 'Unit 2: Friction & Planetary Drives', 'Unit 3: 2D & 3D Kinematics of Linkages', 'Unit 4: Dynamics & D’Alembert Principle'] },
          { code: 'RB107', name: 'Digital Electronics & Microcontrollers', credits: 3, description: 'Combinational logic, registers, AVR/PIC microcontrollers and I/O interfacing', units: ['Unit 1: Combinational & Sequential Logic', 'Unit 2: Microcontroller Architecture (AVR/ARM)', 'Unit 3: Timers, Interrupts & PWM Generation', 'Unit 4: Sensor Interfacing via I2C/SPI'] },
          { code: 'RB108', name: 'CAD Modeling & Prototyping', credits: 3, description: '3D CAD, SolidWorks/Fusion360, 3D printing and mechanism design', units: ['Unit 1: 3D Parametric Modeling', 'Unit 2: Assembly of Robotic Arms', 'Unit 3: 3D Printing & Additive Manufacturing', 'Unit 4: Mechanism Kinematics Simulation'] }
        ]
      },
      {
        semester: 3,
        subjects: [
          { code: 'RB201', name: 'Kinematics & Dynamics of Robots', credits: 4, description: 'Forward/inverse kinematics, Denavit-Hartenberg (D-H) parameters, Jacobians and Lagrangian dynamics', units: ['Unit 1: Spatial Descriptions & Homogeneous Transforms', 'Unit 2: Denavit-Hartenberg (D-H) Convention', 'Unit 3: Inverse Kinematics Solvers', 'Unit 4: Manipulator Jacobians & Lagrangian Dynamics'] },
          { code: 'RB202', name: 'Sensors & Actuators in Automation', credits: 4, description: 'Encoders, IMUs, LIDAR, DC motors, BLDC motors, stepper motors, harmonic drives and pneumatic actuators', units: ['Unit 1: Position, Velocity & Inertial Sensors (IMUs)', 'Unit 2: Range Sensors (LIDAR, Sonar, ToF Cameras)', 'Unit 3: Electric Motors (DC, BLDC, Stepper) & Drivers', 'Unit 4: Pneumatic & Hydraulic Actuators & Valves'] },
          { code: 'RB203', name: 'Python & ROS 2 Fundamentals', credits: 4, description: 'Nodes, topics, services, actions, ROS 2 architecture and Gazebo simulation', units: ['Unit 1: ROS 2 Architecture & Node Lifecycle', 'Unit 2: Pub/Sub Topics & Custom Messages', 'Unit 3: Services, Actions & Parameters', 'Unit 4: URDF Robot Description & Gazebo Simulation'] },
          { code: 'RB204', name: 'Signals, Systems & Control Basics', credits: 3, description: 'Transfer functions, frequency response, feedback loops and root locus', units: ['Unit 1: Continuous-Time Systems & Block Diagrams', 'Unit 2: Transient & Steady State Response', 'Unit 3: Root Locus & Frequency Analysis', 'Unit 4: Closed Loop Motor Velocity/Position Control'] }
        ]
      },
      {
        semester: 4,
        subjects: [
          { code: 'RB205', name: 'Robot Control Systems', credits: 4, description: 'PID control, computed torque control, trajectory generation and state-space control', units: ['Unit 1: Single Joint Position & Velocity Control', 'Unit 2: Trajectory Planning (Polynomial, Splines)', 'Unit 3: Multi-Link Computed Torque Control', 'Unit 4: State-Space Representation & LQR Regulators'] },
          { code: 'RB206', name: 'Industrial Automation (PLC & SCADA)', credits: 4, description: 'PLC programming (IEC 61131-3), ladder logic, SCADA systems and industrial communication (Modbus/EtherCAT)', units: ['Unit 1: Industrial PLC Architecture & Hardware Wiring', 'Unit 2: Ladder Diagram Programming (Timers, Counters, Math)', 'Unit 3: SCADA Supervisory Systems & HMI Screens', 'Unit 4: Industrial Fieldbuses (Modbus, Profinet, EtherCAT)'] },
          { code: 'RB207', name: 'Machine Vision for Robotics', credits: 3, description: 'OpenCV, camera calibration, object detection, edge detection and visual servoing', units: ['Unit 1: Pinhole Camera Models & Calibration', 'Unit 2: Image Processing with OpenCV (Filters, Edges)', 'Unit 3: Feature Extraction & Object Recognition', 'Unit 4: 2D/3D Visual Servoing for Pick-and-Place'] },
          { code: 'RB208', name: 'Embedded Systems for Robotics', credits: 3, description: 'ARM Cortex-M, STM32, FreeRTOS, interrupt handlers and motor driver circuits', units: ['Unit 1: STM32 Hardware Architecture & Registers', 'Unit 2: FreeRTOS Tasks, Semaphores & Queues', 'Unit 3: H-Bridge Motor Drivers & Current Sensing', 'Unit 4: CAN Bus Protocol in Robotic Systems'] }
        ]
      },
      {
        semester: 5,
        subjects: [
          { code: 'RB301', name: 'Autonomous Mobile Robots (AMR)', credits: 4, description: 'Wheeled robot kinematics, odometry, Kalman filters, SLAM (Simultaneous Localization and Mapping) and path planning (A*, D*)', units: ['Unit 1: Differential Drive & Omni Wheel Kinematics', 'Unit 2: Wheel Odometry & Extended Kalman Filter (EKF)', 'Unit 3: SLAM Algorithms (Gmapping, Cartographer)', 'Unit 4: Global & Local Path Planners (A*, DWA, TEB)'] },
          { code: 'RB302', name: 'Mechatronic System Design', credits: 4, description: 'Integrated mechanical-electrical design, transmission, tolerance analysis and real-time control prototyping', units: ['Unit 1: Mechatronic Design Philosophy & Synergies', 'Unit 2: Precision Mechanical Transmissions (Harmonic, Ball Screw)', 'Unit 3: Signal Conditioning & Grounding Techniques', 'Unit 4: Hardware-in-the-Loop (HIL) Prototyping'] },
          { code: 'RB303', name: 'Artificial Intelligence in Robotics', credits: 3, description: 'Machine learning, reinforcement learning for robot locomotion, behavior trees and neural control', units: ['Unit 1: Supervised Learning for Sensor Classification', 'Unit 2: Reinforcement Learning (PPO, SAC) for Locomotion', 'Unit 3: Behavior Trees & State Machines for Task Planning', 'Unit 4: Neural Network Motion Primitives'] }
        ]
      },
      {
        semester: 6,
        subjects: [
          { code: 'RB304', name: 'Industrial Robotics & Safety Standards', credits: 4, description: 'Articulated industrial robots (KUKA, ABB, Fanuc), teach pendants, offline programming and ISO 10218 safety', units: ['Unit 1: Industrial Robot Workcell Layouts & End-Effectors', 'Unit 2: Teach Pendant & Offline Simulation (RoboDK)', 'Unit 3: Robotic Welding, Painting & Assembly Automation', 'Unit 4: Industrial Safety Standards (ISO 10218 / TS 15066)'] },
          { code: 'RB305', name: 'Aerial Robotics & Drones', credits: 3, description: 'Quadcopter dynamics, attitude estimation, flight controllers (PX4), PID stabilization and autonomous navigation', units: ['Unit 1: Quadcopter Flight Dynamics & Equations of Motion', 'Unit 2: Sensor Fusion (IMU + Barometer + GPS) & AHRS', 'Unit 3: Flight Controller Architecture (PX4 / ArduPilot)', 'Unit 4: Waypoint Navigation & Obstacle Avoidance'] },
          { code: 'RB306', name: 'Micro-Electro-Mechanical Systems (MEMS)', credits: 3, description: 'Micromachining, cleanroom fabrication, MEMS accelerometers, gyroscopes and microfluidics', units: ['Unit 1: Silicon Micromachining & Photolithography', 'Unit 2: Capacitive & Piezoresistive MEMS Transducers', 'Unit 3: MEMS Gyroscopes & Micro-Actuators', 'Unit 4: BioMEMS & Microfluidic Lab-on-a-Chip'] }
        ]
      },
      {
        semester: 7,
        subjects: [
          { code: 'RB401', name: 'Human-Robot Interaction & Cobots', credits: 4, description: 'Collaborative robots (Cobots), force/torque control, compliance control, gesture interfaces and safety zones', units: ['Unit 1: Collaborative Robot Kinematics & Force Limits', 'Unit 2: Impedance & Admittance Control for Safe Contact', 'Unit 3: Multimodal Human-Robot Communication', 'Unit 4: Cobot Ergonomics & Industrial Workcells'] },
          { code: 'RB402', name: 'Deep Learning for Autonomous Vehicles', credits: 3, description: 'Point cloud processing, LiDAR 3D bounding boxes, semantic scene segmentation and end-to-end driving', units: ['Unit 1: 3D Point Cloud Processing (PointNet)', 'Unit 2: 3D Object Detection from LiDAR & Radar', 'Unit 3: Lane Detection & Semantic Segmentation', 'Unit 4: End-to-End Deep Imitation & Reinforcement Learning'] }
        ]
      },
      {
        semester: 8,
        subjects: [
          { code: 'RB403', name: 'Medical & Surgical Robotics', credits: 3, description: 'Teleoperation, haptic feedback, da Vinci surgical systems, rehabilitation exoskeletons and prosthetics', units: ['Unit 1: Surgical Robot Architectures & Master-Slave Teleoperation', 'Unit 2: Haptic Interfaces & Force Feedback Bilateral Control', 'Unit 3: Robotic Exoskeletons & Active Orthoses', 'Unit 4: Clinical Safety, Sterilization & Medical Device Regulations'] },
          { code: 'RB404', name: 'Capstone Robotics Project & Demonstration', credits: 8, description: 'Autonomous robot build, ROS 2 integration, hardware testing, live obstacle course demo and defense', units: ['Unit 1: Hardware-Software Integration & Tuning', 'Unit 2: Autonomous Task Benchmark & Live Demo', 'Unit 3: Final Thesis Documentation & Viva Defense'] }
        ]
      }
    ]
  }
];

export const NOTE_CATEGORIES = [
  'Lecture Notes',
  'Handwritten Notes',
  'Question Bank (PYQ)',
  'Formula Sheet',
  'Lab Manual',
  'Solved Papers'
] as const;
