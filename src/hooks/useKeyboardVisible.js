/**
 * @file Returns boolean depending on Keyboard status
 * @author Jack Holden
 */

import { Keyboard } from "react-native";
import { useEffect, useState } from "react";

/**
 * Keyboard hook returning keyboardVisible boolean
 * on whether it's visible or not.
 *
 * @returns
 */
export default function useKeyboardVisible() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });
  }, []);

  return keyboardVisible;
}
