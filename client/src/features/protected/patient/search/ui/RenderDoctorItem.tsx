import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { AppColors } from "@/theme/colors";

const RenderDoctor = ({ item }: { item: any }) => {
  const doctorName = item.name;
  const specialtyText = item.doctor?.specialty?.trim() || "Specialist";
  const experienceText = item.doctor?.experience || "Not provided";
  const bioText = item.doctor?.bio || "No bio available";
  const firstLetter = doctorName?.charAt(0)?.toUpperCase() || "D";

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </View>
        )}

        <View style={styles.topInfo}>
          <Text style={styles.name}>{doctorName}</Text>
          <Text style={styles.specialty}>{specialtyText}</Text>
          <Text style={styles.meta}>
            {item.gender} • {item.age} years
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Approved</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Experience</Text>
        <Text style={styles.infoValue}>{experienceText}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Bio</Text>
        <Text style={styles.bioText}>{bioText}</Text>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </View>
  );
};
export default RenderDoctor;

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: AppColors.inputBackground,
  },

  avatarFallback: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: AppColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  topInfo: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: AppColors.primary,
  },

  specialty: {
    fontSize: 14,
    color: AppColors.subtitleText,
    marginTop: 4,
  },

  meta: {
    fontSize: 12,
    color: AppColors.subtitleText,
    marginTop: 4,
  },

  badge: {
    backgroundColor: AppColors.inputBackground,
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgeText: {
    color: AppColors.primary,
    fontSize: 12,
    fontWeight: "600",
  },

  infoBox: {
    marginTop: 14,
    backgroundColor: AppColors.inputBackground,
    borderRadius: 14,
    padding: 12,
  },

  infoLabel: {
    fontSize: 12,
    color: AppColors.subtitleText,
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.primary,
  },

  bioText: {
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.primary,
  },

  bottomRow: {
    marginTop: 14,
  },

  email: {
    fontSize: 14,
    color: AppColors.primary,
  },
});
