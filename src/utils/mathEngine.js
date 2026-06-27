/**
 * Approximates the definite integral of a function using the Trapezoidal Rule.
 * @param {Function} f - The mathematical function to integrate.
 * @param {number} a - The lower limit of integration.
 * @param {number} b - The upper limit of integration.
 * @param {number} n - The number of subintervals (trapezoids).
 * @returns {number} The approximated area under the curve.
 */
export const calculateTrapezoidalArea = (f, a, b, n) => {
  if (n <= 0) return 0;
  
  const h = (b - a) / n;
  let sum = 0.5 * (f(a) + f(b));

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += f(x);
  }

  return sum * h;
};

/**
 * Predetermined mathematical functions to use inside the simulator.
 */
export const functionsMap = {
  parabola: (x) => x * x,
  sine: (x) => Math.sin(x) + 1, // shifted vertically for clean visualization
  cubic: (x) => x * x * x - 3 * x + 4
};

/**
 * Finds the root of a function using the Newton-Raphson method.
 * @param {Function} f - The function to find the root for.
 * @param {Function} df - The derivative of the function.
 * @param {number} initialGuess - The starting x value.
 * @param {number} tolerance - The acceptable error margin.
 * @param {number} maxIterations - Maximum loops before failing to prevent infinite loops.
 * @returns {Object} The root, number of iterations used, and a history array for graphing.
 */
export const calculateNewtonRaphson = (f, df, initialGuess, tolerance = 1e-7, maxIterations = 100) => {
  let x = initialGuess;
  let iterations = 0;
  
  // We keep a history of steps so we can animate the graph later in React!
  const history = [{ x, y: f(x) }];

  while (Math.abs(f(x)) > tolerance && iterations < maxIterations) {
    const derivative = df(x);
    
    // Defensive programming: prevent division by zero (flat tangent line)
    if (Math.abs(derivative) < Number.EPSILON) {
      throw new Error("Derivative is too close to zero. Algorithm fails.");
    }

    x = x - (f(x) / derivative);
    history.push({ x, y: f(x) });
    iterations++;
  }

  // Defensive programming: prevent infinite loops
  if (iterations >= maxIterations) {
    throw new Error("Did not converge within maximum iterations.");
  }

  return { root: x, iterations, history };
};