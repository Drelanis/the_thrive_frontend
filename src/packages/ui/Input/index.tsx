import { FieldValues } from 'react-hook-form';

import { InputPassword } from './components';
import { StyledTextField } from './styles';
import { InputProps, InputType } from './types';
import { useLogic } from './useLogic';

export const Input = <Type extends FieldValues>(props: InputProps<Type>) => {
  const { type = InputType.TEXT, name, control, style, ...restProps } = props;

  const { value, error, onChange } = useLogic({
    name,
    control,
  });

  if (type === InputType.PASSWORD) {
    return (
      <InputPassword
        name={name}
        control={control}
        style={style}
        error={error}
        {...restProps}
      />
    );
  }

  return (
    <StyledTextField
      error={Boolean(error)}
      style={style}
      type={type}
      value={value}
      onChange={onChange}
      helperText={error?.message}
      {...restProps}
    />
  );
};

export { InputType } from './types';
