export const getThemeColor = (color: ColorValueType, lightness: number = 50) => {
  type colorBounds = { low: ColorStopType; high: ColorStopType };
  const initialBoundsValue: colorBounds = { low: { stop: 0, h: 0, s: 0 }, high: { stop: 100, h: 100, s: 100 } };

  const bounds = color.reduce((acc: colorBounds, color) => {
    if (color.stop <= lightness) {
      acc.low = color;
    }

    if (color.stop >= lightness && color.stop <= acc.high.stop) {
      acc.high = color;
    }

    return acc;
  }, initialBoundsValue);

  // If the lightness falls exactly on a stop not between two of them then simply return the values
  if (bounds.low.stop === bounds.high.stop) {
    return `hsl(${bounds.low.h}, ${bounds.low.s}%, ${lightness}%)`;
  } else {
    const multiplier = (lightness - bounds.low.stop) / (bounds.high.stop - bounds.low.stop);
    const h = (bounds.high.h - bounds.low.h) * multiplier + bounds.low.h;
    const s = (bounds.high.s! - bounds.low.s!) * multiplier + bounds.low.s!;
    return `hsl(${h}, ${s}%, ${lightness}%)`;
  }
};
