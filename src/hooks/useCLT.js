import { useState, useEffect, useRef, useCallback } from 'react';

export const useCLT = () => {
  const [histogramData, setHistogramData] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Keep a reference to the worker instance
  const workerRef = useRef(null);

  useEffect(() => {
    // Initialize the Web Worker using Vite's URL syntax
    workerRef.current = new Worker(new URL('../workers/cltWorker.js', import.meta.url), {
      type: 'module'
    });

    // Listen for the completed data coming back from the worker
    workerRef.current.onmessage = (e) => {
      setHistogramData(e.data);
      setIsCalculating(false); // Turn off the loading state
    };

    // Cleanup function: Terminate the worker if the user leaves the page
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // Function exposed to our UI button to trigger the massive calculation
  const runSimulation = useCallback((sampleSize = 50, numSamples = 100000) => {
    setIsCalculating(true);
    
    // Send the parameters to the background thread
    if (workerRef.current) {
      workerRef.current.postMessage({ sampleSize, numSamples });
    }
  }, []);

  return { histogramData, isCalculating, runSimulation };
};