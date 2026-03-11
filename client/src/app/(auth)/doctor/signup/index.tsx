import DoctorSignUpForm from "@/features/auth/screens/DoctorSignUpForm";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
export default function DoctorSignupScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
          paddingVertical: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <DoctorSignUpForm />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
