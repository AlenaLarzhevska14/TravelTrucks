'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Filters from '@/components/Filters/ Filters';
import CamperList from '@/components/CamperList/CamperList';
import { getCampers } from '@/services/campers';
import { CamperFilters } from '@/types/camper';
import {
  initialCamperFilters,
  normalizeCamperFilters,
} from '@/utils/campers';

const CAMPERS_PER_PAGE = 4;

type QueryState = {
  filters: CamperFilters;
  requestKey: number;
};

export default function CatalogContent() {
  const [draftFilters, setDraftFilters] =
    useState<CamperFilters>(initialCamperFilters);
  const [queryState, setQueryState] = useState<QueryState>({
    filters: initialCamperFilters,
    requestKey: 0,
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['campers', queryState.filters, queryState.requestKey],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getCampers({
        ...queryState.filters,
        page: pageParam,
        perPage: CAMPERS_PER_PAGE,
      }),
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const campers = data?.pages.flatMap(page => page.campers) ?? [];
  const isSearching = isFetching && !isFetchingNextPage;
  const errorMessage =
    error instanceof Error && campers.length === 0
      ? error.message
      : undefined;

  function updateFilter<Key extends keyof CamperFilters>(
    key: Key,
    value: CamperFilters[Key]
  ) {
    setDraftFilters(current => ({
      ...current,
      [key]: value,
    }));
  }

  function runSearch(filters: CamperFilters) {
    setQueryState(current => ({
      filters,
      requestKey: current.requestKey + 1,
    }));
  }

  function handleSearch() {
    runSearch(normalizeCamperFilters(draftFilters));
  }

  function handleClear() {
    setDraftFilters(initialCamperFilters);
    runSearch(initialCamperFilters);
  }

  return (
    <>
      <Filters
        filters={draftFilters}
        isLoading={isSearching}
        onFilterChange={updateFilter}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      <CamperList
        campers={campers}
        errorMessage={errorMessage}
        hasNextPage={Boolean(hasNextPage)}
        isLoading={isSearching}
        isLoadingMore={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
      />
    </>
  );
}
