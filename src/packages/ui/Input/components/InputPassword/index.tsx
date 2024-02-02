import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import { FieldError, FieldValues } from 'react-hook-form';

import { InputProps } from '../../types';

import { StyledInputHelper, StyledOutlinedInput } from './styles';
import { useLogic } from './useLogic';

type Props<Type extends FieldValues> = {
  onChange: () => void;
  value: string;
  error?: FieldError;
} & InputProps<Type>;

export const InputPassword = <Type extends FieldValues>(props: Props<Type>) => {
  const { error, style, name, label, ...restProps } = props;

  const { isShowPassword, hidePassword, showPassword } = useLogic();

  const isError = Boolean(error);

  return (
    <FormControl style={style} fullWidth variant="outlined">
      <InputLabel error={isError} htmlFor="password">
        {`${label} *`}
      </InputLabel>
      <StyledOutlinedInput
        error={isError}
        id={name}
        label={label}
        type={isShowPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={isShowPassword ? hidePassword : showPassword}
              edge="end"
            >
              {isShowPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...restProps}
      />
      <StyledInputHelper>{error?.message}</StyledInputHelper>
    </FormControl>
  );
};
