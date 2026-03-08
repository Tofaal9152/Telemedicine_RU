import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { FormFieldWrapper } from "@/components/shared/form-related/FormField";
import { SubmitButton } from "@/components/shared/form-related/SubmitButton";
import { SubmitErrorSummary } from "@/components/shared/form-related/SubmitErrorSummary";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useZodTanstackForm } from "@/hooks/useZodTanstackForm";
import { LoginSchema } from "../../schemas/login.schema";
import { useLoginMutation } from "../../services/login.service";

export default function LoginForm() {
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
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
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
                    placeholderTextColor="#9CA3AF"
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
                    placeholderTextColor="#9CA3AF"
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
              Reset
            </Button>

            <SubmitButton
              isLoading={mutation.isPending}
              disabled={mutation.isPending}
              onPress={() => form.handleSubmit()}
            >
              Login
            </SubmitButton>
          </View>
        </FieldGroup>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  actions: {
    marginTop: 12,
    gap: 12,
  },
});
