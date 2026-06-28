import { useState, useMemo } from 'react';
import { calculateTrapezoidalArea, functionsMap } from '../utils/mathEngine';

export const useIntegration = () => {
  const [intervals, setIntervals] = useState(4);
  const [functionType, setFunctionType] = useState('parabola');
  
  // Fixed bounds for our visualization
  const a = 0; 
  const b = 4; 

  // useMemo ensures we only recalculate when intervals or functionType change
  const { area, chartData } = useMemo(() => {
    const f = functionsMap[functionType];
    const calculatedArea = calculateTrapezoidalArea(f, a, b, intervals);
    
    // Generate the geometric data points for the Recharts graph
    const data = [];
    const steps = 40; // High resolution for the smooth true curve
    const stepSize = (b - a) / steps;
    const h = (b - a) / intervals; // Width of one trapezoid

    for (let i = 0; i <= steps; i++) {
      const x = a + i * stepSize;
      
      // Calculate where the straight line of the trapezoid should be at this exact X coordinate
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

    return { area: calculatedArea.toFixed(4), chartData: data };
  }, [intervals, functionType]);

  return { intervals, setIntervals, functionType, setFunctionType, area, chartData };
};