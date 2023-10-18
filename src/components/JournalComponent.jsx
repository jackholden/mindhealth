import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import useGlobalStyles from "../hooks/useGlobalStyles";
import { Ionicons } from "@expo/vector-icons";

export default function JournalComponent({ data, onPress }) {
  const styles = useGlobalStyles();

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.settingsItem}>
          <Text style={[styles.title, { paddingVertical: 8 }]}>
            {new Date(data.date).toDateString()}
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </>
  );
}
