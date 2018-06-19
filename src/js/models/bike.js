const COLORS = [
  '#9400D3',
  '#4B0082',
  '#0000FF',
  '#00FF00',
  '#FFFF00',
  '#FF7F00',
  '#FF0000',
];

/**
 * Generate an array of bikes.
 * @param  {Number} number - The amount of bikes to generate.
 * @return {Object[]} Returns the generated bikes.
 */
const generate = (number) =>
  [...Array(number)].map((v, i) => ({
    id: `${i + 1}`,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    station: `${Math.floor(i % 3) + 1}`,
  }));

export { generate };
