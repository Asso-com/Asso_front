export interface Association {
  id: number;
  name: string;
  associationIdentifier: string;
  logoUrl?: string;
  isPartner: boolean;
  joinedDate: string;
  phone?: string;
  address?: string;
  status?: string;
  shortTitle: string;
  object?: string;
  city?: string;
  postalCode?: string;
  department?: string;
  creationDate?: string;
  declarationDate?: string;
  publicationDate?: string;
  nature?: string;
  group?: string;
  website?: string;
  manager?: string;
  region?: string;
}


export interface ExternalPartnersResponse {
  data: Association[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaternRequestDto {
  associationIdentifier: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  currency: string;
  currencySymbol: string;
}