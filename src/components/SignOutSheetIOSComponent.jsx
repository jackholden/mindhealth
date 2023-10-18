/**
 * @file IOS only action sheet factoring in the signOut method.
 * @author Jack Holden
 */

import { ActionSheetIOS } from "react-native";

import ButtonComponent from "./layout/ButtonComponent";
import { useAuthContext } from "../hooks/useAuthContext";
import useColours from "../hooks/useColours";

export default function SignOutSheetIOSComponent() {
  const colours = useColours();

  const { handleSignOut } = useAuthContext();

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Sign Out"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        title: "Are you sure you want to sign out?",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          handleSignOut();
          console.log("signed out");
        }
      }
    );
  return (
    <ButtonComponent
      backgroundColor={colours.black}
      textColor={colours.white}
      onPress={onPress}
      text="Sign Out"
    />
  );
}
