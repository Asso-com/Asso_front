import axios from 'axios';
import type { Association, ExternalPartnersResponse } from '../types/AssociationType';

const externalApiInstance = axios.create({
  timeout: 10000,
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

const ExternalPartnerApi = {
  getPartners: async ({ page, limit }: PaginationParams): Promise<ExternalPartnersResponse> => {
    try {
      const validPage = Math.max(1, page);
      const validLimit = Math.max(1, Math.min(limit, 50));
      const offset = (validPage - 1) * validLimit;

      if (offset >= 418) {
        console.warn(`Offset ${offset} exceeds dataset size (418)`);
        return {
          data: [],
          total: 418,
          page: validPage,
          totalPages: Math.ceil(418 / validLimit),
          hasNextPage: false,
          hasPreviousPage: validPage > 1,
        };
      }

  
      const response = await externalApiInstance.get<ExternalApiResponse>(
        `https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/repertoire-national-des-associations-ile-de-france/records?limit=${validLimit}&offset=${offset}&refine=com_name_asso%3A"Villeneuve-la-Garenne"`
      );

      const partners: Association[] = response.data.results?.map((item: any, index: number) => ({
        id: offset + index + 1,
        name: item.title || item.short_title || `Association ${item.id}`,
        associationIdentifier: item.id || 'N/A',
        joinedDate: item.creation_date || new Date().toISOString().split('T')[0],
        // ✅ Toutes les propriétés ajoutées
        shortTitle: item.short_title || 'N/A',
        object: item.object,
        address: `${item.street_number_asso || ''} ${item.street_type_asso || ''} ${item.street_name_asso || ''}`.trim() || 'Address not available',
        city: item.com_name_asso || 'Villeneuve-la-Garenne',
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
        // ✅ Propriétés obligatoires
        isPartner: false, // Par défaut non-partenaire
        phone: undefined,
        logoUrl: undefined,
      })) || [];

      const total = Math.min(response.data.total_count || 418, 418);
      const totalPages = Math.ceil(total / validLimit);

      return {
        data: partners,
        total,
        page: validPage,
        totalPages,
        hasNextPage: validPage < totalPages,
        hasPreviousPage: validPage > 1,
      };
    } catch (error) {
      console.error('API: Error fetching partners:', error);
      return {
        data: [],
        total: 418,
        page,
        totalPages: Math.ceil(418 / limit),
        hasNextPage: page < Math.ceil(418 / limit),
        hasPreviousPage: page > 1,
      };
    }
  },
};

export default ExternalPartnerApi;