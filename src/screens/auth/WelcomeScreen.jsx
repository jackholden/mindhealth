/**
 * @file Handles welcome screen view, plus includes animation.
 * @author Jack Holden
 */

import { StyleSheet, Text, ImageBackground, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { BounceIn, FadeInDown } from "react-native-reanimated";

import PaddingComponent from "../../components/layout/PaddingComponent";
import ButtonComponent from "../../components/layout/ButtonComponent";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView edges={["right", "left", "top"]} style={styles.container}>
      <Animated.View
        entering={BounceIn.duration(1000)}
        style={styles.topSection}
      >
        <ImageBackground
          source={require("../../assets/MindHealth/Logo4.png")}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </Animated.View>

      <SafeAreaView edges={["bottom"]} style={styles.bottomSection}>
        <Animated.View entering={FadeInDown.delay(800).duration(1000)}>
          <Text style={styles.headingText}>MindHealth</Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(900).duration(1000)}>
          <Text style={styles.subHeadingText}>
            Your mind is a journey worth tracking
          </Text>
        </Animated.View>
        <PaddingComponent amount={25} />
        <Animated.View entering={FadeInDown.delay(1000).duration(1000)}>
          <ButtonComponent
            text="Get Started"
            onPress={() => navigation.navigate("Register")}
          />
        </Animated.View>
        <PaddingComponent />
        <Animated.View entering={FadeInDown.delay(1100).duration(1000)}>
          <ButtonComponent
            text="I already have an account"
            backgroundColor="transparent"
            textColor="black"
            size="trans"
            onPress={() => navigation.navigate("SignInEmail")}
          />
        </Animated.View>
        {Platform.OS === "android" && <PaddingComponent />}
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ADD8E6",
  },
  topSection: {
    flex: 2,
    backgroundColor: "transparent",
  },
  logoImage: {
    flex: 1,
    paddingVertical: 20,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headingText: {
    fontFamily: "Poppins-Semi",
    fontSize: 50,
    textAlign: "center",
    marginTop: 14,
  },
  subHeadingText: {
    fontFamily: "Poppins-Semi",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
});
