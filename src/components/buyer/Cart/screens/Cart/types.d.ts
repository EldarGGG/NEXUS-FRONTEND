export interface CartScreenProps {
  onSubmit: () => void;
  onBack: () => void;
}

export interface CounterProps {
  defaultCount?: number;
  increment?: (count: number) => void;
  decrement?: (count: number) => void;
  className?: string;
  max?: number;
  product: {
    uom: any;
    id: number;
    name: string;
    preview: string;
    amount: number | AmountObject;
    price?: number; // Цена товара
    subcategory: {
      id: any;
      name: string;
      category: {
        id: any;
        name: string;
      };
    };
  };
}

export interface AmountObject {
  amount__sum: number;
}

export interface Product {
  amount: number | AmountObject;
  price?: number; // Цена товара
  id: number;
  name: string;
  preview: string;
  methods: string[];
  subcategory: {
    name: string;
    store: number;
    id: number;
    category: {
      name: string;
      id: number;
    };
  };
  uom: {
    name: string;
  };
}

export interface CardProps {
  onBuy?: () => void;
  product: Product;
}
