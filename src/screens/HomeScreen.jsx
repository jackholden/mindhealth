/**
 * @file Home Core Screen
 * @author Jack Holden
 */

import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import useColours from "../hooks/useColours";
import useGlobalStyles from "../hooks/useGlobalStyles";
import { useAuthContext } from "../hooks/useAuthContext";
import PaddingComponent from "../components/layout/PaddingComponent";
import useOnboarding from "../hooks/useOnboarding";
import { SafeAreaView } from "react-native-safe-area-context";

import { db } from "../../firebase.config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

import { getGreeting } from "../utils/getGreeting";
import WeekViewComponent from "../components/WeekViewComponent";
import CardComponent from "../components/layout/CardComponent";
import LoadingComponent from "../components/layout/LoadingComponent";
import { FlashList } from "@shopify/flash-list";
import JournalComponent from "../components/JournalComponent";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  const colours = useColours();
  const styles = useGlobalStyles();
  const isFirstTime = useOnboarding();

  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(true);
  const [jentries, setJentries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  let loadJournal = async () => {
    const q = query(
      collection(db, "jentries"),
      orderBy("date", "desc"),
      where("user_id", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    let entries = [];
    querySnapshot.forEach((doc) => {
      let entry = doc.data();
      entry.id = doc.id;
      entries.push(entry);
    });

    setJentries(entries);
    setFilteredData(entries);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadJournal();
    return <LoadingComponent />;
  }

  const handleSearch = (event) => {
    setSearchTerm(event);
    let value = event.toLowerCase();
    let result = [];
    console.log(value);
    if (value === "") {
      return setFilteredData(jentries);
    } else {
      result = jentries.filter((data) => {
        data.date = new Date(data.date).toDateString();
        return (
          data?.date.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
          data?.overall_mood.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
      });
      setFilteredData(result);
    }
  };

  return (
    <View style={{ backgroundColor: colours.primary, flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <View style={styles.container}>
          <View style={{ paddingHorizontal: 20, flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={() => {
                    loadJournal();
                    setIsRefreshing(true);
                  }}
                />
              }
            >
              <CardComponent style={{ backgroundColor: "#FF9999" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Poppins-Semi",
                    fontSize: 20,
                    color: "#fff",
                  }}
                >{`${getGreeting(",")} ${user?.displayName}`}</Text>
              </CardComponent>
              <PaddingComponent />
              <CardComponent>
                <Text
                  style={{
                    fontFamily: "Poppins-Semi",
                    fontSize: 20,
                    marginBottom: 14,
                    textAlign: "center",
                  }}
                >
                  Weekly overview
                </Text>
                <WeekViewComponent
                  loaded={isLoading}
                  timestamps={jentries?.map((item) => item.date)}
                />
              </CardComponent>
              <PaddingComponent />
              <CardComponent>
                <TextInput
                  placeholder="Search for a journal entry..."
                  placeholderTextColor="#000"
                  onChangeText={(text) => handleSearch(text)}
                  value={searchTerm}
                  style={styles.input}
                />
              </CardComponent>
              <PaddingComponent />
              <CardComponent style={{ minHeight: 500 }}>
                <Text
                  style={{
                    fontFamily: "Poppins-Semi",
                    fontSize: 20,
                    marginBottom: 14,
                    textAlign: "center",
                  }}
                >
                  Past Journal Entries
                </Text>
                {isRefreshing ? (
                  <LoadingComponent />
                ) : (
                  <FlashList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={(item) => (
                      <Text style={{ textAlign: "center" }}>
                        No journal posts yet :(
                      </Text>
                    )}
                    renderItem={({ item }) => (
                      <JournalComponent
                        data={item}
                        onPress={() =>
                          navigation.navigate("JournalDetails", {
                            screen: "JournalDetails",
                            data: item,
                          })
                        }
                      />
                    )}
                    estimatedItemSize={200}
                  />
                )}
              </CardComponent>
              <PaddingComponent amount={60} />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
