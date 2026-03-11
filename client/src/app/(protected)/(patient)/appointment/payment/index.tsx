import AppointmentPaymentScreen from "@/features/protected/patient/appointment/ui/payment/AppointmentPaymentScreen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <>
      <StatusBar style="light" animated />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <AppointmentPaymentScreen />
      </SafeAreaView>
    </>
  );
};

export default index;
