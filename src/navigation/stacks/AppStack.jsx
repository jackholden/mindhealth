/**
 * @file In charge of the App screens once Auth success
 * @author Jack Holden
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import useColours from "../../hooks/useColours";
import ChangePassword from "../../screens/ChangePassword";
import HomeScreen from "../../screens/HomeScreen";
import JournalDetails from "../../screens/JournalDetails";
import JournalEntryInputScreen from "../../screens/JournalEntryInputScreen";
import JournalEntryScreen from "../../screens/JournalEntryScreen";
import MoreScreen from "../../screens/MoreScreen";
import OnboardingScreen from "../../screens/OnboardingScreen";

/**
 * Responsible for initialising the tab stack
 */
const Tab = createBottomTabNavigator();

/**
 * TabStack is a simple nested Tab navigator listing all the
 * screens available to the end user when auth status
 * has been validated.
 *
 * @returns
 */
function TabStack() {
  const colours = useColours();
  return (
    <Tab.Navigator
      initialScreen="Journal"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarActiveTintColor: colours.black,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Poppins-Semi",
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Journal") {
            iconName = focused ? "ios-journal-sharp" : "ios-journal-outline";
          } else if (route.name === "New Entry") {
            iconName = focused ? "add-circle-sharp" : "add-sharp";
          } else if (route.name === "More") {
            iconName = focused
              ? "ellipsis-horizontal"
              : "ellipsis-horizontal-outline";
          }
          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Journal" component={HomeScreen} />
      <Tab.Screen name="New Entry" component={JournalEntryScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}

/**
 * Responsible for initialising the navigation stack
 */
const Stack = createStackNavigator();

/**
 * AppStack is a simple stack navigator listing all the
 * screens available to the end user when auth status
 * has been validated.
 *
 * @returns
 */
export default function AppStack() {
  return (
    <Stack.Navigator initialScreen="TabStack">
      <Stack.Screen
        name="TabStack"
        options={{
          headerShown: false,
        }}
        component={TabStack}
      />
      <Stack.Screen
        name="Change Password"
        options={{
          headerShown: false,
        }}
        component={ChangePassword}
      />
      <Stack.Screen
        name="JournalEntryInput"
        options={{
          headerShown: false,
        }}
        component={JournalEntryInputScreen}
      />
      <Stack.Screen
        name="JournalDetails"
        options={{
          headerShown: false,
        }}
        component={JournalDetails}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Onboarding"
          options={{
            headerShown: false,
            headerBackTitleVisible: false,
            headerLeft: () => <></>,
          }}
          component={OnboardingScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    paddingBottom: 28,
    height: 90,
  },
  tabBarItemStyle: {
    paddingBottom: 5,
  },
});
