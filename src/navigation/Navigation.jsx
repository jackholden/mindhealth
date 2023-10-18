/**
 * @file The navigation brains file, loads correct route stack
 * @author Jack Holden
 */

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";

import { useAuthContext } from "../hooks/useAuthContext";
import AppStack from "../navigation/stacks/AppStack";
import AuthStack from "../navigation/stacks/AuthStack";

/**
 * Navigation component in charge of ensuring all auth data
 * has been loaded before showing the correct route stack
 * to the end user based on auth status.
 *
 * @param {*} currentTheme - informs React Navigation of selected theme
 * @returns
 */
export default function Navigation({ currentTheme }) {
  const { loaded, user } = useAuthContext();

  /**
   * Ensure auth data fully loaded before showing app.
   */
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer
      theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
