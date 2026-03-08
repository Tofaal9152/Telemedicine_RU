import PatientSignUpForm from "@/features/auth/screens/PatientSignUpForm";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function PatientSignupScreen() {
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
      <PatientSignUpForm />
    </KeyboardAwareScrollView>
  );
}
