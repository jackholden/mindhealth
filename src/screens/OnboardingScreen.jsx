/**
 * @file Onboarding Screen
 * @author Jack Holden
 */

import { ImageBackground, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import OnboardingStepComponent from "../components/onboarding/OnboardingStepComponent";
import useNotifications from "../hooks/useNotifications";

export default function OnboardingScreen({ navigation }) {
  const { permissions, givenNotificationPerm } = useNotifications();

  // keep track of current scroll index and allow custom Next btn function to work
  const scrollRef = useRef(null);
  const getCurrentIndex = () => {
    const currentIndex = scrollRef.current?.getCurrentIndex();
    scrollRef.current?.scrollToIndex({ index: currentIndex + 1 });
  };

  const goToLastIndex = () => {
    scrollRef.current.goToLastIndex();
  };

  return (
    <View style={styles.container}>
      <SwiperFlatList ref={scrollRef}>
        <OnboardingStepComponent
          backgroundColor="#99FF99"
          title="Welcome to MindHealth"
          description="Your mind is a journey worth tracking"
          btnText="Next"
          onPress={getCurrentIndex}
          skipBtn={() => navigation.navigate("TabStack")}
        >
          <ImageBackground
            source={require("../assets/MindHealth/Logo4.png")}
            resizeMode="contain"
            style={{
              flex: 1,
            }}
          />
        </OnboardingStepComponent>
        <OnboardingStepComponent
          backgroundColor="#FCFC22"
          title="Question generation"
          description="We ask the questions, you provide the answers"
          btnText="Next"
          onPress={getCurrentIndex}
          skipBtn={() => navigation.navigate("TabStack")}
        >
          <ImageBackground
            source={require("../assets/MindHealth/questions.jpg")}
            resizeMode="contain"
            style={{
              flex: 1,
            }}
          />
        </OnboardingStepComponent>
        <OnboardingStepComponent
          backgroundColor="#CC99FF"
          title="Choose a theme that works for you"
          description="Use how you want to use."
          btnText="Next"
          onPress={goToLastIndex}
          skipBtn={() => navigation.navigate("TabStack")}
        >
          <ImageBackground
            source={require("../assets/MindHealth/theme.jpg")}
            resizeMode="contain"
            style={{
              flex: 1,
            }}
          />
        </OnboardingStepComponent>
        {!givenNotificationPerm && (
          <OnboardingStepComponent
            backgroundColor="#FF9999"
            title="Daily Journal Entry Notifcations"
            description="Want daily journal notifications?"
            btnText="Enable Notifications"
            onPress={permissions}
            skipBtn={() => navigation.navigate("TabStack")}
          >
            <ImageBackground
              source={require("../assets/MindHealth/notifications.jpg")}
              resizeMode="contain"
              style={{
                flex: 1,
              }}
            />
          </OnboardingStepComponent>
        )}
      </SwiperFlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF9999",
  },
});
