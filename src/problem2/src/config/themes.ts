import { PaletteOptions } from "@mui/material/styles/createPalette";

type CustomPaletteType = Pick<PaletteOptions, "primary" | "secondary">;

export const THEME_NAMES = {
  DEFAULT: "DEFAULT",
  DARK: "DARK",
} as const;

export type ThemeType = {
  name: keyof typeof THEME_NAMES;
  palette: CustomPaletteType;
};

const defaultTheme: ThemeType = {
  name: THEME_NAMES.DEFAULT,
  palette: {
    primary: {
      main: "#E01728",
      contrastText: "#383839",
    },
    secondary: {
      main: "#676869",
    },
  },
};

const themes: Array<ThemeType> = [defaultTheme];

declare module "@mui/material/styles" {
  interface Theme {
    name: ThemeType["name"];
  }
  interface ThemeOptions {
    name: ThemeType["name"];
  }
}

export default themes;
