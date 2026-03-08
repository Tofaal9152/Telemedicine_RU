import { FormFieldWrapper } from "@/components/shared/form-related/FormField";
import { SubmitButton } from "@/components/shared/form-related/SubmitButton";
import { SubmitErrorSummary } from "@/components/shared/form-related/SubmitErrorSummary";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useZodTanstackForm } from "@/hooks/useZodTanstackForm";
import { AppColors } from "@/theme/colors";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import * as React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { patientSignupSchema } from "../schemas/patientSignupAuth.schema";
import { usePatientSignupMutation } from "../services/patientSignup.service";

export default function PatientSignUpForm() {
  const router = useRouter();
  const mutation = usePatientSignupMutation();

  const { form, resetAll, submitErrors } = useZodTanstackForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      gender: "male",
    },
    schema: patientSignupSchema,
    mutation,
    fieldLabels: {
      name: "Name",
      email: "Email",
      password: "Password",
      age: "Age",
      gender: "Gender",
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign Up as Patient</Text>
        <Text style={styles.subtitle}>Enter your information to continue</Text>
      </View>

      <FieldGroup>
        <form.Field name="name">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Name *">
              {(p) => (
                <TextInput
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChangeText={p.inputProps.onChangeText}
                  placeholder="Enter name"
                  placeholderTextColor={AppColors.placeholder}
                  autoCapitalize="words"
                  autoCorrect={false}
                  style={[styles.input, p.isInvalid && styles.inputError]}
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Email *">
              {(p) => (
                <TextInput
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChangeText={p.inputProps.onChangeText}
                  placeholder="Enter email"
                  placeholderTextColor={AppColors.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={[styles.input, p.isInvalid && styles.inputError]}
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Password *">
              {(p) => (
                <TextInput
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChangeText={p.inputProps.onChangeText}
                  placeholder="Enter password"
                  placeholderTextColor={AppColors.placeholder}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={[styles.input, p.isInvalid && styles.inputError]}
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="age">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Age *">
              {(p) => (
                <TextInput
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChangeText={p.inputProps.onChangeText}
                  placeholder="Enter age"
                  placeholderTextColor={AppColors.placeholder}
                  keyboardType="numeric"
                  style={[styles.input, p.isInvalid && styles.inputError]}
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="gender">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Gender *">
              {(p) => (
                <View
                  style={[
                    styles.pickerWrapper,
                    p.isInvalid && styles.inputError,
                  ]}
                >
                  <Picker
                    selectedValue={p.inputProps.value}
                    onValueChange={(itemValue) =>
                      p.inputProps.onChangeText(itemValue)
                    }
                  >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                  </Picker>
                </View>
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <SubmitErrorSummary errors={submitErrors} />

        <View style={styles.actions}>
          <Button variant="outline" onPress={resetAll}>
            Reset
          </Button>

          <SubmitButton
            isLoading={mutation.isPending}
            disabled={mutation.isPending}
            onPress={() => form.handleSubmit()}
            style={styles.submitButton}
          >
            Sign Up
          </SubmitButton>
        </View>
      </FieldGroup>

      <View style={styles.loginSection}>
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.loginLink} onPress={() => router.push("/login")}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  card: {
    width: "100%",
    backgroundColor: AppColors.card,
    borderRadius: 24,
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

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
    backgroundColor: AppColors.inputBackground,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: AppColors.primary,
  },

  inputError: {
    borderColor: AppColors.error,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
    backgroundColor: AppColors.inputBackground,
    borderRadius: 14,
    justifyContent: "center",
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

  loginSection: {
    marginTop: 24,
    alignItems: "center",
  },

  loginText: {
    color: AppColors.subtitleText,
    fontSize: 14,
  },

  loginLink: {
    color: AppColors.primary,
    fontWeight: "600",
  },
});
