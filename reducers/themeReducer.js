// themeReducer.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME_COLOR_TYPE } from '../action/actionsType';


const initialState = {
  theme: 'default',
};

// Check AsyncStorage for the saved theme
AsyncStorage.getItem('theme').then((savedTheme) => {
  if (savedTheme) {
    initialState.theme = savedTheme;
  }
});

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_COLOR_TYPE:
      // Save the theme to AsyncStorage
      AsyncStorage.setItem('theme', action.payload);
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
