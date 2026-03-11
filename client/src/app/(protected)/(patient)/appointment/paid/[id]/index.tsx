import AppoinmentPaidScreen from "@/features/protected/patient/appointment/ui/paid/AppoinmentPaidScreen";
import { StatusBar } from "expo-status-bar";
import React from "react";

const PaidAppoinmentIndex = () => {
  return (
    <>
      <StatusBar style="light" animated />
      <AppoinmentPaidScreen />
    </>
  );
};

export default PaidAppoinmentIndex;
