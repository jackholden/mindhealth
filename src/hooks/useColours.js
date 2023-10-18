/**
 * @file Places the current theme value in the colour array
 * @author Jack Holden
 */

import { colours } from "../../colours.config";
import { useThemeContext } from "./useThemeContext";

/**
 * For DRY purposes, a simple hook to fetch the Theme Context
 * and return the colour array theme-selector key (light/dark)
 *
 * @returns
 */
export default function useColours() {
  const { theme } = useThemeContext();
  return colours[theme];
}
