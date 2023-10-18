/**
 * @file A toggle making use of the theme context data
 * @author Jack Holden
 */

import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import useColours from "../hooks/useColours";
import { useThemeContext } from "../hooks/useThemeContext";
import PaddingComponent from "./layout/PaddingComponent";

export default function ThemeToggle() {
  const { toggleTheme, themeLabel } = useThemeContext();
  const colours = useColours();
  const styles = makeStyles(colours);

  return (
    <>
      <Text style={styles.chooseThemeText}>Choose a theme</Text>
      <TouchableOpacity
        onPress={() => {
          toggleTheme();
        }}
      >
        <View style={styles.option}>
          <Text style={styles.optionText}>System</Text>
          <View
            style={
              themeLabel === "system" ? styles.radioSelected : styles.radioEmpty
            }
          />
        </View>
      </TouchableOpacity>
      <PaddingComponent />
      <TouchableOpacity
        onPress={() => {
          toggleTheme(0);
        }}
      >
        <View style={styles.option}>
          <Text style={styles.optionText}>Light</Text>
          <View
            style={
              themeLabel === "light" ? styles.radioSelected : styles.radioEmpty
            }
          />
        </View>
      </TouchableOpacity>
      <PaddingComponent />
      <TouchableOpacity
        onPress={() => {
          toggleTheme(1);
        }}
      >
        <View style={styles.option}>
          <Text style={styles.optionText}>Dark</Text>
          <View
            style={
              themeLabel === "dark" ? styles.radioSelected : styles.radioEmpty
            }
          />
        </View>
      </TouchableOpacity>
      <PaddingComponent amount={25} />
    </>
  );
}

const makeStyles = (colours) =>
  StyleSheet.create({
    chooseThemeText: {
      fontSize: 25,
      textAlign: "center",
      marginTop: 15,
      marginBottom: 25,
      fontFamily: "Poppins-Semi",
    },
    option: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
    },
    optionText: {
      fontSize: 18,
      fontFamily: "Poppins-Semi",
    },
    radioEmpty: {
      height: 25,
      width: 25,
      backgroundColor: colours.white,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      borderWidth: 3,
      borderColor: "#000",
    },
    radioSelected: {
      height: 25,
      width: 25,
      backgroundColor: "#99FF99",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      borderWidth: 3,
      borderColor: "#000",
    },
  });
