import { Note } from '../types';

export const INITIAL_NOTES: Note[] = [
  {
    id: 'note-diodes-2024',
    title: 'UNIT 1: Diodes and Applications (Pattern 2024) Complete Handwritten Exam Notes',
    subject: 'Basic Electronics Engineering',
    branch: 'ECE',
    semester: 1,
    category: 'Handwritten Notes',
    description: 'Complete university semester revision notes on Semiconductor Physics, PN Junction Diode V-I characteristics, Shockley equation, Zener Diode voltage regulation, Half/Full Wave Rectifiers with capacitor filter derivations, and Clipper/Clamper wave shaping circuits.',
    author: {
      id: 'auth-diodes',
      name: 'Electronics & Comm. Academic Board',
      college: 'Curriculum & Study Board',
      verified: true,
      role: 'Verified Department Coursepack'
    },
    fileName: 'UNIT 1 Didodes and Applications pattern 2024 (4).pdf',
    fileSize: '12.4 MB',
    pages: 38,
    format: 'pdf',
    downloads: 462,
    upvotes: 384,
    isVerified: true,
    isFeatured: true,
    syllabusPattern: 'Pattern 2024 (AICTE Syllabus)',
    tags: ['Diodes', 'PN Junction', 'Zener Diode', 'Rectifiers', 'Clippers', 'Pattern 2024', 'Semester 1'],
    createdAt: '2026-09-25',
    syllabusUnitsCovered: [
      'Unit 1.1: Semiconductor Physics & PN Junction Diode',
      'Unit 1.2: V-I Characteristics & Shockley Equation',
      'Unit 1.3: Zener Diode & Voltage Regulation',
      'Unit 1.4: Half-Wave & Full-Wave Rectifiers with Filters',
      'Unit 1.5: Diode Clippers & Clamping Circuits'
    ],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Topic 1: Evolution of Electronics (Vacuum Tube to Nanoelectronics)',
        content: 'Electronics is the study and application of electron flow in devices, transforming modern communication, computing, and automation.\n\nFive Key Stages of Evolution:\n1. The Vacuum Tube Era (1904–1947):\n   - 1904: John Ambrose Fleming invented the Diode vacuum tube for radio signal detection.\n   - 1906: Lee De Forest invented the Triode, enabling signal amplification and long-distance telephony.\n   - Disadvantages: Bulky size, massive power consumption, high heat generation, low reliability.\n2. The Transistor Era (1947–1958):\n   - 1947: John Bardeen, Walter Brattain, and William Shockley at Bell Labs invented the point-contact & bipolar transistor.\n   - Revolutionized electronics with solid-state reliability, low power, and extreme miniaturization.\n3. The Integrated Circuit (IC) Era (1958–1970s):\n   - 1958: Jack Kilby (TI) and Robert Noyce (Fairchild) independently invented the IC, integrating transistors, resistors, and capacitors on a single semiconductor chip.\n4. The Microprocessor & VLSI Era (1971–1990s):\n   - 1971: Intel introduced the Intel 4004 (world\'s 1st microprocessor).\n   - VLSI placed millions of transistors on a single die, sparking the PC revolution.\n5. Modern Nanoelectronics & ULSI Era (2000s–Present):\n   - Billions of transistors per chip supporting AI, IoT, 5G/6G, and quantum computing.',
        formula: 'Moore’s Law: Transistor density doubles approximately every 18-24 months.',
        keyPoints: [
          'Vacuum tubes were replaced by transistors due to heat, power loss, and physical size',
          'Modern ULSI chips pack over 50 billion transistors using 3nm/2nm FinFET and GAA architecture'
        ]
      },
      {
        pageNumber: 2,
        title: 'Topic 2: Current Trends in Modern Electronics',
        content: 'Eight major trends shaping future electronics engineering:\n\n1. Nanoelectronics: Engineering components at the nanometer scale (sub-5nm gate lengths) pushing computing density.\n2. Internet of Things (IoT): Interconnecting everyday physical objects (smart homes, industrial sensors, wearables) to the internet.\n3. AI & ML Hardware Accelerators: Dedicated NPU/TPU chips (Google TPU, NVIDIA Tensor cores, Apple Neural Engine) optimized for matrix tensor multiplications.\n4. Flexible & Wearable Electronics: Organic semiconductors and conductive polymers for foldable phones, smart patches, and smart textiles.\n5. 5G & 6G Wireless Networks: Millimeter-wave transmission, beamforming, and ultra-low latency (<1ms) for autonomous vehicles and remote robotic surgery.\n6. Bioelectronics & Neural Interfaces: Implantable pacemakers, continuous glucose monitors, and Brain-Computer Interfaces (BCI).\n7. Green & Sustainable Electronics: Biodegradable substrates, lead-free solders, energy harvesting from ambient RF and thermal gradients.\n8. Quantum Electronics: Qubit processing using superposition and quantum entanglement.',
        keyPoints: [
          'Edge AI chips perform deep learning inference directly on low-power sensor nodes without cloud roundtrips',
          'Bioelectronics interfaces biological neural spikes with solid-state silicon circuits'
        ]
      },
      {
        pageNumber: 3,
        title: 'Topic 3: Impact of Electronics in Industry and Society',
        content: 'Electronics forms the foundational infrastructure of 21st century society:\n\n1. Industrial Automation & Robotics: CNC machines, PLC controllers, automated assembly lines, and machine vision inspection reduce defect rates.\n2. Healthcare & Medical Electronics: Digital X-ray, ECG, EEG, CT scan, MRI scanners, ventilators, and dialysis machines.\n3. Defense & Aerospace: RADAR systems, laser-guided munitions, night-vision infrared sensors, fly-by-wire avionics, and satellite communications.\n4. Agriculture (Smart Farming): IoT soil moisture sensors, multispectral drone imaging for crop health, automated drip irrigation.\n5. Transportation & Automotive: Electronic Control Units (ECUs), regenerative braking, LIDAR obstacle detection, battery management systems (BMS) in EVs.\n6. Telecommunications & Entertainment: High-speed fiber optics, cellular base stations, satellite TV broadcasting, and global social media platforms.',
        keyPoints: [
          'Sensors detect physical quantities (temperature, pressure, light) and convert them to electrical signals',
          'Actuators receive electrical command signals and produce mechanical physical motion'
        ]
      },
      {
        pageNumber: 4,
        title: 'Topic 4: Active vs Passive Components & Resistor/Capacitor/Inductor Fundamentals',
        content: 'Comparison of Electronic Components:\n\n1. Active Components: Devices capable of providing power gain, voltage/current amplification, or generating electrical energy.\n   - Examples: BJT Transistors, Diodes, MOSFETs, Operational Amplifiers (Op-Amps), Voltage Sources.\n2. Passive Components: Devices that absorb, consume, or store electrical energy without introducing power amplification.\n   - Examples: Resistors, Capacitors, Inductors, Transformers.\n\nMathematical Governing Laws:\n- Resistor: Opposes current flow. V = I * R | Resistance formula: R = ρ * l / a (where ρ = resistivity, l = length, a = cross-sectional area).\n  - Linear resistors (Fixed, Wirewound) obey Ohm\'s Law; Non-linear (Thermistor, LDR, Varistor) vary with temperature or light.\n- Capacitor: Stores energy in electrostatic field. C = ε * A / d (where ε = permittivity, A = plate area, d = plate separation distance).\n  - Units: 1 μF = 10^-6 F, 1 nF = 10^-9 F, 1 pF = 10^-12 F.\n- Inductor: Opposes change in current by producing back-EMF. Inductance L = (N * Φ) / I (where N = turns, Φ = magnetic flux, I = current). Unit: Henry (H).',
        formula: 'Resistor: R = ρ·l/a | Capacitor: C = ε·A/d | Inductor: L = N·Φ/I',
        keyPoints: [
          'Active components are generally unidirectional; passive components are generally bidirectional',
          'Thermistor resistance decreases with temperature (NTC); LDR resistance decreases with incident light intensity'
        ]
      },
      {
        pageNumber: 5,
        title: 'Topic 5a: P-N Junction Diode Construction, Doping & Carrier Transport',
        content: '1. Intrinsic vs Extrinsic Semiconductors:\n- Intrinsic: Pure silicon (Si) or Germanium (Ge). Low conductivity at room temp, electron-hole pairs generated thermally.\n- Extrinsic: Doped semiconductors.\n  - n-type: Doped with Pentavalent donor atoms (Phosphorus, Arsenic, Antimony). Extra 5th electron is free. Majority carriers = electrons, minority = holes.\n  - p-type: Doped with Trivalent acceptor atoms (Boron, Gallium, Indium). Vacancy creates hole. Majority carriers = holes, minority = electrons.\n\n2. Carrier Transport Mechanisms:\n- Drift Current: Movement of charge carriers under influence of applied external electric field (battery).\n- Diffusion Current: Movement of charge carriers from a region of higher concentration to lower concentration without external voltage.\n- Total Current: I_total = I_drift + I_diffusion.\n\n3. Formation of P-N Junction & Depletion Region:\nWhen p-type and n-type silicon are joined, electrons diffuse from n to p and holes diffuse from p to n. Recombination at junction leaves uncompensated positive donor ions in n-side and negative acceptor ions in p-side. This forms the Depletion Region and sets up a Built-in Barrier Potential (0.7 V for Si, 0.2 V for Ge at 300 K).',
        formula: 'Built-in Potential: V_0 = V_T · ln( (N_A · N_D) / n_i² ) | Barrier: Si = 0.7V, Ge = 0.2V',
        keyPoints: [
          'Depletion region contains ONLY immobile ionized donor and acceptor atoms, devoid of free mobile carriers',
          'Built-in electric field opposes further diffusion of majority carriers across the junction'
        ]
      },
      {
        pageNumber: 6,
        title: 'Topic 5b & 5c: Diode Biasing, V-I Characteristics & Diode as a Switch',
        content: '1. Forward Bias:\n- Positive terminal of battery connected to p-side (Anode), negative to n-side (Cathode).\n- External voltage opposes barrier potential. Depletion layer width decreases. When V_f >= V_cut-in (0.7V for Si), forward current rises exponentially.\n\n2. Reverse Bias:\n- Negative terminal to p-side, positive to n-side. Depletion layer widens. Barrier potential increases.\n- Only tiny Reverse Saturation Current (Is or Io) flows (~nA for Si, ~μA for Ge) due to thermally generated minority carriers.\n- At high reverse voltage, junction breakdown occurs (Zener or Avalanche breakdown).\n\n3. Shockley Diode Equation:\nI = I_s * [ exp( V / (η * V_T) ) - 1 ], where V_T = 26 mV at 300 K.\n\n4. Diode as a Switch:\n- Forward Biased Diode acts as a CLOSED SWITCH (ON state with low resistance R_f ~ 1-10 Ω, small 0.7V drop).\n- Reverse Biased Diode acts as an OPEN SWITCH (OFF state with high resistance R_r ~ MΩ, current I ≈ 0).\n- Switching speed is governed by Reverse Recovery Time (t_rr), the time required to remove stored minority carriers during turn-off.',
        formula: 'Shockley Eq: I = I_s·[e^(V/(η·V_T)) - 1] | Forward: Closed Switch | Reverse: Open Switch',
        keyPoints: [
          'Silicon diodes withstand much higher peak reverse voltages and temperatures than Germanium',
          'Turn-off time of diode is longer than turn-on time due to minority carrier storage in depletion region'
        ]
      },
      {
        pageNumber: 7,
        title: 'Topic 5d: Half-Wave Rectifier (HWR) Circuit Operation & Waveform Derivations',
        content: 'A rectifier converts bidirectional alternating current (AC) into pulsating direct current (DC).\n\nHWR Circuit Construction:\nConsists of a single step-down transformer (turns ratio N1:N2), one semiconductor diode D1, and load resistor R_L.\n\nOperation:\n1. Positive Half Cycle (0 to π):\n   - Terminal A is positive, B is negative. Diode D1 is FORWARD BIASED (acts as closed switch).\n   - Current I_L flows through load: I_L = V_m / (R_s + R_f + R_L).\n2. Negative Half Cycle (π to 2π):\n   - Terminal A is negative, B is positive. Diode D1 is REVERSE BIASED (acts as open switch).\n   - No current flows through load: I_L = 0, V_L = 0.\n\nPerformance Parameters Derivations:\n- Average / DC Load Current: I_dc = I_m / π ≈ 0.318 I_m\n- Average / DC Load Voltage: V_dc = I_dc * R_L = V_m / π\n- RMS Load Current: I_rms = I_m / 2\n- RMS Load Voltage: V_rms = V_m / 2\n- Ripple Factor: γ = √( (I_rms / I_dc)² - 1 ) = √( (π/2)² - 1 ) = 1.21 (121% AC ripple!)\n- Rectification Efficiency: η = P_dc / P_ac = (0.406 * R_L) / (R_s + R_f + R_L) ≈ 40.6%\n- Peak Inverse Voltage (PIV) across diode: PIV = V_m\n- Ripple Frequency: f_ripple = f_in (e.g. 50 Hz)',
        formula: 'HWR: I_dc = I_m/π | I_rms = I_m/2 | Ripple γ = 1.21 | Max Efficiency η = 40.6% | PIV = V_m',
        keyPoints: [
          'Half wave rectifier conducts only during 180° of the input AC cycle, suppressing the negative half',
          'Transformer Utilization Factor (TUF) of HWR is only 0.287, making it inefficient for heavy power supplies'
        ]
      },
      {
        pageNumber: 8,
        title: 'Topic 5d: Solved University Numerical Problems on Half-Wave Rectifier',
        content: 'Problem 1 (Standard University Exam Pattern):\nA Half Wave Rectifier is connected to a 230 V, 50 Hz AC source through a transformer of turn ratio 10:1. The diode forward resistance R_f = 100 Ω, secondary winding resistance R_s = 0 Ω, and load resistance R_L = 500 Ω.\nCalculate: (1) Peak current I_m, (2) DC load current I_dc, (3) RMS current I_rms, (4) DC load voltage V_dc, (5) Rectification efficiency η, (6) Ripple factor γ.\n\nSolution Step-by-Step:\n- Secondary RMS Voltage V_s: V_s = (N2 / N1) * V_in = (1 / 10) * 230 V = 23 V.\n- Peak Secondary Voltage V_m: V_m = V_s * √2 = 23 * 1.414 = 32.53 V.\n1. Peak current I_m = V_m / (R_s + R_f + R_L) = 32.53 / (0 + 100 + 500) = 32.53 / 600 = 0.0542 A = 54.22 mA.\n2. DC load current I_dc = I_m / π = 54.22 mA / 3.1416 = 17.26 mA.\n3. RMS load current I_rms = I_m / 2 = 54.22 mA / 2 = 27.11 mA.\n4. DC load voltage V_dc = I_dc * R_L = 17.26 * 10^-3 * 500 = 8.63 V.\n5. DC output power P_dc = (I_dc)² * R_L = (17.26 * 10^-3)² * 500 = 149 mW = 0.149 W.\n   AC input power P_ac = (I_rms)² * (R_s + R_f + R_L) = (27.11 * 10^-3)² * 600 = 440.9 mW = 0.441 W.\n   Efficiency η = P_dc / P_ac = 0.149 / 0.441 = 33.95%.\n6. Ripple Factor γ = √( (I_rms / I_dc)² - 1 ) = √( (27.11 / 17.26)² - 1 ) = 1.21.',
        formula: 'V_m = V_s·√2 | I_m = V_m/(R_s + R_f + R_L) | I_dc = I_m/π | P_dc = (I_dc)²·R_L',
        keyPoints: [
          'Always convert RMS input to peak voltage V_m using factor √2 = 1.414 before computing currents',
          'Include diode forward resistance R_f in total series resistance when not specified as ideal'
        ]
      },
      {
        pageNumber: 9,
        title: 'Topic 5e: Full-Wave Rectifiers (Center-Tapped & Bridge Rectifier Configurations)',
        content: 'Full wave rectifiers deliver unidirectional current to the load during both positive and negative half cycles of input AC.\n\n1. Center-Tapped Full-Wave Rectifier (2 Diodes D1, D2):\n- Uses center-tapped transformer with center point O grounded.\n- Positive Half Cycle (0 to π): Anode A is positive, B is negative. D1 is FORWARD BIASED, D2 is REVERSE BIASED. Current flows A -> D1 -> R_L -> O.\n- Negative Half Cycle (π to 2π): Anode B is positive, A is negative. D2 is FORWARD BIASED, D1 is REVERSE BIASED. Current flows B -> D2 -> R_L -> O in the SAME direction through R_L!\n\n2. Full-Wave Bridge Rectifier (4 Diodes D1, D2, D3, D4):\n- Does NOT require a center-tapped transformer (saves size, weight, and cost).\n- Positive Half Cycle: Diodes D1 and D2 are FORWARD BIASED; D3 and D4 are REVERSE BIASED. Current flows: A -> D1 -> R_L -> D2 -> B.\n- Negative Half Cycle: Diodes D3 and D4 are FORWARD BIASED; D1 and D2 are REVERSE BIASED. Current flows: B -> D3 -> R_L -> D4 -> A. Current flows through R_L in identical direction!\n\nPerformance Parameters Derivations:\n- Average DC Current: I_dc = 2 * I_m / π ≈ 0.636 I_m (Double the HWR!)\n- Average DC Voltage: V_dc = 2 * V_m / π\n- RMS Current: I_rms = I_m / √2 ≈ 0.707 I_m\n- Ripple Factor: γ = √( (I_rms / I_dc)² - 1 ) = √( ( (I_m/√2) / (2I_m/π) )² - 1 ) = 0.482 (48.2%)\n- Rectification Efficiency: η = 81.2% (Twice that of HWR!)\n- PIV Rating: Center-tapped PIV = 2 * V_m | Bridge Rectifier PIV = V_m (Major Advantage of Bridge!)',
        formula: 'FWR: I_dc = 2I_m/π | I_rms = I_m/√2 | Ripple γ = 0.482 | Efficiency η = 81.2% | Bridge PIV = V_m',
        keyPoints: [
          'Bridge rectifier has half the PIV requirement of center-tapped rectifier, requiring lower-voltage rated diodes',
          'Output ripple frequency is 2*f_in (100 Hz for 50 Hz line AC), making it much easier to filter with smaller capacitors'
        ]
      },
      {
        pageNumber: 10,
        title: 'Topic 5e: Solved University Numerical Problems on Full-Wave Bridge Rectifier',
        content: 'Problem 2 (University Exam Solved Problem):\nA Bridge Rectifier is connected to a 230 V, 50 Hz AC power supply through a step-down transformer having turns ratio N1:N2 = 8:1. Diode forward resistance R_f = 1 Ω, secondary winding resistance R_s = 10 Ω, and load resistance R_L = 2 kΩ (2000 Ω).\nCalculate: (1) DC load power P_dc, (2) Peak Inverse Voltage (PIV), (3) Rectification efficiency η.\n\nSolution Step-by-Step:\n1. Secondary RMS voltage V_s = (N2 / N1) * V_in = (1 / 8) * 230 V = 28.75 V.\n2. Peak secondary voltage V_m = V_s * √2 = 28.75 * 1.414 = 40.65 V.\n3. In a bridge rectifier, two diodes conduct simultaneously in series during each half cycle, so total resistance:\n   R_total = R_s + 2*R_f + R_L = 10 + 2(1) + 2000 = 2012 Ω.\n4. Peak load current I_m = V_m / R_total = 40.65 / 2012 = 0.0202 A = 20.2 mA.\n5. DC load current I_dc = (2 * I_m) / π = (2 * 20.2 mA) / 3.1416 = 12.86 mA = 0.01286 A.\n6. DC load power P_dc = (I_dc)² * R_L = (0.01286)² * 2000 = 0.331 W = 331 mW.\n7. Peak Inverse Voltage PIV = V_m = 40.65 V.\n8. RMS load current I_rms = I_m / √2 = 20.2 mA / 1.414 = 14.28 mA.\n   AC input power P_ac = (I_rms)² * R_total = (14.28 * 10^-3)² * 2012 = 0.410 W = 410 mW.\n   Efficiency η = P_dc / P_ac = 331 mW / 410 mW = 80.73% (Very close to theoretical max 81.2%!).',
        formula: 'Bridge R_total = R_s + 2·R_f + R_L | I_m = V_m/R_total | I_dc = 2I_m/π | PIV = V_m',
        keyPoints: [
          'Remember to add 2*R_f for bridge rectifiers because two diodes are in series in the conduction loop',
          'Theoretical maximum efficiency of full wave rectifiers is 81.2%'
        ]
      },
      {
        pageNumber: 11,
        title: 'Topic 6: Special Purpose Diodes - LED & Photodiode Operations and Comparison',
        content: '1. Light Emitting Diode (LED):\n- Principle: Electroluminescence. Under FORWARD BIAS, electrons cross from n-side and holes from p-side into active region.\n- When electrons recombine with holes, they fall from conduction to valence band, releasing excess energy in the form of PHOTONS (light).\n- Materials: Direct bandgap semiconductors (GaAs - Infrared, GaAsP - Red/Yellow, GaP - Green). Silicon/Germanium cannot be used because they are indirect bandgap materials (energy lost as heat).\n- Construction: Die mounted in reflective cup to focus light output in forward direction.\n- Seven-Segment Display: 7 distinct LED segments (labeled a, b, c, d, e, f, g) illuminate in combinations to display decimal digits 0 to 9.\n\n2. Photodiode:\n- Principle: Converts optical light energy into electrical current. Always operated in REVERSE BIAS.\n- When light photons (h*ν >= E_g) strike the reverse-biased depletion region through glass lens, electron-hole pairs are generated.\n- The electric field sweeps electrons to cathode and holes to anode, producing Photocurrent (I_p) directly proportional to incident light intensity (lux).\n- Dark Current: Small residual current flowing in photodiode even when no light is incident (due to thermal generation).\n\n3. Master Comparison Table:\n| Parameter | Conventional PN Diode | Zener Diode | LED | Photodiode |\n|---|---|---|---|---|\n| Symbol | Standard Diode | Zener (Z-shaped bar) | Diode with outward arrows | Diode with inward arrows |\n| Biasing | Forward Bias | Reverse Breakdown | Forward Bias | Reverse Bias |\n| Principle | Rectification / Switching | Constant Vz Breakdown | Electroluminescence (Photons emitted) | Optical absorption (Photocurrent produced) |\n| Material | Silicon / Germanium | Heavily doped Silicon | GaAs, GaAsP, GaP | Silicon / InGaAs / PIN |\n| Applications | Rectifiers, Clippers | Voltage Regulators | Indicators, 7-Segment Displays | Optical receivers, Camera sensors, Object counters |',
        formula: 'LED Emission: E = h·c/λ | Photodiode Current: I_total = I_dark + I_photocurrent',
        keyPoints: [
          'LED operates in Forward Bias; Photodiode operates in Reverse Bias',
          'Silicon/Germanium produce heat upon recombination; only direct bandgap compound semiconductors emit light in LEDs'
        ]
      }
    ]
  },
  {
    id: 'note-physics-unit1',
    title: 'Engineering Physics Unit 1 Notes: Wave Optics, Lasers & Quantum Mechanics',
    subject: 'Engineering Physics',
    branch: 'CSE',
    semester: 1,
    category: 'Handwritten Notes',
    description: 'Comprehensive 5-module semester study notes covering Thin Film Interference, Newton Rings wavelength derivation, Fraunhofer Diffraction at single slit, Laser population inversion (He-Ne & Semiconductor lasers), de Broglie wavelength, and 1D Time-Independent Schrödinger Equation.',
    author: {
      id: 'auth-physics',
      name: 'Applied Physics Faculty Division',
      college: 'National Institute of Technology (NITK) Academic Repository',
      verified: true,
      role: 'University Curriculum Board'
    },
    fileName: 'Engineering Physics Unit 1 Notes VD.pdf',
    fileSize: '14.2 MB',
    pages: 24,
    format: 'pdf',
    downloads: 520,
    upvotes: 412,
    isVerified: true,
    isFeatured: true,
    syllabusPattern: 'First Year Engineering Physics Syllabus',
    tags: ['Physics', 'Wave Optics', 'Interference', 'Lasers', 'Quantum Mechanics', 'Semester 1'],
    createdAt: '2026-09-15',
    syllabusUnitsCovered: [
      'Unit 1.1: Interference in Thin Films & Cosine Law',
      'Unit 1.2: Newton Rings Derivation & Measurement of Wavelength',
      'Unit 1.3: Fraunhofer Diffraction & Grating Resolving Power',
      'Unit 1.4: Einstein Coefficients & He-Ne Laser Operation',
      'Unit 1.5: Wave-Particle Duality & 1D Schrödinger Wave Equation'
    ],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Interference in Thin Films by Reflected & Transmitted Light',
        content: 'When light is incident on a thin parallel film of thickness t and refractive index μ, interference occurs between rays reflected from upper and lower surfaces.\n\nOptical Path Difference (Reflected Light):\nΔ = 2 · μ · t · cos(r) - λ/2 (Stokes phase shift of π or λ/2 occurs upon reflection from denser medium).\n\nConditions for Interference:\n1. Constructive (Bright Fringe / Maxima):\n   2 · μ · t · cos(r) = (2n + 1) · λ / 2, where n = 0, 1, 2...\n2. Destructive (Dark Fringe / Minima):\n   2 · μ · t · cos(r) = n · λ, where n = 0, 1, 2...\n\nNote: For transmitted light, the complementary pattern is observed (no Stokes phase shift).',
        formula: 'Cosine Law (Reflected): 2·μ·t·cos(r) = (2n + 1)·λ/2 (Bright) | n·λ (Dark)',
        keyPoints: [
          'An excessively thin film (t << λ) appears pitch black in reflected light due to 180° phase flip at upper interface',
          'Colors in soap bubbles and oil slicks on water are caused by thin-film interference of white light'
        ]
      },
      {
        pageNumber: 2,
        title: 'Newton’s Rings Experiment & Wavelength Derivation',
        content: 'Newton\'s rings are circular interference fringes formed between a plano-convex lens of large radius of curvature R and an optically flat glass plate.\n\nFilm thickness at radius r: t ≈ r² / (2R)\n\nFringe Diameters:\n1. Dark Rings (Minima): D_n² = 4 · n · λ · R\n   => Diameter D_n ∝ √n (Diameters are proportional to square root of natural numbers)\n2. Bright Rings (Maxima): D_n² = 2 · (2n - 1) · λ · R\n   => D_n ∝ √(2n - 1) (Diameters proportional to square root of odd numbers)\n\nDetermination of Unknown Wavelength λ:\nλ = ( D_(n+p)² - D_n² ) / ( 4 · p · R )\n\nRefractive Index of Liquid Film μ:\nμ = ( D_(n+p)² - D_n² )_air / ( D_(n+p)² - D_n² )_liquid',
        formula: 'Wavelength Formula: λ = [ D_(n+p)² - D_n² ] / ( 4 · p · R )',
        keyPoints: [
          'Central ring in reflected light is always dark because at point of contact t = 0 and path difference is λ/2',
          'Fringes become closer and closer as n increases because difference between consecutive roots decreases'
        ]
      },
      {
        pageNumber: 3,
        title: 'Fraunhofer Single-Slit Diffraction & Plane Diffraction Grating',
        content: 'Diffraction is the bending of light waves around corners of an obstacle.\n\n1. Single Slit Diffraction:\nSlit width = a, angle of diffraction = θ.\n- Central Maxima: Half angular width θ_0 = λ / a (Total angular width = 2λ / a)\n- Minima Condition: a · sin(θ) = ± m · λ (m = 1, 2, 3...)\n- Secondary Maxima: a · sin(θ) = ± (2m + 1) · λ / 2\n\n2. Plane Diffraction Grating:\nGrating element = (a + b) where a is slit width and b is opaque spacing.\n- Principal Maxima Condition: (a + b) · sin(θ) = n · λ, where n = order number\n- Dispersive Power: dθ / dλ = n / [ (a + b) · cos(θ) ]\n- Resolving Power: R = λ / dλ = n · N, where N is total number of illuminated grating lines.',
        formula: 'Grating Equation: (a + b) · sin(θ) = n · λ | Resolving Power R = n · N',
        keyPoints: [
          'Diffraction limit sets fundamental resolution of optical instruments (Rayleigh Criterion: θ_min = 1.22 λ / D)',
          'Higher orders disperse spectral lines with wider separation'
        ]
      },
      {
        pageNumber: 4,
        title: 'Lasers: Einstein Coefficients, Population Inversion & He-Ne Laser',
        content: 'LASER stands for Light Amplification by Stimulated Emission of Radiation.\n\nThree Radiative Transitions:\n1. Stimulated Absorption: Rate = B_12 · ρ(ν) · N_1\n2. Spontaneous Emission: Rate = A_21 · N_2\n3. Stimulated Emission: Rate = B_21 · ρ(ν) · N_2 (produces coherent identical photons!)\nEinstein Relation: B_12 = B_21 and A_21 / B_21 = (8 · π · h · ν³) / c³\n\nPopulation Inversion & Pumping:\nUnder thermal equilibrium, N_2 < N_1 (Boltzmann factor). Pumping creates non-equilibrium state N_2 > N_1 via a metastable state.\n\nHelium-Neon (He-Ne) Gas Laser:\n- Active Medium: He:Ne gas mixture in 10:1 ratio\n- Pumping Mechanism: Electric discharge collision\n- Laser Transition: Ne atom 3s -> 2p transition emitting red light at λ = 632.8 nm (continuous output ~1-50 mW)',
        formula: 'Einstein Relation: A_21 / B_21 = (8·π·h·ν³) / c³ | He-Ne Wavelength: λ = 632.8 nm',
        keyPoints: [
          'Stimulated emission generates photons with exact same frequency, direction, phase, and polarization',
          'Optical resonator mirrors provide positive feedback to sustain laser oscillation'
        ]
      },
      {
        pageNumber: 5,
        title: 'Quantum Mechanics: Wave-Particle Duality & 1D Schrödinger Equation',
        content: '1. de Broglie Hypothesis:\nEvery moving matter particle has associated matter waves with wavelength:\nλ = h / p = h / (m · v) = h / √( 2 · m · E )\nFor an electron accelerated through potential V: λ = 12.27 / √V Å\n\n2. Heisenberg Uncertainty Principle:\nΔx · Δp_x >= ℏ / 2, where ℏ = h / (2π)\nΔE · Δt >= ℏ / 2\n\n3. Time-Independent Schrödinger Wave Equation (1D):\n-(ℏ² / 2m) · (d²ψ / dx²) + V(x) · ψ(x) = E · ψ(x)\n\nParticle in a 1D Infinite Potential Well (0 <= x <= L):\n- Boundary conditions: ψ(0) = 0 and ψ(L) = 0\n- Normalized Eigenfunctions: ψ_n(x) = √( 2 / L ) · sin( n · π · x / L )\n- Quantized Energy Eigenvalues: E_n = ( n² · π² · ℏ² ) / ( 2 · m · L² ) = ( n² · h² ) / ( 8 · m · L² )\n- Zero-point energy (ground state n=1): E_1 = h² / (8 · m · L²) != 0 (particle can never be at absolute rest!)',
        formula: 'Schrödinger Eq: -(ℏ²/2m)·(d²ψ/dx²) + V·ψ = E·ψ | Energy: E_n = n²h²/(8mL²)',
        keyPoints: [
          'Wave function ψ itself is not observable, but |ψ(x)|² represents the probability density of finding the particle',
          'Zero-point energy E_1 > 0 is direct consequence of Heisenberg uncertainty principle'
        ]
      }
    ]
  },
  {
    id: 'note-1',
    title: 'Complete Data Structures & Algorithms Master Notes (with C++ & Java)',
    subject: 'Data Structures & Algorithms',
    branch: 'CSE',
    semester: 3,
    category: 'Handwritten Notes',
    description: 'Comprehensive handwritten semester exam revision notes covering Time Complexity, Trees (AVL, BST, B-Tree), Graphs (Dijkstra, Bellman-Ford, Kruskal), Dynamic Programming patterns, and Sorting.',
    author: {
      id: 'auth-1',
      name: 'Computer Science Academic Division',
      college: 'IIT Delhi Academic Open Access',
      verified: true,
      role: 'Curriculum Repository'
    },
    fileName: 'DSA_Comprehensive_Notes_Unit1_4.pdf',
    fileSize: '14.8 MB',
    pages: 48,
    format: 'pdf',
    downloads: 640,
    upvotes: 520,
    isVerified: true,
    isFeatured: true,
    syllabusPattern: 'Core CS Data Structures Syllabus',
    tags: ['DSA', 'Trees', 'Graphs', 'Dynamic Programming', 'Exam-Ready', 'Big-O'],
    createdAt: '2026-09-12',
    syllabusUnitsCovered: ['Unit 1: Stacks & Queues', 'Unit 2: Trees & Heaps', 'Unit 3: Graph Traversal', 'Unit 4: DP Algorithms'],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Asymptotic Analysis & Big-O Notation Cheat Sheet',
        content: 'Asymptotic notation describes the limiting behavior of execution time or memory as input size n grows to infinity.\n\nKey orders of growth in ascending order:\n1. O(1) - Constant: Direct hash table lookup, array index\n2. O(log n) - Logarithmic: Binary search, divide & conquer tree depth\n3. O(n) - Linear: Single loop traversal\n4. O(n log n) - Linearithmic: MergeSort, HeapSort, QuickSort (avg)\n5. O(n^2) - Quadratic: Nested loops, Bubble sort\n6. O(2^n) - Exponential: Subset generation\n7. O(n!) - Factorial: Traveling Salesperson brute force',
        keyPoints: [
          'Master Theorem: T(n) = a*T(n/b) + f(n)',
          'Amortized analysis applies to dynamic array resizing (average O(1))',
          'Space complexity must account for call stack frames in recursion'
        ],
        codeSnippet: `// Quick binary search with overflow prevention
int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2; // avoids integer overflow
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
      },
      {
        pageNumber: 2,
        title: 'Binary Search Trees & AVL Self-Balancing Trees',
        content: 'An AVL tree maintains height balance where Balance Factor BF = height(left) - height(right) ∈ {-1, 0, 1}.\n\nRotations to restore AVL property:\n- LL rotation (Single Right Rotate)\n- RR rotation (Single Left Rotate)\n- LR rotation (Left rotate on left child, then Right rotate on node)\n- RL rotation (Right rotate on right child, then Left rotate on node)\n\nSearch, Insertion, and Deletion are all guaranteed O(log n) in both worst and average cases.',
        formula: 'Balance Factor (BF) = Height(LeftSubtree) - Height(RightSubtree)',
        keyPoints: [
          'Worst-case height of AVL tree with n nodes is ~ 1.44 log2(n)',
          'Inorder traversal of BST always produces elements in sorted order',
          'BST deletion requires finding inorder predecessor or successor for 2-child nodes'
        ]
      },
      {
        pageNumber: 3,
        title: 'Graph Shortest Paths: Dijkstra vs Bellman-Ford',
        content: 'Comparison of Single-Source Shortest Path (SSSP) algorithms:\n\n1. Dijkstra Algorithm:\n- Works on non-negative edge weights only\n- Uses Priority Queue (Min-Heap)\n- Time: O((V + E) log V)\n\n2. Bellman-Ford Algorithm:\n- Relaxes all E edges V-1 times\n- Can detect negative weight cycles on the V-th iteration\n- Time: O(V * E)',
        keyPoints: [
          'If distance changes in the V-th relaxation, a negative cycle exists',
          'Floyd-Warshall solves All-Pairs Shortest Paths in O(V^3)',
          'Topological sort can find shortest paths in DAGs in linear O(V + E) time'
        ]
      }
    ]
  },
  {
    id: 'note-2',
    title: 'Operating Systems Complete Lecture Handouts & University PYQ Solutions',
    subject: 'Operating Systems',
    branch: 'CSE',
    semester: 4,
    category: 'Lecture Notes',
    description: 'Crisp, structured lecture slides and solved university questions on Process Synchronization, Bankers Algorithm for Deadlock Avoidance, Virtual Memory Paging, and Page Replacement algorithms (FIFO, LRU, Optimal).',
    author: {
      id: 'auth-2',
      name: 'Systems & Operating Systems Faculty Committee',
      college: 'BITS Pilani CS Coursepack Archive',
      verified: true,
      role: 'Curriculum Board'
    },
    fileName: 'OS_Complete_Coursepack_Sem4.pdf',
    fileSize: '19.2 MB',
    pages: 64,
    format: 'pdf',
    downloads: 490,
    upvotes: 395,
    isVerified: true,
    isFeatured: true,
    syllabusPattern: 'Semester 4 Operating Systems Syllabus',
    tags: ['OS', 'Deadlocks', 'Semaphores', 'Virtual Memory', 'Scheduling', 'Solved PYQs'],
    createdAt: '2026-08-20',
    syllabusUnitsCovered: ['Unit 1: Process & Threads', 'Unit 2: CPU Scheduling', 'Unit 3: Deadlocks & Synchronization', 'Unit 4: Memory Management'],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Process Synchronization & Semaphore Primitives',
        content: 'A Critical Section requires three mandatory conditions:\n1. Mutual Exclusion: If process Pi is executing in its critical section, no other processes can execute.\n2. Progress: If no process is executing and some want to enter, selection cannot be postponed indefinitely.\n3. Bounded Waiting: Bound on number of times other processes are allowed to enter after a request is made.\n\nCounting Semaphores vs Binary Semaphores (Mutexes). Wait() and Signal() operations are atomic.',
        keyPoints: [
          'Wait(S): while (S <= 0); S--;',
          'Signal(S): S++;',
          'Classic problems: Producer-Consumer, Dining Philosophers, Readers-Writers'
        ]
      },
      {
        pageNumber: 2,
        title: 'Deadlock Necessary Conditions & Banker’s Safety Algorithm',
        content: 'Four Coffman Conditions required for Deadlock:\n1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait\n\nBanker\'s Safety Algorithm:\nNeed[i, j] = Max[i, j] - Allocation[i, j]\nFind index i such that Finish[i] == false and Need[i] <= Work.\nThen Work = Work + Allocation[i]; Finish[i] = true.\nIf all Finish[i] are true, the system is in a SAFE state.',
        formula: 'Need[i][j] = Max[i][j] - Allocation[i][j]'
      }
    ]
  },
  {
    id: 'note-3',
    title: 'Signals & Systems Formula Handbook & Transform Tables',
    subject: 'Signals & Systems',
    branch: 'ECE',
    semester: 3,
    category: 'Formula Sheet',
    description: 'Handy pocket cheat sheet containing all CTFT, DTFT, Laplace, and Z-Transform duality properties, ROC rules, convolution integrals, and impulse response tables.',
    author: {
      id: 'auth-3',
      name: 'Signal Processing & Comm. Faculty Group',
      college: 'VNIT Nagpur Academic Archive',
      verified: true,
      role: 'ECE Curriculum Division'
    },
    fileName: 'Signals_and_Systems_Formula_Handbook.pdf',
    fileSize: '5.4 MB',
    pages: 18,
    format: 'pdf',
    downloads: 380,
    upvotes: 310,
    isVerified: true,
    isFeatured: true,
    syllabusPattern: 'ECE Transform & Systems Syllabus',
    tags: ['ECE', 'Laplace', 'Z-Transform', 'Fourier', 'Formulas', 'GATE Prep'],
    createdAt: '2026-09-01',
    syllabusUnitsCovered: ['Unit 1: Continuous Signals', 'Unit 2: LTI Systems', 'Unit 3: Fourier Transforms', 'Unit 4: Z-Transforms'],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Continuous-Time Fourier Transform (CTFT) Properties',
        content: 'Fourier Transform Pair:\nX(ω) = ∫ x(t) e^(-jωt) dt from -∞ to +∞\nx(t) = 1/(2π) ∫ X(ω) e^(jωt) dω\n\nKey Properties:\n- Linearity: a x1(t) + b x2(t) <-> a X1(ω) + b X2(ω)\n- Time Shifting: x(t - t0) <-> e^(-jωt0) X(ω)\n- Frequency Shifting: e^(jω0t) x(t) <-> X(ω - ω0)\n- Differentiation: d/dt x(t) <-> jω X(ω)\n- Convolution in Time: x1(t) * x2(t) <-> X1(ω) X2(ω)',
        formula: 'Convolution Theorem: x(t) * h(t) ⟷ X(jω) · H(jω)'
      }
    ]
  },
  {
    id: 'note-4',
    title: 'Deep Learning & Neural Networks: Math & PyTorch Architecture Notes',
    subject: 'Deep Learning & Neural Networks',
    branch: 'AIDS',
    semester: 5,
    category: 'Lecture Notes',
    description: 'Detailed derivations of Backpropagation, Gradient Descent variants (Adam, RMSProp), Convolutional filters math, ResNet skip connections, LSTM gates, and Transformer Self-Attention matrices (Q, K, V).',
    author: {
      id: 'auth-4',
      name: 'AI & Data Science Academic Cell',
      college: 'IIIT Hyderabad Research & Academic Archive',
      verified: true,
      role: 'Faculty Coursepack'
    },
    fileName: 'Deep_Learning_Math_And_Architectures.pdf',
    fileSize: '22.1 MB',
    pages: 56,
    format: 'pdf',
    downloads: 420,
    upvotes: 350,
    isVerified: true,
    isFeatured: true,
    syllabusPattern: 'Advanced Neural Networks Syllabus',
    tags: ['AI', 'Transformers', 'CNN', 'PyTorch', 'Backpropagation', 'Attention'],
    createdAt: '2026-09-18',
    syllabusUnitsCovered: ['Unit 1: Backpropagation & Optimization', 'Unit 2: Convolutional Networks', 'Unit 3: Recurrent Networks', 'Unit 4: Attention & Transformers'],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Scaled Dot-Product Attention & Multi-Head Mechanism',
        content: 'Attention is computed using Query (Q), Key (K), and Value (V) linear projections.\n\nAttention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V\n\nThe scaling factor 1/sqrt(d_k) prevents dot products from growing excessively large into regions with tiny gradients in softmax.',
        formula: 'Attention(Q, K, V) = softmax(Q · K^T / √d_k) · V',
        keyPoints: [
          'Multi-Head allows model to attend to information from different representation subspaces',
          'Self-attention has O(1) sequential operations compared to O(n) in RNNs',
          'Positional encoding (sinusoidal or learned) restores sequence order awareness'
        ]
      }
    ]
  },
  {
    id: 'note-5',
    title: 'Database Management Systems (DBMS) - BCNF & SQL Question Bank',
    subject: 'Database Management Systems',
    branch: 'CSE',
    semester: 4,
    category: 'Question Bank (PYQ)',
    description: 'Past 7 years solved university exams: 1NF to BCNF decomposition step-by-step proofs, conflict serializability precedence graphs, nested SQL queries, and B+ Tree indexing splits.',
    author: {
      id: 'auth-5',
      name: 'Database & Information Systems Division',
      college: 'Delhi Technological University (DTU) Exam Cell',
      verified: true,
      role: 'Solved Question Bank Archive'
    },
    fileName: 'DBMS_University_PYQ_Solved_2019_2026.pdf',
    fileSize: '11.2 MB',
    pages: 36,
    format: 'pdf',
    downloads: 350,
    upvotes: 280,
    isVerified: true,
    isFeatured: false,
    syllabusPattern: 'Relational Database Exam Pattern',
    tags: ['DBMS', 'SQL', 'Normalization', 'BCNF', 'Serializability', 'PYQ'],
    createdAt: '2026-07-29',
    syllabusUnitsCovered: ['Unit 1: ER Modeling', 'Unit 2: Relational Schema & Normalization', 'Unit 3: Indexing & Hashing', 'Unit 4: Concurrency Control'],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Boyce-Codd Normal Form (BCNF) Step-by-Step Test',
        content: 'A relation R is in BCNF if for every non-trivial functional dependency X -> Y, X is a superkey of R.\n\nLossless Join and Dependency Preservation:\n- BCNF decomposition is always lossless join.\n- BCNF may NOT always preserve all functional dependencies (unlike 3NF).',
        formula: 'If X → Y is non-trivial, then X must be a superkey of R.'
      }
    ]
  },
  {
    id: 'note-6',
    title: 'Strength of Materials: Mohr’s Circle & Beam Bending Solved Problems',
    subject: 'Strength of Materials',
    branch: 'MECH',
    semester: 3,
    category: 'Solved Papers',
    description: 'Handwritten problem solutions: Principal stresses, Mohr Circle graphical and analytical methods, deflection of cantilever & simply supported beams using Macaulay method.',
    author: {
      id: 'auth-6',
      name: 'Applied Mechanics & Design Division',
      college: 'NIT Trichy Mechanical Engineering Archive',
      verified: true,
      role: 'Academic Coursepack'
    },
    fileName: 'SOM_Mohr_Circle_Beam_Deflection_Solved.pdf',
    fileSize: '16.5 MB',
    pages: 42,
    format: 'pdf',
    downloads: 270,
    upvotes: 220,
    isVerified: true,
    isFeatured: false,
    syllabusPattern: 'Mechanical Engineering Core Syllabus',
    tags: ['SOM', 'Mohr Circle', 'Bending Moment', 'Mechanical', 'Strength of Materials'],
    createdAt: '2026-08-11',
    syllabusUnitsCovered: ['Unit 1: Stress-Strain Tensor', 'Unit 2: Shear & Bending', 'Unit 3: Deflection of Beams'],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Principal Stresses and Maximum In-Plane Shear Stress',
        content: 'Given normal stresses σx, σy and shear stress τxy on perpendicular planes:\n\nCenter of Mohr Circle: C = ((σx + σy)/2, 0)\nRadius of Mohr Circle: R = sqrt( ((σx - σy)/2)^2 + τxy^2 )\n\nPrincipal Stresses:\nσ1, σ2 = (σx + σy)/2 ± R\nMaximum in-plane shear stress τmax = R',
        formula: 'σ_1,2 = (σ_x + σ_y)/2 ± √[ ((σ_x - σ_y)/2)² + τ_xy² ]'
      }
    ]
  },
  {
    id: 'note-7',
    title: 'Reinforced Concrete Design (RCC IS:456) Complete Design Charts',
    subject: 'Design of Reinforced Concrete Structures (RCC)',
    branch: 'CIVIL',
    semester: 5,
    category: 'Lecture Notes',
    description: 'Complete Civil engineering guide to limit state design of singly/doubly reinforced beams, one-way/two-way slabs, short columns, and isolated footings based on Indian Standard IS 456:2000.',
    author: {
      id: 'auth-7',
      name: 'Civil & Structural Engineering Faculty Board',
      college: 'IIT Roorkee Structural Division',
      verified: true,
      role: 'IS Code Aligned Material'
    },
    fileName: 'RCC_Limit_State_Design_IS456_Guide.pdf',
    fileSize: '24.8 MB',
    pages: 58,
    format: 'pdf',
    downloads: 230,
    upvotes: 195,
    isVerified: true,
    isFeatured: false,
    syllabusPattern: 'Civil Engineering IS 456 Standard',
    tags: ['Civil', 'RCC', 'IS 456', 'Structures', 'Beams', 'Limit State'],
    createdAt: '2026-07-15',
    syllabusUnitsCovered: ['Unit 1: Limit State Philosophy', 'Unit 2: Flexure in Beams', 'Unit 3: Two-Way Slabs', 'Unit 4: Columns'],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Limiting Depth of Neutral Axis (Xu,max) for Fe250, Fe415, Fe500',
        content: 'For balanced section under IS 456 Limit State Design:\n- Mild Steel Fe 250: Xu,max / d = 0.53\n- HYSD Steel Fe 415: Xu,max / d = 0.48\n- HYSD Steel Fe 500: Xu,max / d = 0.46\n\nMoment of Resistance limiting formula:\nMu,lim = 0.36 * fck * b * Xu,max * (d - 0.42 * Xu,max)',
        formula: 'M_u,lim = 0.36 · f_ck · b · X_u,max · (d - 0.42·X_u,max)'
      }
    ]
  },
  {
    id: 'note-8',
    title: 'Control Systems: Bode Plot, Nyquist & Root Locus Master Sheet',
    subject: 'Control Systems',
    branch: 'EEE',
    semester: 4,
    category: 'Formula Sheet',
    description: 'Quick construction rules for Root Locus (angle condition, asymptotes, breakaway points) and Bode Plot asymptotic approximation (corner frequencies, phase margins, gain margin calculations).',
    author: {
      id: 'auth-8',
      name: 'Electrical & Control Systems Group',
      college: 'College of Engineering Guindy (Anna Univ)',
      verified: true,
      role: 'Curriculum Division'
    },
    fileName: 'Control_Systems_Bode_Nyquist_RootLocus.pdf',
    fileSize: '8.3 MB',
    pages: 26,
    format: 'pdf',
    downloads: 310,
    upvotes: 260,
    isVerified: true,
    isFeatured: false,
    syllabusPattern: 'Anna University EEE Syllabus',
    tags: ['EEE', 'Control Systems', 'Bode Plot', 'Root Locus', 'Stability', 'Nyquist'],
    createdAt: '2026-08-30',
    syllabusUnitsCovered: ['Unit 1: Transfer Functions', 'Unit 2: Time Response', 'Unit 3: Root Locus', 'Unit 4: Frequency Response'],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Root Locus Construction Rules & Angle of Asymptotes',
        content: 'Let P = number of open-loop poles, Z = number of open-loop zeros.\n\n1. Number of branches = max(P, Z)\n2. Branches originate from open-loop poles (K=0) and terminate at open-loop zeros (K=∞)\n3. Asymptotes angle θ = (2q + 1) * 180° / (P - Z), where q = 0, 1, ..., (P - Z - 1)\n4. Centroid σ = (Σ Real parts of poles - Σ Real parts of zeros) / (P - Z)',
        formula: 'Angle Condition: ∠G(s)H(s) = ±(2q + 1) · 180°'
      }
    ]
  }
];
