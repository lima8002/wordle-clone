import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  useFonts,
  FrankRuhlLibre_800ExtraBold,
  FrankRuhlLibre_500Medium,
  FrankRuhlLibre_900Black,
} from "@expo-google-fonts/frank-ruhl-libre";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  Platform,
  TouchableOpacity,
  useColorScheme,
  Text,
  Appearance,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/utils/cache";
import Logo from "@/assets/images/nyt-logo.svg";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useMMKVBoolean } from "react-native-mmkv";
import { storage } from "@/components/storage";

// // This is simple solution to ignore all logs in React Native
// import { LogBox } from "react-native";
// LogBox.ignoreAllLogs();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [dark] = useMMKVBoolean("dark-mode", storage);

  useEffect(() => {
    Appearance.setColorScheme(dark ? "dark" : "light");
  }, [dark]);

  const [fontsLoaded, error] = useFonts({
    FrankRuhlLibre_800ExtraBold,
    FrankRuhlLibre_500Medium,
    FrankRuhlLibre_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="login"
                  options={{
                    presentation: "modal",
                    headerTitle: () => <Logo width={150} height={40} />,
                    headerShadowVisible: false,
                    headerLeft: () => (
                      <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons
                          name="close"
                          size={26}
                          color={Colors.light.gray}
                        />
                      </TouchableOpacity>
                    ),
                  }}
                />
                <Stack.Screen
                  name="game"
                  options={{
                    headerBackTitle: "Wordle",
                    headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
                    headerBackTitleStyle: {
                      fontFamily: "FrankRuhlLibre_800ExtraBold",
                      fontSize: 26,
                    },
                    title: "",
                  }}
                />
                <Stack.Screen
                  name="end"
                  options={{
                    title: "",
                    headerShadowVisible: false,
                    presentation: "fullScreenModal",
                    headerBackTitleStyle: {
                      fontFamily: "FrankRuhlLibre_800ExtraBold",
                      fontSize: 26,
                    },
                  }}
                />
              </Stack>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
