export interface Book {
  id: number;
  bookTitle: string;
  bookNo: string;
  isbnNo: string;
  subject: string;
  rackNo?: string | null;
  publish?: string | null;
  author: string;
  qty: number;
  perUnitCost: number;
  postDate: string;
  description: string;
  available: boolean;
  isActive: boolean;
  associationId: number;
}

export interface BookRequest {
  associationId: number;
  bookTitle: string;
  bookNo: string;
  isbnNo: string;
  subject: string;
  rackNo?: string | null;
  publish?: string | null;
  author: string;
  qty: number;
  perUnitCost: number;
  postDate: string;
  description: string;
  available: boolean;
  isActive: boolean;
}
