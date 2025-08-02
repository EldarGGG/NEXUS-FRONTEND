interface MakingOrderScreenProps {
  onSubmit: () => void;
  onBack: (() => void) | ((value: any) => void);
}
