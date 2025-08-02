import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface Product {
  id: number;
  name: string;
  preview: string;
  amount: number;
  price?: number; // Цена товара
  methods: string[];
  subcategory: {
    name: string;
    store: number;
    category: {
      name: string;
      store: number;
    }
  };
}

export interface myProduct {
  id?: number;
  uom: {
      name: string;
  };
  subcategory: {
      id: number;
      category: {
          id: number;
          name: string;
          description: string;
          store: number;
      };
      name: string;
      description: string;
      store: number;
  };
  name: string;
  created_at: string;
  status: boolean;
  preview: string;
  store: number;
}

export interface ProductCardProps {
  product: ProductData;
}
