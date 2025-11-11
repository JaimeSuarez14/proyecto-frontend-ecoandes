export interface FormField {
  name: string;
  label: string;
  icon?: string;
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'tel'
    | 'hidden'
    | 'checkbox'
    | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: any }[]; // para checkbox o select
}
