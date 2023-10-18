/**
 * @file Reduces code repetition, a single file as gateway
 * @author Jack Holden
 */

import { useContext } from "react";
import { ThemeContext } from "../utils/context/Theme";

/**
 * For DRY purposes, a simple hook to access
 * the Theme Context
 *
 * @returns
 */
export const useThemeContext = () => useContext(ThemeContext);
