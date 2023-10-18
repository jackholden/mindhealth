/**
 * @file Handles local device authentication
 * @author Jack Holden
 */

import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

/**
 * This hook handles all local auth libraries and is
 * making accessible the functions we require throughout the app
 *
 * @returns
 */
export default function useLocalAuth() {
  const STORAGE_KEY = "@local_auth";

  const [isEnabled, setIsEnabled] = useState(false);
  const [isLocalAuthenticated, setIsLocalAuthenticated] = useState(false);
  const [isNotSupported, setIsNotSupported] = useState(false);

  const name = Constants.manifest.name;

  useEffect(() => {
    const getAuthStatus = async () => {
      const result = JSON.parse(
        (await AsyncStorage.getItem(STORAGE_KEY)) || "false"
      );

      setIsEnabled(result);
    };
    const hasDeviceSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) setIsNotSupported(true);
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) setIsNotSupported(true);
    };

    getAuthStatus();
    hasDeviceSupport();
  }, []);

  /**
   * Attempt authentication, this is ran in a useEffect on
   * initial launch to automatically pop up.
   */
  const attemptAuth = () => {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: `Authenticate to access ${name}`,
      fallbackLabel: "Enter Password",
    });
    auth.then((result) => {
      setIsLocalAuthenticated(result.success); // returns boolean
      console.log(result);
    });
  };

  /**
   * Toggle function used in the switch component offering complete
   * control over everything going on and returning it back to
   * output to the user.
   *
   * @param {*} result
   */
  const toggleAuth = async (result) => {
    try {
      if (result) {
        const status = await LocalAuthentication.authenticateAsync();
        if (!status.success) {
          if (status.error === "not_enrolled") {
            console.log(`${status.error} | Local authentication unsuccessful`);
            Alert.alert(
              "Your device doesn't have biometric authentication enabled."
            );
          } else {
            console.log(`${status.error} | Local authentication unsuccessful`);
          }
        } else {
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(result));
          setIsEnabled(result);
          console.log("Enabled Local Authentication");
        }
      } else {
        AsyncStorage.removeItem(STORAGE_KEY);
        setIsEnabled(result);
        console.log("Disabled Local Authentication");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isEnabled,
    toggleAuth,
    isLocalAuthenticated,
    attemptAuth,
    isNotSupported,
  };
}
