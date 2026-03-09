import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
import { AppColors } from "@/theme/colors";
import { FlashList } from "@shopify/flash-list";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useGetAppointments } from "../services/appointments.servics";
import RenderAppointmentCard from "./RenderAppointmentCard";

const AppointmentScreen = () => {
  const [page, setPage] = useState(1);

  const userQuery = useGetAppointments({
    query: {
      page,
    },
  });

  const apiData = userQuery.data;

  const appointments: any[] = apiData?.results ?? [];
  const currentPage = apiData?.currentPage ?? 1;
  const totalPages = apiData?.totalPages ?? 1;
  const hasNextPage = currentPage < totalPages;

  const headerData = useMemo(() => {
    return {
      total: apiData?.count ?? 0,
      paid: appointments.filter((item) => item.status === "PAID").length,
      doctors: new Set(appointments.map((item) => item.doctor?.id)).size,
    };
  }, [apiData?.count, appointments]);

  const handleLoadMore = () => {
    if (!userQuery.isFetching && hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <AsyncStateWrapper
      isLoading={userQuery.isLoading}
      error={userQuery.error}
      isError={userQuery.isError}
    >
      <View style={styles.container}>
        <FlashList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RenderAppointmentCard item={item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text style={styles.screenTitle}>My Appointments</Text>
              <Text style={styles.screenSubtitle}>
                Track your booked consultations and doctor details.
              </Text>

              <View style={styles.summaryRow}>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryNumber}>{headerData.total}</Text>
                  <Text style={styles.summaryLabel}>Total</Text>
                </View>

                <View style={styles.summaryCard}>
                  <Text style={styles.summaryNumber}>{headerData.paid}</Text>
                  <Text style={styles.summaryLabel}>Paid</Text>
                </View>

                <View style={styles.summaryCard}>
                  <Text style={styles.summaryNumber}>{headerData.doctors}</Text>
                  <Text style={styles.summaryLabel}>Doctors</Text>
                </View>
              </View>
            </View>
          }
          ListFooterComponent={
            userQuery.isFetching && hasNextPage ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={AppColors.primary} />
                <Text style={styles.footerText}>
                  Loading more appointments...
                </Text>
              </View>
            ) : (
              <View style={styles.footerSpace} />
            )
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No appointments found</Text>
              <Text style={styles.emptySubtitle}>
                Your booked appointments will appear here.
              </Text>
            </View>
          }
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </AsyncStateWrapper>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  contentContainer: {
    padding: 20,
    paddingBottom: 32,
  },

  headerContainer: {
    marginBottom: 22,
  },

  screenTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: AppColors.primary,
  },

  screenSubtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.subtitleText,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: AppColors.card,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  summaryNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: AppColors.primary,
  },

  summaryLabel: {
    marginTop: 6,
    fontSize: 13,
    color: AppColors.subtitleText,
  },

  footerLoader: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  footerText: {
    marginTop: 8,
    fontSize: 13,
    color: AppColors.subtitleText,
  },

  footerSpace: {
    height: 10,
  },

  emptyState: {
    backgroundColor: AppColors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginTop: 20,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: AppColors.primary,
  },

  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
    color: AppColors.subtitleText,
  },
});
