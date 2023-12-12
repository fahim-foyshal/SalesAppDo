import { THEME_COLOR_TYPE } from "./actionsType";

export const setTheme = (theme) => ({
    type: THEME_COLOR_TYPE,
    payload: theme,
  });
  