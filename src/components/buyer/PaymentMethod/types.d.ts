interface PaymentMethod {
  onSubmit?: () => void;
  onClose?: () => void;
  method: string;
}

interface Modal {
  onSubmit?: () => void;
}
