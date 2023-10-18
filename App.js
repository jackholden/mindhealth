/**
 * @file Core entry file, handles component, context initialising
 * @author Jack Holden
 */

import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

import { ThemeProvider } from "./src/utils/context/Theme";
import Root from "./src/Root";
import { AuthProvider } from "./src/utils/context/Auth";

/**
 * App.js entry file ensuring library components
 * and context providers all initialised and
 * globally available for the Root file.
 *
 * @returns
 */
export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <Root />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
