import { useRouter } from "expo-router";
import * as React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { FormFieldWrapper } from "@/components/shared/form-related/FormField";
import { SubmitButton } from "@/components/shared/form-related/SubmitButton";
import { SubmitErrorSummary } from "@/components/shared/form-related/SubmitErrorSummary";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useZodTanstackForm } from "@/hooks/useZodTanstackForm";
import { AppColors } from "@/theme/colors";
import { LoginSchema } from "../schemas/login.schema";
import { useLoginMutation } from "../services/login.service";

export default function LoginForm() {
  const router = useRouter();
  const mutation = useLoginMutation();

  const { form, resetAll, submitErrors } = useZodTanstackForm({
    defaultValues: {
      email: "",
      password: "",
    },
    schema: LoginSchema,
    mutation,
    fieldLabels: {
      email: "Email",
      password: "Password",
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Enter your email and password to continue
        </Text>
      </View>

      <FieldGroup>
        <form.Field name="email">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Email *">
              {(p) => (
                <TextInput
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChangeText={p.inputProps.onChangeText}
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
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
            <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>Login</Text>
          </SubmitButton>
        </View>
      </FieldGroup>

      <View style={styles.signupSection}>
        <Text style={styles.signupText}>
          Don&apos;t have an account?{" "}
          <Text style={styles.signupLink} onPress={() => router.push("/")}>
            Sign Up
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
    paddingHorizontal: 20,
    justifyContent: "center",
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

  actions: {
    marginTop: 20,
    gap: 14,
  },

  submitButton: {
    backgroundColor: AppColors.primary,
    borderRadius: 14,
    paddingVertical: 14,
  },

  signupSection: {
    marginTop: 28,
    alignItems: "center",
  },

  signupText: {
    color: AppColors.subtitleText,
    fontSize: 14,
  },

  signupLink: {
    color: AppColors.primary,
    fontWeight: "600",
  },
});
