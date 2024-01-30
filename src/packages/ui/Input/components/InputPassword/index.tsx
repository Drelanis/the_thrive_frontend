import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { FieldError, FieldValues } from 'react-hook-form';

import { InputProps } from '../../types';

import { useLogic } from './useLogic';

type Props<Type extends FieldValues> = {
  error?: FieldError;
} & InputProps<Type>;

export const InputPassword = <Type extends FieldValues>(props: Props<Type>) => {
  const { error, style, ...restProps } = props;

  const { isShowPassword, hidePassword, showPassword } = useLogic();

  return (
    <FormControl style={style} fullWidth variant="outlined">
      <InputLabel htmlFor="password">Password</InputLabel>
      <OutlinedInput
        error={Boolean(error)}
        id="password"
        type={isShowPassword ? 'text' : 'password'}
        label="Password"
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
    </FormControl>
  );
};
