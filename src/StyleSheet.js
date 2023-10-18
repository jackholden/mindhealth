/**
 * @file A global stylesheet to reduce the amount of repeated CSS
 * @author Jack Holden
 */

import { StyleSheet } from "react-native";

/**
 * Global theme styles accessible via hook
 * providing current theme colours.
 *
 * @param {*} colours
 * @returns
 */
const globalStyles = (colours) =>
  StyleSheet.create({
    // Auth styles
    screen: {
      flex: 1,
      backgroundColor: colours.white,
    },
    radiusScreen: {
      flex: 1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 20,
      backgroundColor: colours.primary,
    },
    container: {
      flex: 1,
    },
    inner: {
      paddingHorizontal: 20,
      flex: 1,
      justifyContent: "flex-end",
    },
    header: {
      fontSize: 22,
      fontFamily: "Poppins-Semi",
      color: colours.black,
    },
    subHeader: {
      fontFamily: "Poppins-Semi",
      fontSize: 15,
      color: colours.black,
    },
    input: {
      borderColor: colours.black,
      borderWidth: 3,
      backgroundColor: "#ADD8E6",
      fontFamily: "Poppins-Semi",
      color: "#000",
      borderRadius: 15,
      fontSize: 15,
      paddingVertical: 18.3,
      paddingHorizontal: 22,
    },
    btnContainer: {
      marginTop: 12,
      zIndex: 2,
    },
    errorText: {
      fontSize: 13,
      color: "red",
      fontFamily: "Poppins-Semi",
      marginTop: 5,
    },
    successText: {
      fontSize: 13,
      color: "green",
      fontFamily: "Poppins-Semi",
      marginTop: 5,
    },
    secondaryMessage: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
    },
    secondaryMessageText: {
      color: "gray",
      fontSize: 13,
      fontFamily: "Poppins-Semi",
    },
    link: {
      color: colours.link,
      fontFamily: "Poppins-Semi",
      fontSize: 13,
    },
    scroll: {
      overflow: "visible",
      zIndex: 1,
    },
    paragraph: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: 14,
    },
    text: {
      fontFamily: "Poppins-Semi",
      fontSize: 14,
      color: colours.black,
    },

    settingsItem: {
      backgroundColor: colours.contrast,
      borderRadius: 15,
      padding: 15,
      borderColor: colours.transWhite,
      borderWidth: 3,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
      fontFamily: "Poppins-Semi",
    },
    title: {
      fontFamily: "Poppins-Semi",
    },
    horizontalPadding: {
      paddingHorizontal: 20,
    },
    rowAlignCenter: {
      flexDirection: "row",
      justifyContent: "center",
    },
  });

export default globalStyles;
