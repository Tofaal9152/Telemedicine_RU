import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
import { AppColors } from "@/theme/colors";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useGetUser } from "../services/home.servics";

const HomeScreen = () => {
  const userQuery = useGetUser();
  const user = userQuery.data;

  const upcomingAppointment = {
    doctor: "Dr. Sarah Ahmed",
    specialty: "Dermatology",
    date: "12 Mar 2026",
    time: "10:30 AM",
  };

  const recentActivities = [
    "Profile created successfully",
    "Appointment request submitted",
    "Medical record updated",
  ];

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
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || "Patient"}</Text>
          <Text style={styles.subText}>
            Here is your health overview for today.
          </Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || "P"}
            </Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileRole}>{user?.role}</Text>
            <Text style={styles.profileMeta}>
              {user?.age} years • {user?.gender}
            </Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Overview</Text>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>03</Text>
              <Text style={styles.statLabel}>Appointments</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>02</Text>
              <Text style={styles.statLabel}>Reports</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Appointment</Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>{upcomingAppointment.doctor}</Text>
            <Text style={styles.infoSubtitle}>
              {upcomingAppointment.specialty}
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>{upcomingAppointment.date}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Time</Text>
              <Text style={styles.infoValue}>{upcomingAppointment.time}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.listCard}>
            {recentActivities.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.activityRow,
                  index !== recentActivities.length - 1 &&
                    styles.activityBorder,
                ]}
              >
                <View style={styles.dot} />
                <Text style={styles.activityText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Tip</Text>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Stay Hydrated</Text>
            <Text style={styles.tipText}>
              Drink enough water throughout the day to keep your body active and
              healthy.
            </Text>
          </View>
        </View>
      </ScrollView>
    </AsyncStateWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  contentContainer: {
    padding: 20,
    paddingBottom: 32,
  },

  header: {
    marginBottom: 24,
  },

  greeting: {
    fontSize: 16,
    color: AppColors.subtitleText,
  },

  userName: {
    fontSize: 28,
    fontWeight: "700",
    color: AppColors.primary,
    marginTop: 4,
  },

  subText: {
    fontSize: 14,
    color: AppColors.subtitleText,
    marginTop: 6,
    lineHeight: 20,
  },

  profileCard: {
    backgroundColor: AppColors.card,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 24,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },

  profileInfo: {
    flex: 1,
  },

  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: AppColors.primary,
  },

  profileRole: {
    marginTop: 4,
    fontSize: 13,
    color: AppColors.subtitleText,
    fontWeight: "600",
  },

  profileMeta: {
    marginTop: 4,
    fontSize: 14,
    color: AppColors.subtitleText,
  },

  profileEmail: {
    marginTop: 4,
    fontSize: 13,
    color: AppColors.subtitleText,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: AppColors.primary,
    marginBottom: 14,
  },

  statsRow: {
    flexDirection: "row",
    gap: 14,
  },

  statCard: {
    flex: 1,
    backgroundColor: AppColors.card,
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: AppColors.primary,
  },

  statLabel: {
    marginTop: 8,
    fontSize: 13,
    color: AppColors.subtitleText,
  },

  infoCard: {
    backgroundColor: AppColors.card,
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: AppColors.primary,
  },

  infoSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: AppColors.subtitleText,
    marginBottom: 14,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  infoLabel: {
    fontSize: 14,
    color: AppColors.subtitleText,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.primary,
  },

  listCard: {
    backgroundColor: AppColors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  activityBorder: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.inputBorder,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: AppColors.primary,
    marginRight: 12,
  },

  activityText: {
    flex: 1,
    fontSize: 14,
    color: AppColors.primary,
  },

  tipCard: {
    backgroundColor: AppColors.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
  },

  tipTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColors.primary,
    marginBottom: 8,
  },

  tipText: {
    fontSize: 14,
    lineHeight: 21,
    color: AppColors.subtitleText,
  },
});
