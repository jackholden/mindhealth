/**
 * @file Local Authentication Screen
 * @author Jack Holden
 */

import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

import { useAuthContext } from "../hooks/useAuthContext";
import useColours from "../hooks/useColours";
import { getGreeting } from "../utils/getGreeting";
import ButtonComponent from "../components/layout/ButtonComponent";
import PaddingComponent from "../components/layout/PaddingComponent";

export default function LocalAuthScreen({ onAuthenticate, message }) {
  const colours = useColours();
  const styles = makeStyles(colours);

  const { user } = useAuthContext();
  const name = Constants.manifest.name;
  const version = Constants.manifest.version;

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.container}>
        <View style={styles.localAuth}>
          <View style={{ alignItems: "center" }}>
            <Image
              resizeMode={"stretch"}
              source={require("../assets/MindHealth/logo-paddless.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.secondaryMessage}>
            <Text style={styles.secondaryMessageText}>{getGreeting(", ")}</Text>
            <Text style={styles.link}>{user?.displayName}!</Text>
          </View>
          <PaddingComponent amount={70} />
          <ButtonComponent
            text="Authenticate"
            backgroundColor={colours.black}
            textColor={colours.white}
            onPress={onAuthenticate}
          />
        </View>

        <View>
          <Text style={styles.footer}>
            v{version} | {name}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const makeStyles = (colours) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colours.primary,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    localAuth: {
      flex: 1,
      justifyContent: "center",
    },
    logo: {
      width: 120,
      height: 150,
    },
    greeting: {
      fontFamily: "Poppins-Semi",
      fontSize: 45,
      textAlign: "left",
    },
    secondaryMessage: {
      marginTop: 20,
      alignItems: "center",
    },
    secondaryMessageText: {
      fontFamily: "Poppins-Semi",
      fontSize: 45,
      color: colours.black,
    },
    link: {
      color: colours.link,
      fontFamily: "Poppins-Semi",
      fontSize: 45,
    },
    footer: {
      textAlign: "center",
      fontFamily: "Poppins-Semi",
      color: colours.black,
    },
  });
