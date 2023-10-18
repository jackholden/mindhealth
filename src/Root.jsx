/**
 * @file Manages the core app resources required for app to work
 * @author Jack Holden
 */

import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";

import { useThemeContext } from "./hooks/useThemeContext";
import Navigation from "./navigation/Navigation";
import LocalAuthScreen from "./screens/LocalAuthScreen";
import useLocalAuth from "./hooks/useLocalAuth";

/**
 * Root file responsible for loading in core App resources
 * such as fonts, theme, local authentication and passing
 * down props to show the correct the navigation stacks.
 *
 * @returns
 */
export default function Root() {
  /**
   * useFonts hook to load fonts
   */
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
    "Poppins-Semi": require("../src/assets/MindHealth/Poppins-SemiBold.ttf"),
  });

  /**
   * Grab required theme data and apply values to components.
   */
  const { theme, loaded: themeLoaded } = useThemeContext();

  /**
   * Grab required local auth data ready for checks.
   */
  const { isEnabled, isLocalAuthenticated, attemptAuth, message } =
    useLocalAuth();

  useEffect(() => {
    /**
     * Check theme loaded before deactivating SplashScreen.
     */
    if (themeLoaded) {
      console.log("Theme loaded: success");
      SplashScreen.hideAsync();
    }

    /**
     * If local auth enabled run attemptAuth().
     */
    if (isEnabled) {
      attemptAuth();
    }
  }, [themeLoaded]);

  /**
   * Ensure fonts fully loaded before showing app.
   */
  if (!fontsLoaded) {
    return null;
  }

  return isEnabled && !isLocalAuthenticated ? (
    <LocalAuthScreen message={message} onAuthenticate={attemptAuth} />
  ) : (
    <>
      <Navigation currentTheme={theme} />
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </>
  );
}
