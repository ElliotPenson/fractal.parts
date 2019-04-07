const alpha = 0.7;

const colorMap = {
  blue: `rgba(24, 144, 255, ${alpha})`,
  red: `rgba(245, 34, 45, ${alpha})`,
  yellow: `rgba(250, 219, 20,${alpha})`,
  purple: `rgba(114, 46, 209, ${alpha})`,
  green: `rgba(82, 196, 26, ${alpha})`,
  magenta: `rgba(235, 47, 150, ${alpha})`,
  cyan: `rgba(19, 194, 194, ${alpha})`,
  orange: `rgba(250, 140, 22, ${alpha})`,
  geekblue: `rgba(47, 84, 235, ${alpha})`,
  lime: `rgba(160, 217, 17, ${alpha})`,
  gold: `rgba(250, 173, 20, ${alpha})`,
  volcano: `rgba(250, 84, 28, ${alpha})`
};

export function* colors() {
  const values = Object.values(colorMap);
  for (let index = 0; true; index = (index + 1) % values.length) {
    yield values[index];
  }
}
