export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
}

export interface FieldPhotoProps extends FieldProps {
  onChangePhotoName?: (name: string) => void;
  onSelectPhoto?: (photo: File) => void;
}
