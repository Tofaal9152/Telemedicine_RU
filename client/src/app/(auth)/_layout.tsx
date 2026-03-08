import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      {/* <Stack.Screen name="trainee/signin/index" />
      <Stack.Screen name="trainee/signup/index" />
      <Stack.Screen name="trainer/signin/index" />
      <Stack.Screen name="trainer/signup/index" /> */}
    </Stack>
  );
}
