# 🧮 MathSim: Interactive Engineering Algorithms

🚀 **View Live Demo:** [mathsim-six.vercel.app](https://mathsim-six.vercel.app)

MathSim is a high-performance, interactive mathematical simulation dashboard built with React. It visualizes complex numerical methods and statistical theorems in real-time, designed to demonstrate production-grade software engineering practices including multithreading, custom state management, and test-driven development.

---

## ✨ Core Features

The application is divided into three primary modules, each solving a distinct mathematical problem:

### 1. Trapezoidal Rule Approximation (Numerical Integration)

- **Dynamic Parsing:** Users can input any mathematical function as a string (e.g., `x^2 - 4`, `sin(x) * 2`). The app safely compiles and evaluates this in real-time using **mathjs**.

- **Geometrical Visualization:** Visualizes how continuous integration is approximated using discrete linear trapezoids.

- **Real-time Error Mapping:** As the user increases the interval slider, the UI dynamically recalculates and re-renders the area approximation instantly using **Recharts**.

---

### 2. Newton-Raphson Root Finding

- **Algorithmic Convergence:** An interactive demonstration of iterative root-finding.

- **Automatic Differentiation:** Leverages **mathjs** to automatically compute the derivative of the user's custom input function in the background.

- **Defensive Programming:** Implements strict error boundaries to catch mathematical divergence (e.g., division by zero when the tangent slope is perfectly flat) without crashing the React UI.

---

### 3. Central Limit Theorem (High-Performance Monte Carlo)

- **Background Multithreading:** Proves that the sum of independent random variables tends toward a normal distribution by simulating hundreds of thousands of dice rolls.

- **Web Worker Implementation:** Generates up to **500,000 samples** (millions of arithmetic operations) via a dedicated Web Worker thread. This ensures the browser's main UI thread never freezes, maintaining a silky smooth **60fps** experience even during heavy computation.

---

## 🏗️ Architectural Highlights

This project was built with a strict separation of concerns, simulating an enterprise-level frontend architecture:

- **Pure Mathematical Engine:** All core logic (`mathEngine.js`) is decoupled from the UI, allowing it to be rigorously unit-tested in isolation.

- **Test-Driven Development (TDD):** Business logic is backed by a **Vitest** testing suite to guarantee mathematical accuracy and graceful failure handling.

- **Custom React Hooks:** Complex state logic, mathjs parsing, and Web Worker lifecycles are abstracted into custom hooks (`useIntegration.js`, `useRootFinding.js`, `useCLT.js`), keeping the main dashboard UI declarative and clean.

- **Optimized Rendering:** Uses `useMemo` and `useCallback` to prevent unnecessary re-renders when generating massive geometric chart datasets.

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/mathsim.git
cd mathsim
````

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to:

```
http://localhost:5173
```

---

## 🧪 Testing

This project uses **Vitest** for unit testing the core mathematical engine.

To run the test suite:

```bash
npm run test
```

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 18
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4
* **Data Visualization:** Recharts
* **Math Parsing:** Math.js
* **Testing:** Vitest
* **Icons:** Lucide React

---

Designed and engineered as a showcase of modern JavaScript capabilities and robust frontend architecture.

```
