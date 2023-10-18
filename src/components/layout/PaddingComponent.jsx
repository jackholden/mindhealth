import { View } from "react-native";

/**
 * A very simple component used to avoid code repetition
 * and enable simple spacing between other components.
 *
 * It has a default value of 15 and has an amount prop
 * for customisation.
 *
 * @param {*} amount
 * @returns
 */
export default function PaddingComponent({ amount = 15 }) {
  return <View style={{ paddingBottom: amount }} />;
}
