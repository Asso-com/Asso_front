export interface Partner {
  id: number;
  name: string;
  associationIdentifier: string;
  isPartner: boolean;
  joinedDate: string;
  logoUrl: string | null;
}