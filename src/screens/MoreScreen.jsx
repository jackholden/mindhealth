/**
 * @file More Screen
 * @author Jack Holden
 */

import { Text, View, Dimensions, Platform } from "react-native";
import { useCallback, useRef } from "react";
import useColours from "../hooks/useColours";
import useGlobalStyles from "../hooks/useGlobalStyles";
import { useAuthContext } from "../hooks/useAuthContext";
import ButtonComponent from "../components/layout/ButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CenterHeader from "../components/header/CenterHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import PaddingComponent from "../components/layout/PaddingComponent";
import ThemeToggle from "../components/ThemeToggle";
import LocalSwitch from "../components/LocalSwitch";
import { FlashList } from "@shopify/flash-list";
import AppFooterComponent from "../components/AppFooterComponent";
import SettingsItemComponent from "../components/SettingsItemComponent";
import SignOutSheetIOSComponent from "../components/SignOutSheetIOSComponent";
import NotificationSwitch from "../components/NotificationSwitch";
import MoreAccountComponent from "../components/MoreAccountComponent";

export default function MoreScreen({ navigation }) {
  const colours = useColours();
  const styles = useGlobalStyles();

  const { handleSignOut, user } = useAuthContext();

  const clearStorage = async () => {
    try {
      await AsyncStorage.multiRemove([
        "@onboarding_status",
        "@preferred_theme",
      ]);
      alert("App Storage successfully cleared :)");
    } catch (e) {
      alert("Failed to clear the app storage :(");
    }
  };

  const sheetRef = useRef(null);
  const snapPoints = ["40%"];
  const handleClosePress = () => sheetRef.current.close();
  const handleOpenPress = () => sheetRef.current.snapToIndex(0);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.75}
      />
    ),
    []
  );

  /**
   * Custom Array for FlashList to support components
   * and a wider variety of abstracts.
   */
  const settings = [
    {
      customComponent: <MoreAccountComponent />,
    },
    "Security",
    { label: "Enable Biometrics", component: <LocalSwitch /> },
    {
      label: "Change Password",
      onPress: () =>
        navigation.navigate("Change Password", { screen: "Change Password" }),
    },
    "Appearance",
    { label: "Theme", onPress: () => handleOpenPress() },
    "Notifications",
    {
      label: "Enable daily Journal entry notification",
      component: <NotificationSwitch />,
    },
    "Actions",
    {
      label: "Restart Onboarding",
      onPress: () =>
        navigation.navigate("Onboarding", { screen: "Onboarding" }),
    },
    {
      label: "Clear cache",
      onPress: () => clearStorage(),
    },
    {
      customComponent:
        Platform.OS === "ios" ? (
          <>
            <PaddingComponent amount={20} />
            <SignOutSheetIOSComponent />
          </>
        ) : (
          <>
            <PaddingComponent amount={20} />
            <ButtonComponent
              backgroundColor={colours.black}
              textColor={colours.white}
              text="Sign Out"
              onPress={handleSignOut}
            />
          </>
        ),
    },
    {
      customComponent: <AppFooterComponent />,
    },
  ];

  return (
    <View style={{ backgroundColor: colours.primary, flex: 1 }}>
      <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
        <CenterHeader title="More" />
        <View
          style={{
            flex: 1,
            width: Dimensions.get("screen").width,
          }}
        >
          <FlashList
            data={settings}
            renderItem={({ item }) => {
              return (
                <View style={styles.horizontalPadding}>
                  {typeof item === "string" ? (
                    // Rendering header
                    <View
                      style={{
                        backgroundColor: "transparent",
                        marginTop: 10,
                        marginBottom: 8,
                      }}
                    >
                      <Text style={styles.header}>{item}</Text>
                    </View>
                  ) : (
                    <SettingsItemComponent
                      label={item.label}
                      onPress={item?.onPress}
                      component={item?.component}
                      customComponent={item?.customComponent}
                    />
                  )}
                </View>
              );
            }}
            getItemType={(item) => {
              // To achieve better performance, specify the type based on the item
              return typeof item === "string" ? "sectionHeader" : "row";
            }}
            estimatedItemSize={100}
          />
        </View>
      </SafeAreaView>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colours.accentBlue }}
      >
        <BottomSheetView style={styles.horizontalPadding}>
          <ThemeToggle />
          <View style={styles.rowAlignCenter}>
            <ButtonComponent
              size="sm"
              text="Close"
              onPress={handleClosePress}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
