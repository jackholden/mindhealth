import { Switch, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useNotifications from "../hooks/useNotifications";

export default function NotificationSwitch() {
  const STORAGE_KEY = "@local_notifications";

  const { schedulePushNotification, clearScheduled } = useNotifications();
  const [switchValue, setSwitchValue] = useState(false);

  const toggleNotifications = async (result) => {
    try {
      if (result) {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(result));
        setSwitchValue(result);
        console.log("set toggle");
        schedulePushNotification(); // dummy notification
        schedulePushNotification(
          "Good Morning!",
          "It's time for your daily journal entry.",
          "New Entry"
        ); // real journal notification
        alert("You have enabled daily journal notifications!");
      } else {
        AsyncStorage.removeItem(STORAGE_KEY);
        clearScheduled();
        setSwitchValue(result);
        console.log("removed toggle key");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getNotificationStatus = async () => {
      const result = JSON.parse(
        (await AsyncStorage.getItem(STORAGE_KEY)) || "false"
      );

      setSwitchValue(result);
    };

    getNotificationStatus();
  }, []);

  return (
    <Switch
      value={switchValue}
      disabled={Platform.OS !== "ios"}
      onValueChange={toggleNotifications}
    />
  );
}
