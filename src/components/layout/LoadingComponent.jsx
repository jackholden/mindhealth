/**
 * @file Loading component allowing easy customisation to native component
 * @author Jack Holden
 */

import { ActivityIndicator } from "react-native";
import useColours from "../../hooks/useColours";

export default function LoadingComponent({ size = "large", color }) {
  const colours = useColours();
  const themeSpinner = color ? color : colours.accentBlue;

  return <ActivityIndicator size={size} color={themeSpinner} />;
}
