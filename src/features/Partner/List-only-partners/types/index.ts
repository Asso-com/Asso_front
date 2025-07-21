export interface Partner {
  id: number;
  associationIdentifier: string;
  name: string;
  joinedDate: string;
  currency: string;
  currencySymbol: string;
  email: string;
  phone: string;
  address: string;
  logoUrl: string | null;
  active: boolean;
  participationCoefficient: number;
  assiduityCoefficient: number;
  quizCoefficient: number;
  delayBeforeAttendance: number;
}
