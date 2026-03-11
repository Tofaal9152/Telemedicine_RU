import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
import LogoutSample from "@/components/Signout";
import { AppColors } from "@/theme/colors";
import { useGetUserDoctor } from "../../home/services/home.servics";

const SettingScreen = () => {
  const userQuery = useGetUserDoctor();
  const user = userQuery.data;
  const doctor = user?.doctor;

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "D";

  return (
    <AsyncStateWrapper
      isLoading={userQuery.isLoading}
      error={userQuery.error}
      isError={userQuery.isError}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </View>

          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.role}>{doctor?.specialty || user?.role}</Text>
          <Text style={styles.subInfo}>{user?.email}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{user?.name}</Text>
          </View>

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

          <View style={[styles.row, styles.lastRow]}>
            <Text style={styles.label}>Joined</Text>
            <Text style={styles.value}>
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "-"}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Professional Information</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Specialty</Text>
            <Text style={styles.value}>{doctor?.specialty || "-"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Experience</Text>
            <Text style={styles.value}>{doctor?.experience || "-"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Visit Fee</Text>
            <Text style={styles.value}>
              {doctor?.visitFee !== undefined ? `৳ ${doctor.visitFee}` : "-"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Registration No.</Text>
            <Text style={styles.value}>
              {doctor?.registrationNumber || "-"}
            </Text>
          </View>

          <View style={[styles.row, styles.lastRow]}>
            <Text style={styles.label}>Approval Status</Text>
            <Text
              style={[
                styles.value,
                doctor?.isApproved ? styles.approvedText : styles.pendingText,
              ]}
            >
              {doctor?.isApproved ? "Approved" : "Pending"}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>
            {doctor?.bio || "No bio added yet."}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account Action</Text>
          <LogoutSample />
        </View>
      </ScrollView>
    </AsyncStateWrapper>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  contentContainer: {
    padding: 20,
    paddingBottom: 32,
  },

  profileCard: {
    alignItems: "center",
    backgroundColor: AppColors.card,
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: AppColors.primary,
    marginTop: 12,
  },

  role: {
    fontSize: 15,
    color: AppColors.subtitleText,
    marginTop: 4,
    fontWeight: "600",
  },

  subInfo: {
    fontSize: 13,
    color: AppColors.subtitleText,
    marginTop: 6,
  },

  card: {
    backgroundColor: AppColors.card,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColors.primary,
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.inputBorder,
    gap: 12,
  },

  lastRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },

  label: {
    flex: 1,
    color: AppColors.subtitleText,
    fontSize: 14,
  },

  value: {
    flex: 1,
    textAlign: "right",
    color: AppColors.primary,
    fontSize: 14,
    fontWeight: "600",
  },

  approvedText: {
    color: AppColors.primary,
  },

  pendingText: {
    color: AppColors.error,
  },

  bioText: {
    fontSize: 14,
    lineHeight: 22,
    color: AppColors.primary,
  },
});
