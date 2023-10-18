import { View, Text, Image } from "react-native";
import React from "react";
import { getGreeting } from "../utils/getGreeting";
import useColours from "../hooks/useColours";
import useGlobalStyles from "../hooks/useGlobalStyles";
import { useAuthContext } from "../hooks/useAuthContext";

export default function MoreAccountComponent() {
  const colours = useColours();
  const styles = useGlobalStyles();

  const { user } = useAuthContext();

  return (
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginTop: 50,
        marginBottom: 30,
      }}
    >
      <Image
        resizeMode={"stretch"}
        style={{
          width: 90,
          height: 120,
          backgroundColor: colours.primary,
        }}
        source={require("../assets/MindHealth/logo-paddless.png")}
      />
      <Text
        style={{
          color: colours.black,
          fontSize: 30,
          marginTop: 10,
          fontFamily: "Poppins-Semi",
        }}
      >
        {getGreeting(",")} {user?.displayName}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: "Poppins-Semi",
          color: colours.black,
        }}
      >
        {user?.email}
      </Text>
    </View>
  );
}
