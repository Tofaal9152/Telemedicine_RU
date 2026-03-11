import DoctorApprovalScreen from "@/features/auth/screens/DoctorApprovalScreen";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DoctorApprovalLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <DoctorApprovalScreen />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
