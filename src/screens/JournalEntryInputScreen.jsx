/**
 * @file Journal Entry Input Screen
 * @author Jack Holden
 */

import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useState } from "react";

import { collection, addDoc } from "firebase/firestore";

import useColours from "../hooks/useColours";
import useGlobalStyles from "../hooks/useGlobalStyles";
import { db } from "../../firebase.config";
import JournalDynamicInput from "../components/JournalDynamicInput";
import { useAuthContext } from "../hooks/useAuthContext";
import ButtonComponent from "../components/layout/ButtonComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import CenterHeader from "../components/header/CenterHeader";
import PaddingComponent from "../components/layout/PaddingComponent";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";

export default function JournalEntryInputScreen({ route, navigation }) {
  const { selected, overall } = route.params;
  const tags = selected;
  const overall_mood = overall;

  const colours = useColours();
  const styles = useGlobalStyles();

  console.log(overall);

  const { user } = useAuthContext();

  const [data, setData] = useState("");

  const handleDataChange = (newData) => {
    setData(newData);
  };

  /**
   * Data preparation and insert function
   */
  let addJournalEntry = async () => {
    let journalEntry = {
      user_id: user.uid,
      date: Date.now(),
      overall_mood: overall_mood,
      questions: data,
    };
    const docRef = await addDoc(collection(db, "jentries"), journalEntry);

    journalEntry.id = docRef.id;
    navigation.navigate("TabStack", { screen: "Journal" });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.screen}
    >
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        <CenterHeader title="Finish Entry" />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <PaddingComponent amount={40} />
            <Text style={styles.header}>Fill in the questions</Text>
            <PaddingComponent amount={10} />
            <JournalDynamicInput data={tags} onChange={handleDataChange} />

            <View style={{ flex: 1 }} />
            <View style={styles.btnContainer}>
              <ButtonComponent
                text="Add"
                backgroundColor={colours.black}
                textColor={colours.white}
                onPress={addJournalEntry}
              />
              {Platform.OS === "android" && <PaddingComponent />}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
