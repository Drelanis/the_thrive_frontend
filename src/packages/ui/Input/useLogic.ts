import { FieldValues, useController } from 'react-hook-form';

import { InputProps } from './types';

type Params<Type extends FieldValues> = Pick<
  InputProps<Type>,
  'name' | 'control'
>;

export const useLogic = <Type extends FieldValues>(params: Params<Type>) => {
  const { control, name } = params;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return {
    value,
    error,
    onChange,
  };
};
