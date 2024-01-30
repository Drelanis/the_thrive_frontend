import { InputBaseProps as MUIInputProps } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
}

type InputTypePicker = Pick<
  MUIInputProps,
  'fullWidth' | 'placeholder' | 'required' | 'style'
>;

export type InputProps<Type extends FieldValues> = {
  control: Control<Type>;
  name: Path<Type>;
  label?: string;
  type?: InputType;
} & InputTypePicker;
