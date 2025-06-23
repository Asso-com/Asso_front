import axios from 'axios';
import type { Association, ExternalPartnersResponse } from '../types/AssociationType';

// ✅ INSTANCE AXIOS OPTIMISÉE
const externalApiInstance = axios.create({
  timeout: 45000,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

interface ExternalApiResponse {
  results: any[];
  total_count: number;
}

// ✅ CONSTANTES OPTIMISÉES
const API_CONFIG = {
  BASE_URL: 'https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/repertoire-national-des-associations-ile-de-france/records',
  FILTER: 'refine=com_name_asso:"Villeneuve-la-Garenne"',
  BATCH_SIZE: 100,
  MAX_CONCURRENT_REQUESTS: 3,
};

// ✅ FONCTION UTILITAIRE POUR TRAITER LES DONNÉES - CORRECTION email supprimé
const processAssociationData = (item: any, index: number, offset: number = 0): Association => ({
  id: offset + index + 1,
  name: item.title || item.short_title || `Association ${item.id || offset + index + 1}`,
  associationIdentifier: item.id || `ID_${offset + index + 1}`,
  joinedDate: item.creation_date || new Date().toISOString().split('T')[0],
  shortTitle: item.short_title || 'N/A',
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
  // ✅ email supprimé car il n'existe pas dans le type Association
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
    console.error(`❌ Error fetching batch at offset ${offset}:`, error);
    throw error;
  }
};

const ExternalPartnerApi = {
  getPartners: async (): Promise<ExternalPartnersResponse> => {
    const startTime = performance.now();
    
    try {
      let allPartners: Association[] = [];
      let offset = 0;
      let totalCount = 0;
      let batchCount = 0;

      // ✅ PREMIÈRE REQUÊTE POUR OBTENIR LE TOTAL
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

   

      // ✅ FETCH SÉQUENTIEL OPTIMISÉ
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
          console.error(`❌ Error in batch ${batchCount + 1}, continuing...`, error);
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
      const endTime = performance.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);
      
      console.error(`❌ API Error after ${duration}s:`, error);
      
      if (axios.isAxiosError(error)) {
        console.error('🔍 Error Details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          url: error.config?.url,
        });

        // ✅ CORRECTION: Vérification de undefined
        const status = error.response?.status;
        if (status === 400) {
          console.error('🚨 Bad Request - Check API parameters');
        } else if (status === 429) {
          console.error('🚨 Rate Limited - Too many requests');
        } else if (status && status >= 500) { // ✅ Vérification que status n'est pas undefined
          console.error('🚨 Server Error - API service issue');
        }
      }

      // ✅ RETOUR GRACEFUL EN CAS D'ERREUR
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