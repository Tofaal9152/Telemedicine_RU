import * as React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { FormFieldWrapper } from "@/components/shared/form-related/FormField";
import { SubmitButton } from "@/components/shared/form-related/SubmitButton";
import { SubmitErrorSummary } from "@/components/shared/form-related/SubmitErrorSummary";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import DeleteAction from "@/hooks/DeleteAction";
import { useZodTanstackForm } from "@/hooks/useZodTanstackForm";
import { AppColors } from "@/theme/colors";
import { CreatePrescriptionSchema } from "../../../../schemas/prescription.schema";
import { useCreateOrUpdatePrescriptionMutation } from "../../../../services/presciption.service";

const emptyMedication = {
  name: "",
  dosage: "",
  frequency: "",
  duration: "",
};

export default function PrescriptionForm({
  data,
  prescriptionId,
  appointmentId,
  patientId,
  doctorId,
}: {
  data: any;
  prescriptionId?: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
}) {
  const prescription = data?.result;
  const isEdit = !!prescription;
  const mutation = useCreateOrUpdatePrescriptionMutation({
    isEdit,
    prescriptionId,
    appointmentId,
    patientId,
    doctorId,
  });

  const initialMedications =
    prescription?.medications?.length > 0
      ? prescription.medications
      : [{ ...emptyMedication }];

  const { form, resetAll, submitErrors } = useZodTanstackForm({
    defaultValues: {
      symptoms: prescription?.symptoms || "",
      diagnosis: prescription?.diagnosis || "",
      notes: prescription?.notes || "",
      medications: initialMedications,
    },
    schema: CreatePrescriptionSchema,
    mutation,
    fieldLabels: {
      appointmentId: "Appointment ID",
      patientId: "Patient ID",
      doctorId: "Doctor ID",
      symptoms: "Symptoms",
      diagnosis: "Diagnosis",
      notes: "Notes",
    },
  });

  return (
    <View style={styles.card}>
      <FieldGroup>
        <form.Field name="symptoms">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Symptoms *">
              {(p) => (
                <TextInput
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChangeText={p.inputProps.onChangeText}
                  placeholder="Enter symptoms"
                  placeholderTextColor={AppColors.placeholder}
                  multiline
                  style={[styles.textarea, p.isInvalid && styles.inputError]}
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="diagnosis">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Diagnosis *">
              {(p) => (
                <TextInput
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChangeText={p.inputProps.onChangeText}
                  placeholder="Enter diagnosis"
                  placeholderTextColor={AppColors.placeholder}
                  multiline
                  style={[styles.textarea, p.isInvalid && styles.inputError]}
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Subscribe selector={(state: any) => state.values.medications}>
          {(medications: any[] = [{ ...emptyMedication }]) => (
            <>
              <Text style={styles.sectionTitle}>Medications</Text>

              {medications.map((_: any, index: number) => (
                <View key={index} style={styles.medicationCard}>
                  <View style={styles.medicationCardHeader}>
                    <Text style={styles.medicationTitle}>
                      Medication {index + 1}
                    </Text>

                    {medications.length > 1 ? (
                      <Button
                        variant="outline"
                        onPress={() => {
                          const updated = medications.filter(
                            (__, i) => i !== index,
                          );
                          form.setFieldValue(
                            "medications",
                            updated.length > 0
                              ? updated
                              : [{ ...emptyMedication }],
                          );
                        }}
                      >
                        <Text>Remove</Text>
                      </Button>
                    ) : null}
                  </View>

                  <form.Field name={`medications.${index}.name`}>
                    {(field) => (
                      <FormFieldWrapper<string> field={field} label="Name *">
                        {(p) => (
                          <TextInput
                            value={p.inputProps.value}
                            onBlur={p.inputProps.onBlur}
                            onChangeText={p.inputProps.onChangeText}
                            placeholder="Enter medicine name"
                            placeholderTextColor={AppColors.placeholder}
                            style={[
                              styles.input,
                              p.isInvalid && styles.inputError,
                            ]}
                          />
                        )}
                      </FormFieldWrapper>
                    )}
                  </form.Field>

                  <form.Field name={`medications.${index}.dosage`}>
                    {(field) => (
                      <FormFieldWrapper<string> field={field} label="Dosage *">
                        {(p) => (
                          <TextInput
                            value={p.inputProps.value}
                            onBlur={p.inputProps.onBlur}
                            onChangeText={p.inputProps.onChangeText}
                            placeholder="Enter dosage"
                            placeholderTextColor={AppColors.placeholder}
                            style={[
                              styles.input,
                              p.isInvalid && styles.inputError,
                            ]}
                          />
                        )}
                      </FormFieldWrapper>
                    )}
                  </form.Field>

                  <form.Field name={`medications.${index}.frequency`}>
                    {(field) => (
                      <FormFieldWrapper<string>
                        field={field}
                        label="Frequency *"
                      >
                        {(p) => (
                          <TextInput
                            value={p.inputProps.value}
                            onBlur={p.inputProps.onBlur}
                            onChangeText={p.inputProps.onChangeText}
                            placeholder="Enter frequency"
                            placeholderTextColor={AppColors.placeholder}
                            style={[
                              styles.input,
                              p.isInvalid && styles.inputError,
                            ]}
                          />
                        )}
                      </FormFieldWrapper>
                    )}
                  </form.Field>

                  <form.Field name={`medications.${index}.duration`}>
                    {(field) => (
                      <FormFieldWrapper<string>
                        field={field}
                        label="Duration *"
                      >
                        {(p) => (
                          <TextInput
                            value={p.inputProps.value}
                            onBlur={p.inputProps.onBlur}
                            onChangeText={p.inputProps.onChangeText}
                            placeholder="Enter duration"
                            placeholderTextColor={AppColors.placeholder}
                            style={[
                              styles.input,
                              p.isInvalid && styles.inputError,
                            ]}
                          />
                        )}
                      </FormFieldWrapper>
                    )}
                  </form.Field>
                </View>
              ))}

              <View style={{ marginTop: 10 }}>
                <Button
                  variant="outline"
                  onPress={() => {
                    form.setFieldValue("medications", [
                      ...medications,
                      { ...emptyMedication },
                    ]);
                  }}
                >
                  <Text>Add Medication</Text>
                </Button>
              </View>
            </>
          )}
        </form.Subscribe>

        <form.Field name="notes">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Notes">
              {(p) => (
                <TextInput
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChangeText={p.inputProps.onChangeText}
                  placeholder="Enter notes"
                  placeholderTextColor={AppColors.placeholder}
                  multiline
                  style={[styles.textarea, p.isInvalid && styles.inputError]}
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <SubmitErrorSummary errors={submitErrors} />

        <View style={styles.actions}>
          <Button variant="outline" onPress={resetAll}>
            <Text>Reset</Text>
          </Button>

          <SubmitButton
            isLoading={mutation.isPending}
            disabled={mutation.isPending}
            onPress={() => form.handleSubmit()}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>
              {prescription ? "Update Prescription" : "Create Prescription"}
            </Text>
          </SubmitButton>
        </View>
      </FieldGroup>
      {isEdit && (
        <View style={styles.actions}>
          <DeleteAction
            endPoint={`/prescription/${prescriptionId}`}
            queryKeys={[["doctor-prescription"]]}
            successMessage={{
              title: "Prescription Deleted",
              description: "Prescription has been deleted successfully.",
            }}
            confirmMessage="Are you sure you want to delete this prescription?"
            confirmDescription="This action cannot be undone."
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: AppColors.card,

    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  header: {
    marginBottom: 28,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: AppColors.primary,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: AppColors.subtitleText,
    lineHeight: 20,
  },

  medicationHeader: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: AppColors.primary,
  },

  medicationCard: {
    marginBottom: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
    borderRadius: 16,
    backgroundColor: AppColors.inputBackground,
  },

  medicationCardHeader: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  medicationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColors.primary,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
    backgroundColor: AppColors.card,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: AppColors.primary,
  },

  textarea: {
    width: "100%",
    minHeight: 100,
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
    backgroundColor: AppColors.inputBackground,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: AppColors.primary,
    textAlignVertical: "top",
  },

  inputError: {
    borderColor: AppColors.error,
  },

  actions: {
    marginTop: 20,
    gap: 14,
  },

  submitButton: {
    backgroundColor: AppColors.primary,
    borderRadius: 14,
    paddingVertical: 14,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
// import * as React from "react";
// import { StyleSheet, Text, TextInput, View } from "react-native";

// import { FormFieldWrapper } from "@/components/shared/form-related/FormField";
// import { SubmitButton } from "@/components/shared/form-related/SubmitButton";
// import { SubmitErrorSummary } from "@/components/shared/form-related/SubmitErrorSummary";
// import { Button } from "@/components/ui/button";
// import { FieldGroup } from "@/components/ui/field";
// import DeleteAction from "@/hooks/DeleteAction";
// import { useZodTanstackForm } from "@/hooks/useZodTanstackForm";
// import { AppColors } from "@/theme/colors";
// import { CreatePrescriptionSchema } from "../../../../schemas/prescription.schema";
// import { useCreateOrUpdatePrescriptionMutation } from "../../../../services/presciption.service";

// const emptyMedication = {
//   name: "",
//   dosage: "",
//   frequency: "",
//   duration: "",
// };

// export default function PrescriptionForm({
//   data,
//   prescriptionId,
//   appointmentId,
//   patientId,
//   doctorId,
// }: {
//   data: any;
//   prescriptionId?: string;
//   appointmentId: string;
//   patientId: string;
//   doctorId: string;
// }) {
//   const prescription = data?.result;
//   const isEdit = !!prescription;
//   const mutation = useCreateOrUpdatePrescriptionMutation({
//     isEdit,
//     prescriptionId,
//     appointmentId,
//     patientId,
//     doctorId,
//   });

//   const initialMedications =
//     prescription?.medications?.length > 0
//       ? prescription.medications
//       : [{ ...emptyMedication }];

//   const [medications, setMedications] = React.useState(initialMedications);

//   const { form, resetAll, submitErrors } = useZodTanstackForm({
//     defaultValues: {
//       symptoms: prescription?.symptoms || "",
//       diagnosis: prescription?.diagnosis || "",
//       notes: prescription?.notes || "",
//       medications: initialMedications,
//     },
//     schema: CreatePrescriptionSchema,
//     mutation,
//     fieldLabels: {
//       appointmentId: "Appointment ID",
//       patientId: "Patient ID",
//       doctorId: "Doctor ID",
//       symptoms: "Symptoms",
//       diagnosis: "Diagnosis",
//       notes: "Notes",
//     },
//   });

//   React.useEffect(() => {
//     form.setFieldValue("medications", medications);
//   }, [form, medications]);

//   const handleAddMedication = () => {
//     setMedications((prev: any) => [...prev, { ...emptyMedication }]);
//   };

//   const handleRemoveMedication = (index: number) => {
//     setMedications((prev: any) => {
//       const updated = prev.filter((_: any, i: number) => i !== index);
//       return updated.length > 0 ? updated : [{ ...emptyMedication }];
//     });
//   };

//   const handleReset = () => {
//     resetAll();
//     setMedications(initialMedications);
//     form.setFieldValue("medications", initialMedications);
//   };

//   return (
//     <View style={styles.card}>
//       <FieldGroup>
//         <form.Field name="symptoms">
//           {(field) => (
//             <FormFieldWrapper<string> field={field} label="Symptoms *">
//               {(p) => (
//                 <TextInput
//                   value={p.inputProps.value}
//                   onBlur={p.inputProps.onBlur}
//                   onChangeText={p.inputProps.onChangeText}
//                   placeholder="Enter symptoms"
//                   placeholderTextColor={AppColors.placeholder}
//                   multiline
//                   style={[styles.textarea, p.isInvalid && styles.inputError]}
//                 />
//               )}
//             </FormFieldWrapper>
//           )}
//         </form.Field>

//         <form.Field name="diagnosis">
//           {(field) => (
//             <FormFieldWrapper<string> field={field} label="Diagnosis *">
//               {(p) => (
//                 <TextInput
//                   value={p.inputProps.value}
//                   onBlur={p.inputProps.onBlur}
//                   onChangeText={p.inputProps.onChangeText}
//                   placeholder="Enter diagnosis"
//                   placeholderTextColor={AppColors.placeholder}
//                   multiline
//                   style={[styles.textarea, p.isInvalid && styles.inputError]}
//                 />
//               )}
//             </FormFieldWrapper>
//           )}
//         </form.Field>

//         <Text style={styles.sectionTitle}>Medications</Text>

//         {medications.map((_: any, index: number) => (
//           <View key={index} style={styles.medicationCard}>
//             <View style={styles.medicationCardHeader}>
//               <Text style={styles.medicationTitle}>Medication {index + 1}</Text>

//               {medications.length > 1 ? (
//                 <Button
//                   variant="outline"
//                   onPress={() => handleRemoveMedication(index)}
//                 >
//                   <Text>Remove</Text>
//                 </Button>
//               ) : null}
//             </View>

//             <form.Field name={`medications.${index}.name`}>
//               {(field) => (
//                 <FormFieldWrapper<string> field={field} label="Name *">
//                   {(p) => (
//                     <TextInput
//                       value={p.inputProps.value}
//                       onBlur={p.inputProps.onBlur}
//                       onChangeText={p.inputProps.onChangeText}
//                       placeholder="Enter medicine name"
//                       placeholderTextColor={AppColors.placeholder}
//                       style={[styles.input, p.isInvalid && styles.inputError]}
//                     />
//                   )}
//                 </FormFieldWrapper>
//               )}
//             </form.Field>

//             <form.Field name={`medications.${index}.dosage`}>
//               {(field) => (
//                 <FormFieldWrapper<string> field={field} label="Dosage *">
//                   {(p) => (
//                     <TextInput
//                       value={p.inputProps.value}
//                       onBlur={p.inputProps.onBlur}
//                       onChangeText={p.inputProps.onChangeText}
//                       placeholder="Enter dosage"
//                       placeholderTextColor={AppColors.placeholder}
//                       style={[styles.input, p.isInvalid && styles.inputError]}
//                     />
//                   )}
//                 </FormFieldWrapper>
//               )}
//             </form.Field>

//             <form.Field name={`medications.${index}.frequency`}>
//               {(field) => (
//                 <FormFieldWrapper<string> field={field} label="Frequency *">
//                   {(p) => (
//                     <TextInput
//                       value={p.inputProps.value}
//                       onBlur={p.inputProps.onBlur}
//                       onChangeText={p.inputProps.onChangeText}
//                       placeholder="Enter frequency"
//                       placeholderTextColor={AppColors.placeholder}
//                       style={[styles.input, p.isInvalid && styles.inputError]}
//                     />
//                   )}
//                 </FormFieldWrapper>
//               )}
//             </form.Field>

//             <form.Field name={`medications.${index}.duration`}>
//               {(field) => (
//                 <FormFieldWrapper<string> field={field} label="Duration *">
//                   {(p) => (
//                     <TextInput
//                       value={p.inputProps.value}
//                       onBlur={p.inputProps.onBlur}
//                       onChangeText={p.inputProps.onChangeText}
//                       placeholder="Enter duration"
//                       placeholderTextColor={AppColors.placeholder}
//                       style={[styles.input, p.isInvalid && styles.inputError]}
//                     />
//                   )}
//                 </FormFieldWrapper>
//               )}
//             </form.Field>
//           </View>
//         ))}

//         <View style={{ marginTop: 10 }}>
//           <Button variant="outline" onPress={handleAddMedication}>
//             <Text>Add Medication</Text>
//           </Button>
//         </View>

//         <form.Field name="notes">
//           {(field) => (
//             <FormFieldWrapper<string> field={field} label="Notes">
//               {(p) => (
//                 <TextInput
//                   value={p.inputProps.value}
//                   onBlur={p.inputProps.onBlur}
//                   onChangeText={p.inputProps.onChangeText}
//                   placeholder="Enter notes"
//                   placeholderTextColor={AppColors.placeholder}
//                   multiline
//                   style={[styles.textarea, p.isInvalid && styles.inputError]}
//                 />
//               )}
//             </FormFieldWrapper>
//           )}
//         </form.Field>

//         <SubmitErrorSummary errors={submitErrors} />

//         <View style={styles.actions}>
//           <Button variant="outline" onPress={handleReset}>
//             <Text>Reset</Text>
//           </Button>

//           <SubmitButton
//             isLoading={mutation.isPending}
//             disabled={mutation.isPending}
//             onPress={() => form.handleSubmit()}
//             style={styles.submitButton}
//           >
//             <Text style={styles.submitButtonText}>
//               {prescription ? "Update Prescription" : "Create Prescription"}
//             </Text>
//           </SubmitButton>
//         </View>
//       </FieldGroup>
//       {isEdit && (
//         <View style={styles.actions}>
//           <DeleteAction
//             endPoint={`/prescription/${prescriptionId}`}
//             queryKeys={[["doctor-prescription"]]}
//             successMessage={{
//               title: "Prescription Deleted",
//               description: "Prescription has been deleted successfully.",
//             }}
//             confirmMessage="Are you sure you want to delete this prescription?"
//             confirmDescription="This action cannot be undone."
//           />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     width: "100%",
//     backgroundColor: AppColors.card,

//     padding: 24,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     elevation: 3,
//   },

//   header: {
//     marginBottom: 28,
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: AppColors.primary,
//   },

//   subtitle: {
//     marginTop: 6,
//     fontSize: 14,
//     color: AppColors.subtitleText,
//     lineHeight: 20,
//   },

//   medicationHeader: {
//     marginTop: 10,
//     marginBottom: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: AppColors.primary,
//   },

//   medicationCard: {
//     marginBottom: 16,
//     padding: 14,
//     borderWidth: 1,
//     borderColor: AppColors.inputBorder,
//     borderRadius: 16,
//     backgroundColor: AppColors.inputBackground,
//   },

//   medicationCardHeader: {
//     marginBottom: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   medicationTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: AppColors.primary,
//   },

//   input: {
//     width: "100%",
//     borderWidth: 1,
//     borderColor: AppColors.inputBorder,
//     backgroundColor: AppColors.card,
//     borderRadius: 14,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     fontSize: 16,
//     color: AppColors.primary,
//   },

//   textarea: {
//     width: "100%",
//     minHeight: 100,
//     borderWidth: 1,
//     borderColor: AppColors.inputBorder,
//     backgroundColor: AppColors.inputBackground,
//     borderRadius: 14,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     fontSize: 16,
//     color: AppColors.primary,
//     textAlignVertical: "top",
//   },

//   inputError: {
//     borderColor: AppColors.error,
//   },

//   actions: {
//     marginTop: 20,
//     gap: 14,
//   },

//   submitButton: {
//     backgroundColor: AppColors.primary,
//     borderRadius: 14,
//     paddingVertical: 14,
//   },

//   submitButtonText: {
//     color: "#FFFFFF",
//     fontWeight: "600",
//   },
// });
