import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
import { AppColors } from "@/theme/colors";
import { Picker } from "@react-native-picker/picker";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  useGetSearchResults,
  useGetSpecializations,
} from "../services/search.servics";
import RenderDoctor from "./RenderDoctorItem";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("");

  const {
    debouncedValue: debouncedQuery,
    page,
    setPage,
  } = useSearchDebounce(query);

  useEffect(() => {
    setPage(1);
  }, [specialty, setPage]);

  const doctorsQuery = useGetSearchResults({
    query: debouncedQuery,
    specialty,
    page,
  });

  const specializationQuery = useGetSpecializations();

  const apiData = doctorsQuery.data;
  const totalPages = apiData?.totalPages ?? 1;
  const currentPage = apiData?.currentPage ?? 1;

  const loadMore = () => {
    if (doctorsQuery.isFetching) return;
    if (currentPage >= totalPages) return;

    setPage((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Find a Doctor</Text>
      <Text style={styles.screenSubtitle}>
        Search doctors by name or specialty
      </Text>

      <TextInput
        placeholder="Search doctor..."
        value={query}
        onChangeText={setQuery}
        placeholderTextColor={AppColors.subtitleText}
        style={styles.searchInput}
      />

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={specialty}
          onValueChange={(value) => setSpecialty(value)}
        >
          <Picker.Item label="All Specialties" value="" />
          {specializationQuery.data?.map((item: string, index: number) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      <AsyncStateWrapper
        isLoading={doctorsQuery.isLoading}
        isError={doctorsQuery.isError}
        error={doctorsQuery.error}
      >
        <FlashList
          data={doctorsQuery.data?.results ?? []}
          renderItem={({ item }) => <RenderDoctor item={item} />}
          keyExtractor={(item: any) => item.id}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No doctors found</Text>
              <Text style={styles.emptySubtitle}>
                Try another search keyword or specialty.
              </Text>
            </View>
          }
          ListFooterComponent={
            doctorsQuery.isFetching && page > 1 ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator color={AppColors.primary} size="small" />
                <Text style={styles.loaderText}>Loading more...</Text>
              </View>
            ) : (
              <View style={{ height: 20 }} />
            )
          }
          contentContainerStyle={styles.listContent}
        />
      </AsyncStateWrapper>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  screenTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: AppColors.primary,
  },

  screenSubtitle: {
    fontSize: 14,
    color: AppColors.subtitleText,
    marginTop: 6,
    marginBottom: 16,
  },

  searchInput: {
    backgroundColor: AppColors.inputBackground,
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    color: AppColors.primary,
    fontSize: 15,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
    borderRadius: 14,
    backgroundColor: AppColors.inputBackground,
    marginBottom: 14,
    overflow: "hidden",
  },

  listContent: {
    paddingBottom: 24,
  },

  loaderText: {
    marginTop: 8,
    color: AppColors.subtitleText,
    fontSize: 13,
  },

  footerLoader: {
    paddingVertical: 14,
    alignItems: "center",
  },

  emptyState: {
    backgroundColor: AppColors.card,
    borderRadius: 18,
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
    textAlign: "center",
    color: AppColors.subtitleText,
    fontSize: 14,
  },
});