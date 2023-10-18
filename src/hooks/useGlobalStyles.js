/**
 * @file Makes globalStyles and colours globally accessible anywhere
 * @author Jack Holden
 */

import useColours from "./useColours";
import globalStyles from "../StyleSheet";

/**
 *
 * @returns
 */
export default function useGlobalStyles() {
  const colours = useColours();
  const styles = globalStyles(colours);
  return styles;
}
