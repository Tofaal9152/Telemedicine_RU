import React from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "@/theme/colors";

export default function DoctorApprovalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>⏳</Text>
        </View>

        <Text style={styles.title}>Approval Pending</Text>

        <Text style={styles.subtitle}>
          Your doctor account is currently under review. Please wait for the
          admin to verify your information. You will be able to access your
          account once the approval is complete.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            We will notify you as soon as your account is approved.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.primaryButtonText}>Go to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  card: {
    width: "100%",
    backgroundColor: AppColors.card,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: AppColors.inputBackground,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  icon: {
    fontSize: 32,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: AppColors.primary,
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: AppColors.subtitleText,
    textAlign: "center",
    marginBottom: 20,
  },

  infoBox: {
    width: "100%",
    backgroundColor: AppColors.inputBackground,
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
    borderRadius: 16,
    padding: 14,
    marginBottom: 22,
  },

  infoText: {
    fontSize: 14,
    color: AppColors.primary,
    textAlign: "center",
  },

  primaryButton: {
    width: "100%",
    backgroundColor: AppColors.primary,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 14,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  linkText: {
    fontSize: 14,
    color: AppColors.primary,
    fontWeight: "600",
  },
});
