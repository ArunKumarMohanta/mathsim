import { describe, test, expect } from 'vitest';
import { calculateTrapezoidalArea, calculateNewtonRaphson, functionsMap } from '../utils/mathEngine';

// --- TESTS FOR TRAPEZOIDAL INTEGRATION ---
describe('Mathematical Engine - Trapezoidal Integration', () => {
  test('Calculates exact area for flat constant line', () => {
    const constantFunc = () => 5; 
    const area = calculateTrapezoidalArea(constantFunc, 0, 4, 10);
    expect(area).toBeCloseTo(20.00, 2);
  });

  test('Approximates area for Parabola f(x) = x^2', () => {
    const area = calculateTrapezoidalArea(functionsMap.parabola, 0, 3, 100);
    expect(area).toBeCloseTo(9.00, 1);
  });

  test('Gracefully returns 0 if intervals are invalid', () => {
    const area = calculateTrapezoidalArea(functionsMap.parabola, 0, 4, 0);
    expect(area).toBe(0);
  });
});

// --- TESTS FOR NEWTON-RAPHSON ROOT FINDING ---
describe('Mathematical Engine - Newton-Raphson Root Finding', () => {
  test('Finds positive root of f(x) = x^2 - 4 (root is 2)', () => {
    const f = (x) => x * x - 4;
    const df = (x) => 2 * x;
    
    const result = calculateNewtonRaphson(f, df, 3);
    expect(result.root).toBeCloseTo(2.00, 5);
    expect(result.iterations).toBeGreaterThan(0);
  });

  test('Throws error on division by zero (flat tangent)', () => {
    const f = (x) => x * x - 4;
    const df = (x) => 2 * x;
    
    expect(() => calculateNewtonRaphson(f, df, 0)).toThrow("Derivative is too close to zero");
  });

  test('Throws error if it diverges (exceeds max iterations)', () => {
    const f = (x) => x * x + 4;
    const df = (x) => 2 * x;
    
    expect(() => calculateNewtonRaphson(f, df, 3, 1e-7, 50)).toThrow("Did not converge within maximum iterations");
  });
});