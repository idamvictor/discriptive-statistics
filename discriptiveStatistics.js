class DescriptiveStatistics {
  constructor(data) {
    // Initialize the class with the provided dataset
    this.data = data;
  }

  // Measures of Central Tendency

  // Mean
  calculateMean() {
    // Calculate the sum of all values in the dataset
    const sum = this.data.reduce((acc, value) => acc + value, 0);
    // Calculate the mean by dividing the sum by the number of values
    return sum / this.data.length;
  }

  // Median
  calculateMedian() {
    // Sort the dataset in ascending order
    const sortedData = this.data.slice().sort((a, b) => a - b);
    // Find the middle index of the sorted dataset
    const middle = Math.floor(sortedData.length / 2);

    // Check if the dataset has an even number of values
    if (sortedData.length % 2 === 0) {
      // If even, calculate the average of the two middle values
      return (sortedData[middle - 1] + sortedData[middle]) / 2;
    } else {
      // If odd, return the middle value
      return sortedData[middle];
    }
  }

  // Mode
  calculateMode() {
    // Create a frequency map to store the occurrence of each value
    const frequencyMap = new Map();

    // Iterate through the dataset and populate the frequency map
    this.data.forEach((value) => {
      frequencyMap.set(value, (frequencyMap.get(value) || 0) + 1);
    });

    let mode;
    let maxFrequency = 0;

    // Iterate through the frequency map to find the mode
    frequencyMap.forEach((frequency, value) => {
      if (frequency > maxFrequency) {
        mode = value;
        maxFrequency = frequency;
      }
    });

    // Return the mode (most frequent value)
    return mode;
  }

  // Measures of Dispersion

  // Range
  calculateRange() {
    // Sort the dataset in ascending order
    const sortedData = this.data.slice().sort((a, b) => a - b);
    // Calculate the range as the difference between the maximum and minimum values
    return sortedData[sortedData.length - 1] - sortedData[0];
  }

  // Variance
  calculateVariance() {
    // Calculate the mean of the dataset
    const mean = this.calculateMean();
    // Calculate the squared differences from the mean
    const squaredDifferences = this.data.map((value) => Math.pow(value - mean, 2));
    // Calculate the variance by dividing the sum of squared differences by the number of values
    const sumSquaredDifferences = squaredDifferences.reduce((acc, value) => acc + value, 0);
    return sumSquaredDifferences / this.data.length;
  }

  // Standard Deviation
  calculateStandardDeviation() {
    // Calculate the standard deviation as the square root of the variance
    return Math.sqrt(this.calculateVariance());
  }

  // Quartiles
  calculateQuartiles() {
    // Sort the dataset in ascending order
    const sortedData = this.data.slice().sort((a, b) => a - b);
    // Find the middle index of the sorted dataset
    const middle = Math.floor(sortedData.length / 2);

    // Calculate the lower and upper quartiles using the median
    const lowerQuartile = this.calculateMedian(sortedData.slice(0, middle));
    const upperQuartile = this.calculateMedian(sortedData.slice(middle + 1));

    // Return an object containing the lower and upper quartiles
    return { lowerQuartile, upperQuartile };
  }

  // Interquartile Range
  calculateInterquartileRange() {
    // Calculate the interquartile range as the difference between upper and lower quartiles
    const { lowerQuartile, upperQuartile } = this.calculateQuartiles();
    return upperQuartile - lowerQuartile;
  }
}

// Example Usage
const data = [5, 2, 7, 3, 8, 4, 10, 1, 6, 9];
const stats = new DescriptiveStatistics(data);

// Output the computed descriptive statistics
console.log("Mean:", stats.calculateMean());
console.log("Median:", stats.calculateMedian());
console.log("Mode:", stats.calculateMode());
console.log("Range:", stats.calculateRange());
console.log("Variance:", stats.calculateVariance());
console.log("Standard Deviation:", stats.calculateStandardDeviation());
console.log("Quartiles:", stats.calculateQuartiles());
console.log("Interquartile Range:", stats.calculateInterquartileRange());
