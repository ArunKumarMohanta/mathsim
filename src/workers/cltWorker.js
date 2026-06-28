self.onmessage = function (e) {
  const { sampleSize, numSamples } = e.data;
  
  // 1. Generate the massive dataset
  const means = [];
  let min = Infinity;
  let max = -Infinity;

  for (let i = 0; i < numSamples; i++) {
    let sum = 0;
    // Simulating rolling 'sampleSize' number of dice/random numbers
    for (let j = 0; j < sampleSize; j++) {
      sum += Math.random(); 
    }
    const mean = sum / sampleSize;
    means.push(mean);

    // Track min and max continuously to avoid the spread operator crash
    if (mean < min) min = mean;
    if (mean > max) max = mean;
  }

  // 2. Process the data into Histogram Bins for Recharts
  const numBins = 40;
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

  // 3. Format exactly how Recharts expects it
  const histogramData = bins.map((count, i) => ({
    bin: (min + (i * binWidth) + (binWidth / 2)).toFixed(3),
    count
  }));

  // 4. Send the perfectly formatted data back to the main thread
  self.postMessage(histogramData);
};