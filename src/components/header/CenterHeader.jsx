/**
 * @file Header component centralised used on a variety of screens
 * @author Jack Holden
 */

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useColours from "../../hooks/useColours";

/**
 * Custom header component offering simplistic navigation.
 *
 * @param {string} props - page title and optional destination props
 * @returns
 */
export default function CenterHeader({
  title,
  destinationScreen = "",
  rightComponent,
}) {
  const colours = useColours();
  const styles = makeStyles(colours);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // Ensure's header is visible across all devices.

  /**
   * Simple function to direct to specified screen
   * or call goBack method for previous screen.
   */
  function navigator() {
    if (destinationScreen !== "") {
      navigation.navigate(destinationScreen);
    } else {
      navigation.goBack();
    }
  }

  return (
    <View style={styles.header}>
      <View style={[styles.headerContainer, { paddingTop: insets.top + 15 }]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={navigator} style={styles.backBtn}>
            {destinationScreen !== "" ? (
              <Ionicons name="person-sharp" size={25} color={colours.black} />
            ) : (
              <Ionicons
                name="arrow-back-sharp"
                size={25}
                color={colours.black}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", flex: 2 }}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          {rightComponent}
        </View>
      </View>
    </View>
  );
}

const makeStyles = (colours) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      backgroundColor: colours.white,
      paddingBottom: 15,
      zIndex: 3,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerText: {
      fontFamily: "Poppins-Semi",
      fontSize: 18,
      color: colours.black,
      alignSelf: "center",
      textAlign: "center",
    },
    backBtn: {
      alignSelf: "flex-start",
      // backgroundColor: colours.primary,
      padding: 5,
      // borderRadius: 15,
      // borderWidth: 3,
      // borderColor: colours.black,
    },
  });
