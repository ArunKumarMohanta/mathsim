import { useState, useMemo } from 'react';
import { calculateTrapezoidalArea } from '../utils/mathEngine';
import * as math from 'mathjs';

export const useIntegration = () => {
  const [intervals, setIntervals] = useState(4);
  const [functionString, setFunctionString] = useState('x^2');
  const [error, setError] = useState(null);
  
  const a = 0; 
  const b = 4; 

  const { area, chartData, currentError } = useMemo(() => {
    try {
      // Safely parse the user's string into an executable math function
      const node = math.parse(functionString);
      const code = node.compile();
      const f = (x) => code.evaluate({ x });

      const calculatedArea = calculateTrapezoidalArea(f, a, b, intervals);
      
      const data = [];
      const steps = 40; 
      const stepSize = (b - a) / steps;
      const h = (b - a) / intervals; 

      for (let i = 0; i <= steps; i++) {
        const x = a + i * stepSize;
        const currentIntervalIdx = Math.min(Math.floor((x - a) / h), intervals - 1);
        const xLeft = a + currentIntervalIdx * h;
        const xRight = xLeft + h;
        const yLeft = f(xLeft);
        const yRight = f(xRight);
        
        const trapezoidY = yLeft + ((yRight - yLeft) / (xRight - xLeft)) * (x - xLeft);

        data.push({
          x: parseFloat(x.toFixed(2)),
          'True Curve': parseFloat(f(x).toFixed(2)),
          'Trapezoid': parseFloat(trapezoidY.toFixed(2)),
        });
      }
      return { area: calculatedArea.toFixed(4), chartData: data, currentError: null };
    } catch (err) {
      return { area: '0.0000', chartData: [], currentError: "Invalid math function. Try 'x^2' or 'sin(x)'" };
    }
  }, [intervals, functionString]);

  // Update error state
  useMemo(() => setError(currentError), [currentError]);

  return { intervals, setIntervals, functionString, setFunctionString, area, chartData, error };
};