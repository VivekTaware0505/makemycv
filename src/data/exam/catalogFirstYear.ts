import { Subject } from "./types";
import { make } from "./catalogHelpers";

/** First year (common to all engineering branches) — complete subject list. */
export const firstYearCatalog: Subject[] = [
  ...make(["first-year"], 1, 1, [
    ["Engineering Physics", "107002", ["Interference & Diffraction", "Polarization & Lasers", "Quantum Mechanics", "Semiconductor Physics", "Magnetic & Superconducting Materials"]],
    ["Engineering Chemistry", "107009", ["Water Technology", "Fuels & Combustion", "Polymers", "Corrosion & Electrochemistry", "Instrumental Techniques"]],
    ["Systems in Mechanical Engineering", "102003", ["Thermal Systems", "Power Transmission", "Machine Tools", "Mechatronics", "Basic Manufacturing"]],
    ["Basic Electrical Engineering", "103004", ["DC Circuits", "AC Fundamentals", "Three Phase Systems", "Transformers", "Electrical Safety & Wiring"]],
    ["Engineering Mechanics", "101011", ["Resultant of Forces", "Equilibrium", "Friction", "Kinematics of Particles", "Kinetics & Work-Energy"]],
    ["Engineering Graphics", "102012", ["Projection of Points & Lines", "Projection of Planes", "Projection of Solids", "Development of Surfaces", "Isometric Projection"]],
    ["Programming & Problem Solving", "110005", ["Algorithms & Flowcharts", "C Basics", "Control Structures", "Functions & Arrays", "Pointers & Files"]],
  ]),
  ...make(["first-year"], 1, 2, [
    ["Engineering Mathematics II", "107008", ["First Order ODE", "Higher Order Linear ODE", "Multiple Integrals", "Vector Differentiation", "Vector Integration"]],
    ["Basic Electronics Engineering", "104010", ["Semiconductor Diodes", "BJT & Applications", "Operational Amplifiers", "Digital Electronics", "Sensors & Communication Systems"]],
    ["Engineering Mechanics (Dynamics)", "101012", ["Kinematics of Rigid Bodies", "Kinetics of Rigid Bodies", "Impulse & Momentum", "Vibrations", "Virtual Work"]],
    ["Environmental Studies", "107013", ["Ecosystems", "Natural Resources", "Pollution & Control", "Sustainable Development", "Environmental Legislation"]],
    ["Engineering Mathematics – Linear Algebra", "107014", ["Matrices & Rank", "System of Equations", "Eigenvalues & Eigenvectors", "Diagonalization", "Applications"]],
    ["Workshop Practice & Manufacturing Skills", "102015", ["Fitting & Carpentry", "Welding", "Sheet Metal", "Machining Basics", "Safety Practices"]],
    ["Communication Skills / Soft Skills", "110016", ["Listening & Speaking", "Technical Writing", "Presentation Skills", "Group Discussion", "Interview Preparation"]],
  ]),
];