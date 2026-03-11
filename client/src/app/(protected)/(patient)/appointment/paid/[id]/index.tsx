import AppoinmentPaidScreen from "@/features/protected/patient/appointment/ui/paid/AppoinmentPaidScreen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const PaidAppoinmentIndex = () => {
  return (
    <>
      <StatusBar style="light" animated />
      <SafeAreaView
        style={{
          flex: 1,
        }}
        edges={["bottom"]}
      >
        <AppoinmentPaidScreen />
      </SafeAreaView>
    </>
  );
};

export default PaidAppoinmentIndex;
