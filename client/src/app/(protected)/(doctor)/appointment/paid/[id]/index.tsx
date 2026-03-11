import DoctorAppoinmentPaidScreen from "@/features/protected/doctor/appointment/ui/paid/DoctorAppoinmentPaidScreen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const DoctorPaidAppoinmentIndex = () => {
  return (
    <>
      <StatusBar style="light" animated />
      <SafeAreaView
        style={{
          flex: 1,
        }}
        edges={["bottom"]}
      >
        <DoctorAppoinmentPaidScreen />
      </SafeAreaView>
    </>
  );
};

export default DoctorPaidAppoinmentIndex;
