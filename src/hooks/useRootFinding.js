import { useState, useMemo } from 'react';
import { calculateNewtonRaphson } from '../utils/mathEngine';

export const useRootFinding = () => {
  const [initialGuess, setInitialGuess] = useState(3);
  
  // We use a fixed function for the demo: f(x) = x^2 - 4 (roots at 2 and -2)
  const f = (x) => x * x - 4;
  const df = (x) => 2 * x;

  const { root, iterations, error, chartData } = useMemo(() => {
    try {
      const result = calculateNewtonRaphson(f, df, initialGuess);
      
      // Generate the parabola curve for the graph
      const data = [];
      for (let i = -5; i <= 5; i += 0.5) {
        data.push({
          x: i,
          'f(x)': f(i),
        });
      }

      return { 
        root: result.root.toFixed(4), 
        iterations: result.iterations, 
        error: null,
        chartData: data,
        history: result.history // To show the iteration steps later!
      };
    } catch (err) {
      // If the math engine throws an error (e.g., division by zero), we catch it here safely
      return { root: null, iterations: 0, error: err.message, chartData: [], history: [] };
    }
  }, [initialGuess]);

  return { initialGuess, setInitialGuess, root, iterations, error, chartData };
};