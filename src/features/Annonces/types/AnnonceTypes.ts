export interface AnnonceResponse {
  id: number;
  titre: string;
  description: string;
  type: string; 
  createdAt: string;
  updatedAt: string;
  associationId?: number; 
}

export interface AnnonceRequest {
  titre: string;
  description: string;
  type: string;
  associationId: number;
}

export interface UpdateAnnonceRequest {
  titre?: string;
  description?: string;
  type?: string; 
}

export const AnnonceType = {
  IN: "IN",
  OUT: "OUT"
} as const;

export type AnnonceTypeValue = typeof AnnonceType[keyof typeof AnnonceType];

export interface AnnonceFormValues {
  titre: string;
  description: string;
  type: string;
}