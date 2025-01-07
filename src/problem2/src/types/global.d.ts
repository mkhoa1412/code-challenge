// Utilities and Objects
type ObjectOf<T> = { [key: string]: T };

// Theme
type ColorStopType = { stop: number; h: number; s?: number };
type ColorValueType = ColorStopType[];
