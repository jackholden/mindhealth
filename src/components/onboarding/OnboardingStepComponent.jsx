import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonComponent from "../layout/ButtonComponent";
import PaddingComponent from "../layout/PaddingComponent";

import Animated, { BounceIn, FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function OnboardingStepComponent(props) {
  const {
    onPress,
    title = "Placeholder",
    description = "Placeholder description",
    btnText = "Ok!",
    children,
    position = "flex-end",
    backgroundColor = "pink",
    skipBtn,
  } = props;

  return (
    <View
      style={[
        styles.step,
        { justifyContent: position, backgroundColor: backgroundColor },
      ]}
    >
      <Animated.View entering={BounceIn.duration(1000)} style={{ flex: 1 }}>
        {children}
      </Animated.View>

      <SafeAreaView>
        <Animated.View entering={FadeInDown.delay(800).duration(1000)}>
          <Text style={styles.title}>{title}</Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(900).duration(1000)}>
          <Text style={styles.description}>{description}</Text>
        </Animated.View>
        <PaddingComponent />
        <Animated.View entering={FadeInDown.delay(1000).duration(1000)}>
          <ButtonComponent onPress={onPress} text={btnText} />
        </Animated.View>
        {skipBtn && (
          <>
            <PaddingComponent />
            <Animated.View entering={FadeInDown.delay(1100).duration(1000)}>
              <ButtonComponent
                text="Skip"
                backgroundColor="transparent"
                textColor="black"
                size="trans"
                onPress={skipBtn}
              />
            </Animated.View>
            {Platform.OS === "android" && <PaddingComponent />}
          </>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  step: {
    flex: 1,
    width,
    alignContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: width * 0.1,
    fontFamily: "Poppins-Semi",
    textAlign: "center",
    // color: "white",
    marginBottom: 0,
    lineHeight: 45,
  },
  description: {
    fontSize: width * 0.05,
    fontFamily: "Poppins-Semi",
    textAlign: "center",
    marginBottom: 20,
  },
});
