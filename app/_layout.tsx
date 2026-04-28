import { colors } from "@/assets/styles/variables";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "inter-thin": require("@/assets/fonts/inter-thin.ttf"),
    "inter-extralight": require("@/assets/fonts/inter-extralight.ttf"),
    "inter-light": require("@/assets/fonts/inter-light.ttf"),
    "inter-regular": require("@/assets/fonts/inter-regular.ttf"),
    "inter-font": require("@/assets/fonts/inter-regular.ttf"),
    "inter-medium": require("@/assets/fonts/inter-medium.ttf"),
    "inter-semibold": require("@/assets/fonts/inter-semibold.ttf"),
    "inter-bold": require("@/assets/fonts/inter-bold.ttf"),
    "inter-extrabold": require("@/assets/fonts/inter-extrabold.ttf"),
    "inter-black": require("@/assets/fonts/inter-black.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <>
      <StatusBar style="light" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        />
      </GestureHandlerRootView>
    </>
  );
}
