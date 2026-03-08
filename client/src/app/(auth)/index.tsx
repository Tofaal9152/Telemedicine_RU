import OnboardingScreen from "@/features/auth/screens/OnboardingScreen";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function OnboardingLayout() {
  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <OnboardingScreen />
    </KeyboardAwareScrollView>
  );
}
