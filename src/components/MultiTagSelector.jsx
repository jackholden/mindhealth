import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import useColours from "../hooks/useColours";

const MultiTagSelector = ({ options, onSelectionChange }) => {
  const colours = useColours();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionPress = (option) => {
    let newSelectedOptions;
    if (selectedOptions.length === 4 && !selectedOptions.includes(option)) {
      return;
    }
    if (selectedOptions.includes(option)) {
      newSelectedOptions = selectedOptions.filter((o) => o !== option);
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(newSelectedOptions);
    onSelectionChange(newSelectedOptions);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleOptionPress(option)}
          style={[
            selectedOptions.includes(option) ? styles.selected : styles.normal,
            {
              padding: 10,
              backgroundColor: colours.primary,
              marginHorizontal: 3,
              borderRadius: 15,
              marginVertical: 3,
            },
          ]}
        >
          <Text
            style={{
              color: colours.black,
              fontFamily: "Poppins-Semi",
            }}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  selected: {
    borderWidth: 3,
    borderColor: "#0000FF",
  },
  normal: {
    borderColor: "transparent",
    borderWidth: 3,
  },
});

export default MultiTagSelector;
