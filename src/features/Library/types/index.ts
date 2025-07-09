export interface Book {
    id: number;
    bookTitle: string;
    bookNo: string;
    isbnNo: string;
    subject: string;
    rackNo: string | null;
    publish: string | null;
    author: string;
    qty: number;
    perUnitCost: number;
    postDate: string; // or Date if you parse it
    description: string;
    available: boolean;
    isActive: boolean;
}