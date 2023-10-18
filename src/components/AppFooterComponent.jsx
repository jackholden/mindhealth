import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import useColours from "../hooks/useColours";

export default function AppFooterComponent() {
  const colours = useColours();
  const styles = makeStyles(colours);
  const name = Constants.manifest.name;
  const version = Constants.manifest.version;
  const developer = Constants.manifest?.extra?.developer;

  return (
    <View style={styles.AppFooter}>
      <Text style={styles.footer}>
        v{version} | {name} |{" "}
      </Text>
      <Ionicons name="heart" size={24} color="red" />
      <Text style={styles.footer}> {developer}</Text>
    </View>
  );
}

const makeStyles = (colours) =>
  StyleSheet.create({
    AppFooter: {
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginTop: 20,
      marginBottom: 40,
    },
    footer: {
      textAlign: "center",
      fontFamily: "Poppins-Semi",
      color: colours.black,
    },
  });
