/**
 * @file Responsible for checking if onboarding status has been completed
 * @author Jack Holden
 */

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function useOnboarding() {
  const STORAGE_KEY = "@onboarding_status";
  const [isFirstTime, setIsFirstTime] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkFirstTime = async () => {
      const result = await AsyncStorage.getItem(STORAGE_KEY);

      console.log("Onboarding Status:" + result);

      if (result === null) {
        // Value is null, set it to true
        setIsFirstTime(true);
        AsyncStorage.setItem(STORAGE_KEY, "false");
      } else {
        setIsFirstTime(false);
      }
    };

    checkFirstTime();
  }, []);

  useEffect(() => {
    if (isFirstTime === true) {
      const onboarding = setTimeout(() => {
        navigation.navigate("Onboarding", { screen: "Onboarding" });
      }, 3000);
      return () => clearTimeout(onboarding);
    }
  }, [isFirstTime]);

  return isFirstTime;
}
