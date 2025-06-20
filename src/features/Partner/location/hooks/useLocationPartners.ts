import React, { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface PartnerWithLocation {
  id: number;
  name: string;
  shortTitle?: string;
  address?: string;
  city?: string;
  geo_point_2d: {
    lat: number;
    lon: number;
  };
  associationIdentifier: string;
  isPartner: boolean;
  joinedDate: string;
}

interface UseLocationPartnersReturn {
  partners: PartnerWithLocation[];
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  totalCount: number;
  currentCount: number;
  loadMore: () => Promise<void>;
  isLoadingMore: boolean;
}

export const PARTNERS_PER_PAGE = 100;
export const MAX_PARTNERS = 1000; // Réduit à 1000 pour les performances

const useLocationPartners = (): UseLocationPartnersReturn => {
  const [partners, setPartners] = useState<PartnerWithLocation[]>([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [totalCountFromAPI, setTotalCountFromAPI] = useState(0);

  const fetchPartners = useCallback(async (offset: number, requiredCount: number): Promise<PartnerWithLocation[]> => {
    let collectedPartners: PartnerWithLocation[] = [];
    let tempOffset = offset;

    try {
      console.log(`🔄 Starting fetchPartners: offset=${tempOffset}, requiredCount=${requiredCount}`);
      while (collectedPartners.length < requiredCount && hasMoreData && (tempOffset < totalCountFromAPI || totalCountFromAPI === 0)) {
        console.log(`🔄 Fetching from API: offset=${tempOffset}, limit=${PARTNERS_PER_PAGE}`);
        const response = await fetch(
          `https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/repertoire-national-des-associations-ile-de-france/records?limit=${PARTNERS_PER_PAGE}&offset=${tempOffset}`
        );

        if (!response.ok) {
          console.error(`❌ HTTP error! status: ${response.status}, url: ${response.url}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`📥 API response received, results length: ${data.results?.length || 0}, total_count: ${data.total_count || 0}`);

        if (tempOffset === 0) {
          const total = data.total_count || 0;
          setTotalCountFromAPI(total);
          console.log(`📊 Total partners available: ${total}`);
        }

        const newPartners: PartnerWithLocation[] = (data.results || [])
          .filter((item: any) => {
            const isValid =
              item.geo_point_2d &&
              item.geo_point_2d.lat != null &&
              item.geo_point_2d.lon != null &&
              !isNaN(parseFloat(item.geo_point_2d.lat)) &&
              !isNaN(parseFloat(item.geo_point_2d.lon));
            if (!isValid) {
              console.log(`❌ Filtered out partner: ${item.title || 'Unknown'} due to invalid geo_point_2d: ${JSON.stringify(item.geo_point_2d)}`);
            }
            return isValid;
          })
          .map((item: any, index: number) => ({
            id: tempOffset + index + 1,
            name: item.title || item.short_title || `Association ${tempOffset + index + 1}`,
            associationIdentifier: item.id || `assoc-${tempOffset + index}`,
            isPartner: true,
            joinedDate: item.creation_date || '2024-01-01',
            geo_point_2d: {
              lat: parseFloat(item.geo_point_2d.lat),
              lon: parseFloat(item.geo_point_2d.lon),
            },
            shortTitle: item.short_title || '',
            address: [item.street_number_asso, item.street_type_asso, item.street_name_asso]
              .filter(Boolean)
              .join(' ') || 'Adresse non disponible',
            city: item.com_name_asso || 'Ville non disponible',
          }));

        console.log(`✅ Fetched ${newPartners.length} valid partners from offset ${tempOffset}`);
        collectedPartners = [...collectedPartners, ...newPartners];
        tempOffset += PARTNERS_PER_PAGE;

        if (data.results?.length < PARTNERS_PER_PAGE || tempOffset >= (data.total_count || 0)) {
          setHasMoreData(false);
          console.log(`🏁 No more data or end of API reached at offset ${tempOffset}`);
        }
      }

      console.log(`✅ Returning ${collectedPartners.length} partners for offset ${offset}`);
      return collectedPartners.slice(0, requiredCount);
    } catch (error) {
      console.error('❌ Error fetching partners:', error);
      throw error;
    }
  }, [hasMoreData, totalCountFromAPI]);

  const { data: initialPartners, isLoading, isError } = useQuery({
    queryKey: ['location-partners-initial'],
    queryFn: () => fetchPartners(0, PARTNERS_PER_PAGE),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
  });

  useEffect(() => {
    console.log(`🔍 useLocationPartners useEffect triggered, initialPartners: ${initialPartners?.length || 'undefined'}, isLoading: ${isLoading}, current partners: ${partners.length}`);
    if (initialPartners && !isLoading && partners.length === 0) {
      console.log(`🚀 Initial partners received: ${initialPartners.length}`);
      setPartners(initialPartners);
      setCurrentOffset(PARTNERS_PER_PAGE);
      setHasMoreData(initialPartners.length === PARTNERS_PER_PAGE && (totalCountFromAPI === 0 || currentOffset < totalCountFromAPI));
      console.log(`🚀 Initial ${initialPartners.length} partners loaded, hasMoreData: ${initialPartners.length === PARTNERS_PER_PAGE && (totalCountFromAPI === 0 || currentOffset < totalCountFromAPI)}`);
    }
  }, [initialPartners, isLoading, totalCountFromAPI, currentOffset, partners.length]);

  const loadMore = useCallback(async (): Promise<void> => {
    if (isLoadingMore || !hasMoreData || partners.length >= MAX_PARTNERS) {
      if (partners.length >= MAX_PARTNERS) {
        console.log(`⚠️ Maximum partner limit of ${MAX_PARTNERS} reached`);
        setHasMoreData(false);
      }
      console.log('🔄 loadMore skipped: loadingMore or no more data');
      return;
    }

    setIsLoadingMore(true);
    console.log(`🔄 Loading more partners... (offset: ${currentOffset})`);

    try {
      const newPartners = await fetchPartners(currentOffset, PARTNERS_PER_PAGE);
      console.log(`✅ Loaded ${newPartners.length} new partners`);
      if (newPartners.length > 0) {
        setPartners((prev) => {
          const updatedPartners = [...prev, ...newPartners];
          console.log(`✅ Total partners now: ${updatedPartners.length}`);
          return updatedPartners;
        });
        setCurrentOffset((prev) => prev + PARTNERS_PER_PAGE);
      } else {
        setHasMoreData(false);
        console.log('🏁 No more valid partners to load');
      }
    } catch (error) {
      console.error('❌ Error loading more partners:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMoreData, currentOffset, fetchPartners, partners.length]);

  return {
    partners,
    isLoading,
    isError,
    hasMore: hasMoreData,
    totalCount: totalCountFromAPI,
    currentCount: partners.length,
    loadMore,
    isLoadingMore,
  };
};

export default useLocationPartners;