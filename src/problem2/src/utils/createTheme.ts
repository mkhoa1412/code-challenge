import { createTheme } from "@mui/material/styles";
import themes, { THEME_NAMES } from "~/config/themes";

const createAppTheme = (name: keyof typeof THEME_NAMES) => {
  const themeConfig = (() => {
    const selectedTheme = themes.find((theme) => theme.name === name);

    if (!selectedTheme) {
      console.warn(new Error(`The theme ${name} is not valid`));
      return themes[0];
    }
    return selectedTheme;
  })();

  return createTheme({
    name: themeConfig.name,
    palette: themeConfig.palette,
  });
};

export default createAppTheme;
