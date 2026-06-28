// This file runs in a background thread, completely separate from the React UI.

self.onmessage = function (e) {
  const { sampleSize, numSamples } = e.data;
  
  // 1. Generate the massive dataset
  const means = [];
  for (let i = 0; i < numSamples; i++) {
    let sum = 0;
    // Simulating rolling 'sampleSize' number of dice/random numbers
    for (let j = 0; j < sampleSize; j++) {
      sum += Math.random(); 
    }
    // Calculate the mean of this specific sample
    means.push(sum / sampleSize);
  }

  // 2. Process the data into Histogram Bins for Recharts
  const numBins = 40;
  const min = Math.min(...means);
  const max = Math.max(...means);
  const binWidth = (max - min) / numBins;

  const bins = new Array(numBins).fill(0);
  
  for (let i = 0; i < means.length; i++) {
    const binIndex = Math.floor((means[i] - min) / binWidth);
    if (binIndex >= 0 && binIndex < numBins) {
      bins[binIndex]++;
    } else if (binIndex === numBins) {
      bins[numBins - 1]++; // Catch edge case for exact max value
    }
  }

  // 3. Format exactly how Recharts expects it: { bin: "0.52", count: 1205 }
  const histogramData = bins.map((count, i) => ({
    bin: (min + (i * binWidth) + (binWidth / 2)).toFixed(3),
    count
  }));

  // 4. Send the perfectly formatted data back to the main thread
  self.postMessage(histogramData);
};