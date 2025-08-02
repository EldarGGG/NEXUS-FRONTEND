export interface CreateOrderProps {
  onClose: () => void;
}

export interface OrderProps extends CreateOrderProps {
  handleBack: () => void;
  handleNext: () => void;
  categories: Category[];
}

export interface CatalogProps extends CreateOrderProps {
  handleNext: () => void;
  categories: Category[];
}
