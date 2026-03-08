import DoctorApprovalScreen from "@/features/auth/screens/DoctorApprovalScreen";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function DoctorApprovalLayout() {
  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <DoctorApprovalScreen />
    </KeyboardAwareScrollView>
  );
}
