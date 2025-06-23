import { useState, useEffect } from 'react'; 
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

const useLocationPartners = (): UseLocationPartnersReturn => {
  const [partners, setPartners] = useState<PartnerWithLocation[]>([]);
  const [totalCountFromAPI, setTotalCountFromAPI] = useState(0);

  // Function to fetch ALL Villeneuve-la-Garenne associations
  const fetchAllVilleneuvePartners = async (): Promise<PartnerWithLocation[]> => {
    try {
      console.log('🔄 Fetching ALL Villeneuve-la-Garenne partners...');
      
      let allResults: any[] = [];
      let offset = 0;
      const limit = 100; // Maximum allowed by the API
      let hasMoreData = true;
      
      // First request to get the total count
      const firstUrl = `https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/repertoire-national-des-associations-ile-de-france/records?limit=${limit}&offset=0&refine=com_name_asso%3A"Villeneuve-la-Garenne"`;
      
      const firstResponse = await fetch(firstUrl);
      if (!firstResponse.ok) {
        throw new Error(`HTTP error! status: ${firstResponse.status}`);
      }
      
      const firstData = await firstResponse.json();
      const totalCount = firstData.total_count || 0;
      allResults = [...firstData.results];
      
      console.log(`📊 Total Villeneuve-la-Garenne associations: ${totalCount}`);
      console.log(`📥 First batch: ${firstData.results?.length || 0} records`);
      
      // Continue fetching all data
      offset = limit;
      const totalBatches = Math.ceil(totalCount / limit);
      
      for (let batch = 2; batch <= totalBatches && hasMoreData; batch++) {
        const url = `https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/repertoire-national-des-associations-ile-de-france/records?limit=${limit}&offset=${offset}&refine=com_name_asso%3A"Villeneuve-la-Garenne"`;
        
        console.log(`🔄 Fetching batch ${batch}/${totalBatches} (offset: ${offset})`);
        
        const response = await fetch(url);
        if (!response.ok) {
          console.warn(`⚠️ Failed to fetch batch ${batch}, stopping...`);
          break;
        }
        
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          allResults = [...allResults, ...data.results];
          offset += limit;
          
          // Small delay to avoid overwhelming the API
          await new Promise(resolve => setTimeout(resolve, 100));
        } else {
          hasMoreData = false;
        }
      }
      
      console.log(`📥 Total fetched: ${allResults.length} associations from Villeneuve-la-Garenne`);
      
      // Transform data and filter those with valid coordinates
      const validPartners: PartnerWithLocation[] = allResults
        .filter((item: any) => {
          return item.geo_point_2d && 
                 item.geo_point_2d.lat != null && 
                 item.geo_point_2d.lon != null;
        })
        .map((item: any, index: number) => ({
          id: index + 1,
          name: item.title || item.short_title || `Association ${index + 1}`,
          associationIdentifier: item.id || `assoc-${index}`,
          isPartner: true,
          joinedDate: item.creation_date || '2024-01-01',
          geo_point_2d: {
            lat: parseFloat(item.geo_point_2d.lat),
            lon: parseFloat(item.geo_point_2d.lon),
          },
          shortTitle: item.short_title || '',
          address: [item.street_number_asso, item.street_type_asso, item.street_name_asso]
            .filter(Boolean)
            .join(' ') || 'Address not available',
          city: item.com_name_asso || 'Villeneuve-la-Garenne',
        }));

      setTotalCountFromAPI(totalCount);
      console.log(`✅ Found ${validPartners.length} valid partners with coordinates`);
      return validPartners;
    } catch (error) {
      console.error('❌ Error fetching Villeneuve-la-Garenne partners:', error);
      throw error;
    }
  };

  const { data: allPartners, isLoading, isError } = useQuery({
    queryKey: ['villeneuve-partners-all'],
    queryFn: fetchAllVilleneuvePartners,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  useEffect(() => {
    if (allPartners && !isLoading) {
      console.log(`🚀 Setting ${allPartners.length} Villeneuve-la-Garenne partners`);
      setPartners(allPartners);
    }
  }, [allPartners, isLoading]);

  const loadMore = async (): Promise<void> => {
    console.log('🔄 All partners already loaded');
    return Promise.resolve();
  };

  return {
    partners,
    isLoading,
    isError,
    hasMore: false,
    totalCount: totalCountFromAPI,
    currentCount: partners.length,
    loadMore,
    isLoadingMore: false,
  };
};

export default useLocationPartners;