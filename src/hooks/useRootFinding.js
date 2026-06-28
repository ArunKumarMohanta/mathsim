import { useState, useMemo } from 'react';
import { calculateNewtonRaphson } from '../utils/mathEngine';
import * as math from 'mathjs';

export const useRootFinding = () => {
  const [initialGuess, setInitialGuess] = useState(3);
  const [functionString, setFunctionString] = useState('x^2 - 4');
  
  const { root, iterations, error, chartData } = useMemo(() => {
    try {
      // Parse the function
      const node = math.parse(functionString);
      const code = node.compile();
      const f = (x) => code.evaluate({ x });

      // Automatically calculate the derivative using mathjs!
      const dfNode = math.derivative(node, 'x');
      const dfCode = dfNode.compile();
      const df = (x) => dfCode.evaluate({ x });

      const result = calculateNewtonRaphson(f, df, initialGuess);
      
      const data = [];
      for (let i = -5; i <= 5; i += 0.5) {
        data.push({ x: i, 'f(x)': f(i) });
      }

      return { 
        root: result.root.toFixed(4), 
        iterations: result.iterations, 
        error: null,
        chartData: data,
      };
    } catch (err) {
      // Catches both typing errors and mathematical divergence
      return { root: null, iterations: 0, error: err.message, chartData: [] };
    }
  }, [initialGuess, functionString]);

  return { initialGuess, setInitialGuess, functionString, setFunctionString, root, iterations, error, chartData };
};