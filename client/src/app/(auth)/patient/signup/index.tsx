import { traineeSignupSchema } from "@/features/auth/schemas/traineeAuth.schema";
import { Feather } from "@expo/vector-icons";
import { useAuthStore } from "@/store/authStore";
import { useForm } from "@tanstack/react-form";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  const setRole = useAuthStore((s) => s.setRole);
  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      // Handle Signup Logic Here
      console.log("Signup submitted:", value);
      setIsLoggedIn(true);
      setRole("trainee");
      router.replace("/(protected)/(trainee)/build-fighter");
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>BEGIN JOURNEY</Text>
          <Text style={styles.subtitle}>Sign up to find your fighter.</Text>
        </View>

        {/* --- Full Name Field --- */}
        <form.Field
          name="name"
          validators={{ onChange: traineeSignupSchema.shape.name }}
        >
          {(field) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View
                style={[
                  styles.inputWrapper,
                  field.state.meta.errors.length > 0 && styles.inputError,
                ]}
              >
                <Feather name="user" size={16} color="#666" />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. John Doe"
                  placeholderTextColor="#999"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChangeText={field.handleChange}
                />
              </View>
              {field.state.meta.errors.length > 0 && (
                <Text style={styles.errorText}>
                  {field.state.meta.errors
                    .map((err) => (typeof err === "object" ? err.message : err))
                    .join(", ")}
                </Text>
              )}
            </View>
          )}
        </form.Field>

        {/* --- Email Field --- */}
        <form.Field
          name="email"
          validators={{ onChange: traineeSignupSchema.shape.email }}
        >
          {(field) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View
                style={[
                  styles.inputWrapper,
                  field.state.meta.errors.length > 0 && styles.inputError,
                ]}
              >
                <Feather name="mail" size={16} color="#666" />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. user@example.com"
                  placeholderTextColor="#999"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChangeText={field.handleChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {field.state.meta.errors.length > 0 && (
                <Text style={styles.errorText}>
                  {field.state.meta.errors
                    .map((err) => (typeof err === "object" ? err.message : err))
                    .join(", ")}
                </Text>
              )}
            </View>
          )}
        </form.Field>

        {/* --- Password Field --- */}
        <form.Field
          name="password"
          validators={{ onChange: traineeSignupSchema.shape.password }}
        >
          {(field) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.inputWrapper,
                  field.state.meta.errors.length > 0 && styles.inputError,
                ]}
              >
                <Feather name="lock" size={16} color="#666" />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChangeText={field.handleChange}
                />
              </View>
              {field.state.meta.errors.length > 0 && (
                <Text style={styles.errorText}>
                  {field.state.meta.errors
                    .map((err) => (typeof err === "object" ? err.message : err))
                    .join(", ")}
                </Text>
              )}
            </View>
          )}
        </form.Field>

        {/* --- Submit Button --- */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <TouchableOpacity
              style={[
                styles.button,
                (!canSubmit || isSubmitting) && styles.buttonDisabled,
              ]}
              onPress={form.handleSubmit}
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
              )}
            </TouchableOpacity>
          )}
        </form.Subscribe>

        <View style={styles.footer}>
          <View style={styles.loginContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.link}>Login here</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.dismissTo("/")}
          >
            <Feather name="arrow-left" size={16} color="#333" />
            <Text style={styles.backText}>Back to Portal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: "center" },
  headerContainer: { marginBottom: 32, alignItems: "center" },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#E31C25",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: "700", marginBottom: 8, color: "#333" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  input: { flex: 1, paddingVertical: 14, paddingHorizontal: 10, fontSize: 15 },
  inputError: { borderColor: "#E31C25" },
  errorText: {
    color: "#E31C25",
    fontSize: 11,
    marginTop: 5,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#E31C25",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#E31C25",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonDisabled: { backgroundColor: "#CCC", elevation: 0 },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
  footer: { marginTop: 40, alignItems: "center", gap: 20 },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: { fontSize: 14, color: "#666" },
  link: { color: "#E31C25", fontWeight: "bold" },
  backButton: { flexDirection: "row", alignItems: "center", gap: 8 },
  backText: { fontSize: 14, color: "#333", fontWeight: "500" },
});
