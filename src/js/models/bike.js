const COLORS = ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000'];

const generate = (number) =>
  [...Array(number)].map((v, i) => ({
    id: i + 1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    station: `${Math.floor(Math.random() * 3) + 1}`,
  }));

export { generate };
