/**
 * @file Journal Entry Screen
 * @author Jack Holden
 */

import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";

import useColours from "../hooks/useColours";
import useGlobalStyles from "../hooks/useGlobalStyles";
import MultiTagSelector from "../components/MultiTagSelector";

import { SafeAreaView } from "react-native-safe-area-context";
import CenterHeader from "../components/header/CenterHeader";
import CardComponent from "../components/layout/CardComponent";
import ButtonComponent from "../components/layout/ButtonComponent";
import PaddingComponent from "../components/layout/PaddingComponent";
import LoadingComponent from "../components/layout/LoadingComponent";

export default function JournalEntryScreen({ navigation }) {
  const colours = useColours();
  const styles = useGlobalStyles();

  const [loaded, setLoaded] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selected, setSelected] = useState([]);

  const moods = ["Angry", "Sad", "Neutral", "Happy"];
  const moodsColours = ["#FF9999", "#99CCFF", "#FCFC22", "#99FF99"];

  const api_url = "https://jackholden.uk/api.php";

  useEffect(() => {
    async function getapi(api_url) {
      const response = await fetch(api_url);
      return await response.json();
    }

    // Wait for screen to come into focus
    const unsubscribe = navigation.addListener("focus", () => {
      getapi(api_url)
        .then((data) => {
          setApiData(data);
          // console.log("call");
        })
        .finally(() => setLoaded(true));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  /**
   * If loading show component
   */
  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: colours.white,
        }}
      >
        <LoadingComponent color={colours.accentBlue} />
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: colours.primary, flex: 1 }}>
      <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
        <CenterHeader title="New Entry" />
        <View
          style={[
            styles.horizontalPadding,
            {
              flex: 1,
              width: Dimensions.get("screen").width,
            },
          ]}
        >
          <PaddingComponent />
          <CardComponent>
            <Text
              style={{
                color: colours.black,
                textAlign: "center",
                fontFamily: "Poppins-Semi",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              What's your overall emotion right now?
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {moods.map((mood, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedMood(mood)}
                    style={[
                      selectedMood === mood
                        ? component.selected
                        : component.normal,
                      {
                        backgroundColor: moodsColours[index],
                        padding: 10,
                        borderRadius: 15,
                      },
                    ]}
                  >
                    <Text style={{ fontFamily: "Poppins-Semi" }}>{mood}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </CardComponent>
          <PaddingComponent />
          <CardComponent>
            <Text
              style={{
                color: colours.black,
                textAlign: "center",
                fontFamily: "Poppins-Semi",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              What words describe how you're feeling today?
            </Text>

            <MultiTagSelector
              options={apiData}
              onSelectionChange={(selectedOptions) =>
                setSelected(selectedOptions)
              }
            />
          </CardComponent>

          <PaddingComponent amount={30} />
          <ButtonComponent
            backgroundColor={colours.black}
            textColor={colours.white}
            text="Next"
            onPress={() => {
              if (selected == [] || selectedMood === null) {
                Alert.alert("All fields required");
              } else {
                navigation.navigate("JournalEntryInput", {
                  selected: selected,
                  overall: selectedMood,
                });
              }
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const component = StyleSheet.create({
  selected: {
    borderWidth: 3,
    borderColor: "#0000FF",
  },
  normal: {
    borderColor: "transparent",
    borderWidth: 3,
  },
});
