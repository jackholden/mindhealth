/**
 * @file Button component centralised providing consistent styles across app
 * @author Jack Holden
 */

import { StyleSheet, TouchableOpacity, Text } from "react-native";

/**
 * Component is a simple wrapper of the TouchableOpacity with
 * predefined styles with props making it highly customisable.
 *
 * @param {*} props
 * @returns
 */
export default function ButtonComponent(props) {
  const {
    onPress,
    text = "Placeholder",
    size,
    backgroundColor,
    textColor,
    disabled,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        size === "sm" && {
          paddingHorizontal: 5,
          paddingVertical: 10,
          elevation: 6,
          width: 70,
        },
        size === "trans" && {
          paddingVertical: 10,
          elevation: 0,
        },
        backgroundColor && { backgroundColor },
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          size === "sm" && { fontSize: 14 },
          textColor && { color: textColor },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 22,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "Poppins-Semi",
  },
});
