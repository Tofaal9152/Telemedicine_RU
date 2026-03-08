import DoctorSignUpForm from "@/features/auth/screens/DoctorSignUpForm";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function DoctorSignupScreen() {
  return (
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
  );
}
