/**
 * @file Handles all notification methods, reshaped to fit MindHealth app needs.
 * @author Jack Holden
 */

import { Platform } from "react-native";
import { useEffect, useState, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useNavigation } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function useNotifications() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [givenNotificationPerm, setGivenNotificationPerm] = useState(false);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    givenPermissions();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log("--- notification received ---");
        console.log(notification);
        console.log("------");
      });

    /**
     * When the user has tapped on the notification, take them
     * to the correct screen.
     */
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("--- notification tapped ---");
        const screen = response?.notification?.request?.content?.data?.screen;
        navigation.navigate("TabStack", { screen: screen });
        console.log("------");
        Notifications.dismissNotificationAsync(
          response.notification.request.identifier
        );
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function permissions() {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }

  async function schedulePushNotification(
    title = "Good Morning!",
    body = "A dummy notification showing activated",
    screen = "",
    repeats = false
  ) {
    console.log("reqested notifcation");

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { screen: screen },
      },
      trigger: {
        // hour: 10,
        repeats: repeats,
        second: 5,
      },
    });
  }

  async function getScheduled() {
    console.log("getting schedfuled notifcation");

    const slay = await Notifications.getAllScheduledNotificationsAsync();
    console.log(slay);
  }

  /**
   * When user disables daily notifications, we need to end the repeat cycle
   */
  async function clearScheduled() {
    console.log("clearing scheduled notifications");

    const clearNotif =
      await Notifications.cancelAllScheduledNotificationsAsync();
    console.log(clearNotif);
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  async function givenPermissions() {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      if (existingStatus !== "granted") {
        setGivenNotificationPerm(false);
      }
      setGivenNotificationPerm(true);
    } else {
      setGivenNotificationPerm(false);
      console.log("Must use physical device for Push Notifications");
    }
  }

  return {
    expoPushToken,
    notification,
    permissions,
    schedulePushNotification,
    givenNotificationPerm,
    clearScheduled,
  };
}
