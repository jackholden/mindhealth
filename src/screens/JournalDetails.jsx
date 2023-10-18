/**
 * @file Journal Details Screen
 * @author Jack Holden
 */

import { View, Text, Dimensions, StyleSheet } from "react-native";

import useColours from "../hooks/useColours";
import useGlobalStyles from "../hooks/useGlobalStyles";

import { SafeAreaView } from "react-native-safe-area-context";
import CenterHeader from "../components/header/CenterHeader";
import CardComponent from "../components/layout/CardComponent";
import ButtonComponent from "../components/layout/ButtonComponent";
import PaddingComponent from "../components/layout/PaddingComponent";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";

export default function JournalDetails({ route, navigation }) {
  const colours = useColours();
  const styles = useGlobalStyles();

  const { data } = route.params;

  const serialised = data;

  let deleteJournalEntry = async (id) => {
    await deleteDoc(doc(db, "jentries", id));
    navigation.navigate("TabStack", { screen: "Home" });
  };

  return (
    <View style={{ backgroundColor: colours.primary, flex: 1 }}>
      <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
        <CenterHeader
          title="Details"
          rightComponent={
            <ButtonComponent
              size="sm"
              backgroundColor={colours.accentBlue}
              textColor="#000"
              text="Delete"
              onPress={() => deleteJournalEntry(data.id)}
            />
          }
        />
        <View
          style={[
            styles.horizontalPadding,
            {
              flex: 1,
              alignItems: "center",
              width: Dimensions.get("screen").width,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              fontFamily: "Poppins-Semi",
              color: colours.black,
              padding: 20,
            }}
          >
            {new Date(data.date).toDateString()}
          </Text>

          <Text
            style={{
              textAlign: "center",
              fontFamily: "Poppins-Semi",
              fontSize: 16,
            }}
          >
            Your overall mood was {data.overall_mood}
          </Text>
          <PaddingComponent />
          <Text style={{ fontFamily: "Poppins-Semi", fontSize: 18 }}>
            Questions
          </Text>
          <PaddingComponent />
          {data?.questions?.map((item, index) => {
            return (
              <View key={index}>
                <CardComponent>
                  <Text
                    key={item.index}
                    style={{
                      fontFamily: "Poppins-Semi",
                      textDecorationLine: "underline",
                      fontSize: 16,
                    }}
                  >
                    {item.question}
                  </Text>
                  <Text key={item.index}>{item.value}</Text>
                </CardComponent>
                <PaddingComponent />
              </View>
            );
          })}
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
