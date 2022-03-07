import { Category } from "./category";

export interface Product {
    id?: number;
    categoryId: number | null;
    barcode: string;
    name: string;
    price: number;
    quantity: number; //stock
    quantityOrder: number;
    categoryName: string | null;
    categoryType: string | null;
  }