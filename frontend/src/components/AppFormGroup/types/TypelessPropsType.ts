import { UseFormReturn } from 'react-hook-form';
import { FormGroupBaseProps } from '../components/FormGroupBase';

interface TypelessPropsType<T> extends FormGroupBaseProps {
  name: string | any;
  placeholder?: string;
  controlClassName?: string;
  form: UseFormReturn<T>;
  disabled?: boolean;
  onChange?(e: any): void;
}

export default TypelessPropsType;
