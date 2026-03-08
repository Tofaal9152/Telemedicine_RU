import { onboardingScreenImagePath } from "@/constants/imagePath";
import { AppColors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={onboardingScreenImagePath.OnboardingImage}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>Welcome</Text>

        <Text style={styles.subtitle}>Choose how you want to continue</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/doctor/signup")}
        >
          <Text style={styles.primaryButtonText}>Sign up as Doctor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/patient/signup")}
        >
          <Text style={styles.secondaryButtonText}>Sign up as Patient</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account?</Text>

          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  image: {
    width: "100%",
    height: "60%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: AppColors.primary,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: AppColors.subtitleText,
    marginBottom: 32,
  },

  primaryButton: {
    width: "100%",
    backgroundColor: AppColors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 14,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: AppColors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: AppColors.primary,
    fontSize: 16,
    fontWeight: "600",
  },

  loginRow: {
    flexDirection: "row",
    marginTop: 32,
    justifyContent: "center",
  },

  loginText: {
    color: AppColors.subtitleText,
    fontSize: 14,
  },

  loginLink: {
    color: AppColors.primary,
    fontWeight: "600",
    fontSize: 14,
  },
});
