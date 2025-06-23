import axios from 'axios';
import type { Association, ExternalPartnersResponse } from '../types/AssociationType';

const externalApiInstance = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

interface ExternalApiResponse {
  results: any[];
  total_count: number;
}

const API_CONFIG = {
  BASE_URL: 'https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/repertoire-national-des-associations-ile-de-france/records',
  FILTER: 'refine=com_name_asso:"Villeneuve-la-Garenne"',
  BATCH_SIZE: 100,
  MAX_CONCURRENT_REQUESTS: 3,
};

const processAssociationData = (item: any, index: number, offset: number = 0): Association => ({
  id: offset + index + 1,
  name: item.title || item.short_title || `Association ${item.id || offset + index + 1}`,
  associationIdentifier: item.id,
  joinedDate: item.creation_date,
  shortTitle: item.short_title || item.title,
  object: item.object || 'N/A',
  address: `${item.street_number_asso || ''} ${item.street_type_asso || ''} ${item.street_name_asso || ''}`.trim() || 'Address not available',
  city: item.com_name_asso || 'Villeneuve-la-Garenne',
  postalCode: item.pc_address_asso || 'N/A',
  status: item.position || 'Active',
  department: item.dep_name || 'N/A',
  creationDate: item.creation_date || 'N/A',
  declarationDate: item.declaration_date || 'N/A',
  publicationDate: item.publication_date || 'N/A',
  nature: item.nature || 'N/A',
  group: item.group || 'N/A',
  website: item.website || undefined,
  manager: item.street_name_manager || 'N/A',
  region: item.reg_name || 'N/A',
  isPartner: false,
  phone: item.phone_number || undefined,
  logoUrl: undefined,
});

// ✅ FONCTION POUR FETCH EN BATCH OPTIMISÉ
const fetchBatch = async (offset: number): Promise<{ data: Association[], hasMore: boolean, totalCount?: number }> => {

  const url = `${API_CONFIG.BASE_URL}?limit=${API_CONFIG.BATCH_SIZE}&offset=${offset}&${API_CONFIG.FILTER}`;

  try {
    const response = await externalApiInstance.get<ExternalApiResponse>(url);

    if (!response.data.results || response.data.results.length === 0) {
      return { data: [], hasMore: false };
    }

    const processedData = response.data.results.map((item, index) =>
      processAssociationData(item, index, offset)
    );

    return {
      data: processedData,
      hasMore: response.data.results.length === API_CONFIG.BATCH_SIZE,
      totalCount: response.data.total_count,
    };
  } catch (error) {
    throw error;
  }
};

const ExternalPartnerApi = {
  getPartners: async (): Promise<ExternalPartnersResponse> => {

    try {
      let allPartners: Association[] = [];
      let offset = 0;
      let totalCount = 0;
      let batchCount = 0;

      const firstBatch = await fetchBatch(0);

      if (firstBatch.data.length === 0) {
        return {
          data: [],
          total: 0,
          page: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        };
      }

      allPartners = [...firstBatch.data];
      totalCount = firstBatch.totalCount || firstBatch.data.length;
      offset = API_CONFIG.BATCH_SIZE;
      batchCount = 1;

      while (firstBatch.hasMore && allPartners.length < totalCount) {
        try {

          const batch = await fetchBatch(offset);

          if (batch.data.length === 0) {
            break;
          }

          allPartners = [...allPartners, ...batch.data];
          offset += API_CONFIG.BATCH_SIZE;
          batchCount++;


          if (batchCount % 5 === 0) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }

          if (!batch.hasMore) {
            break;
          }

        } catch (error) {
          break;
        }
      }

      return {
        data: allPartners,
        total: allPartners.length,
        page: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      };

    } catch (error) {
      return {
        data: [],
        total: 0,
        page: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      };
    }
  },
};

export default ExternalPartnerApi;