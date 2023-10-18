/**
 * @file Provides simplistic, highly adaptable settings UI
 * @author Jack Holden
 */

import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import useGlobalStyles from "../hooks/useGlobalStyles";

export default function SettingsItemComponent({
  label,
  component = "",
  onPress,
  customComponent,
}) {
  const styles = useGlobalStyles();

  return (
    <>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.settingsItem}>
            <Text style={[styles.title, { paddingVertical: 8 }]}>{label}</Text>
            {component !== "" ? (
              component
            ) : (
              <Ionicons name="chevron-forward" size={24} color="black" />
            )}
          </View>
        </TouchableOpacity>
      ) : customComponent ? (
        customComponent
      ) : (
        <View style={styles.settingsItem}>
          <Text style={[styles.title, { paddingVertical: 8 }]}>{label}</Text>
          {component !== "" ? (
            component
          ) : (
            <Ionicons name="chevron-forward" size={24} color="black" />
          )}
        </View>
      )}
    </>
  );
}
