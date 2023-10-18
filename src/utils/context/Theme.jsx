/**
 * @file Theme Context and Provider file
 * @author Jack Holden
 */

import { useColorScheme } from "react-native";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Create a React Context for the theme as
 * we want the theme values and functionality
 * to be accessible from everywhere
 */
export const ThemeContext = createContext();

/**
 * The ThemeProvider in charge of all things theme
 * related. Logic is we grab the device theme as default
 * before checking the async storage to see if the 'preferred_theme'
 * is present and then applying that value as the theme.
 *
 * Below is then a toggle function which handles the 3 options
 * made available to the users.
 *
 * @param {*} children
 * @returns
 */
export const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState(deviceTheme);
  const [themeLabel, setThemeLabel] = useState("system");
  const [loaded, setLoaded] = useState(false);

  /**
   * Simply checks async storage for a saved theme, if none
   * we set to system theme and then end the loading.
   */
  useEffect(() => {
    AsyncStorage.getItem("@preferred_theme")
      .then((themeValue) => {
        console.log(`Storage Theme: ${themeValue}`);
        console.log(`Default Device Theme: ${theme}`);
        if (themeValue !== null) {
          setTheme(themeValue);
          setThemeLabel(themeValue);
        }
      })
      .finally(() => setLoaded(true));
  }, []);

  /**
   * toggleTheme() is in charge of handling the theme state,
   * assigning to local storage and being exposed to the
   * user interaction side of things.
   *
   * It has 3 modes, light, dark, system
   *
   * @param {*} mode - to run the correct code for chosen theme
   */
  const toggleTheme = (mode) => {
    switch (mode) {
      case 0:
        setTheme("light");
        setThemeLabel("light");
        AsyncStorage.setItem("@preferred_theme", "light");
        console.log("Light Theme Enabled");
        break;
      case 1:
        setTheme("dark");
        setThemeLabel("dark");
        AsyncStorage.setItem("@preferred_theme", "dark");
        console.log("Dark Theme Enabled");
        break;
      default:
        setTheme(deviceTheme);
        setThemeLabel("system");
        AsyncStorage.removeItem("@preferred_theme");
        console.log("System/Device Theme Enabled");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, loaded, themeLabel }}>
      {children}
    </ThemeContext.Provider>
  );
};
