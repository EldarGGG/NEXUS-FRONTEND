export type Nav = 'Самовывоз' | 'Курьером';

export interface CardProps {
  byCourier?: boolean;
  title: string;
  id: any;
  dotId: any;
}

export interface DeliveryScreenProps {
  onSubmit: () => void;
  onBack: (() => void) | ((value: any) => void);
}
