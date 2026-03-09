import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
import LogoutSample from "@/components/Signout";
import { AppColors } from "@/theme/colors";
import { useGetUser } from "../../home/services/home.servics";

const SettingScreen = () => {
  const userQuery = useGetUser();
  const user = userQuery.data;

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <AsyncStateWrapper
      isLoading={userQuery.isLoading}
      error={userQuery.error}
      isError={userQuery.isError}
    >
      <View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </View>

          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.role}>{user?.role}</Text>
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{user?.age}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>{user?.gender}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Joined</Text>
            <Text style={styles.value}>
              {new Date(user?.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.card}>
          <LogoutSample />
        </View>
      </View>
    </AsyncStateWrapper>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    padding: 20,
  },

  profileCard: {
    alignItems: "center",
    marginBottom: 24,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: AppColors.primary,
    marginTop: 10,
  },

  role: {
    fontSize: 14,
    color: AppColors.subtitleText,
  },

  card: {
    backgroundColor: AppColors.card,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColors.primary,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.inputBorder,
  },

  label: {
    color: AppColors.subtitleText,
    fontSize: 14,
  },

  value: {
    color: AppColors.primary,
    fontSize: 14,
    fontWeight: "600",
  },

  setting: {
    fontSize: 15,
    color: AppColors.primary,
  },

  logout: {
    color: "#EF4444",
  },
});
