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
}

const VILLENEUVE_CITY = 'Villeneuve-la-Garenne';
const API_BASE_URL = 'https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/repertoire-national-des-associations-ile-de-france/records';
const LIMIT = 100;

const fetchAllVilleneuvePartners = async (): Promise<PartnerWithLocation[]> => {
  const allResults: any[] = [];
  let offset = 0;
  let hasMoreData = true;

  const getUrl = (offset: number) =>
    `${API_BASE_URL}?limit=${LIMIT}&offset=${offset}&refine=com_name_asso%3A"${VILLENEUVE_CITY}"`;

  const fetchBatch = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  try {
    // First fetch to determine total count
    const firstData = await fetchBatch(getUrl(offset));
    const totalCount = firstData.total_count || 0;
    allResults.push(...firstData.results);

    // Fetch remaining data
    const totalBatches = Math.ceil(totalCount / LIMIT);
    for (let batch = 1; batch < totalBatches && hasMoreData; batch++) {
      offset += LIMIT;
      const data = await fetchBatch(getUrl(offset));

      if (data.results?.length) {
        allResults.push(...data.results);
        await new Promise(resolve => setTimeout(resolve, 100)); // rate limiting
      } else {
        hasMoreData = false;
      }
    }

    return transformResults(allResults);
  } catch (error) {
    console.error('❌ Error fetching Villeneuve-la-Garenne partners:', error);
    throw error;
  }
};

const transformResults = (results: any[]): PartnerWithLocation[] => {
  return results
    .filter(item => item.geo_point_2d?.lat != null && item.geo_point_2d?.lon != null)
    .map((item, index) => ({
      id: index + 1,
      name: item.title || item.short_title || `Association ${index + 1}`,
      shortTitle: item.short_title || '',
      address: [item.street_number_asso, item.street_type_asso, item.street_name_asso]
        .filter(Boolean)
        .join(' ') || 'Address not available',
      city: item.com_name_asso || VILLENEUVE_CITY,
      geo_point_2d: {
        lat: parseFloat(item.geo_point_2d.lat),
        lon: parseFloat(item.geo_point_2d.lon),
      },
      associationIdentifier: item.id || `assoc-${index}`,
      isPartner: true,
      joinedDate: item.creation_date || '2024-01-01',
    }));
};

const useLocationPartners = (): UseLocationPartnersReturn => {
  const { data: partners = [], isLoading, isError } = useQuery({
    queryKey: ['villeneuve-partners-all'],
    queryFn: fetchAllVilleneuvePartners,
  });

  return { partners, isLoading, isError };
};

export default useLocationPartners;
