import axios from 'axios';
import type { Association } from '../types/AssociationType';

const externalApiInstance = axios.create({
  timeout: 15000, // ✅ AUGMENTÉ pour grandes requêtes
  withCredentials: false,
});

interface ExternalApiResponse {
  results: any[];
  total_count: number;
}

interface PaginationParams {
  page: number;
  limit: number;
}

// ✅ INTERFACE POUR RÉPONSE COMPLÈTE
interface ServerPaginationResponse {
  data: Association[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const ExternalPartnerApi = {
  // ✅ MÉTHODE AVEC VRAIE PAGINATION SERVEUR
  getPartners: async ({ page, limit }: PaginationParams): Promise<ServerPaginationResponse> => {
    try {
      // ✅ CALCUL OFFSET POUR API EXTERNE
      const offset = (page - 1) * limit;
      
      console.log(`🔄 Fetching page ${page}, limit ${limit}, offset ${offset}`);
      
      const response = await externalApiInstance.get<ExternalApiResponse>(
        `https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/repertoire-national-des-associations-ile-de-france/records?limit=${limit}&offset=${offset}`
      );
      
      console.log('🔥 API Response:', {
        results: response.data.results?.length || 0,
        total: response.data.total_count,
        page,
        offset
      });

      const partners: Association[] = response.data.results?.map((item: any, index: number) => ({
        id: (offset + index + 1).toString(),
        name: item.title || item.short_title || `Association ${item.id}`,
        associationIdentifier: item.id || 'N/A',
        joinedDate: item.creation_date || new Date().toISOString().split('T')[0],
        shortTitle: item.short_title,
        object: item.object,
        address: `${item.street_number_asso || ''} ${item.street_type_asso || ''} ${item.street_name_asso || ''}`.trim() || 'Address not available',
        city: item.com_name_asso || 'City not available',
        postalCode: item.pc_address_asso || 'N/A',
        status: item.position || 'Unknown',
        department: item.dep_name || 'N/A',
        creationDate: item.creation_date,
        declarationDate: item.declaration_date,
        publicationDate: item.publication_date,
        nature: item.nature,
        group: item.group,
        website: item.website,
        manager: item.street_name_manager,
        region: item.reg_name,
      })) || [];

      const total = response.data.total_count || 0;
      const totalPages = Math.ceil(total / limit);

      console.log('🚀 Pagination Info:', {
        currentPage: page,
        totalPages,
        total,
        dataLength: partners.length
      });
      
      return {
        data: partners,
        total,
        page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      };
    } catch (error) {
      console.error('❌ Error fetching external partners:', error);
      return {
        data: [],
        total: 0,
        page,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      };
    }
  },

  // ✅ MÉTHODE POUR PAGINATION CÔTÉ CLIENT (si besoin)
  getAll: async (): Promise<Association[]> => {
    try {
      const result = await ExternalPartnerApi.getPartners({ page: 1, limit: 100 });
      return result.data;
    } catch (error) {
      console.error('❌ Error in getAll:', error);
      return [];
    }
  },
};

export default ExternalPartnerApi;