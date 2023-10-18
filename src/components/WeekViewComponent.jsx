/**
 * @file Handles the week view component and all functions belonging to it.
 * @author Jack Holden
 */

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useColours from "../hooks/useColours";

export default function WeekViewComponent({ timestamps, loading }) {
  const colours = useColours();
  const styles = makeStyles(colours);

  // Check we have data present
  if (loading) {
    return null;
  }

  const days = []; // empty array ready to be filled with last 7 days.
  const journalEntryPresent = new Array(7).fill(false); // set 7 false array elements
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // day labels

  /**
   * Get past 7 days date and insert into days array
   */
  for (let i = 0; i < 7; i++) {
    let pastDay = new Date().setDate(new Date().getUTCDate() - i);
    days.unshift(pastDay);
  }

  for (let i = 0; i < timestamps.length; i++) {
    let timestampDate = new Date(timestamps[i]).getUTCDate();
    for (let j = 0; j < days.length; j++) {
      let dayDate = new Date(days[j]).getUTCDate();
      if (timestampDate === dayDate) {
        journalEntryPresent[j] = true;
      }
    }
  }

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {journalEntryPresent.map((hasEntry, index) => {
        let date = new Date(days[index]);
        return (
          <View key={index} style={{ alignContent: "center" }}>
            <View
              style={[
                styles.weekDot,
                {
                  backgroundColor: hasEntry ? colours.success : "transparent",
                },
              ]}
            >
              <Text style={styles.weekNumber}>{date.getDate()}</Text>
            </View>
            <Text style={styles.weekDay}>{names[date.getDay()]}</Text>
          </View>
        );
      })}
    </View>
  );
}

const makeStyles = (colours) =>
  StyleSheet.create({
    weekDot: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: "black",
    },
    weekNumber: {
      fontFamily: "Poppins-Semi",
      textAlign: "center",
      fontSize: 25,
    },
    weekDay: {
      fontFamily: "Poppins-Semi",
      textAlign: "center",
      marginTop: 5,
    },
  });
