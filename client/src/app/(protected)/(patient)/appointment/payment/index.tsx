import AppointmentPaymentScreen from "@/features/protected/patient/appointment/ui/payment/AppointmentPaymentScreen";
import { StatusBar } from "expo-status-bar";
import React from "react";

const index = () => {
  return (
    <>
      <StatusBar style="light" animated />
      <AppointmentPaymentScreen />;
    </>
  );
};

export default index;
