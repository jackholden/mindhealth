/**
 * @file Handles all auth screens until auth success
 * @author Jack Holden
 */

import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../../screens/auth/WelcomeScreen";
import SignInEmailScreen from "../../screens/auth/SignInEmailScreen";
import SignInPasswordScreen from "../../screens/auth/SignInPasswordScreen";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";

/**
 * Responsible for initialising the navigation stack
 */
const Stack = createStackNavigator();

/**
 * AuthStack is a simple stack navigator listing all the
 * screens available to the end user when auth status
 * is unset.
 *
 * @returns
 */
export default function AuthStack() {
  return (
    <Stack.Navigator
      initialScreen="Welcome"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignInEmail" component={SignInEmailScreen} />
      <Stack.Screen name="SignInPassword" component={SignInPasswordScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
