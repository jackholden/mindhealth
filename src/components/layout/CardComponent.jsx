import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useColours from "../../hooks/useColours";

export default function CardComponent({ children, style }) {
  const colours = useColours();
  const styles = makeStyles(colours);

  return <View style={[styles.card, style]}>{children}</View>;
}

const makeStyles = (colours) =>
  StyleSheet.create({
    card: {
      backgroundColor: colours.contrast,
      paddingHorizontal: 10,
      paddingVertical: 20,
      borderRadius: 15,
      borderWidth: 3,
      borderColor: colours.transWhite,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
