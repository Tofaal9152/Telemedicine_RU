import LoginForm from "@/features/auth/screens/LoginForm";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function Login() {
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
      <LoginForm />
    </KeyboardAwareScrollView>
  );
}
