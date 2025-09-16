import { Stack, useSegments, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../component/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!segments.length) return;
    const isSignedIn = !!(user && token);
    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    if (!isSignedIn && inTabsGroup) router.replace("/(auth)");
    if (isSignedIn && inAuthGroup) router.replace("/(tabs)");
  }, [user, token, segments]);

  return (
    <SafeAreaProvider>
        <Stack
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(pages)" />
        </Stack>
      <StatusBar style="light" backgroundColor="#FFF" />
    </SafeAreaProvider>
  );
}
