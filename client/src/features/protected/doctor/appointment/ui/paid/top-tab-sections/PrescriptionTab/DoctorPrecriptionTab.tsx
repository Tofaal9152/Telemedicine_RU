import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useGetPrescription } from "../../../../services/presciption.service";
import PrescriptionForm from "./PrescriptionForm";
import { useGetAppointmentById } from "../../../../services/appointmentById";

const DoctorPrecriptionTab = () => {
  const { id: appointmentId } = useLocalSearchParams<{ id?: string }>();
  const prescriptionQuery = useGetPrescription({
    appointmentId: appointmentId ?? "",
  });
  const appointmentQuery = useGetAppointmentById({
    appointmentId: appointmentId ?? "",
  });

  return (
    <AsyncStateWrapper
      isLoading={prescriptionQuery.isLoading || appointmentQuery.isLoading}
      isError={prescriptionQuery.isError || appointmentQuery.isError}
      error={prescriptionQuery.error || appointmentQuery.error}
    >
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <PrescriptionForm
          data={prescriptionQuery.data}
          prescriptionId={prescriptionQuery.data?.result?.id}
          appointmentId={appointmentId ?? ""}
          patientId={
            appointmentQuery.data?.patientId ||
            prescriptionQuery.data?.result?.patientId ||
            ""
          }
          doctorId={
            appointmentQuery.data?.doctorId ||
            prescriptionQuery.data?.result?.doctorId ||
            ""
          }
        />
      </KeyboardAwareScrollView>
    </AsyncStateWrapper>
  );
};

export default DoctorPrecriptionTab;
