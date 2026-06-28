import { useState, useEffect, useRef, useCallback } from 'react';

export const useCLT = () => {
  const [histogramData, setHistogramData] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Add state for our new interactive sliders
  const [sampleSize, setSampleSize] = useState(50);
  const [numSamples, setNumSamples] = useState(100000);
  
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/cltWorker.js', import.meta.url), {
      type: 'module'
    });

    workerRef.current.onmessage = (e) => {
      setHistogramData(e.data);
      setIsCalculating(false); 
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // Use the state variables instead of hardcoded numbers
  const runSimulation = useCallback(() => {
    setIsCalculating(true);
    
    if (workerRef.current) {
      workerRef.current.postMessage({ sampleSize, numSamples });
    }
  }, [sampleSize, numSamples]);

  return { 
    histogramData, 
    isCalculating, 
    runSimulation, 
    sampleSize, 
    setSampleSize, 
    numSamples, 
    setNumSamples 
  };
};